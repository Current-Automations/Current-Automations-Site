import { NextResponse } from "next/server";
import { siteContacts } from "@/data/siteContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 120,
  email: 200,
  business: 160,
  phone: 40,
  message: 4000,
} as const;

// A real person cannot read the page, type a message and submit inside three
// seconds. Bots posting straight at the endpoint routinely do.
const MIN_FILL_MS = 3000;
// Anything older than this is a stale tab rather than a fresh submission, and the
// timestamp is client-supplied so it cannot be trusted as a session bound.
const MAX_FILL_MS = 1000 * 60 * 60 * 6;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 1000 * 60 * 60;

// Per-instance and therefore only a speed bump, not a guarantee: serverless spins
// up separate instances and each keeps its own map. It still stops the common case,
// which is one script hammering one warm instance. Move to a shared store if the
// form ever attracts real, distributed abuse.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many messages from this connection. Please email us directly." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot. The field is present in the DOM but visually hidden and marked
  // aria-hidden, so only something filling every input reaches this branch.
  // Silently reports success: telling a bot it was caught invites a retry.
  if (str(body.companyWebsite)) {
    console.warn("[contact] honeypot triggered");
    return NextResponse.json({ ok: true });
  }

  const renderedAt = typeof body.renderedAt === "number" ? body.renderedAt : 0;
  const elapsed = Date.now() - renderedAt;
  if (!renderedAt || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
    return NextResponse.json(
      { error: "That submission looked automated. Please try again." },
      { status: 400 }
    );
  }

  const name = str(body.name);
  const email = str(body.email);
  const business = str(body.business);
  const phone = str(body.phone);
  const message = str(body.message);

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Tell us who you are.";
  else if (name.length > LIMITS.name) fieldErrors.name = "That name is too long.";

  if (!email) fieldErrors.email = "We need an email to reply to.";
  else if (email.length > LIMITS.email || !EMAIL.test(email))
    fieldErrors.email = "That does not look like a valid email address.";

  if (business.length > LIMITS.business) fieldErrors.business = "That business name is too long.";
  if (phone.length > LIMITS.phone) fieldErrors.phone = "That phone number is too long.";

  if (!message) fieldErrors.message = "Tell us what you need.";
  else if (message.length < 10) fieldErrors.message = "A little more detail, please.";
  else if (message.length > LIMITS.message) fieldErrors.message = "Please keep it under 4000 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Please fix the fields below.", fieldErrors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is not set. The form cannot deliver until it is added to the Vercel project and redeployed."
    );
    return NextResponse.json(
      {
        error: `The form is not connected yet. Please email ${siteContacts.general} directly and we will pick it up.`,
      },
      { status: 503 }
    );
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Business", business || "not given"],
    ["Phone", phone || "not given"],
  ];

  const html = `<h2>New message from currentautomations.ca</h2>
<table cellpadding="6" style="border-collapse:collapse">
${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("\n")}
</table>
<p><strong>Message</strong></p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Current Automations Site <${siteContacts.noReply}>`,
        to: [siteContacts.general],
        // The visitor's address goes here rather than in From, so a reply reaches
        // them without the send failing SPF for a domain we do not control.
        reply_to: email,
        subject: `Site enquiry from ${name}${business ? ` (${business})` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error(`[contact] Resend rejected the send (${res.status}): ${detail}`);
      return NextResponse.json(
        {
          error: `We could not send that. Please email ${siteContacts.general} directly.`,
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[contact] Resend request failed:", error);
    return NextResponse.json(
      { error: `We could not send that. Please email ${siteContacts.general} directly.` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
