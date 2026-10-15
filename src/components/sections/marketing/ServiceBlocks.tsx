import Link from "next/link";
import { clsx } from "clsx";
import { Container } from "@/components/ui/Container";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/data/services";

export function ServiceBlocks() {
  return (
    <section className="bg-ivory py-24 sm:py-32" aria-labelledby="service-blocks-title">
      <Container wide>
        <h2 id="service-blocks-title" className="sr-only">
          Our Pilates services
        </h2>
        <div className="space-y-24 lg:space-y-32">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={s.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal className={clsx("lg:col-span-7", flip && "lg:order-2")}>
                  <Link href={`/classes/${s.slug}`} className="img-zoom block" aria-label={`${s.name}: learn more`}>
                    <ParallaxImage id={s.hero} className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 58vw, 100vw" strength={8} />
                  </Link>
                </Reveal>
                <Reveal delay={0.1} className={clsx("lg:col-span-5", flip && "lg:order-1")}>
                  <p className="font-serif text-5xl font-light text-gold-deep">0{i + 1}</p>
                  <Eyebrow className="mt-6">{s.eyebrow}</Eyebrow>
                  <h3 className="mt-5 font-serif text-h3 font-light text-charcoal balance">{s.name}</h3>
                  <p className="lead mt-5 text-stone pretty">{s.intro}</p>
                  <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-charcoal/10 pt-6 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.18em] text-stone">Length</dt>
                      <dd className="mt-1 text-charcoal">{s.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.18em] text-stone">Class size</dt>
                      <dd className="mt-1 text-charcoal">{s.classSize}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.18em] text-stone">From</dt>
                      <dd className="mt-1 text-charcoal">${s.priceFrom}</dd>
                    </div>
                  </dl>
                  <div className="mt-8">
                    <Button href={`/classes/${s.slug}`} variant="outline">
                      Explore {s.shortName}
                    </Button>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
