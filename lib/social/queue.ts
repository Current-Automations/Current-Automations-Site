import raw from "@/data/social-queue.json";

export type Channel = "ig" | "fb";
export type PostKind = "image" | "carousel" | "reel" | "story";

export type QueuedPost = {
  id: string;
  at: string;
  channels: Channel[];
  kind: PostKind;
  media: string[];
  caption: string;
  fbCaption?: string;
  trueLine?: string;
  approved: boolean;
  note?: string;
};

export type Queue = { week: string; approvedAt?: string; posts: QueuedPost[] };

export function loadQueue(): Queue {
  return raw as Queue;
}

export function mediaUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = (process.env.SITE_URL ?? "https://currentautomations.ca").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
