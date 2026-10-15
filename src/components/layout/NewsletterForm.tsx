"use client";

import { useId, useState } from "react";

export function NewsletterForm() {
  const id = useId();
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      aria-describedby={`${id}-hint`}
      noValidate={false}
    >
      <label htmlFor={`${id}-email`} className="eyebrow text-ivory/70">
        Join the studio letter
      </label>
      <div className="mt-3 flex items-end gap-4">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={done}
        />
        <button type="submit" className="eyebrow shrink-0 border-b border-gold-light pb-3 text-gold-light transition hover:text-ivory disabled:opacity-60" disabled={done}>
          {done ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <p id={`${id}-hint`} className="mt-3 text-xs text-ivory/50" aria-live="polite">
        {done ? "Thank you. Watch for class releases and studio news." : "Monthly notes on movement, schedule releases and member events. Unsubscribe any time."}
      </p>
    </form>
  );
}
