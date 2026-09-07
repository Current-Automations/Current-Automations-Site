import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyCTA from "@/components/StickyCTA";
import { GA_MEASUREMENT_ID, SITE_URL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const TITLE = "Current Automations | Find Where Your Business Is Losing Money";
const DESCRIPTION =
  "Current Automations finds where your business is losing time and money, then builds and runs the automation that fixes it. Serving businesses across Ontario.";

export const metadata: Metadata = {
  // Required for the generated OG and Twitter images to resolve to absolute URLs.
  // Without it those cards render as broken images on every scraper.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Current Automations",
  },
  description: DESCRIPTION,
  applicationName: "Current Automations",
  // No canonical here on purpose. Metadata inherits, so a canonical set at the
  // root points every child page at the homepage. Each indexable page declares
  // its own in its `alternates` block.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    siteName: "Current Automations",
    url: SITE_URL,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="site-shell">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[linear-gradient(180deg,_#04091a_0%,_#081424_56%,_#f4f7fb_56%,_#f4f7fb_100%)]" />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          {/* Mobile bottom spacer so the sticky CTA never covers footer content */}
          <div className="h-20 lg:hidden" aria-hidden="true" />
          <StickyCTA />
        </div>
        {/* Cookieless and identifier-free, so both run without a consent gate.
            Everything that does set an identifier lives inside CookieConsent. */}
        <SpeedInsights />
        <Analytics />
        <CookieConsent gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
