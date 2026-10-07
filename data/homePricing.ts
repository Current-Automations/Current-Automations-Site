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

// Setup and labour, before HST. Hardware, where any is needed, is quoted separately
// at cost plus a small markup rather than folded into these bands. The "+ HST" is
// on the number itself so no surface can show the band without the tax.
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
  from: "$79 + HST, one-time",
  range: "$79 to $199 + HST",
  note: "depending on how many routines and whether it is remote or in person",
};

// The home-side equivalent of the monthly first-month guarantee. Quoted work
// cannot promise a refund window, so the promise is that the quote holds.
export const HOME_PRICE_PROMISE =
  "Whatever you are quoted before we start is what you pay, plus HST. No change orders once the work begins.";

// Rendered after every home band price in a smaller face so the mono number does not wrap.
export const HOME_TAX = "+ HST";

// The one line every home surface leads with. The number is the whole offer.
export const FIRST_DEVICE_OFFER = "$99 + HST: your first smart device set up and working on your phone.";
export const FIRST_DEVICE_SCOPE = "Nothing in the walls. Plug-in, battery and Wi-Fi devices only.";
