import type { PostKind } from "./queue";

export type MetaEnv = { pageId: string; igUserId: string; token: string };

export type MediaPost = { kind: PostKind; media: string[]; caption: string };

const GRAPH = "https://graph.facebook.com/v25.0";

export function readMetaEnv(): MetaEnv | null {
  const pageId = process.env.META_PAGE_ID ?? "";
  const igUserId = process.env.META_IG_USER_ID ?? "";
  const token = process.env.META_ACCESS_TOKEN ?? "";
  if (!pageId || !igUserId || !token) return null;
  return { pageId, igUserId, token };
}

async function graph<T>(env: MetaEnv, path: string, params: Record<string, string>, method: "GET" | "POST" = "POST"): Promise<T> {
  const body = new URLSearchParams({ ...params, access_token: env.token });
  const res = await fetch(method === "GET" ? `${GRAPH}/${path}?${body}` : `${GRAPH}/${path}`, {
    method,
    ...(method === "POST" ? { headers: { "Content-Type": "application/x-www-form-urlencoded" }, body } : {}),
    signal: AbortSignal.timeout(30000),
  });
  const json = (await res.json()) as T & { error?: { message: string; code: number } };
  if (!res.ok || json.error) throw new Error(`graph ${path} ${res.status}: ${json.error?.message ?? "unknown"}`);
  return json;
}

export async function fbPublish(env: MetaEnv, post: MediaPost): Promise<string> {
  const page = env.pageId;
  if (post.kind === "image") {
    const r = await graph<{ post_id?: string; id: string }>(env, `${page}/photos`, { url: post.media[0], caption: post.caption });
    return r.post_id ?? r.id;
  }
  if (post.kind === "carousel") {
    const ids: string[] = [];
    for (const url of post.media) {
      const r = await graph<{ id: string }>(env, `${page}/photos`, { url, published: "false" });
      ids.push(r.id);
    }
    const r = await graph<{ id: string }>(env, `${page}/feed`, {
      message: post.caption,
      attached_media: JSON.stringify(ids.map((media_fbid) => ({ media_fbid }))),
    });
    return r.id;
  }
  if (post.kind === "reel") {
    const r = await graph<{ id: string }>(env, `${page}/videos`, { file_url: post.media[0], description: post.caption });
    return r.id;
  }
  throw new Error("fb: stories are not published through the API");
}

async function waitForContainer(env: MetaEnv, id: string): Promise<void> {
  for (let i = 0; i < 40; i++) {
    const r = await graph<{ status_code: string; status?: string }>(env, id, { fields: "status_code,status" }, "GET");
    if (r.status_code === "FINISHED") return;
    if (r.status_code === "ERROR" || r.status_code === "EXPIRED") throw new Error(`ig container ${id} ${r.status_code}: ${r.status ?? ""}`);
    await new Promise((res) => setTimeout(res, 3000));
  }
  throw new Error(`ig container ${id} still processing after 2 min`);
}

export async function igPublish(env: MetaEnv, post: MediaPost): Promise<string> {
  const ig = env.igUserId;
  let creationId: string;
  if (post.kind === "image") {
    creationId = (await graph<{ id: string }>(env, `${ig}/media`, { image_url: post.media[0], caption: post.caption })).id;
  } else if (post.kind === "carousel") {
    const children: string[] = [];
    for (const url of post.media) {
      children.push((await graph<{ id: string }>(env, `${ig}/media`, { image_url: url, is_carousel_item: "true" })).id);
    }
    for (const c of children) await waitForContainer(env, c);
    creationId = (await graph<{ id: string }>(env, `${ig}/media`, { media_type: "CAROUSEL", children: children.join(","), caption: post.caption })).id;
  } else if (post.kind === "reel") {
    creationId = (await graph<{ id: string }>(env, `${ig}/media`, { media_type: "REELS", video_url: post.media[0], caption: post.caption, share_to_feed: "true" })).id;
  } else {
    const url = post.media[0];
    const isVideo = /\.(mp4|mov)(\?|$)/i.test(url);
    creationId = (await graph<{ id: string }>(env, `${ig}/media`, { media_type: "STORIES", ...(isVideo ? { video_url: url } : { image_url: url }) })).id;
  }
  await waitForContainer(env, creationId);
  const r = await graph<{ id: string }>(env, `${ig}/media_publish`, { creation_id: creationId });
  return r.id;
}
