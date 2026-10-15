import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Photo } from "@/components/ui/Photo";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { services, getService } from "@/lib/data/services";
import { classTypes } from "@/lib/data/classes";
import { instructors } from "@/lib/data/instructors";
import { pexelsPhoto, photos } from "@/lib/media";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/classes/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: { absolute: s.metaTitle },
    description: s.metaDescription,
    alternates: { canonical: `/classes/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, images: [{ url: pexelsPhoto(photos[s.hero].id, 1600), alt: photos[s.hero].alt }] },
  };
}

export default async function ServicePage(props: PageProps<"/classes/[slug]">) {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) notFound();

  const types = classTypes.filter((c) => c.serviceSlug === s.slug);
  const typeIds = new Set(types.map((t) => t.id));
  const team = instructors.filter((i) => i.teaches.some((t) => typeIds.has(t)));

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.h1,
    serviceType: s.name,
    description: s.metaDescription,
    url: `${site.url}/classes/${s.slug}`,
    image: pexelsPhoto(photos[s.hero].id, 1600),
    provider: { "@type": "LocalBusiness", name: site.name, url: site.url, telephone: site.phone },
    areaServed: { "@type": "City", name: "Houston" },
    offers: { "@type": "Offer", priceCurrency: "USD", price: s.priceFrom, availability: "https://schema.org/InStock", url: `${site.url}/pricing` },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd} />
      <PageHero eyebrow={s.eyebrow} title={s.h1} lead={s.intro} image={s.hero}>
        <Button href="/schedule" variant="light">
          Book a class
        </Button>
        <Button href="/pricing" variant="outline-light">
          See pricing
        </Button>
      </PageHero>

      {/* Description beside tall image */}
      <section className="bg-ivory py-24 sm:py-32" aria-labelledby="service-about">
        <Container wide>
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow>About {s.shortName.toLowerCase()} at Aurelle</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 id="service-about" className="mt-6 font-serif text-h2 font-light text-charcoal balance">
                  {s.name} <em className="italic text-mocha">done properly.</em>
                </h2>
              </Reveal>
              <div className="mt-8 space-y-6">
                {s.description.map((p, i) => (
                  <Reveal key={i} delay={0.15 + i * 0.08}>
                    <p className="lead text-stone pretty">{p}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.3}>
                <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-charcoal/10 pt-8">
                  {[
                    ["Length", s.duration],
                    ["Class size", s.classSize],
                    ["Level", s.level],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs uppercase tracking-[0.18em] text-stone">{k}</dt>
                      <dd className="mt-2 font-serif text-xl text-charcoal">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-6">
              <ParallaxImage id={s.gallery[0]} className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 50vw, 100vw" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="border-t border-charcoal/10 bg-ivory py-24 sm:py-32" aria-labelledby="service-benefits">
        <Container wide>
          <Reveal>
            <SectionHeading eyebrow="Why it works" title={<span id="service-benefits">What {s.shortName.toLowerCase()} Pilates in Houston does for your body</span>} />
          </Reveal>
          <Stagger className="mt-14 grid gap-px bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
            {s.benefits.map((b, i) => (
              <StaggerItem key={b.title}>
                <div className="h-full bg-ivory p-8">
                  <p className="font-serif text-4xl font-light text-gold-deep">0{i + 1}</p>
                  <h3 className="mt-6 font-serif text-2xl font-medium text-charcoal">{b.title}</h3>
                  <p className="mt-3 text-stone">{b.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Expect and who */}
      <section className="bg-sand py-24 sm:py-32" aria-labelledby="service-expect">
        <Container wide>
          <div className="grid gap-16 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>Your first class</Eyebrow>
              <h2 id="service-expect" className="mt-6 font-serif text-h3 font-light text-charcoal">
                What to expect
              </h2>
              <ol className="mt-8 space-y-6">
                {s.whatToExpect.map((item, i) => (
                  <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-charcoal/10 pt-5">
                    <span className="font-serif text-2xl text-gold-deep">{i + 1}</span>
                    <p className="text-charcoal">{item}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.1}>
              <Eyebrow>Who it is for</Eyebrow>
              <h2 className="mt-6 font-serif text-h3 font-light text-charcoal">Made for</h2>
              <ul className="mt-8 space-y-4">
                {s.whoItsFor.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-lg text-charcoal">
                    <span aria-hidden="true" className="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Film band */}
      {s.clip && (
        <section className="on-dark relative flex min-h-[70vh] items-center overflow-hidden bg-charcoal text-ivory" aria-labelledby="service-film">
          <VideoBackground id={s.clip} controlClassName="bottom-6 right-5 sm:right-8 lg:right-12" />
          <div aria-hidden="true" className="absolute inset-0 bg-charcoal/55" />
          <Container className="relative z-10 py-24 text-center">
            <Reveal>
              <Eyebrow light className="justify-center">
                {s.duration}, fully present
              </Eyebrow>
              <p id="service-film" className="mx-auto mt-6 max-w-3xl font-serif text-h2 font-light balance">
                Every spring, every breath, <em className="italic text-gold-light">every rep seen.</em>
              </p>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Class types */}
      <section className="bg-ivory py-24 sm:py-32" aria-labelledby="service-formats">
        <Container wide>
          <Reveal>
            <SectionHeading eyebrow="Formats" title={<span id="service-formats">{s.name} classes on the schedule</span>} />
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {types.map((c) => (
              <StaggerItem key={c.id}>
                <article className="flex h-full flex-col border border-charcoal/10 bg-ivory p-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-gold-deep">{c.level}</p>
                  <h3 className="mt-3 font-serif text-3xl font-light text-charcoal">{c.name}</h3>
                  <p className="mt-4 flex-1 text-stone">{c.description}</p>
                  <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal">
                    <div className="flex gap-2">
                      <dt className="text-stone">Length</dt>
                      <dd>{c.duration} min</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-stone">Size</dt>
                      <dd>{c.capacity === 1 ? "1" : `Up to ${c.capacity}`}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-stone">Drop in</dt>
                      <dd>${c.dropIn}</dd>
                    </div>
                  </dl>
                  <Link href={`/schedule?class=${c.id}`} className="eyebrow mt-8 inline-block self-start border-b border-charcoal pb-1 text-charcoal hover:border-gold-deep hover:text-gold-deep">
                    See schedule
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-ivory pb-24 sm:pb-32" aria-label={`${s.name} gallery`}>
        <Container wide>
          <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {s.gallery.map((g, i) => (
              <StaggerItem key={`${g}-${i}`}>
                <figure className="img-zoom relative aspect-[3/4] overflow-hidden bg-sand">
                  <Photo id={g} sizes="(min-width: 1024px) 25vw, 50vw" />
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Instructors */}
      {team.length > 0 && (
        <section className="border-t border-charcoal/10 bg-ivory py-24 sm:py-32" aria-labelledby="service-team">
          <Container wide>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <SectionHeading eyebrow="Your instructors" title={<span id="service-team">Who teaches {s.shortName.toLowerCase()} at Aurelle</span>} />
              </Reveal>
              <Reveal delay={0.1}>
                <Button href="/instructors" variant="outline">
                  All instructors
                </Button>
              </Reveal>
            </div>
            <Stagger className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
              {team.map((p) => (
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
      )}

      {/* FAQ */}
      <section className="bg-sand py-24 sm:py-32" aria-labelledby="service-faq">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Questions" title={<span id="service-faq">{s.shortName} Pilates in Houston, answered</span>} />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <Accordion items={s.faqs} />
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <Button href="/faq" variant="link">
              More questions and answers
            </Button>
          </Reveal>
        </Container>
      </section>

      <CtaBand primary={{ label: "Book a class", href: "/schedule" }} secondary={{ label: "See pricing", href: "/pricing" }} />
    </>
  );
}
