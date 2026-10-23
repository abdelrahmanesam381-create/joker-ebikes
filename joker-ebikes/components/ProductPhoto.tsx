import Image from "next/image";
import type { Model } from "@/data/models";
import { cn } from "@/lib/cn";

type Props = {
  model: Pick<Model, "name" | "accent" | "image">;
  sizes: string; // tells the browser which image width to download, see next/image docs
  priority?: boolean; // only for the first big image on a page (the hero)
  className?: string;
};

/**
 * A bike photo on a cream panel with halftone dots in the model's color.
 * The panel stays cream because each bike has accents in its own color:
 * on a solid accent background those parts would disappear.
 */
export function ProductPhoto({ model, sizes, priority, className }: Props) {
  return (
    <div className={cn("relative aspect-[3/2] overflow-hidden bg-paper", className)}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
        style={{ backgroundImage: `radial-gradient(${model.accent} 2px, transparent 2.5px)`, backgroundSize: "14px 14px" }}
      />
      <Image
        src={model.image}
        alt={`${model.name} e-bike, side view`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain p-[6%] drop-shadow-[0_10px_8px_rgba(17,17,17,0.25)]"
      />
    </div>
  );
}
