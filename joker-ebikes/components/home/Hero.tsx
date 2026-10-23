import { ProductPhoto } from "@/components/ProductPhoto";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { Badge } from "@/components/ui/Badge";
import { getModel, formatEgp } from "@/data/models";

export function Hero() {
  const king = getModel("king")!;
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 md:grid-cols-2 md:px-8 md:py-24">
      <div className="flex flex-col items-start gap-6">
        <Sticker tone="joker">Urban e-bikes · Cairo</Sticker>
        <h1 className="font-display text-5xl uppercase leading-[0.95] md:text-7xl">
          The city is a game.{" "}
          <span className="mt-2 inline-block -rotate-2 border-[3px] border-ink bg-signal px-2">Play</span> your card.
        </h1>
        <p className="max-w-md">
          Four e-bikes, each built for a different kind of city day. Answer four questions and we deal you the
          right one.
        </p>
        <div className="flex flex-wrap gap-5 pt-2">
          <ButtonLink href="/pick" size="lg">Pick your card</ButtonLink>
          <ButtonLink href="/models" variant="paper" size="lg">Shop bikes</ButtonLink>
        </div>
      </div>

      <Card tone="signal" tilt="right" className="relative p-8">
        <Sticker tone="paper" className="absolute -top-5 -left-4">
          From {formatEgp(king.priceEgp)}
        </Sticker>
        <ProductPhoto model={king} priority sizes="(min-width: 768px) 45vw, 100vw" className="border-[3px] border-ink" />
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-4xl uppercase">{king.name}</p>
            <p className="text-sm">{king.tagline}</p>
          </div>
          <Badge tone="ink">{king.rangeKm} km</Badge>
        </div>
      </Card>
    </section>
  );
}
