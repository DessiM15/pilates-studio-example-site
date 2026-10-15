import type { Booking, Client, Purchase, StudioState, User } from "./types";
import { buildSessions, toDateKey } from "@/lib/data/schedule";

export const demoClient: User = {
  id: "u-avery",
  role: "client",
  name: "Avery Chen",
  firstName: "Avery",
  email: "avery.chen@example.com",
  phone: "(713) 555-0188",
  memberSince: "2026-11-03",
};

export const demoOwner: User = {
  id: "u-camille",
  role: "owner",
  name: "Camille Beaumont",
  firstName: "Camille",
  email: "camille@aurellepilates.com",
  memberSince: "2026-01-01",
};

const firstNames = ["Avery", "Priya", "Jordan", "Alexis", "Devin", "Maya", "Sofia", "Lena", "Noah", "Isabel", "Grace", "Elena", "Tariq", "Nina", "Olivia", "Hannah", "Marcus", "Claire", "Zoe", "Amara"];
const lastInitials = ["Chen", "Nair", "Mitchell", "Rivera", "Okoro", "Patel", "Alvarez", "Kim", "Brooks", "Santos", "Lee", "Moreau", "Hassan", "Volkov", "Price", "Wright", "Dubois", "Reed", "Park", "Diallo"];

export function seedClients(): Client[] {
  return firstNames.map((f, i) => {
    const name = `${f} ${lastInitials[i]}`;
    const tags = i % 5 === 0 ? ["Unlimited"] : i % 3 === 0 ? ["Private client"] : i % 4 === 0 ? ["Prenatal"] : ["10 pack"];
    return {
      id: `c-${i + 1}`,
      name,
      firstName: f,
      email: `${f.toLowerCase()}.${lastInitials[i].toLowerCase()}@example.com`,
      phone: `(713) 555-01${(10 + i).toString().padStart(2, "0")}`,
      memberSince: `2026-11-${((i % 20) + 1).toString().padStart(2, "0")}`,
      credits: i % 5 === 0 ? 0 : (i * 3) % 11,
      unlimitedUntil: i % 5 === 0 ? "2026-12-31" : undefined,
      tags,
    };
  });
}

/** Give the demo client a realistic history relative to today. */
export function seedState(): StudioState {
  const today = new Date();
  const sessions = buildSessions(today, 14);
  const pick = (idx: number) => sessions.filter((s) => s.booked < s.capacity)[idx];
  const upcoming1 = pick(3);
  const upcoming2 = pick(11);
  const bookings: Booking[] = [];
  if (upcoming1) bookings.push({ id: "b-1", sessionId: upcoming1.id, userId: demoClient.id, userName: demoClient.name, status: "booked", createdAt: new Date(today.getTime() - 86400000 * 2).toISOString(), source: "portal" });
  if (upcoming2) bookings.push({ id: "b-2", sessionId: upcoming2.id, userId: demoClient.id, userName: demoClient.name, status: "booked", createdAt: new Date(today.getTime() - 86400000).toISOString(), source: "website" });

  const purchases: Purchase[] = [
    { id: "p-1", packageId: "intro-3", userId: demoClient.id, userName: demoClient.name, amount: 59, credits: 3, purchasedAt: "2026-11-03T15:12:00.000Z", expiresAt: "2026-11-17", via: "stripe" },
    { id: "p-2", packageId: "pack-10", userId: demoClient.id, userName: demoClient.name, amount: 330, credits: 10, purchasedAt: "2026-11-15T19:40:00.000Z", expiresAt: `${toDateKey(new Date(today.getTime() + 86400000 * 70))}`, via: "stripe" },
  ];

  return {
    version: 1,
    user: null,
    credits: 7,
    unlimitedUntil: null,
    bookings,
    purchases,
    clients: seedClients(),
    overrides: [],
    addedSessions: [],
    announcements: [
      { id: "a-1", text: "Holiday schedule: the studio closes at noon on November 26 and reopens November 28.", active: true, createdAt: "2026-11-10T12:00:00.000Z" },
    ],
  };
}
