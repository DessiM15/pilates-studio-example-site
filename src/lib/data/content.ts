import type { PhotoKey } from "@/lib/media";

export const testimonials = [
  {
    quote:
      "I walked in with a back that ached every morning and walked out of my tenth class standing differently. Camille sees everything. This is the most beautiful studio in Houston and the most effective.",
    name: "Priya N.",
    detail: "Member since opening week",
  },
  {
    quote:
      "I tried three reformer studios in the city before Aurelle. The difference is the teaching. Eight people, one instructor, and you never feel lost.",
    name: "Jordan M.",
    detail: "Unlimited member",
  },
  {
    quote:
      "Daniela carried me through my whole third trimester and then through recovery. I did not know Pilates could feel that safe and that strong at the same time.",
    name: "Alexis R.",
    detail: "Prenatal and postnatal client",
  },
  {
    quote:
      "As a runner I came for injury prevention and stayed for the way it makes me feel. Mateo rebuilt my hips in six sessions.",
    name: "Devin O.",
    detail: "Private client",
  },
];

export const faqs: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Getting started",
    items: [
      {
        q: "I have never done Pilates. Where do I start?",
        a: "Start with our Intro Offer, three classes for 59 dollars, and book Reformer Foundations or Classical Mat as your first class. Arrive ten minutes early and we will walk you through everything. If you would rather begin one on one, a private session is the fastest way to feel confident.",
      },
      {
        q: "What should I wear and bring?",
        a: "Fitted, comfortable activewear and grip socks. Grip socks are required on the reformer and available at the front desk. Bring water. We provide everything else.",
      },
      {
        q: "Where is the studio and where do I park?",
        a: "We are in Southwest Houston near US 59 and Beltway 8, with free parking directly in front of the studio. The entrance is on the ground floor and fully step free.",
      },
    ],
  },
  {
    category: "Booking and policies",
    items: [
      {
        q: "How do I book a class?",
        a: "Book on our schedule page, in your client portal, or through ClassPass. Classes can be booked up to fourteen days in advance. Members and private clients get priority access.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancel at least twelve hours before class to return the credit to your account. Late cancellations and no shows forfeit the credit. Unlimited members are charged a 15 dollar late fee.",
      },
      {
        q: "Can I use ClassPass?",
        a: "Yes. Aurelle Pilates is listed on ClassPass. Our full schedule is available there, and ClassPass clients receive the same warm welcome. If you plan to come regularly, our packages offer better value.",
      },
      {
        q: "Do packages expire?",
        a: "Yes. Each package lists its expiration on the pricing page. Life happens, so if you need an extension for medical reasons or travel, email us and we will take care of you.",
      },
    ],
  },
  {
    category: "Accessibility and health",
    items: [
      {
        q: "Is the studio accessible?",
        a: "Yes. The studio is step free with an accessible restroom, wide aisles between reformers, and an adjustable height reformer. Our instructors are trained to adapt every class. Tell us what you need and we will make it work.",
      },
      {
        q: "I have an injury. Can I still come?",
        a: "In most cases yes, and Pilates may be exactly what you need. Please book a private session first so we can assess and program safely, and bring any notes from your care provider.",
      },
      {
        q: "Can I do Pilates while pregnant?",
        a: "With clearance from your provider, yes. Our Prenatal Reformer classes are led by a certified specialist and adapted by trimester. See our prenatal page for details.",
      },
    ],
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string; // instructor slug
  cover: PhotoKey;
  category: string;
  body: { type: "p" | "h2"; text: string }[];
};

export const posts: Post[] = [
  {
    slug: "reformer-pilates-houston-beginners-guide",
    title: "A Beginner's Guide to Reformer Pilates in Houston",
    excerpt:
      "What the machine actually does, what your first class feels like, and how to choose a studio in a city with more reformers than ever.",
    date: "2026-10-01",
    readTime: "6 min read",
    author: "camille-beaumont",
    cover: "reformerWindows",
    category: "Getting started",
    body: [
      { type: "p", text: "Houston has fallen in love with the reformer, and for good reason. It is one of the few pieces of fitness equipment that makes you stronger and more mobile at the same time, and it does so without the pounding that keeps so many people out of the gym." },
      { type: "h2", text: "What the reformer actually does" },
      { type: "p", text: "A reformer is a sliding carriage attached to a frame by springs. The springs provide resistance when you push the carriage away and support when you control it back. Your job in every exercise is to move with precision while the springs try to move you. That constant negotiation is what builds the long, controlled strength Pilates is known for." },
      { type: "h2", text: "What your first class feels like" },
      { type: "p", text: "Expect to lie down for the first ten minutes. Footwork, the opening series of every reformer class, teaches you the springs, the breath and the position of your spine. From there you will move through abdominal work, arm work on the straps, and standing or kneeling exercises that challenge balance. You will finish feeling taller and warmer, and the next day you will discover muscles you forgot you had." },
      { type: "h2", text: "How to choose a studio" },
      { type: "p", text: "Look for small classes, usually eight or fewer. Ask whether the instructors hold comprehensive certifications that include the full apparatus, not a weekend reformer course. Visit the space. The best studios in Houston feel calm the moment you walk in, because calm is where good movement starts." },
    ],
  },
  {
    slug: "pilates-for-back-pain",
    title: "Why Pilates Is the Best Thing You Can Do for Your Back",
    excerpt:
      "Most back pain is a stability problem, not a strength problem. Here is how the method addresses the root cause.",
    date: "2026-09-18",
    readTime: "5 min read",
    author: "mateo-alvarez",
    cover: "reformerElegant",
    category: "Movement science",
    body: [
      { type: "p", text: "I spent years coaching athletes to lift heavier before I understood that most of the backs in my gym did not need more strength. They needed better timing. The deep muscles that stabilize the spine have to fire before the big muscles move, and in most adults that sequence has gone quiet." },
      { type: "h2", text: "The stability system" },
      { type: "p", text: "The transversus abdominis, the pelvic floor, the multifidus and the diaphragm form a pressurized cylinder around your spine. When they work together, your back is protected during every movement. Pilates trains that cylinder directly, with the breath, in every exercise." },
      { type: "h2", text: "Why the reformer helps" },
      { type: "p", text: "The springs let us load a movement very lightly and very precisely. That means we can rebuild the stabilizing pattern without provoking pain, then progress the load over weeks until the spine is strong in every direction." },
      { type: "p", text: "If you are in pain now, start with a private session. If you are not, start with group classes and stay consistent. Two classes a week for eight weeks is where most of our clients report their mornings have changed." },
    ],
  },
  {
    slug: "prenatal-pilates-what-is-safe",
    title: "Prenatal Pilates: What Is Safe, Trimester by Trimester",
    excerpt:
      "A specialist's honest guide to moving well through pregnancy, from the first weeks to the fourth trimester.",
    date: "2026-09-04",
    readTime: "7 min read",
    author: "daniela-reyes",
    cover: "prenatalMeditate",
    category: "Prenatal and postnatal",
    body: [
      { type: "p", text: "The most common question I hear from expecting clients is some version of: is this safe? The honest answer is that with the right adaptations and your provider's clearance, Pilates is one of the safest and most useful things you can do for your pregnant body." },
      { type: "h2", text: "First trimester" },
      { type: "p", text: "Most clients continue their regular practice with minor changes. We reduce intense abdominal flexion, watch for fatigue, and begin introducing pelvic floor awareness early so the muscles are familiar when they matter most." },
      { type: "h2", text: "Second trimester" },
      { type: "p", text: "We move away from long periods lying on the back and use wedges and incline positions on the reformer. Side lying work, standing work and hip mobility take center stage. Many clients feel their best in these weeks." },
      { type: "h2", text: "Third trimester" },
      { type: "p", text: "Comfort leads. Breath, pelvic floor release, and gentle strength for the positions of labor. We prepare the body to open, not just to hold." },
      { type: "h2", text: "The fourth trimester" },
      { type: "p", text: "From six weeks postpartum with clearance, Postnatal Restore rebuilds the core from the inside, with careful attention to diastasis recti and the pelvic floor. It is slow on purpose. It works." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const stats = [
  { value: "8", label: "Reformers per class, never more" },
  { value: "5", label: "Comprehensively certified instructors" },
  { value: "50", label: "Minutes to a stronger, taller you" },
  { value: "4", label: "Pilates disciplines under one roof" },
];

export const values = [
  {
    title: "Precision over intensity",
    body: "We would rather you do five perfect repetitions than fifty careless ones. Form is the workout.",
  },
  {
    title: "Small by design",
    body: "Eight reformers and twelve mats. Our instructors learn your name and your body in the first week.",
  },
  {
    title: "Calm is a feature",
    body: "Soft light, warm wood and quiet music. The studio is built to lower your heart rate before class raises it.",
  },
  {
    title: "Every body belongs",
    body: "Step free, accessible, and adaptable. Pilates was created for rehabilitation and we have never forgotten it.",
  },
];
