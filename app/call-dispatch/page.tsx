import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import HomeDemoVideo from "@/components/HomeDemoVideo";
import CountUp from "@/components/motion/CountUp";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import DispatchLog from "@/components/jobsheet/DispatchLog";
import TicketCard from "@/components/jobsheet/TicketCard";
import PunchButton from "@/components/jobsheet/PunchButton";
import Stamp from "@/components/jobsheet/Stamp";
import { demoLine } from "@/data/siteContent";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

export const metadata: Metadata = {
  alternates: { canonical: "/call-dispatch" },
  title: "Call & Dispatch Handling",
  description:
    "Every call answered. Missed-call text back, speed to lead, intake, and booking. The call that used to ring out becomes a booked job.",
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
        side={<DispatchLog />}
        sideAlign="start"
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
          <a href={demoLine.href} className="font-medium text-[var(--color-brand-strong)] hover:underline">
            {demoLine.display}
          </a>
          . Let it ring out and watch your phone.
        </p>
      </JobSheetSection>

      {/* Proof: illustrated AI voice call flow (not footage of the real line) */}
      <JobSheetSection
        code="CD-04"
        label="See it answer"
        title="An after-hours call, answered and booked without you."
        description="An illustrated call flow, not a recording of the live line above, just what happens when it rings after hours."
        tone="ink"
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className={`${jobsheet.ticket} !border-white/15 overflow-hidden p-0`}>
              <HomeDemoVideo src="/demos/video7.html" />
            </div>
          </Reveal>
        </div>
      </JobSheetSection>

      {/* Why speed matters: stats + decay */}
      <JobSheetSection
        code="CD-05"
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
          <PunchButton href={BOOK_URL} label="Book a Free Walkthrough" onDark external className="shrink-0" />
        </div>
      </JobSheetSection>

      {/* The Tuesday scenario, moved from how-it-works */}
      <JobSheetSection
        code="CD-06"
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

      <div className="container-shell py-12 text-center">
        <p className="text-sm leading-7 text-[#58524a]">
          The systems in this lane start at $49/month plus a $150 one-time setup. AI voice adds a separate $200 one-time configuration fee.{" "}
          <Link href="/pricing#tiers" className="font-medium text-[var(--color-brand-strong)] hover:underline">
            See full pricing &#8594;
          </Link>
        </p>
      </div>

      <JobSheetCTA
        code="CD-07"
        label="Hear it yourself"
        title="Call the demo line, then book your free walkthrough."
        description={`The demo line is live at ${demoLine.display}. Let it ring out and the text you get back is the product. When you're ready, the walkthrough finds where your calls are leaking.`}
        primaryHref={BOOK_URL}
        primaryLabel="Book a Free Walkthrough"
        secondaryHref="/demo"
        secondaryLabel="See the Demo"
      />
    </div>
  );
}
