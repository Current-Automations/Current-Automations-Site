import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";

const sheetBody = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sheet-body",
});

const sheetDisplay = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sheet-display",
});

const sheetMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sheet-mono",
});

export const jobsheetFonts = `${sheetBody.variable} ${sheetDisplay.variable} ${sheetMono.variable}`;
