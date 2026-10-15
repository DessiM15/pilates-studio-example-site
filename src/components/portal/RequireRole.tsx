"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import type { Role } from "@/lib/store/types";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Renders children once hydrated and the signed in user matches the role. Otherwise a friendly sign in prompt. */
export function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const { state, hydrated } = useStudio();
  const pathname = usePathname();

  if (!hydrated) {
    return (
      <p className="py-16 text-stone" aria-live="polite" aria-busy="true">
        Loading your portal.
      </p>
    );
  }

  if (!state.user || state.user.role !== role) {
    const label = role === "owner" ? "studio owner" : "client";
    return (
      <div className="max-w-xl py-10">
        <Eyebrow>Sign in required</Eyebrow>
        <h1 className="mt-4 font-serif text-h3 font-light text-charcoal">This area is for {label}s</h1>
        <p className="mt-4 text-stone">
          {state.user ? `You are signed in as ${state.user.name}. Switch accounts to continue.` : "Sign in to the demo account to continue."}
        </p>
        <Link href={`/login?next=${encodeURIComponent(pathname)}&role=${role}`} className="eyebrow mt-8 inline-block bg-charcoal px-6 py-4 text-ivory transition hover:bg-mocha">
          Sign in as {label}
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
