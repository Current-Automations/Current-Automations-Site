# Stripe Checkout Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add self-serve Stripe Checkout to currentautomations.ca so visitors can purchase monthly automation plans directly from the pricing page.

**Architecture:** A single POST API route creates Stripe Checkout sessions server-side. Two focused Client Components (`BuyNowButton`, `CartSelector`) are embedded in the otherwise Server-Component pricing page. A static success page confirms the purchase.

**Tech Stack:** Next.js 16.2.1 App Router, TypeScript, Stripe SDK v21 (already installed), Tailwind CSS v4, existing design tokens.

---

## Pre-flight: Environment

Before starting Task 1, ensure `.env.local` exists at the project root with:

```
STRIPE_SECRET_KEY=sk_live_...
```

This file is gitignored. The key must be present or the API route will throw at startup.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `app/api/checkout/route.ts` | Create | POST handler: validates input, creates Stripe Checkout session |
| `components/BuyNowButton.tsx` | Create | Client Component: single-price checkout button with loading/error state |
| `components/CartSelector.tsx` | Create | Client Component: multi-select cart, running total, batch checkout |
| `app/success/page.tsx` | Create | Static purchase confirmation page |
| `app/pricing/page.tsx` | Modify | Wire in BuyNowButton + CartSelector, keep all existing layout |

---

## Lint command (PowerShell, use after every task)

```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; & "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run lint
```

**Expected:** Exit 0 with exactly 8 pre-existing errors: 2 from `app/privacy/page.tsx` and 6 from `app/terms/page.tsx`. Zero errors from any file touched in this plan.

---

## Task 1: API Route

**Files:**
- Create: `app/api/checkout/route.ts`

- [ ] **Step 1: Create the route file with complete implementation**

```typescript
// app/api/checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const SETUP_FEE_PRICE_ID = "price_1TYDaJFbHh7D2pR6LF1A1ovY";
const BASE_URL = "https://currentautomations.ca";
// TODO: To support staging environments, replace BASE_URL with process.env.NEXT_PUBLIC_SITE_URL

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { priceIds, hasSetupFee } = body as {
      priceIds: unknown;
      hasSetupFee: boolean;
    };

    if (!Array.isArray(priceIds) || priceIds.length === 0) {
      return NextResponse.json(
        { error: "priceIds must be a non-empty array" },
        { status: 400 }
      );
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      (priceIds as string[]).map((priceId) => ({ price: priceId, quantity: 1 }));

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      line_items: lineItems,
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/pricing`,
    };

    if (hasSetupFee) {
      // TODO: Future enhancement - look up customer by email in Stripe before creating the
      // session; if they have an existing subscription, omit the setup fee to avoid
      // double-charging returning clients.
      sessionParams.subscription_data = {
        add_invoice_items: [{ price: SETUP_FEE_PRICE_ID, quantity: 1 }],
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout] Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Run lint and confirm no new errors**

```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; & "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run lint
```

Expected: 8 errors total, all from `app/privacy/page.tsx` and `app/terms/page.tsx`. Zero errors from `app/api/checkout/route.ts`.

- [ ] **Step 3: Commit**

```bash
git add app/api/checkout/route.ts
git commit -m "feat: add POST /api/checkout Stripe session route"
```

---

## Task 2: BuyNowButton Component

**Files:**
- Create: `components/BuyNowButton.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/BuyNowButton.tsx
"use client";

import { useState } from "react";

type Props = {
  priceId: string;
  label?: string;
};

export default function BuyNowButton({ priceId, label = "Get Started" }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceIds: [priceId], hasSetupFee: true }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Unexpected error");
      window.location.href = data.url;
    } catch {
      setError(
        "Something went wrong. Please try again or book a call instead."
      );
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className="btn-primary w-full text-sm disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting..." : label}
      </button>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </>
  );
}
```

- [ ] **Step 2: Run lint and confirm no new errors**

```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; & "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run lint
```

Expected: still 8 pre-existing errors only.

- [ ] **Step 3: Commit**

```bash
git add components/BuyNowButton.tsx
git commit -m "feat: add BuyNowButton client component"
```

---

## Task 3: CartSelector Component

**Files:**
- Create: `components/CartSelector.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/CartSelector.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const CALENDLY = "https://calendly.com/currentautomations/30min";

export type CartScenario = {
  code: string;
  name: string;
  price: number;
  priceId: string;
  requiresRetell?: boolean;
};

type Props = {
  scenarios: CartScenario[];
};

export default function CartSelector({ scenarios }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggle(priceId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(priceId)) {
        next.delete(priceId);
      } else {
        next.add(priceId);
      }
      return next;
    });
  }

  const monthlyTotal = scenarios
    .filter((s) => selected.has(s.priceId))
    .reduce((sum, s) => sum + s.price, 0);

  async function handleCheckout() {
    if (selected.size === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceIds: [...selected], hasSetupFee: true }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Unexpected error");
      window.location.href = data.url;
    } catch {
      setError(
        "Something went wrong. Please try again or book a call instead."
      );
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_45px_rgba(7,17,29,0.08)]">
      <div className="space-y-1">
        {scenarios.map((scenario) => {
          const isChecked = selected.has(scenario.priceId);
          return (
            <label
              key={scenario.priceId}
              className="flex cursor-pointer items-center justify-between rounded-[1rem] border px-4 py-3 transition-colors hover:bg-[var(--color-brand)]/[0.04]"
              style={{
                borderColor: isChecked
                  ? "rgba(79,208,173,0.3)"
                  : "transparent",
                backgroundColor: isChecked
                  ? "rgba(79,208,173,0.06)"
                  : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(scenario.priceId)}
                  className="h-4 w-4 rounded border-gray-300 accent-[#149676]"
                />
                <div>
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {scenario.code}
                  </span>
                  <p className="text-sm font-medium leading-5 text-[var(--color-ink)]">
                    {scenario.name}
                  </p>
                  {scenario.requiresRetell && (
                    <span className="text-xs italic text-[var(--color-muted)]">
                      Retell subscription required separately
                    </span>
                  )}
                </div>
              </div>
              <span className="ml-4 shrink-0 text-sm font-semibold text-[var(--color-ink)]">
                ${scenario.price}/mo
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-6 border-t border-[var(--color-line)] pt-6">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-[var(--color-muted)]">Monthly total</span>
          <span className="text-2xl font-semibold text-[var(--color-ink)]">
            ${monthlyTotal}/mo
          </span>
        </div>
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          + one-time $150 CAD setup fee added at checkout
        </p>

        {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

        <button
          onClick={handleCheckout}
          disabled={selected.size === 0 || loading}
          className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Redirecting..." : "Checkout"}
        </button>

        <Link href={CALENDLY} className="btn-secondary mt-3 block w-full text-center">
          Book a Call Instead
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run lint and confirm no new errors**

```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; & "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run lint
```

Expected: still 8 pre-existing errors only.

- [ ] **Step 3: Commit**

```bash
git add components/CartSelector.tsx
git commit -m "feat: add CartSelector client component with running total"
```

---

## Task 4: Update Pricing Page

**Files:**
- Modify: `app/pricing/page.tsx`

The changes are:
1. Import `BuyNowButton` and `CartSelector` (and `CartScenario` type).
2. Add `requiresRetell?: boolean` to the `Scenario` type.
3. Mark T04 and T05 as `requiresRetell: true` in `scenarioGroups`.
4. Replace each tier card's Calendly `<Link>` with `<BuyNowButton>` + a secondary Calendly link.
5. Replace the grouped à la carte list + standalone Calendly CTA with `<CartSelector>`.

- [ ] **Step 1: Write the full updated pricing page**

Replace the entire contents of `app/pricing/page.tsx` with:

```tsx
// app/pricing/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Section from "@/components/Section";
import BuyNowButton from "@/components/BuyNowButton";
import CartSelector from "@/components/CartSelector";
import type { CartScenario } from "@/components/CartSelector";
import type { FAQItem } from "@/data/siteContent";

const CALENDLY = "https://calendly.com/currentautomations/30min";

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
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(140deg,#07111d_0%,#0c182a_60%,#12324a_100%)] pb-20 pt-24 sm:pb-24 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_45%)]" />
        <div className="container-shell">
          <p className="pill-label bg-white/[0.08] text-white/70">
            Straightforward pricing
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Transparent pricing.{" "}
            <br className="hidden sm:block" />
            Pay only for what you use.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
            Choose a bundled tier to save up to $149/month, or build your own
            stack with individual automation scenarios starting at $49/month.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.08] px-5 py-3">
            <span className="h-2 w-2 rounded-full bg-[var(--color-brand)]" />
            <span className="text-sm text-white/80">
              One-time setup fee:{" "}
              <strong className="text-white">$150 CAD</strong>: full build,
              configuration, and onboarding included
            </span>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Bundled Tiers"
        title="Start with a bundle. Save every month."
        description="Each tier stacks on the last. The more automations you run, the more you save versus a la carte pricing."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 items-start">
          {tiers.map((tier) => {
            const dark = !!tier.badge;
            return (
              <article
                key={tier.id}
                className={`flex flex-col rounded-[2rem] p-7 ${dark ? "dark-card" : "surface-card"}`}
              >
                {tier.badge && (
                  <span className="mb-3 inline-block self-start rounded-full bg-[var(--color-brand)]/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
                    {tier.badge}
                  </span>
                )}
                <h2
                  className={`text-xl font-semibold tracking-tight ${dark ? "text-white" : "text-[var(--color-ink)]"}`}
                >
                  {tier.name}
                </h2>
                <p
                  className={`mt-1 text-xs leading-5 ${dark ? "text-white/60" : "text-[var(--color-muted)]"}`}
                >
                  {tier.tagline}
                </p>
                <p
                  className={`mt-5 text-3xl font-semibold tracking-tight ${dark ? "text-white" : "text-[var(--color-ink)]"}`}
                >
                  ${tier.price}
                  <span
                    className={`text-base font-normal ${dark ? "text-white/50" : "text-[var(--color-muted)]"}`}
                  >
                    /mo
                  </span>
                </p>
                <p
                  className={`mt-1 text-xs font-medium ${dark ? "text-[var(--color-brand)]" : "text-[var(--color-brand-strong)]"}`}
                >
                  Saves ${tier.savings}/mo vs a la carte
                </p>
                <div
                  className={`my-5 h-px ${dark ? "bg-white/10" : "bg-[var(--color-line)]"}`}
                />
                <ul className="flex-1 space-y-2.5">
                  {tier.scenarios.map((s) => (
                    <li key={s} className="flex items-start gap-2.5">
                      <span
                        className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full ${dark ? "bg-[var(--color-brand)]" : "bg-[var(--color-brand-strong)]"}`}
                      />
                      <span
                        className={`text-xs leading-6 ${dark ? "text-white/70" : "text-[var(--color-muted)]"}`}
                      >
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
                {tier.note && (
                  <p className="mt-4 text-xs italic text-white/40">{tier.note}</p>
                )}
                <div className="mt-6 flex flex-col gap-2">
                  <BuyNowButton priceId={tier.priceId} />
                  <Link
                    href={CALENDLY}
                    className="btn-secondary w-full text-center text-sm"
                  >
                    Book a Call Instead
                  </Link>
                </div>
              </article>
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
        primaryHref={CALENDLY}
        primaryLabel="Book Your Free Consultation"
        secondaryHref="/how-it-works"
        secondaryLabel="See How It Works"
      />
    </>
  );
}
```

- [ ] **Step 2: Run lint and confirm no new errors**

```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; & "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run lint
```

Expected: 8 pre-existing errors only. Zero new errors from `app/pricing/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/pricing/page.tsx
git commit -m "feat: wire BuyNowButton and CartSelector into pricing page"
```

---

## Task 5: Success Page

**Files:**
- Create: `app/success/page.tsx`

- [ ] **Step 1: Create the success page**

```tsx
// app/success/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "You Are All Set | Current Automations" },
  description:
    "Your subscription is confirmed. Expect an onboarding email within 24 hours.",
};

export default function SuccessPage() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-[linear-gradient(140deg,#07111d_0%,#0c182a_60%,#12324a_100%)] flex items-center">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_45%)]" />
      <div className="container-shell py-24 sm:py-32">
        <p className="pill-label bg-white/[0.08] text-white/70">
          Purchase confirmed
        </p>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          You are all set.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-white/[0.68] sm:text-lg">
          Your subscription is active. Expect an onboarding email from us within
          24 hours. We will walk you through everything.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Back to home
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run lint and confirm no new errors**

```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; & "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run lint
```

Expected: 8 pre-existing errors only.

- [ ] **Step 3: Commit**

```bash
git add app/success/page.tsx
git commit -m "feat: add /success confirmation page"
```

---

## Task 6: Build Verification

- [ ] **Step 1: Run the full build**

```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; & "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build
```

Expected: Build completes with no TypeScript errors. You may see Next.js route output, that is fine. Any type errors must be fixed before proceeding.

- [ ] **Step 2: Verify routes exist in build output**

In the build output, confirm these routes appear:
- `app/api/checkout/route` (API route)
- `app/success/page` (static page)
- `app/pricing/page` (page with client components)

- [ ] **Step 3: Final commit if build is clean**

```bash
git add -A
git commit -m "feat: Stripe Checkout integration complete"
```

---

## Post-Implementation: Manual Smoke Test Checklist

Run `npm run dev` and verify in a browser:

1. `/pricing` loads without JS errors in the console
2. Each tier card shows a "Get Started" button and a "Book a Call Instead" link below it
3. Clicking "Get Started" on any tier shows "Redirecting..." briefly (will 500 without a live Stripe key, that is expected in dev if using test key)
4. The a la carte section shows all 12 scenarios as checkboxes
5. Checking scenarios updates the running monthly total
6. The Checkout button is disabled when nothing is selected
7. T04 and T05 show the "Retell subscription required separately" note
8. `/success` renders the dark hero with "You are all set." heading and a "Back to home" link
