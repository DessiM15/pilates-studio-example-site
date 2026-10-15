import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutSuccess } from "@/components/sections/booking/CheckoutSuccess";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Purchase complete",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-ivory pt-20">
      <Suspense
        fallback={
          <Container>
            <p className="py-32 text-center text-stone" aria-live="polite">
              Confirming your purchase.
            </p>
          </Container>
        }
      >
        <CheckoutSuccess />
      </Suspense>
    </div>
  );
}
