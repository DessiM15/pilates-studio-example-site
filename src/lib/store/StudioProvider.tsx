"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { AddedSession, Booking, Purchase, Role, SessionOverride, StudioState, User } from "./types";
import { demoClient, demoOwner, seedState } from "./seed";
import { buildSessions, type Session } from "@/lib/data/schedule";
import { getClassType } from "@/lib/data/classes";
import { getPackage } from "@/lib/data/packages";

const STORAGE_KEY = "aurelle-studio-v1";

type Ctx = {
  state: StudioState;
  hydrated: boolean;
  /** All sessions for the next 14 days with owner overrides and additions applied. */
  sessions: Session[];
  login: (role: Role) => void;
  logout: () => void;
  book: (sessionId: string) => { ok: true; booking: Booking } | { ok: false; reason: string };
  cancelBooking: (bookingId: string) => void;
  purchase: (packageId: string, via: Purchase["via"]) => Purchase | null;
  spotsLeft: (session: Session) => number;
  isBooked: (sessionId: string) => boolean;
  // owner actions
  setOverride: (o: SessionOverride) => void;
  addSession: (s: Omit<AddedSession, "id">) => void;
  removeAddedSession: (id: string) => void;
  markBooking: (bookingId: string, status: Booking["status"]) => void;
  addClientNote: (clientId: string, note: string) => void;
  adjustClientCredits: (clientId: string, delta: number) => void;
  toggleAnnouncement: (id: string) => void;
  addAnnouncement: (text: string) => void;
  reset: () => void;
};

const StudioContext = createContext<Ctx | null>(null);

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

const subscribeStorage = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};
const readStorage = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};
const serverSnapshot = () => undefined;

export function StudioProvider({ children }: { children: ReactNode }) {
  // Persisted snapshot comes from an external store so hydration needs no effect.
  // undefined means "server render", null means "nothing saved yet".
  const raw = useSyncExternalStore(subscribeStorage, readStorage, serverSnapshot);
  const hydrated = raw !== undefined;
  const seed = useMemo(() => seedState(), []);
  const persisted = useMemo<StudioState | null>(() => {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as StudioState;
      return parsed && parsed.version === 1 ? { ...seed, ...parsed } : null;
    } catch {
      return null;
    }
  }, [raw, seed]);
  const [local, setLocal] = useState<StudioState | null>(null);
  const state = local ?? persisted ?? seed;

  const setState = useCallback(
    (fn: (s: StudioState) => StudioState) => setLocal((prev) => fn(prev ?? persisted ?? seed)),
    [persisted, seed],
  );

  // Mirror local changes to storage: React state drives the external system.
  useEffect(() => {
    if (!local) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(local));
    } catch {
      /* storage unavailable: keep running in memory */
    }
  }, [local]);

  const baseSessions = useMemo(() => buildSessions(new Date(), 14), []);

  const sessions = useMemo<Session[]>(() => {
    const added: Session[] = state.addedSessions.map((a) => {
      const [hh, mm] = a.time.split(":").map(Number);
      const [y, m, d] = a.date.split("-").map(Number);
      return {
        id: a.id,
        date: a.date,
        time: a.time,
        startsAt: new Date(y, m - 1, d, hh, mm).toISOString(),
        classTypeId: a.classTypeId,
        instructorSlug: a.instructorSlug,
        capacity: a.capacity,
        booked: 0,
      };
    });
    return [...baseSessions, ...added]
      .map((s) => {
        const o = state.overrides.find((x) => x.sessionId === s.id);
        if (!o) return s;
        return { ...s, instructorSlug: o.instructorSlug ?? s.instructorSlug, capacity: o.capacity ?? s.capacity, cancelled: o.cancelled };
      })
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  }, [baseSessions, state.addedSessions, state.overrides]);

  const spotsLeft = useCallback(
    (session: Session) => {
      const mine = state.bookings.filter((b) => b.sessionId === session.id && b.status === "booked").length;
      return Math.max(0, session.capacity - session.booked - mine);
    },
    [state.bookings],
  );

  const isBooked = useCallback(
    (sessionId: string) => state.bookings.some((b) => b.sessionId === sessionId && b.userId === state.user?.id && b.status === "booked"),
    [state.bookings, state.user],
  );

  const login = useCallback((role: Role) => {
    setState((s) => ({ ...s, user: role === "owner" ? demoOwner : demoClient }));
  }, [setState]);

  const logout = useCallback(() => setState((s) => ({ ...s, user: null })), []);

  const book = useCallback<Ctx["book"]>(
    (sessionId) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (!session) return { ok: false, reason: "That class could not be found." };
      if (session.cancelled) return { ok: false, reason: "That class has been cancelled." };
      const user = state.user ?? demoClient;
      if (state.bookings.some((b) => b.sessionId === sessionId && b.userId === user.id && b.status === "booked")) {
        return { ok: false, reason: "You are already booked into this class." };
      }
      if (spotsLeft(session) <= 0) return { ok: false, reason: "This class is full. Join the waitlist from your portal." };
      const ct = getClassType(session.classTypeId);
      const needs = ct?.credits ?? 1;
      const unlimited = state.unlimitedUntil && state.unlimitedUntil >= session.date;
      if (!unlimited && state.credits < needs) return { ok: false, reason: "You need a class credit to book. Choose a package first." };
      const booking: Booking = {
        id: uid("b"),
        sessionId,
        userId: user.id,
        userName: user.name,
        status: "booked",
        createdAt: new Date().toISOString(),
        source: "website",
      };
      setState((s) => ({
        ...s,
        user: s.user ?? demoClient,
        credits: unlimited ? s.credits : s.credits - needs,
        bookings: [booking, ...s.bookings],
      }));
      return { ok: true, booking };
    },
    [sessions, state.bookings, state.credits, state.unlimitedUntil, state.user, spotsLeft],
  );

  const cancelBooking = useCallback((bookingId: string) => {
    setState((s) => {
      const b = s.bookings.find((x) => x.id === bookingId);
      if (!b || b.status !== "booked") return s;
      const session = sessions.find((x) => x.id === b.sessionId);
      const hoursAway = session ? (new Date(session.startsAt).getTime() - Date.now()) / 3600000 : 99;
      const late = hoursAway < 12;
      const ct = session ? getClassType(session.classTypeId) : undefined;
      const refund = late ? 0 : ct?.credits ?? 1;
      const unlimited = s.unlimitedUntil && session && s.unlimitedUntil >= session.date;
      return {
        ...s,
        credits: unlimited ? s.credits : s.credits + refund,
        bookings: s.bookings.map((x) => (x.id === bookingId ? { ...x, status: late ? "late-cancel" : "cancelled" } : x)),
      };
    });
  }, [sessions, setState]);

  const purchase = useCallback<Ctx["purchase"]>((packageId, via) => {
    const pkg = getPackage(packageId);
    if (!pkg) return null;
    const now = new Date();
    const days = pkg.expiresIn.includes("14") ? 14 : pkg.expiresIn.includes("60") ? 60 : pkg.expiresIn.includes("90") ? 90 : 30;
    const expires = new Date(now.getTime() + days * 86400000);
    const p: Purchase = {
      id: uid("p"),
      packageId,
      userId: demoClient.id,
      userName: demoClient.name,
      amount: pkg.price,
      credits: pkg.credits,
      purchasedAt: now.toISOString(),
      expiresAt: expires.toISOString().slice(0, 10),
      via,
    };
    setState((s) => ({
      ...s,
      user: s.user ?? demoClient,
      credits: pkg.credits === "unlimited" ? s.credits : s.credits + pkg.credits,
      unlimitedUntil: pkg.credits === "unlimited" ? expires.toISOString().slice(0, 10) : s.unlimitedUntil,
      purchases: [p, ...s.purchases],
    }));
    return p;
  }, [setState]);

  const setOverride = useCallback((o: SessionOverride) => {
    setState((s) => ({ ...s, overrides: [...s.overrides.filter((x) => x.sessionId !== o.sessionId), { ...s.overrides.find((x) => x.sessionId === o.sessionId), ...o }] }));
  }, [setState]);

  const addSession = useCallback((a: Omit<AddedSession, "id">) => {
    setState((s) => ({ ...s, addedSessions: [...s.addedSessions, { ...a, id: uid("s") }] }));
  }, [setState]);

  const removeAddedSession = useCallback((id: string) => {
    setState((s) => ({ ...s, addedSessions: s.addedSessions.filter((x) => x.id !== id) }));
  }, [setState]);

  const markBooking = useCallback((bookingId: string, status: Booking["status"]) => {
    setState((s) => ({ ...s, bookings: s.bookings.map((b) => (b.id === bookingId ? { ...b, status } : b)) }));
  }, [setState]);

  const addClientNote = useCallback((clientId: string, note: string) => {
    setState((s) => ({ ...s, clients: s.clients.map((c) => (c.id === clientId ? { ...c, notes: note } : c)) }));
  }, [setState]);

  const adjustClientCredits = useCallback((clientId: string, delta: number) => {
    setState((s) => ({ ...s, clients: s.clients.map((c) => (c.id === clientId ? { ...c, credits: Math.max(0, c.credits + delta) } : c)) }));
  }, [setState]);

  const toggleAnnouncement = useCallback((id: string) => {
    setState((s) => ({ ...s, announcements: s.announcements.map((a) => (a.id === id ? { ...a, active: !a.active } : a)) }));
  }, [setState]);

  const addAnnouncement = useCallback((text: string) => {
    setState((s) => ({ ...s, announcements: [{ id: uid("a"), text, active: true, createdAt: new Date().toISOString() }, ...s.announcements] }));
  }, [setState]);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setLocal(seedState());
  }, []);

  const value = useMemo<Ctx>(
    () => ({ state, hydrated, sessions, login, logout, book, cancelBooking, purchase, spotsLeft, isBooked, setOverride, addSession, removeAddedSession, markBooking, addClientNote, adjustClientCredits, toggleAnnouncement, addAnnouncement, reset }),
    [state, hydrated, sessions, login, logout, book, cancelBooking, purchase, spotsLeft, isBooked, setOverride, addSession, removeAddedSession, markBooking, addClientNote, adjustClientCredits, toggleAnnouncement, addAnnouncement, reset],
  );

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used inside StudioProvider");
  return ctx;
}

export type { User, Booking, Purchase, Session };
