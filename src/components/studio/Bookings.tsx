"use client";

import { useId, useState } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import { getClassType } from "@/lib/data/classes";
import { formatDateShort, formatTime } from "@/lib/data/schedule";
import type { Booking } from "@/lib/store/types";
import { Btn, Card, Empty, PageTitle, Pill, Table, labelCls, selectCls } from "./ui";
import { parseSessionId, statusLabel } from "./helpers";

const statuses: Booking["status"][] = ["booked", "attended", "no-show", "cancelled", "late-cancel"];

export function Bookings() {
  const { state, sessions, markBooking } = useStudio();
  const id = useId();
  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");
  const [live, setLive] = useState("");

  const rows = state.bookings
    .filter((b) => status === "all" || b.status === status)
    .filter((b) => b.userName.toLowerCase().includes(q.trim().toLowerCase()))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  function when(sessionId: string) {
    const s = sessions.find((x) => x.id === sessionId);
    if (s) return { date: s.date, time: s.time, classTypeId: s.classTypeId };
    const p = parseSessionId(sessionId);
    const classTypeId = sessionId.replace(/^\d{4}-\d{2}-\d{2}-\d{4}-/, "");
    return p ? { ...p, classTypeId } : { date: "", time: "", classTypeId };
  }

  function tone(s: Booking["status"]) {
    if (s === "booked") return "gold" as const;
    if (s === "attended") return "charcoal" as const;
    return "linen" as const;
  }

  return (
    <div>
      <PageTitle eyebrow="Bookings" title="Bookings" lead="Every reservation made through the website, the client portal, ClassPass or the front desk." />

      <Card>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-q`} className={labelCls}>
              Search by client
            </label>
            <input id={`${id}-q`} type="search" className={selectCls} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name" />
          </div>
          <div>
            <label htmlFor={`${id}-status`} className={labelCls}>
              Status
            </label>
            <select id={`${id}-status`} className={selectCls} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {statusLabel(s)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {live}
        </p>

        {rows.length === 0 ? (
          <Empty>No bookings match. Try a different name or status.</Empty>
        ) : (
          <Table className="mt-8" caption="Bookings" head={["Client", "Class", "Date and time", "Source", "Status", "Actions"]}>
            {rows.map((b) => {
              const w = when(b.sessionId);
              const ct = getClassType(w.classTypeId);
              return (
                <tr key={b.id}>
                  <td className="py-4 pr-4 text-charcoal">{b.userName}</td>
                  <td className="py-4 pr-4 text-charcoal">{ct?.name ?? w.classTypeId}</td>
                  <td className="py-4 pr-4 text-stone">
                    {w.date ? `${formatDateShort(w.date)}, ${formatTime(w.time)}` : "Unknown"}
                  </td>
                  <td className="py-4 pr-4 text-stone">{b.source.replace("-", " ")}</td>
                  <td className="py-4 pr-4">
                    <Pill tone={tone(b.status)}>{statusLabel(b.status)}</Pill>
                  </td>
                  <td className="py-4">
                    {b.status === "booked" ? (
                      <div className="flex flex-wrap gap-2">
                        <Btn
                          variant="outline"
                          onClick={() => {
                            markBooking(b.id, "attended");
                            setLive(`${b.userName} marked attended.`);
                          }}
                        >
                          Mark attended
                        </Btn>
                        <Btn
                          variant="outline"
                          onClick={() => {
                            markBooking(b.id, "no-show");
                            setLive(`${b.userName} marked no show.`);
                          }}
                        >
                          Mark no show
                        </Btn>
                        <Btn
                          variant="ghost"
                          onClick={() => {
                            markBooking(b.id, "cancelled");
                            setLive(`Booking for ${b.userName} cancelled.`);
                          }}
                        >
                          Cancel
                        </Btn>
                      </div>
                    ) : (
                      <span className="text-xs text-stone">No actions</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </Card>

      <Card className="mt-8">
        <h2 className="font-serif text-2xl font-light text-charcoal">Projected roster</h2>
        <p className="mt-3 text-sm text-stone">
          The booked counts shown on the schedule include seeded reservations from the weekly template. They represent other clients and are not listed individually in this demo. In production every reservation would appear here with the client record attached.
        </p>
      </Card>
    </div>
  );
}
