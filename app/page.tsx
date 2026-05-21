import Link from "next/link";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { faqItems } from "@/data/siteContent";

const CAL_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

const costStats = [
  {
    stat: "78%",
    label: "of customers buy from the first business that responds",
    source: "Industry lead-response research",
    href: "https://greetnow.com/blog/lead-response-time-statistics",
  },
  {
    stat: "4×",
    label: "higher conversion when you respond within the first minute",
    source: "Velocify lead-response research",
    href: "https://cdn2.hubspot.net/hubfs/69576/leads360_wp_speed_to_call.pdf",
  },
];

const problemCards = [
  {
    heading: "Missed calls going to competitors",
    body: "Most callers will not wait around or leave a voicemail. If no one responds quickly, they move on to the next business on the list.",
  },
  {
    heading: "Slow follow-up losing jobs",
    body: "The longer a lead waits for a response, the lower the chance you win the work. Manual follow-up cannot keep pace with how fast intent fades.",
  },
  {
    heading: "Evenings lost to admin",
    body: "Quotes, scheduling, reminders, follow-ups, inbox cleanup. These tasks eat hours every day that should not require the owner every single time.",
  },
  {
    heading: "Leads falling through the cracks",
    body: "No reminder, no follow-up, no system. A potential job comes in, life gets busy, and the opportunity quietly disappears without anyone noticing.",
  },
  {
    heading: "Inconsistent customer communication",
    body: "Customers expect fast, clear responses. When the day gets busy, manual processes break down and the customer experience suffers.",
  },
];

const auditSteps = [
  {
    number: "01",
    heading: "We ask about your business",
    body: "Where does your day break down? Where do leads come from and where do they disappear? What tasks eat your evenings? We listen first and ask the right questions.",
  },
  {
    number: "02",
    heading: "We map your biggest opportunities",
    body: "Based on what you tell us, we identify one or two concrete systems that would have the highest impact for your specific business. No generic recommendations. No upsell pressure.",
  },
  {
    number: "03",
    heading: "You leave with clarity",
    body: "Even if you do not move forward with us, you will leave the call knowing exactly where AI can help your business and what it would take to fix it. Most owners find that useful on its own.",
  },
];

const systemCards = [
  {
    badge: "Most common",
    heading: "Speed to Lead",
    body: "The moment a call is missed, an automatic text goes out. The lead is captured, details are collected, and follow-up runs on its own. Your team gets a clean handoff with everything they need to close the job.",
    link: { label: "See how it works", href: "/how-it-works" },
  },
  {
    badge: null,
    heading: "Follow-Up Automation",
    body: "Quotes sent with no response. Jobs discussed but never booked. We build follow-up sequences that run automatically and keep prospects moving toward a decision without anyone on your team chasing them.",
    link: null,
  },
  {
    badge: null,
    heading: "AI Voicemail and Urgency Routing",
    body: "Voicemails get transcribed, summarized, and tagged by urgency so your team knows immediately what needs attention. No more listening to a full inbox at the end of the day.",
    link: null,
  },
  {
    badge: null,
    heading: "Intake and Booking Workflows",
    body: "Stop losing time to back and forth scheduling. We build intake systems that collect the right information upfront and move the customer toward a confirmed booking without manual coordination.",
    link: null,
  },
];

const industryRows = [
  {
    name: "Plumbing",
    leak: "On-site all day, hands in a job. No way to catch the next caller before they redial the next plumber on Google.",
    automate: "Auto-text within 60 seconds of a missed call, with job-type capture and an urgency flag for after-hours.",
  },
  {
    name: "HVAC",
    leak: "Heat-wave Tuesdays bring 4× volume. The phone can't physically keep up with the inbound.",
    automate: "Speed-to-lead plus after-hours intake routes urgent jobs to the right tech with the address already captured.",
  },
  {
    name: "Electrical",
    leak: "Jobs run back-to-back. By the time you check voicemail, the lead has already booked someone else.",
    automate: "Voicemail transcript plus an AI-generated reply tailored to the actual issue, not a generic auto-response.",
  },
  {
    name: "Cleaning",
    leak: "Volume of small-job inquiries you cannot realistically quote one by one during your busiest hours.",
    automate: "Web-form intake auto-quotes routine jobs and books straight into your calendar with no manual coordination.",
  },
  {
    name: "Landscaping",
    leak: "Mowers running, phones in the truck. Three hours can disappear silently while leads cool off.",
    automate: "Missed-call SMS keeps every lead engaged until the crew breaks for lunch and checks the truck.",
  },
  {
    name: "Other local trades",
    leak: "Any business where speed of response decides who wins the job.",
    automate: "We map your actual workflow first, then build the system around it. No template installs.",
  },
];

export default function Home() {
  return (
    <>
      <Hero
        id="overview"
        eyebrow="For owner-operated trades across the GTA & Ontario"
        title={
          <>
            You built a great business.
            <br />
            Stop losing jobs to missed calls.
          </>
        }
        description="We build and run the AI system that texts back every missed call in seconds and keeps the lead warm — without you lifting a finger."
        primaryCta={{
          href: CAL_URL,
          label: "Book Free Audit",
        }}
        secondaryCta={{ href: "/pricing", label: "See Pricing" }}
        ctaNote={
          <>
            A free 30-minute discovery call. No pitch. No obligation.{" "}
            <a
              href="tel:+14165097474"
              className="font-semibold text-[var(--color-brand)] underline-offset-2 hover:underline"
            >
              Or call: 416&#8209;509&#8209;7474
            </a>
          </>
        }
      >
        <div className="hidden lg:block">
          {/* Live SMS thread — replaces the generic industries panel */}
          <div className="relative">
            {/* Teal glow behind */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-shell bg-[radial-gradient(circle_at_60%_40%,_rgba(93,214,203,0.22),_transparent_65%)] blur-2xl"
            />

            <div className="overflow-hidden rounded-shell border border-line-dark bg-[#0a1424]/95 shadow-[0_36px_90px_rgba(0,0,0,0.45)] backdrop-blur-md">
              {/* Contact header */}
              <div className="flex items-center gap-3 border-b border-line-dark px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand)]/20 text-sm font-semibold tracking-wider text-[var(--color-brand)]">
                  AC
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">ABC HVAC</p>
                  <p className="text-xs text-on-dark-faint">Business · iMessage</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 rounded-full bg-surface-dark-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-on-dark-faint">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-brand)]" />
                  Live
                </div>
              </div>

              {/* Missed call event */}
              <div className="flex justify-center px-5 pt-5">
                <div className="flex items-center gap-2 rounded-full border border-line-dark bg-surface-dark-1 px-3 py-1.5 text-[11px] font-medium text-on-dark-muted">
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="h-3 w-3 text-rose-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 11l10-6M3 5l10 6" strokeLinecap="round" />
                  </svg>
                  Missed call · 2 sec ago
                </div>
              </div>

              {/* Auto-reply from business */}
              <div className="flex justify-end px-5 pt-4">
                <div className="max-w-[80%] rounded-card-sm rounded-br-[0.4rem] bg-[var(--color-brand)] px-4 py-2.5 text-sm leading-6 text-[var(--color-ink)] shadow-[0_8px_22px_rgba(93,214,203,0.25)]">
                  Hi — sorry we just missed your call. We&apos;re finishing a job. What&apos;s the issue and we&apos;ll get right back to you?
                </div>
              </div>
              <p className="px-5 pt-1 text-right text-[10px] text-on-dark-faint">
                Delivered · 0:09 after call
              </p>

              {/* Customer reply */}
              <div className="flex justify-start px-5 pt-4">
                <div className="max-w-[80%] rounded-card-sm rounded-bl-[0.4rem] bg-surface-dark-3 px-4 py-2.5 text-sm leading-6 text-white">
                  AC died this morning, getting hot in here fast. Can someone come today?
                </div>
              </div>

              {/* Business booking reply */}
              <div className="flex justify-end px-5 pt-4 pb-5">
                <div className="max-w-[80%] rounded-card-sm rounded-br-[0.4rem] bg-[var(--color-brand)] px-4 py-2.5 text-sm leading-6 text-[var(--color-ink)] shadow-[0_8px_22px_rgba(93,214,203,0.25)]">
                  Yes — 1–3pm window today. What&apos;s the address?
                </div>
              </div>

              {/* Outcome footer */}
              <div className="flex items-center justify-between border-t border-line-dark bg-surface-dark-1 px-5 py-3.5">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
                  Job booked
                </span>
                <span className="text-xs text-on-dark-faint">3 min total</span>
              </div>
            </div>
          </div>

          {/* Caption + condensed stats — kept lean */}
          <p className="mt-5 max-w-[28rem] text-sm leading-7 text-on-dark-muted">
            What your customer experiences when they call after hours. The text goes out before they finish dialing the next number on Google.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-on-dark-faint">
            <span>48 hrs to go live</span>
            <span aria-hidden="true">·</span>
            <span>No contract</span>
            <span aria-hidden="true">·</span>
            <span>$150 setup, then month-to-month</span>
          </div>
        </div>
      </Hero>

      {/* Section 2: Problems We Fix */}
      <Section
        id="problem"
        eyebrow="Where businesses leak money"
        title="Most owners already know something is off. They just do not know what to fix first."
        description="If any of these sound familiar, you are leaving jobs on the table."
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {problemCards.map((card, index) => (
            <article
              key={card.heading}
              className="surface-card rounded-card-lg p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-brand)]/[0.12] text-sm font-semibold text-[var(--color-brand-strong)]">
                0{index + 1}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                {card.heading}
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Section 3: Why Speed Matters — honest data block */}
      <Section
        eyebrow="The cost of a missed call"
        title="Every minute you do not respond, the job gets colder."
        description="Most callers who reach voicemail never leave a message — they just dial the next company on Google. Here is what the research on response speed says happens."
        tone="dark"
      >
        {/* Stat pair */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {costStats.map((s) => (
            <div
              key={s.stat}
              className="rounded-card-lg border border-line-dark bg-surface-dark-1 p-6"
            >
              <p className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                {s.stat}
              </p>
              <p className="mt-3 text-sm leading-7 text-on-dark">{s.label}</p>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-on-dark-faint underline-offset-2 hover:text-[var(--color-brand)] hover:underline"
              >
                {s.source}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          {/* Pull-stat: one giant 21× */}
          <div>
            <div className="flex items-end gap-5">
              <span
                aria-label="Twenty-one times"
                className="font-display font-semibold leading-[0.85] tracking-tight text-white"
                style={{ fontSize: "clamp(7rem, 16vw, 13rem)" }}
              >
                21
                <span className="text-[var(--color-brand)]">×</span>
              </span>
              <span className="pb-3 text-xs font-semibold uppercase leading-snug tracking-[0.28em] text-on-dark-faint sm:text-sm">
                more likely
                <br />
                to qualify
                <br />
                a lead
              </span>
            </div>
            <p className="mt-8 max-w-md text-base leading-8 text-on-dark">
              MIT and InsideSales research: businesses that responded to inbound leads within five minutes were 21× more likely to qualify them than businesses that waited thirty minutes.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.24em] text-on-dark-faint">
              Source ·{" "}
              <a
                href="https://resources.rework.com/libraries/lead-management/lead-response-time"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-[var(--color-brand)] hover:underline"
              >
                MIT / InsideSales Lead Response Study ↗
              </a>
            </p>
          </div>

          {/* Decay table */}
          <div className="rounded-card-lg border border-line-dark bg-surface-dark-1 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line-dark pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-on-dark-faint">
                Response time
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-on-dark-faint">
                Qualify rate
              </p>
            </div>
            <div className="mt-5 space-y-4">
              {[
                { time: "Under 1 min", bar: 100, label: "Baseline" },
                { time: "5 min", bar: 38, label: "−62%" },
                { time: "10 min", bar: 18, label: "−82%" },
                { time: "30 min", bar: 8, label: "1/21 of baseline" },
                { time: "60 min+", bar: 3, label: "Effectively lost" },
              ].map((row) => (
                <div
                  key={row.time}
                  className="grid grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-4"
                >
                  <span className="text-sm font-semibold text-white">{row.time}</span>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-dark-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-blue-current)]"
                      style={{ width: `${row.bar}%` }}
                    />
                  </div>
                  <span className="text-xs text-on-dark-muted">{row.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-line-dark pt-5 text-sm leading-7 text-on-dark">
              Every lead lands at the top of this curve, not the bottom.
            </p>
          </div>
        </div>

        {/* 60-second callout */}
        <div className="mt-10 flex flex-col items-start gap-5 rounded-card-lg border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.08] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Speed to Lead replies in under{" "}
            <span className="text-[var(--color-brand)]">60 seconds</span> — automatically.
          </p>
          <Link
            href={CAL_URL}
            className="btn-primary shrink-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Free Audit
          </Link>
        </div>
      </Section>

      {/* Section 4: Speed-to-Lead demo */}
      <Section
        id="demo"
        eyebrow="Our most common starting point"
        title="Speed to Lead: catch every missed call before they call your competitor."
        description="Call the demo line and hear exactly what your customers will experience when they reach your business after hours. Takes 30 seconds."
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Demo phone */}
          <div className="rounded-card-lg border-2 border-[var(--color-brand-strong)]/20 bg-white p-8 text-center shadow-[0_24px_64px_rgba(7,17,29,0.12)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-strong)]">
              Live demo line
            </p>
            <a
              href="tel:+13656017474"
              className="mt-3 block rounded-card-md border-2 border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.06] py-5 text-4xl font-semibold tracking-tight text-[var(--color-ink)] transition-all hover:border-[var(--color-brand)]/50 hover:bg-[var(--color-brand)]/[0.1] sm:text-5xl"
              aria-label="Call the demo line at 1 365 601 7474"
            >
              1 365 601 7474
            </a>
            <p className="mt-1 text-xs text-[var(--color-muted)]">Tap to call on mobile</p>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              Call and let it go to voicemail. You will receive a text within seconds — that is the system working.
            </p>
            <p className="mt-5 text-sm text-[var(--color-muted)]">No signup required. Works on any phone.</p>
            <div className="mt-6 grid gap-3 text-left">
              {[
                "Call the number and let it ring",
                "Watch for a text within 60 seconds",
                "That is what your customers will experience",
              ].map((step, i) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-card-sm border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-4 py-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-7 text-[var(--color-copy)]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="overflow-hidden rounded-card-lg border border-[var(--color-line)] bg-[var(--color-ink)] shadow-[0_18px_45px_rgba(7,17,29,0.12)]">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src="/demos/video1.html"
                allow="autoplay"
                scrolling="no"
                title="Current Automations — demo"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="p-6 text-center">
              <p className="text-sm text-on-dark-muted">
                Watch a missed call turn into a captured lead in under 60 seconds.
              </p>
              <p className="mt-3 text-sm text-on-dark-muted">
                Want to see it with your own call flow?{" "}
                <Link
                  href={CAL_URL}
                  className="font-medium text-[var(--color-brand)] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a free audit.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 5: Systems We Build */}
      <Section
        id="workflow"
        eyebrow="What we implement"
        title="Common systems we build for service businesses."
        description="Every business is different. These are the systems that come up most often after an audit."
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {systemCards.map((card) => (
            <article
              key={card.heading}
              className="surface-card rounded-card-lg p-7"
            >
              {card.badge ? (
                <span className="mb-4 inline-block rounded-full border border-[var(--color-brand-strong)]/30 bg-[var(--color-brand)]/[0.08] px-3 py-1 text-xs font-semibold text-[var(--color-brand-strong)]">
                  {card.badge}
                </span>
              ) : null}
              <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                {card.heading}
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                {card.body}
              </p>
              {card.link ? (
                <Link
                  href={card.link.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-brand-strong)] hover:underline"
                >
                  {card.link.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M3 8h10m-4-4 4 4-4 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ) : null}
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm leading-7 text-[var(--color-muted)]">
          Most systems go live in under 48 hours — $150 setup, then simple month-to-month pricing.{" "}
          <Link
            href="/pricing"
            className="font-medium text-[var(--color-brand-strong)] hover:underline"
          >
            See full pricing →
          </Link>
        </p>
      </Section>

      {/* Section 6: How the Audit Works */}
      <Section
        id="audit"
        eyebrow="The free audit"
        title="30 minutes. No jargon. You leave with a clear picture of where your business is losing money."
        tone="dark"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {auditSteps.map((step) => (
            <article
              key={step.number}
              className="relative rounded-card-lg border border-line-dark bg-surface-dark-2 p-7"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-strong)]">
                  {step.number}
                </span>
                <span className="h-px w-14 bg-gradient-to-r from-[var(--color-brand)]/70 to-transparent" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                {step.heading}
              </h3>
              <p className="mt-4 text-base leading-8 text-on-dark">
                {step.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link
            href={CAL_URL}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Free Audit
          </Link>
          <p className="text-sm text-on-dark-muted">A free 30-minute discovery call. No pitch, no obligation.</p>
        </div>
      </Section>

      {/* Section 7: Why Current Automations */}
      <Section
        id="why-current"
        eyebrow="About"
        title="Why service businesses choose us"
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <article className="surface-card rounded-card-lg p-8">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Most business owners do not need more software. They need someone who can look at how their business actually runs, explain what AI can realistically improve, and then quietly implement the right system without adding complexity. That is exactly what Current Automations does.
            </p>
            <div className="mt-8">
              <Link href="/about" className="btn-secondary bg-white">
                Learn More About Us
              </Link>
            </div>
          </article>

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
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-card-lg border border-[var(--color-line)] bg-white px-6 py-6 shadow-[0_18px_45px_rgba(7,17,29,0.08)]"
              >
                <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Section 8: Industries — editorial table archetype */}
      <Section
        eyebrow="Industries served"
        title="Built for the way service businesses actually run."
        description="If your day is mostly hands-on work, your phone is your business — and your inbox is where it leaks. Here is what we automate first for each trade."
      >
        <p className="mb-6 text-sm leading-7 text-[var(--color-muted)]">
          Currently serving businesses across Ajax, Whitby, Oshawa, Pickering, and the surrounding GTA.
        </p>

        <div className="overflow-hidden rounded-card-lg border border-[var(--color-line)] bg-white shadow-[0_18px_45px_rgba(7,17,29,0.06)]">
          {/* Desktop header */}
          <div className="hidden border-b border-[var(--color-line)] bg-[var(--color-panel-muted)] px-6 py-3 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1.6fr)] lg:gap-8">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Trade
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Where it leaks
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
              What runs automatically
            </span>
          </div>

          {industryRows.map((row, i) => (
            <div
              key={row.name}
              className={`grid grid-cols-1 gap-2 px-6 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1.6fr)] lg:gap-8 lg:py-6 ${
                i !== industryRows.length - 1
                  ? "border-b border-[var(--color-line)]"
                  : ""
              }`}
            >
              <p className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                {row.name}
              </p>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                <span className="lg:hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]/70 block mb-1">
                  Where it leaks
                </span>
                {row.leak}
              </p>
              <p className="text-sm leading-7 text-[var(--color-copy)]">
                <span className="lg:hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)] block mb-1">
                  What we automate
                </span>
                <span className="font-medium text-[var(--color-brand-strong)]">→ </span>
                {row.automate}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        items={faqItems}
        tone="muted"
        description="Clear answers to the practical questions most owners ask before deciding whether the system fits their workflow."
      />

      {/* Bottom CTA */}
      <CTASection
        eyebrow="Not sure where to start?"
        title="Book a free audit and we will figure it out together."
        description="No pressure. No pitch. Just a conversation about where your business is losing time and money."
        primaryHref={CAL_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </>
  );
}
