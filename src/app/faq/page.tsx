import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqs } from "@/lib/data/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pilates in Houston FAQ | Booking, Pricing, ClassPass and First Visits",
  description:
    "Answers to the questions we hear most at our Southwest Houston Pilates studio: what to wear, how to book, cancellation policy, ClassPass, accessibility, injuries and pregnancy.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((c) => c.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))),
  };
  return (
    <>
      <JsonLd data={faqLd} />
      <PageIntro eyebrow="Help" title="Pilates in Houston: Frequently Asked Questions" lead="Everything from grip socks to cancellation windows. If your question is not here, we are one email away." />
      <div className="bg-ivory pb-24 sm:pb-32">
        {faqs.map((cat, i) => (
          <section key={cat.category} className={i > 0 ? "mt-20" : ""} aria-labelledby={`faq-${i}`}>
            <Container>
              <Reveal>
                <Eyebrow>{`0${i + 1}`}</Eyebrow>
                <h2 id={`faq-${i}`} className="mt-4 font-serif text-h3 font-light text-charcoal">
                  {cat.category}
                </h2>
              </Reveal>
              <Reveal delay={0.1} className="mt-8">
                <Accordion items={cat.items} />
              </Reveal>
            </Container>
          </section>
        ))}
      </div>
      <section className="bg-sand py-20 sm:py-24" aria-labelledby="still-title">
        <Container>
          <Reveal className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>Still have a question?</Eyebrow>
              <h2 id="still-title" className="mt-4 font-serif text-h3 font-light text-charcoal">
                Ask a real person
              </h2>
              <p className="mt-4 text-stone">
                Call <a href={site.phoneHref} className="underline decoration-gold-deep/60 underline-offset-4 hover:decoration-gold-deep">{site.phone}</a> during studio hours or email{" "}
                <a href={`mailto:${site.email}`} className="underline decoration-gold-deep/60 underline-offset-4 hover:decoration-gold-deep">{site.email}</a>. We reply within one business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <Button href="/contact">Contact the studio</Button>
              <Button href="/new-to-pilates" variant="outline">
                Beginner guide
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
