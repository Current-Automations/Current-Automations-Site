// SCHEDULE_ICS is a JSON map of week file name to its stripped .ics (titles already reduced to
// Shift or Busy), set in Vercel by ops/schedule/export_schedule.py on every /plan-week.
// An unbuilt week returns [] so the caller knows those days are not safe to offer.
export async function loadWeekFiles(raw: string, week: string): Promise<string[]> {
  if (!raw) return [];
  const files = JSON.parse(raw) as Record<string, string>;
  return Object.keys(files)
    .filter((name) => name.startsWith(week))
    .sort()
    .map((name) => files[name]);
}
