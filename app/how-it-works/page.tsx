import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From first conversation to running system: how every Current Automations engagement runs. Free audit, we build it for you, we maintain it. No app, no portal, nothing to learn.",
};

const steps = [
  {
    number: "01",
    title: "Discovery call",
    body: "We start with a free 30-minute conversation. No pitch. We ask about your day, where time gets lost, where leads fall through, and what would make the biggest difference.",
  },
  {
    number: "02",
    title: "Opportunity map",
    body: "Based on what we hear, we identify exactly where your business is leaking the most revenue. For most service businesses this is missed call recovery. For others it is follow-up, admin, or scheduling. You get a clear recommendation, not a list of software options.",
  },
  {
    number: "03",
    title: "We build it for you",
    body: "Once we agree on the right system, we build and configure everything. You do not touch the technology. Most clients are live within 48 hours.",
  },
  {
    number: "04",
    title: "It runs in the background",
    body: "The system runs automatically from day one. Missed calls get caught. Follow-ups go out. Leads get captured. Your team gets notified. And if you want the final say, it starts with approvals on: nothing sends until you OK it, until you're ready to hand over control.",
  },
  {
    number: "05",
    title: "We maintain everything",
    body: "We monitor and maintain the system on our end. If something needs adjusting, we handle it. You focus on the work. We keep the system working.",
  },
];

const guarantees = [
  "No technical knowledge required at any stage",
  "Systems are maintained and monitored on our end",
  "Most clients see measurable impact within 30 days",
  "The relationship is ongoing, not a one-time install",
];

const heroChecklist = [
  "A clear picture of where your business leaks revenue",
  "A recommended system built for your specific situation",
  "Fast implementation with no disruption to how you work",
  "Ongoing maintenance so nothing breaks on you",
];

const pillarPointers = [
  { href: "/call-dispatch", label: "Call & dispatch handling", note: "Includes a full HVAC Tuesday, logged minute by minute" },
  { href: "/follow-up", label: "Auto-replies & follow-up", note: "Watch a quiet quote get chased to a yes" },
  { href: "/back-office", label: "Back-office & admin", note: "Invoice follow-up, from due date to paid" },
  { href: "/lead-generation", label: "Lead generation", note: "B2B only: pipelines that find your next customers" },
];

function CheckBox() {
  return (
    <span
      aria-hidden="true"
      className="mt-1 flex h-[1.1rem] w-[1.1rem] shrink-0 items-center justify-center rounded-[0.2rem] border-[1.5px] border-[var(--color-brand-strong)] bg-[rgba(20,150,118,0.08)]"
    >
      <svg viewBox="0 0 12 12" className="h-3 w-3 text-[var(--color-brand-strong)]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 6.5 4.8 9 10 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function HowItWorksPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="PROCESS SHEET"
        docCode="FORM HW-01"
        kicker="No app. No portal. Nothing to learn."
        title={
          <>
            From first conversation
            <br />
            to running system.
          </>
        }
        description="Every engagement starts with a free audit that finds where your business is losing time and money. Then we install it, tune it, and hand you a working system. You don't touch the tech."
        side={
          <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                WHAT YOU GET
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                CHECKED
              </span>
            </div>
            <div className="space-y-1 px-5 py-4">
              {heroChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3 py-2">
                  <CheckBox />
                  <p className="text-sm leading-6 text-[#3a352c]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* The five steps: one continuous process sheet, not five floating cards */}
      <JobSheetSection
        code="HW-02"
        label="Start to finish"
        title="Five steps. You are only needed for the first one."
        description="Each stage is designed to shorten the time between an unanswered call and a real conversation with your next customer."
        tone="carbon"
      >
        <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
          <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-6 py-3 sm:px-8">
            <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
              PROCESS SHEET &middot; EVERY ENGAGEMENT
            </span>
            <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
              5 STEPS
            </span>
          </div>
          <div className="divide-y divide-[rgba(28,36,48,0.12)]">
            {steps.map((step) => (
              <Reveal key={step.number} variant="fade">
                <div
                  className={`${jobsheet.ledgerRow} grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-5 gap-y-2 px-6 py-7 sm:px-8 lg:grid-cols-[5rem_minmax(0,0.55fr)_minmax(0,1.45fr)] lg:items-baseline lg:gap-8`}
                >
                  <span className={`${jobsheet.mono} text-2xl font-semibold text-[var(--color-brand-strong)]`}>
                    {step.number}
                  </span>
                  <h3 className={`${jobsheet.display} text-2xl text-[#181510]`}>{step.title}</h3>
                  <p className="col-span-2 text-base leading-8 text-[#58524a] lg:col-span-1">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Standing guarantees: a dashed strip, not four one-sentence cards */}
        <div className="mt-8 grid gap-x-10 gap-y-4 rounded border-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.02)] p-6 sm:grid-cols-2 sm:p-8">
          {guarantees.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckBox />
              <p className="text-sm leading-7 text-[#3a352c]">{item}</p>
            </div>
          ))}
        </div>
      </JobSheetSection>

      {/* Pointer to the pillar deep dives */}
      <JobSheetSection
        code="HW-03"
        label="See it in a real week"
        title="Want the play-by-play? Each pillar has its own page."
        description="This page is the process. The pillar pages show what actually runs: logged scenarios, the systems in each lane, and what they cost."
        tone="paper"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {pillarPointers.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${jobsheet.ticket} ${jobsheet.ledgerRow} group flex items-center justify-between gap-4 p-6`}
            >
              <span>
                <span className="block text-lg font-semibold tracking-tight text-[#181510] group-hover:text-[var(--color-brand-strong)]">
                  {link.label}
                </span>
                <span className="mt-1 block text-sm leading-6 text-[#58524a]">{link.note}</span>
              </span>
              <span aria-hidden="true" className="text-xl text-[#58524a] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-brand-strong)]">
                &#8594;
              </span>
            </Link>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetCTA
        code="HW-04"
        label="Want this with your details?"
        title="Find out where your business is leaving money behind."
        description="We audit your business, find the highest-impact opportunities, and build the systems that fix them."
        primaryHref={BOOK_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </div>
  );
}
