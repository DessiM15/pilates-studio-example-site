"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import { formatDateShort } from "@/lib/data/schedule";
import { Card, Empty, PageTitle, Pill, Table, labelCls, selectCls } from "./ui";

export function Clients() {
  const { state } = useStudio();
  const id = useId();
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const rows = state.clients.filter((c) => !needle || c.name.toLowerCase().includes(needle) || c.email.toLowerCase().includes(needle));

  return (
    <div>
      <PageTitle eyebrow="Clients" title="Clients" lead={`${state.clients.length} people on the books.`} />
      <Card>
        <div className="max-w-md">
          <label htmlFor={`${id}-q`} className={labelCls}>
            Search by name or email
          </label>
          <input id={`${id}-q`} type="search" className={selectCls} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Start typing" />
        </div>
        <p className="sr-only" aria-live="polite">
          {rows.length} clients shown
        </p>
        {rows.length === 0 ? (
          <Empty>No clients match that search.</Empty>
        ) : (
          <Table className="mt-8" caption="Clients" head={["Name", "Email", "Member since", "Credits", "Tags", "Unlimited until"]}>
            {rows.map((c) => (
              <tr key={c.id}>
                <td className="py-4 pr-4">
                  <Link href={`/studio/clients/${c.id}`} className="text-charcoal underline underline-offset-4 decoration-gold-deep/50 hover:decoration-gold-deep">
                    {c.name}
                  </Link>
                </td>
                <td className="py-4 pr-4 text-stone">{c.email}</td>
                <td className="py-4 pr-4 text-stone">{formatDateShort(c.memberSince)}</td>
                <td className="py-4 pr-4 font-serif text-xl text-charcoal">{c.credits}</td>
                <td className="py-4 pr-4">
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </td>
                <td className="py-4 text-stone">{c.unlimitedUntil ? formatDateShort(c.unlimitedUntil) : "No"}</td>
              </tr>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
}
