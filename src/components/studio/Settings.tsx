"use client";

import { useId, useState, type FormEvent } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import { site } from "@/lib/site";
import { Btn, Card, PageTitle, Pill, labelCls } from "./ui";

const stripeConfigured = Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export function Settings() {
  const { state, toggleAnnouncement, addAnnouncement, reset } = useStudio();
  const id = useId();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [live, setLive] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) {
      setError("Write the announcement first.");
      return;
    }
    addAnnouncement(text.trim());
    setText("");
    setError("");
    setLive("Announcement added and live.");
  }

  return (
    <div>
      <PageTitle eyebrow="Settings" title="Studio settings" lead="Announcements, integrations and demo controls." />
      <p className="sr-only" aria-live="polite">
        {live}
      </p>

      <Card>
        <h2 className="font-serif text-2xl font-light text-charcoal">Announcements</h2>
        <p className="mt-2 text-sm text-stone">Active announcements appear on the dashboard and can be surfaced on the public site.</p>
        {state.announcements.length === 0 ? (
          <p className="py-6 text-stone">No announcements yet.</p>
        ) : (
          <ul className="mt-6 divide-y divide-charcoal/10">
            {state.announcements.map((a) => (
              <li key={a.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-charcoal">{a.text}</p>
                  <p className="mt-1 text-xs text-stone">
                    <Pill tone={a.active ? "gold" : "linen"}>{a.active ? "Active" : "Hidden"}</Pill>
                  </p>
                </div>
                <Btn
                  variant="outline"
                  ariaPressed={a.active}
                  onClick={() => {
                    toggleAnnouncement(a.id);
                    setLive(a.active ? "Announcement hidden." : "Announcement is live.");
                  }}
                >
                  {a.active ? "Hide" : "Show"}
                </Btn>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={submit} noValidate className="mt-8">
          <label htmlFor={`${id}-text`} className={labelCls}>
            New announcement
          </label>
          <textarea
            id={`${id}-text`}
            rows={3}
            className="w-full border border-charcoal/20 bg-ivory p-3 text-sm text-ink focus:border-gold-deep focus:outline-none"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-text-err` : undefined}
            required
          />
          {error && (
            <p id={`${id}-text-err`} role="alert" className="mt-1 text-xs text-danger">
              {error}
            </p>
          )}
          <Btn type="submit" className="mt-3">
            Publish announcement
          </Btn>
        </form>
      </Card>

      <Card className="mt-8">
        <h2 className="font-serif text-2xl font-light text-charcoal">Integrations</h2>
        <dl className="mt-6 divide-y divide-charcoal/10">
          <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]">
            <dt className="text-[0.6875rem] uppercase tracking-[0.18em] text-stone">ClassPass</dt>
            <dd>
              <Pill tone={site.classpass.enabled ? "gold" : "linen"}>{site.classpass.enabled ? "Enabled" : "Off"}</Pill>
              <p className="mt-3 text-sm text-charcoal break-all">{site.classpass.url}</p>
              <p className="mt-2 text-sm text-stone">
                ClassPass has no public booking API. The studio is listed through its booking platform, which syncs the schedule to ClassPass automatically. The website links clients to the listing above. Update the URL in the site config once the listing is live.
              </p>
            </dd>
          </div>
          <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]">
            <dt className="text-[0.6875rem] uppercase tracking-[0.18em] text-stone">Stripe</dt>
            <dd>
              <Pill tone={stripeConfigured ? "gold" : "linen"}>{stripeConfigured ? "Test mode connected" : "Test mode, keys not set"}</Pill>
              <p className="mt-2 text-sm text-stone">
                {stripeConfigured
                  ? "Checkout runs through Stripe in test mode. Use a Stripe test card to complete a purchase."
                  : "Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local to enable Stripe Checkout. Until then purchases complete through a mock confirmation."}
              </p>
            </dd>
          </div>
        </dl>
      </Card>

      <Card className="mt-8">
        <h2 className="font-serif text-2xl font-light text-charcoal">Demo data</h2>
        <p className="mt-2 text-sm text-stone">Clears every booking, purchase, override and announcement made in this browser and restores the seeded demo. This signs you out.</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {confirmReset ? (
            <>
              <span className="text-sm text-charcoal">Reset everything?</span>
              <Btn
                variant="danger"
                onClick={() => {
                  reset();
                  setConfirmReset(false);
                  setLive("Demo data reset.");
                }}
              >
                Yes, reset
              </Btn>
              <Btn variant="ghost" onClick={() => setConfirmReset(false)}>
                Keep my data
              </Btn>
            </>
          ) : (
            <Btn variant="outline" onClick={() => setConfirmReset(true)}>
              Reset demo data
            </Btn>
          )}
        </div>
      </Card>
    </div>
  );
}
