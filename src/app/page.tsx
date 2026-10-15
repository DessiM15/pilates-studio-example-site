import { Hero } from "@/components/sections/home/Hero";
import { Intro } from "@/components/sections/home/Intro";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { Experience } from "@/components/sections/home/Experience";
import { FilmSplit } from "@/components/sections/home/FilmSplit";
import { InstructorsRow } from "@/components/sections/home/InstructorsRow";
import { ScheduleTeaser } from "@/components/sections/home/ScheduleTeaser";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { OfferAndClassPass } from "@/components/sections/home/OfferAndClassPass";
import { JournalPreview } from "@/components/sections/home/JournalPreview";
import { Visit } from "@/components/sections/home/Visit";
import { Marquee } from "@/components/ui/Marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={["Reformer Pilates", "Mat Pilates", "Private Sessions", "Prenatal and Postnatal", "Classes of eight", "Southwest Houston"]} />
      <Intro />
      <ServicesGrid />
      <Experience />
      <FilmSplit />
      <InstructorsRow />
      <ScheduleTeaser />
      <Testimonials />
      <OfferAndClassPass />
      <JournalPreview />
      <Visit />
    </>
  );
}
