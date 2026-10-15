import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { StudioProvider } from "@/lib/store/StudioProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { pexelsPhoto, photos } from "@/lib/media";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Pilates Houston",
    "Reformer Pilates Houston",
    "Pilates studio Southwest Houston",
    "Mat Pilates Houston",
    "Prenatal Pilates Houston",
    "Private Pilates Houston",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    locale: "en_US",
    images: [{ url: pexelsPhoto(photos.heroStill.id, 1600), width: 1600, height: 1067, alt: photos.heroStill.alt }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": ["HealthClub", "ExerciseGym", "LocalBusiness"],
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: pexelsPhoto(photos.heroStill.id, 1600),
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
  areaServed: "Houston, TX",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "06:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "07:30", closes: "14:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "08:00", closes: "13:00" },
  ],
  sameAs: Object.values(site.social),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <JsonLd data={localBusiness} />
        <StudioProvider>
          <MotionProvider>
          <SmoothScroll />
          <Header />
          <main id="main" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          </MotionProvider>
        </StudioProvider>
      </body>
    </html>
  );
}
