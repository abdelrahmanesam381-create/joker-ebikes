import type { Metadata } from "next";
import { ModelGrid } from "@/components/home/ModelGrid";

export const metadata: Metadata = { title: "All bikes | JOKER" };

export default function ModelsPage() {
  return (
    <main className="flex-1">
      <ModelGrid />
    </main>
  );
}
