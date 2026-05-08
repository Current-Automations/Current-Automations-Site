import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Section from "@/components/Section";
import type { FAQItem } from "@/data/siteContent";

const pricingFaqItems: FAQItem[] = [
  {
    question: "Is there a contract or minimum commitment?",
    answer:
      "The monthly automation plan runs month-to-month with no long-term contract required. You can cancel at any time.",
  },
  {
    question: "What exactly is included in the setup fee?",
    answer:
      "The $149 CAD one-time setup fee covers configuration of your missed-call workflow, phone number setup, voicemail flow, testing, and go-live support so everything is working correctly from day one.",
  },
  {
    question: "Do I need to pay the setup fee and the monthly fee?",
    answer:
      "Yes. The setup fee is a one-time charge to get your automation configured and launched. The monthly fee covers ongoing operation, monitoring, and support.",
  },
  {
    question: "Can the pricing change after I sign up?",
    answer:
      "Current pricing is locked in for active subscribers. Any future pricing changes would be communicated in advance and would not apply retroactively.",
  },
  {
    question: "What happens if I cancel?",
    answer:
      "You can cancel your monthly plan at any time. Your automation will remain active through the end of the billing period you have already paid for.",
  },
  {
    question: "What does the Custom plan include?",
    answer:
      "Custom plans are scoped based on your specific needs and may include advanced workflows, multi-location support, CRM integrations, or other automation beyond the core missed-call system. Pricing is discussed directly after a demo.",
  },
];

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for service businesses. Start with Speed to Lead or book a free consultation for custom AI systems.",
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
              Simple pricing for service businesses.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
              Start with our most common system, or book a consultation for custom automation needs.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
              What is always included
            </p>
            <div className="mt-6 space-y-4">
              {[
                "A free consultation to find your biggest opportunity",
                "Full build and configuration handled by us",
                "Ongoing maintenance with no technical work on your end",
                "Support when you need it",
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
        eyebrow="Pricing"
        title="Two clear paths forward."
        description="Start with the highest-impact fix first. Expand only when it makes sense."
      >
        <div className="grid gap-6 lg:grid-cols-2 items-start">
          <article className="surface-card rounded-[2rem] p-8">
            <span className="inline-block rounded-full border border-[var(--color-brand-strong)]/30 bg-[var(--color-brand)]/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
              Most common starting point
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
              Speed to Lead
            </h2>
            <p className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
              Starts at $299/month
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              per month, no long-term contract
            </p>
            <div className="my-7 h-px bg-[var(--color-line)]" />
            <ul className="space-y-3">
              {[
                "Instant text-back to every missed call",
                "Voicemail transcription and alerting",
                "Lead detail capture",
                "Follow-up automation",
                "Setup and ongoing support included",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-strong)]" />
                  <span className="text-sm leading-7 text-[var(--color-copy)]">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="https://calendly.com/currentautomations/30min"
              className="btn-primary w-full mt-8"
            >
              Book Your Free Consultation
            </Link>
          </article>

          <article className="dark-card rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-white/[0.52]">
              Need something custom?
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              Custom AI Systems
            </h2>
            <p className="mt-2 text-sm text-white/[0.62]">
              Scoped after your free consultation.
            </p>
            <div className="my-7 h-px bg-white/10" />
            <p className="text-base leading-8 text-white/[0.68]">
              For follow-up automation, intake and booking workflows, voicemail routing, admin systems, and other custom automations beyond missed calls.
            </p>
            <Link
              href="https://calendly.com/currentautomations/30min"
              className="btn-primary w-full mt-8"
            >
              Book Your Free Consultation
            </Link>
          </article>
        </div>

        <p className="text-center text-sm text-[var(--color-muted)] mt-8">
          We start with the highest-impact fix first, then expand only when it makes sense.
        </p>
      </Section>

      <Section
        eyebrow="Why teams choose this"
        title="Why service businesses choose Current Automations."
        description="You do not need a complicated rollout to fix a missed-call problem. You need something that fits how your team already works."
        tone="muted"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "No technical barrier",
              description:
                "You will never need to touch the backend. We build it, run it, and maintain it. You just see the results.",
            },
            {
              title: "Fast to launch",
              description:
                "Most clients are live within 48 hours of signing. No long onboarding. No complicated setup calls.",
            },
            {
              title: "Built to grow with you",
              description:
                "Start with one system. As your business grows, we layer in more. The relationship is ongoing, not transactional.",
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
        items={pricingFaqItems}
        tone="light"
        title="Common questions about pricing and contracts."
        description="Straightforward answers to what most owners want to know before committing."
      />

      <CTASection
        eyebrow="Not sure where to start?"
        title="Book a free consultation and we will figure it out together."
        description="No pressure. No pitch. Just a conversation about where your business is losing time and money."
        primaryHref="https://calendly.com/currentautomations/30min"
        primaryLabel="Book Your Free Consultation"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </>
  );
}
