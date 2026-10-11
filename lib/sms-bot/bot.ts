import Anthropic from "@anthropic-ai/sdk";
import type { Beta } from "@anthropic-ai/sdk/resources";
import { computeAvailability, Slot } from "./availability";
import { BotEvent, postEvent } from "./events";
import { loadWeekFiles } from "./schedule";
import { SYSTEM_PROMPT } from "./prompt";
import { Hold, listHolds, loadThread, newThread, saveHold, saveThread, Thread } from "./state";
import { fmtSlot, parseIsoLocal } from "./time";
import { fetchMedia, sendSms, threadHistory, TwilioEnv, TwilioMessage } from "./twilio";

export type BotEnv = {
  twilio: TwilioEnv;
  anthropicKey: string;
  scheduleIcs: string;
  makeUrl: string;
  demoLine: string;
  cell: string;
};

export type Inbound = {
  from: string;
  body: string;
  sid: string;
  media: { url: string; contentType: string }[];
};

export type Deps = {
  history: (phone: string) => Promise<TwilioMessage[]>;
  media: (url: string) => Promise<{ data: string; mediaType: string }>;
  send: (to: string, body: string) => Promise<unknown>;
  loadWeek: (week: string) => Promise<string[]>;
  holds: () => Promise<Hold[]>;
  saveHold: (h: Hold) => Promise<void>;
  loadThread: (phone: string) => Promise<Thread | null>;
  newThread: (phone: string, now: number) => Promise<Thread>;
  saveThread: (t: Thread) => Promise<void>;
  event: (e: BotEvent) => Promise<void>;
  claude: (params: Beta.MessageCreateParamsNonStreaming) => Promise<Beta.BetaMessage>;
  now: () => number;
};

export const MODEL = "claude-opus-5-5";
export const HANDOFF_LINE = "Let me get Jarrett on this, he'll text you back from this number.";
export const FALLBACK_LINE = "Got it. Jarrett will text you back shortly from this number.";
const MUTE_MS = 12 * 3600000;
const HISTORY_DAYS = 7;
const MAX_TURNS = 40;
// A phone on auto-reply answers every bot text, so the two would loop.
const RATE_WINDOW_MS = 10 * 60000;
const RATE_MAX = 6;

export function liveDeps(env: BotEnv): Deps {
  const client = new Anthropic({ apiKey: env.anthropicKey });
  return {
    history: (phone) => threadHistory(env.twilio, env.demoLine, phone, HISTORY_DAYS),
    media: (url) => fetchMedia(env.twilio, url),
    send: (to, body) => sendSms(env.twilio, env.demoLine, to, body),
    loadWeek: (week) => loadWeekFiles(env.scheduleIcs, week),
    holds: () => listHolds(env.twilio),
    saveHold: (h) => saveHold(env.twilio, h),
    loadThread: (phone) => loadThread(env.twilio, phone),
    newThread: (phone, now) => newThread(env.twilio, phone, now),
    saveThread: (t) => saveThread(env.twilio, t),
    event: (e) => postEvent(env.makeUrl, e),
    claude: (params) => client.beta.messages.create(params),
    now: () => Date.now(),
  };
}

export const TOOLS: Beta.BetaTool[] = [
  {
    name: "get_availability",
    description:
      "Open 90 minute visit slots over the next 7 days, from Jarrett's real schedule. Call before offering any time. Returns slots with a label to say out loud, plus which days are not covered by a schedule yet.",
    strict: true,
    input_schema: { type: "object", properties: {}, required: [], additionalProperties: false },
  },
  {
    name: "book_hold",
    description:
      "Hold a slot the customer picked. Only after they chose a start time from get_availability and gave a first name and street address. Puts it on Jarrett's calendar and texts him.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        start: { type: "string", description: "Slot start exactly as returned by get_availability, e.g. 2026-10-09T13:00" },
        name: { type: "string" },
        address: { type: "string", description: "Street address and town" },
        job: { type: "string", description: "What we are doing, e.g. Nest doorbell (battery) set up on iPhone" },
        price: { type: "string", description: "Price said to the customer, e.g. $99 + HST" },
      },
      required: ["start", "name", "address", "job", "price"],
      additionalProperties: false,
    },
  },
  {
    name: "log_lead",
    description:
      "Record what you know about this thread so Jarrett's lead log stays current. Call on the first real message and whenever a fact changes.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        lane: { type: "string", enum: ["home", "business", "unknown"] },
        summary: { type: "string", description: "One line: who, what they want, where it stands" },
        name: { type: ["string", "null"] },
        area: { type: ["string", "null"], description: "Town" },
        device: { type: ["string", "null"], description: "Home lane: the device. Business lane: the trade." },
      },
      required: ["lane", "summary", "name", "area", "device"],
      additionalProperties: false,
    },
  },
  {
    name: "hand_off",
    description:
      "Stop answering and bring Jarrett in. Mutes you on this thread for 12 hours and texts him the reason. After calling it, reply with the hand-off line only.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        reason: { type: "string" },
        urgency: { type: "string", enum: ["low", "normal", "high"] },
      },
      required: ["reason", "urgency"],
      additionalProperties: false,
    },
  },
];

export function cleanOutbound(text: string): string {
  return text
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function toTurns(history: TwilioMessage[], line: string): Beta.BetaMessageParam[] {
  const turns: Beta.BetaMessageParam[] = [];
  for (const m of history.slice(-MAX_TURNS)) {
    const body = (m.body ?? "").trim();
    if (!body) continue;
    const role = m.from === line ? "assistant" : "user";
    const last = turns[turns.length - 1];
    if (last && last.role === role && typeof last.content === "string") {
      last.content += "\n" + body;
    } else {
      turns.push({ role, content: body });
    }
  }
  return turns;
}

function contextLine(t: Thread, now: number): string {
  const known = [
    t.lane !== "unknown" ? `lane ${t.lane}` : null,
    t.name ? `name ${t.name}` : null,
    t.area ? `town ${t.area}` : null,
    t.device ? `device ${t.device}` : null,
    t.hold ? `hold ${fmtSlot(parseIsoLocal(t.hold.start) ?? now)}` : null,
  ].filter(Boolean);
  const facts = known.length ? `Known: ${known.join(", ")}.` : "New contact.";
  return `[context: now ${fmtSlot(now)} Toronto. Thread ${t.code}. ${facts} Your texts since last progress: ${t.stalledTurns}.]`;
}

async function openSlots(deps: Deps, now: number) {
  const holds = (await deps.holds()).map((h) => ({
    start: parseIsoLocal(h.start) ?? 0,
    end: parseIsoLocal(h.end) ?? 0,
  }));
  return computeAvailability(now, deps.loadWeek, holds);
}

export async function handleProspect(env: BotEnv, inbound: Inbound, deps: Deps = liveDeps(env)): Promise<void> {
  const now = deps.now();
  const thread = (await deps.loadThread(inbound.from)) ?? (await deps.newThread(inbound.from, now));
  thread.lastSeen = now;

  if (thread.mutedUntil && thread.mutedUntil > now) {
    await deps.saveThread(thread);
    await deps.send(env.cell, `[${thread.code}] ${inbound.from} (yours)\nthem: ${inbound.body || "(photo)"}`);
    return;
  }

  thread.recentIn = [...(thread.recentIn ?? []).filter((t) => now - t < RATE_WINDOW_MS), now];
  if (thread.recentIn.length > RATE_MAX) {
    thread.mutedUntil = now + MUTE_MS;
    await deps.saveThread(thread);
    await deps.event({
      event: "handoff",
      code: thread.code,
      phone: inbound.from,
      lane: thread.lane,
      name: thread.name,
      summary: `${thread.recentIn.length} texts in 10 min, looks like an auto-reply`,
      urgency: "normal",
      action: "Check the thread, RESUME to hand back",
      transcript: inbound.body,
    });
    await deps.send(
      env.cell,
      `[${thread.code}] ${inbound.from} PAUSED: ${thread.recentIn.length} texts in 10 min, looks like an auto-reply. Bot is quiet on this thread for 12 h, RESUME ${thread.code} hands it back.
them: ${inbound.body || "(photo)"}`
    );
    return;
  }

  let reply = "";
  let handedOff: string | null = null;
  let heldNow: Hold | null = null;
  let progressed = false;

  try {
    const history = await deps.history(inbound.from);
    if (!history.some((m) => m.sid === inbound.sid)) {
      const stamp = new Date(now).toISOString();
      history.push({
        sid: inbound.sid,
        from: inbound.from,
        to: env.demoLine,
        body: inbound.body,
        direction: "inbound",
        date_sent: stamp,
        date_created: stamp,
        num_media: String(inbound.media.length),
      });
    }
    const turns = toTurns(history, env.demoLine);
    if (!turns.length || turns[turns.length - 1].role !== "user") {
      turns.push({ role: "user", content: inbound.body || "(photo)" });
    }

    const lastUser = turns[turns.length - 1];
    const blocks: Beta.BetaContentBlockParam[] = [];
    for (const m of inbound.media.filter((x) => x.contentType.startsWith("image/")).slice(0, 3)) {
      try {
        const img = await deps.media(m.url);
        blocks.push({
          type: "image",
          source: {
            type: "base64",
            media_type: img.mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
            data: img.data,
          },
        });
      } catch (err) {
        console.error("[sms-bot] media fetch failed", err);
      }
    }
    const lastText = typeof lastUser.content === "string" ? lastUser.content : "";
    blocks.push({ type: "text", text: `${contextLine(thread, now)}\n${lastText}` });
    lastUser.content = blocks;

    const params: Beta.MessageCreateParamsNonStreaming = {
      model: MODEL,
      max_tokens: 600,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      tools: TOOLS,
      messages: turns,
    };

    for (let i = 0; i < 4; i++) {
      const res = await deps.claude(params);
      if (res.stop_reason === "refusal") {
        handedOff = "model refusal";
        break;
      }
      const text = res.content
        .filter((b): b is Beta.BetaTextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n");
      if (text) reply = text;
      const uses = res.content.filter((b): b is Beta.BetaToolUseBlock => b.type === "tool_use");
      if (res.stop_reason !== "tool_use" || !uses.length) break;

      params.messages = [...params.messages, { role: "assistant", content: res.content }];
      const results: Beta.BetaToolResultBlockParam[] = [];
      for (const use of uses) {
        const input = use.input as Record<string, string | null>;
        let out = "";
        try {
          if (use.name === "get_availability") {
            progressed = true;
            out = JSON.stringify(await openSlots(deps, now));
          } else if (use.name === "book_hold") {
            const avail = await openSlots(deps, now);
            const slot: Slot | undefined = avail.slots.find((s) => s.start === input.start);
            if (!slot) {
              out = JSON.stringify({ ok: false, reason: "that slot is no longer open", slots: avail.slots });
            } else {
              const hold: Hold = {
                start: slot.start,
                end: slot.end,
                address: input.address ?? "",
                job: input.job ?? "",
                price: input.price ?? "",
                phone: inbound.from,
                name: input.name ?? "",
                code: thread.code,
              };
              await deps.saveHold(hold);
              thread.hold = hold;
              thread.name = hold.name || thread.name;
              thread.lane = "home";
              heldNow = hold;
              progressed = true;
              await deps.event({
                event: "hold",
                code: thread.code,
                phone: inbound.from,
                lane: "home",
                name: hold.name,
                summary: `${hold.job} at ${hold.address}, ${hold.price}`,
                urgency: "normal",
                action: "Confirm the day before",
                hold: { start: hold.start, end: hold.end, address: hold.address, job: hold.job, price: hold.price, name: hold.name },
              });
              out = JSON.stringify({ ok: true, label: slot.label });
            }
          } else if (use.name === "log_lead") {
            progressed = true;
            thread.lane = (input.lane as Thread["lane"]) ?? thread.lane;
            thread.summary = input.summary ?? thread.summary;
            if (input.name) thread.name = input.name;
            if (input.area) thread.area = input.area;
            if (input.device) thread.device = input.device;
            await deps.event({
              event: "lead",
              code: thread.code,
              phone: inbound.from,
              lane: thread.lane,
              name: thread.name,
              summary: thread.summary ?? "",
              urgency: "low",
              action: "none",
              transcript: inbound.body,
            });
            out = JSON.stringify({ ok: true });
          } else if (use.name === "hand_off") {
            handedOff = input.reason ?? "no reason given";
            await deps.event({
              event: "handoff",
              code: thread.code,
              phone: inbound.from,
              lane: thread.lane,
              name: thread.name,
              summary: handedOff,
              urgency: (input.urgency as BotEvent["urgency"]) ?? "normal",
              action: "Text them back from the demo line",
              transcript: inbound.body,
            });
            out = JSON.stringify({ ok: true });
          } else {
            out = JSON.stringify({ ok: false, reason: "unknown tool" });
          }
        } catch (err) {
          console.error("[sms-bot] tool failed", use.name, err);
          out = JSON.stringify({ ok: false, reason: "tool unavailable right now, offer to have Jarrett text them" });
        }
        results.push({ type: "tool_result", tool_use_id: use.id, content: out });
      }
      params.messages = [...params.messages, { role: "user", content: results }];
    }
  } catch (err) {
    console.error("[sms-bot] turn failed", err);
    handedOff = `error: ${err instanceof Error ? err.message : String(err)}`;
    reply = "";
  }

  if (handedOff) {
    reply = HANDOFF_LINE;
    thread.mutedUntil = now + MUTE_MS;
  }
  reply = cleanOutbound(reply) || FALLBACK_LINE;
  thread.stalledTurns = progressed ? 0 : thread.stalledTurns + 1;
  await deps.saveThread(thread);

  await deps.send(inbound.from, reply);

  const lane = thread.lane !== "unknown" ? ` (${thread.lane})` : "";
  const who = thread.name ? ` ${thread.name}` : "";
  const lines = [`[${thread.code}] ${inbound.from}${lane}${who}`, `them: ${inbound.body || "(photo)"}`, `bot: ${reply}`];
  if (heldNow) {
    const h: Hold = heldNow;
    lines.push(`HOLD: ${fmtSlot(parseIsoLocal(h.start) ?? now)}, ${h.address}, ${h.job}, ${h.price}`);
  }
  if (handedOff) {
    lines.push(`HANDED OFF: ${handedOff}`, `Reply "${thread.code} your message" to text them. RESUME ${thread.code} hands it back.`);
  }
  await deps.send(env.cell, lines.join("\n"));
}
