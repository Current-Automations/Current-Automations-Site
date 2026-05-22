# Stripe Checkout Integration - Design Spec

**Date:** 2026-05-17
**Status:** Approved
**Approach:** Mixed Server/Client Components (Approach A)

---

## Overview

Add Stripe Checkout to currentautomations.ca so visitors can self-serve purchase monthly automation plans. The integration covers a POST API route, two focused Client Components embedded in the pricing page, and a confirmation page.

No new dependencies are required: `stripe@^21.0.1` is already installed.

---

## 1. API Route

**File:** `app/api/checkout/route.ts`

### Request

```
POST /api/checkout
Content-Type: application/json

{
  "priceIds": ["price_1TYDaUFbHh7D2pR6HnZkAMIH"],
  "hasSetupFee": true
}
```

- `priceIds`: non-empty array of Stripe Price IDs (recurring subscriptions)
- `hasSetupFee`: when `true`, the one-time $150 CAD setup fee is appended

### Behavior

1. Validate `priceIds` is a non-empty array. Return `400` if not.
2. All current prices are recurring → `mode: "subscription"` always.
3. Build `line_items` from `priceIds` (quantity 1 each).
4. When `hasSetupFee` is true, attach the setup fee via `subscription_data.add_invoice_items`:
   - Price ID: `price_1TYDaJFbHh7D2pR6LF1A1ovY` ($150 CAD, one-time)
   - This bills the setup fee on the first subscription invoice with no trial period.
   - **TODO:** Future enhancement - look up the customer by email in Stripe before creating the session; if they have a prior subscription, omit the setup fee.
5. Create Checkout session with `currency: "cad"`.
6. `success_url`: `https://currentautomations.ca/success?session_id={CHECKOUT_SESSION_ID}`
7. `cancel_url`: `https://currentautomations.ca/pricing`
   - Domain is hardcoded. To support staging, replace with `process.env.NEXT_PUBLIC_SITE_URL`.
8. Return `{ url: string }` on success.
9. On Stripe error: log the raw error server-side, return `500 { error: "Failed to create checkout session" }`.

### Environment

```
STRIPE_SECRET_KEY=sk_live_...   # in .env.local
```

---

## 2. Client Components

### `components/BuyNowButton.tsx`

`"use client"`: used on each tier card.

**Props:**
```ts
{ priceId: string; label?: string }
```

**Behavior:**
- On click: disable button, show loading state, POST `{ priceIds: [priceId], hasSetupFee: true }` to `/api/checkout`.
- On success: `window.location.href = data.url`.
- On error: show inline message "Something went wrong. Please try again or book a call instead." Re-enable button.

---

### `components/CartSelector.tsx`

`"use client"`: used in the à la carte section.

**Props:**
```ts
{
  scenarios: Array<{
    code: string;      // "T01"
    name: string;
    price: number;     // monthly price in CAD
    priceId: string;
    requiresRetell?: boolean;
  }>;
}
```

**Behavior:**
- State: `Set<string>` of selected `priceId` values.
- Each scenario renders as a checkbox row: `[code] Name - $price/mo`, with a "Retell subscription required" badge for T04 and T05.
- Running monthly total updates live as checkboxes change.
- Summary line: "One-time $150 CAD setup fee added at checkout."
- Checkout button disabled when selection is empty.
- On Checkout click: POST `{ priceIds: [...selected], hasSetupFee: true }` → redirect.
- Same error handling as BuyNowButton.

---

## 3. Pricing Page (`app/pricing/page.tsx`)

Remains a **Server Component**. No structural changes to the existing layout: tiers section first, à la carte builder below.

Changes:
- Each tier card's "Get Started" button is replaced by `<BuyNowButton priceId="..." />`.
- The à la carte section's scenario list and Checkout button are replaced by `<CartSelector scenarios={scenarioGroups.flatMap(g => g.scenarios)} />`.
- All existing Calendly CTAs remain as secondary "Book a Call Instead" links.

**Tier price IDs:**

| Tier | Price | Price ID |
|------|-------|----------|
| Starter | $197/mo | `price_1TYDaUFbHh7D2pR6HnZkAMIH` |
| Pro | $297/mo | `price_1TYDaeFbHh7D2pR6fS50MB9m` |
| Growth | $397/mo | `price_1TYDanFbHh7D2pR63S10aawu` |
| Elite | $597/mo | `price_1TYDaxFbHh7D2pR6UGz2bypy` |

**À la carte price IDs:**

| Code | Name | Price | Price ID |
|------|------|-------|----------|
| T01 | Missed Call Text Back | $49/mo | `price_1TYDb8FbHh7D2pR6daDOEzXl` |
| T02 | Web Form Speed to Lead | $49/mo | `price_1TYDbHFbHh7D2pR6ygqSwCnP` |
| T03 | Multi-Touch Follow Up Sequence | $79/mo | `price_1TYDbQFbHh7D2pR6YQbn6Hce` |
| T04 | Retell AI Outbound Call | $149/mo | `price_1TYDbaFbHh7D2pR6Kt85mIAE` |
| T05 | Inbound AI Call Handling | $149/mo | `price_1TYDbkFbHh7D2pR6N7FPebE4` |
| T06 | Google Business Profile Lead Capture | $49/mo | `price_1TYDbuFbHh7D2pR6ZlkKBdsG` |
| T07 | Quote Follow Up Sequence | $79/mo | `price_1TYDc3FbHh7D2pR6CPMT08gB` |
| T08 | Database Reactivation Campaign | $89/mo | `price_1TYDcDFbHh7D2pR6bqd0TlCJ` |
| T09 | No Show and Cancellation Recovery | $79/mo | `price_1TYDcNFbHh7D2pR6nuxSwwMz` |
| T10 | Post Job Review Request | $59/mo | `price_1TYDcYFbHh7D2pR64ZGtcZk5` |
| T11 | Weekly Client ROI Report | $99/mo | `price_1TYDchFbHh7D2pR6JVe7Nyz8` |
| T12 | System Anomaly Alert | $79/mo | `price_1TYDcsFbHh7D2pR6r0F4Bsnx` |

**Setup fee price ID:** `price_1TYDaJFbHh7D2pR6LF1A1ovY` ($150 CAD, one-time)

---

## 4. Success Page (`app/success/page.tsx`)

Server Component. Uses the existing dark hero style.

Content:
- Eyebrow: "Purchase confirmed"
- Heading: "You're all set."
- Body: "Your subscription is active. Expect an onboarding email from us within 24 hours. We'll walk you through everything."
- Secondary link: "Back to home" → `/`

No Stripe session data fetching. Static confirmation only.

---

## 5. Error Handling

| Scenario | Behavior |
|----------|----------|
| Empty `priceIds` | API returns `400 { error: "priceIds must be a non-empty array" }` |
| Stripe API error | Log raw error server-side; return `500 { error: "Failed to create checkout session" }` |
| Client fetch error | Inline message: "Something went wrong. Please try again or book a call instead." Button re-enabled. |

---

## 6. Files

| File | Action |
|------|--------|
| `app/api/checkout/route.ts` | **New** |
| `app/success/page.tsx` | **New** |
| `components/BuyNowButton.tsx` | **New** |
| `components/CartSelector.tsx` | **New** |
| `app/pricing/page.tsx` | **Modified**: wire in Client Components, keep layout |
| `.env.local` | **Modified**: add `STRIPE_SECRET_KEY` |
