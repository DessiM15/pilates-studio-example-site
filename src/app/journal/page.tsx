import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/sections/PageIntro";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { posts } from "@/lib/data/content";
import { getInstructor } from "@/lib/data/instructors";

export const metadata: Metadata = {
  title: "The Aurelle Journal | Notes on Pilates in Houston",
  description:
    "Articles from our Houston Pilates instructors on reformer basics, back health, prenatal movement and the science behind the method.",
  alternates: { canonical: "/journal" },
};

function formatPostDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function JournalPage() {
  const [featured, ...rest] = posts;
  const fAuthor = getInstructor(featured.author);
  return (
    <>
      <PageIntro eyebrow="The journal" title="The Aurelle Journal: Notes on Pilates in Houston" lead="Short, honest writing from our instructors on how the method works, who it helps, and how to get more from every class." />
      <section className="bg-ivory pb-24 sm:pb-32" aria-labelledby="featured-title">
        <Container wide>
          <Reveal>
            <article className="grid items-center gap-10 lg:grid-cols-12">
              <Link href={`/journal/${featured.slug}`} className="img-zoom block lg:col-span-7" aria-label={`Read: ${featured.title}`}>
                <ParallaxImage id={featured.cover} className="aspect-[16/10] w-full" sizes="(min-width: 1024px) 58vw, 100vw" strength={8} />
              </Link>
              <div className="lg:col-span-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gold-deep">{featured.category}</p>
                <h2 id="featured-title" className="mt-4 font-serif text-h2 font-light text-charcoal balance">
                  <Link href={`/journal/${featured.slug}`} className="hover:text-mocha">
                    {featured.title}
                  </Link>
                </h2>
                <p className="lead mt-5 text-stone">{featured.excerpt}</p>
                <p className="mt-6 text-sm text-stone">
                  {fAuthor?.name}, {formatPostDate(featured.date)}, {featured.readTime}
                </p>
              </div>
            </article>
          </Reveal>
          <Stagger className="mt-24 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => {
              const a = getInstructor(p.author);
              return (
                <StaggerItem key={p.slug}>
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
                      {a?.name}, {formatPostDate(p.date)}, {p.readTime}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
