import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import PricingCard from "@/components/PricingCard";
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
              Simple pricing. Real results. No technical knowledge needed.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
              Every engagement starts with a free consultation. We find your highest-impact opportunity first, then recommend the right system. Most service businesses start with Speed to Lead.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">
              Included in every conversation
            </p>
            <div className="mt-6 space-y-4">
              {[
                "A free consultation to find your biggest opportunity",
                "A recommended system matched to your specific business",
                "Full build and configuration handled by us",
                "Ongoing maintenance with no technical work on your end",
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
        title="Choose your starting point."
        description="These plans keep the buying decision simple while giving you room to scale into more advanced workflows later."
        align="center"
      >
        <div className="grid gap-6 lg:grid-cols-4">
          <PricingCard
            name="Speed to Lead Starter"
            price="$97 CAD"
            billing="per month"
            description="A focused entry plan to recover missed calls with fast SMS notification."
            features={["Missed call SMS notification to caller"]}
            ctaLabel="Get Started"
            ctaHref="https://buy.stripe.com/8x200j3BFf1jbC21Sj8ww08"
          />
          <PricingCard
            name="Speed to Lead Pro"
            price="$197 CAD"
            billing="per month"
            description="The most popular package for speedy missed-call recovery and lead qualification."
            features={[
              "Missed call SMS with booking link",
              "Voicemail transcription",
              "AI urgency tagging",
              "Owner alert notifications",
            ]}
            ctaLabel="Get Started"
            ctaHref="https://buy.stripe.com/7sYcN5dcf8CVgWm40r8ww07"
            featured
            badge="Most Popular"
          />
          <PricingCard
            name="Speed to Lead Premium"
            price="$297 CAD"
            billing="per month"
            description="Everything in Pro plus an AI voicemail agent that responds intelligently."
            features={["Everything in Pro plus AI voicemail agent with intelligent response"]}
            ctaLabel="Get Started"
            ctaHref="https://buy.stripe.com/9B600j4FJ9GZdKagNd8ww06"
          />
          <PricingCard
            name="Speed to Lead Elite"
            price="$497 CAD"
            billing="per month"
            description="The full live AI voice agent experience with real-time booking built in."
            features={["Everything in Premium plus live AI voice agent with real-time booking"]}
            ctaLabel="Get Started"
            ctaHref="https://buy.stripe.com/3cI9AT8VZ7yRcG6fJ98ww05"
          />
        </div>

        <p className="mt-8 text-center text-sm leading-7 text-[var(--color-muted)]">
          Already spoken with us? Ask about our pilot program.
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
        eyebrow="Need help choosing the right starting point?"
        title="Find Out Where Your Business Is Leaving Money Behind"
        description="We audit your business, find the highest-impact opportunities, and build the systems that fix them."
        primaryHref="https://calendly.com/currentautomations/30min"
        primaryLabel="Get Started For Free"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </>
  );
}
