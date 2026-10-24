import { notifyDiscord } from "@/lib/discord";
import { syncGet, syncSet, type TwilioEnv } from "@/lib/sms-bot/twilio";
import { fbPublish, igPublish, readMetaEnv, type MetaEnv } from "./meta";
import { loadQueue, mediaUrl, type Channel, type QueuedPost } from "./queue";

export const POSTED = "social_posted";

export type PostedRow = { id: string; channel: Channel; remoteId: string; at: number };

export type PublishResult = { published: string[]; failed: string[]; skipped: string[] };

function twilioEnv(): TwilioEnv | null {
  const accountSid = process.env.TWILIO_ACCOUNT_SID ?? "";
  const authToken = process.env.TWILIO_AUTH_TOKEN ?? "";
  return accountSid && authToken ? { accountSid, authToken } : null;
}

async function publishOne(meta: MetaEnv, post: QueuedPost, channel: Channel): Promise<string> {
  const media = post.media.map(mediaUrl);
  const caption = channel === "fb" ? (post.fbCaption ?? post.caption) : post.caption;
  return channel === "ig" ? igPublish(meta, { kind: post.kind, media, caption }) : fbPublish(meta, { kind: post.kind, media, caption });
}

export async function publishDue(now = Date.now()): Promise<PublishResult> {
  const out: PublishResult = { published: [], failed: [], skipped: [] };
  const meta = readMetaEnv();
  const twilio = twilioEnv();
  if (!meta || !twilio) {
    await notifyDiscord("Publisher ran with META_* or Twilio env missing. Nothing posted.");
    return out;
  }
  const due = loadQueue().posts.filter((p) => p.approved && Date.parse(p.at) <= now);
  for (const post of due) {
    for (const channel of post.channels) {
      const key = `${post.id}:${channel}`;
      if (await syncGet<PostedRow>(twilio, POSTED, key)) {
        out.skipped.push(key);
        continue;
      }
      try {
        const remoteId = await publishOne(meta, post, channel);
        await syncSet(twilio, POSTED, key, { id: post.id, channel, remoteId, at: now } satisfies PostedRow);
        out.published.push(key);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        out.failed.push(`${key}: ${msg}`);
        console.error("[social] publish failed", key, msg);
      }
    }
  }
  console.log("[social] publish run", JSON.stringify({ due: due.map((p) => p.id), ...out }));
  if (out.published.length || out.failed.length) {
    const lines = [
      ...out.published.map((k) => `posted ${k}`),
      ...out.failed.map((k) => `FAILED ${k}`),
    ];
    await notifyDiscord(`Publisher: ${lines.join("\n")}`);
  } else if (out.skipped.length) {
    await notifyDiscord(`Publisher: nothing new, already posted ${out.skipped.join(", ")}`);
  }
  return out;
}

export async function postedRows(ids: string[]): Promise<Record<string, PostedRow>> {
  const twilio = twilioEnv();
  const rows: Record<string, PostedRow> = {};
  if (!twilio) return rows;
  for (const key of ids) {
    const row = await syncGet<PostedRow>(twilio, POSTED, key);
    if (row) rows[key] = row;
  }
  return rows;
}
