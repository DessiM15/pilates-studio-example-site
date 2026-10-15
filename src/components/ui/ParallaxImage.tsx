"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { clsx } from "clsx";
import { Photo } from "./Photo";
import type { PhotoKey } from "@/lib/media";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Image that drifts vertically as it scrolls through the viewport.
 * The image is rendered taller than its frame so the drift never shows edges.
 * With reduced motion the drift collapses to zero.
 */
export function ParallaxImage({
  id,
  className,
  sizes,
  strength = 12,
  priority,
}: {
  id: PhotoKey;
  className?: string;
  sizes?: string;
  strength?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const amount = reduce ? 0 : strength;
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={clsx("overflow-hidden", !className?.includes("absolute") && "relative", className)}>
      <motion.div style={{ y }} className="absolute inset-[-14%_0]">
        <Photo id={id} sizes={sizes} priority={priority} />
      </motion.div>
    </div>
  );
}
