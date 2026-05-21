import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: {
    absolute: "About | Current Automations",
  },
  description:
    "Current Automations is an AI systems company for trades and service businesses across Ontario. We start with a free consultation, find your highest-impact opportunity, and build the systems that recover it.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line-dark bg-[linear-gradient(145deg,#07111d_0%,#0d1b30_58%,#16334e_100%)] pb-20 pt-24 sm:pb-24 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_42%)]" />
        <div className="container-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="pill-label bg-surface-dark-2 text-white/70">
              Who We Are
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              We find where your business is losing money. Then we fix it.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-on-dark sm:text-lg">
              Current Automations is an AI systems company for trades and service businesses across Ontario. We start with a free consultation, find your highest-impact opportunity, and build the systems that recover it.
            </p>
          </div>

          <div className="rounded-card-lg border border-line-dark bg-surface-dark-2 p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-on-dark-muted">
              Why this exists
            </p>
            <div className="mt-6 space-y-4">
              {[
                "Built for business owners who are great at their craft and do not have time to figure out technology.",
                "Designed to find where time and money are leaking, then fix it with AI.",
                "Focused on practical systems that run quietly and reliably without adding complexity.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-card-sm border border-line-dark bg-black/10 px-4 py-4 text-sm leading-7 text-on-dark"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Where the money leaks"
        title="Most service businesses are losing revenue in the same three places."
        tone="muted"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Missed calls",
              description:
                "Most callers will not leave a voicemail or wait for a callback. If no one responds within minutes, they move on to the next business on the list.",
            },
            {
              title: "Slow follow-up",
              description:
                "The longer a lead waits for a response, the colder it gets. Manual follow-up cannot keep pace with how fast buying intent fades.",
            },
            {
              title: "Manual admin",
              description:
                "Quotes, scheduling, reminders, and inbox cleanup eat hours every week that should not require the owner every single time.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="surface-card rounded-card-lg p-7"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How we fix it"
        title="We audit your business, find the highest-impact opportunity, then build the system that solves it."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <article className="surface-card rounded-card-lg p-8">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Every engagement starts with a free audit. We ask about your business, find where the biggest opportunities are, and recommend one system that would have the most immediate impact.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              Then we build it, configure it, and maintain it — so you never have to think about the technology. You just see the results.
            </p>
          </article>

          <aside className="dark-card rounded-card-lg p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-on-dark-muted">
              What we handle
            </p>
            <div className="mt-6 space-y-4">
              {[
                "A free audit to find your highest-impact opportunity",
                "Full build and configuration — no technical work on your end",
                "Ongoing maintenance so the system keeps running reliably",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-card-md border border-line-dark bg-surface-dark-2 px-4 py-4"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
                  <p className="text-sm leading-7 text-on-dark">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section
        title="About the Founder"
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-stretch">
          <div className="surface-card flex flex-col items-center justify-center rounded-card-lg p-8 text-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(79,208,173,0.18),rgba(20,150,118,0.28))] text-[var(--color-ink)] shadow-[0_18px_45px_rgba(7,17,29,0.12)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path
                  d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 7.5a6 6 0 0 1 12 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="mt-5 text-lg font-semibold tracking-tight text-[var(--color-ink)]">
              Jarrett Goodwin
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
              B.Eng. Chemical Engineering &amp; Computer Technology, uOttawa
            </p>
          </div>

          <article className="surface-card rounded-card-lg p-8">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              I started Current Automations after seeing how often good trades and service businesses were leaking revenue to unanswered phones, forgotten follow&#8209;ups, and manual admin work. With a background in industrial operations and applied AI, I build practical systems that answer every lead, follow up reliably, and keep owners out of the inbox.
            </p>
            <p className="mt-6 text-base leading-8 text-[var(--color-muted)]">
              My approach is hands&#8209;on: we map your real&#8209;world workflow, pick the highest&#8209;impact problem, then build and maintain the automation around it. No buzzwords, no clunky dashboards&#8202;&#8212;&#8202;just lean systems that pay for themselves in saved time and recovered jobs.
            </p>
          </article>
        </div>
      </Section>

      <Section
        eyebrow="The relationship"
        title="I am not here to sell you a tool and disappear."
      >
        <div className="surface-card rounded-card-lg p-8 space-y-6">
          <p className="text-base leading-8 text-[var(--color-muted)]">
            Most software companies hand you a login and leave you to figure it out. I work differently.
          </p>
          <p className="text-base leading-8 text-[var(--color-muted)]">
            Before I build anything, I spend time understanding how your business actually runs day to day: the calls, the estimates, and the spots where work falls through the cracks. From there, we design a system that fits into your existing process instead of forcing you into a generic software workflow.
          </p>
          <p className="text-base leading-8 text-[var(--color-muted)]">
            Every system I build is maintained on my side. If something needs adjusting, you reach out and it gets handled. As your business changes, I review performance with you, spot new bottlenecks, and either refine what is in place or build the next piece. You get one point of contact who knows your setup inside and out.
          </p>
          <p className="text-base leading-8 text-[var(--color-muted)]">
            The relationship is ongoing, not a one-time transaction.
          </p>
        </div>
      </Section>

      <CTASection
        eyebrow="Ready to find your revenue leaks?"
        title="Find Out Where Your Business Is Leaving Money Behind"
        description="We audit your business, find the highest-impact opportunities, and build the systems that fix them."
        primaryHref="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb"
        primaryLabel="Book Free Audit"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </>
  );
}
