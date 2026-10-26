import { createPublicKey, verify } from "node:crypto";
import { waitUntil } from "@vercel/functions";
import { draftGroupReply, liveClaude } from "@/lib/group-reply/draft";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Discord wants the first byte inside 3 s. The deferred ack goes straight back
// and the Claude turn runs after the response, then edits the ack in place.
export const maxDuration = 60;

const ED25519_SPKI_PREFIX = "302a300506032b6570032100";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function verified(publicKeyHex: string, signature: string, timestamp: string, body: string): boolean {
  try {
    const key = createPublicKey({ key: Buffer.from(ED25519_SPKI_PREFIX + publicKeyHex, "hex"), format: "der", type: "spki" });
    return verify(null, Buffer.from(timestamp + body), key, Buffer.from(signature, "hex"));
  } catch {
    return false;
  }
}

type Option = { name: string; value?: string };
type Interaction = {
  type: number;
  token: string;
  data?: { name: string; options?: Option[] };
  member?: { user?: { id: string } };
  user?: { id: string };
};

function option(i: Interaction, name: string): string | null {
  const v = i.data?.options?.find((o) => o.name === name)?.value;
  return typeof v === "string" && v.trim() ? v : null;
}

async function editOriginal(appId: string, token: string, content: string): Promise<void> {
  const res = await fetch(`https://discord.com/api/v10/webhooks/${appId}/${token}/messages/@original`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: content.slice(0, 2000), allowed_mentions: { parse: [] } }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) console.error("[discord-ca] edit failed", res.status, await res.text());
}

async function runReply(appId: string, i: Interaction, anthropicKey: string): Promise<void> {
  const post = option(i, "post");
  if (!post) {
    await editOriginal(appId, i.token, "Paste the post text in the post field.");
    return;
  }
  try {
    const out = await draftGroupReply({ post, group: option(i, "group"), note: option(i, "note") }, liveClaude(anthropicKey));
    const notes: string[] = [];
    if (out.flags.length) notes.push(`Still flagged after ${out.passes} pass${out.passes > 1 ? "es" : ""}: ${out.flags.join("; ")}`);
    else if (out.weak.length) notes.push(`Notes: ${out.weak.join("; ")}`);
    const body = [out.draft || "(empty draft)", ...(notes.length ? ["", `-# ${notes.join(" | ")}`] : [])].join("\n");
    await editOriginal(appId, i.token, body);
  } catch (err) {
    console.error("[discord-ca] draft failed", err);
    await editOriginal(appId, i.token, `Draft failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}

export async function POST(request: Request) {
  const publicKey = process.env.DISCORD_CA_PUBLIC_KEY ?? "";
  const appId = process.env.DISCORD_CA_APP_ID ?? "";
  const anthropicKey = process.env.ANTHROPIC_API_KEY ?? "";
  if (!publicKey || !appId || !anthropicKey) {
    console.error("[discord-ca] DISCORD_CA_PUBLIC_KEY, DISCORD_CA_APP_ID or ANTHROPIC_API_KEY unset");
    return new Response(null, { status: 500 });
  }

  const signature = request.headers.get("x-signature-ed25519") ?? "";
  const timestamp = request.headers.get("x-signature-timestamp") ?? "";
  const raw = await request.text();
  if (!signature || !timestamp || !verified(publicKey, signature, timestamp, raw)) {
    return new Response("bad signature", { status: 401 });
  }

  const i = JSON.parse(raw) as Interaction;
  if (i.type === 1) return json({ type: 1 });
  if (i.type === 2 && i.data?.name === "reply") {
    waitUntil(runReply(appId, i, anthropicKey).catch((err) => console.error("[discord-ca] reply failed", err)));
    return json({ type: 5 });
  }
  return json({ type: 4, data: { content: "Only /reply lives here.", flags: 64 } });
}

export function GET() {
  return new Response(null, { status: 405 });
}
