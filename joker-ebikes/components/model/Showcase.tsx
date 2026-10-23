import { ProductPhoto } from "@/components/ProductPhoto";
import type { Model } from "@/data/models";

// Big product photo for the model page. (The frame color picker was removed:
// real photos can't be recolored like the old SVG drawing.)
export function Showcase({ model }: { model: Model }) {
  return (
    <div className="h-fit border-[3px] border-ink shadow-hard-lg">
      <ProductPhoto model={model} priority sizes="(min-width: 768px) 50vw, 100vw" />
      <div className="h-4 border-t-[3px] border-ink" style={{ background: model.accent }} aria-hidden />
    </div>
  );
}
