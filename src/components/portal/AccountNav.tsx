"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const links = [
  { label: "Overview", href: "/account" },
  { label: "Bookings", href: "/account/bookings" },
  { label: "Purchases", href: "/account/purchases" },
  { label: "Profile", href: "/account/profile" },
];

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Your portal" className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
      <ul className="flex min-w-max gap-1 border-b border-charcoal/10 lg:flex-col lg:border-b-0 lg:border-r">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "eyebrow block px-4 py-3 transition lg:px-5 lg:py-4",
                  active ? "border-b-2 border-charcoal text-charcoal lg:border-b-0 lg:border-r-2 lg:-mr-px" : "text-stone hover:text-charcoal",
                )}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
