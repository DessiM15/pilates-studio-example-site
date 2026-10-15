import { classTypes, getClassType } from "./classes";
import { instructors } from "./instructors";

/**
 * A weekly template. The schedule page expands it into dated sessions for
 * the next two weeks so the site always looks live. day: 0 = Sunday.
 */
export type TemplateSlot = {
  day: number;
  time: string; // "06:00"
  classTypeId: string;
  instructorSlug: string;
};

const weekdays = [1, 2, 3, 4, 5];

const template: TemplateSlot[] = [
  // Early mornings
  ...weekdays.map((day) => ({ day, time: "06:00", classTypeId: "sunrise-reformer", instructorSlug: day % 2 ? "simone-okafor" : "harper-lindqvist" })),
  ...weekdays.map((day) => ({ day, time: "07:00", classTypeId: "reformer-flow", instructorSlug: "camille-beaumont" })),
  ...weekdays.map((day) => ({ day, time: "08:15", classTypeId: day % 2 ? "reformer-foundations" : "reformer-sculpt", instructorSlug: day % 2 ? "simone-okafor" : "camille-beaumont" })),
  // Mid morning
  ...weekdays.map((day) => ({ day, time: "09:30", classTypeId: day % 2 ? "mat-classical" : "mat-core-mobility", instructorSlug: "harper-lindqvist" })),
  { day: 1, time: "10:45", classTypeId: "prenatal-reformer", instructorSlug: "daniela-reyes" },
  { day: 3, time: "10:45", classTypeId: "prenatal-reformer", instructorSlug: "daniela-reyes" },
  { day: 5, time: "10:45", classTypeId: "postnatal-restore", instructorSlug: "daniela-reyes" },
  { day: 2, time: "10:45", classTypeId: "reformer-flow", instructorSlug: "simone-okafor" },
  { day: 4, time: "10:45", classTypeId: "jumpboard", instructorSlug: "simone-okafor" },
  // Lunch
  ...weekdays.map((day) => ({ day, time: "12:00", classTypeId: "reformer-flow", instructorSlug: day % 2 ? "camille-beaumont" : "simone-okafor" })),
  // Evenings
  ...weekdays.map((day) => ({ day, time: "17:30", classTypeId: day % 2 ? "reformer-sculpt" : "reformer-flow", instructorSlug: day % 2 ? "camille-beaumont" : "mateo-alvarez" })),
  ...weekdays.map((day) => ({ day, time: "18:30", classTypeId: day % 2 ? "reformer-foundations" : "jumpboard", instructorSlug: "simone-okafor" })),
  { day: 1, time: "19:30", classTypeId: "mat-core-mobility", instructorSlug: "harper-lindqvist" },
  { day: 3, time: "19:30", classTypeId: "mat-classical", instructorSlug: "harper-lindqvist" },
  { day: 2, time: "19:30", classTypeId: "postnatal-restore", instructorSlug: "daniela-reyes" },
  // Saturday
  { day: 6, time: "07:30", classTypeId: "sunrise-reformer", instructorSlug: "harper-lindqvist" },
  { day: 6, time: "08:30", classTypeId: "reformer-flow", instructorSlug: "camille-beaumont" },
  { day: 6, time: "09:30", classTypeId: "reformer-foundations", instructorSlug: "simone-okafor" },
  { day: 6, time: "10:30", classTypeId: "jumpboard", instructorSlug: "simone-okafor" },
  { day: 6, time: "11:30", classTypeId: "prenatal-reformer", instructorSlug: "daniela-reyes" },
  { day: 6, time: "12:30", classTypeId: "mat-classical", instructorSlug: "harper-lindqvist" },
  // Sunday
  { day: 0, time: "08:00", classTypeId: "reformer-flow", instructorSlug: "mateo-alvarez" },
  { day: 0, time: "09:00", classTypeId: "mat-core-mobility", instructorSlug: "harper-lindqvist" },
  { day: 0, time: "10:00", classTypeId: "reformer-sculpt", instructorSlug: "camille-beaumont" },
  { day: 0, time: "11:00", classTypeId: "postnatal-restore", instructorSlug: "daniela-reyes" },
];

export type Session = {
  id: string; // `${date}-${time}-${classTypeId}`
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  startsAt: string; // ISO
  classTypeId: string;
  instructorSlug: string;
  capacity: number;
  /** Seeded, deterministic "already booked" count so the schedule feels alive. */
  booked: number;
  /** Set by the owner portal when a class is cancelled. */
  cancelled?: boolean;
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function toDateKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function seeded(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

/**
 * Expand the template into dated sessions starting from `from` for `days` days.
 * Pure and deterministic for a given start date, so server and client agree.
 */
export function buildSessions(from: Date, days = 14): Session[] {
  const out: Session[] = [];
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const date = toDateKey(d);
    const slots = template.filter((t) => t.day === d.getDay());
    for (const slot of slots) {
      const ct = getClassType(slot.classTypeId);
      if (!ct) continue;
      const [hh, mm] = slot.time.split(":").map(Number);
      const startsAt = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hh, mm);
      const id = `${date}-${slot.time.replace(":", "")}-${slot.classTypeId}`;
      const fill = seeded(id);
      const booked = Math.min(ct.capacity, Math.floor(fill * (ct.capacity + 2)));
      out.push({
        id,
        date,
        time: slot.time,
        startsAt: startsAt.toISOString(),
        classTypeId: slot.classTypeId,
        instructorSlug: slot.instructorSlug,
        capacity: ct.capacity,
        booked,
      });
    }
  }
  return out.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export function formatTime(time: string) {
  const [hh, mm] = time.split(":").map(Number);
  const suffix = hh >= 12 ? "pm" : "am";
  const h = hh % 12 === 0 ? 12 : hh % 12;
  return `${h}:${pad(mm)} ${suffix}`;
}

export function formatDateLong(dateKey: string) {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateKey: string) {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export { classTypes, instructors };
