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
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(145deg,#07111d_0%,#0d1b30_58%,#16334e_100%)] pb-20 pt-24 sm:pb-24 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_42%)]" />
        <div className="container-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="pill-label bg-white/[0.08] text-white/70">
              Who We Are
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              We find where your business is losing money. Then we fix it.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
              Current Automations is an AI systems company for trades and service businesses across Ontario. We start with a free consultation, find your highest-impact opportunity, and build the systems that recover it.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
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
                  className="rounded-[1.3rem] border border-white/[0.08] bg-black/10 px-4 py-4 text-sm leading-7 text-white/[0.72]"
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
              className="surface-card rounded-[1.75rem] p-7"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                {item.title}
              </h2>
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
          <article className="surface-card rounded-[2rem] p-8">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Every engagement starts with a free Revenue Leak Audit. We ask about your business, find where the biggest opportunities are, and recommend one system that would have the most immediate impact.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              Then we build it, configure it, and maintain it — so you never have to think about the technology. You just see the results.
            </p>
          </article>

          <aside className="dark-card rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-white/[0.45]">
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
                  className="flex items-start gap-3 rounded-[1.4rem] border border-white/[0.08] bg-white/[0.06] px-4 py-4"
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
        eyebrow="Founder"
        title="Jarrett Goodwin"
        description="Current Automations was shaped by a practical technical background and a real business problem."
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <div className="surface-card flex flex-col items-center rounded-[2rem] p-8 text-center">
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

          <article className="surface-card rounded-[2rem] p-8">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Current Automations was founded by Jarrett Goodwin, an engineer and builder with a background in industrial operations and applied AI systems. After seeing how consistently trades and service businesses lose revenue to missed calls, slow follow-ups, and manual admin, he built Current Automations to fix it. The approach is hands-on and practical: find the highest-value problem first, build the system that solves it, and maintain everything so the owner never has to think about it. No jargon. No bloated software. Just systems that work.
            </p>
          </article>
        </div>
      </Section>

      <Section
        eyebrow="The relationship"
        title="We are not here to sell you a tool and disappear."
      >
        <div className="surface-card max-w-4xl rounded-[2rem] p-8">
          <p className="text-base leading-8 text-[var(--color-muted)]">
            Most software companies hand you a login and leave you to figure it out. We work differently. Every system we build is maintained on our end. If something needs adjusting, you contact us and it gets handled. As your business grows, we identify the next opportunity and build the next system. The relationship is ongoing, not transactional.
          </p>
        </div>
      </Section>

      <CTASection
        eyebrow="Ready to find your revenue leaks?"
        title="Find Out Where Your Business Is Leaving Money Behind"
        description="We audit your business, find the highest-impact opportunities, and build the systems that fix them."
        primaryHref="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb"
        primaryLabel="Book a Free Discovery Call"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </>
  );
}
