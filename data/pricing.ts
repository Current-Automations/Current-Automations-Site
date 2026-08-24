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

// Charged only on minutes past the monthly pool, billed in arrears.
export const AI_VOICE_OVERAGE_RATE = 0.35;

// The LLM is a dropdown in Retell, and its price swings the cost basis by more than
// 2x across the model list. This constant is the only thing tying the number below to
// the model actually configured in ops/retell-agents/*.json. Change one, change both.
export const VOICE_MODEL = "gpt-4.1";

// Retell voice infra 0.055 + TTS 0.015 + knowledge base 0.005 + LLM 0.045, plus Twilio
// Canada SIP origination 0.0045. USD 0.1245 at 1.38. Verified against both price sheets
// 2026-08-21; the previous 0.18 figure was written before the model list was checked and
// held only for the cheap end of it.
export const VOICE_COST_CAD_PER_MIN = 0.172;

export const VOICE_MINUTES_A_LA_CARTE = 450;
export const VOICE_MINUTES_ELITE = 600;
export const VOICE_MINUTES_RECEPTIONIST = 1000;

// Receptionist Mode: sold by conversation as an upgrade, not offered at first
// checkout. The AI is positioned as overflow behind a human; taking over the
// front desk is a later decision once the client trusts it.
export const RECEPTIONIST_MODE_PRICE = 350;
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
// draws from one 450 minute pool. Returns null when nothing uses voice.
export function voiceMinutesFor(priceIds: Iterable<string>): number | null {
  let minutes: number | null = null;
  for (const id of priceIds) {
    if (id === RECEPTIONIST_MODE_PRICE_ID) return VOICE_MINUTES_RECEPTIONIST;
    if (id === ELITE_PRICE_ID) minutes = VOICE_MINUTES_ELITE;
    else if (AI_VOICE_PRICE_IDS.has(id) && minutes === null) minutes = VOICE_MINUTES_A_LA_CARTE;
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

// Receptionist Mode bundles 1000 minutes into a $350 add-on, which prices the pool at
// exactly the overage rate. No arbitrage either way, and both margins land on the same
// number. The LLM is a dropdown in Retell and swings the cost basis by more than 2x
// across the model list, so a model change is the way this goes underwater. Nothing else
// in the codebase notices, so fail the build rather than discover it on an invoice.
//
// The bundle was 1500 minutes until 2026-08-23, which left 26.3% and sat under this floor.
const MARGIN_FLOOR = 0.45;

const RECEPTIONIST_MARGIN =
  1 - (VOICE_MINUTES_RECEPTIONIST * VOICE_COST_CAD_PER_MIN) / RECEPTIONIST_MODE_PRICE;
const OVERAGE_MARGIN = 1 - VOICE_COST_CAD_PER_MIN / AI_VOICE_OVERAGE_RATE;

if (RECEPTIONIST_MARGIN < MARGIN_FLOOR) {
  throw new Error(
    `Receptionist Mode margin is ${(RECEPTIONIST_MARGIN * 100).toFixed(1)}% on ${VOICE_MODEL}, below the ${MARGIN_FLOOR * 100}% floor. Raise RECEPTIONIST_MODE_PRICE, cut VOICE_MINUTES_RECEPTIONIST, or pick a cheaper model.`,
  );
}

if (OVERAGE_MARGIN < MARGIN_FLOOR) {
  throw new Error(
    `AI voice overage margin is ${(OVERAGE_MARGIN * 100).toFixed(1)}% on ${VOICE_MODEL}, below the ${MARGIN_FLOOR * 100}% floor. Raise AI_VOICE_OVERAGE_RATE or pick a cheaper model.`,
  );
}
