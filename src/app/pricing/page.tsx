import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/sections/PageIntro";
import { PackageGrid } from "@/components/sections/booking/PackageGrid";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { packages } from "@/lib/data/packages";
import { faqs } from "@/lib/data/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pilates Pricing and Packages in Houston",
  description:
    "Pilates class packages, memberships and private session pricing at Aurelle Pilates in Southwest Houston. Intro offer: three classes for 59 dollars. Also on ClassPass.",
  alternates: { canonical: "/pricing" },
};

const included = [
  "Grip socks on your first visit, towels and filtered water every visit",
  "Free parking at the door and lockers with showers",
  "Online booking up to fourteen days ahead with free cancellation to twelve hours",
  "Instructor notes after private sessions in your client portal",
  "Credits shared across reformer, mat and specialty classes",
];

export default function PricingPage() {
  const policies = faqs.find((f) => f.category === "Booking and policies")?.items ?? [];
  const catalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${site.name} packages`,
    itemListElement: packages.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.description,
      price: p.price,
      priceCurrency: "USD",
      url: `${site.url}/pricing`,
      availability: "https://schema.org/InStock",
      itemOffered: { "@type": "Service", name: p.name, provider: { "@type": "Organization", name: site.name } },
    })),
  };

  return (
    <>
      <JsonLd data={catalog} />
      <PageIntro eyebrow="Packages" title="Pilates Pricing and Packages in Houston" lead="Simple, transparent pricing. Buy a pack, book from the schedule, and cancel free up to twelve hours before class. New clients start with three classes for fifty nine dollars.">
        <Button href="#packages-title" variant="primary">
          See packages
        </Button>
        <Button href="/schedule" variant="link">
          View the schedule
        </Button>
      </PageIntro>

      <Suspense
        fallback={
          <Container wide>
            <p className="pb-24 text-stone" aria-live="polite">
              Loading packages.
            </p>
          </Container>
        }
      >
        <PackageGrid />
      </Suspense>

      <section className="bg-sand py-24 sm:py-32" aria-labelledby="included-title">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading eyebrow="Every package" title={<span id="included-title">What is included</span>} lead="The small things, handled, so the hour is yours." />
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.1}>
              <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
                {included.map((item) => (
                  <li key={item} className="flex gap-4 py-5 text-charcoal">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {site.classpass.enabled && (
        <section className="on-dark relative overflow-hidden bg-charcoal py-24 text-ivory grain" aria-labelledby="classpass-title">
          <Container wide>
            <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <Eyebrow light>Also on ClassPass</Eyebrow>
                <h2 id="classpass-title" className="mt-6 font-serif text-h3 font-light balance">
                  Bring your ClassPass credits. Our full schedule is listed there too.
                </h2>
                <p className="mt-4 text-ivory/70">If you plan to come more than once a week, a package here is better value. Either way, you are welcome.</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Button href={site.classpass.url} external variant="outline-light">
                  Book on ClassPass
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="bg-ivory py-24 sm:py-32" aria-labelledby="policies-title">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Policies" title={<span id="policies-title">Booking, cancellation and expiry</span>} align="center" />
          </Reveal>
          <div className="mt-12">
            <Accordion items={policies} />
          </div>
        </Container>
      </section>
    </>
  );
}
