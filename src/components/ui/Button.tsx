import Link from "next/link";
import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "outline-light" | "ghost" | "link" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium uppercase tracking-[0.18em] transition-all duration-300 ease-[var(--ease-luxe)] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-charcoal text-ivory hover:bg-mocha",
  gold: "bg-gold-deep text-ivory hover:bg-mocha",
  light: "bg-ivory text-charcoal hover:bg-linen",
  outline: "border border-charcoal/40 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  "outline-light": "border border-ivory/50 text-ivory hover:bg-ivory hover:text-charcoal on-dark",
  ghost: "text-charcoal hover:text-gold-deep",
  link: "text-charcoal underline underline-offset-8 decoration-gold-deep/60 hover:decoration-gold-deep normal-case tracking-normal font-normal text-base",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.6875rem] px-5 py-3",
  md: "text-xs px-7 py-4",
  lg: "text-xs px-9 py-5",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

export function Button({ children, href, variant = "primary", size = "md", className, external, ...rest }: Props) {
  const cls = clsx(base, variant !== "link" && sizes[size], variants[variant], className);
  if (href) {
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
