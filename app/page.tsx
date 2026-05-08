import Link from "next/link";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { faqItems } from "@/data/siteContent";

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

const industryItems = [
  { name: "Plumbing", tagline: "On-site all day, calls missed, leads gone." },
  { name: "HVAC", tagline: "Peak season demand you cannot always answer." },
  { name: "Electrical", tagline: "Jobs running back to back with no time to call back." },
  { name: "Cleaning", tagline: "High inbound volume during your busiest hours." },
  { name: "Landscaping", tagline: "Outdoor work means phones go unanswered for hours." },
  { name: "Other local service businesses", tagline: "If your business runs on inbound calls, this fits." },
];

export default function Home() {
  return (
    <>
      {/* Hero — keep copy/layout, update CTA label only */}
      <Hero
        id="overview"
        title={
          <>
            You built a great business.
            <br />
            We use AI to maximize every dollar it makes.
          </>
        }
        description="We audit your business, identify exactly where AI will have the biggest impact, then build and run the systems for you. No technical knowledge required on your end. Ever."
        primaryCta={{
          href: "https://calendly.com/currentautomations/30min",
          label: "Book Your Free Revenue Leak Audit",
        }}
        secondaryCta={{ href: "/pricing", label: "See Pricing" }}
        ctaNote="Every business we audit has money sitting uncaptured. We find it, then we build the system that recovers it."
      />

      {/* Section 2: Problems We Fix */}
      <Section
        id="problem"
        eyebrow="Where businesses leak money"
        title="Most owners already know something is off. They just do not know what to fix first."
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {problemCards.map((card, index) => (
            <article
              key={card.heading}
              className="surface-card rounded-[1.75rem] p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-sm font-semibold text-white">
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

      {/* Section 3: How the Audit Works */}
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
              className="relative rounded-[1.9rem] border border-white/10 bg-white/[0.06] p-7"
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
              <p className="mt-4 text-base leading-8 text-white/[0.68]">
                {step.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link
            href="https://calendly.com/currentautomations/30min"
            className="btn-primary"
          >
            Book Your Free Revenue Leak Audit
          </Link>
          <p className="text-sm text-white/[0.48]">30 minutes. No pitch. No obligation.</p>
        </div>
      </Section>

      {/* Section 4: Systems We Build */}
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
              className="surface-card rounded-[1.75rem] p-7"
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
      </Section>

      {/* Section 5: Speed to Lead Spotlight heading */}
      <Section
        eyebrow="Our most common starting point"
        title="Speed to Lead: catch every missed call before they call your competitor."
        description="For most service businesses, missed calls are the single biggest revenue leak. Here is exactly what happens when the system is running."
      >
        {null}
      </Section>

      {/* Demo section — content unchanged, link updated per global rules */}
      <Section
        id="demo"
        eyebrow="Try it yourself"
        title="See It and Try It"
        description="Call the demo line and hear exactly what your customers will experience when they reach your business after hours. Takes 30 seconds."
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Demo phone */}
          <div className="rounded-[2rem] border-2 border-[var(--color-brand-strong)]/20 bg-white p-8 text-center shadow-[0_24px_64px_rgba(7,17,29,0.12)] sm:p-10">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
              Live demo line
            </p>
            <a
              href="tel:+13656017474"
              className="mt-4 block text-4xl font-semibold tracking-tight text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand-strong)] sm:text-5xl"
            >
              +1 365 601 7474
            </a>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              Call and let it go to voicemail. You will receive a text within seconds — that is the system working.
            </p>
            <div className="mt-8">
              <a href="tel:+13656017474" className="btn-primary">
                Call the Demo Line
              </a>
            </div>
            <p className="mt-5 text-sm text-[var(--color-muted)]">No signup required. Works on any phone.</p>
            <div className="mt-6 grid gap-3 text-left">
              {[
                "Call the number and let it ring",
                "Watch for a text within 60 seconds",
                "That is what your customers will experience",
              ].map((step, i) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-[1.25rem] border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-4 py-3"
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
          <div className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-ink)] shadow-[0_18px_45px_rgba(7,17,29,0.12)]">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src="https://player.vimeo.com/video/1181405333?badge=0&autopause=0&player_id=0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                title="Current Automations — demo"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="p-6 text-center">
              <p className="text-sm text-white/[0.55]">
                Watch a missed call turn into a captured lead in under 60 seconds.
              </p>
              <p className="mt-3 text-sm text-white/[0.45]">
                Want to see it with your own call flow?{" "}
                <Link
                  href="https://calendly.com/currentautomations/30min"
                  className="font-medium text-[var(--color-brand)] hover:underline"
                >
                  Book Your Free Revenue Leak Audit.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 6: Why Speed Matters */}
      <Section
        eyebrow="Why speed matters"
        title="The data on lead response is clear."
        tone="dark"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7">
            <p className="text-5xl font-semibold tracking-tight text-white">21x</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
              more likely to qualify
            </p>
            <p className="mt-4 text-base leading-8 text-white/[0.68]">
              Research from MIT and InsideSales found that businesses responding to inbound leads within 5 minutes were 21 times more likely to qualify them than businesses that waited 30 minutes.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7">
            <p className="text-5xl font-semibold tracking-tight text-white">Every minute</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
              the lead gets colder
            </p>
            <p className="mt-4 text-base leading-8 text-white/[0.68]">
              In plain English: the longer a lead waits, the colder it gets. When a business misses the first touchpoint, the next company on Google often gets the job.
            </p>
          </article>
        </div>
        <p className="mt-8 max-w-3xl text-base leading-8 text-white/[0.68]">
          Most callers will not wait around. If they hit voicemail and do not get a quick response, they move on. Speed to Lead fixes that automatically.
        </p>
      </Section>

      {/* Section 7: Why Current Automations */}
      <Section
        id="why-current"
        eyebrow="About"
        title="Why service businesses choose us"
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <article className="surface-card rounded-[2rem] p-8">
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
                  "Every engagement starts with a free Revenue Leak Audit. We find what will actually move the needle for your specific business before recommending anything.",
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
                className="rounded-[1.7rem] border border-[var(--color-line)] bg-white px-6 py-6 shadow-[0_18px_45px_rgba(7,17,29,0.08)]"
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

      {/* Section 8: Industries — unchanged */}
      <Section
        eyebrow="Industries served"
        title="Built for service businesses like:"
        description="Especially useful for businesses that rely on inbound phone calls and need to stay responsive while already on-site, in transit, or handling another customer."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industryItems.map((industry) => (
            <article
              key={industry.name}
              className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-5 py-5 shadow-[0_18px_45px_rgba(7,17,29,0.08)]"
            >
              <p className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                {industry.name}
              </p>
              <p className="mt-1.5 text-sm leading-7 text-[var(--color-muted)]">
                {industry.tagline}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Section 9: Results */}
      <Section
        title="Results"
        description="Currently working with our first clients in Ontario. Case studies and results coming soon."
        align="center"
        tone="muted"
      >
        {null}
      </Section>

      {/* Section 10: The Math — unchanged */}
      <Section
        id="math"
        eyebrow="The real cost"
        title="The Math on Missed Calls"
        description="The numbers behind why missed calls are the most expensive problem most service businesses are not tracking."
      >
        <div className="mx-auto max-w-3xl">
          <div className="surface-card rounded-[2rem] p-8 sm:p-10">
            <p className="text-base leading-9 text-[var(--color-copy)]">
              Most service calls are worth several hundred dollars. When a lead
              calls and does not hear back quickly, they move on. Over the
              course of a week, a month, a year, those missed opportunities add
              up to real money walking to a competitor. Current Automations
              costs{" "}
              <strong className="text-[var(--color-ink)]">$299 per month</strong>.
              For most service businesses, a single recovered job covers that
              cost entirely.
            </p>
          </div>
        </div>
      </Section>

      {/* Section 11: FAQ — unchanged */}
      <FAQSection
        items={faqItems}
        tone="muted"
        description="Clear answers to the practical questions most owners ask before deciding whether the system fits their workflow."
      />

      {/* Section 12: Bottom CTA */}
      <CTASection
        eyebrow="Ready to see it with your own call flow?"
        title="Find Out Where Your Business Is Leaving Money Behind"
        description="We audit your business, find the highest-impact opportunities, and build the systems that fix them."
        primaryHref="https://calendly.com/currentautomations/30min"
        primaryLabel="Book Your Free Revenue Leak Audit"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </>
  );
}
