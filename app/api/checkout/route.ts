import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const SETUP_FEE_PRICE_ID = "price_1TYDaJFbHh7D2pR6LF1A1ovY";
const BASE_URL = "https://currentautomations.ca";
// TODO: To support staging environments, replace BASE_URL with process.env.NEXT_PUBLIC_SITE_URL

export async function POST(request: Request) {
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

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      (priceIds as string[]).map((priceId) => ({ price: priceId, quantity: 1 }));

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      line_items: lineItems,
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/pricing`,
    };

    if (hasSetupFee) {
      // TODO: Future enhancement — look up customer by email in Stripe before creating the
      // session; if they have an existing subscription, omit the setup fee to avoid
      // double-charging returning clients.
      sessionParams.subscription_data = {
        add_invoice_items: [{ price: SETUP_FEE_PRICE_ID, quantity: 1 }],
      };
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
