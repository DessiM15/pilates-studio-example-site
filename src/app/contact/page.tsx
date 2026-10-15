import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { CtaBand } from "@/components/sections/CtaBand";
import { ContactForm } from "@/components/sections/marketing/ContactForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Our Pilates Studio in Houston",
  description:
    "Visit Aurelle Pilates in Southwest Houston near US 59 and Beltway 8. Hours, directions, parking, accessibility and a quick way to reach the studio.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Get in touch" title="Contact Aurelle Pilates in Houston" lead="Questions about classes, privates, pregnancy, injuries or ClassPass? Write to us or come by. We love showing people the studio." />
      <section className="bg-ivory pb-24 sm:pb-32" aria-label="Contact form and studio details">
        <Container wide>
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <h2 className="font-serif text-h3 font-light text-charcoal">Send a message</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
              <h2 className="font-serif text-h3 font-light text-charcoal">Visit the studio</h2>
              <address className="mt-8 space-y-8 not-italic">
                <div>
                  <Eyebrow>Address</Eyebrow>
                  <p className="mt-3 text-lg text-charcoal">
                    <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-mocha">
                      {site.address.street}
                      <br />
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-stone">{site.address.neighborhood}, {site.address.landmark}</p>
                </div>
                <div>
                  <Eyebrow>Phone and email</Eyebrow>
                  <p className="mt-3 text-lg text-charcoal">
                    <a href={site.phoneHref} className="hover:text-mocha">{site.phone}</a>
                    <br />
                    <a href={`mailto:${site.email}`} className="hover:text-mocha">{site.email}</a>
                  </p>
                </div>
                <div>
                  <Eyebrow>Hours</Eyebrow>
                  <ul className="mt-3 space-y-2 text-charcoal">
                    {site.hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-6 border-b border-charcoal/10 pb-2">
                        <span className="text-stone">{h.days}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Eyebrow>Parking and access</Eyebrow>
                  <p className="mt-3 text-stone">Free parking directly in front of the studio. The entrance is on the ground floor and fully step free, with an accessible restroom inside.</p>
                </div>
              </address>
              <div className="mt-10 aspect-[4/3] w-full overflow-hidden bg-sand">
                <iframe
                  title="Map showing Aurelle Pilates near US 59 and Beltway 8 in Houston"
                  src="https://www.google.com/maps?q=9801+Southwest+Freeway+Houston+TX+77074&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
