import type { Metadata } from "next";
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
  title: {
    absolute: "About | Current Automations",
  },
  description:
    "Current Automations finds where trades and service businesses leak revenue, then builds and maintains the systems that fix it. Based in Ontario. Every engagement starts with a free audit.",
};

const fileFacts = [
  { label: "Founder", value: "Jarrett Goodwin" },
  { label: "Based in", value: "Ontario, Canada" },
  { label: "Serves", value: "Durham Region + GTA, remote across Ontario" },
  { label: "First step", value: "Free 30-minute audit" },
  { label: "Typical go-live", value: "Within 48 hours" },
];

const leakRows = [
  {
    code: "LEAK-01",
    title: "Missed calls",
    body: "Most callers will not leave a voicemail or wait for a callback. If no one responds within minutes, they move on to the next business on the list.",
  },
  {
    code: "LEAK-02",
    title: "Slow follow-up",
    body: "The longer a lead waits for a response, the colder it gets. Manual follow-up cannot keep pace with how fast buying intent fades.",
  },
  {
    code: "LEAK-03",
    title: "Manual admin",
    body: "Quotes, scheduling, reminders, and inbox cleanup eat hours every week that should not require the owner every single time.",
  },
];

const workOrderRows = [
  {
    code: "01",
    title: "Audit",
    body: "A free 30-minute conversation about how your business actually runs. We find where the biggest opportunities are and recommend the one system with the most immediate impact. No generic recommendations, no upsell pressure.",
  },
  {
    code: "02",
    title: "Build",
    body: "We install it, configure it, and tune it until it sounds like you. Full build and testing on our end. There is no technical work on yours.",
  },
  {
    code: "03",
    title: "Maintain",
    body: "Every system we build stays maintained on our side. If something needs adjusting, you reach out and it gets handled. You see the results, not the plumbing.",
  },
];

export default function AboutPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="COMPANY FILE"
        docCode="FORM AB-01"
        kicker="Who you're dealing with"
        title={
          <>
            We find where your business is losing money.
            <br />
            Then we fix it.
          </>
        }
        description="Current Automations builds the systems that catch missed calls, chase quiet quotes, and keep admin moving for trades and service businesses across Ontario. Every engagement starts with a free audit that finds your highest-impact fix, and we build from there."
        side={
          <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                FILE SUMMARY
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                PAGE 1/1
              </span>
            </div>
            <div className="divide-y divide-[rgba(28,36,48,0.1)]">
              {fileFacts.map((row) => (
                <div
                  key={row.label}
                  className={`${jobsheet.ledgerRow} grid grid-cols-[7rem_1fr] items-baseline gap-4 px-5 py-3.5`}
                >
                  <span className={`${jobsheet.mono} text-[0.7rem] uppercase tracking-[0.14em] text-[#58524a]`}>
                    {row.label}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-[#181510]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* Where the money leaks: a ledger, the same three lines on every audit */}
      <JobSheetSection
        code="AB-02"
        label="Where the money leaks"
        title="Almost every audit finds the same three leaks."
        description="Different trades, same paperwork. The details change but the places revenue quietly disappears do not."
        tone="carbon"
      >
        <div className={`${jobsheet.ticket} divide-y divide-[rgba(28,36,48,0.14)] p-0`}>
          {leakRows.map((row) => (
            <Reveal key={row.code} variant="fade">
              <div
                className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-3 px-6 py-6 sm:px-8 lg:grid-cols-[7rem_minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-baseline lg:gap-8`}
              >
                <span className={`${jobsheet.mono} text-xs font-semibold text-[#a8452f]`}>{row.code}</span>
                <h3 className="text-lg font-semibold tracking-tight text-[#181510] sm:text-xl">{row.title}</h3>
                <p className="text-base leading-8 text-[#58524a]">{row.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      {/* The method: one work order, three lines. Not a services brochure. */}
      <JobSheetSection
        code="AB-03"
        label="How every job runs"
        title="One work order. Audit, build, maintain."
        description="We do not sell software and leave you to figure it out. Every engagement follows the same three lines, and we stay on the file after go-live."
        tone="ink"
      >
        <Reveal>
          <div className={`${jobsheet.ticket} !border-white/15 !bg-[rgba(255,255,255,0.05)] overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-white/15 px-6 py-3 sm:px-8">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[rgba(243,237,225,0.5)]`}>
                STANDING WORK ORDER
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[rgba(243,237,225,0.5)]`}>
                EVERY ENGAGEMENT
              </span>
            </div>
            <div className="divide-y divide-white/10">
              {workOrderRows.map((row) => (
                <div
                  key={row.code}
                  className="grid grid-cols-1 gap-3 px-6 py-7 sm:px-8 lg:grid-cols-[5rem_minmax(0,0.6fr)_minmax(0,1.4fr)] lg:items-baseline lg:gap-8"
                >
                  <span className={`${jobsheet.mono} text-2xl font-semibold text-[var(--color-brand)]`}>
                    {row.code}
                  </span>
                  <h3 className={`${jobsheet.display} text-2xl text-[#f3ede1]`}>{row.title}</h3>
                  <p className="text-base leading-8 text-[rgba(243,237,225,0.72)]">{row.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </JobSheetSection>

      {/* Founder: personnel file, not a team page */}
      <JobSheetSection
        code="AB-04"
        label="The guy behind it"
        title="One founder. One point of contact."
        description="No account managers, no ticket queue. The person who builds your system is the person who answers when something needs adjusting."
        tone="paper"
      >
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-stretch">
          <Reveal className={jobsheet.tiltB}>
            <div className={`${jobsheet.ticket} flex h-full flex-col overflow-hidden p-0`}>
              <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
                <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                  PERSONNEL
                </span>
                <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>ID-01</span>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(20,150,118,0.08)] text-[#181510]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-9 w-9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path
                      d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 7.5a6 6 0 0 1 12 0"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className={`${jobsheet.display} mt-5 text-2xl text-[#181510]`}>Jarrett Goodwin</p>
                <p className={`${jobsheet.mono} mt-2 text-xs leading-6 text-[#58524a]`}>
                  FOUNDER
                </p>
                <p className={`${jobsheet.mono} mt-4 text-xs leading-6 text-[var(--color-brand-strong)]`}>
                  One-on-one with the owner, every time
                </p>
                <p className={`${jobsheet.mono} mt-4 border-t border-dashed border-[rgba(28,36,48,0.24)] pt-4 text-xs leading-6 text-[#58524a]`}>
                  B.Eng. Chemical Engineering &amp; Computer Technology, uOttawa
                </p>
                <p className={`${jobsheet.mono} mt-2 text-xs leading-6 text-[#58524a]`}>
                  AI Automation Society
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <TicketCard refCode="STORY" className="h-full">
              <p className="text-base leading-8 text-[#3a352c]">
                I started Current Automations after seeing how often good trades and service businesses were leaking revenue to unanswered phones, forgotten follow&#8209;ups, and manual admin work. With a background in industrial operations and applied AI, I build practical systems that answer every lead, follow up reliably, and keep owners out of the inbox.
              </p>
              <p className="mt-6 text-base leading-8 text-[#3a352c]">
                My approach is hands&#8209;on: we map your real&#8209;world workflow, pick the highest&#8209;impact problem, then build and maintain the automation around it. No buzzwords, no clunky dashboards, just lean systems that pay for themselves in saved time and recovered jobs.
              </p>
            </TicketCard>
          </Reveal>
        </div>
      </JobSheetSection>

      {/* The ongoing part: reads like the terms of the relationship */}
      <JobSheetSection
        code="AB-05"
        label="After go-live"
        title="I am not here to sell you a tool and disappear."
        tone="carbon"
      >
        <Reveal>
          <TicketCard refCode="TERMS">
            <div className="mb-5">
              <Stamp label="Ongoing" tone="teal" />
            </div>
            <div className="max-w-3xl space-y-6">
              <p className="text-base leading-8 text-[#3a352c]">
                Most software companies hand you a login and leave you to figure it out. I work differently.
              </p>
              <p className="text-base leading-8 text-[#3a352c]">
                Before I build anything, I spend time understanding how your business actually runs day to day: the calls, the estimates, and the spots where work falls through the cracks. From there, we design a system that fits into your existing process instead of forcing you into a generic software workflow.
              </p>
              <p className="text-base leading-8 text-[#3a352c]">
                Every system I build is maintained on my side. If something needs adjusting, you reach out and it gets handled. As your business changes, I review performance with you, spot new bottlenecks, and either refine what is in place or build the next piece. You get one point of contact who knows your setup inside and out.
              </p>
              <p className="border-t-2 border-dashed border-[rgba(28,36,48,0.24)] pt-5 text-base font-semibold leading-8 text-[#181510]">
                The relationship is ongoing, not a one-time transaction.
              </p>
            </div>
          </TicketCard>
        </Reveal>
      </JobSheetSection>

      <JobSheetCTA
        code="AB-06"
        label="Open a file"
        title="Find out where your business is leaving money behind."
        description="A free 30-minute audit. We find the highest-impact leak, tell you exactly what would fix it, and you decide from there."
        primaryHref={BOOK_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </div>
  );
}
