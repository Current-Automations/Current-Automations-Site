import { torontoToUtc } from "./time";

export type Busy = { start: number; end: number; summary: string; category: string };

function unfold(text: string): string[] {
  return text.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "").split("\n");
}

function parseStamp(v: string): number | null {
  const m = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?(Z?)$/.exec(v.trim());
  if (!m) return null;
  if (m[7] === "Z") return Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0));
  return torontoToUtc({ y: +m[1], m: +m[2], d: +m[3], h: +m[4], mi: +m[5] });
}

export function parseIcs(text: string): Busy[] {
  const out: Busy[] = [];
  let cur: Partial<Busy> | null = null;
  for (const line of unfold(text)) {
    if (line === "BEGIN:VEVENT") cur = {};
    else if (line === "END:VEVENT") {
      if (cur && cur.start !== undefined && cur.end !== undefined) {
        out.push({ start: cur.start, end: cur.end, summary: cur.summary ?? "", category: cur.category ?? "" });
      }
      cur = null;
    } else if (cur) {
      const i = line.indexOf(":");
      if (i < 0) continue;
      const key = line.slice(0, i).split(";")[0];
      const val = line.slice(i + 1);
      if (key === "DTSTART") cur.start = parseStamp(val) ?? undefined;
      else if (key === "DTEND") cur.end = parseStamp(val) ?? undefined;
      else if (key === "SUMMARY") cur.summary = val.replace(/\,/g, ",").replace(/\n/g, " ");
      else if (key === "CATEGORIES") cur.category = val;
    }
  }
  return out;
}
