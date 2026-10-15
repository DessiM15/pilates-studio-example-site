"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { clsx } from "clsx";
import { useStudio } from "@/lib/store/StudioProvider";
import { getClassType } from "@/lib/data/classes";
import { getInstructor } from "@/lib/data/instructors";
import { formatDateLong, formatTime } from "@/lib/data/schedule";
import { getPackage, formatPrice } from "@/lib/data/packages";
import { googleCalendarUrl, type SessionWithFlags } from "./helpers";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Result = { ok: true } | { ok: false; reason: string } | null;

/**
 * Accessible booking side sheet. Traps focus, closes on Escape, restores
 * focus to the trigger and locks background scroll while open.
 */
export function BookingDialog({ session, onClose, returnFocusRef }: { session: SessionWithFlags | null; onClose: () => void; returnFocusRef?: RefObject<HTMLElement | null> }) {
  const { state, book, spotsLeft, isBooked } = useStudio();
  const panel = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const [stored, setStored] = useState<{ forSession: string | null; value: Result }>({ forSession: null, value: null });
  const result: Result = stored.forSession === (session?.id ?? null) ? stored.value : null;
  const setResult = (value: Result) => setStored({ forSession: session?.id ?? null, value });
  const open = session !== null;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const returnTo = returnFocusRef?.current ?? null;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("button, a[href]");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab" && panel.current) {
        const list = Array.from(panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
        if (list.length === 0) return;
        const firstEl = list[0];
        const lastEl = list[list.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      returnTo?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!session) return null;

  const ct = getClassType(session.classTypeId);
  const who = getInstructor(session.instructorSlug);
  const left = spotsLeft(session);
  const booked = isBooked(session.id);
  const unlimited = state.unlimitedUntil && state.unlimitedUntil >= session.date;
  const needs = ct?.credits ?? 1;
  const creditsIssue = result && !result.ok && /credit/i.test(result.reason);
  const suggested = ["intro-3", "pack-5", "pack-10"].map(getPackage).filter(Boolean);

  function confirm() {
    const r = book(session!.id);
    setResult(r.ok ? { ok: true } : { ok: false, reason: r.reason });
  }

  return (
    <div className="fixed inset-0 z-[60]">
      <button type="button" aria-label="Close booking panel" onClick={onClose} className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px]" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="absolute inset-y-0 right-0 flex w-full max-w-lg flex-col overflow-y-auto bg-ivory text-charcoal shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
          <Eyebrow>{result?.ok ? "Confirmed" : "Book a class"}</Eyebrow>
          <button type="button" onClick={onClose} className="eyebrow px-2 py-1 hover:text-gold-deep">
            Close
          </button>
        </div>

        <div className="flex-1 px-6 py-8">
          <h2 id={headingId} className="font-serif text-4xl font-light">
            {result?.ok ? "You are booked." : ct?.name}
          </h2>

          {result?.ok ? (
            <div aria-live="polite">
              <p className="mt-4 text-stone">
                {ct?.name} on {formatDateLong(session.date)} at {formatTime(session.time)} with {who?.name}. See you in the {ct?.room}.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-charcoal/10 py-6 text-sm">
                <div>
                  <dt className="eyebrow text-stone">Credits remaining</dt>
                  <dd className="mt-2 font-serif text-3xl">{unlimited ? "Unlimited" : state.credits}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-stone">Cancellation</dt>
                  <dd className="mt-2 text-stone">Free up to 12 hours before class.</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3">
                <a href={googleCalendarUrl(session)} target="_blank" rel="noopener noreferrer" className="eyebrow bg-charcoal px-6 py-4 text-center text-ivory transition hover:bg-mocha">
                  Add to calendar
                </a>
                <Link href="/account" className="eyebrow border border-charcoal px-6 py-4 text-center transition hover:bg-charcoal hover:text-ivory">
                  View your portal
                </Link>
                <button type="button" onClick={onClose} className="eyebrow py-3 text-stone hover:text-charcoal">
                  Book another class
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-2 text-stone">{ct?.description}</p>
              <dl className="mt-8 divide-y divide-charcoal/10 border-y border-charcoal/10 text-sm">
                <Row label="When">
                  {formatDateLong(session.date)}, {formatTime(session.time)}
                </Row>
                <Row label="Instructor">
                  <Link href={`/instructors/${who?.slug}`} className="underline underline-offset-4 decoration-gold-deep/60 hover:decoration-gold-deep">
                    {who?.name}
                  </Link>
                </Row>
                <Row label="Length">{ct?.duration} minutes, {ct?.level}</Row>
                <Row label="Room">{ct?.room}</Row>
                <Row label="Availability">{session.cancelled ? "Cancelled" : left <= 0 ? "Full, waitlist only" : `${left} of ${session.capacity} spots open`}</Row>
                <Row label="Cost">{unlimited ? "Included in your unlimited membership" : `${needs} class credit`}</Row>
                <Row label="Your balance">{unlimited ? `Unlimited through ${state.unlimitedUntil}` : `${state.credits} credit${state.credits === 1 ? "" : "s"}`}</Row>
              </dl>

              {!state.user && (
                <p className="mt-6 text-sm text-stone" role="note">
                  You are booking as Avery Chen (demo). A live site would ask you to sign in first.
                </p>
              )}

              {result && !result.ok && (
                <div role="alert" className="mt-6 border-l-2 border-danger bg-sand p-4 text-sm text-charcoal">
                  <p>{result.reason}</p>
                </div>
              )}

              {creditsIssue && (
                <div className="mt-6">
                  <p className="eyebrow text-gold-deep">Choose a package</p>
                  <ul className="mt-3 divide-y divide-charcoal/10 border-y border-charcoal/10">
                    {suggested.map((p) => (
                      <li key={p!.id} className="flex items-center justify-between py-3">
                        <span>
                          <span className="font-serif text-xl">{p!.name}</span>
                          <span className="block text-xs text-stone">
                            {p!.credits} credits, {p!.expiresIn}
                          </span>
                        </span>
                        <Link href="/pricing" className="eyebrow border-b border-charcoal pb-0.5 hover:text-gold-deep hover:border-gold-deep">
                          {formatPrice(p!.price)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3">
                {booked ? (
                  <p className="eyebrow border border-charcoal/20 px-6 py-4 text-center text-stone">Already booked</p>
                ) : (
                  <button
                    type="button"
                    onClick={confirm}
                    disabled={Boolean(session.cancelled) || left <= 0 || (result !== null && !result.ok)}
                    className={clsx("eyebrow px-6 py-4 text-ivory transition", "bg-charcoal hover:bg-mocha disabled:cursor-not-allowed")}
                  >
                    {left <= 0 ? "Class is full" : "Confirm booking"}
                  </button>
                )}
                <button type="button" onClick={onClose} className="eyebrow py-3 text-stone hover:text-charcoal">
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 py-3">
      <dt className="eyebrow text-stone">{label}</dt>
      <dd className="text-charcoal">{children}</dd>
    </div>
  );
}
