# Aurelle Pilates

Concept website and booking platform for a boutique reformer and mat Pilates studio opening in Southwest Houston in November 2026. Built as a pitch mockup: every page, flow and portal works end to end on demo data with no backend to set up.

## What is inside

- **Marketing site** with SEO first pages: home, four service pages (reformer, private and duet, mat, prenatal and postnatal), classes hub, instructors and five instructor profiles, pricing, intro offer, new to Pilates guide, FAQ with FAQPage schema, journal with three articles, about, contact, accessibility statement and privacy draft. Every page has one H1 with Pilates in Houston phrasing, per page metadata, canonical links, JSON-LD structured data, a sitemap and robots rules.
- **Booking** on the schedule page: a 14 day live schedule generated from a weekly template, filters by class and instructor, and an accessible booking panel that spends class credits.
- **Purchases** through Stripe Checkout in test mode. Without keys the site falls back to a polished mock checkout so the demo never breaks.
- **ClassPass ready**: ClassPass has no public booking API, so the site exposes Book on ClassPass entry points driven by one config flag and listing URL.
- **Client portal** at `/account`: credits, upcoming classes with cancellation, purchase history, profile.
- **Owner portal** at `/studio`: dashboard with live KPIs, schedule management (reassign instructors, change capacity, cancel or add classes), bookings, clients with notes and credit adjustments, instructor load, package sales, announcements and integrations.
- **Accessibility**: built to WCAG 2.2 AA. Skip link, visible focus, keyboard operable dialogs and menus with focus trapping, labelled forms, live regions, semantic tables, one H1 per page, reduced motion honored for parallax, reveals and ambient video, and audited with axe-core across the key routes.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Demo sign in is on `/login` (client or studio owner). Demo data lives in the browser; reset it from the login page or studio settings.

## Stripe test mode

Copy `.env.example` to `.env.local` and add test keys:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use card `4242 4242 4242 4242` with any future date and CVC. Without keys the Buy buttons complete a mock purchase.

## Swap the brand

- `src/lib/site.ts`: studio name, address, phone, hours, social links, ClassPass listing URL.
- `src/lib/media.ts`: every photo and clip is a Pexels asset referenced by id. Replace with studio photography when ready.
- `src/lib/data/`: services, instructors, class types, weekly schedule template, packages, journal posts, FAQ and testimonials.
- `src/app/globals.css`: color tokens and type scale.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion, Lenis, Stripe, Cormorant Garamond and Jost via next/font.

## Production notes

This is a mockup. For launch: connect bookings and purchases to the studio's booking platform or a database, add real authentication, wire Stripe webhooks, replace Pexels media, and have the privacy policy reviewed by counsel.
