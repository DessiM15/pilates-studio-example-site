export type ClassType = {
  id: string;
  name: string;
  serviceSlug: string;
  level: "Beginner" | "All levels" | "Intermediate" | "Advanced" | "Specialist";
  duration: number; // minutes
  capacity: number;
  credits: number; // class credits consumed from a package
  dropIn: number; // USD
  description: string;
  room: "Reformer Room" | "Mat Room" | "Private Suite";
};

export const classTypes: ClassType[] = [
  {
    id: "reformer-foundations",
    name: "Reformer Foundations",
    serviceSlug: "reformer-pilates",
    level: "Beginner",
    duration: 50,
    capacity: 8,
    credits: 1,
    dropIn: 38,
    description:
      "Your first reformer classes. Learn the carriage, the springs and the core principles at a patient pace. Required for first timers unless you have prior reformer experience.",
    room: "Reformer Room",
  },
  {
    id: "reformer-flow",
    name: "Reformer Flow",
    serviceSlug: "reformer-pilates",
    level: "All levels",
    duration: 50,
    capacity: 8,
    credits: 1,
    dropIn: 38,
    description:
      "Our signature class. A full body sequence that moves from footwork to abdominals to standing work with intention and rhythm. Options for every level.",
    room: "Reformer Room",
  },
  {
    id: "reformer-sculpt",
    name: "Reformer Sculpt",
    serviceSlug: "reformer-pilates",
    level: "Intermediate",
    duration: 50,
    capacity: 8,
    credits: 1,
    dropIn: 38,
    description:
      "Heavier springs, longer holds and sharper focus on glutes, arms and core. Prior reformer experience recommended.",
    room: "Reformer Room",
  },
  {
    id: "sunrise-reformer",
    name: "Sunrise Reformer",
    serviceSlug: "reformer-pilates",
    level: "All levels",
    duration: 45,
    capacity: 8,
    credits: 1,
    dropIn: 38,
    description:
      "A forty five minute early morning class that wakes the spine and sets the day. Quiet music, soft light, strong finish.",
    room: "Reformer Room",
  },
  {
    id: "jumpboard",
    name: "Jumpboard Cardio Reformer",
    serviceSlug: "reformer-pilates",
    level: "Intermediate",
    duration: 50,
    capacity: 8,
    credits: 1,
    dropIn: 38,
    description:
      "Low impact cardio on the reformer jumpboard, layered with strength intervals. Expect to sweat and to smile.",
    room: "Reformer Room",
  },
  {
    id: "mat-classical",
    name: "Classical Mat",
    serviceSlug: "mat-pilates",
    level: "All levels",
    duration: 50,
    capacity: 12,
    credits: 1,
    dropIn: 28,
    description:
      "The original mat order taught with modern cueing. Hundred to seal, with modifications and progressions throughout.",
    room: "Mat Room",
  },
  {
    id: "mat-core-mobility",
    name: "Core and Mobility",
    serviceSlug: "mat-pilates",
    level: "All levels",
    duration: 50,
    capacity: 12,
    credits: 1,
    dropIn: 28,
    description:
      "Contemporary mat work with rings, bands and balls. Deep core strength paired with joint mobility you can feel for days.",
    room: "Mat Room",
  },
  {
    id: "prenatal-reformer",
    name: "Prenatal Reformer",
    serviceSlug: "prenatal-pilates",
    level: "Specialist",
    duration: 45,
    capacity: 6,
    credits: 1,
    dropIn: 38,
    description:
      "Trimester adapted reformer work focused on pelvic floor, hips, back comfort and breath. Provider clearance required after twenty weeks.",
    room: "Reformer Room",
  },
  {
    id: "postnatal-restore",
    name: "Postnatal Restore",
    serviceSlug: "prenatal-pilates",
    level: "Specialist",
    duration: 45,
    capacity: 6,
    credits: 1,
    dropIn: 38,
    description:
      "Rebuild from the inside out from six weeks postpartum. Diastasis aware core work and gentle strength. Babies welcome.",
    room: "Reformer Room",
  },
  {
    id: "private-session",
    name: "Private Session",
    serviceSlug: "private-pilates",
    level: "All levels",
    duration: 55,
    capacity: 1,
    credits: 1,
    dropIn: 110,
    description:
      "One on one on the reformer, tower, chair and mat. Fully personalized to your assessment and goals.",
    room: "Private Suite",
  },
  {
    id: "duet-session",
    name: "Duet Session",
    serviceSlug: "private-pilates",
    level: "All levels",
    duration: 55,
    capacity: 2,
    credits: 1,
    dropIn: 75,
    description:
      "Semi private for two. Share the hour with a friend or partner and split the attention of one instructor.",
    room: "Private Suite",
  },
];

export function getClassType(id: string) {
  return classTypes.find((c) => c.id === id);
}
