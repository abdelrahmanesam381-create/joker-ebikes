import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ModelGrid } from "@/components/home/ModelGrid";
import { SelectorTeaser } from "@/components/home/SelectorTeaser";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Marquee />
      <ModelGrid />
      <SelectorTeaser />
    </main>
  );
}
