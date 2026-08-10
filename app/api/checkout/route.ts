import Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  AI_VOICE_PRICE_IDS,
  SETUP_FEE_CENTS,
  VOICE_CONFIG_FEE_CENTS,
  includesAiVoice,
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
]);
// TODO: To support staging environments, replace BASE_URL with process.env.NEXT_PUBLIC_SITE_URL

// Lazy-initialize so the key is read at request time, not build time.
function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: Request) {
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

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      (priceIds as string[]).map((priceId) => ({ price: priceId, quantity: 1 }));

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      line_items: lineItems,
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/pricing`,
      // Stripe Tax needs an address to pick a jurisdiction, so the billing address
      // is collected rather than optional. HST is added on top of listed prices,
      // matching terms 3.4 ("fees are exclusive of applicable taxes").
      automatic_tax: { enabled: true },
      billing_address_collection: "required",
    };

    let existingCustomerId: string | undefined;
    let isExistingClient = false;
    let alreadyConfiguredForVoice = false;

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
          // Someone who already runs voice has already had the Retell build done,
          // so adding the other voice scenario must not bill configuration twice.
          alreadyConfiguredForVoice = liveSubscriptions.some((s) =>
            s.items.data.some((item) => item.price?.id && AI_VOICE_PRICE_IDS.has(item.price.id))
          );
          break;
        }
      }
    }

    if (existingCustomerId) {
      sessionParams.customer = existingCustomerId;
      // Stripe rejects the session if automatic tax is on and an existing customer
      // is passed without this, since it may need to write back a resolved address.
      sessionParams.customer_update = { address: "auto" };
    } else if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    const buyingVoice = includesAiVoice(priceIds as string[]);
    const chargeSetupFee = !isExistingClient;
    const chargeVoiceConfigFee = buyingVoice && !alreadyConfiguredForVoice;

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
            unit_amount: VOICE_CONFIG_FEE_CENTS,
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
