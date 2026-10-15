import type { Metadata } from "next";
import { Clients } from "@/components/studio/Clients";

export const metadata: Metadata = { title: "Clients | Studio Portal" };

export default function StudioClientsPage() {
  return <Clients />;
}
