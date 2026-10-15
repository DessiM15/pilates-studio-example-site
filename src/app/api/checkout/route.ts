import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getPackage } from "@/lib/data/packages";
import { site } from "@/lib/site";

/**
 * Creates a Stripe Checkout Session in test mode when STRIPE_SECRET_KEY is set.
 * Without a key the route returns { mock: true } and the client completes a
 * mock purchase so the demo never breaks.
 */
export async function POST(req: Request) {
  const { packageId } = (await req.json().catch(() => ({}))) as { packageId?: string };
  const pkg = packageId ? getPackage(packageId) : undefined;
  if (!pkg) return NextResponse.json({ error: "Unknown package" }, { status: 400 });

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ mock: true });

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  const stripe = new Stripe(key);
  const session = await stripe.checkout.sessions.create({
    mode: pkg.kind === "membership" ? "subscription" : "payment",
    line_items: [
      pkg.stripePriceId
        ? { price: pkg.stripePriceId, quantity: 1 }
        : {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: Math.round(pkg.price * 100),
              product_data: { name: `${site.name}: ${pkg.name}`, description: pkg.description },
              ...(pkg.kind === "membership" ? { recurring: { interval: "month" as const } } : {}),
            },
          },
    ],
    success_url: `${origin}/checkout/success?package=${pkg.id}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing?cancelled=1`,
    metadata: { packageId: pkg.id },
  });

  return NextResponse.json({ url: session.url });
}
