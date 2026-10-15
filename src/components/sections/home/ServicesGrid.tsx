import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";

/**
 * Full bleed charcoal section with four tall image tiles. The uppercase
 * serif titles and gold sub labels nod to the tile moment the client loved.
 */
export function ServicesGrid() {
  return (
    <section className="on-dark relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-32 grain" aria-labelledby="services-title">
      <Container wide>
        <Reveal>
          <SectionHeading
            light
            eyebrow="Pilates classes in Houston"
            title={
              <span id="services-title">
                Four ways to practice. <em className="italic text-gold-light">One standard.</em>
              </span>
            }
            lead="Every discipline we teach is led by a comprehensively certified instructor, in a class small enough that nothing goes unseen."
          />
        </Reveal>
        <Stagger className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <StaggerItem key={s.slug}>
              <Link
                href={`/classes/${s.slug}`}
                className="img-zoom group relative block aspect-[3/4] overflow-hidden bg-charcoal focus-visible:outline-offset-[-4px]"
              >
                <Photo id={s.hero} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="eyebrow text-gold-light">0{i + 1}</p>
                  <h3 className="mt-3 font-serif text-3xl font-medium uppercase leading-none tracking-wide sm:text-4xl">{s.shortName}</h3>
                  <p className="mt-2 text-sm text-ivory/70">{s.name}</p>
                  <p className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-light">
                    Explore
                    <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
