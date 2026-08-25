import Link from "next/link";
import Reveal from "@/components/Reveal";
import HomeDemoVideo from "@/components/HomeDemoVideo";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetHero from "@/components/jobsheet/JobSheetHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import JobSheetFAQ from "@/components/jobsheet/JobSheetFAQ";
import TicketCard from "@/components/jobsheet/TicketCard";
import PunchButton from "@/components/jobsheet/PunchButton";
import Stamp from "@/components/jobsheet/Stamp";
import { caseStudies, faqItems, demoLine } from "@/data/siteContent";

const CAL_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

const tradeLanes = [
  {
    code: "PILLAR 01",
    stamp: "Every call answered",
    heading: "Call & dispatch handling",
    body: "Missed-call text back, speed to lead, intake, and booking. Every call, form, and voicemail gets an answer in seconds and lands as a booked job instead of a cold lead.",
    href: "/call-dispatch",
    linkLabel: "See the call & dispatch lane",
  },
  {
    code: "PILLAR 02",
    stamp: "No lead goes cold",
    heading: "Auto-replies & follow-up",
    body: "Automatic replies and follow-up sequences that answer every inquiry and keep quotes moving toward a yes. Tuned to sound like your business, not a robot with your logo.",
    href: "/follow-up",
    linkLabel: "See the follow-up lane",
  },
  {
    code: "PILLAR 03",
    stamp: "Paperwork handled",
    heading: "Back-office & admin",
    body: "The desk work that eats your evenings. First up: invoice and payment follow-up that chases overdue invoices politely and on schedule. More on the way.",
    href: "/back-office",
    linkLabel: "See the back-office lane",
  },
];

const auditSteps = [
  {
    number: "01",
    heading: "We ask about your business",
    body: "Where does your day break down? Where do leads come from and where do they disappear?",
  },
  {
    number: "02",
    heading: "We map your biggest opportunities",
    body: "One or two concrete systems with the highest impact for your situation. No generic recommendations.",
  },
  {
    number: "03",
    heading: "You leave with clarity",
    body: "Even if you never hire us, you leave knowing exactly where your business leaks and what would fix it.",
  },
];

function LaneLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-brand-strong)] hover:underline"
    >
      {label}
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 8h10m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

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

      {/* The pillars: 3 trades lanes + 1 B2B lane */}
      <JobSheetSection
        id="what-we-automate"
        code="CA-02"
        label="What we automate"
        title="Three lanes for your trade. Start with the one that hurts most."
        description="Each lane is its own set of small systems. You never buy the department; you start with one fix, see it work, and grow into the rest."
        tone="carbon"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {tradeLanes.map((lane, i) => (
            <Reveal key={lane.code} variant="up" delay={i * 120} className={[jobsheet.tiltA, jobsheet.tiltC, jobsheet.tiltB][i]}>
              <TicketCard refCode={lane.code}>
                <div className="mb-4">
                  <Stamp label={lane.stamp} tone="teal" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-[#181510]">{lane.heading}</h3>
                <p className="mt-4 text-base leading-8 text-[#58524a]">{lane.body}</p>
                <LaneLink href={lane.href} label={lane.linkLabel} />
              </TicketCard>
            </Reveal>
          ))}
        </div>

        {/* The +1: same scale, different paper */}
        <Reveal variant="up" delay={380}>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className={`${jobsheet.ticket} !bg-[var(--card)] !border-[#a8452f] relative p-7 pl-10 sm:p-8 sm:pl-11 lg:col-start-2`}>
              <span className={jobsheet.ticketHole} aria-hidden="true" />
              <span className={`${jobsheet.mono} ${jobsheet.ticketRef}`}>PILLAR 04</span>
              <div className="mb-4">
                <Stamp label="B2B only" tone="rust" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#181510]">Lead generation</h3>
              <p className="mt-4 text-base leading-8 text-[#58524a]">
                Not a trades tool. Automated pipelines that find and qualify decision-makers at companies matching your exact ICP. For corporate, construction management, and B2B service companies.
              </p>
              <LaneLink href="/lead-generation" label="See the lead-gen program" />
            </div>
          </div>
        </Reveal>
      </JobSheetSection>

      {/* Proof: demo line, video, dispatch log */}
      <JobSheetSection
        id="demo"
        code="CA-03"
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
                  href={demoLine.href}
                  className={`${jobsheet.mono} block text-[clamp(2rem,4vw,2.8rem)] font-semibold text-[#181510] transition-colors hover:text-[var(--color-brand-strong)]`}
                  aria-label={`Call the demo line at ${demoLine.display}`}
                >
                  {demoLine.display}
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
              </div>
            </div>
          </Reveal>
        </div>
        <p className="mt-8 text-center text-sm leading-7 text-[#58524a]">
          Want to see it with your own call flow?{" "}
          <Link href={CAL_URL} className="font-medium text-[var(--color-brand-strong)] hover:underline" target="_blank" rel="noopener noreferrer">
            Book a free audit.
          </Link>{" "}
          Or see the{" "}
          <Link href="/demo" className="font-medium text-[var(--color-brand-strong)] hover:underline">
            full demo page
          </Link>
          .
        </p>
      </JobSheetSection>

      {/* The audit, compressed to a strip */}
      <JobSheetSection
        code="CA-04"
        label="The free audit"
        title="30 minutes. No jargon. You leave knowing where the money leaks."
        description="This is where every engagement starts, and where most owners get the most value, even the ones who never hire us."
        tone="ink"
      >
        <div className="grid gap-px overflow-hidden rounded border-2 border-dashed border-white/20 sm:grid-cols-3">
          {auditSteps.map((step) => (
            <div key={step.number} className="bg-white/[0.04] p-6 sm:p-7">
              <span className={`${jobsheet.mono} text-2xl font-semibold text-[var(--color-brand)]`}>
                {step.number}
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#f3ede1]">{step.heading}</h3>
              <p className="mt-3 text-sm leading-7 text-[rgba(243,237,225,0.72)]">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <PunchButton href={CAL_URL} label="Book Free Audit" onDark external />
          <p className="text-sm text-[rgba(243,237,225,0.72)]">A free 30-minute discovery call. No pitch, no obligation.</p>
        </div>
      </JobSheetSection>

      {/* Done for you, shortened */}
      <JobSheetSection
        code="CA-05"
        label="Done for you"
        title="We install it, tune it, and hand you a working system."
        description="You don't touch the tech."
        tone="carbon"
      >
        <Reveal>
          <TicketCard refCode="ABOUT">
            <p className="max-w-3xl text-base leading-8 text-[#3a352c]">
              Most business owners do not need more software. They need someone who can look at how their business actually runs, explain what can realistically be automated, and then quietly install the right system without adding complexity. That is the whole job here: we start with your problem instead of a product, we build and maintain everything on our side, and the relationship stays open as your business grows. If you want the final say, every system can start with approvals on: nothing sends until you OK it, and you hand over control when you&apos;re ready.
            </p>
            <div className="mt-7">
              <PunchButton href="/about" label="Learn More About Us" variant="ghost" />
            </div>
          </TicketCard>
        </Reveal>
      </JobSheetSection>

      {/* Proof / in-practice case studies */}
      <JobSheetSection
        code="CA-06"
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
        code="CA-07"
        label="Frequently Asked Questions"
        title="Questions service business owners usually ask first."
        description="A straightforward overview of how Current Automations fits into your existing process."
        tone="paper"
      />

      <JobSheetCTA
        code="CA-08"
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
