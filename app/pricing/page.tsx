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
import {
  AI_VOICE_OVERAGE_RATE,
  FAILOVER_TIMEOUT_SECONDS,
  RECEPTIONIST_MODE_PRICE,
  VOICE_CONFIG_FEE,
  VOICE_CONFIG_FEE_RECEPTIONIST,
  VOICE_MINUTES_RECEPTIONIST,
} from "@/data/pricing";

const BOOK_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb";

const guaranteeTerms = [
  {
    label: "The promise",
    heading: "Your whole first month back.",
    body: "Thirty days in, if nobody ever texted you back, the system did not do its job and you should not be paying for it. The full monthly fee is refunded. The setup fee stays, because that build is finished and it is yours either way.",
  },
  {
    label: "The proof",
    heading: "You can check it yourself.",
    body: "Every message we send and every reply that comes back lands in a shared lead sheet, timestamped, that you have access to from day one. Neither of us has to take the other's word for how the month went.",
  },
  {
    label: "The boundary",
    heading: "Replies, not booked jobs.",
    body: "We keep the lead alive and warm so it is still there when you call back. Closing it is your job, and we are not going to pretend otherwise by promising you work we do not control.",
  },
];

const guaranteeExclusions = [
  "AI voice of any kind, including Elite and Receptionist Mode. Voice is priced and configured separately.",
  "Opt-outs. Somebody replying STOP is not somebody getting back to you, and neither is a number you flag as wrong or spam.",
  "Months where the service was paused, disabled, or pointed at a line that takes no calls.",
];

const pricingFaqItems: FAQItem[] = [
  {
    question: "What is the first month guarantee?",
    answer:
      "If you sign up for Starter and 30 days pass without a single person getting back to you, we refund your first monthly subscription fee in full. Opt-outs like STOP don't count as someone getting back to you, and neither does a number you flag as wrong or spam. Everything sent and everything received sits in a shared lead sheet you can see from day one, so a claim is settled by reading it rather than by either of us remembering. The setup fee is not refunded, since that build is done and yours to keep, and AI voice is not covered. Full wording is clause 2.4.1 of the terms.",
  },
  {
    question: "Is there a contract or minimum commitment?",
    answer:
      "All monthly plans run month-to-month with no long-term contract required. You can cancel at any time.",
  },
  {
    question: "What is the setup fee for?",
    answer:
      "A one-time $150 CAD fee covers full build and configuration of your automations, onboarding, and initial testing. It is charged once per account, so adding scenarios later does not trigger it again. Plans that include AI voice (Retell AI Outbound Call or Inbound AI Call Handling, in Elite or a la carte) add a separate one-time $200 CAD voice configuration fee, because the call flow, knowledge base, and live testing are built for you rather than templated. If you add AI voice later, you pay only the $200. Receptionist Mode carries a $450 configuration fee instead, and existing voice clients upgrading to it pay only the $250 difference. There are no recurring setup costs either way.",
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
    description: "A real voice picks up what your team cannot get to, books it, and logs the call",
    scenarios: [
      { code: "T04", name: "Retell AI Outbound Call", price: 149, priceId: "price_1TYDbaFbHh7D2pR6Kt85mIAE" },
      { code: "T05", name: "Inbound AI Call Handling", price: 149, priceId: "price_1TYDbkFbHh7D2pR6N7FPebE4" },
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
            <div className={`${jobsheet.ticket} h-full !border-[var(--color-brand-strong)] p-7 pl-10 sm:p-8 sm:pl-11 relative`}>
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
        id="guarantee"
        code="CA-P4"
        label="First month guarantee"
        title="If it doesn't work in your first month, you don't pay for the month."
        description="Every Starter client gets this. Run it for 30 days, and if nobody ever gets back to you, we refund the month in full and keep the system running while we work out why. We would rather carry that risk ourselves than ask you to take our word for it."
        tone="ink"
      >
        <div className="grid gap-px overflow-hidden rounded border-2 border-dashed border-white/20 sm:grid-cols-3">
          {guaranteeTerms.map((item) => (
            <div key={item.heading} className="bg-white/[0.04] p-6 sm:p-7">
              <span className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]`}>
                {item.label}
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#f3ede1]">{item.heading}</h3>
              <p className="mt-3 text-sm leading-7 text-[rgba(243,237,225,0.72)]">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded border-2 border-dashed border-white/20 bg-white/[0.04] p-6 sm:p-8">
          <span className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(243,237,225,0.5)]`}>
            What it does not cover
          </span>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {guaranteeExclusions.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[rgba(243,237,225,0.72)]">
                <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(243,237,225,0.35)]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-7 text-[rgba(243,237,225,0.72)]">
            Written down, not just said out loud. Exactly what counts, exactly what does not, and how a
            claim gets made are all set out in clause 2.4.1 of our{" "}
            <a
              href="/terms#clause-02"
              className="underline decoration-[rgba(243,237,225,0.4)] underline-offset-4 hover:text-[#f3ede1]"
            >
              terms of service
            </a>
            . Read it before you sign anything, not after.
          </p>
        </div>
      </JobSheetSection>

      <JobSheetSection
        id="a-la-carte"
        code="CA-P5"
        label="A la carte"
        title="Just need one fix? Pick a single workflow."
        description="Each scenario runs independently and can be added to any tier. Start with the one problem that hurts most; bundles save money once you are running three or more."
        tone="carbon"
      >
        <CartSelector scenarios={allScenarios} />

        <div className="mt-8 rounded border-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.02)] p-6 sm:p-8">
          <span className={`${jobsheet.mono} text-xs uppercase tracking-wider text-[#a8452f]`}>
            Upgrade, available on request
          </span>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#181510]">
            Receptionist Mode, +${RECEPTIONIST_MODE_PRICE}/mo
          </h3>
          <p className="mt-4 text-base leading-8 text-[#58524a]">
            The AI voice scenarios above are built as overflow. Someone on your team is still first
            to the phone, and the AI catches what they cannot get to. Most owners want it that way
            to start.
          </p>
          <p className="mt-4 text-base leading-8 text-[#58524a]">
            Once you trust it enough to let it answer everything, Receptionist Mode raises your
            pooled allowance to {VOICE_MINUTES_RECEPTIONIST.toLocaleString()} minutes a month, and
            we rebuild the agent to handle a real front desk rather than a backstop. It includes
            System Anomaly Alert monitoring at no extra charge, plus a hard failover: if the AI does
            not pick up within {FAILOVER_TIMEOUT_SECONDS} seconds, the call forwards to a real
            number you nominate. Overage past the pool stays at $
            {AI_VOICE_OVERAGE_RATE.toFixed(2)} CAD/min.
          </p>
          <p className="mt-4 text-base leading-8 text-[#58524a]">
            One-time configuration is ${VOICE_CONFIG_FEE_RECEPTIONIST} instead of $
            {VOICE_CONFIG_FEE}, and if you already run AI voice with us you pay only the $
            {VOICE_CONFIG_FEE_RECEPTIONIST - VOICE_CONFIG_FEE} difference. This upgrade is not
            offered at first checkout, because handing over the phone is a decision worth making
            after you have watched the thing work.
          </p>
          <div className="mt-6">
            <PunchButton href={BOOK_URL} label="Book a Call" variant="ghost" />
          </div>
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="CA-P6"
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

      <JobSheetSection
        code="CA-P7"
        label="Selling to other businesses?"
        title="Lead generation is priced separately."
        description="Everything above is built for trades and service businesses. Our lead generation pipelines serve a different audience: corporate, construction management, and B2B service companies. Those engagements are scoped to your ICP and volume, with a fixed quote before anything is built."
        tone="carbon"
      >
        <div className="flex flex-col items-start gap-4 rounded border-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.02)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-lg font-semibold tracking-tight text-[#181510]">
            Verified decision-maker lists, built from your exact ICP.
          </p>
          <PunchButton href="/lead-generation" label="See Lead Generation" variant="ghost" className="shrink-0" />
        </div>
      </JobSheetSection>

      <JobSheetFAQ
        items={pricingFaqItems}
        code="CA-P8"
        label="Frequently Asked Questions"
        title="Common questions about pricing and contracts."
        description="Straightforward answers to what most owners want to know before committing."
        tone="paper"
      />

      <JobSheetCTA
        code="CA-P9"
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
