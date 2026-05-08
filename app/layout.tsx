import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Current Automations | AI Systems for Service Businesses",
    template: "%s | Current Automations",
  },
  description:
    "Current Automations finds where your business is losing time and money, then builds the AI systems that fix it. Serving trades and service businesses across Ontario.",
  openGraph: {
    title: "Current Automations | AI Systems for Service Businesses",
    description:
      "Current Automations finds where your business is losing time and money, then builds the AI systems that fix it. Serving trades and service businesses across Ontario.",
    type: "website",
    siteName: "Current Automations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Current Automations | AI Systems for Service Businesses",
    description:
      "Current Automations finds where your business is losing time and money, then builds the AI systems that fix it. Serving trades and service businesses across Ontario.",
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
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.2),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(244,214,165,0.22),_transparent_20%),linear-gradient(180deg,_#07111d_0%,_#0c182a_56%,_#f4f7fb_56%,_#f4f7fb_100%)]" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
