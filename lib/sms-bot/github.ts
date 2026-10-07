const REPO = "Current-Automations/ca-schedule";
const DIR = "weeks";

function headers(token: string, raw = false): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: raw ? "application/vnd.github.raw+json" : "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "ca-sms-bot",
  };
}

// The week file plus any patch files beside it (2026-W41.ics, 2026-W41-patch1.ics).
// An unbuilt week returns [] so the caller knows those days are not safe to offer.
export async function loadWeekFiles(token: string, week: string): Promise<string[]> {
  const listUrl = `https://api.github.com/repos/${REPO}/contents/${encodeURI(DIR)}`;
  const res = await fetch(listUrl, { headers: headers(token) });
  if (!res.ok) throw new Error(`github list ${res.status}`);
  const entries = (await res.json()) as { name: string; path: string }[];
  const wanted = entries.filter((e) => e.name.startsWith(week) && e.name.endsWith(".ics"));
  const files: string[] = [];
  for (const e of wanted) {
    const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${encodeURI(e.path)}`, {
      headers: headers(token, true),
    });
    if (!r.ok) throw new Error(`github file ${r.status} ${e.name}`);
    files.push(await r.text());
  }
  return files;
}
