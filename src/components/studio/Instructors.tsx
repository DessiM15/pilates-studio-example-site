"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import { instructors } from "@/lib/data/instructors";
import { getClassType } from "@/lib/data/classes";
import { formatDateShort } from "@/lib/data/schedule";
import { Photo } from "@/components/ui/Photo";
import { Card, PageTitle, Table } from "./ui";
import { dayKeys, isCancelled } from "./helpers";

export function Instructors() {
  const { sessions } = useStudio();
  const week = useMemo(() => dayKeys(7), []);
  const live = sessions.filter((s) => !isCancelled(s));

  return (
    <div>
      <PageTitle eyebrow="Team" title="Instructors" lead="Who is teaching, how much, and what they are certified to lead." />

      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {instructors.map((i) => {
          const count = live.filter((s) => s.instructorSlug === i.slug).length;
          return (
            <li key={i.slug}>
              <Card as="article" className="flex h-full flex-col">
                <div className="flex gap-5">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-sand">
                    <Photo id={i.photo} sizes="80px" width={400} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-light text-charcoal">{i.name}</h2>
                    <p className="text-xs uppercase tracking-[0.16em] text-stone">{i.role}</p>
                    <p className="mt-3 text-sm text-charcoal">
                      <span className="font-serif text-3xl">{count}</span> <span className="text-stone">classes in the next 14 days</span>
                    </p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1 text-[0.6875rem] uppercase tracking-[0.14em]">
                  {i.teaches.map((t) => (
                    <li key={t} className="bg-sand px-2 py-1 text-charcoal">
                      {getClassType(t)?.name ?? t}
                    </li>
                  ))}
                </ul>
                <Link href={`/instructors/${i.slug}`} className="mt-auto pt-6 text-xs underline underline-offset-4 text-stone hover:text-charcoal">
                  Public profile
                </Link>
              </Card>
            </li>
          );
        })}
      </ul>

      <Card className="mt-8">
        <h2 className="font-serif text-2xl font-light text-charcoal">Weekly load</h2>
        <p className="mt-2 text-sm text-stone">Classes per instructor over the next seven days.</p>
        <Table className="mt-6" caption="Classes per instructor per day for the next seven days" head={["Instructor", ...week.map((d) => formatDateShort(d).slice(0, 3)), "Total"]}>
          {instructors.map((i) => {
            const counts = week.map((d) => live.filter((s) => s.instructorSlug === i.slug && s.date === d).length);
            return (
              <tr key={i.slug}>
                <th scope="row" className="py-3 pr-4 text-left font-normal text-charcoal">
                  {i.name}
                </th>
                {counts.map((c, n) => (
                  <td key={week[n]} className="py-3 pr-4 text-charcoal">
                    {c}
                  </td>
                ))}
                <td className="py-3 font-serif text-xl text-charcoal">{counts.reduce((a, b) => a + b, 0)}</td>
              </tr>
            );
          })}
        </Table>
      </Card>
    </div>
  );
}
