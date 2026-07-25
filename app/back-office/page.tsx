import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import TicketCard from "@/components/jobsheet/TicketCard";
import Stamp from "@/components/jobsheet/Stamp";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  title: "Back-Office & Admin",
  description:
    "Paperwork handled. Automations for the admin work that eats your evenings, starting with invoice and payment follow-up that chases overdue invoices politely and on schedule.",
};

const invoiceBeats = [
  { time: "DUE DATE", event: "Invoice unpaid at 9am. A friendly reminder goes out by text and email.", tone: "plain" as const },
  { time: "DAY 7", event: "Still unpaid. A firmer, still-polite nudge goes out. You have not touched anything.", tone: "plain" as const },
  { time: "DAY 14", event: "Final automated reminder, with a direct way to pay or reply.", tone: "plain" as const },
  { time: "PAID", event: "Marked paid in your sheet. The chasing stops instantly. Every touch was logged.", tone: "teal" as const },
];

export default function BackOfficePage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="SERVICE FILE"
        docCode="FORM BO-01"
        kicker="Pillar 03 · Back-office & admin"
        title={
          <>
            Paperwork handled.
            <br />
            Evenings returned.
          </>
        }
        description="The admin work that keeps you at the desk after the trucks are parked: chasing invoices, sending reminders, keeping the books straight. We automate it one job at a time, starting with the one that stings most: getting paid on time."
      />

      {/* First system: invoice follow-up */}
      <JobSheetSection
        code="BO-02"
        label="First system in the lane"
        title="Invoice and payment follow-up, on autopilot."
        description="55% of B2B invoices go overdue, and chasing them is the most awkward conversation in the trades. The system does the chasing: polite, consistent, and impossible to forget. You just see the money arrive."
        tone="carbon"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-start">
          <Reveal>
            <TicketCard refCode="HOW">
              <div className="mb-5">
                <Stamp label="How it runs" tone="teal" />
              </div>
              <p className="text-base leading-8 text-[#3a352c]">
                Every morning the system checks your invoice sheet. Anything unpaid at the due date, a week over, or two weeks over gets a reminder written to be polite but firm, sent by text and email. The moment an invoice is marked paid, the chasing stops. Every message is logged so you always know who was nudged and when.
              </p>
              <p className="mt-6 border-t-2 border-dashed border-[rgba(28,36,48,0.24)] pt-5 text-base leading-8 text-[#3a352c]">
                Not comfortable with automatic messages to your customers? Start with approvals on: each reminder waits for your OK before it sends, and you hand over control when you&apos;re ready.
              </p>
            </TicketCard>
          </Reveal>

          <Reveal delay={110}>
            <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
              <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
                <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                  INVOICE #1042
                </span>
                <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                  $2,150
                </span>
              </div>
              <div className="divide-y divide-[rgba(28,36,48,0.1)]">
                {invoiceBeats.map((row) => (
                  <div
                    key={row.time}
                    className={`${jobsheet.ledgerRow} grid grid-cols-[5.5rem_1fr] items-baseline gap-4 px-5 py-4`}
                  >
                    <span className={`${jobsheet.mono} text-[0.7rem] font-semibold ${row.tone === "teal" ? "text-[var(--color-brand-strong)]" : "text-[#58524a]"}`}>
                      {row.time}
                    </span>
                    <span className={`text-sm leading-6 ${row.tone === "teal" ? "font-semibold text-[var(--color-brand-strong)]" : "text-[#3a352c]"}`}>
                      {row.event}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-8 text-center text-sm leading-7 text-[#58524a]">
          Invoice Payment Follow Up runs at $79/month, alone or inside the Growth tier.{" "}
          <Link href="/pricing#a-la-carte" className="font-medium text-[var(--color-brand-strong)] hover:underline">
            See pricing &#8594;
          </Link>
        </p>
      </JobSheetSection>

      {/* Where the lane is heading */}
      <JobSheetSection
        code="BO-03"
        label="Where this lane is heading"
        title="Invoicing first. The rest of the desk next."
        description="We build this lane the same way we build everything: one proven system at a time, shaped by what real clients ask for. Here is what's on the board."
        tone="paper"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Appointment confirmations",
              description:
                "Two-way confirm and reschedule texts that cut no-shows before they cost you a truck roll.",
            },
            {
              title: "Maintenance renewals",
              description:
                "Season and equipment-age triggered reminders that keep service plans renewing without a phone campaign.",
            },
            {
              title: "Job data capture",
              description:
                "Field notes and photos flowing into clean office records without anyone retyping them at 9pm.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className={`${jobsheet.ticket} h-full p-7 pl-10 relative`}>
                <span className={jobsheet.ticketHole} aria-hidden="true" />
                <h3 className="text-xl font-semibold tracking-tight text-[#181510]">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-[#58524a]">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm leading-7 text-[#58524a]">
          Need one of these sooner than later? Say so in the audit. Client demand sets the build order.
        </p>
      </JobSheetSection>

      <JobSheetCTA
        code="BO-04"
        label="Get your evenings back"
        title="Tell us what the desk work costs you."
        description="A free 30-minute audit. We find the admin job eating the most hours and tell you exactly what automating it would look like."
        primaryHref={BOOK_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </div>
  );
}
