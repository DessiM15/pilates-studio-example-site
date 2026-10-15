import type { PhotoKey } from "@/lib/media";

export type Instructor = {
  slug: string;
  name: string;
  firstName: string;
  role: string;
  photo: PhotoKey;
  pronouns: string;
  certifications: string[];
  specialties: string[];
  bio: string[];
  quote: string;
  teaches: string[]; // class type ids
  favorite: string;
  yearsTeaching: number;
};

export const instructors: Instructor[] = [
  {
    slug: "camille-beaumont",
    name: "Camille Beaumont",
    firstName: "Camille",
    role: "Founder and Lead Instructor",
    photo: "portraitCamille",
    pronouns: "she/her",
    certifications: [
      "Balanced Body Comprehensive",
      "Polestar Pilates Rehabilitation",
      "NCPT, National Certified Pilates Teacher",
    ],
    specialties: ["Classical reformer", "Spine health", "Teacher mentoring"],
    bio: [
      "Camille found Pilates at nineteen while rehabbing a dance injury that should have ended her training. It did not. Twelve years, four certifications and two studios later, she opened Aurelle to bring the kind of precise, elegant Pilates she learned in New York and Paris home to Houston.",
      "Her classes are known for calm, exacting cueing and a belief that every body is capable of grace. She teaches Reformer Flow and Sculpt, leads our teacher mentorship program, and still takes class every morning before the studio opens.",
    ],
    quote: "Strength should look effortless. That is the whole point of the practice.",
    teaches: ["reformer-flow", "reformer-sculpt", "private-session", "duet-session"],
    favorite: "Long stretch on the reformer. Nothing hides.",
    yearsTeaching: 12,
  },
  {
    slug: "simone-okafor",
    name: "Simone Okafor",
    firstName: "Simone",
    role: "Senior Reformer Instructor",
    photo: "portraitSimone",
    pronouns: "she/her",
    certifications: ["STOTT Pilates Intensive Reformer and Mat", "Jumpboard Certified", "RYT 200"],
    specialties: ["Reformer Foundations", "Jumpboard cardio", "Breath work"],
    bio: [
      "Simone came to Pilates from a decade in corporate finance and a case of chronic back pain that no amount of stretching fixed. The reformer did. She retrained, taught in Atlanta for six years, and moved to Houston to join Aurelle as our senior reformer instructor.",
      "She is the person we trust with every first timer. Her Foundations classes are patient and encouraging, and her Jumpboard classes are a joyful, sweaty surprise.",
    ],
    quote: "The reformer meets you exactly where you are. My job is to make sure you notice.",
    teaches: ["reformer-foundations", "jumpboard", "sunrise-reformer"],
    favorite: "Footwork. It tells me everything about how someone moves.",
    yearsTeaching: 8,
  },
  {
    slug: "daniela-reyes",
    name: "Daniela Reyes",
    firstName: "Daniela",
    role: "Prenatal and Postnatal Specialist",
    photo: "portraitDaniela",
    pronouns: "she/her",
    certifications: [
      "Balanced Body Comprehensive",
      "Pre and Postnatal Pilates Specialist, Center for Women's Fitness",
      "Pelvic Floor Foundations, Herman and Wallace",
    ],
    specialties: ["Prenatal reformer", "Postnatal recovery", "Pelvic floor rehabilitation"],
    bio: [
      "A Houston native and mother of two, Daniela built her teaching practice around the season of life that most fitness ignores. She holds specialist certifications in pre and postnatal Pilates and pelvic floor rehabilitation and has guided more than three hundred clients through pregnancy and recovery.",
      "Her classes are warm, unhurried and deeply knowledgeable. If you have questions about what is safe, Daniela has answers.",
    ],
    quote: "Your body is doing something extraordinary. We are just here to support it.",
    teaches: ["prenatal-reformer", "postnatal-restore", "private-session"],
    favorite: "Side lying leg series with a client who did not think she could feel strong at thirty eight weeks.",
    yearsTeaching: 9,
  },
  {
    slug: "harper-lindqvist",
    name: "Harper Lindqvist",
    firstName: "Harper",
    role: "Mat and Mobility Instructor",
    photo: "portraitHarper",
    pronouns: "she/her",
    certifications: ["Classical Pilates, Romana's Pilates", "Functional Range Conditioning", "Yoga Alliance E-RYT 500"],
    specialties: ["Classical mat", "Mobility", "Flow and breath"],
    bio: [
      "Harper is our classicist. Trained in the Romana lineage, she teaches the mat order the way it was written and then opens it up with modern mobility science. Her classes are fluid and musical, and members describe them as the best hour of their week.",
      "Before Pilates she danced professionally in Stockholm and Chicago. She brings that sense of rhythm and line to every class she teaches.",
    ],
    quote: "The mat is where you learn who you are. The reformer is where you show it.",
    teaches: ["mat-classical", "mat-core-mobility", "sunrise-reformer"],
    favorite: "The Teaser. Earned, never given.",
    yearsTeaching: 7,
  },
  {
    slug: "mateo-alvarez",
    name: "Mateo Alvarez",
    firstName: "Mateo",
    role: "Private Session and Performance Coach",
    photo: "portraitMateo",
    pronouns: "he/him",
    certifications: ["Polestar Pilates Comprehensive", "NASM Corrective Exercise Specialist", "Titleist Performance Institute Level 2"],
    specialties: ["Athletic performance", "Injury recovery", "Golf and running"],
    bio: [
      "Mateo spent eight years as a strength coach for collegiate athletes before Pilates changed how he thought about power. He now works primarily with private clients: runners rebuilding after injury, golfers chasing rotation, and anyone who wants to move like an athlete again.",
      "He is methodical, encouraging and quietly funny. His clients tend to stay for years.",
    ],
    quote: "Power without control is just injury waiting to happen.",
    teaches: ["private-session", "duet-session", "reformer-sculpt"],
    favorite: "Knee stretches on the reformer. Pure hip and core integration.",
    yearsTeaching: 6,
  },
];

export function getInstructor(slug: string) {
  return instructors.find((i) => i.slug === slug);
}
