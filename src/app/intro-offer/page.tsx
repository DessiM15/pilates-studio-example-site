import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ClaimOfferButton } from "@/components/sections/marketing/ClaimOfferButton";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { testimonials } from "@/lib/data/content";
import { getPackage } from "@/lib/data/packages";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Intro Offer: 3 Pilates Classes in Houston for $59",
  description:
    "New to Aurelle? Try three reformer or mat Pilates classes in Southwest Houston for 59 dollars. Any instructor, fourteen days to use them.",
  alternates: { canonical: "/intro-offer" },
};

const included = [
  "Three group classes, reformer or mat",
  "Any instructor, any time on the schedule",
  "A short orientation before your first reformer class",
  "Grip socks on us at your first visit",
  "Fourteen days to use all three",
];

const steps = [
  { title: "Claim the offer", body: "Secure checkout takes under a minute. Your three credits land in your client portal immediately." },
  { title: "Book your first class", body: "Choose Reformer Foundations or Classical Mat from the schedule. Arrive ten minutes early and we will set you up." },
  { title: "Come back twice", body: "Use your remaining credits within fourteen days. Most people know by class three whether Aurelle is their studio." },
];

export default function IntroOfferPage() {
  const pkg = getPackage("intro-3")!;
  const offerLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: `${site.name} Intro Offer`,
    description: pkg.description,
    price: pkg.price,
    priceCurrency: "USD",
    url: `${site.url}/intro-offer`,
    eligibleCustomerType: "New customers",
    seller: { "@type": "LocalBusiness", name: site.name, url: site.url },
  };

  return (
    <>
      <JsonLd data={offerLd} />
      <PageHero eyebrow="New clients" title={<>Intro Offer: 3 Pilates Classes in Houston for $59</>} lead="Reformer or mat, any instructor, two weeks to use them. The simplest way to find out whether Aurelle is your studio." image="reformerElegant" align="center">
        <ClaimOfferButton light />
        <Button href="/schedule" variant="outline-light">
          Browse the schedule
        </Button>
      </PageHero>

      <section className="bg-ivory py-24 sm:py-32" aria-labelledby="price-title">
        <Container wide>
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Three classes, fourteen days</Eyebrow>
              <p className="mt-6 flex items-start font-serif font-light leading-none text-charcoal">
                <span className="mt-4 text-4xl text-gold-deep" aria-hidden="true">
                  $
                </span>
                <span className="text-[9rem] sm:text-[12rem]">
                  <span className="sr-only">$</span>59
                </span>
              </p>
              <h2 id="price-title" className="mt-4 font-serif text-h3 font-light text-charcoal balance">
                Less than twenty dollars a class, <em className="italic text-mocha">with the full Aurelle experience.</em>
              </h2>
              <p className="mt-6 text-stone">New clients only. One intro offer per person. Credits expire fourteen days after purchase.</p>
              <ClaimOfferButton className="mt-10" />
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.1}>
                <h2 className="font-serif text-h3 font-light text-charcoal">What is included</h2>
                <ul className="mt-8 divide-y divide-charcoal/10 border-y border-charcoal/10">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-4 py-5 text-lg text-charcoal">
                      <span aria-hidden="true" className="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-32" aria-labelledby="how-title">
        <Container wide>
          <Reveal>
            <SectionHeading eyebrow="How it works" title={<span id="how-title">Three steps to your first Pilates class in Houston</span>} />
          </Reveal>
          <Stagger className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="border-t border-charcoal/15 pt-6">
                  <p className="font-serif text-4xl font-light text-gold-deep">0{i + 1}</p>
                  <h3 className="mt-5 font-serif text-2xl font-medium text-charcoal">{s.title}</h3>
                  <p className="mt-3 text-stone">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <div className="mt-16 max-w-3xl border-l-2 border-gold-deep pl-6 text-sm text-stone">
              <h3 className="eyebrow text-gold-deep">The fine print</h3>
              <p className="mt-3">
                The intro offer is available to new clients only and may be purchased once. Credits expire fourteen days after purchase and may be used for any reformer or mat group class. Prenatal, postnatal, private and duet sessions are not included. Standard cancellation policy applies: cancel at least twelve hours before class to keep your credit.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory py-24 sm:py-32" aria-labelledby="quotes-title">
        <Container wide>
          <Reveal>
            <SectionHeading eyebrow="From our members" title={<span id="quotes-title">What the first three classes led to</span>} />
          </Reveal>
          <Stagger className="mt-14 grid gap-10 md:grid-cols-2">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <blockquote className="h-full border-t border-charcoal/10 pt-6">
                  <p className="font-serif text-2xl font-light leading-snug text-charcoal">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-6">
                    <p className="eyebrow text-gold-deep">{t.name}</p>
                    <p className="mt-1 text-sm text-stone">{t.detail}</p>
                  </footer>
                </blockquote>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBand eyebrow="Ready" title="See when your first class could be" lead="Up to fourteen days of classes are open for booking. Mornings fill first." primary={{ label: "View the schedule", href: "/schedule" }} secondary={{ label: "Questions? Read the FAQ", href: "/faq" }} />
    </>
  );
}
