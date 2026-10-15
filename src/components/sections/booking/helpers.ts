import type { Session } from "@/lib/data/schedule";
import { getClassType } from "@/lib/data/classes";
import { getInstructor } from "@/lib/data/instructors";
import { site } from "@/lib/site";

export type SessionWithFlags = Session & { cancelled?: boolean };

/** Pull the YYYY-MM-DD prefix out of a session id when the session itself is out of window. */
export function dateFromSessionId(id: string) {
  const m = id.match(/^(\d{4}-\d{2}-\d{2})-(\d{2})(\d{2})/);
  if (!m) return { date: undefined, time: undefined };
  return { date: m[1], time: `${m[2]}:${m[3]}` };
}

function toGcalStamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function googleCalendarUrl(session: Session) {
  const ct = getClassType(session.classTypeId);
  const who = getInstructor(session.instructorSlug);
  const start = new Date(session.startsAt);
  const end = new Date(start.getTime() + (ct?.duration ?? 50) * 60000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${ct?.name ?? "Pilates"} at ${site.name}`,
    dates: `${toGcalStamp(start)}/${toGcalStamp(end)}`,
    details: `${ct?.name ?? "Class"} with ${who?.name ?? "our instructor"} in the ${ct?.room ?? "studio"}.`,
    location: `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function spotsLabel(left: number) {
  if (left <= 0) return "Waitlist";
  if (left <= 2) return `${left} left`;
  return `${left} spots`;
}

import { useSyncExternalStore } from "react";

/** Current time rounded to the minute, refreshed on an interval. Stable across renders and safe for hydration. */
export function useNow(resolutionMs = 60000) {
  return useSyncExternalStore(
    (cb) => {
      const id = setInterval(cb, resolutionMs);
      return () => clearInterval(id);
    },
    () => Math.floor(Date.now() / resolutionMs) * resolutionMs,
    () => 0,
  );
}
