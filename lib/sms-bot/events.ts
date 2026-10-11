import { PROMPT_VERSION } from "./prompt";

export type BotEvent = {
  event: "lead" | "hold" | "handoff" | "done" | "cancel" | "error";
  code: string;
  phone: string;
  lane: string;
  summary: string;
  urgency?: "low" | "normal" | "high";
  action?: string;
  hold?: { start: string; end: string; address: string; job: string; price: string; name: string };
  name?: string;
  transcript?: string;
};

// One webhook, one scenario in Make: calendar hold + Master Event Log row.
// Fire and forget with a short timeout; the text to the prospect never waits on Make.
export async function postEvent(url: string, e: BotEvent): Promise<void> {
  if (!url) {
    console.error("[sms-bot] MAKE_EVENTS_WEBHOOK_URL unset, event dropped:", e.event, e.code);
    return;
  }
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...e, source: "sms-bot", promptVersion: PROMPT_VERSION, at: new Date().toISOString() }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error("[sms-bot] event post failed", e.event, err);
  }
}
