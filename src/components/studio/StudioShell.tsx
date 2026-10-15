"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import { RequireOwner } from "./RequireOwner";

const links = [
  { label: "Dashboard", href: "/studio" },
  { label: "Schedule", href: "/studio/schedule" },
  { label: "Bookings", href: "/studio/bookings" },
  { label: "Clients", href: "/studio/clients" },
  { label: "Instructors", href: "/studio/instructors" },
  { label: "Packages", href: "/studio/packages" },
  { label: "Settings", href: "/studio/settings" },
];

export function StudioShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, state } = useStudio();

  const isActive = (href: string) => (href === "/studio" ? pathname === "/studio" : pathname.startsWith(href));

  return (
    <div className="min-h-screen bg-ivory pt-24">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-5 pb-20 sm:px-8 lg:flex-row lg:gap-12 lg:px-12">
        <aside className="lg:w-60 lg:shrink-0">
          <div className="lg:sticky lg:top-28">
            <p className="font-serif text-2xl font-medium uppercase tracking-[0.08em] text-charcoal">
              Aurelle <span className="eyebrow text-[0.6rem] tracking-[0.34em] text-gold-deep">Studio</span>
            </p>
            {state.user && <p className="mt-1 text-xs text-stone">{state.user.name}</p>}
            <nav aria-label="Studio portal" className="mt-6">
              <ul className="flex gap-1 overflow-x-auto border-y border-charcoal/10 py-2 lg:flex-col lg:border-y-0 lg:py-0">
                {links.map((l) => {
                  const active = isActive(l.href);
                  return (
                    <li key={l.href} className="shrink-0">
                      <Link
                        href={l.href}
                        aria-current={active ? "page" : undefined}
                        className={clsx(
                          "block whitespace-nowrap px-3 py-2.5 text-[0.6875rem] uppercase tracking-[0.18em] transition-colors lg:border-l-2 lg:px-4",
                          active ? "border-gold-deep bg-white text-charcoal lg:bg-transparent" : "border-transparent text-stone hover:text-charcoal",
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-6 flex gap-4 text-xs lg:mt-10 lg:flex-col lg:gap-3">
              <Link href="/" className="text-stone underline underline-offset-4 hover:text-charcoal">
                View site
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="text-left text-stone underline underline-offset-4 hover:text-charcoal"
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <RequireOwner>{children}</RequireOwner>
        </div>
      </div>
    </div>
  );
}
