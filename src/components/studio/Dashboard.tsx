"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import { getClassType } from "@/lib/data/classes";
import { getInstructor } from "@/lib/data/instructors";
import { getPackage } from "@/lib/data/packages";
import { formatDateShort, formatTime } from "@/lib/data/schedule";
import { Card, Eyebrow, Empty, Progress } from "./ui";
import { dayKeys, isCancelled, money, todayKey } from "./helpers";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function Dashboard() {
  const { state, sessions } = useStudio();
  const today = todayKey();
  const week = dayKeys(7);

  const userBookingsFor = (sessionId: string) => state.bookings.filter((b) => b.sessionId === sessionId && b.status === "booked").length;

  const todaySessions = useMemo(() => sessions.filter((s) => s.date === today && !isCancelled(s)), [sessions, today]);
  const bookingsToday = todaySessions.reduce((n, s) => n + s.booked + userBookingsFor(s.id), 0);

  const now = new Date();
  const revenueMonth = state.purchases
    .filter((p) => {
      const d = new Date(p.purchasedAt);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    })
    .reduce((n, p) => n + p.amount, 0);

  const weekSessions = sessions.filter((s) => week.includes(s.date) && !isCancelled(s));
  const weekCap = weekSessions.reduce((n, s) => n + s.capacity, 0);
  const weekBooked = weekSessions.reduce((n, s) => n + s.booked + userBookingsFor(s.id), 0);
  const fillRate = weekCap ? Math.round((weekBooked / weekCap) * 100) : 0;

  const chart = week.map((d) => ({
    date: d,
    total: sessions.filter((s) => s.date === d && !isCancelled(s)).reduce((n, s) => n + s.booked + userBookingsFor(s.id), 0),
  }));
  const chartMax = Math.max(1, ...chart.map((c) => c.total));

  const recent = [...state.purchases].sort((a, b) => b.purchasedAt.localeCompare(a.purchasedAt)).slice(0, 5);
  const announcements = state.announcements.filter((a) => a.active);

  const kpis = [
    { label: "Classes today", value: String(todaySessions.length) },
    { label: "Bookings today", value: String(bookingsToday) },
    { label: "Revenue this month", value: money(revenueMonth) },
    { label: "Active clients", value: String(state.clients.length) },
    { label: "Fill rate this week", value: `${fillRate}%` },
  ];

  return (
    <div>
      <div className="mb-10">
        <Eyebrow>{formatDateShort(today)}</Eyebrow>
        <h1 className="mt-3 font-serif text-h2 font-light text-charcoal">
          {greeting()}, {state.user?.firstName ?? "there"}
        </h1>
        <p className="mt-3 text-stone">Here is how the studio looks right now.</p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {kpis.map((k) => (
          <div key={k.label} className="border border-charcoal/10 bg-white p-5">
            <dt className="text-[0.6875rem] uppercase tracking-[0.18em] text-stone">{k.label}</dt>
            <dd className="mt-2 font-serif text-4xl font-light text-charcoal">{k.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Today</Eyebrow>
              <h2 className="mt-2 font-serif text-3xl font-light text-charcoal">Classes on the floor</h2>
            </div>
            <Link href="/studio/schedule" className="text-xs underline underline-offset-4 text-stone hover:text-charcoal">
              Manage schedule
            </Link>
          </div>
          {todaySessions.length === 0 ? (
            <Empty>No classes scheduled today.</Empty>
          ) : (
            <ul className="mt-6 divide-y divide-charcoal/10">
              {todaySessions.map((s) => {
                const ct = getClassType(s.classTypeId);
                const who = getInstructor(s.instructorSlug);
                const booked = s.booked + userBookingsFor(s.id);
                return (
                  <li key={s.id} className="grid gap-3 py-4 sm:grid-cols-12 sm:items-center">
                    <div className="sm:col-span-2 font-serif text-xl text-charcoal">{formatTime(s.time)}</div>
                    <div className="sm:col-span-4">
                      <p className="text-charcoal">{ct?.name}</p>
                      <p className="text-xs text-stone">{ct?.room}</p>
                    </div>
                    <div className="sm:col-span-3 text-sm text-stone">{who?.name}</div>
                    <div className="sm:col-span-3">
                      <p className="mb-1 text-xs text-stone">
                        {booked} of {s.capacity} booked
                      </p>
                      <Progress value={booked} max={s.capacity} label={`${ct?.name} at ${formatTime(s.time)}, ${booked} of ${s.capacity} booked`} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card className="lg:col-span-5">
          <figure>
            <figcaption>
              <Eyebrow>Next seven days</Eyebrow>
              <h2 className="mt-2 font-serif text-3xl font-light text-charcoal">Bookings by day</h2>
            </figcaption>
            <div className="mt-8 flex h-48 items-end gap-3" aria-hidden="false">
              {chart.map((c) => (
                <div key={c.date} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-40 w-full items-end bg-linen/40">
                    <div className="w-full bg-gold-deep" style={{ height: `${Math.round((c.total / chartMax) * 100)}%` }}>
                      <span className="sr-only">
                        {formatDateShort(c.date)}: {c.total} bookings
                      </span>
                    </div>
                  </div>
                  <span aria-hidden="true" className="text-[0.625rem] uppercase tracking-[0.12em] text-stone">
                    {formatDateShort(c.date).slice(0, 3)}
                  </span>
                </div>
              ))}
            </div>
          </figure>
        </Card>

        <Card className="lg:col-span-7">
          <Eyebrow>Recent purchases</Eyebrow>
          <h2 className="mt-2 font-serif text-3xl font-light text-charcoal">Sales</h2>
          {recent.length === 0 ? (
            <Empty>No purchases yet.</Empty>
          ) : (
            <ul className="mt-6 divide-y divide-charcoal/10 text-sm">
              {recent.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="text-charcoal">{p.userName}</p>
                    <p className="text-xs text-stone">
                      {getPackage(p.packageId)?.name ?? p.packageId}, via {p.via}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-xl text-charcoal">{money(p.amount)}</p>
                    <p className="text-xs text-stone">{new Date(p.purchasedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="lg:col-span-5">
          <Eyebrow>Announcements</Eyebrow>
          <h2 className="mt-2 font-serif text-3xl font-light text-charcoal">Live on the site</h2>
          {announcements.length === 0 ? (
            <Empty>No active announcements.</Empty>
          ) : (
            <ul className="mt-6 space-y-4 text-sm">
              {announcements.map((a) => (
                <li key={a.id} className="border-l-2 border-gold-deep pl-4 text-charcoal">
                  {a.text}
                </li>
              ))}
            </ul>
          )}
          <Link href="/studio/settings" className="mt-6 inline-block text-xs underline underline-offset-4 text-stone hover:text-charcoal">
            Edit announcements
          </Link>
        </Card>
      </div>
    </div>
  );
}
