import crypto from "node:crypto";
import { book, Booking, cancel, checkAvailability, reschedule, Result, Store } from "@/lib/demo-booking/shop";
import { syncDelete, syncList, syncSet, TwilioEnv } from "@/lib/sms-bot/twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Retell calls this mid-call as a custom function for the Rowan Plumbing demo agent:
// body is { name, call, args }. It writes to shared state, so every request has to
// carry the key the agent spec sends in x-demo-booking-key.

const MAP = "rowan_bookings";

function env(name: string): string {
  return process.env[name] ?? "";
}

function keyMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function syncStore(twilio: TwilioEnv): Store {
  return {
    list: async () => (await syncList<Booking>(twilio, MAP)).map((r) => r.data),
    put: (b) => syncSet(twilio, MAP, b.start, b),
    remove: (start) => syncDelete(twilio, MAP, start),
  };
}

type Body = {
  name?: string;
  call?: { call_id?: string; from_number?: string };
  args?: Record<string, string | undefined>;
};

export async function POST(request: Request) {
  const key = env("DEMO_BOOKING_KEY");
  const accountSid = env("TWILIO_ACCOUNT_SID");
  const authToken = env("TWILIO_AUTH_TOKEN");
  if (!key || !accountSid || !authToken) {
    console.error("[demo-booking] missing required environment configuration");
    return new Response(null, { status: 503 });
  }
  if (!keyMatches(request.headers.get("x-demo-booking-key") ?? "", key)) {
    console.error("[demo-booking] rejected: bad key");
    return new Response(null, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as Body | null;
  if (!body?.name) return new Response(null, { status: 400 });

  const store = syncStore({ accountSid, authToken });
  const now = Date.now();
  const callId = body.call?.call_id ?? "";
  // A caller who says "this number" has given the one they are calling from.
  const args: Record<string, string | undefined> = {
    ...body.args,
    phone: body.args?.phone || body.call?.from_number || "",
  };

  let result: Result;
  if (body.name === "check_availability") result = await checkAvailability(store, now, args);
  else if (body.name === "book_appointment") result = await book(store, now, args, callId);
  else if (body.name === "reschedule_appointment") result = await reschedule(store, now, args, callId);
  else if (body.name === "cancel_appointment") result = await cancel(store, now, args);
  else return new Response(null, { status: 400 });

  console.log(`[demo-booking] ${body.name} ${callId} ${result.ok ? "ok" : result.reason}`);
  return Response.json(result);
}

export function GET() {
  return new Response(null, { status: 405 });
}
