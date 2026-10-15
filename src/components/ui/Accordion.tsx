import { clsx } from "clsx";

export function Accordion({ items, light = false }: { items: { q: string; a: string }[]; light?: boolean }) {
  return (
    <div className={clsx("divide-y border-y", light ? "divide-ivory/15 border-ivory/15" : "divide-charcoal/10 border-charcoal/10")}>
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary
            className={clsx(
              "flex cursor-pointer items-center justify-between gap-6 py-6 text-left font-serif text-xl sm:text-2xl",
              light ? "text-ivory" : "text-charcoal",
            )}
          >
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className={clsx(
                "relative h-6 w-6 shrink-0 before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-px after:-translate-x-1/2 after:-translate-y-1/2 after:transition-transform after:duration-300 group-open:after:rotate-90",
                light ? "before:bg-gold-light after:bg-gold-light" : "before:bg-gold-deep after:bg-gold-deep",
              )}
            />
          </summary>
          <p className={clsx("pb-8 pr-12 text-base leading-relaxed sm:text-lg", light ? "text-ivory/75" : "text-stone")}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
