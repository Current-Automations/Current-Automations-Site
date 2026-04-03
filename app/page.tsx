import Link from "next/link";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Hero from "@/components/Hero";
import HomeSectionTabs from "@/components/HomeSectionTabs";
import OutcomeCard from "@/components/OutcomeCard";
import Section from "@/components/Section";
import TrustBar from "@/components/TrustBar";
import { faqItems, serviceIndustries } from "@/data/siteContent";

const problemPoints = [
  {
    title: "80% of callers never leave a voicemail",
    description:
      "They hang up and call the next company on Google. Your marketing dollars brought them in, and silence sent them away.",
  },
  {
    title: "62% switch to a competitor after one missed call",
    description:
      "They are not waiting for a callback. In trades and home services, the first business to respond wins the job.",
  },
  {
    title: "Responding in under 60 seconds boosts conversions by 391%",
    description:
      "After five minutes, the odds of reaching that lead drop by 100x. Manual follow up cannot keep pace with how fast intent decays.",
  },
];

const solutionSteps = [
  {
    step: "Instant text-back",
    description:
      "The moment a call goes unanswered, the caller gets an SMS: 'Hey, sorry we missed your call. What can we help with? Reply here or we will call you right back.' No delay. No voicemail. No lost lead.",
  },
  {
    step: "Voicemail capture",
    description:
      "If they leave a voicemail, it gets transcribed and sent to you as a text and email summary. You see the caller's name, number, what they need, and how urgent it sounds, all within seconds.",
  },
  {
    step: "Lead detail collection",
    description:
      "The text conversation collects the details your team needs before the callback: name, address, job type, and availability. Your team calls back prepared, not guessing.",
  },
  {
    step: "Follow-up automation",
    description:
      "If the prospect does not reply right away, the system sends a follow up sequence over the next 24 to 48 hours. The lead stays warm without anyone on your team lifting a finger.",
  },
];

const trustIndustries = serviceIndustries.slice(0, 5);

const outcomes = [
  {
    title: "Respond to customers faster",
    description:
      "Give every inbound caller a quicker acknowledgment so your business feels responsive even during busy hours.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M12 3v4m0 10v4m9-9h-4M7 12H3m15.36 6.36-2.83-2.83M8.47 8.47 5.64 5.64m12.72 0-2.83 2.83M8.47 15.53l-2.83 2.83"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Recover leads you would have lost",
    description:
      "Turn missed calls into active conversations before that customer moves on to the next company.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m7 10.5 3.2 2.4a3.1 3.1 0 0 0 3.6 0L17 10.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Book more jobs without extra manual effort",
    description:
      "Keep the follow-up moving automatically so your team can stay focused on the work already in front of them.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M7 4v3m10-3v3M4 9h16M5.5 6.5h13A1.5 1.5 0 0 1 20 8v10.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5V8a1.5 1.5 0 0 1 1.5-1.5Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m9.5 14 1.5 1.5 3.5-4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Deliver a better customer experience",
    description:
      "A fast, clear first response makes your business feel more organized, attentive, and trustworthy from the start.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M12 21s7-3.8 7-10.2V5.8L12 3 5 5.8v5C5 17.2 12 21 12 21Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m9.5 12.5 1.7 1.7 3.3-3.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Hero
        id="overview"
        eyebrow="Launch-stage workflows built for local service teams"
        title={
          <>
            Never Miss Another Job Because of a{" "}
            <span className="font-display text-[var(--color-accent)]">
              Missed Call
            </span>
          </>
        }
        description="When you miss a call, we text back in under 60 seconds, capture the lead, and keep them warm until your team is ready. No new software. No extra work. Just fewer lost jobs."
        primaryCta={{
          href: "/book-a-demo#demo-request",
          label: "Request a Demo",
        }}
        secondaryCta={{ href: "/pricing", label: "See Pricing" }}
        locationBadge="Based in Ottawa, ON"
        stats={[
          { value: "<60s", label: "automatic text back, every missed call" },
          { value: "24/7", label: "coverage, nights, weekends, holidays included" },
          { value: "80%", label: "of callers hang up on voicemail. We catch them instead." },
        ]}
      >
        <div className="relative mx-auto w-full max-w-xl">
          <div className="dark-card relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
                  Live lead recovery
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  One missed call, one saved job
                </p>
              </div>
              <div className="rounded-full border border-emerald-300/[0.30] bg-emerald-300/[0.10] px-3 py-1 text-xs font-semibold text-emerald-200">
                Active
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Incoming call missed
                    </p>
                    <p className="mt-1 text-sm text-white/[0.60]">
                      New homeowner looking for same-day plumbing help.
                    </p>
                  </div>
                  <div className="rounded-full bg-white/[0.08] px-3 py-1 text-xs text-white/[0.65]">
                    11:42 AM
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 px-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--color-brand)] to-[#0d7e67]" />
                <div className="h-px flex-1 bg-gradient-to-r from-emerald-300/60 via-white/15 to-transparent" />
                <div className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/[0.55]">
                  Automation
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-emerald-300/[0.20] bg-emerald-300/[0.08] p-4">
                <p className="text-sm font-semibold text-white">
                  Instant text sent
                </p>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  &quot;Thanks for calling. We missed you, but we can help.
                  Reply with your address and service needed and we&apos;ll
                  follow up quickly.&quot;
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/[0.45]">
                    Captured
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Name, phone, address, issue type
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/[0.45]">
                    Next step
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Follow-up queued for your team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Hero>

      <TrustBar
        title="Built for service businesses that rely on inbound calls"
        items={trustIndustries}
      />

      <HomeSectionTabs />

      <Section
        id="problem"
        eyebrow="The leak"
        title="When the phone goes unanswered, the revenue usually disappears with it."
        description="Busy owners are often on-site, in transit, or helping another customer. That is exactly when new leads are most likely to keep moving."
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {problemPoints.map((point, index) => (
            <article
              key={point.title}
              className="surface-card rounded-[1.75rem] p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-sm font-semibold text-white">
                0{index + 1}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                {point.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="workflow"
        eyebrow="The fix"
        title="Current Automations turns one missed call into a repeatable recovery workflow."
        description="Instead of relying on someone to remember every callback, the workflow keeps the lead engaged until your team can step in."
        tone="dark"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="grid gap-6 sm:grid-cols-2">
            {solutionSteps.map((item, index) => (
              <article
                key={item.step}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-white/[0.45]">
                  Step {index + 1}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                  {item.step}
                </h3>
                <p className="mt-4 text-base leading-8 text-white/[0.68]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.05] p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
              Why it matters
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              A fast first response makes your business feel more established
              before anyone on your team even picks up the phone.
            </h3>
            <p className="mt-5 text-base leading-8 text-white/[0.68]">
              Customers do not need to see your backend to trust your business.
              They just need to feel acknowledged quickly and given a clear next
              step.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Automatic acknowledgment the moment a call is missed",
                "Cleaner handoff to your team when they are available",
                "Built to fit real-world workflows, not idealized ones",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-black/10 px-4 py-4"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
                  <p className="text-sm leading-7 text-white/[0.72]">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section
        eyebrow="Try it yourself"
        title="Try It Right Now"
        description="Call our demo line and experience what your customers will feel when they reach your business after hours."
        tone="muted"
      >
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[2rem] border border-[var(--color-brand-strong)]/20 bg-white p-10 text-center shadow-[0_24px_64px_rgba(7,17,29,0.12)]">
            <p className="text-5xl font-semibold tracking-tight text-[var(--color-ink)]">
              +1 365 601 7474
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              Call the number above and experience the system firsthand.
            </p>
            <div className="mt-8">
              <a href="tel:+13656017474" className="btn-primary">
                Call the Demo Line
              </a>
            </div>
            <p className="mt-5 text-sm text-[var(--color-muted)]">
              Takes 30 seconds. No signup required.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="why-current"
        eyebrow="About"
        title="Why Current Automations"
        description="Current Automations was built to solve a practical problem for service businesses that rely on inbound calls: important opportunities disappear before anyone has time to respond."
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <article className="surface-card rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-muted)]">
              Built for real operators
            </p>
            <h3 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
              Clear systems, real business value, and a more professional first
              customer experience.
            </h3>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              Current Automations is built for service businesses that do not
              have time to babysit every missed call, but also cannot afford to
              let opportunities slip away just because the team was already in
              the middle of the work.
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
                title: "Focused on one expensive problem",
                description:
                  "The offer is clear because the problem is clear: missed calls quietly cost service businesses real jobs.",
              },
              {
                title: "Dependable by design",
                description:
                  "The customer experience feels fast, polished, and professional rather than robotic or generic.",
              },
              {
                title: "Built for real-world workflows",
                description:
                  "Start with a focused missed-call workflow, without a bloated software stack or unnecessary complexity.",
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

      <Section
        eyebrow="Industries served"
        title="Built for service businesses like:"
        description="Especially useful for businesses that rely on inbound phone calls and need to stay responsive while already on-site, in transit, or handling another customer."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceIndustries.map((industry) => (
            <article
              key={industry}
              className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-5 py-5 text-lg font-semibold tracking-tight text-[var(--color-ink)] shadow-[0_18px_45px_rgba(7,17,29,0.08)]"
            >
              {industry}
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="results"
        eyebrow="Business impact"
        title="What This Means For Your Business"
        description="The value is not just automation. It is what happens when more inbound opportunities get a fair chance to convert."
        tone="muted"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {outcomes.map((outcome) => (
            <OutcomeCard
              key={outcome.title}
              title={outcome.title}
              description={outcome.description}
              icon={outcome.icon}
            />
          ))}
        </div>
      </Section>

      <Section
        id="testimonials"
        eyebrow="The real cost"
        title="The Math on Missed Calls"
        description="The numbers behind why missed calls are the most expensive problem most service businesses are not tracking."
      >
        <div className="mx-auto max-w-3xl">
          <div className="surface-card rounded-[2rem] p-8 sm:p-10">
            <p className="text-base leading-9 text-[var(--color-copy)]">
              The average service call is worth{" "}
              <strong className="text-[var(--color-ink)]">$300 to $500</strong>.
              If your team misses just{" "}
              <strong className="text-[var(--color-ink)]">5 calls per week</strong>,
              and 62% of those callers go to a competitor, that is 3 lost jobs
              every single week.
            </p>
            <p className="mt-6 text-base leading-9 text-[var(--color-copy)]">
              At $400 per job, that adds up to{" "}
              <strong className="text-2xl text-[var(--color-ink)]">$62,400 per year</strong>{" "}
              walking straight to your competition.
            </p>
            <p className="mt-6 text-base leading-9 text-[var(--color-copy)]">
              Current Automations costs{" "}
              <strong className="text-[var(--color-ink)]">$299 per month</strong>.
              It pays for itself the first time it saves a single job.
            </p>
          </div>
        </div>
      </Section>

      <FAQSection
        items={faqItems}
        tone="muted"
        description="Clear answers to the practical questions most owners ask before deciding whether the system fits their workflow."
      />

      <CTASection
        eyebrow="Ready to see it with your own call flow?"
        title="Stop Losing Jobs From Missed Calls"
        description="Current Automations helps service businesses respond faster, capture more leads, and reduce lost opportunities."
        primaryHref="/book-a-demo#demo-request"
        primaryLabel="Request a Demo"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </>
  );
}
