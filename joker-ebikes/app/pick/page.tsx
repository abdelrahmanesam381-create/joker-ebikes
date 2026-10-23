import type { Metadata } from "next";
import { Picker } from "@/components/pick/Picker";
import { Sticker } from "@/components/ui/Sticker";

export const metadata: Metadata = {
  title: "Pick your card | JOKER",
  description: "Four questions, one e-bike that fits your city day.",
};

export default function PickPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12 md:px-8">
      <div className="flex flex-col items-start gap-4">
        <Sticker tone="joker">Pick your card</Sticker>
        <h1 className="font-display text-5xl uppercase md:text-6xl">Four questions. One card.</h1>
      </div>
      <Picker />
    </main>
  );
}
