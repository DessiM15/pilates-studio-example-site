"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { nav, site } from "@/lib/site";
import { useStudio } from "@/lib/store/StudioProvider";
import { Wordmark } from "./Wordmark";
import { PortalSwitch } from "./PortalSwitch";
import { scrollToTop } from "@/components/ui/SmoothScroll";

/**
 * Fixed header. On pages that start with a dark, full bleed hero the hero
 * marks itself with data-hero-overlay and the header renders in light text
 * until the hero scrolls away. Elsewhere it is solid ivory from the start.
 */
export function Header() {
  const pathname = usePathname();
  // Overlay and menu state are keyed by pathname so navigation resets them
  // without an effect that sets state.
  const [overlayState, setOverlayState] = useState<{ path: string; visible: boolean }>({ path: "", visible: false });
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const overlay = overlayState.path === pathname && overlayState.visible;
  const open = openPath === pathname;
  const { state } = useStudio();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-overlay]");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setOverlayState({ path: pathname, visible: entry.isIntersecting }),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpenPath(null);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const list = Array.from(focusables);
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
      document.body.style.overflow = "";
    };
  }, [open, close]);

  // Light text only while the dark hero is in view and the page is at the top.
  const light = overlay && !open && !scrolled;
  const portalHref = state.user?.role === "owner" ? "/studio" : "/account";

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        light ? "text-ivory on-dark" : "text-charcoal",
        !light && scrolled && "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(28,25,23,0.06)]",
        !light && !scrolled && "bg-ivory",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${site.name} home`}
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              scrollToTop(false);
            }
          }}
        >
          <Wordmark className="h-7 w-auto sm:h-8" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "eyebrow relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-500 hover:after:scale-x-100",
                      light ? "after:bg-gold-light" : "after:bg-gold-deep",
                      active && "after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <PortalSwitch light={light} />
          <Link
            href="/schedule"
            className={clsx(
              "eyebrow border px-6 py-3 transition-all duration-300",
              light ? "border-ivory/60 hover:bg-ivory hover:text-charcoal" : "border-charcoal bg-charcoal text-ivory hover:bg-mocha hover:border-mocha",
            )}
          >
            Book a class
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="eyebrow flex items-center gap-3 py-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => (open ? close() : setOpenPath(pathname))}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span className={clsx("absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-300", open && "translate-y-[6px] rotate-45")} />
            <span className={clsx("absolute left-0 bottom-0 h-px w-6 bg-current transition-transform duration-300", open && "-translate-y-[5px] -rotate-45")} />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className={clsx("fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-ivory text-charcoal lg:hidden", open ? "block" : "hidden")}
      >
        <nav aria-label="Mobile" className="px-5 pt-8 pb-16 sm:px-8">
          <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-5 font-serif text-3xl font-light"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-gold-deep">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4">
            <Link href="/schedule" className="eyebrow bg-charcoal px-6 py-4 text-center text-ivory">
              Book a class
            </Link>
            <Link href={portalHref} className="eyebrow border border-charcoal px-6 py-4 text-center">
              {state.user ? `${state.user.firstName}'s portal` : "Sign in to your portal"}
            </Link>
            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="eyebrow text-stone">Switch portal</span>
              <PortalSwitch />
            </div>
          </div>
          <p className="mt-10 text-sm text-stone">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>
        </nav>
      </div>
    </header>
  );
}
