import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyCTA from "@/components/StickyCTA";
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

export const metadata: Metadata = {
  title: {
    default: "Current Automations | Find Where Your Business Is Losing Money",
    template: "%s | Current Automations",
  },
  description:
    "Current Automations finds where your service business is losing time and money, then builds and runs the automation that fixes it. Serving trades businesses across Ontario.",
  openGraph: {
    title: "Current Automations | Find Where Your Business Is Losing Money",
    description:
      "Current Automations finds where your service business is losing time and money, then builds and runs the automation that fixes it. Serving trades businesses across Ontario.",
    type: "website",
    siteName: "Current Automations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Current Automations | Find Where Your Business Is Losing Money",
    description:
      "Current Automations finds where your service business is losing time and money, then builds and runs the automation that fixes it. Serving trades businesses across Ontario.",
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
        <div className="site-shell">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[linear-gradient(180deg,_#04091a_0%,_#081424_56%,_#f4f7fb_56%,_#f4f7fb_100%)]" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Mobile bottom spacer so the sticky CTA never covers footer content */}
          <div className="h-20 lg:hidden" aria-hidden="true" />
          <StickyCTA />
        </div>
      </body>
      <Script
        id="vtag-ai-js"
        src="https://r2.leadsy.ai/tag.js"
        data-pid="15uVMmObwRm7jxnEr"
        data-version="062024"
        strategy="afterInteractive"
      />
    </html>
  );
}
