"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import { formatDateLong } from "@/lib/data/schedule";

const prefs = [
  { id: "reminders", label: "Class reminders 24 hours before", default: true },
  { id: "waitlist", label: "Waitlist openings by text", default: true },
  { id: "releases", label: "New schedule releases", default: true },
  { id: "letter", label: "Monthly studio letter", default: false },
];

export function AccountProfile() {
  const { state, logout } = useStudio();
  const router = useRouter();
  const user = state.user;
  const [values, setValues] = useState<Record<string, boolean>>(() => Object.fromEntries(prefs.map((p) => [p.id, p.default])));
  const [status, setStatus] = useState("");

  if (!user) return null;

  return (
    <div>
      <h1 className="font-serif text-h2 font-light text-charcoal">Profile</h1>
      <p className="mt-3 text-stone">Your details and how we reach you.</p>

      <dl className="mt-10 grid gap-6 border-y border-charcoal/10 py-8 sm:grid-cols-2">
        <div>
          <dt className="eyebrow text-stone">Name</dt>
          <dd className="mt-2 font-serif text-2xl text-charcoal">{user.name}</dd>
        </div>
        <div>
          <dt className="eyebrow text-stone">Email</dt>
          <dd className="mt-2 text-charcoal">{user.email}</dd>
        </div>
        <div>
          <dt className="eyebrow text-stone">Phone</dt>
          <dd className="mt-2 text-charcoal">{user.phone ?? "Not provided"}</dd>
        </div>
        <div>
          <dt className="eyebrow text-stone">Member since</dt>
          <dd className="mt-2 text-charcoal">{formatDateLong(user.memberSince)}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-stone">To change your details, email the studio. A live build would let you edit these here.</p>

      <form
        className="mt-12"
        onSubmit={(e) => {
          e.preventDefault();
          setStatus("Preferences saved.");
        }}
      >
        <fieldset>
          <legend className="eyebrow text-stone">Notifications</legend>
          <ul className="mt-4 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {prefs.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-4">
                <input id={`pref-${p.id}`} type="checkbox" checked={values[p.id]} onChange={(e) => setValues((v) => ({ ...v, [p.id]: e.target.checked }))} className="h-4 w-4 accent-charcoal" />
                <label htmlFor={`pref-${p.id}`} className="text-charcoal">
                  {p.label}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <div className="mt-6 flex items-center gap-6">
          <button type="submit" className="eyebrow bg-charcoal px-6 py-4 text-ivory transition hover:bg-mocha">
            Save preferences
          </button>
          <p role="status" aria-live="polite" className="text-sm text-success">
            {status}
          </p>
        </div>
      </form>

      <div className="mt-14 border-t border-charcoal/10 pt-8">
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="eyebrow border border-charcoal/30 px-6 py-4 text-charcoal transition hover:border-charcoal"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
