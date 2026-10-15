import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Aurelle Pilates in Houston",
  description: "How Aurelle Pilates in Houston collects, uses and protects your information when you book classes, buy packages or contact the studio.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const sections = [
  {
    title: "What we collect",
    body: "When you book a class, buy a package or contact us, we collect your name, email address, phone number and the details of your bookings and purchases. If you tell us about an injury, pregnancy or health condition so we can teach you safely, we store only what you share and only for that purpose.",
  },
  {
    title: "Booking and payments",
    body: "Payments are processed by Stripe. Your card details go directly to Stripe and are never stored on our servers. Stripe's privacy policy applies to the information it collects. We keep a record of what you purchased, when, and how much you paid.",
  },
  {
    title: "ClassPass",
    body: "If you book through ClassPass, ClassPass shares your name and reservation details with us so we can check you in. ClassPass's privacy policy governs the information it collects from you.",
  },
  {
    title: "Cookies and analytics",
    body: "This site uses a small amount of browser storage to remember your sign in and your bookings on this device. We do not sell your data and we do not run advertising trackers.",
  },
  {
    title: "Your choices",
    body: "You can update or delete your information at any time from your client portal or by emailing us. You can unsubscribe from our emails with one click. You may ask us for a copy of the data we hold about you.",
  },
  {
    title: "Contact",
    body: `Questions about privacy? Email ${site.email} or write to ${site.legalName}, ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Privacy Policy" lead="Plain language about what we collect, why, and the choices you have. This is a draft for review by the studio's attorney before launch." />
      <div className="bg-ivory pb-24 sm:pb-32">
        <Container>
          <div className="mx-auto max-w-3xl space-y-14">
            {sections.map((s, i) => (
              <Reveal key={s.title}>
                <Eyebrow>0{i + 1}</Eyebrow>
                <h2 className="mt-4 font-serif text-h3 font-light text-charcoal">{s.title}</h2>
                <p className="mt-4 text-lg text-stone">{s.body}</p>
              </Reveal>
            ))}
            <p className="text-sm text-stone">Last updated October 2026. Draft, not yet reviewed by counsel.</p>
          </div>
        </Container>
      </div>
    </>
  );
}
