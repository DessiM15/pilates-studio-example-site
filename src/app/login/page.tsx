import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/sections/PageIntro";
import { LoginCards } from "@/components/portal/LoginCards";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <PageIntro eyebrow="Portals" title="Sign in to Aurelle Pilates" lead="Choose the portal you want to explore. Both run on demo data saved in your browser, so feel free to book, buy and edit freely." />
      <section className="bg-ivory pb-24 sm:pb-32">
        <Container wide>
          <Suspense fallback={<p className="text-stone">Loading.</p>}>
            <LoginCards />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
