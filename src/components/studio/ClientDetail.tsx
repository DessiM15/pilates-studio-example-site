"use client";

import Link from "next/link";
import { useState } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import { getClassType } from "@/lib/data/classes";
import { formatDateLong, formatDateShort, formatTime } from "@/lib/data/schedule";
import { Btn, Card, Empty, Eyebrow, Pill, Table } from "./ui";
import { parseSessionId, statusLabel } from "./helpers";
import { NotesForm } from "./NotesForm";

export function ClientDetail({ id }: { id: string }) {
  const { state, sessions, adjustClientCredits, addClientNote } = useStudio();
  const client = state.clients.find((c) => c.id === id);
  const [saved, setSaved] = useState("");
  const [live, setLive] = useState("");

  if (!client) {
    return (
      <div>
        <h1 className="font-serif text-h3 font-light text-charcoal">Client not found</h1>
        <Link href="/studio/clients" className="mt-4 inline-block text-sm underline underline-offset-4">
          Back to clients
        </Link>
      </div>
    );
  }

  const bookings = state.bookings.filter((b) => b.userName === client.name).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  function when(sessionId: string) {
    const s = sessions.find((x) => x.id === sessionId);
    if (s) return { date: s.date, time: s.time, classTypeId: s.classTypeId };
    const p = parseSessionId(sessionId);
    return { date: p?.date ?? "", time: p?.time ?? "", classTypeId: sessionId.replace(/^\d{4}-\d{2}-\d{2}-\d{4}-/, "") };
  }

  return (
    <div>
      <Link href="/studio/clients" className="text-xs uppercase tracking-[0.18em] text-stone hover:text-charcoal">
        Back to clients
      </Link>
      <div className="mb-10 mt-4">
        <Eyebrow>Client</Eyebrow>
        <h1 className="mt-3 font-serif text-h2 font-light text-charcoal">{client.name}</h1>
        <div className="mt-3 flex flex-wrap gap-1">
          {client.tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <Card className="lg:col-span-5">
          <h2 className="font-serif text-2xl font-light text-charcoal">Profile</h2>
          <dl className="mt-6 grid grid-cols-[8rem_1fr] gap-y-3 text-sm">
            <dt className="text-stone">Email</dt>
            <dd className="text-charcoal">{client.email}</dd>
            <dt className="text-stone">Phone</dt>
            <dd className="text-charcoal">{client.phone ?? "Not on file"}</dd>
            <dt className="text-stone">Member since</dt>
            <dd className="text-charcoal">{formatDateLong(client.memberSince)}</dd>
            <dt className="text-stone">Unlimited until</dt>
            <dd className="text-charcoal">{client.unlimitedUntil ? formatDateLong(client.unlimitedUntil) : "Not a member"}</dd>
          </dl>
          <Link href="/studio/schedule" className="eyebrow mt-8 inline-block border-b border-charcoal pb-1 text-charcoal hover:border-gold-deep hover:text-gold-deep">
            Book for this client
          </Link>
        </Card>

        <Card className="lg:col-span-7">
          <h2 className="font-serif text-2xl font-light text-charcoal">Credits</h2>
          <div className="mt-6 flex items-center gap-6">
            <p className="font-serif text-6xl font-light text-charcoal">{client.credits}</p>
            <div className="flex gap-2">
              <Btn
                variant="outline"
                onClick={() => {
                  adjustClientCredits(client.id, 1);
                  setLive(`Balance is now ${client.credits + 1} credits.`);
                }}
              >
                +1 credit
              </Btn>
              <Btn
                variant="outline"
                ariaDisabled={client.credits === 0}
                onClick={() => {
                  if (client.credits === 0) return;
                  adjustClientCredits(client.id, -1);
                  setLive(`Balance is now ${client.credits - 1} credits.`);
                }}
              >
                -1 credit
              </Btn>
            </div>
          </div>
          <p className="mt-3 text-sm text-stone" aria-live="polite">
            {live || "Adjust credits for goodwill, refunds or front desk sales."}
          </p>

          <NotesForm key={`${client.id}-${client.notes ?? ""}`} initial={client.notes ?? ""} onSave={(n) => { addClientNote(client.id, n); setSaved("Notes saved."); }} saved={saved} onChange={() => setSaved("")} />
        </Card>

        <Card className="lg:col-span-12">
          <h2 className="font-serif text-2xl font-light text-charcoal">Bookings</h2>
          {bookings.length === 0 ? (
            <Empty>No bookings on record for this client.</Empty>
          ) : (
            <Table className="mt-6" caption={`Bookings for ${client.name}`} head={["Class", "Date and time", "Source", "Status"]}>
              {bookings.map((b) => {
                const w = when(b.sessionId);
                return (
                  <tr key={b.id}>
                    <td className="py-4 pr-4 text-charcoal">{getClassType(w.classTypeId)?.name ?? w.classTypeId}</td>
                    <td className="py-4 pr-4 text-stone">{w.date ? `${formatDateShort(w.date)}, ${formatTime(w.time)}` : "Unknown"}</td>
                    <td className="py-4 pr-4 text-stone">{b.source.replace("-", " ")}</td>
                    <td className="py-4">
                      <Pill>{statusLabel(b.status)}</Pill>
                    </td>
                  </tr>
                );
              })}
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
}
