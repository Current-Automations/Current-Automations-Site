// Single source of truth for one-time fees, AI voice allowances, and which
// products carry AI voice. The checkout API and every purchase surface read from
// here, so adding a new AI voice scenario means adding its price ID once.

// One-time fees are always two separate line items, never one blended number.
// A new client buying voice sees $150 + $200. An existing client adding voice
// sees only the $200, because they already paid the setup fee.
export const SETUP_FEE = 150;
export const VOICE_CONFIG_FEE = 200;

// Receptionist Mode is a materially deeper agent build, so its configuration fee
// replaces the standard one rather than stacking on top of it.
export const VOICE_CONFIG_FEE_RECEPTIONIST = 450;

export const SETUP_FEE_CENTS = SETUP_FEE * 100;

// Charged only on minutes past the monthly pool, billed in arrears. This rate has to
// sit ABOVE what the Receptionist Mode uplift charges per minute, or a client does the
// arithmetic, finds that running over the pool is cheaper than upgrading, and the
// upgrade never sells. At 0.35 the uplift was the worse deal and the ladder was broken.
export const AI_VOICE_OVERAGE_RATE = 0.45;

// The LLM is a dropdown in Retell, and its price swings the cost basis by more than
// 2x across the model list. This constant is the only thing tying the number below to
// the model actually configured in ops/retell-agents/*.json. Change one, change both.
export const VOICE_MODEL = "gpt-4.1";

// Retell voice infra 0.055 + TTS 0.015 + knowledge base 0.005 + LLM 0.045, plus Twilio
// Canada SIP origination 0.0045. USD 0.1245 at 1.38. Verified against both price sheets
// 2026-08-21; the previous 0.18 figure was written before the model list was checked and
// held only for the cheap end of it.
export const VOICE_COST_CAD_PER_MIN = 0.172;

// One pool for every plan that carries AI voice, whether that is a single a la carte
// scenario or the Elite tier. Elite used to carry its own 600, which meant the top tier
// pooled fewer minutes than a cheaper Receptionist configuration and read as the worst
// deal on the page. Elite's voice benefit is that it INCLUDES both voice scenarios,
// worth $338 a la carte, not that it holds a different number here.
export const VOICE_MINUTES_A_LA_CARTE = 450;
export const VOICE_MINUTES_RECEPTIONIST = 1150;

// The two prices the margin guard below depends on. They live here rather than only in
// app/pricing/page.tsx so a price edit cannot silently drift away from the guard that
// is supposed to be watching it.
export const VOICE_SCENARIO_PRICE = 169;
export const ELITE_TIER_PRICE = 547;

// Receptionist Mode: sold by conversation as an upgrade, not offered at first
// checkout. The AI is positioned as overflow behind a human; taking over the
// front desk is a later decision once the client trusts it.
export const RECEPTIONIST_MODE_PRICE = 250;
export const RECEPTIONIST_MODE_PRICE_ID = "price_1U30zLFbHh7D2pR6AXpkiDVu";

// Seconds the AI has to answer before the call forwards to the client's
// nominated human number. Below ~15s normal agent latency looks like a fault;
// above ~20s the caller has already hung up. Retell-side setting, mirrored here
// so the number that appears in copy and in the build is the same number.
export const FAILOVER_TIMEOUT_SECONDS = 18;

const ELITE_PRICE_ID = "price_1TYDaxFbHh7D2pR6UGz2bypy";

// Receptionist Mode bundles T12 monitoring at no extra charge, since an
// unattended front desk needs a failure alarm and every tier already includes it.
export const T12_PRICE_ID = "price_1TYDcsFbHh7D2pR6r0F4Bsnx";

// Any price ID here triggers the AI voice configuration fee and a minute pool.
export const AI_VOICE_PRICE_IDS: ReadonlySet<string> = new Set([
  "price_1TYDbaFbHh7D2pR6Kt85mIAE", // T04 Retell AI Outbound Call
  "price_1TYDbkFbHh7D2pR6N7FPebE4", // T05 Inbound AI Call Handling
  ELITE_PRICE_ID,
]);

export function includesAiVoice(priceIds: Iterable<string>): boolean {
  for (const id of priceIds) {
    if (AI_VOICE_PRICE_IDS.has(id)) return true;
  }
  return false;
}

export function includesReceptionistMode(priceIds: Iterable<string>): boolean {
  for (const id of priceIds) {
    if (id === RECEPTIONIST_MODE_PRICE_ID) return true;
  }
  return false;
}

// Minutes are pooled per account, not per scenario. Buying both T04 and T05 still
// draws from one 450 minute pool, and so does Elite, which carries both. Returns null
// when nothing uses voice.
export function voiceMinutesFor(priceIds: Iterable<string>): number | null {
  let minutes: number | null = null;
  for (const id of priceIds) {
    if (id === RECEPTIONIST_MODE_PRICE_ID) return VOICE_MINUTES_RECEPTIONIST;
    if (AI_VOICE_PRICE_IDS.has(id) && minutes === null) minutes = VOICE_MINUTES_A_LA_CARTE;
  }
  return minutes;
}

// The configuration fee a given set of price IDs is worth. Run against the cart
// it gives what is owed; run against a live subscription it gives what was already
// paid. Charging the difference is what makes an upgrade cost the delta and a
// second voice scenario cost nothing.
export function voiceConfigFeeFor(priceIds: Iterable<string>): number {
  let hasVoice = false;
  for (const id of priceIds) {
    if (id === RECEPTIONIST_MODE_PRICE_ID) return VOICE_CONFIG_FEE_RECEPTIONIST;
    if (AI_VOICE_PRICE_IDS.has(id)) hasVoice = true;
  }
  return hasVoice ? VOICE_CONFIG_FEE : 0;
}

// Voice minutes are effectively the entire cost structure. Everything else the platform
// runs is rounding error: a non-voice scenario costs about a dollar a month in Make
// credits and Twilio SMS against a $49 to $99 price, so Starter, Pro and Growth all sit
// above 94% margin and nothing in this file can move them. Only the voice configurations
// are worth guarding, and all four are guarded now rather than only Receptionist Mode.
//
// The previous guard divided the whole pool's cost by RECEPTIONIST_MODE_PRICE alone,
// ignoring the voice scenario clause 3.7 forces underneath it. That understated the
// margin by about a third and drove the pool down to 750 on 2026-08-23.
//
// The LLM is a dropdown in Retell and swings the cost basis by more than 2x across the
// model list, so a model change is the way this goes underwater. Nothing else in the
// codebase notices, so fail the build rather than discover it on an invoice.
const MARGIN_FLOOR = 0.45;

// Non-voice cost to serve per month, CAD, at the volume a mid-sized trades client runs.
// Derived 2026-08-23 from the Make blueprints (modules per run = credits, at Make Core
// $10.59 per 10k) and Twilio Canadian long code rates ($0.0083 plus carrier surcharge
// per outbound segment, $1.15 a month for the number). Rounded up.
const NON_VOICE_COGS_VOICE_ONLY = 3;
const NON_VOICE_COGS_FULL_STACK = 21;

const VOICE_CONFIGS = [
  {
    name: "AI voice scenario a la carte",
    revenue: VOICE_SCENARIO_PRICE,
    minutes: VOICE_MINUTES_A_LA_CARTE,
    otherCosts: NON_VOICE_COGS_VOICE_ONLY,
  },
  {
    name: "Elite",
    revenue: ELITE_TIER_PRICE,
    minutes: VOICE_MINUTES_A_LA_CARTE,
    otherCosts: NON_VOICE_COGS_FULL_STACK,
  },
  {
    name: "Receptionist Mode on an a la carte scenario",
    revenue: VOICE_SCENARIO_PRICE + RECEPTIONIST_MODE_PRICE,
    minutes: VOICE_MINUTES_RECEPTIONIST,
    otherCosts: NON_VOICE_COGS_VOICE_ONLY,
  },
  {
    name: "Receptionist Mode on Elite",
    revenue: ELITE_TIER_PRICE + RECEPTIONIST_MODE_PRICE,
    minutes: VOICE_MINUTES_RECEPTIONIST,
    otherCosts: NON_VOICE_COGS_FULL_STACK,
  },
];

for (const config of VOICE_CONFIGS) {
  const cost = config.minutes * VOICE_COST_CAD_PER_MIN + config.otherCosts;
  const margin = 1 - cost / config.revenue;
  if (margin < MARGIN_FLOOR) {
    throw new Error(
      `${config.name} runs at ${(margin * 100).toFixed(1)}% margin on ${VOICE_MODEL} ($${cost.toFixed(2)} to serve $${config.revenue}), below the ${MARGIN_FLOOR * 100}% floor. Raise the price, cut the minute pool, or pick a cheaper model.`,
    );
  }
}

const OVERAGE_MARGIN = 1 - VOICE_COST_CAD_PER_MIN / AI_VOICE_OVERAGE_RATE;

if (OVERAGE_MARGIN < MARGIN_FLOOR) {
  throw new Error(
    `AI voice overage margin is ${(OVERAGE_MARGIN * 100).toFixed(1)}% on ${VOICE_MODEL}, below the ${MARGIN_FLOOR * 100}% floor. Raise AI_VOICE_OVERAGE_RATE or pick a cheaper model.`,
  );
}

// Buying the Receptionist uplift has to beat running over the pool, otherwise the
// upgrade is a worse deal than doing nothing and a client who checks will never take it.
const UPLIFT_MINUTES = VOICE_MINUTES_RECEPTIONIST - VOICE_MINUTES_A_LA_CARTE;
const UPLIFT_RATE = RECEPTIONIST_MODE_PRICE / UPLIFT_MINUTES;

if (UPLIFT_RATE >= AI_VOICE_OVERAGE_RATE) {
  throw new Error(
    `Receptionist Mode prices its ${UPLIFT_MINUTES} extra minutes at $${UPLIFT_RATE.toFixed(3)}/min, at or above the $${AI_VOICE_OVERAGE_RATE} overage rate. The upgrade would cost a client more than simply running over the pool. Raise AI_VOICE_OVERAGE_RATE, cut RECEPTIONIST_MODE_PRICE, or raise VOICE_MINUTES_RECEPTIONIST.`,
  );
}
