import type { NextConfig } from "next";

const securityHeaders = [
  // preload is what gets the domain onto the browser-baked HSTS list, so the very
  // first visit is HTTPS too rather than one redirect away from it. Submitted to
  // hstspreload.org 2026-09-10, status pending; it lands whenever Chrome cuts a
  // release that includes it, so weeks not days.
  //
  // Do not remove preload or includeSubDomains from here once it lands. Delisting
  // ships inside browser binaries and takes months, and until then every subdomain
  // must serve valid HTTPS or it is unreachable, with no click-through.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Belt to HSTS's braces: any http:// subresource that slips into the markup gets
  // fetched over https instead of silently becoming mixed content.
  { key: "Content-Security-Policy", value: "upgrade-insecure-requests" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // /privacy-policy was a three-clause stub that predated the full PIPEDA and
      // CASL policy at /privacy. Two live privacy policies is worse than none,
      // since the weaker one is the one a complainant would quote.
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
    ];
  },
};

export default nextConfig;
