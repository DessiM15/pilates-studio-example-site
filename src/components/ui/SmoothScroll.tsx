"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** Jump to the top of the page immediately, through Lenis when it is active. */
export function scrollToTop(immediate = true) {
  if (instance) instance.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

/**
 * Lenis smooth scrolling, skipped entirely when the user prefers reduced motion.
 * Every route change lands at the very top of the new page.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    instance = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      instance = null;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    scrollToTop(true);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
