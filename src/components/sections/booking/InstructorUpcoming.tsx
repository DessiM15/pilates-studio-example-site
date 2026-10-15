"use client";

import Link from "next/link";
import { useStudio } from "@/lib/store/StudioProvider";
import { getClassType } from "@/lib/data/classes";
import { formatDateShort, formatTime } from "@/lib/data/schedule";
import { spotsLabel, useNow } from "./helpers";
import { clsx } from "clsx";

export function InstructorUpcoming({ slug, firstName }: { slug: string; firstName: string }) {
  const { sessions, spotsLeft, hydrated } = useStudio();
  const now = useNow();
  const list = sessions
    .filter((s) => s.instructorSlug === slug && new Date(s.startsAt).getTime() > now && !(s as { cancelled?: boolean }).cancelled)
    .slice(0, 6);

  return (
    <ol className="divide-y divide-charcoal/10 border-y border-charcoal/10" aria-busy={!hydrated}>
      {list.length === 0 && <li className="py-8 text-stone">No classes with {firstName} in the next two weeks. Book a private session instead.</li>}
      {list.map((s) => {
        const ct = getClassType(s.classTypeId);
        const left = spotsLeft(s);
        return (
          <li key={s.id} className="grid items-center gap-3 py-5 sm:grid-cols-12 sm:gap-6">
            <div className="sm:col-span-3">
              <p className="text-xs uppercase tracking-[0.18em] text-stone">{formatDateShort(s.date)}</p>
              <p className="font-serif text-2xl text-charcoal">{formatTime(s.time)}</p>
            </div>
            <div className="sm:col-span-5">
              <p className="font-serif text-2xl text-charcoal">{ct?.name}</p>
              <p className="text-sm text-stone">
                {ct?.duration} min, {ct?.level}, {ct?.room}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 sm:col-span-4 sm:justify-end">
              <span className={clsx("text-xs uppercase tracking-[0.18em]", left <= 2 ? "text-gold-deep" : "text-stone")}>{spotsLabel(left)}</span>
              <Link href={`/schedule?session=${s.id}`} className="eyebrow border-b border-charcoal pb-1 text-charcoal transition hover:border-gold-deep hover:text-gold-deep">
                Book
              </Link>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
