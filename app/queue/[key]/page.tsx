import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadQueue, mediaUrl, type QueuedPost } from "@/lib/social/queue";
import { postedRows } from "@/lib/social/publish";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Week queue" },
  robots: { index: false, follow: false },
};

const fmt = new Intl.DateTimeFormat("en-CA", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Toronto",
});

function Media({ post }: { post: QueuedPost }) {
  const video = post.kind === "reel" || /\.(mp4|mov)$/i.test(post.media[0] ?? "");
  if (video) {
    return <video src={mediaUrl(post.media[0])} controls muted playsInline className="max-h-[480px] rounded border border-black/10 bg-black" />;
  }
  return (
    <div className="flex gap-2 overflow-x-auto">
      {post.media.map((m) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={m} src={mediaUrl(m)} alt="" className="h-64 w-auto shrink-0 rounded border border-black/10" />
      ))}
    </div>
  );
}

export default async function QueuePage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const expected = process.env.SOCIAL_PREVIEW_KEY ?? "";
  if (!expected || key !== expected) notFound();

  const queue = loadQueue();
  const posts = [...queue.posts].sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
  const posted = await postedRows(posts.flatMap((p) => p.channels.map((c) => `${p.id}:${c}`)));

  return (
    <div className="bg-[#f3ede1] px-4 py-10 text-[#1c2430]">
      <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold">Week {queue.week}</h1>
      <p className="mt-1 text-sm text-black/60">
        {posts.length} posts, {posts.filter((p) => p.approved).length} approved
        {queue.approvedAt ? `, approved ${queue.approvedAt}` : ", not yet approved"}
      </p>
      {posts.length === 0 && <p className="mt-8 text-black/60">Nothing queued.</p>}
      <ol className="mt-8 space-y-10">
        {posts.map((p) => (
          <li key={p.id} className="rounded-lg border border-black/15 bg-white p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
              <span className="font-medium">{fmt.format(new Date(p.at))}</span>
              <span className="font-mono text-xs uppercase tracking-wider text-black/60">
                {p.kind} · {p.channels.join(" + ")} · {p.id}
              </span>
            </div>
            <div className="mt-3">
              <Media post={p} />
            </div>
            <pre className="mt-4 whitespace-pre-wrap font-sans text-[15px] leading-relaxed">{p.caption}</pre>
            {p.fbCaption && (
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-black/60">Facebook copy</summary>
                <pre className="mt-2 whitespace-pre-wrap font-sans">{p.fbCaption}</pre>
              </details>
            )}
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className={`rounded px-2 py-1 ${p.approved ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}>
                {p.approved ? "approved" : "waiting"}
              </span>
              {!p.trueLine && <span className="rounded bg-rose-100 px-2 py-1 text-rose-900">no true line</span>}
              {p.channels.map((c) => {
                const row = posted[`${p.id}:${c}`];
                return row ? (
                  <span key={c} className="rounded bg-sky-100 px-2 py-1 text-sky-900">
                    {c} posted {fmt.format(new Date(row.at))}
                  </span>
                ) : null;
              })}
            </div>
            {p.note && <p className="mt-3 text-sm text-black/60">{p.note}</p>}
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
}
