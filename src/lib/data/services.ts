import type { PhotoKey, ClipKey } from "@/lib/media";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  /** SEO H1. Every service page leads with Pilates in Houston language. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  description: string[];
  benefits: { title: string; body: string }[];
  whatToExpect: string[];
  whoItsFor: string[];
  duration: string;
  classSize: string;
  level: string;
  priceFrom: number;
  hero: PhotoKey;
  gallery: PhotoKey[];
  clip?: ClipKey;
  classTypeIds: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "reformer-pilates",
    name: "Reformer Pilates",
    shortName: "Reformer",
    h1: "Reformer Pilates in Houston",
    metaTitle: "Reformer Pilates in Houston | Small Group Classes at Aurelle Pilates",
    metaDescription:
      "Small group reformer Pilates classes in Southwest Houston. Eight reformers, expert instructors, and a calm, luxurious studio near US 59 and Beltway 8. Book your first class today.",
    eyebrow: "Signature group classes",
    intro:
      "Eight reformers, one instructor, and fifty minutes of focused, full body work. Our signature reformer classes are where most members fall in love with Pilates in Houston.",
    description: [
      "The reformer is the heart of our studio. Its spring loaded carriage gives you resistance and support at the same time, so every movement becomes both a strength exercise and a lesson in control. Beginners find it approachable. Advanced students find it endless.",
      "Classes are capped at eight so your instructor can see every rep. Expect precise cueing, hands on adjustments if you want them, and a sequence that leaves you taller, warmer, and more aware of your body than when you walked in.",
    ],
    benefits: [
      {
        title: "Long, lean strength",
        body: "Spring resistance builds muscle through full range of motion without bulk or joint stress.",
      },
      {
        title: "A stronger core and spine",
        body: "Every exercise is anchored in deep abdominal and postural work that protects your back for life.",
      },
      {
        title: "Mobility you can feel",
        body: "You leave class moving freely through hips, shoulders and spine, not just tired.",
      },
      {
        title: "Low impact, high reward",
        body: "Gentle on knees and joints, demanding for muscles. Safe to do several times a week.",
      },
    ],
    whatToExpect: [
      "Arrive ten minutes early for your first class so we can show you the reformer and set your springs.",
      "Grip socks are required. We sell them at the front desk if you forget.",
      "Your instructor offers modifications for every exercise. Take them whenever you need to.",
      "Classes run fifty minutes with a short wind down at the end.",
    ],
    whoItsFor: [
      "Complete beginners who want a guided, supportive first experience",
      "Runners, cyclists and athletes who need balance and injury prevention",
      "Anyone returning to movement after time away",
      "Experienced students looking for precision and progression",
    ],
    duration: "50 minutes",
    classSize: "Up to 8",
    level: "All levels, with Foundations for beginners",
    priceFrom: 38,
    hero: "classInSync",
    gallery: ["reformerWindows", "reformerLegsInStraps", "archesStudio", "reformerElegant"],
    clip: "detail",
    classTypeIds: ["reformer-foundations", "reformer-flow", "reformer-sculpt", "sunrise-reformer", "jumpboard"],
    faqs: [
      {
        q: "Do I need experience before a reformer class?",
        a: "No. Our Reformer Foundations class is designed for first timers and covers the machine, the springs and the core principles at an easy pace. Most people are ready for Reformer Flow after two or three Foundations classes.",
      },
      {
        q: "How often should I come?",
        a: "Two to three classes a week is the sweet spot for visible change in a month. Many members come daily once they are hooked, and the low impact nature of the reformer makes that safe.",
      },
      {
        q: "Is reformer Pilates good for back pain?",
        a: "Reformer work is widely used to build the deep core strength that supports the spine. If you have an active injury, book a private session first so we can tailor your program and talk to your care provider if needed.",
      },
    ],
  },
  {
    slug: "private-pilates",
    name: "Private and Duet Sessions",
    shortName: "Private",
    h1: "Private Pilates Sessions in Houston",
    metaTitle: "Private Pilates in Houston | One on One and Duet Sessions at Aurelle",
    metaDescription:
      "Private and duet Pilates sessions in Southwest Houston. Personalized programs on the reformer, tower and mat for injury recovery, athletic performance and faster progress.",
    eyebrow: "One on one and duets",
    intro:
      "Your body, your goals, your instructor. Private Pilates sessions in Houston built entirely around you, with every piece of apparatus in the studio at your disposal.",
    description: [
      "A private session is the fastest way to progress. Your instructor assesses how you move, builds a program for your goals, and adjusts it every single visit. We use the reformer, tower, chair, and mat so your work is never limited by what a group class can offer.",
      "Duets pair you with a friend, partner or family member for a semi private session at a shared rate. It is the perfect way to start if you want attention without going it alone.",
    ],
    benefits: [
      {
        title: "A program built for you",
        body: "Every session is designed around your assessment, your history and what you want to achieve.",
      },
      {
        title: "Injury aware coaching",
        body: "Rehab informed instructors who know when to push and when to protect.",
      },
      {
        title: "Full apparatus access",
        body: "Reformer, tower, chair and mat, chosen session by session for what your body needs.",
      },
      {
        title: "Flexible scheduling",
        body: "Early mornings, lunch hours and evenings, booked around your calendar.",
      },
    ],
    whatToExpect: [
      "Your first session begins with a thirty minute movement assessment and conversation about your goals.",
      "Sessions are fifty five minutes. Duets are shared between two clients with one instructor.",
      "You will receive short notes after each session so you can track progress in your client portal.",
      "Private clients receive priority booking on group classes.",
    ],
    whoItsFor: [
      "Anyone recovering from injury or surgery, with clearance from their care provider",
      "Athletes building a performance edge in the off season",
      "Beginners who want a confident foundation before joining group classes",
      "Clients with specific goals like posture, golf, dance or pregnancy",
    ],
    duration: "55 minutes",
    classSize: "1 or 2",
    level: "Every level, fully personalized",
    priceFrom: 110,
    hero: "reformerWindows",
    gallery: ["towerStudio", "reformerSeated", "duoStretch", "towerPlant"],
    clip: "stretch",
    classTypeIds: ["private-session", "duet-session"],
    faqs: [
      {
        q: "How many private sessions should I start with?",
        a: "Most clients begin with a package of five. That gives us time to assess, build your program and see real change. From there many people move to a mix of privates and group classes.",
      },
      {
        q: "Can I split a duet with someone at a different level?",
        a: "Yes. Your instructor will program for both of you at once. Duets work best when the two of you share a general goal, but matching ability is not required.",
      },
      {
        q: "Do you work with physical therapists?",
        a: "We do. With your permission we will coordinate with your care provider so your Pilates program supports your treatment plan.",
      },
    ],
  },
  {
    slug: "mat-pilates",
    name: "Mat Pilates",
    shortName: "Mat",
    h1: "Mat Pilates Classes in Houston",
    metaTitle: "Mat Pilates in Houston | Classical and Contemporary Classes at Aurelle",
    metaDescription:
      "Mat Pilates classes in Southwest Houston. Classical sequences and contemporary core and mobility work in small groups. The perfect complement to reformer training.",
    eyebrow: "Classical foundations",
    intro:
      "No machine, no excuses. Mat Pilates in Houston the way Joseph Pilates designed it: you, the floor, and the strength to control your own body weight with grace.",
    description: [
      "Mat work is where Pilates began, and it remains the most honest measure of control. Without springs to help or hinder, every movement depends on your own core, breath and precision. Our mat classes draw on the classical order with contemporary props like rings, bands and small balls to keep the work fresh.",
      "Mat classes are a wonderful entry point and an essential complement to reformer training. Members who do both progress fastest.",
    ],
    benefits: [
      {
        title: "Deep core control",
        body: "Nothing builds abdominal and back strength like learning to stabilize your own body against gravity.",
      },
      {
        title: "Take it anywhere",
        body: "Everything you learn on the mat travels with you, from hotel rooms to living rooms.",
      },
      {
        title: "A gentler price point",
        body: "Mat classes are our most accessible way to practice several times a week.",
      },
      {
        title: "Mobility and breath",
        body: "Flowing sequences that open the spine and hips and teach you to breathe under effort.",
      },
    ],
    whatToExpect: [
      "Mats, rings, bands and balls are provided. Just bring water and grip socks.",
      "Classes run fifty minutes in our light filled mat room.",
      "Expect a warm up, a classical sequence, targeted work and a slow cool down.",
      "Modifications and progressions are offered throughout.",
    ],
    whoItsFor: [
      "Beginners who want to learn the fundamentals before the reformer",
      "Reformer students who want to deepen their practice",
      "Anyone who wants a practice they can repeat at home",
      "Members who love a slower, more meditative class",
    ],
    duration: "50 minutes",
    classSize: "Up to 12",
    level: "All levels",
    priceFrom: 28,
    hero: "matDuo",
    gallery: ["matBrick", "matPair", "matHands", "matRolls"],
    clip: "plank",
    classTypeIds: ["mat-classical", "mat-core-mobility"],
    faqs: [
      {
        q: "Is mat Pilates easier than reformer?",
        a: "Different, not easier. The reformer offers support that the mat does not, so many people find mat work more challenging for the core. Both are suitable for beginners with the right cueing.",
      },
      {
        q: "What should I wear?",
        a: "Fitted, comfortable clothing that lets your instructor see your alignment. Grip socks are encouraged but not required on the mat.",
      },
    ],
  },
  {
    slug: "prenatal-pilates",
    name: "Prenatal and Postnatal Pilates",
    shortName: "Prenatal",
    h1: "Prenatal Pilates in Houston",
    metaTitle: "Prenatal and Postnatal Pilates in Houston | Aurelle Pilates",
    metaDescription:
      "Prenatal and postnatal Pilates in Southwest Houston led by certified specialists. Safe strength, pelvic floor care and gentle recovery for every trimester and the fourth.",
    eyebrow: "For every trimester, and the fourth",
    intro:
      "Strength and softness for the most demanding season of your life. Prenatal Pilates in Houston designed by specialists who understand exactly what your body is doing.",
    description: [
      "Pregnancy changes everything about how you move, and the right Pilates program meets you there. Our prenatal classes focus on pelvic floor awareness, hip and back comfort, breath, and the strength you will need for labor and the weeks after. Every exercise is adapted for your trimester.",
      "Postnatal Restore welcomes you back from six weeks postpartum with clearance from your provider. We rebuild the core from the inside out, address diastasis recti with care, and give you a quiet hour that is entirely yours.",
    ],
    benefits: [
      {
        title: "Pelvic floor literacy",
        body: "Learn to find, strengthen and release the muscles that matter most for birth and recovery.",
      },
      {
        title: "Relief for back and hips",
        body: "Targeted mobility and stability work for the aches that come with a changing center of gravity.",
      },
      {
        title: "Confident recovery",
        body: "A progressive postnatal program that respects healing and rebuilds strength safely.",
      },
      {
        title: "Community",
        body: "Small classes with others at the same stage. Many of our members meet lifelong friends here.",
      },
    ],
    whatToExpect: [
      "Please bring a note of clearance from your provider for prenatal classes after twenty weeks and for all postnatal classes.",
      "Props like wedges, balls and bolsters are provided for comfort in every position.",
      "Classes run forty five minutes with plenty of time for questions.",
      "Babies are welcome in Postnatal Restore. Bring a mat or carrier for them.",
    ],
    whoItsFor: [
      "Expecting parents at any trimester with provider clearance",
      "New parents from six weeks postpartum",
      "Anyone healing diastasis recti or pelvic floor weakness",
      "Partners who want to support and move alongside",
    ],
    duration: "45 minutes",
    classSize: "Up to 6",
    level: "Specialist led, all stages",
    priceFrom: 38,
    hero: "prenatalPlank",
    gallery: ["prenatalMeditate", "prenatalReformer", "prenatalClass", "matRolls"],
    classTypeIds: ["prenatal-reformer", "postnatal-restore"],
    faqs: [
      {
        q: "When can I start prenatal Pilates?",
        a: "With provider clearance, many clients begin in the first trimester. If you are new to Pilates we recommend starting with a private session so we can build your program from day one.",
      },
      {
        q: "What if I have diastasis recti?",
        a: "Our postnatal specialists are trained to assess and program for abdominal separation. Tell us at booking and we will pair you with the right instructor.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
