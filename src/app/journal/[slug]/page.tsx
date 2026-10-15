import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { JsonLd } from "@/components/ui/JsonLd";
import { posts, getPost } from "@/lib/data/content";
import { getInstructor } from "@/lib/data/instructors";
import { pexelsPhoto, photos } from "@/lib/media";
import { site } from "@/lib/site";

function formatPostDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/journal/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.date, images: [{ url: pexelsPhoto(photos[p.cover].id, 1600), alt: photos[p.cover].alt }] },
  };
}

export default async function PostPage(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();
  const author = getInstructor(post.author)!;
  const more = posts.filter((p) => p.slug !== post.slug);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: pexelsPhoto(photos[post.cover].id, 1600),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: author.name, jobTitle: author.role, url: `${site.url}/instructors/${author.slug}` },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/journal/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <article>
        <header className="bg-ivory pt-36 pb-12 sm:pt-44">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Eyebrow>{post.category}</Eyebrow>
              <h1 className="mt-6 font-serif text-h1 font-light text-charcoal balance">{post.title}</h1>
              <p className="lead mt-6 text-stone">{post.excerpt}</p>
              <p className="mt-8 text-sm text-stone">
                By{" "}
                <Link href={`/instructors/${author.slug}`} className="text-charcoal underline decoration-gold-deep/60 underline-offset-4 hover:decoration-gold-deep">
                  {author.name}
                </Link>
                , <time dateTime={post.date}>{formatPostDate(post.date)}</time>, {post.readTime}
              </p>
            </div>
          </Container>
        </header>
        <Container wide>
          <Reveal>
            <ParallaxImage id={post.cover} className="aspect-[21/9] w-full" sizes="100vw" strength={8} priority />
          </Reveal>
        </Container>
        <div className="bg-ivory py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-prose">
              {post.body.map((b, i) =>
                b.type === "h2" ? (
                  <h2 key={i} className="mt-12 font-serif text-h3 font-light text-charcoal first:mt-0">
                    {b.text}
                  </h2>
                ) : (
                  <p key={i} className="mt-6 text-lg leading-relaxed text-stone pretty">
                    {b.text}
                  </p>
                ),
              )}
            </div>
            <aside className="mx-auto mt-20 max-w-prose border-t border-charcoal/10 pt-10" aria-label="About the author">
              <div className="flex items-center gap-6">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-sand">
                  <Photo id={author.photo} sizes="96px" width={400} />
                </div>
                <div>
                  <p className="eyebrow text-gold-deep">Written by</p>
                  <p className="mt-2 font-serif text-2xl font-medium text-charcoal">
                    <Link href={`/instructors/${author.slug}`} className="hover:text-mocha">
                      {author.name}
                    </Link>
                  </p>
                  <p className="text-sm text-stone">{author.role}</p>
                </div>
              </div>
            </aside>
          </Container>
        </div>
      </article>

      <section className="border-t border-charcoal/10 bg-ivory py-24 sm:py-32" aria-labelledby="more-title">
        <Container wide>
          <Reveal>
            <Eyebrow>Keep reading</Eyebrow>
            <h2 id="more-title" className="mt-4 font-serif text-h3 font-light text-charcoal">
              More from the journal
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {more.map((p) => {
              const a = getInstructor(p.author);
              return (
                <Reveal key={p.slug}>
                  <article>
                    <Link href={`/journal/${p.slug}`} className="img-zoom group block">
                      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                        <Photo id={p.cover} sizes="(min-width: 768px) 50vw, 100vw" />
                      </div>
                      <p className="mt-5 text-xs uppercase tracking-[0.18em] text-gold-deep">{p.category}</p>
                      <h3 className="mt-2 font-serif text-2xl font-medium text-charcoal group-hover:text-mocha">{p.title}</h3>
                    </Link>
                    <p className="mt-2 text-stone">{p.excerpt}</p>
                    <p className="mt-3 text-xs text-stone">
                      {a?.name}, {formatPostDate(p.date)}, {p.readTime}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
