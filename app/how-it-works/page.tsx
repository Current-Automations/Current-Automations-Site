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
  title: "How It Works",
  description:
    "See how Current Automations helps service businesses respond faster after missed calls and keep new opportunities moving.",
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
    body: "The system runs automatically from day one. Missed calls get caught. Follow-ups go out. Leads get captured. Your team gets notified. No manual work required.",
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

const captured = [
  { label: "Address", value: "Oak Street" },
  { label: "Issue", value: "AC not blowing cold" },
  { label: "Urgency", value: "High, family with kids" },
  { label: "Voicemail", value: "Transcribed + actioned" },
  { label: "Response time", value: "Under 2 minutes" },
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

      {/* The Tuesday scenario: one chronological call log, read top to bottom */}
      <JobSheetSection
        code="HW-03"
        label="A Tuesday morning, logged"
        title="Here is what this looks like for an HVAC company on a busy Tuesday."
        description="A representative scenario based on the kind of situation local service teams deal with every week, written up the way the system actually logs it."
        tone="paper"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:items-start">
          <Reveal>
            <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
              <div className="flex items-center justify-between border-b border-[rgba(28,36,48,0.16)] bg-[rgba(28,36,48,0.03)] px-5 py-3 sm:px-6">
                <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                  CALL LOG &middot; ABC HVAC &middot; LINE 1
                </span>
                <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                  TUESDAY
                </span>
              </div>

              <div className="divide-y divide-[rgba(28,36,48,0.1)]">
                {/* 10:14 — missed call */}
                <div className="grid grid-cols-1 gap-3 px-5 py-6 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-5 sm:px-6">
                  <span className={`${jobsheet.mono} text-xs font-semibold text-[#58524a]`}>10:14 AM</span>
                  <div>
                    <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#a8452f]`}>
                      Incoming call &middot; missed
                    </p>
                    <p className="mt-3 text-base leading-8 text-[#3a352c]">
                      A homeowner calls about a broken AC unit. It is mid-morning on a hot day. The technician on duty is already on-site at another job. The call rings out, the caller leaves a voicemail, and the system captures it immediately.
                    </p>
                    <div className="mt-4 rounded border-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] p-4">
                      <p className={`${jobsheet.mono} mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-[#58524a]`}>
                        Voicemail transcript
                      </p>
                      <p className="text-sm leading-7 text-[#3a352c]">
                        &quot;Hi, calling about my AC on Oak Street. It stopped blowing cold this morning. It&apos;s getting really hot and I&apos;ve got two young kids here. Please call back when you can.&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* 10:14 — auto text */}
                <div className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-3 px-5 py-6 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-5 sm:px-6`}>
                  <span className={`${jobsheet.mono} text-xs font-semibold text-[#58524a]`}>10:14 AM</span>
                  <div>
                    <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-strong)]`}>
                      AI-generated response sent
                    </p>
                    <p className="mt-3 text-base leading-8 text-[#3a352c]">
                      Within seconds, the caller gets a text tailored to what they actually said, not a generic auto-reply.
                    </p>
                    <div className="mt-4 rounded border border-[var(--color-brand-strong)] bg-[rgba(20,150,118,0.06)] p-4">
                      <p className={`${jobsheet.mono} mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-brand-strong)]`}>
                        Outbound SMS
                      </p>
                      <p className="text-sm leading-7 text-[#3a352c]">
                        &quot;Hi, this is ABC HVAC. We just missed your call and caught your voicemail about the AC at Oak Street not blowing cold. That sounds urgent, especially with kids at home in this heat. We&apos;re finishing up another job and will call you back shortly. Reply here anytime if anything changes.&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* 10:16 — reply */}
                <div className="grid grid-cols-1 gap-3 px-5 py-6 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-5 sm:px-6">
                  <span className={`${jobsheet.mono} text-xs font-semibold text-[#58524a]`}>10:16 AM</span>
                  <div>
                    <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`}>
                      Customer reply
                    </p>
                    <div className="mt-3 rounded border-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] p-4">
                      <p className="text-sm leading-7 text-[#3a352c]">
                        &quot;Thanks, appreciate the quick response. Yes please call back, it&apos;s getting hot in here.&quot;
                      </p>
                    </div>
                    <p className="mt-3 text-base leading-8 text-[#58524a]">
                      Because the first message felt personal and acknowledged the real issue, they waited instead of calling the next company on Google.
                    </p>
                  </div>
                </div>

                {/* 10:48 — callback */}
                <div className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-3 px-5 py-6 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-5 sm:px-6`}>
                  <span className={`${jobsheet.mono} text-xs font-semibold text-[#58524a]`}>10:48 AM</span>
                  <div>
                    <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-strong)]`}>
                      Technician calls back
                    </p>
                    <p className="mt-3 text-base leading-8 text-[#3a352c]">
                      When the technician finishes the first job and checks their phone, the lead details are already there. They call back knowing it is Oak Street, it is an AC issue, and it is urgent. The booking takes under three minutes.
                    </p>
                    <div className="mt-4">
                      <Stamp label="Job booked. Lead recovered." tone="teal" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t-2 border-dashed border-[rgba(28,36,48,0.24)] px-5 py-3.5 sm:px-6">
                <span className={`${jobsheet.mono} text-xs uppercase tracking-widest text-[#58524a]`}>
                  Missed call to booked job
                </span>
                <span className={`${jobsheet.mono} text-sm font-semibold text-[var(--color-brand-strong)]`}>
                  00:34:00
                </span>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4 lg:sticky lg:top-28">
            <Reveal delay={120}>
              <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
                <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
                  <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                    INTAKE
                  </span>
                  <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                    AUTO-FILLED
                  </span>
                </div>
                <div className="divide-y divide-[rgba(28,36,48,0.1)]">
                  {captured.map((row) => (
                    <div
                      key={row.label}
                      className={`${jobsheet.ledgerRow} flex items-center justify-between gap-4 px-5 py-3`}
                    >
                      <span className={`${jobsheet.mono} text-xs uppercase tracking-[0.12em] text-[#58524a]`}>
                        {row.label}
                      </span>
                      <span className="text-right text-sm font-semibold text-[#181510]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <TicketCard refCode="IF-QUIET">
                <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[#58524a]`}>
                  If they go quiet
                </p>
                <p className="mt-4 text-base leading-8 text-[#58524a]">
                  If the homeowner had not replied, the workflow sends a follow-up nudge after a set interval, keeping the opportunity warm without anyone on your team having to remember to check.
                </p>
              </TicketCard>
            </Reveal>

            <Reveal delay={200}>
              <TicketCard refCode="NO-SYSTEM">
                <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[#a8452f]`}>
                  Without the system
                </p>
                <p className="mt-4 text-base leading-8 text-[#58524a]">
                  That caller was gone within two minutes of the missed call, dialing the next HVAC company on the list. With it, they waited, because they felt acknowledged.
                </p>
              </TicketCard>
            </Reveal>
          </div>
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
