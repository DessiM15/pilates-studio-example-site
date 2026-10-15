import type { ReactNode } from "react";
import { clsx } from "clsx";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { PhotoKey } from "@/lib/media";

/**
 * Full bleed dark image hero for interior pages. Marks itself with
 * data-hero-overlay so the header renders light while it is in view.
 * `title` is the page H1 and should carry the Houston Pilates phrasing.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  children,
  align = "bottom",
  compact = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  image: PhotoKey;
  children?: ReactNode;
  align?: "bottom" | "center";
  compact?: boolean;
}) {
  return (
    <section
      data-hero-overlay
      className={clsx(
        "on-dark relative isolate flex overflow-hidden bg-charcoal text-ivory",
        compact ? "min-h-[60svh]" : "min-h-[80svh]",
        align === "bottom" ? "items-end" : "items-center",
      )}
    >
      <ParallaxImage id={image} className="absolute inset-0 h-full w-full opacity-70" sizes="100vw" strength={8} priority />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/30" />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-20 pt-40 sm:px-8 lg:px-12 lg:pb-24">
        <div className="max-w-4xl">
          {eyebrow && <Eyebrow light className="animate-fade-up">{eyebrow}</Eyebrow>}
          <h1 className="mt-6 font-serif text-h1 font-light balance animate-fade-up [animation-delay:120ms]">{title}</h1>
          {lead && <p className="lead mt-8 max-w-2xl text-ivory/85 animate-fade-up [animation-delay:240ms]">{lead}</p>}
          {children && <div className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:360ms]">{children}</div>}
        </div>
      </div>
    </section>
  );
}
