import { waitUntil } from "@vercel/functions";
import { BotEnv, handleProspect, Inbound, liveDeps } from "@/lib/sms-bot/bot";
import { handleOwner, liveOwnerDeps } from "@/lib/sms-bot/commands";
import { readEnv } from "@/lib/sms-bot/env";
import { expectedSignature, publicUrl, signatureMatches } from "@/lib/twilio-signature";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Twilio gives a webhook 15 seconds. The reply is answered empty right away and the
// Claude turn runs after the response, so the only clock that matters is this one.
export const maxDuration = 60;

const EMPTY_TWIML = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';

function twiml(): Response {
  return new Response(EMPTY_TWIML, { status: 200, headers: { "Content-Type": "text/xml; charset=utf-8" } });
}

function reject(reason: string): Response {
  console.error(`[sms-demo] rejected: ${reason}`);
  return new Response(null, { status: 403 });
}

export async function POST(request: Request) {
  const cfg = readEnv();
  if (!cfg) {
    console.error("[sms-demo] missing required environment configuration");
    return new Response(null, { status: 500 });
  }

  const signature = request.headers.get("x-twilio-signature");
  if (!signature) return reject("no signature header");

  const raw = await request.text();
  const params = new URLSearchParams(raw);
  const url = publicUrl(request, "/api/sms-demo");
  if (!signatureMatches(signature, expectedSignature(url, params, cfg.twilio.authToken))) {
    return reject(`bad signature for ${url}`);
  }
  if (params.get("AccountSid") !== cfg.twilio.accountSid) return reject("account mismatch");
  if (params.get("To") !== cfg.demoLine) return reject(`wrong line ${params.get("To")}`);

  const from = params.get("From") ?? "";
  const body = (params.get("Body") ?? "").trim();
  const numMedia = Number(params.get("NumMedia") ?? "0");
  const media: Inbound["media"] = [];
  for (let i = 0; i < numMedia; i++) {
    const u = params.get(`MediaUrl${i}`);
    if (u) media.push({ url: u, contentType: params.get(`MediaContentType${i}`) ?? "" });
  }

  const botEnv: BotEnv = cfg;
  const deps = liveDeps(botEnv);

  if (from === cfg.cell) {
    waitUntil(handleOwner(cfg, body, liveOwnerDeps(cfg, deps)).catch((err) => console.error("[sms-demo] owner command failed", err)));
    return twiml();
  }

  if (!body && !media.length) return twiml();

  const inbound: Inbound = { from, body, sid: params.get("MessageSid") ?? "", media };
  waitUntil(handleProspect(botEnv, inbound, deps).catch((err) => console.error("[sms-demo] prospect turn failed", err)));
  return twiml();
}

export function GET() {
  return new Response(null, { status: 405 });
}
