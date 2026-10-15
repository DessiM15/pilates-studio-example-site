import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Light page opener for utility pages that do not want a photo hero. */
export function PageIntro({ eyebrow, title, lead, children }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="bg-ivory pt-36 pb-16 sm:pt-44 sm:pb-20">
      <Container wide>
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-6 font-serif text-h1 font-light text-charcoal balance">{title}</h1>
          {lead && <p className="lead mt-8 text-stone pretty">{lead}</p>}
          {children && <div className="mt-10 flex flex-wrap gap-4">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
