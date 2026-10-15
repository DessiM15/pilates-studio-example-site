import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceBlocks } from "@/components/sections/marketing/ServiceBlocks";
import { ClassTable } from "@/components/sections/marketing/ClassTable";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pilates Classes in Houston | Reformer, Mat, Private and Prenatal",
  description:
    "Explore every Pilates class at Aurelle in Southwest Houston: small group reformer, classical mat, private and duet sessions, and prenatal and postnatal programs.",
  alternates: { canonical: "/classes" },
};

export default function ClassesPage() {
  return (
    <>
      <PageHero
        eyebrow="Classes and sessions"
        title="Pilates Classes in Houston"
        lead="Four disciplines, eleven formats, one standard. Find the class that fits your body and your week."
        image="classInSync"
      >
        <Button href="/schedule" variant="light">
          View the schedule
        </Button>
        <Button href="/intro-offer" variant="outline-light">
          3 classes for $59
        </Button>
      </PageHero>
      <ServiceBlocks />
      <ClassTable />
      <CtaBand />
    </>
  );
}
