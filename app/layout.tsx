import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Current Automations | Stop Losing Jobs to Missed Calls",
    template: "%s | Current Automations",
  },
  description:
    "Current Automations finds where your service business is losing time and money, then builds and runs the automation that fixes it. Serving trades businesses across Ontario.",
  openGraph: {
    title: "Current Automations | Stop Losing Jobs to Missed Calls",
    description:
      "Current Automations finds where your service business is losing time and money, then builds and runs the automation that fixes it. Serving trades businesses across Ontario.",
    type: "website",
    siteName: "Current Automations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Current Automations | Stop Losing Jobs to Missed Calls",
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <div className="site-shell">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top_left,_rgba(93,214,203,0.2),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(244,214,165,0.22),_transparent_20%),linear-gradient(180deg,_#04091a_0%,_#0b1828_56%,_#f4f7fb_56%,_#f4f7fb_100%)]" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
