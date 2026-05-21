import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Section from "@/components/Section";
import BuyNowButton from "@/components/BuyNowButton";
import CartSelector from "@/components/CartSelector";
import type { CartScenario } from "@/components/CartSelector";
import type { FAQItem } from "@/data/siteContent";

const CALENDLY = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

const pricingFaqItems: FAQItem[] = [
  {
    question: "Is there a contract or minimum commitment?",
    answer:
      "All monthly plans run month-to-month with no long-term contract required. You can cancel at any time.",
  },
  {
    question: "What is the $150 setup fee for?",
    answer:
      "The one-time setup fee covers full build and configuration of your automations, onboarding, and initial testing. There are no recurring setup costs.",
  },
  {
    question: "How long does it take to go live?",
    answer:
      "Most clients are live within 48 hours of signing. No long onboarding or complicated setup calls.",
  },
  {
    question: "Can I mix tiers and a la carte scenarios?",
    answer:
      "Yes. You can start with a tier and add individual scenarios on top, or go fully a la carte. We will recommend the most cost-effective combination based on your needs.",
  },
  {
    question: "What is the Retell subscription for Elite?",
    answer:
      "Elite includes T04 and T05 — AI voice automations powered by Retell AI. Retell requires its own subscription (separate from your Current Automations plan) to handle AI call minutes.",
  },
  {
    question: "Can the pricing change after I sign up?",
    answer:
      "Current pricing is locked in for active subscribers. Any future pricing changes would be communicated in advance and would not apply retroactively.",
  },
  {
    question: "What happens if I cancel?",
    answer:
      "You can cancel your monthly plan at any time. Your automations will remain active through the end of the billing period you have already paid for.",
  },
];

type Tier = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  savings: number;
  badge?: string;
  note?: string;
  scenarios: string[];
  priceId: string;
};

const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    price: 197,
    tagline: "For solo operators who just want to stop losing leads",
    savings: 30,
    scenarios: [
      "T01 Missed Call Text Back",
      "T02 Web Form Speed to Lead",
      "T06 Google Business Profile Lead Capture",
      "T12 System Anomaly Alert",
    ],
    priceId: "price_1TYDaUFbHh7D2pR6HnZkAMIH",
  },
  {
    id: "pro",
    name: "Pro",
    price: 297,
    tagline: "For growing shops actively working leads and following up",
    savings: 68,
    badge: "Most popular",
    scenarios: [
      "Everything in Starter, plus:",
      "T03 Multi-Touch Follow Up Sequence",
      "T07 Quote Follow Up Sequence",
      "T10 Post Job Review Request",
    ],
    priceId: "price_1TYDaeFbHh7D2pR6fS50MB9m",
  },
  {
    id: "growth",
    name: "Growth",
    price: 397,
    tagline: "For established contractors who want the full revenue recovery system",
    savings: 107,
    scenarios: [
      "Everything in Pro, plus:",
      "T09 No Show and Cancellation Recovery",
      "T08 Database Reactivation Campaign",
      "T11 Weekly Client ROI Report",
    ],
    priceId: "price_1TYDanFbHh7D2pR63S10aawu",
  },
  {
    id: "elite",
    name: "Elite",
    price: 597,
    tagline: "For contractors who want a fully autonomous front office with AI voice",
    savings: 149,
    note: "Retell subscription required separately",
    scenarios: [
      "Everything in Growth, plus:",
      "T04 Retell AI Outbound Call",
      "T05 Inbound AI Call Handling",
    ],
    priceId: "price_1TYDaxFbHh7D2pR6UGz2bypy",
  },
];

type ScenarioGroup = {
  label: string;
  description: string;
  scenarios: CartScenario[];
};

const scenarioGroups: ScenarioGroup[] = [
  {
    label: "Core / Simple",
    description: "Webhook in, SMS out, log to sheet",
    scenarios: [
      { code: "T01", name: "Missed Call Text Back", price: 49, priceId: "price_1TYDb8FbHh7D2pR6daDOEzXl" },
      { code: "T02", name: "Web Form Speed to Lead", price: 49, priceId: "price_1TYDbHFbHh7D2pR6ygqSwCnP" },
      { code: "T06", name: "Google Business Profile Lead Capture", price: 49, priceId: "price_1TYDbuFbHh7D2pR6ZlkKBdsG" },
    ],
  },
  {
    label: "Multi-Step Sequences",
    description: "Sleep modules, multiple touches",
    scenarios: [
      { code: "T03", name: "Multi-Touch Follow Up Sequence", price: 79, priceId: "price_1TYDbQFbHh7D2pR6YQbn6Hce" },
      { code: "T07", name: "Quote Follow Up Sequence", price: 79, priceId: "price_1TYDc3FbHh7D2pR6CPMT08gB" },
      { code: "T09", name: "No Show and Cancellation Recovery", price: 79, priceId: "price_1TYDcNFbHh7D2pR6nuxSwwMz" },
      { code: "T10", name: "Post Job Review Request", price: 59, priceId: "price_1TYDcYFbHh7D2pR64ZGtcZk5" },
    ],
  },
  {
    label: "Campaign Style",
    description: "Reads from sheet, batch send",
    scenarios: [
      { code: "T08", name: "Database Reactivation Campaign", price: 89, priceId: "price_1TYDcDFbHh7D2pR6bqd0TlCJ" },
    ],
  },
  {
    label: "AI Powered",
    description: "OpenAI calls, JSON parsing, reporting",
    scenarios: [
      { code: "T11", name: "Weekly Client ROI Report", price: 99, priceId: "price_1TYDchFbHh7D2pR6JVe7Nyz8" },
      { code: "T12", name: "System Anomaly Alert", price: 79, priceId: "price_1TYDcsFbHh7D2pR6r0F4Bsnx" },
    ],
  },
  {
    label: "Premium AI Voice",
    description: "Retell AI — requires separate Retell subscription",
    scenarios: [
      { code: "T04", name: "Retell AI Outbound Call", price: 149, priceId: "price_1TYDbaFbHh7D2pR6Kt85mIAE", requiresRetell: true },
      { code: "T05", name: "Inbound AI Call Handling", price: 149, priceId: "price_1TYDbkFbHh7D2pR6N7FPebE4", requiresRetell: true },
    ],
  },
];

const allScenarios: CartScenario[] = scenarioGroups
  .flatMap((g) => g.scenarios)
  .sort((a, b) => a.code.localeCompare(b.code));

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, tiered pricing for service business automation. Choose a bundle or build your own with individual scenarios starting at $49/month.",
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(140deg,#07111d_0%,#0c182a_60%,#12324a_100%)] pb-20 pt-24 sm:pb-24 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_45%)]" />
        <div className="container-shell">
          <p className="pill-label bg-surface-dark-2 text-white/70">
            Straightforward pricing
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Transparent pricing.{" "}
            <br className="hidden sm:block" />
            Pay only for what you use.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-on-dark sm:text-lg">
            Choose a bundled tier to save up to $149/month, or build your own
            stack with individual automation scenarios starting at $49/month.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.08] px-5 py-3">
            <span className="h-2 w-2 rounded-full bg-[var(--color-brand)]" />
            <span className="text-sm text-white/80">
              One-time setup fee:{" "}
              <strong className="text-white">$150 CAD</strong> — full build,
              configuration, and onboarding included
            </span>
          </div>
          <p className="mt-4 text-sm text-on-dark-muted">
            Most plans pay for themselves with one or two recovered jobs a month.
          </p>
        </div>
      </section>

      <Section
        eyebrow="Bundled Tiers"
        title="Start with a bundle. Save every month."
        description="Each tier stacks on the last. The more automations you run, the more you save versus a la carte pricing."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
          {tiers.map((tier) => {
            const featured = !!tier.badge;
            return (
              <div
                key={tier.id}
                className={`flex flex-col ${featured ? "xl:-mt-6 xl:mb-0" : ""}`}
              >
                <div className={`mb-3 flex items-center ${featured ? "h-8" : "h-7"}`}>
                  {tier.badge && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-ink)] shadow-[0_10px_28px_rgba(93,214,203,0.45)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink)]" />
                      {tier.badge}
                    </span>
                  )}
                </div>
                <article
                  className={
                    featured
                      ? "flex flex-1 flex-col rounded-card-lg dark-card p-8 ring-1 ring-[var(--color-brand)]/30 shadow-[0_36px_90px_rgba(93,214,203,0.22)] xl:p-9"
                      : "flex flex-1 flex-col rounded-card-lg surface-card p-7"
                  }
                >
                  <h2
                    className={`font-semibold tracking-tight ${
                      featured ? "text-2xl text-white" : "text-xl text-[var(--color-ink)]"
                    }`}
                  >
                    {tier.name}
                  </h2>
                  <p
                    className={`mt-1.5 text-xs leading-5 ${
                      featured ? "text-on-dark-muted" : "text-[var(--color-muted)]"
                    }`}
                  >
                    {tier.tagline}
                  </p>
                  <p
                    className={`mt-5 font-semibold tracking-tight ${
                      featured ? "text-4xl text-white" : "text-3xl text-[var(--color-ink)]"
                    }`}
                  >
                    ${tier.price}
                    <span
                      className={`text-base font-normal ${
                        featured ? "text-on-dark-muted" : "text-[var(--color-muted)]"
                      }`}
                    >
                      /mo
                    </span>
                  </p>
                  <div
                    className={`my-5 h-px ${
                      featured ? "bg-line-dark" : "bg-[var(--color-line)]"
                    }`}
                  />
                  <ul className="flex-1 space-y-2.5">
                    {tier.scenarios.map((s) => (
                      <li key={s} className="flex items-start gap-2.5">
                        <span
                          className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full ${
                            featured ? "bg-[var(--color-brand)]" : "bg-[var(--color-brand-strong)]"
                          }`}
                        />
                        <span
                          className={`leading-6 ${
                            featured
                              ? "text-sm text-on-dark"
                              : "text-xs text-[var(--color-muted)]"
                          }`}
                        >
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {tier.note && (
                    <p
                      className={`mt-4 text-xs italic ${
                        featured ? "text-on-dark-faint" : "text-[var(--color-muted)]"
                      }`}
                    >
                      {tier.note}
                    </p>
                  )}
                  <div className="mt-6 flex flex-col gap-2">
                    <BuyNowButton priceId={tier.priceId} />
                    <Link
                      href={CALENDLY}
                      className={
                        featured
                          ? "inline-flex w-full items-center justify-center rounded-full border border-line-dark bg-surface-dark-2 px-5 py-3.5 text-sm font-semibold text-on-dark-strong transition-colors hover:bg-surface-dark-3"
                          : "btn-secondary w-full text-center text-sm"
                      }
                    >
                      Book a Call Instead
                    </Link>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        eyebrow="A La Carte"
        title="Build your own stack."
        description="Pick only the automations your business actually needs. Each scenario runs independently and can be added to any tier."
        tone="muted"
      >
        <CartSelector scenarios={allScenarios} />
      </Section>

      <Section
        eyebrow="Why teams choose this"
        title="Why service businesses choose Current Automations."
        description="You do not need a complicated rollout to fix a missed-call problem. You need something that fits how your team already works."
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
              className="rounded-card-lg border border-[var(--color-line)] bg-white p-7 shadow-[0_18px_45px_rgba(7,17,29,0.08)]"
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

      <FAQSection
        items={pricingFaqItems}
        tone="light"
        title="Common questions about pricing and contracts."
        description="Straightforward answers to what most owners want to know before committing."
      />

      <CTASection
        eyebrow="Not sure where to start?"
        title="Book a free discovery call and we will figure it out together."
        description="No pressure. No pitch. Just a conversation about where your business is losing time and money."
        primaryHref={CALENDLY}
        primaryLabel="Book Free Audit"
        secondaryHref="/how-it-works"
        secondaryLabel="See How It Works"
      />
    </>
  );
}
