import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark relative mt-auto overflow-hidden bg-charcoal text-ivory grain">
      <div className="mx-auto max-w-[1600px] px-5 pt-20 pb-10 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow text-gold-light">Pilates in Houston</p>
            <p className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl balance">
              Strength, stillness and a studio that feels like a deep breath.
            </p>
            <div className="mt-10 max-w-md">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-4">
            <FooterColumn title="Classes" items={footerNav.classes} />
            <FooterColumn title="Studio" items={footerNav.studio} />
            <FooterColumn title="Book" items={footerNav.account} />
            <div>
              <h2 className="eyebrow text-gold-light">Visit</h2>
              <address className="mt-5 space-y-4 text-sm not-italic leading-relaxed text-ivory/75">
                <p>
                  <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </a>
                  <br />
                  <span className="text-ivory/55">{site.address.landmark}</span>
                </p>
                <p>
                  <a href={site.phoneHref} className="hover:text-ivory">
                    {site.phone}
                  </a>
                  <br />
                  <a href={`mailto:${site.email}`} className="hover:text-ivory">
                    {site.email}
                  </a>
                </p>
                <ul className="space-y-1">
                  {site.hours.map((h) => (
                    <li key={h.days}>
                      <span className="text-ivory/55">{h.days}</span>
                      <br />
                      {h.time}
                    </li>
                  ))}
                </ul>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-ivory/15 pt-8 text-xs text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                TikTok
              </a>
            </li>
            {site.classpass.enabled && (
              <li>
                <a href={site.classpass.url} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                  Find us on ClassPass
                </a>
              </li>
            )}
            <li>
              <Link href="/accessibility" className="hover:text-ivory">
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-ivory">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <p className="mt-6 text-[0.6875rem] text-ivory/40">Photography and film from Pexels, used for this concept. Replace with studio imagery before launch.</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow text-gold-light">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-ivory/75 transition-colors hover:text-ivory">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
