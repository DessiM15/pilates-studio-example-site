"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { useStudio } from "@/lib/store/StudioProvider";
import { classTypes, getClassType } from "@/lib/data/classes";
import { instructors, getInstructor } from "@/lib/data/instructors";
import { formatDateShort, formatTime, toDateKey, formatDateLong } from "@/lib/data/schedule";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { BookingDialog } from "./BookingDialog";
import { spotsLabel, useNow, type SessionWithFlags } from "./helpers";

export function ScheduleBoard() {
  const params = useSearchParams();
  const { sessions, spotsLeft, isBooked, hydrated } = useStudio();
  const days = useMemo(() => {
    const out: string[] = [];
    const start = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      out.push(toDateKey(d));
    }
    return out;
  }, []);

  const [day, setDay] = useState(days[0]);
  const [classFilter, setClassFilter] = useState(params.get("class") ?? "all");
  const [whoFilter, setWhoFilter] = useState("all");
  const [showFull, setShowFull] = useState(true);
  const [active, setActive] = useState<SessionWithFlags | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Preselect a session from ?session=
  const preselect = params.get("session");
  const [handledPreselect, setHandledPreselect] = useState<string | null>(null);
  if (preselect && hydrated && handledPreselect !== preselect) {
    setHandledPreselect(preselect);
    const s = sessions.find((x) => x.id === preselect) as SessionWithFlags | undefined;
    if (s) {
      setDay(s.date);
      setActive(s);
    }
  }

  const now = useNow();
  const rows = sessions.filter((s) => {
    if (s.date !== day) return false;
    if (new Date(s.startsAt).getTime() < now) return false;
    if (classFilter !== "all" && s.classTypeId !== classFilter) return false;
    if (whoFilter !== "all" && s.instructorSlug !== whoFilter) return false;
    if (!showFull && spotsLeft(s) <= 0) return false;
    return true;
  }) as SessionWithFlags[];

  return (
    <section className="bg-ivory pb-24 sm:pb-32" aria-labelledby="board-title">
      <Container wide>
        <h2 id="board-title" className="sr-only">
          Choose a day and class
        </h2>

        <nav aria-label="Choose a day" className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <ul className="flex min-w-max gap-2 border-y border-charcoal/10 py-4">
            {days.map((d) => {
              const [y, m, dd] = d.split("-").map(Number);
              const date = new Date(y, m - 1, dd);
              const selected = d === day;
              return (
                <li key={d}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDay(d)}
                    className={clsx(
                      "flex w-20 flex-col items-center gap-1 border px-2 py-3 transition",
                      selected ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/15 text-charcoal hover:border-charcoal",
                    )}
                  >
                    <span className="text-[0.625rem] uppercase tracking-[0.2em]">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                    <span className="font-serif text-2xl leading-none">{date.getDate()}</span>
                    <span className="text-[0.625rem] uppercase tracking-[0.2em] opacity-70">{date.toLocaleDateString("en-US", { month: "short" })}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:items-end">
          <div>
            <label htmlFor="filter-class" className="eyebrow text-stone">
              Class type
            </label>
            <select id="filter-class" value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="field mt-2 cursor-pointer">
              <option value="all">All classes</option>
              {classTypes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-who" className="eyebrow text-stone">
              Instructor
            </label>
            <select id="filter-who" value={whoFilter} onChange={(e) => setWhoFilter(e.target.value)} className="field mt-2 cursor-pointer">
              <option value="all">Any instructor</option>
              {instructors.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3 pb-3">
            <input id="filter-full" type="checkbox" checked={showFull} onChange={(e) => setShowFull(e.target.checked)} className="h-4 w-4 accent-charcoal" />
            <label htmlFor="filter-full" className="text-sm text-charcoal">
              Show full classes
            </label>
          </div>
        </div>

        <div className="mt-10 flex items-baseline justify-between">
          <h3 className="font-serif text-3xl font-light text-charcoal">{formatDateLong(day)}</h3>
          <p className="text-sm text-stone" aria-live="polite">
            {hydrated ? `${rows.length} ${rows.length === 1 ? "class" : "classes"}` : "Loading schedule"}
          </p>
        </div>

        <ol className="mt-6 divide-y divide-charcoal/10 border-y border-charcoal/10" aria-busy={!hydrated}>
          {rows.length === 0 && (
            <li className="py-12 text-center text-stone">No classes match those filters. Try another day or clear a filter.</li>
          )}
          {rows.map((s) => {
            const ct = getClassType(s.classTypeId);
            const who = getInstructor(s.instructorSlug);
            const left = spotsLeft(s);
            const booked = isBooked(s.id);
            return (
              <li key={s.id} className={clsx("grid items-center gap-3 py-5 sm:grid-cols-12 sm:gap-6", s.cancelled && "opacity-60")}>
                <div className="sm:col-span-2">
                  <p className="font-serif text-2xl text-charcoal">{formatTime(s.time)}</p>
                  <p className="text-xs text-stone">{ct?.duration} min</p>
                </div>
                <div className="sm:col-span-4">
                  <p className="font-serif text-2xl text-charcoal">
                    {ct?.name}
                    {s.cancelled && <span className="ml-3 align-middle text-xs uppercase tracking-[0.18em] text-danger">Cancelled</span>}
                  </p>
                  <p className="text-sm text-stone">{ct?.level}</p>
                </div>
                <div className="sm:col-span-3">
                  <Link href={`/instructors/${who?.slug}`} className="text-sm text-charcoal underline-offset-4 hover:underline">
                    {who?.name}
                  </Link>
                  <p className="text-xs text-stone">{ct?.room}</p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:col-span-3 sm:justify-end">
                  <span className={clsx("text-xs uppercase tracking-[0.18em]", left <= 2 ? "text-gold-deep" : "text-stone")}>{s.cancelled ? "" : spotsLabel(left)}</span>
                  {booked ? (
                    <span className="eyebrow border border-charcoal/20 px-5 py-3 text-stone">Booked</span>
                  ) : (
                    <button
                      type="button"
                      disabled={Boolean(s.cancelled)}
                      onClick={(e) => {
                        triggerRef.current = e.currentTarget;
                        setActive(s);
                      }}
                      className="eyebrow bg-charcoal px-5 py-3 text-ivory transition hover:bg-mocha disabled:opacity-40"
                      aria-label={`${left <= 0 ? "Join waitlist for" : "Book"} ${ct?.name} at ${formatTime(s.time)} on ${formatDateShort(s.date)}`}
                    >
                      {left <= 0 ? "Waitlist" : "Book"}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-col gap-4 text-sm text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>Book up to fourteen days ahead. Cancel free up to twelve hours before class.</p>
          {site.classpass.enabled && (
            <a href={site.classpass.url} target="_blank" rel="noopener noreferrer" className="eyebrow text-charcoal underline underline-offset-4 decoration-gold-deep/60 hover:decoration-gold-deep">
              Also bookable on ClassPass
            </a>
          )}
        </div>
      </Container>

      <BookingDialog session={active} onClose={() => setActive(null)} returnFocusRef={triggerRef} />
    </section>
  );
}
