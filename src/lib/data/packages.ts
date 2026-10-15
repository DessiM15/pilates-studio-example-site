export type Package = {
  id: string;
  name: string;
  price: number; // USD
  credits: number | "unlimited";
  kind: "group" | "private" | "intro" | "membership";
  expiresIn: string;
  description: string;
  perClass?: number;
  highlight?: boolean;
  badge?: string;
  stripePriceId?: string; // optional; falls back to inline price_data
};

export const packages: Package[] = [
  {
    id: "intro-3",
    name: "Intro Offer",
    price: 59,
    credits: 3,
    kind: "intro",
    expiresIn: "14 days",
    description: "Three reformer or mat classes for new clients. The best way to meet the studio.",
    perClass: 19.67,
    badge: "New clients",
    highlight: true,
  },
  {
    id: "drop-in",
    name: "Single Class",
    price: 38,
    credits: 1,
    kind: "group",
    expiresIn: "30 days",
    description: "One reformer or specialty class. Mat classes are 28.",
    perClass: 38,
  },
  {
    id: "pack-5",
    name: "5 Class Pack",
    price: 175,
    credits: 5,
    kind: "group",
    expiresIn: "60 days",
    description: "Five classes to use across reformer, mat and specialty classes.",
    perClass: 35,
  },
  {
    id: "pack-10",
    name: "10 Class Pack",
    price: 330,
    credits: 10,
    kind: "group",
    expiresIn: "90 days",
    description: "Ten classes with the longest expiration. Our most popular pack.",
    perClass: 33,
    badge: "Most popular",
  },
  {
    id: "unlimited",
    name: "Unlimited Monthly",
    price: 249,
    credits: "unlimited",
    kind: "membership",
    expiresIn: "Renews monthly",
    description: "Unlimited group classes, priority booking and ten percent off privates and retail.",
    badge: "Best value",
  },
  {
    id: "private-1",
    name: "Private Session",
    price: 110,
    credits: 1,
    kind: "private",
    expiresIn: "30 days",
    description: "One fifty five minute private session on full apparatus.",
    perClass: 110,
  },
  {
    id: "private-5",
    name: "5 Private Sessions",
    price: 500,
    credits: 5,
    kind: "private",
    expiresIn: "90 days",
    description: "Five privates with an assessment included. Where real change happens.",
    perClass: 100,
  },
  {
    id: "duet-5",
    name: "5 Duet Sessions",
    price: 350,
    credits: 5,
    kind: "private",
    expiresIn: "90 days",
    description: "Five semi private sessions for you and a partner. Price is per person.",
    perClass: 70,
  },
];

export function getPackage(id: string) {
  return packages.find((p) => p.id === id);
}

export function formatPrice(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}
