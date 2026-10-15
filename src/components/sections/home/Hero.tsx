import Link from "next/link";
import { VideoMontage } from "@/components/ui/VideoMontage";
import { heroMontage } from "@/lib/media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      data-hero-overlay
      className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-ivory"
      aria-labelledby="hero-title"
    >
      <VideoMontage ids={heroMontage} controlClassName="bottom-6 right-5 sm:right-8 lg:right-12" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-charcoal/20" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-24 pt-40 sm:px-8 lg:px-12 lg:pb-28">
        <div className="max-w-4xl">
          <Eyebrow light className="animate-fade-up">
            {site.address.neighborhood}, {site.address.landmark}
          </Eyebrow>
          <h1 id="hero-title" className="mt-7 font-serif text-display font-light balance animate-fade-up [animation-delay:120ms]">
            Reformer Pilates in Houston, <em className="font-normal italic text-gold-light">refined.</em>
          </h1>
          <p className="lead mt-8 max-w-xl text-ivory/85 animate-fade-up [animation-delay:240ms]">
            A boutique reformer and mat studio with classes of eight, instructors who see every rep, and a space designed to slow you down before it makes you strong.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:360ms]">
            <Link href="/schedule" className="eyebrow bg-ivory px-8 py-4 text-charcoal transition hover:bg-gold-light">
              Book a class
            </Link>
            <Link href="/intro-offer" className="eyebrow border border-ivory/60 px-8 py-4 text-ivory transition hover:bg-ivory hover:text-charcoal">
              3 classes for $59
            </Link>
          </div>
        </div>

        <div className="mt-16 hidden items-center justify-between border-t border-ivory/20 pt-6 text-[0.6875rem] uppercase tracking-[0.24em] text-ivory/60 lg:flex">
          <span>Reformer, Mat, Private, Prenatal</span>
          <span aria-hidden="true">Scroll</span>
          <span>Now booking, Houston TX</span>
        </div>
      </div>
    </section>
  );
}
