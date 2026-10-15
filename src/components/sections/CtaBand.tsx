import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ReactNode } from "react";

export function CtaBand({
  eyebrow = "Begin",
  title = "Your first class is waiting",
  lead = "Three classes for fifty nine dollars. Reformer or mat, any instructor, two weeks to use them.",
  primary = { label: "Book a class", href: "/schedule" },
  secondary = { label: "See the intro offer", href: "/intro-offer" },
}: {
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-32 grain">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow light className="justify-center">
            {eyebrow}
          </Eyebrow>
          <h2 className="mt-6 font-serif text-h2 font-light balance">{title}</h2>
          <p className="lead mt-6 text-ivory/75">{lead}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={primary.href} variant="light">
              {primary.label}
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="outline-light">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
