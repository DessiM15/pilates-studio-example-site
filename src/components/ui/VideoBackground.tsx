"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { clips, pexelsPhoto, photos, type Clip, type ClipKey } from "@/lib/media";
import { usePageLoaded, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Muted, looping ambient video with an accessible pause control.
 * The poster paints first; the video mounts after the page has loaded and
 * only once it scrolls near the viewport. Reduced motion holds on the poster.
 */
export function VideoBackground({ id, className, controlClassName }: { id: ClipKey; className?: string; controlClassName?: string; priority?: boolean }) {
  const clip: Clip = clips[id];
  const poster = photos[clip.poster];
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const loaded = usePageLoaded();
  const [near, setNear] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const playing = !reduced && !userPaused;
  const mount = loaded && near && !reduced;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      v.pause();
    }
  }, [playing, mount]);

  return (
    <div ref={wrap} className={clsx("absolute inset-0 overflow-hidden bg-charcoal", className)}>
      <Image src={pexelsPhoto(poster.id, 1600)} alt="" aria-hidden="true" fill sizes="100vw" className="object-cover" />
      {mount && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay={playing}
          preload="auto"
          aria-label={clip.alt}
          tabIndex={-1}
        >
          {clip.portraitSrc && <source src={clip.portraitSrc} type="video/mp4" media="(orientation: portrait) and (max-width: 768px)" />}
          <source src={clip.src} type="video/mp4" />
        </video>
      )}
      {!reduced && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-pressed={!playing}
          className={clsx(
            "on-dark absolute z-20 flex items-center gap-2 border border-ivory/40 bg-charcoal/30 px-3 py-2 text-[0.625rem] uppercase tracking-[0.2em] text-ivory backdrop-blur-sm transition hover:bg-charcoal/60",
            controlClassName ?? "bottom-6 right-6",
          )}
        >
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-gold-light" />
          {playing ? "Pause video" : "Play video"}
        </button>
      )}
    </div>
  );
}
