import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/sections/PageIntro";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqs } from "@/lib/data/content";
import { getClassType } from "@/lib/data/classes";

export const metadata: Metadata = {
  title: "Pilates for Beginners in Houston | Your First Class Guide",
  description:
    "New to Pilates? Here is exactly what to expect at your first reformer or mat class in Southwest Houston, which class to start with, and what to wear and bring.",
  alternates: { canonical: "/new-to-pilates" },
};

const steps = [
  { title: "Claim the intro offer", body: "Three classes for 59 dollars. Credits land in your client portal the moment you check out." },
  { title: "Book a beginner friendly class", body: "Reformer Foundations or Classical Mat. Both are built for first timers and taught at an unhurried pace." },
  { title: "Arrive ten minutes early", body: "We will show you the studio, fit your grip socks and walk you through the reformer before class starts." },
  { title: "Move, breathe, ask questions", body: "Your instructor offers a modification for every exercise. Take them freely. Nobody is watching anyone but themselves." },
  { title: "Book your next two", body: "Consistency is where the change happens. Two classes in the first week and most people are hooked." },
];

const starters = [
  { id: "reformer-foundations", who: "You want the full reformer experience with a guided, patient introduction to the machine.", href: "/classes/reformer-pilates" },
  { id: "mat-classical", who: "You would rather learn the fundamentals on the floor first, or you want a practice you can take home.", href: "/classes/mat-pilates" },
  { id: "private-session", who: "You have an injury, a specific goal, or you simply prefer one on one attention before joining a group.", href: "/classes/private-pilates" },
];

const bring = [
  "Fitted, comfortable activewear that lets your instructor see your alignment",
  "Grip socks, required on the reformer and available at the front desk",
  "A water bottle. Filtered water is available in the lounge",
  "Hair ties if you have long hair, since many exercises are lying down",
  "Nothing else. Mats, props, towels and lockers are provided",
];

export default function NewToPilatesPage() {
  const gettingStarted = faqs.find((f) => f.category === "Getting started")?.items ?? [];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: gettingStarted.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <PageIntro eyebrow="Start here" title="Pilates for Beginners in Houston" lead="Everything you need to know before your first class at Aurelle: what happens, what to wear, and which class to book. No experience required, no judgment anywhere.">
        <Button href="/intro-offer">3 classes for $59</Button>
        <Button href="/schedule" variant="outline">
          See the schedule
        </Button>
      </PageIntro>

      <section className="bg-ivory pb-24 sm:pb-32" aria-labelledby="steps-title">
        <Container wide>
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <ParallaxImage id="reformerSeated" className="aspect-[3/4] w-full" sizes="(min-width: 1024px) 40vw, 100vw" />
            </Reveal>
            <div className="lg:col-span-7 lg:pl-8">
              <Reveal>
                <SectionHeading eyebrow="Your first visit" title={<span id="steps-title">Your first Pilates class in Houston, step by step</span>} />
              </Reveal>
              <ol className="mt-12 space-y-8">
                {steps.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.06} as="li">
                    <div className="grid grid-cols-[3rem_1fr] gap-4 border-t border-charcoal/10 pt-6">
                      <span className="font-serif text-3xl text-gold-deep">{i + 1}</span>
                      <div>
                        <h3 className="font-serif text-2xl font-medium text-charcoal">{s.title}</h3>
                        <p className="mt-2 text-stone">{s.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-32" aria-labelledby="which-title">
        <Container wide>
          <Reveal>
            <SectionHeading eyebrow="Choosing" title={<span id="which-title">Which class should I start with?</span>} lead="Three good answers. Pick the one that sounds like you." />
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {starters.map((s) => {
              const c = getClassType(s.id)!;
              return (
                <StaggerItem key={s.id}>
                  <article className="flex h-full flex-col bg-ivory p-8">
                    <p className="text-xs uppercase tracking-[0.18em] text-gold-deep">{c.level}</p>
                    <h3 className="mt-3 font-serif text-3xl font-light text-charcoal">{c.name}</h3>
                    <p className="mt-4 text-charcoal">{s.who}</p>
                    <p className="mt-4 flex-1 text-sm text-stone">{c.description}</p>
                    <p className="mt-6 text-sm text-charcoal">
                      {c.duration} minutes, {c.capacity === 1 ? "one on one" : `up to ${c.capacity} people`}, ${c.dropIn} drop in
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Link href={`/schedule?class=${c.id}`} className="eyebrow border-b border-charcoal pb-1 text-charcoal hover:border-gold-deep hover:text-gold-deep">
                        See schedule
                      </Link>
                      <Link href={s.href} className="eyebrow border-b border-transparent pb-1 text-stone hover:border-gold-deep hover:text-gold-deep">
                        Learn more
                      </Link>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <section className="on-dark relative flex min-h-[70vh] items-center overflow-hidden bg-charcoal text-ivory" aria-labelledby="film-title">
        <VideoBackground id="plank" controlClassName="bottom-6 right-5 sm:right-8 lg:right-12" />
        <div aria-hidden="true" className="absolute inset-0 bg-charcoal/55" />
        <Container className="relative z-10 py-24 text-center">
          <Reveal>
            <Eyebrow light className="justify-center">
              Day one
            </Eyebrow>
            <p id="film-title" className="mx-auto mt-6 max-w-3xl font-serif text-h2 font-light balance">
              Nobody is good at this on day one. <em className="italic text-gold-light">That is the point.</em>
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory py-24 sm:py-32" aria-labelledby="bring-title">
        <Container wide>
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading eyebrow="Pack light" title={<span id="bring-title">What to wear and bring</span>} />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
                {bring.map((b) => (
                  <li key={b} className="flex items-start gap-4 py-5 text-lg text-charcoal">
                    <span aria-hidden="true" className="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-32" aria-labelledby="faq-title">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Questions" title={<span id="faq-title">Beginner questions, answered</span>} />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <Accordion items={gettingStarted} />
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <Button href="/faq" variant="link">
              Read the full FAQ
            </Button>
          </Reveal>
        </Container>
      </section>

      <CtaBand eyebrow="Begin" title="Three classes for fifty nine dollars" lead="New clients only. Reformer or mat, any instructor, fourteen days to use them." primary={{ label: "Claim the intro offer", href: "/intro-offer" }} secondary={{ label: "View the schedule", href: "/schedule" }} />
    </>
  );
}
