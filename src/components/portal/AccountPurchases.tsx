"use client";

import Link from "next/link";
import { useStudio } from "@/lib/store/StudioProvider";
import { getPackage, formatPrice } from "@/lib/data/packages";
import { formatDateShort } from "@/lib/data/schedule";

const viaLabel = { stripe: "Card", mock: "Demo", "front-desk": "Front desk" } as const;

export function AccountPurchases() {
  const { state } = useStudio();
  const list = state.purchases.filter((p) => p.userId === (state.user?.id ?? "u-avery"));

  return (
    <div>
      <h1 className="font-serif text-h2 font-light text-charcoal">Purchases</h1>
      <p className="mt-3 text-stone">Every package and membership on your account, newest first.</p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <caption className="sr-only">Your purchase history</caption>
          <thead>
            <tr className="border-b border-charcoal/20">
              <th scope="col" className="eyebrow py-3 pr-4 font-medium text-stone">Package</th>
              <th scope="col" className="eyebrow py-3 pr-4 font-medium text-stone">Date</th>
              <th scope="col" className="eyebrow py-3 pr-4 font-medium text-stone">Amount</th>
              <th scope="col" className="eyebrow py-3 pr-4 font-medium text-stone">Credits</th>
              <th scope="col" className="eyebrow py-3 pr-4 font-medium text-stone">Expires</th>
              <th scope="col" className="eyebrow py-3 font-medium text-stone">Paid via</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10">
            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-stone">
                  No purchases yet.
                </td>
              </tr>
            )}
            {list.map((p) => {
              const pkg = getPackage(p.packageId);
              return (
                <tr key={p.id}>
                  <th scope="row" className="py-4 pr-4 font-serif text-xl font-normal text-charcoal">
                    {pkg?.name ?? p.packageId}
                  </th>
                  <td className="py-4 pr-4 text-charcoal">{formatDateShort(p.purchasedAt.slice(0, 10))}</td>
                  <td className="py-4 pr-4 text-charcoal">{formatPrice(p.amount)}</td>
                  <td className="py-4 pr-4 text-charcoal">{p.credits === "unlimited" ? "Unlimited" : p.credits}</td>
                  <td className="py-4 pr-4 text-charcoal">{formatDateShort(p.expiresAt)}</td>
                  <td className="py-4 text-charcoal">{viaLabel[p.via]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Link href="/pricing" className="eyebrow mt-10 inline-block bg-charcoal px-6 py-4 text-ivory transition hover:bg-mocha">
        Buy more classes
      </Link>
    </div>
  );
}
