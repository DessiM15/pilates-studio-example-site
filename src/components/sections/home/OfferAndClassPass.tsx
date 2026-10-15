import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/lib/site";

export function OfferAndClassPass() {
  return (
    <section className="bg-ivory py-24 sm:py-32" aria-labelledby="offer-title">
      <Container wide>
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-7">
            <div className="relative flex min-h-[32rem] flex-col justify-between overflow-hidden bg-sand p-8 sm:p-12">
              <div className="absolute inset-0 opacity-25 img-zoom">
                <Photo id="reformerSeated" sizes="(min-width: 1024px) 60vw, 100vw" decorative />
              </div>
              <div className="relative">
                <Eyebrow>New to the studio</Eyebrow>
                <h2 id="offer-title" className="mt-6 font-serif text-h2 font-light text-charcoal balance">
                  Three classes. <em className="italic text-mocha">Fifty nine dollars.</em>
                </h2>
                <p className="lead mt-6 max-w-md text-stone">Reformer or mat, any instructor, two weeks to use them. The simplest way to find out whether Aurelle is your studio.</p>
              </div>
              <div className="relative mt-12 flex flex-wrap gap-4">
                <Button href="/intro-offer">Claim the intro offer</Button>
                <Button href="/pricing" variant="link">
                  See all packages
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="on-dark flex min-h-[32rem] flex-col justify-between bg-charcoal p-8 text-ivory sm:p-12">
              <div>
                <Eyebrow light>Also on ClassPass</Eyebrow>
                <h2 className="mt-6 font-serif text-h3 font-light balance">Already a ClassPass member? Our full schedule is there too.</h2>
                <p className="mt-6 text-ivory/70">Book any reformer, mat or specialty class with your credits. First timers on ClassPass are welcome in Reformer Foundations.</p>
              </div>
              <div className="mt-12 flex flex-wrap gap-4">
                {site.classpass.enabled && (
                  <Button href={site.classpass.url} external variant="outline-light">
                    Book on ClassPass
                  </Button>
                )}
                <Button href="/faq" variant="link" className="text-ivory decoration-gold-light/60 hover:decoration-gold-light">
                  How ClassPass works here
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
