import { syncGet, syncList, syncSet, TwilioEnv } from "./twilio";

export const THREADS = "demo_threads";
export const CODES = "demo_codes";
export const HOLDS = "demo_holds";
export const FOLLOWUPS = "demo_followups";

export type Thread = {
  code: string;
  phone: string;
  lane: "home" | "business" | "unknown";
  name?: string;
  area?: string;
  device?: string;
  summary?: string;
  mutedUntil?: number;
  stalledTurns: number;
  firstSeen: number;
  lastSeen: number;
  hold?: Hold;
};

export type Hold = {
  start: string;
  end: string;
  address: string;
  job: string;
  price: string;
  phone: string;
  name: string;
  code: string;
};

export type Followup = { phone: string; code: string; sendAt: number; kind: "review"; name?: string };

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function hashCode(phone: string, salt: number): string {
  let h = 2166136261 ^ salt;
  for (const ch of phone) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619) >>> 0;
  }
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += ALPHABET[h % ALPHABET.length];
    h = Math.floor(h / ALPHABET.length) ^ (h << 3);
    h >>>= 0;
  }
  return out;
}

export async function loadThread(env: TwilioEnv, phone: string): Promise<Thread | null> {
  return syncGet<Thread>(env, THREADS, phone);
}

export async function saveThread(env: TwilioEnv, t: Thread): Promise<void> {
  await syncSet(env, THREADS, t.phone, t);
}

export async function newThread(env: TwilioEnv, phone: string, now: number): Promise<Thread> {
  let code = hashCode(phone, 0);
  for (let salt = 1; salt < 20; salt++) {
    const taken = await syncGet<{ phone: string }>(env, CODES, code);
    if (!taken || taken.phone === phone) break;
    code = hashCode(phone, salt);
  }
  await syncSet(env, CODES, code, { phone });
  const t: Thread = { code, phone, lane: "unknown", stalledTurns: 0, firstSeen: now, lastSeen: now };
  await saveThread(env, t);
  return t;
}

export async function phoneForCode(env: TwilioEnv, code: string): Promise<string | null> {
  const row = await syncGet<{ phone: string }>(env, CODES, code.toUpperCase());
  return row?.phone ?? null;
}

export async function listHolds(env: TwilioEnv): Promise<Hold[]> {
  return (await syncList<Hold>(env, HOLDS)).map((r) => r.data);
}

export async function saveHold(env: TwilioEnv, hold: Hold): Promise<void> {
  await syncSet(env, HOLDS, hold.start, hold);
}

export async function queueFollowup(env: TwilioEnv, f: Followup): Promise<void> {
  await syncSet(env, FOLLOWUPS, `${f.kind}:${f.phone}`, f);
}

export async function listFollowups(env: TwilioEnv): Promise<{ key: string; data: Followup }[]> {
  return syncList<Followup>(env, FOLLOWUPS);
}

export async function recentThreads(env: TwilioEnv, limit = 8): Promise<Thread[]> {
  const rows = await syncList<Thread>(env, THREADS);
  return rows
    .map((r) => r.data)
    .sort((a, b) => b.lastSeen - a.lastSeen)
    .slice(0, limit);
}
