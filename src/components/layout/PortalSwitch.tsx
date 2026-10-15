"use client";

import { useRouter, usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useStudio } from "@/lib/store/StudioProvider";
import type { Role } from "@/lib/store/types";

/**
 * Two way switch between the client portal and the studio owner portal.
 * Signs in as the demo user for that role and navigates, so the client can
 * flip between both experiences from anywhere on the site.
 */
export function PortalSwitch({ light = false, className }: { light?: boolean; className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { state, login } = useStudio();
  const active: Role | null = pathname.startsWith("/studio") ? "owner" : pathname.startsWith("/account") ? "client" : state.user?.role ?? null;

  function go(role: Role) {
    login(role);
    router.push(role === "owner" ? "/studio" : "/account");
  }

  const items: { role: Role; label: string }[] = [
    { role: "client", label: "Client" },
    { role: "owner", label: "Studio" },
  ];

  return (
    <div
      role="group"
      aria-label="Switch portal"
      className={clsx("inline-flex items-center border text-[0.625rem] uppercase tracking-[0.2em]", light ? "border-ivory/50" : "border-charcoal/30", className)}
    >
      {items.map((item) => {
        const on = active === item.role;
        return (
          <button
            key={item.role}
            type="button"
            onClick={() => go(item.role)}
            aria-pressed={on}
            className={clsx(
              "px-3 py-2 transition-colors",
              on
                ? light
                  ? "bg-ivory text-charcoal"
                  : "bg-charcoal text-ivory"
                : light
                  ? "text-ivory hover:bg-ivory/15"
                  : "text-charcoal hover:bg-charcoal/10",
            )}
          >
            {item.label}
            <span className="sr-only"> portal</span>
          </button>
        );
      })}
    </div>
  );
}
