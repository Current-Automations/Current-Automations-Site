import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Twilio calls this while a browser-originated call is being set up, and the TwiML
// returned here is what actually places the outbound leg. That makes this endpoint
// capable of dialing arbitrary numbers on the account's dime, so every request is
// verified before any TwiML is produced.

// NANP only. All cold calling is Canada and US, and refusing everything else closes
// the expensive half of the toll fraud surface.
const NANP = /^\+1[2-9]\d{2}[2-9]\d{6}$/;

// Lazy reads so values come from the request-time environment, matching the
// checkout route's pattern.
function env(name: string): string {
  return process.env[name] ?? "";
}

// Twilio signs the full public URL plus every POST parameter, sorted by key and
// concatenated as key + value, using the account auth token (not the API key).
function expectedSignature(url: string, params: URLSearchParams, authToken: string): string {
  const keys = Array.from(new Set(Array.from(params.keys()))).sort();
  let payload = url;
  for (const key of keys) {
    for (const value of params.getAll(key)) {
      payload += key + value;
    }
  }
  return crypto.createHmac("sha1", authToken).update(Buffer.from(payload, "utf-8")).digest("base64");
}

function signatureMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// Vercel terminates TLS upstream, so request.url can carry an internal host or the
// wrong protocol. Twilio signed the public URL, so rebuild that exactly. If
// validation ever fails for no obvious reason, suspect this first.
function publicUrl(request: Request): string {
  const headers = request.headers;
  const proto = headers.get("x-forwarded-proto") ?? "https";
  const host = headers.get("x-forwarded-host") ?? headers.get("host") ?? "";
  return `${proto}://${host}/api/voice`;
}

// The dialer can pick which owned number a call goes out from, so the browser
// sends one. Caller ID is spoofable if this is taken on trust, so the value is
// only ever honoured when it appears in an allowlist set here, never because the
// caller asked for it. TWILIO_CALLER_ID is always permitted; TWILIO_CALLER_IDS is
// a comma-separated list of the other lines on the account.
function allowedCallerIds(): Set<string> {
  const values = [env("TWILIO_CALLER_ID"), ...env("TWILIO_CALLER_IDS").split(",")];
  return new Set(values.map((v) => v.trim()).filter(Boolean));
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function xml(body: string, status = 200): Response {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>${body}`, {
    status,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}

// Rejections return a bare 403 and never TwiML, so a caller who fails verification
// learns nothing and gets no dialing capability.
function reject(reason: string): Response {
  console.error(`[voice] rejected: ${reason}`);
  return new Response(null, { status: 403 });
}

export async function POST(request: Request) {
  const authToken = env("TWILIO_AUTH_TOKEN");
  const accountSid = env("TWILIO_ACCOUNT_SID");
  const appSid = env("TWILIO_TWIML_APP_SID");
  const callerId = env("TWILIO_CALLER_ID");

  if (!authToken || !accountSid || !appSid || !callerId) {
    console.error("[voice] missing required environment configuration");
    return new Response(null, { status: 500 });
  }

  const signature = request.headers.get("x-twilio-signature");
  if (!signature) return reject("no signature header");

  // The raw body is needed byte for byte to rebuild what Twilio signed, so this
  // cannot use request.formData().
  const raw = await request.text();
  const params = new URLSearchParams(raw);

  const url = publicUrl(request);
  if (!signatureMatches(signature, expectedSignature(url, params, authToken))) {
    return reject(`bad signature for ${url}`);
  }

  // Signature proved the request came from Twilio. These confirm it came from the
  // right account and the right application.
  if (params.get("AccountSid") !== accountSid) return reject("account mismatch");
  if (params.get("ApplicationSid") !== appSid) return reject("application mismatch");

  // Dest rather than To: Twilio populates its own To for client-originated calls,
  // and the collision behaviour is version dependent. To is accepted as a fallback.
  const dest = params.get("Dest") ?? params.get("To") ?? "";
  if (!NANP.test(dest)) return reject(`destination not permitted: ${dest}`);

  // FromLine rather than From or CallerId: Twilio populates both itself for
  // client-originated calls, so a custom name is the only unambiguous one.
  const requestedFrom = (params.get("FromLine") ?? "").trim();
  let from = callerId;
  if (requestedFrom) {
    if (!NANP.test(requestedFrom) || !allowedCallerIds().has(requestedFrom)) {
      return reject(`caller id not permitted: ${requestedFrom}`);
    }
    from = requestedFrom;
  }

  return xml(
    `<Response><Dial callerId="${xmlEscape(from)}" record="record-from-ringing-dual" answerOnBridge="true" timeout="30"><Number>${xmlEscape(dest)}</Number></Dial></Response>`
  );
}

// Twilio only ever POSTs here. A GET is either a probe or a misconfigured webhook,
// and answering it with TwiML would hand out dialing capability for free.
export function GET() {
  return new Response(null, { status: 405 });
}
