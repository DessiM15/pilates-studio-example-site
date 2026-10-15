"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { clsx } from "clsx";
import { useStudio } from "@/lib/store/StudioProvider";
import { classTypes, getClassType } from "@/lib/data/classes";
import { instructors, getInstructor } from "@/lib/data/instructors";
import { formatDateLong, formatDateShort, formatTime } from "@/lib/data/schedule";
import { Btn, Card, Eyebrow, Empty, PageTitle, Pill, Table, labelCls, selectCls } from "./ui";
import { dayKeys, isCancelled, todayKey } from "./helpers";

export function ManageSchedule() {
  const { state, sessions, setOverride, addSession, removeAddedSession } = useStudio();
  const days = useMemo(() => dayKeys(14), []);
  const [day, setDay] = useState(todayKey());
  const [status, setStatus] = useState("");
  const [confirming, setConfirming] = useState<string | null>(null);

  const daySessions = sessions.filter((s) => s.date === day);
  const addedIds = new Set(state.addedSessions.map((a) => a.id));
  const userBookings = (id: string) => state.bookings.filter((b) => b.sessionId === id && b.status === "booked").length;

  return (
    <div>
      <PageTitle eyebrow="Schedule" title="Manage schedule" lead="Reassign instructors, adjust capacity, cancel or add classes. Changes show on the public schedule immediately." />

      <nav aria-label="Choose a day" className="mb-8 overflow-x-auto">
        <ul className="flex gap-2">
          {days.map((d) => (
            <li key={d} className="shrink-0">
              <button
                type="button"
                onClick={() => setDay(d)}
                aria-pressed={day === d}
                className={clsx(
                  "flex min-w-[4.5rem] flex-col items-center border px-3 py-2 text-xs transition",
                  day === d ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal",
                )}
              >
                <span className="uppercase tracking-[0.14em]">{formatDateShort(d).slice(0, 3)}</span>
                <span className="font-serif text-xl">{d.slice(-2)}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <AddClassForm
        defaultDate={day}
        onAdd={(a) => {
          addSession(a);
          setDay(a.date);
          setStatus(`Added ${getClassType(a.classTypeId)?.name} on ${formatDateLong(a.date)} at ${formatTime(a.time)}.`);
        }}
      />

      <p className="sr-only" aria-live="polite">
        {status}
      </p>

      <Card className="mt-8">
        <Eyebrow>{formatDateLong(day)}</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-light text-charcoal">
          {daySessions.length} {daySessions.length === 1 ? "class" : "classes"}
        </h2>
        {daySessions.length === 0 ? (
          <Empty>No classes on this day. Use the form above to add one.</Empty>
        ) : (
          <Table className="mt-6" caption={`Classes on ${formatDateLong(day)}`} head={["Time", "Class", "Instructor", "Capacity", "Booked", "Status", "Actions"]}>
            {daySessions.map((s) => {
              const ct = getClassType(s.classTypeId);
              const cancelled = isCancelled(s);
              const booked = s.booked + userBookings(s.id);
              const added = addedIds.has(s.id);
              const confirm = confirming === s.id;
              return (
                <tr key={s.id} className={clsx(cancelled && "opacity-60")}>
                  <td className="py-4 pr-4 font-serif text-xl text-charcoal">{formatTime(s.time)}</td>
                  <td className="py-4 pr-4">
                    <p className="text-charcoal">{ct?.name}</p>
                    <p className="text-xs text-stone">{ct?.room}</p>
                  </td>
                  <td className="py-4 pr-4">
                    <label htmlFor={`inst-${s.id}`} className="sr-only">
                      Instructor for {ct?.name} at {formatTime(s.time)}
                    </label>
                    <select
                      id={`inst-${s.id}`}
                      className={selectCls}
                      value={s.instructorSlug}
                      onChange={(e) => {
                        setOverride({ sessionId: s.id, instructorSlug: e.target.value });
                        setStatus(`${ct?.name} at ${formatTime(s.time)} reassigned to ${getInstructor(e.target.value)?.name}.`);
                      }}
                    >
                      {instructors.map((i) => (
                        <option key={i.slug} value={i.slug}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 pr-4">
                    <label htmlFor={`cap-${s.id}`} className="sr-only">
                      Capacity for {ct?.name} at {formatTime(s.time)}
                    </label>
                    <input
                      id={`cap-${s.id}`}
                      type="number"
                      min={1}
                      max={20}
                      className={clsx(selectCls, "w-16")}
                      value={s.capacity}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (v >= 1) setOverride({ sessionId: s.id, capacity: v });
                      }}
                    />
                  </td>
                  <td className="py-4 pr-4 text-charcoal">
                    {booked} of {s.capacity}
                  </td>
                  <td className="py-4 pr-4">
                    {cancelled ? <Pill tone="linen">Cancelled</Pill> : added ? <Pill tone="gold">Added</Pill> : booked >= s.capacity ? <Pill tone="charcoal">Full</Pill> : <Pill>Open</Pill>}
                  </td>
                  <td className="py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {cancelled ? (
                        <Btn
                          variant="outline"
                          onClick={() => {
                            setOverride({ sessionId: s.id, cancelled: false });
                            setStatus(`${ct?.name} at ${formatTime(s.time)} restored.`);
                          }}
                        >
                          Restore
                        </Btn>
                      ) : confirm ? (
                        <>
                          <span className="text-xs text-stone">Cancel this class?</span>
                          <Btn
                            variant="danger"
                            onClick={() => {
                              setOverride({ sessionId: s.id, cancelled: true });
                              setConfirming(null);
                              setStatus(`${ct?.name} at ${formatTime(s.time)} cancelled.`);
                            }}
                          >
                            Yes, cancel
                          </Btn>
                          <Btn variant="ghost" onClick={() => setConfirming(null)}>
                            Keep
                          </Btn>
                        </>
                      ) : (
                        <Btn variant="outline" onClick={() => setConfirming(s.id)}>
                          Cancel class
                        </Btn>
                      )}
                      {added && (
                        <Btn
                          variant="ghost"
                          onClick={() => {
                            removeAddedSession(s.id);
                            setStatus(`${ct?.name} at ${formatTime(s.time)} removed.`);
                          }}
                        >
                          Remove
                        </Btn>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </Card>
    </div>
  );
}

function AddClassForm({ defaultDate, onAdd }: { defaultDate: string; onAdd: (a: { date: string; time: string; classTypeId: string; instructorSlug: string; capacity: number }) => void }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("");
  const [classTypeId, setClassTypeId] = useState("");
  const [instructorSlug, setInstructorSlug] = useState("");
  const [capacity, setCapacity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!date) errs.date = "Choose a date.";
    if (!time) errs.time = "Choose a start time.";
    if (!classTypeId) errs.classTypeId = "Choose a class type.";
    if (!instructorSlug) errs.instructorSlug = "Choose an instructor.";
    const cap = Number(capacity);
    if (!capacity || cap < 1) errs.capacity = "Capacity must be at least 1.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onAdd({ date, time, classTypeId, instructorSlug, capacity: cap });
    setTime("");
    setClassTypeId("");
    setInstructorSlug("");
    setCapacity("");
    setOpen(false);
  }

  return (
    <Card>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-form`}
        onClick={() => {
          setOpen((o) => !o);
          setDate(defaultDate);
        }}
        className="flex w-full items-center justify-between text-left"
      >
        <span>
          <span className="eyebrow block text-gold-deep">Add a class</span>
          <span className="mt-1 block font-serif text-2xl font-light text-charcoal">Open a new session on the schedule</span>
        </span>
        <span aria-hidden="true" className="font-serif text-3xl text-gold-deep">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <form id={`${id}-form`} onSubmit={submit} noValidate className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label htmlFor={`${id}-date`} className={labelCls}>
              Date
            </label>
            <input id={`${id}-date`} type="date" className={selectCls} value={date} onChange={(e) => setDate(e.target.value)} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? `${id}-date-err` : undefined} required />
            {errors.date && (
              <p id={`${id}-date-err`} role="alert" className="mt-1 text-xs text-danger">
                {errors.date}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${id}-time`} className={labelCls}>
              Start time
            </label>
            <input id={`${id}-time`} type="time" className={selectCls} value={time} onChange={(e) => setTime(e.target.value)} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? `${id}-time-err` : undefined} required />
            {errors.time && (
              <p id={`${id}-time-err`} role="alert" className="mt-1 text-xs text-danger">
                {errors.time}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${id}-class`} className={labelCls}>
              Class type
            </label>
            <select
              id={`${id}-class`}
              className={selectCls}
              value={classTypeId}
              onChange={(e) => {
                setClassTypeId(e.target.value);
                const ct = getClassType(e.target.value);
                if (ct && !capacity) setCapacity(String(ct.capacity));
              }}
              aria-invalid={Boolean(errors.classTypeId)}
              aria-describedby={errors.classTypeId ? `${id}-class-err` : undefined}
              required
            >
              <option value="">Choose</option>
              {classTypes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.classTypeId && (
              <p id={`${id}-class-err`} role="alert" className="mt-1 text-xs text-danger">
                {errors.classTypeId}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${id}-inst`} className={labelCls}>
              Instructor
            </label>
            <select id={`${id}-inst`} className={selectCls} value={instructorSlug} onChange={(e) => setInstructorSlug(e.target.value)} aria-invalid={Boolean(errors.instructorSlug)} aria-describedby={errors.instructorSlug ? `${id}-inst-err` : undefined} required>
              <option value="">Choose</option>
              {instructors.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.name}
                </option>
              ))}
            </select>
            {errors.instructorSlug && (
              <p id={`${id}-inst-err`} role="alert" className="mt-1 text-xs text-danger">
                {errors.instructorSlug}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${id}-cap`} className={labelCls}>
              Capacity
            </label>
            <input id={`${id}-cap`} type="number" min={1} max={20} className={selectCls} value={capacity} onChange={(e) => setCapacity(e.target.value)} aria-invalid={Boolean(errors.capacity)} aria-describedby={errors.capacity ? `${id}-cap-err` : undefined} required />
            {errors.capacity && (
              <p id={`${id}-cap-err`} role="alert" className="mt-1 text-xs text-danger">
                {errors.capacity}
              </p>
            )}
          </div>
          <div className="sm:col-span-2 lg:col-span-5">
            <Btn type="submit">Add to schedule</Btn>
          </div>
        </form>
      )}
    </Card>
  );
}
