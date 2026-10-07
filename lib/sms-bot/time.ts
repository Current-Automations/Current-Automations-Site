export const TZ = "America/Toronto";

type Parts = { y: number; m: number; d: number; h: number; mi: number };

function tzOffsetMs(utcMs: number): number {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const p: Record<string, number> = {};
  for (const part of f.formatToParts(new Date(utcMs))) {
    if (part.type !== "literal") p[part.type] = Number(part.value);
  }
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - utcMs;
}

// Floating local wall time (the .ics has no TZID) to a UTC instant.
export function torontoToUtc({ y, m, d, h, mi }: Parts): number {
  const guess = Date.UTC(y, m - 1, d, h, mi);
  const once = guess - tzOffsetMs(guess);
  return guess - tzOffsetMs(once);
}

export function torontoParts(utcMs: number): Parts & { dow: number } {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
  });
  const p: Record<string, string> = {};
  for (const part of f.formatToParts(new Date(utcMs))) {
    if (part.type !== "literal") p[part.type] = part.value;
  }
  const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, mi: +p.minute, dow };
}

export function isoWeek(y: number, m: number, d: number): { year: number; week: number } {
  const date = new Date(Date.UTC(y, m - 1, d));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((date.getTime() - yearStart) / 86400000 + 1) / 7);
  return { year: date.getUTCFullYear(), week };
}

export function weekKey(y: number, m: number, d: number): string {
  const { year, week } = isoWeek(y, m, d);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

export function fmtSlot(utcMs: number): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(utcMs));
}

export function isoLocal(utcMs: number): string {
  const p = torontoParts(utcMs);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${p.y}-${pad(p.m)}-${pad(p.d)}T${pad(p.h)}:${pad(p.mi)}`;
}

export function parseIsoLocal(s: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(s);
  if (!m) return null;
  return torontoToUtc({ y: +m[1], m: +m[2], d: +m[3], h: +m[4], mi: +m[5] });
}
