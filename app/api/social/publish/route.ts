import { publishDue } from "@/lib/social/publish";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

// Vercel Cron hits this once a day (vercel.json). Anything approved in
// data/social-queue.json whose time has passed and is not yet logged goes out.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET ?? "";
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response(null, { status: 401 });
  }
  return Response.json(await publishDue());
}
