import { BotEnv, Deps } from "./bot";
import { postEvent } from "./events";
import { deleteHold, listFollowups, phoneForCode, queueFollowup, recentThreads, Thread } from "./state";
import { fmtSlot, parseIsoLocal, torontoParts, torontoToUtc } from "./time";
import { sendSms, syncDelete, TwilioEnv } from "./twilio";
import { FOLLOWUPS } from "./state";

export type OwnerEnv = BotEnv & { stripeLink: string; reviewLink: string; billingEmail: string };

type OwnerDeps = Pick<Deps, "send" | "loadThread" | "saveThread" | "event" | "now"> & {
  phoneForCode: (code: string) => Promise<string | null>;
  recent: () => Promise<Thread[]>;
  queue: (phone: string, code: string, name: string | undefined, sendAt: number) => Promise<void>;
  deleteHold: (start: string) => Promise<void>;
};

const MUTE_MS = 12 * 3600000;
const REVIEW_HOUR = 19;

export function liveOwnerDeps(env: OwnerEnv, base: Deps): OwnerDeps {
  return {
    ...base,
    phoneForCode: (code) => phoneForCode(env.twilio, code),
    recent: () => recentThreads(env.twilio),
    queue: (phone, code, name, sendAt) => queueFollowup(env.twilio, { phone, code, name, sendAt, kind: "review" }),
    deleteHold: (start) => deleteHold(env.twilio, start),
  };
}

export const HELP =
  "Commands: CODE your message (texts them, mutes the bot 12 h). RESUME CODE (bot takes it back). DONE CODE (payment link now, review text tomorrow 7 pm). CANCEL CODE (frees their hold and tells them). LIST (recent threads).";

function nextEveningAt(now: number, hour: number): number {
  const p = torontoParts(now + 86400000);
  return torontoToUtc({ y: p.y, m: p.m, d: p.d, h: hour, mi: 0 });
}

export async function handleOwner(env: OwnerEnv, body: string, deps: OwnerDeps): Promise<void> {
  const text = body.trim();
  const now = deps.now();

  if (/^list$/i.test(text)) {
    const rows = await deps.recent();
    const out = rows.length
      ? rows.map((t) => `${t.code} ${t.phone} ${t.lane}${t.name ? " " + t.name : ""}${t.hold ? " HOLD " + fmtSlot(parseIsoLocal(t.hold.start) ?? now) : ""}${t.mutedUntil && t.mutedUntil > now ? " (yours)" : ""}`).join("\n")
      : "No threads yet.";
    await deps.send(env.cell, out);
    return;
  }

  const resume = /^resume\s+([a-z0-9]{5})$/i.exec(text);
  if (resume) {
    const t = await threadByCode(deps, resume[1]);
    if (!t) return deps.send(env.cell, `No thread ${resume[1].toUpperCase()}.`).then(() => undefined);
    t.mutedUntil = undefined;
    t.stalledTurns = 0;
    await deps.saveThread(t);
    await deps.send(env.cell, `Bot is back on ${t.code}.`);
    return;
  }

  const done = /^done\s+([a-z0-9]{5})$/i.exec(text);
  if (done) {
    const t = await threadByCode(deps, done[1]);
    if (!t) return deps.send(env.cell, `No thread ${done[1].toUpperCase()}.`).then(() => undefined);
    const first = t.name ? `Thanks ${t.name.split(" ")[0]}, ` : "Thanks, ";
    const pay = env.stripeLink
      ? `${first}here is the payment link for today: ${env.stripeLink}${env.billingEmail ? ` E-transfer to ${env.billingEmail} works too.` : ""}`
      : `${first}we will send the payment link shortly.${env.billingEmail ? ` E-transfer to ${env.billingEmail} works too.` : ""}`;
    await deps.send(t.phone, pay);
    const sendAt = nextEveningAt(now, REVIEW_HOUR);
    await deps.queue(t.phone, t.code, t.name, sendAt);
    t.mutedUntil = now + MUTE_MS;
    await deps.saveThread(t);
    await deps.event({ event: "done", code: t.code, phone: t.phone, lane: t.lane, name: t.name, summary: t.hold ? `${t.hold.job}, ${t.hold.price}` : "job done", urgency: "low", action: `Review text queued for ${fmtSlot(sendAt)}` });
    await deps.send(env.cell, `Payment link sent to ${t.code}${env.stripeLink ? "" : " (STRIPE_LINK_T1 is unset, it said we will send it)"}. Review text goes ${fmtSlot(sendAt)}.`);
    return;
  }

  const cancel = /^cancel\s+([a-z0-9]{5})$/i.exec(text);
  if (cancel) {
    const t = await threadByCode(deps, cancel[1]);
    if (!t) return deps.send(env.cell, `No thread ${cancel[1].toUpperCase()}.`).then(() => undefined);
    if (!t.hold) return deps.send(env.cell, `${t.code} has no hold to cancel.`).then(() => undefined);
    const when = fmtSlot(parseIsoLocal(t.hold.start) ?? now);
    const job = t.hold.job;
    await deps.deleteHold(t.hold.start);
    t.hold = undefined;
    t.stalledTurns = 0;
    await deps.saveThread(t);
    await deps.send(t.phone, `Your visit for ${when} is cancelled. Text this number any time to pick a new one.`);
    await deps.event({ event: "cancel", code: t.code, phone: t.phone, lane: t.lane, name: t.name, summary: `Hold ${when} cancelled (${job})`, urgency: "low", action: "Delete the calendar event" });
    await deps.send(env.cell, `Hold ${when} freed and ${t.code} told. Delete the calendar event by hand.`);
    return;
  }

  const relay = /^([a-z0-9]{5})\s+([\s\S]+)$/i.exec(text);
  if (relay) {
    const t = await threadByCode(deps, relay[1]);
    if (!t) return deps.send(env.cell, `No thread ${relay[1].toUpperCase()}. ${HELP}`).then(() => undefined);
    await deps.send(t.phone, relay[2].trim());
    t.mutedUntil = now + MUTE_MS;
    t.lastSeen = now;
    await deps.saveThread(t);
    await deps.send(env.cell, `Sent to ${t.code}. Bot muted 12 h, RESUME ${t.code} hands it back.`);
    return;
  }

  await deps.send(env.cell, HELP);
}

async function threadByCode(deps: OwnerDeps, code: string): Promise<Thread | null> {
  const phone = await deps.phoneForCode(code.toUpperCase());
  return phone ? deps.loadThread(phone) : null;
}

export async function sweepFollowups(env: OwnerEnv): Promise<number> {
  const twilio: TwilioEnv = env.twilio;
  const due = (await listFollowups(twilio)).filter((r) => r.data.sendAt <= Date.now());
  for (const r of due) {
    const f = r.data;
    const first = f.name ? f.name.split(" ")[0] : null;
    const msg = `${first ? `Hi ${first}, ` : "Hi, "}Current Automations here. If the setup is doing what you wanted, a Google review helps us more than anything: ${env.reviewLink} And if someone you know wants a device set up, this number is the one to text.`;
    await sendSms(twilio, env.demoLine, f.phone, msg);
    await syncDelete(twilio, FOLLOWUPS, r.key);
    await sendSms(twilio, env.demoLine, env.cell, `[${f.code}] review text sent.`);
    await postEvent(env.makeUrl, { event: "done", code: f.code, phone: f.phone, lane: "home", name: f.name, summary: "Review text sent", urgency: "low", action: "none" });
  }
  return due.length;
}
