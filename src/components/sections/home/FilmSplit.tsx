import { VideoBackground } from "@/components/ui/VideoBackground";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function FilmSplit() {
  return (
    <section className="grid bg-ivory lg:grid-cols-2" aria-labelledby="film-title">
      <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[90vh]">
        <VideoBackground id="stretch" controlClassName="bottom-6 left-6" />
      </div>
      <div className="flex items-center px-5 py-20 sm:px-12 lg:px-20 xl:px-28">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Fifty minutes, fully present</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="film-title" className="mt-6 font-serif text-h2 font-light text-charcoal balance">
              Leave your phone in the locker. <em className="italic text-mocha">Find your breath on the carriage.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead mt-8 text-stone pretty">
              Classes begin with a minute of stillness and end with a slow, quiet cool down. In between, your instructor guides every spring change and every breath so the hour belongs entirely to you.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-10 grid gap-4 text-sm text-charcoal sm:grid-cols-2">
              {["Grip socks and towels provided", "Filtered water and cold eucalyptus towels", "Lockers, showers and a quiet lounge", "Free parking at the door"].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10">
              <Button href="/about">Inside the studio</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
