import { Hero } from "@/components/sections/home/Hero";
import { Intro } from "@/components/sections/home/Intro";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { InstructorsRow } from "@/components/sections/home/InstructorsRow";
import { OfferAndClassPass } from "@/components/sections/home/OfferAndClassPass";
import { Visit } from "@/components/sections/home/Visit";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <Intro />
      <InstructorsRow />
      <OfferAndClassPass />
      <Visit />
    </>
  );
}
