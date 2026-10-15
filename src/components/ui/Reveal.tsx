"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fade and rise on scroll into view. Reduced motion is handled by the
 * MotionConfig provider in MotionProvider, which drops the transform and
 * keeps a short opacity fade, so server and client markup always match.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "p" | "figure";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

/** Staggered children. Wrap a list of StaggerItem elements. */
export function Stagger({ children, className, step = 0.08 }: { children: ReactNode; className?: string; step?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
    >
      {children}
    </Tag>
  );
}
