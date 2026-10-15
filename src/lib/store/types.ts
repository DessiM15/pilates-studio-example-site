export type Role = "client" | "owner";

export type User = {
  id: string;
  role: Role;
  name: string;
  firstName: string;
  email: string;
  phone?: string;
  memberSince: string;
};

export type Booking = {
  id: string;
  sessionId: string;
  userId: string;
  userName: string;
  status: "booked" | "cancelled" | "attended" | "late-cancel" | "no-show";
  createdAt: string;
  source: "website" | "portal" | "classpass" | "front-desk";
};

export type Purchase = {
  id: string;
  packageId: string;
  userId: string;
  userName: string;
  amount: number;
  credits: number | "unlimited";
  purchasedAt: string;
  expiresAt: string;
  via: "stripe" | "mock" | "front-desk";
};

export type Client = {
  id: string;
  name: string;
  firstName: string;
  email: string;
  phone?: string;
  memberSince: string;
  credits: number;
  unlimitedUntil?: string;
  tags: string[];
  notes?: string;
};

/** Owner side edits to the generated schedule. */
export type SessionOverride = {
  sessionId: string;
  cancelled?: boolean;
  instructorSlug?: string;
  capacity?: number;
  note?: string;
};

export type AddedSession = {
  id: string;
  date: string;
  time: string;
  classTypeId: string;
  instructorSlug: string;
  capacity: number;
};

export type Announcement = {
  id: string;
  text: string;
  active: boolean;
  createdAt: string;
};

export type StudioState = {
  version: number;
  user: User | null;
  credits: number;
  unlimitedUntil: string | null;
  bookings: Booking[];
  purchases: Purchase[];
  clients: Client[];
  overrides: SessionOverride[];
  addedSessions: AddedSession[];
  announcements: Announcement[];
};
