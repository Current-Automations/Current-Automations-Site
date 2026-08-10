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
// Cost basis is roughly $0.18 CAD/min all-in (Retell voice + TTS + LLM + Twilio).
export const AI_VOICE_OVERAGE_RATE = 0.35;

export const VOICE_MINUTES_A_LA_CARTE = 450;
export const VOICE_MINUTES_ELITE = 600;
export const VOICE_MINUTES_RECEPTIONIST = 1500;

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
