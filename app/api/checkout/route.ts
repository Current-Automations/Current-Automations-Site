import Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  RECEPTIONIST_MODE_PRICE_ID,
  SETUP_FEE_CENTS,
  T12_PRICE_ID,
  includesAiVoice,
  includesReceptionistMode,
  voiceConfigFeeFor,
} from "@/data/pricing";

const SETUP_FEE_PRICE_ID = "price_1TYDaJFbHh7D2pR6LF1A1ovY";
const BASE_URL = "https://currentautomations.ca";

// The AI voice configuration fee gets its own Stripe Product so it reads as a
// distinct line on the invoice instead of a second "Setup and Onboarding".
const VOICE_CONFIG_PRODUCT_ID = "prod_V35vWNolClGYm3";

// Subscription states that mean "already onboarded, do not charge setup again".
// past_due and unpaid are billing problems, not a reason to re-onboard someone.
const EXISTING_CLIENT_STATUSES = new Set<Stripe.Subscription.Status>([
  "active",
  "trialing",
  "past_due",
  "unpaid",
]);

const ALLOWED_PRICE_IDS = new Set([
  "price_1TYDaUFbHh7D2pR6HnZkAMIH",
  "price_1TYDaeFbHh7D2pR6fS50MB9m",
  "price_1TYDanFbHh7D2pR63S10aawu",
  "price_1TYDaxFbHh7D2pR6UGz2bypy",
  "price_1TYDb8FbHh7D2pR6daDOEzXl",
  "price_1TYDbHFbHh7D2pR6ygqSwCnP",
  "price_1TYDbuFbHh7D2pR6ZlkKBdsG",
  "price_1TYDbQFbHh7D2pR6YQbn6Hce",
  "price_1TYDc3FbHh7D2pR6CPMT08gB",
  "price_1TYDcNFbHh7D2pR6nuxSwwMz",
  "price_1TYDcYFbHh7D2pR64ZGtcZk5",
  "price_1TYDcDFbHh7D2pR6bqd0TlCJ",
  "price_1TYDchFbHh7D2pR6JVe7Nyz8",
  "price_1TYDcsFbHh7D2pR6r0F4Bsnx",
  "price_1TYDbaFbHh7D2pR6Kt85mIAE",
  "price_1TYDbkFbHh7D2pR6N7FPebE4",
  "price_1TwsOOFbHh7D2pR6sazpj7db",
  RECEPTIONIST_MODE_PRICE_ID,
]);
// TODO: To support staging environments, replace BASE_URL with process.env.NEXT_PUBLIC_SITE_URL

// Lazy-initialize so the key is read at request time, not build time.
function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: Request) {
  // Without this the Stripe constructor throws a generic authenticator error and
  // every buy button on the site reports "something went wrong", which says
  // nothing about the actual cause being an unset environment variable.
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error(
      "[checkout] STRIPE_SECRET_KEY is not set in this environment. Checkout cannot work until it is added to the Vercel project (Production scope) and the project is redeployed."
    );
    return NextResponse.json(
      { error: "Checkout is not configured. Please book a call and we will take it from there." },
      { status: 503 }
    );
  }

  const stripe = getStripe();
  try {
    const body = await request.json();
    // The setup fee is never taken from the request. It is decided here from the
    // price IDs and the customer's history, so a hand-rolled POST cannot skip it.
    const { priceIds, email } = body as {
      priceIds: unknown;
      email?: unknown;
    };

    if (!Array.isArray(priceIds) || priceIds.length === 0) {
      return NextResponse.json(
        { error: "priceIds must be a non-empty array" },
        { status: 400 }
      );
    }

    if (email !== undefined && (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    const customerEmail = typeof email === "string" ? email : undefined;

    if ((priceIds as string[]).some((id) => !ALLOWED_PRICE_IDS.has(id))) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    let existingCustomerId: string | undefined;
    let isExistingClient = false;
    // Every price the customer already pays for on a live subscription. Used to
    // decide what onboarding work has already been done and paid for.
    const existingPriceIds: string[] = [];

    if (customerEmail) {
      // Checkout used to create a fresh customer record per session, so one email
      // can map to several. Looking at only the newest would miss the record that
      // actually holds the subscription and charge the setup fee a second time.
      const customers = await stripe.customers.list({ email: customerEmail, limit: 10 });
      existingCustomerId = customers.data[0]?.id;

      for (const customer of customers.data) {
        const subscriptions = await stripe.subscriptions.list({
          customer: customer.id,
          status: "all",
          limit: 20,
        });
        const liveSubscriptions = subscriptions.data.filter((s) =>
          EXISTING_CLIENT_STATUSES.has(s.status)
        );
        if (liveSubscriptions.length > 0) {
          existingCustomerId = customer.id;
          isExistingClient = true;
          for (const subscription of liveSubscriptions) {
            for (const item of subscription.items.data) {
              if (item.price?.id) existingPriceIds.push(item.price.id);
            }
          }
          break;
        }
      }
    }

    // Receptionist Mode only raises the minute pool and deepens an existing agent.
    // Sold on its own it would bill $350/mo against nothing to run.
    if (
      includesReceptionistMode(priceIds as string[]) &&
      !includesAiVoice(priceIds as string[]) &&
      !includesAiVoice(existingPriceIds)
    ) {
      return NextResponse.json(
        { error: "Receptionist Mode requires an AI voice scenario" },
        { status: 400 }
      );
    }

    // T12 monitoring is bundled into Receptionist Mode, so buying both would
    // charge for it twice. An unattended front desk needs the alarm either way.
    const buyingReceptionist = includesReceptionistMode(priceIds as string[]);
    const billablePriceIds = buyingReceptionist
      ? (priceIds as string[]).filter((id) => id !== T12_PRICE_ID)
      : (priceIds as string[]);

    if (buyingReceptionist && existingPriceIds.includes(T12_PRICE_ID)) {
      console.warn(
        `[checkout] ${customerEmail} is buying Receptionist Mode while already paying for T12 separately. T12 is bundled, so remove the standalone T12 item from their subscription.`
      );
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      line_items: billablePriceIds.map((priceId) => ({ price: priceId, quantity: 1 })),
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/pricing`,
      // Stripe Tax needs an address to pick a jurisdiction, so the billing address
      // is collected rather than optional. HST is added on top of listed prices,
      // matching terms 3.4 ("fees are exclusive of applicable taxes").
      automatic_tax: { enabled: true },
      billing_address_collection: "required",
    };

    if (existingCustomerId) {
      sessionParams.customer = existingCustomerId;
      // Stripe rejects the session if automatic tax is on and an existing customer
      // is passed without this, since it may need to write back a resolved address.
      sessionParams.customer_update = { address: "auto" };
    } else if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    const chargeSetupFee = !isExistingClient;

    // Configuration is billed as a difference, never a repeat. A second voice
    // scenario owes nothing, and upgrading overflow voice to Receptionist Mode
    // owes the $250 gap rather than the full $450.
    const configFeeOwed = voiceConfigFeeFor([...(priceIds as string[]), ...existingPriceIds]);
    const configFeeAlreadyPaid = voiceConfigFeeFor(existingPriceIds);
    const voiceConfigFeeCents = Math.max(0, configFeeOwed - configFeeAlreadyPaid) * 100;
    const chargeVoiceConfigFee = voiceConfigFeeCents > 0;

    if (chargeSetupFee || chargeVoiceConfigFee) {
      const setupFeePrice = await stripe.prices.retrieve(SETUP_FEE_PRICE_ID);
      const setupFeeProduct =
        typeof setupFeePrice.product === "string" ? setupFeePrice.product : setupFeePrice.product.id;

      const invoiceItems: { price_data: Record<string, unknown>; quantity: number }[] = [];

      if (chargeSetupFee) {
        invoiceItems.push({
          price_data: {
            currency: "cad",
            product: setupFeeProduct,
            unit_amount: SETUP_FEE_CENTS,
            tax_behavior: "exclusive",
          },
          quantity: 1,
        });
      }

      if (chargeVoiceConfigFee) {
        invoiceItems.push({
          price_data: {
            currency: "cad",
            product: VOICE_CONFIG_PRODUCT_ID,
            unit_amount: voiceConfigFeeCents,
            tax_behavior: "exclusive",
          },
          quantity: 1,
        });
      }

      // Cast required: add_invoice_items is a valid Stripe Checkout API parameter but is
      // absent from SessionCreateParams.SubscriptionData in stripe-node v21 types.
      sessionParams.subscription_data = {
        add_invoice_items: invoiceItems,
      } as unknown as Stripe.Checkout.SessionCreateParams.SubscriptionData;
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
