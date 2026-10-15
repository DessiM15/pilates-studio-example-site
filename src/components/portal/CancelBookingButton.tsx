"use client";

import { useState } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import { useNow } from "@/components/sections/booking/helpers";

export function CancelBookingButton({ bookingId, startsAtMs, className, onDone }: { bookingId: string; startsAtMs: number | null; className: string; onDone?: (msg: string) => void }) {
  const { cancelBooking } = useStudio();
  const [confirming, setConfirming] = useState(false);
  const now = useNow();
  const late = startsAtMs !== null && startsAtMs - now < 12 * 3600000;

  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)} className="eyebrow border-b border-charcoal pb-1 text-charcoal transition hover:border-danger hover:text-danger">
        Cancel
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 text-sm" role="group" aria-label={`Confirm cancelling ${className}`}>
      <p className="text-stone">{late ? "This class starts in under twelve hours, so the credit will not be returned." : "More than twelve hours away, so your credit returns to your account."}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => {
            cancelBooking(bookingId);
            setConfirming(false);
            onDone?.(late ? `${className} cancelled. Late cancellation, credit not returned.` : `${className} cancelled. Credit returned to your account.`);
          }}
          className="eyebrow bg-charcoal px-4 py-2 text-ivory hover:bg-mocha"
        >
          Confirm cancel
        </button>
        <button type="button" onClick={() => setConfirming(false)} className="eyebrow px-4 py-2 text-stone hover:text-charcoal">
          Keep booking
        </button>
      </div>
    </div>
  );
}
