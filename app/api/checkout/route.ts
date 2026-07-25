import Stripe from "stripe";
import { NextResponse } from "next/server";

const SETUP_FEE_PRICE_ID = "price_1TYDaJFbHh7D2pR6LF1A1ovY";
const BASE_URL = "https://currentautomations.ca";

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
    const { priceIds, hasSetupFee } = body as {
      priceIds: unknown;
      hasSetupFee: boolean;
    };

    if (!Array.isArray(priceIds) || priceIds.length === 0) {
      return NextResponse.json(
        { error: "priceIds must be a non-empty array" },
        { status: 400 }
      );
    }

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
    };

    if (hasSetupFee) {
      // TODO: Future enhancement - look up customer by email in Stripe before creating the
      // session; if they have an existing subscription, omit the setup fee to avoid
      // double-charging returning clients.
      //
      // Cast required: add_invoice_items is a valid Stripe Checkout API parameter but is
      // absent from SessionCreateParams.SubscriptionData in stripe-node v21 types.
      sessionParams.subscription_data = {
        add_invoice_items: [{ price: SETUP_FEE_PRICE_ID, quantity: 1 }],
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
