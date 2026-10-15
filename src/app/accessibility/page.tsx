import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility Statement | Aurelle Pilates in Houston",
  description: "How Aurelle Pilates in Houston makes its website and studio accessible, our WCAG 2.2 AA commitment, and how to report an issue.",
  alternates: { canonical: "/accessibility" },
};

const web = [
  "Full keyboard navigation with a visible focus indicator on every link, button and form field",
  "A skip link to the main content on every page",
  "Animations, parallax and background video that pause or stop when you prefer reduced motion",
  "Descriptive alternative text on every meaningful image and an accessible pause control on all video",
  "Text and interface colors that meet or exceed WCAG AA contrast ratios",
  "Text that can be resized to 200 percent without loss of content or function",
  "Semantic headings, landmarks and labels so screen readers can navigate quickly",
  "Forms with visible labels, clear error messages and announcements of success",
];

const studio = [
  "Step free entrance from the parking lot into every room",
  "Accessible restroom and changing area",
  "Wide aisles between reformers for mobility devices",
  "An adjustable height reformer available in every group class",
  "Instructors trained to adapt any exercise and to describe movements verbally",
  "Lower music and lighting during quiet hours on Tuesday and Thursday afternoons",
  "Service animals welcome",
];

export default function AccessibilityPage() {
  return (
    <>
      <PageIntro eyebrow="Our commitment" title="Accessibility at Aurelle Pilates in Houston" lead="Pilates was created for rehabilitation, and we have never forgotten it. We want every person to be able to use this website and practice in our studio with confidence." />
      <div className="bg-ivory pb-24 sm:pb-32">
        <Container>
          <div className="mx-auto max-w-3xl space-y-16">
            <Reveal>
              <Eyebrow>Standard</Eyebrow>
              <h2 className="mt-4 font-serif text-h3 font-light text-charcoal">Our commitment</h2>
              <p className="mt-4 text-lg text-stone">
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA and to meet our obligations under the Americans with Disabilities Act. Accessibility is reviewed with every update to the site and the studio.
              </p>
            </Reveal>
            <Reveal>
              <Eyebrow>This website</Eyebrow>
              <h2 className="mt-4 font-serif text-h3 font-light text-charcoal">What the site does</h2>
              <ul className="mt-6 divide-y divide-charcoal/10 border-y border-charcoal/10">
                {web.map((w) => (
                  <li key={w} className="flex items-start gap-4 py-4 text-charcoal">
                    <span aria-hidden="true" className="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <Eyebrow>The studio</Eyebrow>
              <h2 className="mt-4 font-serif text-h3 font-light text-charcoal">Physical accommodations</h2>
              <ul className="mt-6 divide-y divide-charcoal/10 border-y border-charcoal/10">
                {studio.map((w) => (
                  <li key={w} className="flex items-start gap-4 py-4 text-charcoal">
                    <span aria-hidden="true" className="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <Eyebrow>Feedback</Eyebrow>
              <h2 className="mt-4 font-serif text-h3 font-light text-charcoal">Report an issue</h2>
              <p className="mt-4 text-lg text-stone">
                If any part of this site or the studio is difficult for you to use, please tell us. Email{" "}
                <a href={`mailto:${site.email}`} className="text-charcoal underline decoration-gold-deep/60 underline-offset-4 hover:decoration-gold-deep">{site.email}</a> or call{" "}
                <a href={site.phoneHref} className="text-charcoal underline decoration-gold-deep/60 underline-offset-4 hover:decoration-gold-deep">{site.phone}</a>. We respond within two business days and will work with you to provide the information or service you need in an accessible way.
              </p>
              <p className="mt-6 text-sm text-stone">This statement was last updated in October 2026.</p>
            </Reveal>
          </div>
        </Container>
      </div>
    </>
  );
}
