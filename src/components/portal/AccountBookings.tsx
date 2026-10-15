"use client";

import Link from "next/link";
import { useState } from "react";
import { clsx } from "clsx";
import { formatDateLong, formatTime } from "@/lib/data/schedule";
import { useBookingViews, statusLabel, type BookingView } from "./useBookingViews";
import { CancelBookingButton } from "./CancelBookingButton";

export function AccountBookings() {
  const { upcoming, past } = useBookingViews();
  const [msg, setMsg] = useState("");

  return (
    <div>
      <h1 className="font-serif text-h2 font-light text-charcoal">Your bookings</h1>
      <p className="mt-3 text-stone">Cancel free up to twelve hours before class and the credit returns to your account.</p>
      <p role="status" aria-live="polite" className="mt-4 text-sm text-success">
        {msg}
      </p>

      <section className="mt-10" aria-labelledby="upcoming-title">
        <h2 id="upcoming-title" className="eyebrow text-stone">
          Upcoming
        </h2>
        <ol className="mt-4 divide-y divide-charcoal/10 border-y border-charcoal/10">
          {upcoming.length === 0 && (
            <li className="py-10 text-stone">
              No upcoming classes.{" "}
              <Link href="/schedule" className="underline underline-offset-4 decoration-gold-deep/60 hover:decoration-gold-deep">
                Book one now.
              </Link>
            </li>
          )}
          {upcoming.map((v) => (
            <BookingRow key={v.booking.id} v={v}>
              <CancelBookingButton bookingId={v.booking.id} startsAtMs={v.startsAtMs} className={v.className} onDone={setMsg} />
            </BookingRow>
          ))}
        </ol>
      </section>

      <section className="mt-14" aria-labelledby="past-title">
        <h2 id="past-title" className="eyebrow text-stone">
          Past and cancelled
        </h2>
        <ol className="mt-4 divide-y divide-charcoal/10 border-y border-charcoal/10">
          {past.length === 0 && <li className="py-10 text-stone">No history yet.</li>}
          {past.map((v) => (
            <BookingRow key={v.booking.id} v={v}>
              <span className={clsx("eyebrow border px-3 py-1.5", v.booking.status === "attended" ? "border-success text-success" : v.booking.status === "booked" ? "border-charcoal/20 text-stone" : "border-danger/40 text-danger")}>
                {v.booking.status === "booked" ? "Completed" : statusLabel[v.booking.status]}
              </span>
            </BookingRow>
          ))}
        </ol>
      </section>
    </div>
  );
}

function BookingRow({ v, children }: { v: BookingView; children: React.ReactNode }) {
  return (
    <li className="grid gap-3 py-5 sm:grid-cols-12 sm:items-center sm:gap-6">
      <div className="sm:col-span-4">
        <p className="text-xs uppercase tracking-[0.18em] text-stone">{v.date ? formatDateLong(v.date) : "Date unavailable"}</p>
        <p className="font-serif text-2xl text-charcoal">{v.time ? formatTime(v.time) : ""}</p>
      </div>
      <div className="sm:col-span-5">
        <p className="font-serif text-2xl text-charcoal">{v.className}</p>
        <p className="text-sm text-stone">
          {v.instructorSlug ? (
            <Link href={`/instructors/${v.instructorSlug}`} className="underline-offset-4 hover:underline">
              {v.instructorName}
            </Link>
          ) : (
            v.instructorName
          )}
          , {v.room}
        </p>
      </div>
      <div className="sm:col-span-3 sm:text-right">{children}</div>
    </li>
  );
}
