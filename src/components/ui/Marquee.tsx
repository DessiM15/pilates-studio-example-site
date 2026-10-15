import { clsx } from "clsx";

export function Marquee({ items, className, light = false }: { items: string[]; className?: string; light?: boolean }) {
  const row = [...items, ...items];
  return (
    <div
      className={clsx("marquee overflow-hidden border-y py-5", light ? "border-ivory/15" : "border-charcoal/10", className)}
      role="region"
      aria-label="Studio highlights"
    >
      <div className="marquee-track">
        {row.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length ? "true" : undefined}
            className={clsx("flex items-center gap-10 pr-10 font-serif text-2xl font-light sm:text-3xl", light ? "text-ivory" : "text-charcoal")}
          >
            {item}
            <span aria-hidden="true" className={clsx("inline-block h-1.5 w-1.5 rounded-full", light ? "bg-gold-light" : "bg-gold-deep")} />
          </span>
        ))}
      </div>
    </div>
  );
}
