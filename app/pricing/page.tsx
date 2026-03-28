import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import PricingCard from "@/components/PricingCard";
import Section from "@/components/Section";
import { faqItems } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore Current Automations pricing for launch-stage missed-call workflows built for service businesses.",
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(140deg,#07111d_0%,#0c182a_60%,#12324a_100%)] pb-20 pt-24 sm:pb-24 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_45%)]" />
        <div className="container-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="pill-label bg-white/[0.08] text-white/70">
              Straightforward pricing
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Premium automation support without a bloated pricing page.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
              Start with a focused missed-call workflow, get launched cleanly,
              and expand into more advanced automations only when your business
              is ready.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
              Included in every conversation
            </p>
            <div className="mt-6 space-y-4">
              {[
                "Clear implementation guidance",
                "A workflow matched to your business model",
                "No bloated software stack required",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-white/[0.08] bg-black/10 px-4 py-4 text-sm text-white/[0.72]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Plans"
        title="Choose the right starting point for your team."
        description="These plans are designed to keep the buying decision simple while giving you room to scale into more advanced workflows later."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <PricingCard
            name="Setup & Onboarding"
            price="$149 CAD"
            billing="one-time"
            description="A clean launch so your automation is configured properly from day one."
            features={[
              "Setup support",
              "Configuration",
              "Launch assistance",
            ]}
            ctaLabel="Request a Demo"
            ctaHref="/book-a-demo#demo-request"
          />
          <PricingCard
            name="Missed Call & Voicemail Automation"
            price="$299 CAD"
            billing="per month"
            description="The core missed-call recovery system built to keep new leads from going cold."
            features={[
              "Instant missed-call text-back",
              "Voicemail transcription alerts",
              "Lead capture + follow-up",
            ]}
            ctaLabel="Request a Demo"
            ctaHref="/book-a-demo#demo-request"
            featured
            badge="Most Popular"
          />
          <PricingCard
            name="Custom"
            price="Custom pricing"
            billing="tailored scope"
            description="For businesses that need deeper automation, more locations, or connected systems."
            features={[
              "Advanced workflows",
              "Multi-location support",
              "CRM integrations",
            ]}
            ctaLabel="Request a Demo"
            ctaHref="/book-a-demo#demo-request"
          />
        </div>

        <div className="mt-8 rounded-[1.7rem] border border-[var(--color-line)] bg-white px-6 py-5 text-sm leading-7 text-[var(--color-muted)] shadow-[0_18px_45px_rgba(7,17,29,0.06)]">
          Every conversation starts with a quick fit check so you can see what
          makes sense for your workflow before committing to anything more
          involved.
        </div>
      </Section>

      <Section
        eyebrow="Why teams choose this"
        title="Built to be credible, simple, and easy to grow."
        description="You do not need a complicated rollout to fix a missed-call problem. You need something that fits how your team already works."
        tone="muted"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Clear value",
              description:
                "The offer is focused on a specific revenue problem service businesses already understand.",
            },
            {
              title: "Fast to launch",
              description:
                "Setup and onboarding are designed to move you from idea to live workflow without unnecessary drag.",
            },
            {
              title: "Easy to extend",
              description:
                "As you grow, custom automations and integrations can be layered in without rethinking the whole system.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-7 shadow-[0_18px_45px_rgba(7,17,29,0.08)]"
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

      <FAQSection
        items={faqItems}
        tone="light"
        description="These are the practical questions most owners ask before deciding whether the workflow is a fit."
      />

      <CTASection
        eyebrow="Need help choosing the right starting point?"
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
