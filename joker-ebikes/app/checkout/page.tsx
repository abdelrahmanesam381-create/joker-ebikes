import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = { title: "Checkout | JOKER" };

export default function CheckoutPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12 md:px-8">
      <h1 className="font-display text-5xl uppercase md:text-6xl">Checkout</h1>
      <CheckoutForm />
    </main>
  );
}
