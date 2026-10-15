import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";

/**
 * Full bleed charcoal section: a centered heading and four edge to edge
 * image tiles with uppercase serif titles and gold labels.
 */
export function ServicesGrid() {
  return (
    <section className="on-dark relative overflow-hidden bg-charcoal text-ivory grain" aria-labelledby="services-title">
      <Reveal className="px-5 pt-20 pb-12 text-center sm:pt-24 sm:pb-14">
        <h2 id="services-title" className="font-serif text-h2 font-light balance">
          Pilates Classes in Houston
        </h2>
      </Reveal>
      <Stagger className="grid grid-cols-2 gap-px bg-ivory/10 lg:grid-cols-4">
        {services.map((s, i) => (
          <StaggerItem key={s.slug}>
            <Link
              href={`/classes/${s.slug}`}
              className="img-zoom group relative block aspect-[3/4] overflow-hidden bg-charcoal focus-visible:outline-offset-[-4px] lg:aspect-[4/5]"
            >
              <Photo id={s.hero} sizes="(min-width: 1024px) 25vw, 50vw" className="opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                <p className="eyebrow text-gold-light">0{i + 1}</p>
                <h3 className="mt-3 font-serif text-2xl font-medium uppercase leading-none tracking-wide sm:text-4xl lg:text-5xl">{s.shortName}</h3>
                <p className="mt-2 text-xs text-ivory/70 sm:text-sm">{s.name}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.2em] text-gold-light sm:text-xs">
                  Explore
                  <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
