import type { Metadata } from "next";
import { Suspense } from "react";
import { TestRideForm } from "@/components/test-ride/TestRideForm";
import { Sticker } from "@/components/ui/Sticker";

export const metadata: Metadata = {
  title: "Book a test ride | JOKER",
  description: "Ride any JOKER e-bike for free, at our New Cairo showroom or at your place.",
};

export default function TestRidePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12 md:px-8">
      <div className="flex flex-col items-start gap-4">
        <Sticker tone="joker">Free · 30 minutes</Sticker>
        <h1 className="font-display text-5xl uppercase md:text-6xl">Book a test ride</h1>
        <p className="max-w-xl">Ride before you buy. No payment, no pressure: pick a bike, a time and a place.</p>
      </div>
      {/* The form reads ?model= from the URL, so it sits inside Suspense (Next.js 16 instant navigation) */}
      <Suspense fallback={<div className="h-96 max-w-3xl animate-pulse border-[3px] border-ink bg-ink/10" />}>
        <TestRideForm />
      </Suspense>
    </main>
  );
}
