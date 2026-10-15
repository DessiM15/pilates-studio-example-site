"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { useStudio } from "@/lib/store/StudioProvider";
import type { Role } from "@/lib/store/types";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function LoginCards() {
  const router = useRouter();
  const params = useSearchParams();
  const { login, reset } = useStudio();
  const [status, setStatus] = useState("");
  const next = params.get("next");
  const emphasize = params.get("role") === "owner" ? "owner" : "client";

  function go(role: Role) {
    login(role);
    const fallback = role === "owner" ? "/studio" : "/account";
    const dest = next && next.startsWith("/") ? next : fallback;
    router.push(dest);
  }

  const cards: { role: Role; title: string; who: string; body: string; cta: string }[] = [
    { role: "client", title: "Client portal", who: "Avery Chen", body: "See credits, upcoming classes, purchase history and your profile.", cta: "Continue as Avery Chen" },
    { role: "owner", title: "Studio owner portal", who: "Camille Beaumont", body: "Manage the schedule, bookings, clients, instructors and announcements.", cta: "Continue as Camille Beaumont" },
  ];

  return (
    <div>
      <ul className="grid gap-6 md:grid-cols-2">
        {cards.map((c) => {
          const dark = c.role === emphasize;
          return (
            <li key={c.role}>
              <article className={clsx("flex h-full flex-col justify-between p-8", dark ? "on-dark bg-charcoal text-ivory grain relative overflow-hidden" : "border border-charcoal/10 bg-white text-charcoal")} aria-labelledby={`login-${c.role}`}>
                <div className="relative">
                  <Eyebrow light={dark}>{c.role === "owner" ? "Owner" : "Client"}</Eyebrow>
                  <h2 id={`login-${c.role}`} className="mt-4 font-serif text-3xl font-medium">
                    {c.title}
                  </h2>
                  <p className={clsx("mt-3", dark ? "text-ivory/75" : "text-stone")}>{c.body}</p>
                  <p className={clsx("mt-4 text-sm", dark ? "text-ivory/60" : "text-stone")}>Demo account: {c.who}</p>
                </div>
                <button type="button" onClick={() => go(c.role)} className={clsx("eyebrow relative mt-8 px-6 py-4 transition", dark ? "bg-ivory text-charcoal hover:bg-gold-light" : "bg-charcoal text-ivory hover:bg-mocha")}>
                  {c.cta}
                </button>
              </article>
            </li>
          );
        })}
      </ul>
      <div className="mt-10 flex flex-col gap-4 border-t border-charcoal/10 pt-6 text-sm text-stone sm:flex-row sm:items-center sm:justify-between">
        <p>This is a demo sign in. A production build would use email magic links or single sign on from Mindbody or Mariana Tek.</p>
        <button
          type="button"
          onClick={() => {
            reset();
            setStatus("Demo data has been reset to its starting state.");
          }}
          className="eyebrow shrink-0 border-b border-charcoal pb-1 text-charcoal hover:border-gold-deep hover:text-gold-deep"
        >
          Reset demo data
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-3 text-sm text-success">
        {status}
      </p>
    </div>
  );
}
