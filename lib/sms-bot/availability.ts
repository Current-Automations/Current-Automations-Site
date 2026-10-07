import { Busy, parseIcs } from "./ics";
import { fmtSlot, isoLocal, torontoParts, torontoToUtc, weekKey } from "./time";

const DAY_START = 10;
const DAY_END = 20;
const SUNDAY_START = 12;
const SLOT_MIN = 90;
const STEP_MIN = 30;
const BUFFER_MIN = 30;
const MIN_NOTICE_MIN = 3 * 60;
const LATE_SHIFT_HOUR = 15;
const DAYS_AHEAD = 7;
const MAX_PER_DAY = 2;

export type Slot = { start: string; end: string; label: string };
export type Availability = {
  slots: Slot[];
  coveredThrough: string | null;
  uncoveredDays: string[];
};

export type IcsSource = (week: string) => Promise<string[]>;

function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd;
}

export async function computeAvailability(
  now: number,
  loadWeek: IcsSource,
  holds: { start: number; end: number }[] = []
): Promise<Availability> {
  const today = torontoParts(now);
  const weeks = new Map<string, Busy[] | null>();
  const dayInfo: { key: string; dayStart: number; busy: Busy[]; covered: boolean; dow: number }[] = [];

  for (let i = 0; i <= DAYS_AHEAD; i++) {
    const noon = torontoToUtc({ y: today.y, m: today.m, d: today.d, h: 12, mi: 0 }) + i * 86400000;
    const p = torontoParts(noon);
    const wk = weekKey(p.y, p.m, p.d);
    if (!weeks.has(wk)) {
      const files = await loadWeek(wk);
      weeks.set(wk, files.length ? files.flatMap(parseIcs) : null);
    }
    const busy = weeks.get(wk);
    dayInfo.push({
      key: isoLocal(noon).slice(0, 10),
      dayStart: torontoToUtc({ y: p.y, m: p.m, d: p.d, h: 0, mi: 0 }),
      busy: busy ?? [],
      covered: busy !== null,
      dow: p.dow,
    });
  }

  const slots: Slot[] = [];
  const uncoveredDays: string[] = [];
  let coveredThrough: string | null = null;

  for (const day of dayInfo) {
    if (!day.covered) {
      uncoveredDays.push(day.key);
      continue;
    }
    coveredThrough = day.key;
    const dayEnd = day.dayStart + 86400000;
    const todays = day.busy.filter((b) => overlaps(b.start, b.end, day.dayStart, dayEnd));
    const lateShift = todays.find(
      (b) => /shift/i.test(b.summary) && torontoParts(b.start).h >= LATE_SHIFT_HOUR
    );
    let openFrom = day.dayStart + (day.dow === 0 ? SUNDAY_START : DAY_START) * 3600000;
    if (lateShift) openFrom = Math.max(openFrom, lateShift.end);
    const openTo = day.dayStart + DAY_END * 3600000;
    const earliest = now + MIN_NOTICE_MIN * 60000;

    let count = 0;
    for (let t = openFrom; t + SLOT_MIN * 60000 <= openTo && count < MAX_PER_DAY; t += STEP_MIN * 60000) {
      if (t < earliest) continue;
      const end = t + SLOT_MIN * 60000;
      const clash =
        todays.some((b) => overlaps(t - BUFFER_MIN * 60000, end + BUFFER_MIN * 60000, b.start, b.end)) ||
        holds.some((h) => overlaps(t - BUFFER_MIN * 60000, end + BUFFER_MIN * 60000, h.start, h.end));
      if (clash) continue;
      slots.push({ start: isoLocal(t), end: isoLocal(end), label: fmtSlot(t) });
      count++;
      t += (SLOT_MIN + BUFFER_MIN) * 60000 - STEP_MIN * 60000;
    }
  }

  return { slots, coveredThrough, uncoveredDays };
}
