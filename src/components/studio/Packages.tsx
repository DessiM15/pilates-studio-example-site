"use client";

import { useId } from "react";
import { useStudio } from "@/lib/store/StudioProvider";
import { packages, formatPrice } from "@/lib/data/packages";
import { Btn, Card, PageTitle, Pill, Table } from "./ui";
import { money } from "./helpers";

export function Packages() {
  const { state } = useStudio();
  const id = useId();

  const sales = packages.map((p) => {
    const rows = state.purchases.filter((x) => x.packageId === p.id);
    return { id: p.id, units: rows.length, revenue: rows.reduce((n, x) => n + x.amount, 0) };
  });

  return (
    <div>
      <PageTitle eyebrow="Commerce" title="Packages and pricing" lead="What is for sale on the pricing page and how each package is performing." />

      <Card>
        <h2 className="font-serif text-2xl font-light text-charcoal">Catalog</h2>
        <p id={`${id}-edit-hint`} className="mt-2 text-sm text-stone">
          Prices live in the packages data file in this concept build. In production, editing here would update the pricing page and Stripe products together.
        </p>
        <Table className="mt-6" caption="Packages for sale" head={["Package", "Price", "Credits", "Expires", "Kind", "Edit"]}>
          {packages.map((p) => (
            <tr key={p.id}>
              <td className="py-4 pr-4">
                <p className="text-charcoal">{p.name}</p>
                {p.badge && <Pill tone="gold">{p.badge}</Pill>}
              </td>
              <td className="py-4 pr-4 font-serif text-xl text-charcoal">{formatPrice(p.price)}</td>
              <td className="py-4 pr-4 text-charcoal">{p.credits === "unlimited" ? "Unlimited" : p.credits}</td>
              <td className="py-4 pr-4 text-stone">{p.expiresIn}</td>
              <td className="py-4 pr-4 text-stone">{p.kind}</td>
              <td className="py-4">
                <Btn variant="outline" ariaDisabled ariaDescribedBy={`${id}-edit-hint`}>
                  Edit
                </Btn>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <Card className="mt-8">
        <h2 className="font-serif text-2xl font-light text-charcoal">Sales summary</h2>
        <Table className="mt-6" caption="Units sold and revenue per package" head={["Package", "Units sold", "Revenue"]}>
          {sales.map((s) => {
            const p = packages.find((x) => x.id === s.id);
            return (
              <tr key={s.id}>
                <th scope="row" className="py-3 pr-4 text-left font-normal text-charcoal">
                  {p?.name}
                </th>
                <td className="py-3 pr-4 text-charcoal">{s.units}</td>
                <td className="py-3 font-serif text-xl text-charcoal">{money(s.revenue)}</td>
              </tr>
            );
          })}
          <tr className="border-t border-charcoal/20">
            <th scope="row" className="py-3 pr-4 text-left text-[0.6875rem] uppercase tracking-[0.18em] text-stone">
              Total
            </th>
            <td className="py-3 pr-4 text-charcoal">{sales.reduce((n, s) => n + s.units, 0)}</td>
            <td className="py-3 font-serif text-xl text-charcoal">{money(sales.reduce((n, s) => n + s.revenue, 0))}</td>
          </tr>
        </Table>
      </Card>
    </div>
  );
}
