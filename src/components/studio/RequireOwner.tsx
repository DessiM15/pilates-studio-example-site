"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useStudio } from "@/lib/store/StudioProvider";

export function RequireOwner({ children }: { children: ReactNode }) {
  const { state, hydrated } = useStudio();
  const pathname = usePathname();

  if (!hydrated) {
    return (
      <p className="py-20 text-center text-stone" aria-live="polite">
        Loading your studio
      </p>
    );
  }

  if (state.user?.role !== "owner") {
    return (
      <div className="mx-auto max-w-lg border border-charcoal/10 bg-white p-8 text-center sm:p-12">
        <p className="eyebrow text-gold-deep">Studio portal</p>
        <h1 className="mt-4 font-serif text-h3 font-light text-charcoal">This area is for studio staff</h1>
        <p className="mt-4 text-stone">Sign in with an owner account to manage classes, bookings and clients.</p>
        <Link
          href={`/login?role=owner&next=${encodeURIComponent(pathname)}`}
          className="eyebrow mt-8 inline-block bg-charcoal px-7 py-4 text-ivory transition hover:bg-mocha"
        >
          Sign in as owner
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
