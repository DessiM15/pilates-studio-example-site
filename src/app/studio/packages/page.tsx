import type { Metadata } from "next";
import { Packages } from "@/components/studio/Packages";

export const metadata: Metadata = { title: "Packages | Studio Portal" };

export default function StudioPackagesPage() {
  return <Packages />;
}
