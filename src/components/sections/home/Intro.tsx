import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Button } from "@/components/ui/Button";
import { stats } from "@/lib/data/content";

export function Intro() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-32 lg:py-40" aria-labelledby="intro-title">
      <Container wide>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 lg:pr-12">
            <Reveal>
              <Eyebrow>The studio</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="intro-title" className="mt-6 font-serif text-h2 font-light text-charcoal balance">
                A Pilates studio in Houston built around one idea: <em className="italic text-mocha">precision is the whole workout.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lead mt-8 max-w-xl text-stone pretty">
                Aurelle is a small, light filled studio in Southwest Houston where every class is capped at eight and every instructor is comprehensively certified. We teach the method the way it was meant to be taught: slowly, carefully, and with your whole body in mind.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/about" variant="outline">
                  Our story
                </Button>
                <Button href="/new-to-pilates" variant="link">
                  New to Pilates? Start here
                </Button>
              </div>
            </Reveal>
            <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-charcoal/10 pt-10 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 * i} className="flex flex-col-reverse">
                  <dt className="mt-2 text-xs uppercase tracking-[0.18em] text-stone">{s.label}</dt>
                  <dd className="font-serif text-5xl font-light text-charcoal">{s.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <div className="relative lg:col-span-6">
            <Reveal className="relative">
              <ParallaxImage id="archesStudio" className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 50vw, 100vw" strength={10} />
              <div className="absolute -bottom-8 -left-4 hidden w-56 bg-ivory p-6 sm:block lg:-left-12">
                <p className="eyebrow text-gold-deep">Opening</p>
                <p className="mt-2 font-serif text-3xl font-light text-charcoal">November 2026</p>
                <p className="mt-1 text-xs text-stone">Southwest Houston</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
