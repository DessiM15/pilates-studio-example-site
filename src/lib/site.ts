/**
 * Single source of truth for the brand. Swap the name, address and
 * links here and the whole site, metadata and structured data follow.
 */
export const site = {
  name: "Aurelle Pilates",
  legalName: "Aurelle Pilates Houston LLC",
  tagline: "Reformer Pilates in Southwest Houston",
  description:
    "Aurelle Pilates is a boutique reformer and mat Pilates studio in Southwest Houston near US 59 and Beltway 8. Small classes, expert instructors, and a calm, beautiful space to build strength from the inside out.",
  url: "https://aurellepilates.com",
  email: "hello@aurellepilates.com",
  phone: "(713) 555-0142",
  phoneHref: "tel:+17135550142",
  address: {
    street: "9801 Southwest Freeway, Suite 140",
    city: "Houston",
    state: "TX",
    zip: "77074",
    neighborhood: "Southwest Houston",
    landmark: "near US 59 and Beltway 8",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=9801+Southwest+Freeway+Houston+TX+77074",
    geo: { lat: 29.6736, lng: -95.5375 },
  },
  hours: [
    { days: "Monday to Friday", time: "6:00 am to 8:00 pm" },
    { days: "Saturday", time: "7:30 am to 2:00 pm" },
    { days: "Sunday", time: "8:00 am to 1:00 pm" },
  ],
  social: {
    instagram: "https://instagram.com/aurellepilates",
    facebook: "https://facebook.com/aurellepilates",
    tiktok: "https://tiktok.com/@aurellepilates",
  },
  /**
   * ClassPass has no public booking API. Studios appear on ClassPass through
   * their booking platform, and the website links out to the listing.
   * Paste the studio's ClassPass venue URL here once it is live.
   */
  classpass: {
    enabled: true,
    url: "https://classpass.com/studios/aurelle-pilates-houston",
  },
  opening: "November 2026",
} as const;

export const nav = [
  { label: "Classes", href: "/classes" },
  { label: "Schedule", href: "/schedule" },
  { label: "Instructors", href: "/instructors" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  classes: [
    { label: "Reformer Pilates", href: "/classes/reformer-pilates" },
    { label: "Private and Duet Sessions", href: "/classes/private-pilates" },
    { label: "Mat Pilates", href: "/classes/mat-pilates" },
    { label: "Prenatal and Postnatal", href: "/classes/prenatal-pilates" },
  ],
  studio: [
    { label: "About the Studio", href: "/about" },
    { label: "Our Instructors", href: "/instructors" },
    { label: "New to Pilates", href: "/new-to-pilates" },
    { label: "Intro Offer", href: "/intro-offer" },
    { label: "FAQ", href: "/faq" },
  ],
  account: [
    { label: "Book a Class", href: "/schedule" },
    { label: "Buy a Package", href: "/pricing" },
    { label: "Client Portal", href: "/account" },
    { label: "Studio Portal", href: "/studio" },
  ],
} as const;
