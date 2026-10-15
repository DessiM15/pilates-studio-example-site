"use client";

import Link from "next/link";
import { useStudio } from "@/lib/store/StudioProvider";
import { useNow } from "@/lib/hooks";
import { getClassType } from "@/lib/data/classes";
import { getInstructor } from "@/lib/data/instructors";
import { formatDateShort, formatTime } from "@/lib/data/schedule";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ScheduleTeaser() {
  const { sessions, spotsLeft, hydrated } = useStudio();
  const now = useNow();
  const upcoming = sessions
    .filter((s) => new Date(s.startsAt).getTime() > now && !s.cancelled)
    .slice(0, 6);

  return (
    <section className="border-t border-charcoal/10 bg-ivory py-24 sm:py-32" aria-labelledby="schedule-title">
      <Container wide>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading eyebrow="This week" title={<span id="schedule-title">Next up on the schedule</span>} lead="Book up to fourteen days ahead. Classes of eight fill fast, especially mornings." />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/schedule">Full schedule</Button>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <ol className="mt-14 divide-y divide-charcoal/10 border-y border-charcoal/10" aria-busy={!hydrated}>
            {upcoming.map((s) => {
              const ct = getClassType(s.classTypeId);
              const who = getInstructor(s.instructorSlug);
              const left = spotsLeft(s);
              return (
                <li key={s.id} className="grid items-center gap-3 py-5 sm:grid-cols-12 sm:gap-6">
                  <div className="sm:col-span-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-stone">{formatDateShort(s.date)}</p>
                    <p className="font-serif text-2xl text-charcoal">{formatTime(s.time)}</p>
                  </div>
                  <div className="sm:col-span-4">
                    <p className="font-serif text-2xl text-charcoal">{ct?.name}</p>
                    <p className="text-sm text-stone">{ct?.duration} min, {ct?.level}</p>
                  </div>
                  <div className="sm:col-span-3">
                    <p className="text-sm text-charcoal">{who?.name}</p>
                    <p className="text-xs text-stone">{ct?.room}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:col-span-2 sm:justify-end">
                    <span className={left <= 2 ? "text-xs uppercase tracking-[0.18em] text-gold-deep" : "text-xs uppercase tracking-[0.18em] text-stone"}>
                      {left === 0 ? "Waitlist" : left <= 2 ? `${left} left` : `${left} spots`}
                    </span>
                    <Link href={`/schedule?session=${s.id}`} className="eyebrow border-b border-charcoal pb-1 text-charcoal transition hover:text-gold-deep hover:border-gold-deep">
                      Book
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
