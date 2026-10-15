import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { posts } from "@/lib/data/content";
import { getInstructor } from "@/lib/data/instructors";

export function JournalPreview() {
  return (
    <section className="border-t border-charcoal/10 bg-ivory py-24 sm:py-32" aria-labelledby="journal-title">
      <Container wide>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading eyebrow="The journal" title={<span id="journal-title">Notes on Pilates in Houston</span>} />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/journal" variant="outline">
              All articles
            </Button>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-10 md:grid-cols-3">
          {posts.map((p) => {
            const author = getInstructor(p.author);
            return (
              <StaggerItem key={p.slug} as="div">
                <article>
                  <Link href={`/journal/${p.slug}`} className="img-zoom group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                      <Photo id={p.cover} sizes="(min-width: 768px) 33vw, 100vw" />
                    </div>
                    <p className="mt-5 text-xs uppercase tracking-[0.18em] text-gold-deep">{p.category}</p>
                    <h3 className="mt-2 font-serif text-2xl font-medium text-charcoal group-hover:text-mocha">{p.title}</h3>
                  </Link>
                  <p className="mt-2 text-stone">{p.excerpt}</p>
                  <p className="mt-3 text-xs text-stone">
                    {author?.name}, {p.readTime}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
