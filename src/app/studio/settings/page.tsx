import type { Metadata } from "next";
import { Settings } from "@/components/studio/Settings";

export const metadata: Metadata = { title: "Settings | Studio Portal" };

export default function StudioSettingsPage() {
  return <Settings />;
}
