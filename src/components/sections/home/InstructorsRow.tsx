import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { instructors } from "@/lib/data/instructors";

export function InstructorsRow() {
  return (
    <section className="bg-ivory py-24 sm:py-32" aria-labelledby="instructors-title">
      <Container wide>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="The instructors"
              title={<span id="instructors-title">Houston Pilates instructors who see every rep</span>}
              lead="Five teachers, four lineages, one shared obsession with doing it right."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/instructors" variant="outline">
              Meet the team
            </Button>
          </Reveal>
        </div>
        <Stagger className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
          {instructors.map((p) => (
            <StaggerItem key={p.slug}>
              <Link href={`/instructors/${p.slug}`} className="img-zoom group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  <Photo id={p.photo} sizes="(min-width: 1024px) 20vw, 50vw" />
                </div>
                <p className="mt-4 font-serif text-2xl font-medium text-charcoal group-hover:text-mocha">{p.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone">{p.role}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
