import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BuyNowButton from "@/components/BuyNowButton";
import CartSelector from "@/components/CartSelector";
import type { CartScenario } from "@/components/CartSelector";
import type { FAQItem } from "@/data/siteContent";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetCTA from "@/components/jobsheet/JobSheetCTA";
import JobSheetFAQ from "@/components/jobsheet/JobSheetFAQ";
import PricingTicket from "@/components/jobsheet/PricingTicket";
import PunchButton from "@/components/jobsheet/PunchButton";
import Stamp from "@/components/jobsheet/Stamp";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

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
      "Elite includes T04 and T05, AI voice automations powered by Retell AI. Retell requires its own subscription (separate from your Current Automations plan) to handle AI call minutes.",
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
      "T13 Invoice Payment Follow Up",
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
      { code: "T13", name: "Invoice Payment Follow Up", price: 79, priceId: "price_1TwsOOFbHh7D2pR6sazpj7db" },
    ],
  },
  {
    label: "Premium AI Voice",
    description: "Retell AI, requires separate Retell subscription",
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
    <div className={jobsheetFonts}>
      {/* Invoice masthead hero */}
      <section className={`${jobsheet.root} ${jobsheet.paperTexture} relative pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pt-20`}>
        <div className="container-shell relative">
          <div className={`${jobsheet.ticket} p-0 overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[rgba(28,36,48,0.24)] px-6 py-4 sm:px-9">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                CURRENT AUTOMATIONS
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                INVOICE <span className="font-semibold text-[#201c16]">FORM CA-PRICING</span>
              </span>
            </div>

            <div className="px-6 py-10 sm:px-9 sm:py-12 lg:py-14">
              <Reveal variant="fade">
                <p className={`${jobsheet.mono} text-xs uppercase tracking-[0.22em] text-[#58524a]`}>
                  Straightforward pricing
                </p>
              </Reveal>
              <h1 className={`${jobsheet.display} mt-5 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] text-[#181510]`}>
                Transparent pricing.
                <br />
                Pay only for what you use.
              </h1>
              <Reveal variant="fade" delay={200}>
                <p className="mt-7 max-w-2xl text-base leading-8 text-[#3a352c] sm:text-lg">
                  Choose a bundled tier to save up to $149/month, or build your
                  own stack with individual automation scenarios starting at
                  $49/month.
                </p>
                <div className="mt-7 inline-block">
                  <Stamp label="$150 CAD setup, one time" tone="rust" />
                </div>
                <p className="mt-4 text-sm text-[#58524a]">
                  Full build, configuration, and onboarding included. Most
                  plans pay for themselves with one or two recovered jobs a
                  month.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <JobSheetSection
        code="CA-P2"
        label="Done for you"
        title="Cheap tools still leave you doing the work."
        description="Self-serve automation tools cost less on paper. Then you spend your evenings configuring them, connecting them to your phone system, and figuring out why the texts stopped sending. We install it, tune it, and hand you a working system. You don't touch the tech."
        tone="carbon"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className={`${jobsheet.ticket} h-full p-7 pl-10 sm:p-8 sm:pl-11 relative`}>
              <span className={jobsheet.ticketHole} aria-hidden="true" />
              <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[#58524a]`}>
                Self-serve tools
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "You pick the software and learn it yourself",
                  "You wire it to your phone line and calendar",
                  "You write the messages and test the flows",
                  "When it breaks, you troubleshoot it",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-8 text-[#58524a]">
                    <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#a39a86]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div className={`${jobsheet.ticket} h-full !bg-[rgba(20,150,118,0.06)] !border-[var(--color-brand-strong)] p-7 pl-10 sm:p-8 sm:pl-11 relative`}>
              <span className={jobsheet.ticketHole} aria-hidden="true" />
              <p className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-strong)]`}>
                Current Automations
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "We map your actual call flow first",
                  "We install and connect everything for you",
                  "We tune the messages until they sound like you",
                  "We monitor and maintain it. You see results.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-8 text-[#3a352c]">
                    <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-strong)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </JobSheetSection>

      <JobSheetSection
        id="tiers"
        code="CA-P3"
        label="Bundled tiers"
        title="Start with a bundle. Save every month."
        description="Bundles are the cheapest way to run several systems at once: each tier stacks on the last and saves up to $149/month versus a la carte. If you only need one fix, a single workflow below starts at $49/month."
        tone="paper"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
          {tiers.map((tier, i) => (
            <Reveal
              key={tier.id}
              delay={i * 70}
              className={`flex flex-col ${tier.badge ? "xl:-mt-4" : ""}`}
            >
              <PricingTicket
                name={tier.name}
                price={tier.price}
                tagline={tier.tagline}
                scenarios={tier.scenarios}
                note={tier.note}
                featured={!!tier.badge}
              >
                <BuyNowButton priceId={tier.priceId} />
                <PunchButton href={BOOK_URL} label="Book a Call Instead" variant="ghost" />
              </PricingTicket>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        id="a-la-carte"
        code="CA-P4"
        label="A la carte"
        title="Just need one fix? Pick a single workflow."
        description="Each scenario runs independently and can be added to any tier. Start with the one problem that hurts most; bundles save money once you are running three or more."
        tone="carbon"
      >
        <CartSelector scenarios={allScenarios} />
      </JobSheetSection>

      <JobSheetSection
        code="CA-P5"
        label="Why teams choose this"
        title="Why service businesses choose Current Automations."
        description="You do not need a complicated rollout to fix a missed-call problem. You need something that fits how your team already works."
        tone="paper"
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
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className={`${jobsheet.ticket} h-full p-7 pl-10 relative`}>
                <span className={jobsheet.ticketHole} aria-hidden="true" />
                <h3 className="text-2xl font-semibold tracking-tight text-[#181510]">{item.title}</h3>
                <p className="mt-4 text-base leading-8 text-[#58524a]">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetFAQ
        items={pricingFaqItems}
        code="CA-P6"
        label="Frequently Asked Questions"
        title="Common questions about pricing and contracts."
        description="Straightforward answers to what most owners want to know before committing."
        tone="paper"
      />

      <JobSheetCTA
        code="CA-P7"
        label="Not sure where to start?"
        title="Book a free discovery call and we will figure it out together."
        description="No pressure. No pitch. Just a conversation about where your business is losing time and money."
        primaryHref={BOOK_URL}
        primaryLabel="Book Free Audit"
        secondaryHref="/how-it-works"
        secondaryLabel="See How It Works"
      />
    </div>
  );
}
