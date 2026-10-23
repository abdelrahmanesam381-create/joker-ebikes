import Link from "next/link";
import { BikeArt } from "@/components/BikeArt";
import { Badge } from "@/components/ui/Badge";
import { Sticker } from "@/components/ui/Sticker";
import { formatEgp, type Model } from "@/data/models";

export function ModelCard({ model }: { model: Model }) {
  return (
    <Link
      href={`/models/${model.slug}`}
      className="group flex flex-col border-[3px] border-ink bg-paper shadow-hard-lg transition-transform duration-75 hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-joker"
    >
      <div className="border-b-[3px] border-ink p-5" style={{ background: model.accent }}>
        <BikeArt accent="#f4f1ea" className="w-full transition-transform group-hover:-rotate-3" />
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
