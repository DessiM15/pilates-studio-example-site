import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AccountNav } from "@/components/portal/AccountNav";
import { RequireRole } from "@/components/portal/RequireRole";

export const metadata: Metadata = {
  title: "Your portal",
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return (
    <div className="bg-ivory pt-28 pb-24 sm:pt-32 sm:pb-32">
      <Container wide>
        <div className="border-b border-charcoal/10 pb-8">
          <Eyebrow>Client portal</Eyebrow>
          <p className="mt-3 font-serif text-4xl font-light text-charcoal">Your portal</p>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <AccountNav />
          </aside>
          <div className="lg:col-span-9">
            <RequireRole role="client">{children}</RequireRole>
          </div>
        </div>
      </Container>
    </div>
  );
}
