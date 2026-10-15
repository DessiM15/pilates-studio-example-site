import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Eyebrow({ children, className, light = false, line = true }: { children: ReactNode; className?: string; light?: boolean; line?: boolean }) {
  return (
    <p className={clsx("eyebrow flex items-center gap-3", light ? "text-gold-light" : "text-gold-deep", className)}>
      {line && <span aria-hidden="true" className={clsx("inline-block h-px w-8", light ? "bg-gold-light" : "bg-gold-deep")} />}
      {children}
    </p>
  );
}
