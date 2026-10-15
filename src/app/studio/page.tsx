import type { Metadata } from "next";
import { Dashboard } from "@/components/studio/Dashboard";

export const metadata: Metadata = { title: "Dashboard | Studio Portal" };

export default function StudioDashboardPage() {
  return <Dashboard />;
}
