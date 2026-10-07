import type { OwnerEnv } from "./commands";

function env(name: string): string {
  return process.env[name] ?? "";
}

export function readEnv(): OwnerEnv | null {
  const accountSid = env("TWILIO_ACCOUNT_SID");
  const authToken = env("TWILIO_AUTH_TOKEN");
  const demoLine = env("SMS_DEMO_LINE");
  const cell = env("SMS_FORWARD_TO");
  const anthropicKey = env("ANTHROPIC_API_KEY");
  if (!accountSid || !authToken || !demoLine || !cell || !anthropicKey) return null;
  return {
    twilio: { accountSid, authToken },
    anthropicKey,
    githubToken: env("GITHUB_TOKEN_SCHEDULE"),
    makeUrl: env("MAKE_EVENTS_WEBHOOK_URL"),
    demoLine,
    cell,
    stripeLink: env("STRIPE_LINK_T1"),
    reviewLink: env("GOOGLE_REVIEW_LINK"),
    billingEmail: env("BILLING_EMAIL"),
  };
}
