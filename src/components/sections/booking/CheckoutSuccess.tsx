"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useStudio } from "@/lib/store/StudioProvider";
import { getPackage, formatPrice } from "@/lib/data/packages";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function CheckoutSuccess() {
  const params = useSearchParams();
  const { state, purchase, hydrated } = useStudio();
  const packageId = params.get("package") ?? "";
  const mock = params.get("mock") === "1";
  const sessionId = params.get("session_id");
  const pkg = getPackage(packageId);
  const applied = useRef(false);

  useEffect(() => {
    if (!hydrated || applied.current || mock || !sessionId || !pkg) return;
    applied.current = true;
    const key = `aurelle-stripe-${sessionId}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      /* fall through and credit once in memory */
    }
    purchase(pkg.id, "stripe");
  }, [hydrated, mock, sessionId, pkg, purchase]);

  if (!pkg) {
    return (
      <Container>
        <div className="mx-auto max-w-xl py-32 text-center">
          <Eyebrow className="justify-center">Checkout</Eyebrow>
          <h1 className="mt-6 font-serif text-h2 font-light text-charcoal">We could not find that package</h1>
          <p className="mt-4 text-stone">If you completed a purchase, your credits are safe. Email us and we will sort it out.</p>
          <Link href="/pricing" className="eyebrow mt-8 inline-block bg-charcoal px-6 py-4 text-ivory hover:bg-mocha">
            Back to pricing
          </Link>
        </div>
      </Container>
    );
  }

  const unlimited = pkg.credits === "unlimited";

  return (
    <Container>
      <div className="mx-auto max-w-2xl py-32 text-center" aria-live="polite">
        <Eyebrow className="justify-center">{mock ? "Demo purchase complete" : "Payment received"}</Eyebrow>
        <h1 className="mt-6 font-serif text-h1 font-light text-charcoal">You are in.</h1>
        <p className="lead mt-6 text-stone">
          {pkg.name} for {formatPrice(pkg.price)}. {unlimited ? "Unlimited group classes are active on your account." : `${pkg.credits} credits have been added to your account.`}
        </p>
        <dl className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-6 border-y border-charcoal/10 py-8">
          <div>
            <dt className="eyebrow text-stone">{unlimited ? "Unlimited until" : "Credits added"}</dt>
            <dd className="mt-2 font-serif text-4xl text-charcoal">{unlimited ? state.unlimitedUntil ?? "Active" : pkg.credits}</dd>
          </div>
          <div>
            <dt className="eyebrow text-stone">Your balance</dt>
            <dd className="mt-2 font-serif text-4xl text-charcoal">{state.unlimitedUntil ? "Unlimited" : hydrated ? state.credits : "..."}</dd>
          </div>
        </dl>
        {mock && <p className="mt-6 text-xs text-stone">Stripe keys were not configured, so this purchase was simulated. Add test keys to see real Stripe Checkout.</p>}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/schedule" className="eyebrow bg-charcoal px-7 py-4 text-ivory transition hover:bg-mocha">
            Book a class
          </Link>
          <Link href="/account" className="eyebrow border border-charcoal px-7 py-4 text-charcoal transition hover:bg-charcoal hover:text-ivory">
            View your portal
          </Link>
        </div>
      </div>
    </Container>
  );
}
