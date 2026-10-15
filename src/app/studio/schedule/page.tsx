import type { Metadata } from "next";
import { ManageSchedule } from "@/components/studio/ManageSchedule";

export const metadata: Metadata = { title: "Manage Schedule | Studio Portal" };

export default function StudioSchedulePage() {
  return <ManageSchedule />;
}
