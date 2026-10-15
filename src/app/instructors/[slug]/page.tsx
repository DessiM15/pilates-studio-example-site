import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { InstructorUpcoming } from "@/components/sections/booking/InstructorUpcoming";
import { instructors, getInstructor } from "@/lib/data/instructors";
import { getClassType } from "@/lib/data/classes";
import { getService } from "@/lib/data/services";
import { pexelsPhoto, photos } from "@/lib/media";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return instructors.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/instructors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getInstructor(slug);
  if (!p) return {};
  return {
    title: `${p.name}, Pilates Instructor in Houston`,
    description: `${p.name} is ${p.role.toLowerCase()} at Aurelle Pilates in Southwest Houston. ${p.specialties.join(", ")}. See bio, certifications and upcoming classes.`,
    alternates: { canonical: `/instructors/${p.slug}` },
    openGraph: { images: [{ url: pexelsPhoto(photos[p.photo].id, 1200), alt: photos[p.photo].alt }] },
  };
}

export default async function InstructorPage({ params }: PageProps<"/instructors/[slug]">) {
  const { slug } = await params;
  const p = getInstructor(slug);
  if (!p) notFound();

  const teaches = p.teaches.map(getClassType).filter(Boolean);
  const others = instructors.filter((i) => i.slug !== p.slug);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.role,
    image: pexelsPhoto(photos[p.photo].id, 1200),
    description: p.bio[0],
    worksFor: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/instructors/${p.slug}`,
    knowsAbout: p.specialties,
  };

  return (
    <>
      <JsonLd data={person} />
      <section className="bg-ivory pt-32 pb-24 sm:pt-40 sm:pb-32" aria-labelledby="instructor-title">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  <Photo id={p.photo} sizes="(min-width: 1024px) 40vw, 100vw" priority />
                </div>
                <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-charcoal/10 pt-6 text-sm">
                  <div>
                    <dt className="eyebrow text-stone">Teaching</dt>
                    <dd className="mt-2 font-serif text-3xl text-charcoal">{p.yearsTeaching} years</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-stone">Pronouns</dt>
                    <dd className="mt-2 font-serif text-3xl text-charcoal">{p.pronouns}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Eyebrow>{p.role}</Eyebrow>
              <h1 id="instructor-title" className="mt-6 font-serif text-h1 font-light text-charcoal balance">
                {p.name}, <span className="block text-h3 italic text-mocha">Pilates Instructor in Houston</span>
              </h1>
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-stone">
                {p.bio.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <blockquote className="mt-12 border-l-2 border-gold-deep pl-6">
                <p className="font-serif text-3xl font-light italic text-charcoal sm:text-4xl balance">&ldquo;{p.quote}&rdquo;</p>
              </blockquote>

              <div className="mt-14 grid gap-10 sm:grid-cols-2">
                <div>
                  <h2 className="eyebrow text-gold-deep">Certifications</h2>
                  <ul className="mt-4 space-y-2 text-charcoal">
                    {p.certifications.map((c) => (
                      <li key={c} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="eyebrow text-gold-deep">Specialties</h2>
                  <ul className="mt-4 space-y-2 text-charcoal">
                    {p.specialties.map((s) => (
                      <li key={s} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sm:col-span-2">
                  <h2 className="eyebrow text-gold-deep">Favorite exercise</h2>
                  <p className="mt-4 font-serif text-2xl text-charcoal">{p.favorite}</p>
                </div>
                <div className="sm:col-span-2">
                  <h2 className="eyebrow text-gold-deep">Also teaches</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {teaches.map((c) => {
                      const svc = getService(c!.serviceSlug);
                      return (
                        <li key={c!.id}>
                          <Link href={`/classes/${c!.serviceSlug}`} className="inline-block border border-charcoal/15 px-3 py-1.5 text-sm text-charcoal transition hover:border-charcoal">
                            {c!.name}
                            <span className="sr-only">, part of {svc?.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-charcoal/10 bg-ivory py-24 sm:py-32" aria-labelledby="upcoming-title">
        <Container wide>
          <Reveal>
            <Eyebrow>On the schedule</Eyebrow>
            <h2 id="upcoming-title" className="mt-6 font-serif text-h2 font-light text-charcoal">
              Classes with {p.firstName}
            </h2>
          </Reveal>
          <div className="mt-12">
            <InstructorUpcoming slug={p.slug} firstName={p.firstName} />
          </div>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-32" aria-labelledby="others-title">
        <Container wide>
          <Reveal>
            <Eyebrow>The team</Eyebrow>
            <h2 id="others-title" className="mt-6 font-serif text-h3 font-light text-charcoal">
              More Houston Pilates instructors
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/instructors/${o.slug}`} className="img-zoom group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-ivory">
                    <Photo id={o.photo} sizes="(min-width: 1024px) 25vw, 50vw" />
                  </div>
                  <p className="mt-4 font-serif text-2xl font-medium text-charcoal group-hover:text-mocha">{o.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone">{o.role}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand eyebrow="Book" title={`Train with ${p.firstName}`} lead={`Filter the schedule by instructor, or book a private session and build a program with ${p.firstName} from day one.`} primary={{ label: `Book with ${p.firstName}`, href: "/schedule" }} secondary={{ label: "Private sessions", href: "/classes/private-pilates" }} />
    </>
  );
}
