export type TwilioEnv = { accountSid: string; authToken: string };

export type TwilioMessage = {
  sid: string;
  from: string;
  to: string;
  body: string;
  direction: string;
  date_sent: string | null;
  date_created: string;
  num_media: string;
};

function auth(env: TwilioEnv): string {
  return "Basic " + Buffer.from(`${env.accountSid}:${env.authToken}`).toString("base64");
}

const API = "https://api.twilio.com/2010-04-01/Accounts";
const SYNC = "https://sync.twilio.com/v1/Services/default";

export async function sendSms(env: TwilioEnv, from: string, to: string, body: string): Promise<string> {
  const res = await fetch(`${API}/${env.accountSid}/Messages.json`, {
    method: "POST",
    headers: { Authorization: auth(env), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ From: from, To: to, Body: body }),
  });
  if (!res.ok) throw new Error(`twilio send ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { sid: string };
  return json.sid;
}

async function listMessages(env: TwilioEnv, query: Record<string, string>): Promise<TwilioMessage[]> {
  const qs = new URLSearchParams({ ...query, PageSize: "50" });
  const res = await fetch(`${API}/${env.accountSid}/Messages.json?${qs}`, { headers: { Authorization: auth(env) } });
  if (!res.ok) throw new Error(`twilio list ${res.status}`);
  const json = (await res.json()) as { messages: TwilioMessage[] };
  return json.messages;
}

// Twilio's own log is the conversation memory. Both directions, last `days` days.
export async function threadHistory(env: TwilioEnv, line: string, other: string, days: number): Promise<TwilioMessage[]> {
  const since = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
  const [inbound, outbound] = await Promise.all([
    listMessages(env, { From: other, To: line, "DateSent>": since }),
    listMessages(env, { From: line, To: other, "DateSent>": since }),
  ]);
  const all = [...inbound, ...outbound];
  const t = (m: TwilioMessage) => new Date(m.date_sent ?? m.date_created).getTime();
  all.sort((a, b) => t(a) - t(b));
  return all;
}

export async function fetchMedia(env: TwilioEnv, url: string): Promise<{ data: string; mediaType: string }> {
  const res = await fetch(url, { headers: { Authorization: auth(env) }, redirect: "follow" });
  if (!res.ok) throw new Error(`twilio media ${res.status}`);
  const mediaType = res.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";
  const data = Buffer.from(await res.arrayBuffer()).toString("base64");
  return { data, mediaType };
}

async function syncReq(env: TwilioEnv, path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${SYNC}${path}`, {
    ...init,
    headers: { Authorization: auth(env), ...(init.headers ?? {}) },
  });
}

async function ensureMap(env: TwilioEnv, map: string): Promise<void> {
  const res = await syncReq(env, `/Maps`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ UniqueName: map }),
  });
  if (!res.ok && res.status !== 409) throw new Error(`sync map create ${res.status}`);
}

export async function syncGet<T>(env: TwilioEnv, map: string, key: string): Promise<T | null> {
  const res = await syncReq(env, `/Maps/${map}/Items/${encodeURIComponent(key)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`sync get ${res.status}`);
  const json = (await res.json()) as { data: T };
  return json.data;
}

export async function syncSet(env: TwilioEnv, map: string, key: string, data: unknown): Promise<void> {
  const body = new URLSearchParams({ Data: JSON.stringify(data) });
  const update = await syncReq(env, `/Maps/${map}/Items/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (update.ok) return;
  if (update.status !== 404) throw new Error(`sync set ${update.status}`);
  await ensureMap(env, map);
  const create = await syncReq(env, `/Maps/${map}/Items`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ Key: key, Data: JSON.stringify(data) }),
  });
  if (!create.ok) throw new Error(`sync create ${create.status} ${await create.text()}`);
}

export async function syncList<T>(env: TwilioEnv, map: string): Promise<{ key: string; data: T }[]> {
  const res = await syncReq(env, `/Maps/${map}/Items?PageSize=100`);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`sync list ${res.status}`);
  const json = (await res.json()) as { items: { key: string; data: T }[] };
  return json.items;
}

export async function syncDelete(env: TwilioEnv, map: string, key: string): Promise<void> {
  const res = await syncReq(env, `/Maps/${map}/Items/${encodeURIComponent(key)}`, { method: "DELETE" });
  if (!res.ok && res.status !== 404) throw new Error(`sync delete ${res.status}`);
}
