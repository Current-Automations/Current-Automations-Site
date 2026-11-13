import { fmtSlot, isoLocal, parseIsoLocal, torontoParts, torontoToUtc } from "../sms-bot/time";

// Rowan Plumbing Co. is the made-up shop the voice demo answers for. Its calendar is
// real in the sense that matters on a call: a slot someone books is gone for the next
// caller, and a share of slots are already taken by standing work so "that one's
// gone, I have 3 or 4" happens without anyone staging it.

const VISIT_MIN = 60;
const MIN_NOTICE_MIN = 120;
const DAYS_AHEAD = 14;
// Callers are testing, not hiring a plumber, so a booking frees itself after a day.
const HOLD_MS = 24 * 3600000;
const STANDING_WORK_PCT = 35;
// Local open and close hour by day of week, Sunday first. null is closed.
const HOURS: ([number, number] | null)[] = [null, [8, 17], [8, 17], [8, 17], [8, 17], [8, 17], [9, 13]];

export type Booking = {
  start: string;
  name: string;
  phone: string;
  address: string;
  issue: string;
  callId: string;
  createdAt: number;
};

export type Store = {
  list(): Promise<Booking[]>;
  put(b: Booking): Promise<void>;
  remove(start: string): Promise<void>;
};

export type Opening = { start: string; label: string };

export type Result =
  | { ok: true; message: string; openings?: Opening[]; booking?: Opening }
  | { ok: false; reason: string; message: string; openings?: Opening[] };

function standingWork(start: string): boolean {
  let h = 2166136261;
  for (const ch of start) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h % 100 < STANDING_WORK_PCT;
}

export function phoneKey(raw: string): string {
  return raw.replace(/\D/g, "").slice(-10);
}

function dayStarts(y: number, m: number, d: number): number[] {
  const noon = torontoToUtc({ y, m, d, h: 12, mi: 0 });
  const hours = HOURS[torontoParts(noon).dow];
  if (!hours) return [];
  const out: number[] = [];
  for (let h = hours[0]; h * 60 + VISIT_MIN <= hours[1] * 60; h++) {
    out.push(torontoToUtc({ y, m, d, h, mi: 0 }));
  }
  return out;
}

async function liveBookings(store: Store, now: number): Promise<Booking[]> {
  const all = await store.list();
  const live: Booking[] = [];
  for (const b of all) {
    const start = parseIsoLocal(b.start);
    if (start === null || start < now || b.createdAt + HOLD_MS < now) await store.remove(b.start);
    else live.push(b);
  }
  return live;
}

function openOn(y: number, m: number, d: number, now: number, taken: Set<string>): Opening[] {
  return dayStarts(y, m, d)
    .filter((t) => t >= now + MIN_NOTICE_MIN * 60000 && t <= now + (DAYS_AHEAD + 1) * 86400000)
    .map((t) => ({ start: isoLocal(t), label: fmtSlot(t) }))
    .filter((o) => !taken.has(o.start) && !standingWork(o.start));
}

function upcoming(now: number, taken: Set<string>, fromDay = 0): Opening[][] {
  const today = torontoParts(now);
  const days: Opening[][] = [];
  for (let i = fromDay; i <= DAYS_AHEAD; i++) {
    const p = torontoParts(torontoToUtc({ y: today.y, m: today.m, d: today.d, h: 12, mi: 0 }) + i * 86400000);
    const open = openOn(p.y, p.m, p.d, now, taken);
    if (open.length) days.push(open);
  }
  return days;
}

function partOfDay(o: Opening, part: string | undefined): boolean {
  if (part !== "morning" && part !== "afternoon") return true;
  const h = Number(o.start.slice(11, 13));
  return part === "morning" ? h < 12 : h >= 12;
}

function spread(open: Opening[], n: number): Opening[] {
  if (open.length <= n) return open;
  const out: Opening[] = [];
  for (let i = 0; i < n; i++) out.push(open[Math.round((i * (open.length - 1)) / (n - 1))]);
  return out;
}

export async function checkAvailability(
  store: Store,
  now: number,
  args: { date?: string; time_of_day?: string }
): Promise<Result> {
  const taken = new Set((await liveBookings(store, now)).map((b) => b.start));
  const days = upcoming(now, taken);
  if (!days.length) return { ok: false, reason: "full", message: "Nothing open in the next two weeks. Offer a callback." };

  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(args.date ?? "");
  if (m) {
    const asked = openOn(+m[1], +m[2], +m[3], now, taken).filter((o) => partOfDay(o, args.time_of_day));
    if (asked.length) return { ok: true, message: `Open on ${args.date}. Offer two or three, not the whole list.`, openings: asked };
    const next = days.find((d) => d[0].start.slice(0, 10) > args.date!) ?? days[0];
    const closed = dayStarts(+m[1], +m[2], +m[3]).length === 0;
    return {
      ok: false,
      reason: closed ? "closed" : "day_full",
      message: closed
        ? `The shop is closed on ${args.date}. Say so, then offer these.`
        : `Nothing open on ${args.date}${args.time_of_day ? ` in the ${args.time_of_day}` : ""}. Say so, then offer these.`,
      openings: spread(next, 3),
    };
  }

  const soonest = days.slice(0, 3).flatMap((d) => spread(d.filter((o) => partOfDay(o, args.time_of_day)), 2));
  return { ok: true, message: "Soonest openings. Offer two or three.", openings: soonest };
}

async function validate(start: string, now: number, taken: Set<string>): Promise<Result | null> {
  const t = parseIsoLocal(start);
  const m = /^(\d{4})-(\d{2})-(\d{2})T/.exec(start);
  if (t === null || !m) {
    return { ok: false, reason: "bad_time", message: "That start time was not readable. Use YYYY-MM-DDTHH:mm from check_availability." };
  }
  const day = openOn(+m[1], +m[2], +m[3], now, taken);
  if (day.some((o) => o.start === isoLocal(t))) return null;
  const near = [...day].sort((a, b) => Math.abs(parseIsoLocal(a.start)! - t) - Math.abs(parseIsoLocal(b.start)! - t)).slice(0, 2);
  const openings = near.length ? near.sort((a, b) => a.start.localeCompare(b.start)) : spread(upcoming(now, taken)[0] ?? [], 3);
  return {
    ok: false,
    reason: "taken",
    message: near.length ? "That time is not open. These are the closest that day." : "Nothing open that day. These are the next openings.",
    openings,
  };
}

export async function book(
  store: Store,
  now: number,
  args: { start?: string; name?: string; phone?: string; address?: string; issue?: string },
  callId: string
): Promise<Result> {
  const phone = phoneKey(args.phone ?? "");
  if (!args.start || !args.name || phone.length !== 10) {
    return { ok: false, reason: "missing", message: "Need a start time, a name and a ten digit phone number before booking." };
  }
  const live = await liveBookings(store, now);
  const mine = live.find((b) => phoneKey(b.phone) === phone);
  if (mine) {
    return {
      ok: false,
      reason: "already_booked",
      message: `This number already has ${fmtSlot(parseIsoLocal(mine.start)!)}. Use reschedule_appointment to move it.`,
    };
  }
  const problem = await validate(args.start, now, new Set(live.map((b) => b.start)));
  if (problem) return problem;
  const start = isoLocal(parseIsoLocal(args.start)!);
  await store.put({ start, name: args.name, phone, address: args.address ?? "", issue: args.issue ?? "", callId, createdAt: now });
  const label = fmtSlot(parseIsoLocal(start)!);
  return { ok: true, message: `Booked for ${label}. Read it back once.`, booking: { start, label } };
}

export async function reschedule(
  store: Store,
  now: number,
  args: { phone?: string; new_start?: string },
  callId: string
): Promise<Result> {
  const phone = phoneKey(args.phone ?? "");
  const live = await liveBookings(store, now);
  const mine = live.find((b) => phoneKey(b.phone) === phone);
  if (!mine) return { ok: false, reason: "not_found", message: "No booking under that number. Offer to book a new one." };
  if (!args.new_start) return { ok: false, reason: "missing", message: "Need the new start time." };
  const problem = await validate(args.new_start, now, new Set(live.filter((b) => b !== mine).map((b) => b.start)));
  if (problem) return problem;
  const start = isoLocal(parseIsoLocal(args.new_start)!);
  if (start !== mine.start) {
    await store.put({ ...mine, start, callId, createdAt: now });
    await store.remove(mine.start);
  }
  const label = fmtSlot(parseIsoLocal(start)!);
  return { ok: true, message: `Moved to ${label}. The old time is released.`, booking: { start, label } };
}

export async function cancel(store: Store, now: number, args: { phone?: string }): Promise<Result> {
  const phone = phoneKey(args.phone ?? "");
  const mine = (await liveBookings(store, now)).find((b) => phoneKey(b.phone) === phone);
  if (!mine) return { ok: false, reason: "not_found", message: "No booking under that number." };
  await store.remove(mine.start);
  return { ok: true, message: `Cancelled ${fmtSlot(parseIsoLocal(mine.start)!)}.` };
}
