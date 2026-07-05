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
    number: "STEP 01",
    title: "Discovery Call",
    description:
      "We start with a free 30-minute conversation. No pitch. We ask about your day, where time gets lost, where leads fall through, and what would make the biggest difference.",
  },
  {
    number: "STEP 02",
    title: "Opportunity Map",
    description:
      "Based on what we hear, we identify exactly where your business is leaking the most revenue. For most service businesses this is missed call recovery. For others it is follow-up, admin, or scheduling. You get a clear recommendation, not a list of software options.",
  },
  {
    number: "STEP 03",
    title: "We Build It For You",
    description:
      "Once we agree on the right system, we build and configure everything. You do not touch the technology. Most clients are live within 48 hours.",
  },
  {
    number: "STEP 04",
    title: "It Runs In The Background",
    description:
      "The system runs automatically from day one. Missed calls get caught. Follow-ups go out. Leads get captured. Your team gets notified. No manual work required.",
  },
  {
    number: "STEP 05",
    title: "We Maintain Everything",
    description:
      "We monitor and maintain the system on our end. If something needs adjusting, we handle it. You focus on the work. We keep the system working.",
  },
];

const benefits = [
  "No technical knowledge required at any stage",
  "Systems are maintained and monitored on our end",
  "Most clients see measurable impact within 30 days",
  "The relationship is ongoing, not a one-time install",
];

export default function HowItWorksPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="PROCESS SHEET"
        docCode="FORM HW-01"
        kicker="How the workflow works"
        title={
          <>
            From first conversation
            <br />
            to running system.
          </>
        }
        description="Every engagement starts with a free audit that finds where your business is losing time and money. Then we install it, tune it, and hand you a working system. You don't touch the tech."
        side={
          <TicketCard refCode="YOU-GET">
            <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[#58524a]`}>
              What you get
            </p>
            <div className="mt-5 space-y-3">
              {[
                "A clear picture of where your business leaks revenue",
                "A recommended system built for your specific situation",
                "Fast implementation with no disruption to how you work",
                "Ongoing maintenance so nothing breaks on you",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded border border-[rgba(28,36,48,0.16)] bg-[rgba(28,36,48,0.03)] px-4 py-3 text-sm leading-7 text-[#3a352c]"
                >
                  {item}
                </div>
              ))}
            </div>
          </TicketCard>
        }
      />

      <JobSheetSection
        code="HW-02"
        label="The five steps"
        title="How every engagement works."
        description="Each stage is designed to shorten the time between an unanswered call and a real conversation with your next customer."
        tone="carbon"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 70} className={i % 2 === 0 ? jobsheet.tiltA : jobsheet.tiltB}>
              <TicketCard refCode={step.number}>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#181510]">{step.title}</h3>
                <p className="mt-4 text-base leading-8 text-[#58524a]">{step.description}</p>
              </TicketCard>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="HW-03"
        label="Behind the scenes"
        title="Built to run without you having to think about it."
        description="This is not about replacing your team. It is about making sure every inbound lead gets fast attention in a workflow that feels natural and dependable."
        tone="ink"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, i) => (
            <Reveal key={item} delay={i * 70}>
              <TicketCard onDark refCode={`B-0${i + 1}`}>
                <p className="mt-2 text-lg leading-8 text-[#f3ede1]">{item}</p>
              </TicketCard>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="HW-04"
        label="A busy Tuesday, on paper"
        title="Here is what this looks like for an HVAC company on a busy Tuesday."
        description="This is a representative scenario based on the kind of situation local service teams deal with every week."
        tone="paper"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.88fr)] lg:items-start">
          <div className="space-y-4">
            <Reveal>
              <TicketCard refCode="10:14 AM">
                <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[#a8452f]`}>
                  Incoming call &middot; missed
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#181510]">
                  A homeowner calls about a broken AC unit.
                </h3>
                <p className="mt-4 text-base leading-8 text-[#58524a]">
                  It is mid-morning on a hot day. The technician on duty is already on-site at another job. The call rings out. No one answers.
                </p>
                <p className="mt-4 text-base leading-8 text-[#58524a]">
                  The caller leaves a voicemail and the system captures it immediately.
                </p>
                <div className="mt-5 rounded border-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] p-5">
                  <p className={`${jobsheet.mono} mb-3 text-xs uppercase tracking-[0.18em] text-[#58524a]`}>
                    Voicemail transcript
                  </p>
                  <p className="text-sm leading-7 text-[#3a352c]">
                    &quot;Hi, calling about my AC on Oak Street. It stopped blowing cold this morning. It&apos;s getting really hot and I&apos;ve got two young kids here. Please call back when you can.&quot;
                  </p>
                </div>
              </TicketCard>
            </Reveal>

            <Reveal delay={80}>
              <TicketCard refCode="10:14 AM">
                <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-strong)]`}>
                  AI-generated response sent
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#181510]">
                  Within seconds, the caller gets a tailored text.
                </h3>
                <div className="mt-5 rounded border border-[var(--color-brand-strong)] bg-[rgba(20,150,118,0.06)] p-5">
                  <p className="text-sm leading-7 text-[#3a352c]">
                    &quot;Hi, this is ABC HVAC. We just missed your call and caught your voicemail about the AC at Oak Street not blowing cold. That sounds urgent, especially with kids at home in this heat. We&apos;re finishing up another job and will call you back shortly. Reply here anytime if anything changes.&quot;
                  </p>
                </div>
                <p className="mt-5 text-sm leading-7 text-[#58524a]">
                  The message is generated from the voicemail transcript, specific to their issue, not a generic auto-reply.
                </p>
              </TicketCard>
            </Reveal>

            <Reveal delay={80}>
              <TicketCard refCode="10:16 AM">
                <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[#58524a]`}>
                  Lead replies
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#181510]">
                  The homeowner stays in the conversation.
                </h3>
                <div className="mt-5 rounded border-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] p-5">
                  <p className="text-sm leading-7 text-[#3a352c]">
                    &quot;Thanks, appreciate the quick response. Yes please call back, it&apos;s getting hot in here.&quot;
                  </p>
                </div>
                <p className="mt-5 text-base leading-8 text-[#58524a]">
                  Because the first message felt personal and acknowledged the real issue, they waited instead of calling the next company.
                </p>
              </TicketCard>
            </Reveal>
          </div>

          <div className="space-y-4 lg:sticky lg:top-28">
            <Reveal delay={120}>
              <TicketCard refCode="INTAKE">
                <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[#58524a]`}>
                  What was captured
                </p>
                <div className="mt-5 divide-y divide-[rgba(28,36,48,0.12)] border-y border-[rgba(28,36,48,0.12)]">
                  {[
                    { label: "Address", value: "Oak Street" },
                    { label: "Issue", value: "AC not blowing cold" },
                    { label: "Urgency", value: "High, family with kids" },
                    { label: "Voicemail", value: "Transcribed + actioned" },
                    { label: "Response time", value: "Under 2 minutes" },
                  ].map((row) => (
                    <div key={row.label} className={`${jobsheet.ledgerRow} flex items-center justify-between gap-4 px-3 py-3`}>
                      <span className={`${jobsheet.mono} text-xs uppercase tracking-[0.12em] text-[#58524a]`}>
                        {row.label}
                      </span>
                      <span className="text-right text-sm font-semibold text-[#181510]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </TicketCard>
            </Reveal>

            <Reveal delay={160}>
              <TicketCard refCode="10:48 AM">
                <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-strong)]`}>
                  Technician calls back
                </p>
                <p className="mt-4 text-base leading-8 text-[#3a352c]">
                  When the technician finishes the first job and checks their phone, the lead details are already there. They call back knowing it is Oak Street, it is an AC issue, and it is urgent. The booking takes under three minutes.
                </p>
                <div className="mt-5">
                  <Stamp label="Job booked. Lead recovered." tone="teal" />
                </div>
                <p className="mt-5 text-sm leading-7 text-[#58524a]">
                  Without automation, that caller was gone within two minutes of the missed call. With it, they waited because they felt acknowledged.
                </p>
              </TicketCard>
            </Reveal>

            <Reveal delay={200}>
              <TicketCard refCode="BACKUP">
                <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[#58524a]`}>
                  Follow-up if they go quiet
                </p>
                <p className="mt-4 text-base leading-8 text-[#58524a]">
                  If the homeowner had not replied, the workflow sends a follow-up nudge after a set interval, keeping the opportunity warm without anyone on your team having to remember to check.
                </p>
              </TicketCard>
            </Reveal>
          </div>
        </div>
      </JobSheetSection>

      <JobSheetCTA
        code="HW-05"
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
