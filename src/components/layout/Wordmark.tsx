import { site } from "@/lib/site";

/** Text wordmark rendered in the serif. Replace with the studio's SVG logo when ready. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 font-serif ${className ?? ""}`} aria-hidden="true">
      <span className="text-[1.75rem] font-medium leading-none tracking-[0.08em] uppercase sm:text-3xl">{site.name.split(" ")[0]}</span>
      <span className="eyebrow text-[0.6rem] tracking-[0.34em] opacity-80">Pilates</span>
    </span>
  );
}
