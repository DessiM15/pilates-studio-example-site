import type { Metadata } from "next";
import { StudioShell } from "@/components/studio/StudioShell";

export const metadata: Metadata = {
  title: "Studio Portal",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: LayoutProps<"/studio">) {
  return <StudioShell>{children}</StudioShell>;
}
