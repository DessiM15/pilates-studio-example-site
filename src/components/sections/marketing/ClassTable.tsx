import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { classTypes } from "@/lib/data/classes";
import { services } from "@/lib/data/services";

export function ClassTable() {
  return (
    <section className="bg-sand py-24 sm:py-32" aria-labelledby="class-table-title">
      <Container wide>
        <Reveal>
          <SectionHeading
            eyebrow="Find your class"
            title={<span id="class-table-title">Every Pilates class we teach in Houston</span>}
            lead="Eleven class formats across four disciplines. Levels are a guide, not a gate. Your instructor adapts every class."
          />
        </Reveal>
        <div className="mt-14 space-y-14">
          {services.map((s) => {
            const rows = classTypes.filter((c) => c.serviceSlug === s.slug);
            return (
              <Reveal key={s.slug}>
                <h3 className="font-serif text-2xl font-medium text-charcoal">
                  <Link href={`/classes/${s.slug}`} className="hover:text-mocha">
                    {s.name}
                  </Link>
                </h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                    <caption className="sr-only">{s.name} class formats with level, duration, class size and drop in price</caption>
                    <thead>
                      <tr className="border-b border-charcoal/20 text-xs uppercase tracking-[0.18em] text-stone">
                        <th scope="col" className="py-3 pr-4 font-medium">Class</th>
                        <th scope="col" className="py-3 pr-4 font-medium">Level</th>
                        <th scope="col" className="py-3 pr-4 font-medium">Length</th>
                        <th scope="col" className="py-3 pr-4 font-medium">Class size</th>
                        <th scope="col" className="py-3 pr-4 font-medium">Drop in</th>
                        <th scope="col" className="py-3 font-medium"><span className="sr-only">Schedule</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((c) => (
                        <tr key={c.id} className="border-b border-charcoal/10">
                          <th scope="row" className="py-4 pr-4 font-serif text-xl font-normal text-charcoal">
                            {c.name}
                            <span className="mt-1 block max-w-md font-sans text-sm font-light text-stone">{c.description}</span>
                          </th>
                          <td className="py-4 pr-4 align-top text-charcoal">{c.level}</td>
                          <td className="py-4 pr-4 align-top text-charcoal">{c.duration} min</td>
                          <td className="py-4 pr-4 align-top text-charcoal">{c.capacity === 1 ? "1" : `Up to ${c.capacity}`}</td>
                          <td className="py-4 pr-4 align-top text-charcoal">${c.dropIn}</td>
                          <td className="py-4 align-top">
                            <Link href={`/schedule?class=${c.id}`} className="eyebrow whitespace-nowrap border-b border-charcoal pb-1 text-charcoal hover:border-gold-deep hover:text-gold-deep">
                              See schedule
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
