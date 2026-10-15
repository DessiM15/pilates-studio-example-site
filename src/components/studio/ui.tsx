"use client";

import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Card({ children, className, as: Tag = "section" }: { children: ReactNode; className?: string; as?: "section" | "div" | "article" }) {
  return <Tag className={clsx("border border-charcoal/10 bg-white p-6 sm:p-8", className)}>{children}</Tag>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={clsx("eyebrow text-gold-deep", className)}>{children}</p>;
}

export function PageTitle({ eyebrow, title, lead }: { eyebrow?: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="mb-10">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="mt-3 font-serif text-h2 font-light text-charcoal balance">{title}</h1>
      {lead && <p className="mt-4 max-w-2xl text-stone">{lead}</p>}
    </div>
  );
}

export function Pill({ children, tone = "sand" }: { children: ReactNode; tone?: "sand" | "linen" | "gold" | "charcoal" }) {
  const tones = {
    sand: "bg-sand text-charcoal",
    linen: "bg-linen text-charcoal",
    gold: "bg-gold-light text-charcoal",
    charcoal: "bg-charcoal text-ivory",
  };
  return <span className={clsx("inline-block px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.16em]", tones[tone])}>{children}</span>;
}

type BtnProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "outline" | "ghost" | "danger";
  className?: string;
  ariaPressed?: boolean;
  ariaDisabled?: boolean;
  ariaDescribedBy?: string;
};

export function Btn({ children, onClick, type = "button", variant = "primary", className, ariaPressed, ariaDisabled, ariaDescribedBy }: BtnProps) {
  const variants = {
    primary: "bg-charcoal text-ivory hover:bg-mocha",
    outline: "border border-charcoal/40 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
    ghost: "text-charcoal underline underline-offset-4 decoration-gold-deep/60 hover:decoration-gold-deep",
    danger: "border border-danger/50 text-danger hover:bg-danger hover:text-ivory",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={ariaPressed}
      aria-disabled={ariaDisabled}
      aria-describedby={ariaDescribedBy}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] transition-all duration-300 whitespace-nowrap",
        variant !== "ghost" && "px-4 py-2.5",
        variants[variant],
        ariaDisabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {children}
    </button>
  );
}

export const fieldCls = "field text-sm";
export const selectCls = "w-full border-b border-charcoal/30 bg-transparent py-2 text-sm text-ink focus:border-gold-deep focus:outline-none";
export const labelCls = "block text-[0.6875rem] uppercase tracking-[0.18em] text-stone mb-1";

export function Table({ caption, head, children, className }: { caption: string; head: string[]; children: ReactNode; className?: string }) {
  return (
    <div className={clsx("overflow-x-auto", className)}>
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-charcoal/10">
            {head.map((h) => (
              <th key={h} scope="col" className="py-3 pr-4 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-stone">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal/10">{children}</tbody>
      </table>
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="py-10 text-center text-stone">{children}</p>;
}

export function Progress({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className="h-1.5 w-full bg-linen"
    >
      <div className="h-full bg-gold-deep" style={{ width: `${pct}%` }} />
    </div>
  );
}
