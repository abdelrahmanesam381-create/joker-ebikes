import { models } from "@/data/models";
import { ModelCard } from "./ModelCard";

export function ModelGrid() {
  return (
    <section id="bikes" className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-4xl uppercase md:text-5xl">Choose your hand</h2>
        <p className="max-w-sm text-sm">Same frame quality, four different jobs. Prices include delivery in Cairo.</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {models.map((m) => (
          <ModelCard key={m.slug} model={m} />
        ))}
      </div>
    </section>
  );
}
