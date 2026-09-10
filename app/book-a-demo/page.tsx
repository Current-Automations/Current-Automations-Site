import type { Metadata } from "next";
import BookingEmbed from "@/components/BookingEmbed";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import { siteContact } from "@/data/siteContent";

// Left noindex. This was a bare redirect to Google and was excluded so a page
// we did not control could not rank under our own domain. It is our page now,
// but it is still a thin booking form with nothing to rank for, and every route
// that matters already links to it.
export const metadata: Metadata = {
  title: { absolute: "Book a Free Walkthrough | Current Automations" },
  description:
    "Pick a time for a free 30-minute walkthrough. No pitch, no obligation, and nothing to prepare.",
  robots: { index: false, follow: false },
};

const whatHappens = [
  {
    time: "30 min",
    label: "A conversation, not a pitch. We ask how things run now and where the time goes.",
  },
  {
    time: "On the call",
    label: "We point at the one or two things worth fixing first, business or home.",
  },
  {
    time: "After",
    label: "You leave knowing what would fix it, whether or not you hire us.",
  },
];

export default function BookADemoPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="BOOKING SLIP"
        docCode="FORM BK-01"
        kicker="No pitch. No obligation."
        title="Book a free walkthrough."
        description="Thirty minutes, on a call, about how your business or your home actually runs day to day. Pick a time below and it is booked, you never leave this page."
        sideAlign="start"
        side={
          <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                WHAT HAPPENS
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                FREE
              </span>
            </div>
            <div className="divide-y divide-[rgba(28,36,48,0.1)]">
              {whatHappens.map((row) => (
                <div
                  key={row.time}
                  className={`${jobsheet.ledgerRow} grid grid-cols-[5.5rem_1fr] items-baseline gap-4 px-5 py-3.5`}
                >
                  <span className={`${jobsheet.mono} text-[0.7rem] uppercase tracking-[0.14em] text-[#58524a]`}>
                    {row.time}
                  </span>
                  <span className="text-sm leading-6 text-[#3a352c]">{row.label}</span>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-dashed border-[rgba(28,36,48,0.24)] px-5 py-4">
              <p className="text-xs leading-6 text-[#58524a]">
                Would rather just talk?{" "}
                <a
                  href={`tel:${siteContact.phoneHref}`}
                  className="font-medium text-[var(--color-brand-strong)] hover:underline"
                >
                  {siteContact.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        }
      />

      <section className={`${jobsheet.root} ${jobsheet.paperTexture} relative pb-20 sm:pb-24`}>
        <div className="container-shell relative">
          <BookingEmbed />
        </div>
      </section>
    </div>
  );
}
