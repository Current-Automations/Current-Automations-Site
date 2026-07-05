import Link from "next/link";
import Reveal from "@/components/Reveal";
import HomeDemoVideo from "@/components/HomeDemoVideo";
import CountUp from "@/components/motion/CountUp";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetHero from "@/components/jobsheet/JobSheetHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import JobSheetFAQ from "@/components/jobsheet/JobSheetFAQ";
import TicketCard from "@/components/jobsheet/TicketCard";
import PunchButton from "@/components/jobsheet/PunchButton";
import Stamp from "@/components/jobsheet/Stamp";
import { caseStudies, faqItems } from "@/data/siteContent";

const CAL_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

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
  {
    job: "JOB #004",
    heading: "Quotes sent, then silence",
    body: "You priced the job, sent it over, and meant to follow up. Then the week happened. The customer was not cold, just waiting for a nudge that never came.",
  },
  {
    job: "JOB #005",
    heading: "You are the entire front office",
    body: "Scheduling, reminders, callbacks, inbox cleanup. It all routes through you. The business cannot answer the phone unless you personally do.",
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

const systemCards = [
  {
    code: "SYS-01",
    badge: "Most common",
    heading: "Speed to Lead",
    body: "The moment a call is missed, an automatic text goes out. The lead is captured, details are collected, and follow-up runs on its own. Your team gets a clean handoff with everything they need to close the job.",
    link: { label: "See how it works", href: "/how-it-works" },
  },
  {
    code: "SYS-02",
    badge: null,
    heading: "Follow-Up Automation",
    body: "Quotes sent with no response. Jobs discussed but never booked. We build follow-up sequences that run automatically and keep prospects moving toward a decision without anyone on your team chasing them.",
    link: null,
  },
  {
    code: "SYS-03",
    badge: null,
    heading: "AI Voicemail and Urgency Routing",
    body: "Voicemails get transcribed, summarized, and tagged by urgency so your team knows immediately what needs attention. No more listening to a full inbox at the end of the day.",
    link: null,
  },
  {
    code: "SYS-04",
    badge: null,
    heading: "Intake and Booking Workflows",
    body: "Stop losing time to back and forth scheduling. We build intake systems that collect the right information upfront and move the customer toward a confirmed booking without manual coordination.",
    link: null,
  },
];

const auditSteps = [
  {
    number: "STEP 01",
    heading: "We ask about your business",
    body: "Where does your day break down? Where do leads come from and where do they disappear? What tasks eat your evenings? We listen first and ask the right questions.",
  },
  {
    number: "STEP 02",
    heading: "We map your biggest opportunities",
    body: "Based on what you tell us, we identify one or two concrete systems that would have the highest impact for your specific business. No generic recommendations. No upsell pressure.",
  },
  {
    number: "STEP 03",
    heading: "You leave with clarity",
    body: "Even if you do not move forward with us, you will leave the call knowing exactly where AI can help your business and what it would take to fix it. Most owners find that useful on its own.",
  },
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

export default function Home() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetHero
        id="overview"
        primaryHref={CAL_URL}
        secondaryHref="/pricing"
        ctaNote={
          <>
            A free 30-minute audit. No pitch. No obligation.{" "}
            <a
              href="tel:+13655137474"
              className="font-semibold text-[var(--color-brand-strong)] underline-offset-2 hover:underline"
            >
              Or call: +1 (365) 513&#8209;7474
            </a>
          </>
        }
      />

      {/* Problems: ledger of scenarios, not a numbered narrative */}
      <JobSheetSection
        code="CA-02"
        label="Sound familiar?"
        title="The work is good. The phone is the problem."
        description="If any of these sound like your week, you are leaving jobs on the table. None of them need you to work harder. They need a system that answers when you cannot."
        tone="paper"
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

      {/* Lifecycle: the real 3-stage sequence a job actually goes through */}
      <JobSheetSection
        code="CA-03"
        label="Here is the fix"
        title="Every missed call becomes a three-stage job ticket."
        description="This is the exact path your customers go through once the system is running. No app, no portal, nothing for them or you to learn."
        tone="carbon"
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
          We install it, tune it, and hand you a working system. You don&apos;t touch the tech.
        </p>
      </JobSheetSection>

      {/* Cost of a missed call: mono stat blocks + decay ledger */}
      <JobSheetSection
        code="CA-04"
        label="The cost of a missed call"
        title="Every minute you do not respond, the job gets colder."
        description="Most callers who reach voicemail never leave a message. They just dial the next company on Google. Here is what the research on response speed says happens."
        tone="ink"
      >
        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          <TicketCard onDark refCode="STAT-A">
            <p className={`${jobsheet.mono} text-[clamp(2.6rem,6vw,4rem)] font-semibold text-[#f3ede1]`}>
              <CountUp value={78} suffix="%" />
            </p>
            <p className="mt-3 max-w-sm text-base leading-8 text-[rgba(243,237,225,0.72)]">
              of customers buy from the first business that responds
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[rgba(243,237,225,0.4)]">
              Source &middot;{" "}
              <a
                href="https://greetnow.com/blog/lead-response-time-statistics"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-[var(--color-brand)] hover:underline"
              >
                Industry lead-response research &#8599;
              </a>
            </p>
          </TicketCard>

          <TicketCard onDark refCode="STAT-B">
            <p className={`${jobsheet.mono} text-[clamp(2.6rem,6vw,4rem)] font-semibold text-[#f3ede1]`}>
              <CountUp value={4} suffix="x" />
            </p>
            <p className="mt-3 max-w-sm text-base leading-8 text-[rgba(243,237,225,0.72)]">
              higher conversion when you respond within the first minute
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[rgba(243,237,225,0.4)]">
              Source &middot;{" "}
              <a
                href="https://cdn2.hubspot.net/hubfs/69576/leads360_wp_speed_to_call.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-[var(--color-brand)] hover:underline"
              >
                Velocify lead-response research &#8599;
              </a>
            </p>
          </TicketCard>
        </div>

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
              MIT and InsideSales research: businesses that responded to inbound leads within five minutes were 21&#215; more likely to qualify them than businesses that waited thirty minutes.
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
          <PunchButton href={CAL_URL} label="Book Free Audit" onDark external className="shrink-0" />
        </div>
      </JobSheetSection>

      {/* Demo line */}
      <JobSheetSection
        id="demo"
        code="CA-05"
        label="Proof you can dial right now"
        title="Call it yourself. The text you get back is the product."
        description="The demo line is live. Call and let it go to voicemail. You will get a text within seconds: the same thing your customers experience when they reach your business after hours. Takes 30 seconds, works on any phone."
        tone="paper"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <TicketCard refCode="CALL-ME">
              <div className="text-center">
                <div className="mb-3 inline-block">
                  <Stamp label="Live demo line" tone="teal" />
                </div>
                <a
                  href="tel:+13656017474"
                  className={`${jobsheet.mono} block text-[clamp(2rem,4vw,2.8rem)] font-semibold text-[#181510] transition-colors hover:text-[var(--color-brand-strong)]`}
                  aria-label="Call the demo line at 1 365 601 7474"
                >
                  1 365 601 7474
                </a>
                <p className="mt-2 text-xs text-[#58524a]">Tap to call on mobile</p>
                <p className="mt-4 text-base leading-8 text-[#58524a]">
                  No signup. No form. The text you get back is the product.
                </p>
              </div>
              <div className="mt-6 grid gap-3 text-left">
                {[
                  "Call the number and let it ring",
                  "Watch for a text within 60 seconds",
                  "That is what your customers will experience",
                ].map((step, i) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 rounded border border-[rgba(28,36,48,0.16)] bg-[rgba(28,36,48,0.03)] px-4 py-3"
                  >
                    <span className={`${jobsheet.mono} mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-strong)] text-[10px] font-bold text-white`}>
                      {i + 1}
                    </span>
                    <p className="text-sm leading-7 text-[#3a352c]">{step}</p>
                  </div>
                ))}
              </div>
            </TicketCard>
          </Reveal>

          <Reveal delay={90}>
            <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
              <HomeDemoVideo src="/demos/video1.html" />
              <div className="p-6 text-center">
                <p className="text-sm text-[#58524a]">
                  Watch a missed call turn into a captured lead in under 60 seconds.
                </p>
                <p className="mt-3 text-sm text-[#58524a]">
                  Want to see it with your own call flow?{" "}
                  <Link href={CAL_URL} className="font-medium text-[var(--color-brand-strong)] hover:underline" target="_blank" rel="noopener noreferrer">
                    Book a free audit.
                  </Link>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </JobSheetSection>

      {/* Systems we build */}
      <JobSheetSection
        code="CA-06"
        label="Parts catalog"
        title="Common systems we build for service businesses."
        description="Every business is different. These are the systems that come up most often after an audit."
        tone="paper"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {systemCards.map((card, i) => (
            <Reveal key={card.heading} delay={i * 70} className={i % 2 === 0 ? jobsheet.tiltC : jobsheet.tiltB}>
              <TicketCard refCode={card.code}>
                {card.badge ? (
                  <div className="mb-4">
                    <Stamp label={card.badge} tone="teal" />
                  </div>
                ) : null}
                <h3 className="text-2xl font-semibold tracking-tight text-[#181510]">{card.heading}</h3>
                <p className="mt-4 text-base leading-8 text-[#58524a]">{card.body}</p>
                {card.link ? (
                  <Link
                    href={card.link.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-brand-strong)] hover:underline"
                  >
                    {card.link.label}
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 8h10m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ) : null}
              </TicketCard>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm leading-7 text-[#58524a]">
          Most systems go live in under 48 hours: $150 setup, then simple month-to-month pricing.{" "}
          <Link href="/pricing" className="font-medium text-[var(--color-brand-strong)] hover:underline">
            See full pricing &#8594;
          </Link>
        </p>
      </JobSheetSection>

      {/* Audit steps: the one real sequence on the page */}
      <JobSheetSection
        code="CA-07"
        label="The free audit"
        title="30 minutes. No jargon. You leave knowing exactly where your business is losing money."
        description="This is where every engagement starts, and where most owners get the most value, even the ones who never hire us."
        tone="ink"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {auditSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 90}>
              <TicketCard onDark refCode={step.number}>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#f3ede1]">{step.heading}</h3>
                <p className="mt-4 text-base leading-8 text-[rgba(243,237,225,0.72)]">{step.body}</p>
              </TicketCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <PunchButton href={CAL_URL} label="Book Free Audit" onDark external />
          <p className="text-sm text-[rgba(243,237,225,0.72)]">A free 30-minute discovery call. No pitch, no obligation.</p>
        </div>
      </JobSheetSection>

      {/* Why Current Automations */}
      <JobSheetSection
        code="CA-08"
        label="Done for you"
        title="We install it, tune it, and hand you a working system."
        description="You don't touch the tech."
        tone="carbon"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <Reveal>
            <TicketCard refCode="ABOUT">
              <p className="text-base leading-8 text-[#3a352c]">
                Most business owners do not need more software. They need someone who can look at how their business actually runs, explain what AI can realistically improve, and then quietly implement the right system without adding complexity. That is exactly what Current Automations does.
              </p>
              <div className="mt-8">
                <PunchButton href="/about" label="Learn More About Us" variant="ghost" />
              </div>
            </TicketCard>
          </Reveal>

          <div className="grid gap-5">
            {[
              {
                title: "We start with your problem, not a product",
                description:
                  "Every engagement starts with a free audit. We find what will actually move the needle for your specific business before recommending anything.",
              },
              {
                title: "We build and maintain everything",
                description:
                  "You never touch the technology. We configure, deploy, and maintain every system we build. If something needs adjusting, you contact us and it gets fixed.",
              },
              {
                title: "The relationship is ongoing",
                description:
                  "We are not here to sell you a tool and disappear. We grow with your business and add more systems as the right opportunities emerge.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <TicketCard>
                  <h3 className="text-xl font-semibold tracking-tight text-[#181510]">{item.title}</h3>
                  <p className="mt-3 text-base leading-8 text-[#58524a]">{item.description}</p>
                </TicketCard>
              </Reveal>
            ))}
          </div>
        </div>
      </JobSheetSection>

      {/* Industries served */}
      <JobSheetSection
        code="CA-09"
        label="Industries served"
        title="Built for the way service businesses actually run."
        description="If your day is mostly hands-on work, your phone is your business, and your inbox is where it leaks. Here is what we automate first for each trade."
        tone="paper"
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
      </JobSheetSection>

      {/* Proof / in-practice case studies */}
      <JobSheetSection
        code="CA-10"
        label="Proof it works"
        title="In practice."
        description="These aren't Current Automations clients yet. They're real examples of the same approach, missed calls and support gaps closed with the right system. We're building the same thing for trades businesses right now."
        tone="ink"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {caseStudies.map((item, i) => (
            <Reveal key={item.company} delay={i * 80}>
              <TicketCard onDark refCode={`REF-${i + 1}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#f3ede1]">{item.company}</h3>
                  <span className={`${jobsheet.mono} text-xs uppercase tracking-[0.14em] text-[rgba(243,237,225,0.4)]`}>
                    {item.industry}
                  </span>
                </div>
                <dl className="mt-5 space-y-3">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">Problem</dt>
                    <dd className="mt-1 text-sm leading-7 text-[rgba(243,237,225,0.72)]">{item.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">System</dt>
                    <dd className="mt-1 text-sm leading-7 text-[rgba(243,237,225,0.72)]">{item.system}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">Result</dt>
                    <dd className="mt-1 text-sm font-medium leading-7 text-[#f3ede1]">{item.result}</dd>
                  </div>
                </dl>
                <p className="mt-6 border-t border-dashed border-white/15 pt-4 text-xs leading-6 text-[rgba(243,237,225,0.4)]">
                  Source: {item.source}.{" "}
                  {!item.isClient ? "Industry example, not a Current Automations client." : null}
                </p>
              </TicketCard>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetFAQ
        items={faqItems}
        code="CA-11"
        label="Questions on file"
        title="Questions service business owners usually ask first."
        description="A straightforward overview of how Current Automations fits into your existing process."
        tone="paper"
      />

      <JobSheetCTA
        code="CA-12"
        label="Not sure where to start?"
        title="Book a free audit and we will figure it out together."
        description="No pressure. No pitch. Just a conversation about where your business is losing time and money."
        primaryHref={CAL_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </div>
  );
}
