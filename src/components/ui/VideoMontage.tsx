"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { clips, pexelsPhoto, photos, type Clip, type ClipKey } from "@/lib/media";
import { usePrefersReducedMotion } from "@/lib/hooks";

const HOLD_MS = 7000;
const FADE_MS = 1400;

/**
 * A sequence of muted ambient clips that crossfade in a loop, with one
 * accessible pause control for the whole montage. With reduced motion the
 * first poster frame is shown and nothing plays.
 */
export function VideoMontage({ ids, className, controlClassName }: { ids: ClipKey[]; className?: string; controlClassName?: string }) {
  const reduced = usePrefersReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const playing = !reduced && !userPaused;
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const list: Clip[] = ids.map((id) => clips[id]);

  // Advance on a timer while playing.
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % list.length), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [playing, index, list.length]);

  // Play the active clip (from the start) and the next one so it is ready, pause the rest.
  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      const next = (index + 1) % list.length;
      if (i === index) {
        if (playing) {
          v.currentTime = 0;
          const p = v.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } else {
          v.pause();
        }
      } else if (i === next && playing) {
        v.preload = "auto";
        v.load();
      } else {
        v.pause();
      }
    });
  }, [index, playing, list.length]);

  const poster = photos[list[0].poster];

  return (
    <div className={clsx("absolute inset-0 overflow-hidden bg-charcoal", className)}>
      <Image src={pexelsPhoto(poster.id, 1600)} alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover" />
      {list.map((clip, i) => (
        <video
          key={clip.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
          style={{ opacity: i === index && playing ? 1 : i === index ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
          muted
          loop
          playsInline
          preload={i === 0 ? "auto" : "none"}
          poster={pexelsPhoto(photos[clip.poster].id, 1200)}
          aria-label={clip.alt}
          aria-hidden={i !== index}
          tabIndex={-1}
        >
          <source src={clip.src} type="video/mp4" />
        </video>
      ))}
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
        {playing ? "Pause film" : "Play film"}
      </button>
    </div>
  );
}
