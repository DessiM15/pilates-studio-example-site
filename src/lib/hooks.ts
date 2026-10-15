"use client";

import { useSyncExternalStore } from "react";

function subscribeMedia(query: string) {
  return (cb: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

const reduceQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduce = subscribeMedia(reduceQuery);

/** True when the user prefers reduced motion. False during server render. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReduce, () => window.matchMedia(reduceQuery).matches, () => false);
}

function subscribeMinute(cb: () => void) {
  const id = window.setInterval(cb, 60_000);
  return () => window.clearInterval(id);
}

const serverNow = 0;

/** Current time at minute resolution, stable across a render. Zero on the server. */
export function useNow() {
  return useSyncExternalStore(
    subscribeMinute,
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => serverNow,
  );
}

const noop = () => () => {};

/** False during server render and hydration, true once mounted on the client. */
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}

function subscribeLoaded(cb: () => void) {
  window.addEventListener("load", cb);
  return () => window.removeEventListener("load", cb);
}

/** True once the window load event has fired, so heavy media can start after the page is ready. */
export function usePageLoaded() {
  return useSyncExternalStore(subscribeLoaded, () => document.readyState === "complete", () => false);
}
