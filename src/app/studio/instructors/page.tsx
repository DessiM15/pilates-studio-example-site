import type { Metadata } from "next";
import { Instructors } from "@/components/studio/Instructors";

export const metadata: Metadata = { title: "Instructors | Studio Portal" };

export default function StudioInstructorsPage() {
  return <Instructors />;
}
