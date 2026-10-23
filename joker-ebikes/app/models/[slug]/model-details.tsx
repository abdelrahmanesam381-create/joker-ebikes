// Everything that depends on the URL (the slug) lives here, inside <Suspense> in page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { models, getModel, formatEgp } from "@/data/models";
import { Showcase } from "@/components/model/Showcase";
import { Meter } from "@/components/model/Meter";
import { ModelCard } from "@/components/home/ModelCard";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Sticker } from "@/components/ui/Sticker";
import { Badge } from "@/components/ui/Badge";

export async function ModelDetails({ params }: Pick<PageProps<"/models/[slug]">, "params">) {
  const model = getModel((await params).slug);
  if (!model) notFound();

  const others = models.filter((m) => m.slug !== model.slug).slice(0, 3);

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8 text-sm font-bold uppercase">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/models" className="hover:underline">Bikes</Link> /{" "}
        <span aria-current="page">{model.name}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        <Showcase model={model} />

        <div className="flex flex-col items-start gap-6">
          <Sticker tone="joker">Urban e-bike</Sticker>
          <h1 className="font-display text-6xl uppercase leading-none md:text-7xl">{model.name}</h1>
          <p className="text-lg">{model.tagline}</p>
          <p className="font-display text-4xl">{formatEgp(model.priceEgp)}</p>

          <div className="flex flex-wrap gap-2">
            <Badge tone="ink">{model.rangeKm} km range</Badge>
            <Badge>{model.weightKg} kg</Badge>
            <Badge>Delivery in Cairo</Badge>
          </div>

          <div className="flex w-full flex-col gap-3 border-[3px] border-ink bg-paper p-5 shadow-hard">
            <Meter label="Cargo" value={model.cargo} />
            <Meter label="Weather" value={model.weatherProof} />
            <Meter label="Reliability" value={model.reliability} />
          </div>

          <div className="flex flex-wrap gap-5 pt-2">
            <AddToCartButton slug={model.slug} />
            <ButtonLink href={`/test-ride?model=${model.slug}`} variant="paper" size="lg">Book a test ride</ButtonLink>
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="mb-8 font-display text-4xl uppercase">Other cards in the deck</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
      </section>
    </>
  );
}
