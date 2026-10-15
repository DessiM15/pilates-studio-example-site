"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { useStudio } from "@/lib/store/StudioProvider";
import { packages, formatPrice, type Package } from "@/lib/data/packages";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const groups: { key: Package["kind"]; title: string; blurb: string }[] = [
  { key: "intro", title: "Start here", blurb: "One time offer for new clients." },
  { key: "group", title: "Group class packs", blurb: "Reformer, mat and specialty classes. Mat classes count as one credit." },
  { key: "membership", title: "Membership", blurb: "For members who come three times a week or more." },
  { key: "private", title: "Private and duet", blurb: "One on one or shared sessions on full apparatus." },
];

export function PackageGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const { purchase } = useStudio();
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cancelled = params.get("cancelled") === "1";

  async function buy(pkg: Package) {
    setPending(pkg.id);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ packageId: pkg.id }) });
      const data = (await res.json()) as { url?: string; mock?: boolean; error?: string };
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      if (data.mock) {
        purchase(pkg.id, "mock");
        router.push(`/checkout/success?package=${pkg.id}&mock=1`);
        return;
      }
      setError(data.error ?? "Checkout is unavailable right now. Please try again.");
    } catch {
      setError("Checkout is unavailable right now. Please try again.");
    } finally {
      setPending(null);
    }
  }

  return (
    <section className="bg-ivory pb-24 sm:pb-32" aria-labelledby="packages-title">
      <Container wide>
        <h2 id="packages-title" className="sr-only">
          Packages
        </h2>
        {cancelled && (
          <p role="status" className="mb-10 border-l-2 border-gold-deep bg-sand p-4 text-sm text-charcoal">
            Checkout was cancelled. Your card was not charged.
          </p>
        )}
        {error && (
          <p role="alert" className="mb-10 border-l-2 border-danger bg-sand p-4 text-sm text-charcoal">
            {error}
          </p>
        )}

        <div className="space-y-20">
          {groups.map((g) => {
            const list = packages.filter((p) => p.kind === g.key);
            return (
              <div key={g.key}>
                <Reveal>
                  <div className="flex flex-col gap-2 border-b border-charcoal/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <h3 className="font-serif text-h3 font-light text-charcoal">{g.title}</h3>
                    <p className="text-sm text-stone">{g.blurb}</p>
                  </div>
                </Reveal>
                <ul className={clsx("mt-8 grid gap-6", list.length === 1 ? "lg:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}>
                  {list.map((p, i) => (
                    <Reveal key={p.id} delay={i * 0.06} as="li">
                      <article
                        className={clsx(
                          "flex h-full flex-col justify-between p-8",
                          p.highlight ? "on-dark bg-charcoal text-ivory grain relative overflow-hidden" : "border border-charcoal/10 bg-white text-charcoal",
                        )}
                        aria-labelledby={`pkg-${p.id}`}
                      >
                        <div className="relative">
                          {p.badge && <Eyebrow light={p.highlight}>{p.badge}</Eyebrow>}
                          <h4 id={`pkg-${p.id}`} className={clsx("font-serif text-3xl font-medium", p.badge && "mt-4")}>
                            {p.name}
                          </h4>
                          <p className="mt-4 font-serif text-6xl font-light">
                            {formatPrice(p.price)}
                            {p.kind === "membership" && <span className="ml-1 text-lg text-current/70">per month</span>}
                          </p>
                          {p.perClass && <p className={clsx("mt-1 text-sm", p.highlight ? "text-ivory/70" : "text-stone")}>{formatPrice(Math.round(p.perClass * 100) / 100)} per class</p>}
                          <p className={clsx("mt-5", p.highlight ? "text-ivory/80" : "text-stone")}>{p.description}</p>
                          <dl className={clsx("mt-6 grid grid-cols-2 gap-4 border-t pt-4 text-sm", p.highlight ? "border-ivory/15" : "border-charcoal/10")}>
                            <div>
                              <dt className={clsx("eyebrow", p.highlight ? "text-gold-light" : "text-stone")}>Credits</dt>
                              <dd className="mt-1">{p.credits === "unlimited" ? "Unlimited" : p.credits}</dd>
                            </div>
                            <div>
                              <dt className={clsx("eyebrow", p.highlight ? "text-gold-light" : "text-stone")}>Expires</dt>
                              <dd className="mt-1">{p.expiresIn}</dd>
                            </div>
                          </dl>
                        </div>
                        <button
                          type="button"
                          onClick={() => buy(p)}
                          disabled={pending !== null}
                          aria-busy={pending === p.id}
                          className={clsx(
                            "eyebrow relative mt-8 px-6 py-4 transition disabled:opacity-60",
                            p.highlight ? "bg-ivory text-charcoal hover:bg-gold-light" : "bg-charcoal text-ivory hover:bg-mocha",
                          )}
                        >
                          {pending === p.id ? "Opening checkout" : `Buy ${p.name}`}
                        </button>
                      </article>
                    </Reveal>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
