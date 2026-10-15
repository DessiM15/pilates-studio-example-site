"use client";

import { useMemo } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import type { Booking } from "@/lib/store/types";
import { getClassType } from "@/lib/data/classes";
import { getInstructor } from "@/lib/data/instructors";
import { dateFromSessionId, useNow } from "@/components/sections/booking/helpers";

export type BookingView = {
  booking: Booking;
  className: string;
  instructorName: string;
  instructorSlug?: string;
  room: string;
  date?: string;
  time?: string;
  startsAtMs: number | null;
  inWindow: boolean;
};

/** Joins bookings to sessions, falling back to the date encoded in the session id. */
export function useBookingViews() {
  const { state, sessions } = useStudio();
  const now = useNow();
  return useMemo(() => {
    const mine = state.bookings.filter((b) => b.userId === (state.user?.id ?? "u-avery"));
    const views: BookingView[] = mine.map((b) => {
      const s = sessions.find((x) => x.id === b.sessionId);
      const fromId = dateFromSessionId(b.sessionId);
      const classTypeId = s?.classTypeId ?? b.sessionId.replace(/^\d{4}-\d{2}-\d{2}-\d{4}-/, "");
      const ct = getClassType(classTypeId);
      const who = s ? getInstructor(s.instructorSlug) : undefined;
      const date = s?.date ?? fromId.date;
      const time = s?.time ?? fromId.time;
      let startsAtMs: number | null = s ? new Date(s.startsAt).getTime() : null;
      if (startsAtMs === null && date && time) {
        const [y, m, d] = date.split("-").map(Number);
        const [hh, mm] = time.split(":").map(Number);
        startsAtMs = new Date(y, m - 1, d, hh, mm).getTime();
      }
      return {
        booking: b,
        className: ct?.name ?? "Class",
        instructorName: who?.name ?? "Studio instructor",
        instructorSlug: who?.slug,
        room: ct?.room ?? "Studio",
        date,
        time,
        startsAtMs,
        inWindow: Boolean(s),
      };
    });
    const upcoming = views.filter((v) => v.booking.status === "booked" && (v.startsAtMs ?? 0) > now).sort((a, b) => (a.startsAtMs ?? 0) - (b.startsAtMs ?? 0));
    const past = views.filter((v) => !(v.booking.status === "booked" && (v.startsAtMs ?? 0) > now)).sort((a, b) => (b.startsAtMs ?? 0) - (a.startsAtMs ?? 0));
    return { upcoming, past };
  }, [state.bookings, state.user, sessions, now]);
}

export const statusLabel: Record<Booking["status"], string> = {
  booked: "Booked",
  cancelled: "Cancelled",
  attended: "Attended",
  "late-cancel": "Late cancel",
  "no-show": "No show",
};
