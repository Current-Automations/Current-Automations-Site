// Single source of truth for one-time fees, AI voice allowances, and which
// products carry AI voice. The checkout API and every purchase surface read from
// here, so adding a new AI voice scenario means adding its price ID once.

// One-time fees are always two separate line items, never one blended number.
// A new client buying voice sees $150 + $200. An existing client adding voice
// sees only the $200, because they already paid the setup fee.
export const SETUP_FEE = 150;
export const VOICE_CONFIG_FEE = 200;

export const SETUP_FEE_CENTS = SETUP_FEE * 100;
export const VOICE_CONFIG_FEE_CENTS = VOICE_CONFIG_FEE * 100;

// Charged only on minutes past the monthly pool, billed in arrears.
// Cost basis is roughly $0.18 CAD/min all-in (Retell voice + TTS + LLM + Twilio).
export const AI_VOICE_OVERAGE_RATE = 0.35;

export const VOICE_MINUTES_A_LA_CARTE = 450;
export const VOICE_MINUTES_ELITE = 600;

// Receptionist Mode: not purchasable yet. Needs a Stripe price, T12 bundled, and
// the failover build before it can be sold. Numbers live here so they have one home.
export const VOICE_CONFIG_FEE_RECEPTIONIST = 450;
export const VOICE_MINUTES_RECEPTIONIST = 1500;

const ELITE_PRICE_ID = "price_1TYDaxFbHh7D2pR6UGz2bypy";

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

// Minutes are pooled per account, not per scenario. Buying both T04 and T05 still
// draws from one 450 minute pool. Returns null when nothing in the cart uses voice.
export function voiceMinutesFor(priceIds: Iterable<string>): number | null {
  let hasVoice = false;
  for (const id of priceIds) {
    if (id === ELITE_PRICE_ID) return VOICE_MINUTES_ELITE;
    if (AI_VOICE_PRICE_IDS.has(id)) hasVoice = true;
  }
  return hasVoice ? VOICE_MINUTES_A_LA_CARTE : null;
}
