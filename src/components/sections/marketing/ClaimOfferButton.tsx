"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { useStudio } from "@/lib/store/StudioProvider";

/**
 * Starts checkout for the intro package. Uses Stripe Checkout when keys are
 * configured, otherwise completes a mock purchase so the demo still flows.
 */
export function ClaimOfferButton({ className, light = false }: { className?: string; light?: boolean }) {
  const router = useRouter();
  const { purchase } = useStudio();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function claim() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: "intro-3" }),
      });
      const data = (await res.json()) as { url?: string; mock?: boolean; error?: string };
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      if (data.mock) {
        purchase("intro-3", "mock");
        router.push("/checkout/success?package=intro-3&mock=1");
        return;
      }
      setError(data.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("We could not start checkout. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={claim}
        disabled={busy}
        aria-busy={busy}
        className={clsx(
          "eyebrow inline-flex items-center justify-center px-9 py-5 transition disabled:opacity-60",
          light ? "bg-ivory text-charcoal hover:bg-gold-light" : "bg-charcoal text-ivory hover:bg-mocha",
        )}
      >
        {busy ? "Opening checkout" : "Claim the intro offer"}
      </button>
      {error && (
        <p role="alert" className={clsx("mt-3 text-sm", light ? "text-gold-light" : "text-danger")}>
          {error}
        </p>
      )}
    </div>
  );
}
