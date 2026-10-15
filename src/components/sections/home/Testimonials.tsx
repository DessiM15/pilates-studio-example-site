"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data/content";
import { clsx } from "clsx";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (n: number) => setI((n + testimonials.length) % testimonials.length);

  return (
    <section className="on-dark relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-32 lg:py-40 grain" aria-labelledby="testimonials-title">
      <Container>
        <Reveal>
          <Eyebrow light className="justify-center">
            Members on Pilates in Houston
          </Eyebrow>
          <h2 id="testimonials-title" className="sr-only">
            What members say
          </h2>
        </Reveal>
        <div className="relative mt-12" role="region" aria-roledescription="carousel" aria-label="Member testimonials">
          <div aria-live="polite" className="mx-auto max-w-4xl text-center">
            <blockquote key={i} className="animate-fade-up">
              <p className="font-serif text-3xl font-light leading-snug sm:text-4xl lg:text-5xl balance">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-10">
                <p className="eyebrow text-gold-light">{t.name}</p>
                <p className="mt-2 text-sm text-ivory/60">{t.detail}</p>
              </footer>
            </blockquote>
          </div>
          <div className="mt-12 flex items-center justify-center gap-6">
            <button type="button" onClick={() => go(i - 1)} className="eyebrow border border-ivory/30 px-5 py-3 transition hover:border-ivory" aria-label="Previous testimonial">
              Prev
            </button>
            <ol className="flex gap-2" aria-label="Choose a testimonial">
              {testimonials.map((x, n) => (
                <li key={x.name}>
                  <button
                    type="button"
                    onClick={() => setI(n)}
                    aria-current={n === i ? "true" : undefined}
                    aria-label={`Testimonial ${n + 1} of ${testimonials.length}`}
                    className="group flex h-6 w-6 items-center justify-center"
                  >
                    <span aria-hidden="true" className={clsx("block h-2.5 w-2.5 rounded-full transition", n === i ? "bg-gold-light" : "bg-ivory/30 group-hover:bg-ivory/60")} />
                  </button>
                </li>
              ))}
            </ol>
            <button type="button" onClick={() => go(i + 1)} className="eyebrow border border-ivory/30 px-5 py-3 transition hover:border-ivory" aria-label="Next testimonial">
              Next
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
