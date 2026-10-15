"use client";

import Link from "next/link";
import { useState } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import { formatDateLong, formatTime } from "@/lib/data/schedule";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useBookingViews } from "./useBookingViews";
import { CancelBookingButton } from "./CancelBookingButton";

export function AccountOverview() {
  const { state } = useStudio();
  const { upcoming } = useBookingViews();
  const [msg, setMsg] = useState("");
  const next = upcoming[0];
  const announcements = state.announcements.filter((a) => a.active);

  return (
    <div>
      <h1 className="font-serif text-h2 font-light text-charcoal">Welcome back, {state.user?.firstName}</h1>
      <p className="mt-3 text-stone">Here is where you stand this week.</p>

      {announcements.length > 0 && (
        <ul className="mt-8 space-y-2" aria-label="Studio announcements">
          {announcements.map((a) => (
            <li key={a.id} className="border-l-2 border-gold-deep bg-sand p-4 text-sm text-charcoal">
              {a.text}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="on-dark relative overflow-hidden bg-charcoal p-8 text-ivory grain" aria-labelledby="credits-title">
          <div className="relative">
            <Eyebrow light>
              <span id="credits-title">Class credits</span>
            </Eyebrow>
            <p className="mt-4 font-serif text-7xl font-light">{state.unlimitedUntil ? "Unlimited" : state.credits}</p>
            <p className="mt-2 text-sm text-ivory/70">{state.unlimitedUntil ? `Membership active through ${state.unlimitedUntil}` : state.credits === 1 ? "credit available" : "credits available"}</p>
            <Link href="/pricing" className="eyebrow mt-8 inline-block border border-ivory/50 px-5 py-3 transition hover:bg-ivory hover:text-charcoal">
              Buy a package
            </Link>
          </div>
        </section>

        <section className="border border-charcoal/10 bg-white p-8" aria-labelledby="next-title">
          <Eyebrow>
            <span id="next-title">Next class</span>
          </Eyebrow>
          {next ? (
            <div className="mt-4">
              <p className="font-serif text-3xl text-charcoal">{next.className}</p>
              <p className="mt-2 text-stone">
                {next.date ? formatDateLong(next.date) : ""}
                {next.time ? `, ${formatTime(next.time)}` : ""}
              </p>
              <p className="text-sm text-stone">
                {next.instructorName}, {next.room}
              </p>
              <div className="mt-6">
                <CancelBookingButton bookingId={next.booking.id} startsAtMs={next.startsAtMs} className={next.className} onDone={setMsg} />
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="font-serif text-3xl text-charcoal">Nothing booked yet</p>
              <p className="mt-2 text-stone">Mornings fill first. Pick a class for this week.</p>
            </div>
          )}
          <Link href="/schedule" className="eyebrow mt-6 inline-block bg-charcoal px-5 py-3 text-ivory transition hover:bg-mocha">
            Book a class
          </Link>
        </section>
      </div>
      <p role="status" aria-live="polite" className="mt-4 text-sm text-success">
        {msg}
      </p>

      <section className="mt-12 border-t border-charcoal/10 pt-8" aria-labelledby="quick-title">
        <h2 id="quick-title" className="eyebrow text-stone">
          Quick actions
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          <li>
            <Link href="/account/bookings" className="eyebrow border border-charcoal/20 px-5 py-3 text-charcoal transition hover:border-charcoal">
              All bookings ({upcoming.length} upcoming)
            </Link>
          </li>
          <li>
            <Link href="/account/purchases" className="eyebrow border border-charcoal/20 px-5 py-3 text-charcoal transition hover:border-charcoal">
              Purchase history
            </Link>
          </li>
          <li>
            <Link href="/classes/private-pilates" className="eyebrow border border-charcoal/20 px-5 py-3 text-charcoal transition hover:border-charcoal">
              Book a private
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
