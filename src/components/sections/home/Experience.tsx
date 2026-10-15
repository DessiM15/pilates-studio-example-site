import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { values } from "@/lib/data/content";

export function Experience() {
  return (
    <section className="bg-sand py-24 sm:py-32 lg:py-40" aria-labelledby="experience-title">
      <Container wide>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="The Aurelle experience"
                title={<span id="experience-title">What a Pilates class in Houston should feel like</span>}
                lead="We obsess over the details most studios skip, because the details are what make the method work."
              />
            </Reveal>
            <ul className="mt-14 space-y-10">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08} as="li">
                  <div className="grid grid-cols-[2rem_1fr] gap-4 border-t border-charcoal/10 pt-6">
                    <span className="font-serif text-2xl text-gold-deep">0{i + 1}</span>
                    <div>
                      <h3 className="font-serif text-2xl font-medium text-charcoal">{v.title}</h3>
                      <p className="mt-2 text-stone">{v.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="relative lg:col-span-7">
            <div className="grid grid-cols-12 gap-4">
              <Reveal className="col-span-7">
                <ParallaxImage id="reformerWindows" className="aspect-[3/4] w-full" sizes="(min-width: 1024px) 35vw, 60vw" />
              </Reveal>
              <Reveal className="col-span-5 self-end pb-16" delay={0.15}>
                <ParallaxImage id="matRolls" className="aspect-[3/4] w-full" sizes="(min-width: 1024px) 25vw, 40vw" strength={16} />
              </Reveal>
              <Reveal className="col-span-12 lg:col-span-10 lg:col-start-2" delay={0.2}>
                <ParallaxImage id="reformerRow" className="aspect-[16/9] w-full" sizes="(min-width: 1024px) 55vw, 100vw" strength={8} />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
