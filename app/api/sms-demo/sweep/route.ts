import { sweepFollowups } from "@/lib/sms-bot/commands";
import { readEnv } from "@/lib/sms-bot/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Vercel Cron hits this once a day (vercel.json). It sends the review text to anyone
// marked DONE the day before. Vercel adds the CRON_SECRET bearer itself.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET ?? "";
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response(null, { status: 401 });
  }
  const cfg = readEnv();
  if (!cfg) return new Response(null, { status: 500 });
  const sent = await sweepFollowups(cfg);
  return Response.json({ sent });
}
