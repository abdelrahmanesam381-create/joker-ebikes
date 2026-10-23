import Link from "next/link";
import { ProductPhoto } from "@/components/ProductPhoto";
import { Badge } from "@/components/ui/Badge";
import { Sticker } from "@/components/ui/Sticker";
import { formatEgp, type Model } from "@/data/models";

export function ModelCard({ model }: { model: Model }) {
  return (
    <Link
      href={`/models/${model.slug}`}
      className="group flex flex-col border-[3px] border-ink bg-paper shadow-hard-lg transition-transform duration-75 hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-joker"
    >
      <div className="overflow-hidden border-b-[3px] border-ink">
        <ProductPhoto
          model={model}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-200 group-hover:scale-105"
        />
        <div className="h-3 border-t-[3px] border-ink" style={{ background: model.accent }} aria-hidden />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-2xl uppercase">{model.name}</h3>
        <p className="text-sm">{model.tagline}</p>
        <div className="flex flex-wrap gap-2">
          <Badge>{model.rangeKm} km</Badge>
          <Badge>{model.weightKg} kg</Badge>
        </div>
        {/* mt-auto pushes the price row to the bottom, so all cards line up */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <Sticker>{formatEgp(model.priceEgp)}</Sticker>
          <span className="font-display uppercase group-hover:underline">View →</span>
        </div>
      </div>
    </Link>
  );
}
