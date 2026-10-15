import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/sections/PageIntro";
import { ScheduleBoard } from "@/components/sections/booking/ScheduleBoard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Pilates Class Schedule in Houston",
  description:
    "Book reformer, mat, prenatal and private Pilates classes in Southwest Houston. Live schedule for the next fourteen days at Aurelle Pilates near US 59 and Beltway 8.",
  alternates: { canonical: "/schedule" },
};

export default function SchedulePage() {
  return (
    <>
      <PageIntro
        eyebrow="Book a class"
        title="Pilates Class Schedule in Houston"
        lead="Classes of eight on the reformer, twelve on the mat, and private suites by appointment. Choose a day, pick your class, and we will see you on the carriage."
      />
      <Suspense
        fallback={
          <Container wide>
            <p className="pb-24 text-stone" aria-live="polite">
              Loading the schedule.
            </p>
          </Container>
        }
      >
        <ScheduleBoard />
      </Suspense>
      <CtaBand eyebrow="New here" title="Not sure which class to pick?" lead="Reformer Foundations and Classical Mat are built for first timers. Or read our quick guide to starting Pilates in Houston." primary={{ label: "New to Pilates", href: "/new-to-pilates" }} secondary={{ label: "Intro offer", href: "/intro-offer" }} />
    </>
  );
}
