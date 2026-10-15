import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/site";

export function Visit() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal text-ivory on-dark" aria-labelledby="visit-title">
      <ParallaxImage id="moodyLoft" className="absolute inset-0 h-full w-full opacity-60" sizes="100vw" strength={8} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-32 sm:px-8 lg:px-12 lg:py-48">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow light>Visit the studio</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="visit-title" className="mt-6 font-serif text-h1 font-light balance">
              Southwest Houston, <em className="italic text-gold-light">minutes from everywhere.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead mt-8 text-ivory/80">
              {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}. Just off US 59 at Beltway 8 with free parking at the door and a step free entrance.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/schedule" variant="light">
                Book your first class
              </Button>
              <Button href="/contact" variant="outline-light">
                Directions and hours
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
