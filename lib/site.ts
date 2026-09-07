// Single source of truth for the canonical origin. Metadata, the sitemap, robots
// and the checkout redirect URLs all have to agree, and they previously each
// carried their own copy of the domain.
export const SITE_URL = "https://currentautomations.ca";

// A GA4 measurement ID is a public identifier, not a credential: it ships in the
// page HTML on every load. Keeping it here rather than in an environment variable
// means one less thing to set per environment and no way for it to go missing.
// Loaded only after consent, from components/CookieConsent.tsx.
export const GA_MEASUREMENT_ID = "G-X7QE65LE1N";

// Routes that exist but must never appear in search results or the sitemap:
// deal-7k4m and receptionist-mode are handed out by link only, success is a
// post-checkout landing page, and book-a-demo is a bare redirect.
// Retired routes that 308 elsewhere (/privacy-policy) stay crawlable on purpose,
// since a disallowed redirect is a redirect no crawler ever follows.
export const NOINDEX_ROUTES = [
  "/deal-7k4m",
  "/receptionist-mode",
  "/success",
  "/book-a-demo",
];

type SitemapRoute = {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

export const SITEMAP_ROUTES: SitemapRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/call-dispatch", changeFrequency: "monthly", priority: 0.8 },
  { path: "/follow-up", changeFrequency: "monthly", priority: 0.8 },
  { path: "/back-office", changeFrequency: "monthly", priority: 0.8 },
  { path: "/lead-generation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/demo", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];
