import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { instructors } from "@/lib/data/instructors";

export const metadata: Metadata = {
  title: "Pilates Instructors in Houston",
  description:
    "Meet the five comprehensively certified Pilates instructors at Aurelle Pilates in Southwest Houston. Reformer, mat, prenatal and private session specialists.",
  alternates: { canonical: "/instructors" },
};

const hiring = [
  { title: "Comprehensive certification", body: "Every instructor holds a 450 hour or greater comprehensive certification covering reformer, mat, tower and chair. Weekend courses do not qualify." },
  { title: "Two hundred hour apprenticeship", body: "New hires observe, assist and co teach for two hundred hours under Camille before leading a class alone." },
  { title: "Continuing education", body: "Forty hours a year, paid by the studio, in anatomy, special populations and the lineages we teach." },
];

export default function InstructorsPage() {
  return (
    <>
      <PageHero
        eyebrow="The team"
        title="Pilates Instructors in Houston"
        lead="Five teachers, four lineages, one shared obsession with doing the method right. Each profile lists their upcoming classes so you can book with the instructor who fits you."
        image="duoStretch"
        compact
      />

      <section className="bg-ivory py-24 sm:py-32" aria-labelledby="roster-title">
        <Container wide>
          <Reveal>
            <SectionHeading eyebrow="Meet the instructors" title={<span id="roster-title">Comprehensively certified, endlessly curious</span>} />
          </Reveal>
          <Stagger className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.map((p) => (
              <StaggerItem key={p.slug}>
                <article>
                  <Link href={`/instructors/${p.slug}`} className="img-zoom group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                      <Photo id={p.photo} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                    </div>
                    <h3 className="mt-5 font-serif text-3xl font-medium text-charcoal group-hover:text-mocha">{p.name}</h3>
                  </Link>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone">{p.role}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${p.firstName}'s specialties`}>
                    {p.specialties.map((s) => (
                      <li key={s} className="border border-charcoal/15 px-3 py-1 text-xs text-charcoal">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/instructors/${p.slug}`} className="eyebrow mt-5 inline-block border-b border-charcoal pb-1 text-charcoal transition hover:border-gold-deep hover:text-gold-deep">
                    Profile and classes
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-32" aria-labelledby="hiring-title">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading eyebrow="How we hire" title={<span id="hiring-title">The bar is high on purpose</span>} lead="A beautiful studio is nothing without the people teaching in it. Here is what every Aurelle instructor has done before they cue your first footwork." />
            </Reveal>
            <ol className="lg:col-span-7 space-y-8">
              {hiring.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.08} as="li">
                  <div className="grid grid-cols-[2rem_1fr] gap-4 border-t border-charcoal/10 pt-6">
                    <span className="font-serif text-2xl text-gold-deep">0{i + 1}</span>
                    <div>
                      <h3 className="font-serif text-2xl font-medium text-charcoal">{h.title}</h3>
                      <p className="mt-2 text-stone">{h.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <CtaBand eyebrow="Book" title="Find your instructor on the schedule" lead="Filter the schedule by instructor and book with the teacher whose style speaks to you." primary={{ label: "View the schedule", href: "/schedule" }} secondary={{ label: "Private sessions", href: "/classes/private-pilates" }} />
    </>
  );
}
