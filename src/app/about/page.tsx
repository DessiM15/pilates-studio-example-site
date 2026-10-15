import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { getInstructor } from "@/lib/data/instructors";
import { stats, values } from "@/lib/data/content";
import type { PhotoKey } from "@/lib/media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Our Pilates Studio in Houston",
  description:
    "Aurelle Pilates is a boutique reformer and mat studio in Southwest Houston founded on precision, small classes and a calm, accessible space. Meet our founder and tour the studio.",
  alternates: { canonical: "/about" },
};

const tour: { id: PhotoKey; caption: string }[] = [
  { id: "reformerRow", caption: "The Reformer Room: eight reformers, linen curtains, morning light" },
  { id: "towerStudio", caption: "The Private Suite with tower, chair and mat" },
  { id: "archesStudioWide", caption: "Arched mirrors frame every class" },
  { id: "matBrick", caption: "The Mat Room, twelve mats and a wall of windows" },
  { id: "towerPlant", caption: "Quiet corners for stretching before and after" },
];

const access = [
  "Step free entrance from the parking lot to every room",
  "An accessible restroom and changing area",
  "Wide aisles between reformers for mobility devices",
  "One adjustable height reformer in every group class",
  "Instructors trained to adapt any exercise on request",
  "Quiet hours on Tuesday and Thursday afternoons with lower music and lighting",
];

export default function AboutPage() {
  const founder = getInstructor("camille-beaumont")!;
  return (
    <>
      <PageHero eyebrow="About Aurelle" title="A Pilates Studio in Houston Built on Precision" lead="Small classes, comprehensively certified instructors and a space designed to lower your heart rate before it raises it." image="moodyLoft">
        <Button href="/instructors" variant="light">
          Meet the instructors
        </Button>
      </PageHero>

      <section className="bg-ivory py-24 sm:py-32" aria-labelledby="founder-title">
        <Container wide>
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <ParallaxImage id={founder.photo} className="aspect-[3/4] w-full" sizes="(min-width: 1024px) 40vw, 100vw" />
            </Reveal>
            <div className="lg:col-span-7 lg:pl-8">
              <Reveal>
                <Eyebrow>The founder</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 id="founder-title" className="mt-6 font-serif text-h2 font-light text-charcoal balance">
                  {founder.name}, <em className="italic text-mocha">{founder.role.toLowerCase()}</em>
                </h2>
              </Reveal>
              <div className="mt-8 space-y-6">
                {founder.bio.map((p, i) => (
                  <Reveal key={i} delay={0.15 + i * 0.08}>
                    <p className="lead text-stone pretty">{p}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.3}>
                <blockquote className="mt-10 border-l-2 border-gold-deep pl-6">
                  <p className="font-serif text-2xl italic text-charcoal">&ldquo;{founder.quote}&rdquo;</p>
                </blockquote>
              </Reveal>
              <Reveal delay={0.35}>
                <div className="mt-10">
                  <Button href={`/instructors/${founder.slug}`} variant="outline">
                    Camille&rsquo;s classes
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-32" aria-labelledby="values-title">
        <Container wide>
          <Reveal>
            <SectionHeading eyebrow="What we believe" title={<span id="values-title">The ideas behind every Pilates class in our Houston studio</span>} />
          </Reveal>
          <Stagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="border-t border-charcoal/15 pt-6">
                  <p className="font-serif text-2xl text-gold-deep">0{i + 1}</p>
                  <h3 className="mt-4 font-serif text-2xl font-medium text-charcoal">{v.title}</h3>
                  <p className="mt-3 text-stone">{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-ivory py-24 sm:py-32" aria-labelledby="tour-title">
        <Container wide>
          <Reveal>
            <SectionHeading eyebrow="The studio" title={<span id="tour-title">Inside the studio</span>} lead={`${site.address.street}, ${site.address.city}. ${site.address.landmark}, with free parking at the door.`} />
          </Reveal>
          <Stagger className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-6">
            {tour.map((t, i) => (
              <StaggerItem key={t.id} className={i === 0 ? "col-span-2 lg:col-span-4" : i === 1 ? "lg:col-span-2" : "lg:col-span-2"}>
                <figure>
                  <div className={`img-zoom relative overflow-hidden bg-sand ${i === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                    <Photo id={t.id} sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"} />
                  </div>
                  <figcaption className="mt-3 text-sm text-stone">{t.caption}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
          <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-charcoal/10 pt-10 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} className="flex flex-col-reverse">
                <dt className="mt-2 text-xs uppercase tracking-[0.18em] text-stone">{s.label}</dt>
                <dd className="font-serif text-5xl font-light text-charcoal">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section className="on-dark relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-32 grain" aria-labelledby="access-title">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading light eyebrow="Accessibility by design" title={<span id="access-title">Every body belongs here</span>} lead="Pilates was created for rehabilitation. We built the studio, and the way we teach, so that no one has to ask whether it is for them." />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <ul className="divide-y divide-ivory/15 border-y border-ivory/15">
                {access.map((a) => (
                  <li key={a} className="flex items-start gap-4 py-5 text-lg">
                    <span aria-hidden="true" className="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-light" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-ivory/70">
                Need something we have not listed? Email <a href={`mailto:${site.email}`} className="underline decoration-gold-light/60 underline-offset-4 hover:decoration-gold-light">{site.email}</a> or read our <a href="/accessibility" className="underline decoration-gold-light/60 underline-offset-4 hover:decoration-gold-light">accessibility statement</a>.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
