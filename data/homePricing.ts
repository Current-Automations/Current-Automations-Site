// Home-lane pricing. Deliberately separate from data/pricing.ts, which holds
// Stripe price IDs, AI voice allowances, and build-time margin guards that throw.
// Nothing here is purchasable: home work is quoted after a walkthrough because
// an install depends on the house. These are display strings, and they appear on
// both the lane pages and /pricing, so they live in one place or they drift.

export type HomeTier = {
  code: string;
  name: string;
  price: string;
  body: string;
  fit: string;
  featured?: boolean;
};

// Setup and labour. Hardware, where any is needed, is quoted separately at cost
// plus a small markup rather than folded into these bands.
export const smartHomeTiers: HomeTier[] = [
  {
    code: "T1",
    name: "One device or one room",
    price: "$99 to $149",
    body: "One thing installed, added to your phone, tested, and one automation built while you watch so you know how to change it later.",
    fit: "A thermostat. A lock. A doorbell. The first thing.",
  },
  {
    code: "T2",
    name: "Whole-home starter",
    price: "$349 to $599",
    body: "Thermostat, one lock, and your lighting brought under one app. Hub set up, sensors placed where they matter, scenes built, and everyone in the house shown how it works.",
    fit: "The usual starting point for a whole house.",
    featured: true,
  },
  {
    code: "T3",
    name: "Full build",
    price: "Quoted",
    body: "Lighting throughout, shades, multiple locks, switch replacement, anything that needs an electrician alongside. Fixed quote before anything gets bought or opened.",
    fit: "You want the whole thing done properly, once.",
  },
];

// The phone lane. No hardware, no visit, so it sits below the install bands.
export const everydayAutomationsPricing = {
  from: "$79, one-time",
  range: "$79 to $199",
  note: "depending on how many routines and whether it is remote or in person",
};

// The home-side equivalent of the monthly first-month guarantee. Quoted work
// cannot promise a refund window, so the promise is that the quote holds.
export const HOME_PRICE_PROMISE =
  "Whatever you are quoted before we start is what you pay. No change orders once the work begins.";
