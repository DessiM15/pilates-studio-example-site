import type { Metadata } from "next";
import { Bookings } from "@/components/studio/Bookings";

export const metadata: Metadata = { title: "Bookings | Studio Portal" };

export default function StudioBookingsPage() {
  return <Bookings />;
}
