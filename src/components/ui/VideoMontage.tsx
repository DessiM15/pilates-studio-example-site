"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { clips, pexelsPhoto, photos, type Clip, type ClipKey } from "@/lib/media";
import { usePageLoaded, usePrefersReducedMotion } from "@/lib/hooks";

const HOLD_MS = 7000;
const FADE_MS = 1400;

/**
 * A sequence of short, self hosted ambient clips that crossfade in a loop,
 * with one accessible pause control. The poster image paints immediately;
 * video elements mount only after the page has finished loading so they
 * never compete with fonts, scripts and the first paint. Each clip is
 * fetched once and kept, so crossfades cost no extra bandwidth. With reduced
 * motion the poster is shown and nothing plays.
 */
export function VideoMontage({ ids, className, controlClassName }: { ids: ClipKey[]; className?: string; controlClassName?: string }) {
  const reduced = usePrefersReducedMotion();
  const loaded = usePageLoaded();
  const [userPaused, setUserPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const playing = !reduced && !userPaused;
  const mountVideos = loaded && !reduced;
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const list: Clip[] = ids.map((id) => clips[id]);
  const poster = photos[list[0].poster];

  // Advance on a timer while playing.
  useEffect(() => {
    if (!playing || !mountVideos) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % list.length), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [playing, mountVideos, index, list.length]);

  // Play the active clip, pause the others. Never reload, so nothing is refetched.
  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && playing) {
        const p = v.play();
        if (p && typeof p.catch === "function") p.then(() => setStarted(true)).catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index, playing, mountVideos]);

  const next = (index + 1) % list.length;

  return (
    <div className={clsx("absolute inset-0 overflow-hidden bg-charcoal", className)}>
      <Image src={pexelsPhoto(poster.id, 1600)} alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover" />
      {mountVideos &&
        list.map((clip, i) => (
          <video
            key={clip.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
            style={{ opacity: i === index && started ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
            muted
            loop
            playsInline
            preload={i === index || i === next ? "auto" : "none"}
            aria-label={clip.alt}
            aria-hidden={i !== index}
            tabIndex={-1}
          >
            <source src={clip.src} type="video/mp4" />
          </video>
        ))}
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
          {playing ? "Pause film" : "Play film"}
        </button>
      )}
    </div>
  );
}
