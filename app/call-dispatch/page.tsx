import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/motion/CountUp";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import TicketCard from "@/components/jobsheet/TicketCard";
import PunchButton from "@/components/jobsheet/PunchButton";
import Stamp from "@/components/jobsheet/Stamp";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  title: "Call & Dispatch Handling",
  description:
    "Every call answered. Missed-call text back, speed to lead, intake, and booking for trades and service businesses. The call that used to ring out becomes a booked job.",
};

const problemRows = [
  {
    job: "JOB #001",
    heading: "Texts at 8pm about an AC that quit",
    body: "You are at the dinner table and the phone lights up again. Answer it and lose your evening, or ignore it and lose the job. Neither feels right.",
  },
  {
    job: "JOB #002",
    heading: "The 9pm furnace call you never heard",
    body: "Someone's heat died and they called the first three contractors on Google. You were the one whose phone went to voicemail. They never call back.",
  },
  {
    job: "JOB #003",
    heading: "Inquiries stacking up while you wind down",
    body: "Web forms, voicemails, missed calls. By the time you sit down to deal with them, half those people have already booked someone who answered.",
  },
];

const lifecycleStages = [
  {
    code: "STAGE 01",
    label: "Received",
    tone: "rust" as const,
    body: "A call, text, or web form comes in. Right now, most of these sit until someone has a free minute.",
  },
  {
    code: "STAGE 02",
    label: "Dispatched",
    tone: "teal" as const,
    body: "The system replies in seconds, captures the job details, and offers a time. No one on your team has touched it yet.",
  },
  {
    code: "STAGE 03",
    label: "Closed",
    tone: "teal" as const,
    body: "The customer confirms and it lands on your calendar, already booked. Your team gets a clean handoff, not a cold lead.",
  },
];

const decayRows = [
  { time: "Under 1 min", bar: 100, label: "Baseline" },
  { time: "5 min", bar: 38, label: "-62%" },
  { time: "10 min", bar: 18, label: "-82%" },
  { time: "30 min", bar: 8, label: "1/21 of baseline" },
  { time: "60 min+", bar: 3, label: "Effectively lost" },
];

const industryRows = [
  {
    code: "TR-01",
    name: "Plumbing",
    leak: "On-site all day, hands in a job. No way to catch the next caller before they redial the next plumber on Google.",
    automate: "Auto-text within 60 seconds of a missed call, with job-type capture and an urgency flag for after-hours.",
  },
  {
    code: "TR-02",
    name: "HVAC",
    leak: "Heat-wave Tuesdays bring 4x volume. The phone can't physically keep up with the inbound.",
    automate: "Speed-to-lead plus after-hours intake routes urgent jobs to the right tech with the address already captured.",
  },
  {
    code: "TR-03",
    name: "Electrical",
    leak: "Jobs run back-to-back. By the time you check voicemail, the lead has already booked someone else.",
    automate: "Voicemail transcript plus an AI-generated reply tailored to the actual issue, not a generic auto-response.",
  },
  {
    code: "TR-04",
    name: "Cleaning",
    leak: "Volume of small-job inquiries you cannot realistically quote one by one during your busiest hours.",
    automate: "Web-form intake auto-quotes routine jobs and books straight into your calendar with no manual coordination.",
  },
  {
    code: "TR-05",
    name: "Landscaping",
    leak: "Mowers running, phones in the truck. Three hours can disappear silently while leads cool off.",
    automate: "Missed-call SMS keeps every lead engaged until the crew breaks for lunch and checks the truck.",
  },
  {
    code: "TR-06",
    name: "Other local trades",
    leak: "Any business where speed of response decides who wins the job.",
    automate: "We map your actual workflow first, then build the system around it. No template installs.",
  },
];

const captured = [
  { label: "Address", value: "Oak Street" },
  { label: "Issue", value: "AC not blowing cold" },
  { label: "Urgency", value: "High, family with kids" },
  { label: "Voicemail", value: "Transcribed + actioned" },
  { label: "Response time", value: "Under 2 minutes" },
];

export default function CallDispatchPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="SERVICE FILE"
        docCode="FORM CD-01"
        kicker="Pillar 01 · Call & dispatch handling"
        title={
          <>
            Every call answered.
            <br />
            Even the ones you miss.
          </>
        }
        description="Missed-call text back, speed to lead, intake, and booking. The moment a call rings out, the system texts the caller back, captures the job, and books it. Your customers get an answer in seconds. You get the job instead of losing it to whoever picked up."
        side={
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
        }
      />

      {/* The problem, in scenarios */}
      <JobSheetSection
        code="CD-02"
        label="Sound familiar?"
        title="The work is good. The phone is the problem."
        description="None of these need you to work harder. They need a system that answers when you cannot."
        tone="carbon"
      >
        <div className={`${jobsheet.ticket} divide-y divide-[rgba(28,36,48,0.14)] p-0`}>
          {problemRows.map((row) => (
            <Reveal key={row.job} variant="fade">
              <div className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-3 px-6 py-6 sm:px-8 lg:grid-cols-[7rem_minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-baseline lg:gap-8`}>
                <span className={`${jobsheet.mono} text-xs font-semibold text-[#a8452f]`}>
                  {row.job}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-[#181510] sm:text-xl">
                  {row.heading}
                </h3>
                <p className="text-base leading-8 text-[#58524a]">{row.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      {/* The fix: 3-stage lifecycle */}
      <JobSheetSection
        code="CD-03"
        label="Here is the fix"
        title="Every missed call becomes a three-stage job ticket."
        description="This is the exact path your customers go through once the system is running. No app, no portal, nothing for them or you to learn."
        tone="paper"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {lifecycleStages.map((stage, i) => (
            <Reveal key={stage.code} delay={i * 90} className={i % 2 === 0 ? jobsheet.tiltA : jobsheet.tiltB}>
              <TicketCard refCode={stage.code}>
                <div className="mb-4">
                  <Stamp label={stage.label} tone={stage.tone} />
                </div>
                <p className="text-base leading-8 text-[#3a352c]">{stage.body}</p>
              </TicketCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm leading-7 text-[#58524a]">
          Want to feel it yourself? Call the live demo line:{" "}
          <a href="tel:+13656017474" className="font-medium text-[var(--color-brand-strong)] hover:underline">
            1 365 601 7474
          </a>
          . Let it ring out and watch your phone.
        </p>
      </JobSheetSection>

      {/* Why speed matters: stats + decay */}
      <JobSheetSection
        code="CD-04"
        label="The cost of a missed call"
        title="Every minute you do not respond, the job gets colder."
        description="Most callers who reach voicemail never leave a message. They just dial the next company on Google. Here is what the research on response speed says happens."
        tone="ink"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <div className="flex items-end gap-5">
              <span className={`${jobsheet.mono} text-[clamp(4.5rem,11vw,7.5rem)] font-semibold leading-[0.9] text-[#f3ede1]`}>
                <CountUp value={21} />
                <span className="text-[var(--color-brand)]">&#215;</span>
              </span>
              <span className="pb-3 text-xs font-semibold uppercase leading-snug tracking-[0.2em] text-[rgba(243,237,225,0.4)] sm:text-sm">
                more likely
                <br />
                to qualify
                <br />
                a lead
              </span>
            </div>
            <p className="mt-8 max-w-md text-base leading-8 text-[rgba(243,237,225,0.72)]">
              MIT and InsideSales research: businesses that responded to inbound leads within five minutes were 21&#215; more likely to qualify them than businesses that waited thirty minutes. 78% of customers buy from the first business that responds.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[rgba(243,237,225,0.4)]">
              Source &middot;{" "}
              <a
                href="https://resources.rework.com/libraries/lead-management/lead-response-time"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-[var(--color-brand)] hover:underline"
              >
                MIT / InsideSales Lead Response Study &#8599;
              </a>
            </p>
          </div>

          <TicketCard onDark refCode="LOG-DECAY">
            <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-4">
              <p className={`${jobsheet.mono} text-xs uppercase tracking-[0.16em] text-[rgba(243,237,225,0.4)]`}>
                Response time
              </p>
              <p className={`${jobsheet.mono} text-xs uppercase tracking-[0.16em] text-[rgba(243,237,225,0.4)]`}>
                Qualify rate
              </p>
            </div>
            <div className="mt-5 space-y-4">
              {decayRows.map((row) => (
                <div key={row.time} className="grid grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-4">
                  <span className={`${jobsheet.mono} text-sm font-semibold text-[#f3ede1]`}>{row.time}</span>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[var(--color-brand)]"
                      style={{ width: `${row.bar}%` }}
                    />
                  </div>
                  <span className={`${jobsheet.mono} text-xs text-[rgba(243,237,225,0.55)]`}>{row.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-dashed border-white/15 pt-5 text-sm leading-7 text-[rgba(243,237,225,0.72)]">
              Every lead lands at the top of this curve, not the bottom.
            </p>
          </TicketCard>
        </div>

        <div className="mt-12 flex flex-col items-start gap-5 rounded border-2 border-dashed border-white/20 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-xl font-semibold tracking-tight text-[#f3ede1] sm:text-2xl">
            Speed to Lead replies in under{" "}
            <span className="text-[var(--color-brand)]">60 seconds</span>, automatically.
          </p>
          <PunchButton href={BOOK_URL} label="Book Free Audit" onDark external className="shrink-0" />
        </div>
      </JobSheetSection>

      {/* The Tuesday scenario, moved from how-it-works */}
      <JobSheetSection
        code="CD-05"
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
              <TicketCard refCode="IF-QUIET">
                <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[#58524a]`}>
                  If they go quiet
                </p>
                <p className="mt-4 text-base leading-8 text-[#58524a]">
                  If the homeowner had not replied, the workflow sends a follow-up nudge after a set interval, keeping the opportunity warm without anyone on your team having to remember to check.
                </p>
              </TicketCard>
            </Reveal>

            <Reveal delay={160}>
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

      {/* Industries */}
      <JobSheetSection
        code="CD-06"
        label="Industries served"
        title="Built for the way service businesses actually run."
        description="If your day is mostly hands-on work, your phone is your business. Here is what we automate first for each trade."
        tone="carbon"
      >
        <p className="mb-6 text-sm leading-7 text-[#58524a]">
          Currently serving businesses across Ajax, Whitby, Oshawa, Pickering, and the surrounding GTA.
        </p>

        <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
          <div className="hidden border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-6 py-3 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1.6fr)] lg:gap-6">
            <span className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`}>Trade</span>
            <span className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`}>Where it leaks</span>
            <span className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`}>What runs automatically</span>
          </div>

          {industryRows.map((row) => (
            <div
              key={row.code}
              className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-2 border-b border-[rgba(28,36,48,0.12)] px-6 py-5 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1.6fr)] lg:gap-6 lg:py-6`}
            >
              <p className="text-lg font-semibold tracking-tight text-[#181510]">
                {row.name}
              </p>
              <p className="text-sm leading-7 text-[#58524a]">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#58524a]/70 lg:hidden">
                  Where it leaks
                </span>
                {row.leak}
              </p>
              <p className="text-sm leading-7 text-[#3a352c]">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-strong)] lg:hidden">
                  What we automate
                </span>
                <span className="font-medium text-[var(--color-brand-strong)]">&#8594; </span>
                {row.automate}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm leading-7 text-[#58524a]">
          The systems in this lane start at $49/month plus a $150 one-time setup.{" "}
          <Link href="/pricing#tiers" className="font-medium text-[var(--color-brand-strong)] hover:underline">
            See full pricing &#8594;
          </Link>
        </p>
      </JobSheetSection>

      <JobSheetCTA
        code="CD-07"
        label="Hear it yourself"
        title="Call the demo line, then book your free audit."
        description="The demo line is live at 1 365 601 7474. Let it ring out and the text you get back is the product. When you're ready, the audit finds where your calls are leaking."
        primaryHref={BOOK_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/demo"
        secondaryLabel="See the Demo"
      />
    </div>
  );
}
