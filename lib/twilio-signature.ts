import crypto from "node:crypto";

// Twilio signs the full public URL plus every POST parameter, sorted by key and
// concatenated as key + value, using the account auth token (not the API key).
export function expectedSignature(url: string, params: URLSearchParams, authToken: string): string {
  const keys = Array.from(new Set(Array.from(params.keys()))).sort();
  let payload = url;
  for (const key of keys) {
    for (const value of params.getAll(key)) {
      payload += key + value;
    }
  }
  return crypto.createHmac("sha1", authToken).update(Buffer.from(payload, "utf-8")).digest("base64");
}

export function signatureMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// Vercel terminates TLS upstream, so request.url can carry an internal host or the
// wrong protocol. Twilio signed the public URL, so rebuild that exactly.
export function publicUrl(request: Request, path: string): string {
  const headers = request.headers;
  const proto = headers.get("x-forwarded-proto") ?? "https";
  const host = headers.get("x-forwarded-host") ?? headers.get("host") ?? "";
  return `${proto}://${host}${path}`;
}
