import type { Metadata } from "next";
import { Suspense } from "react";
import { models, getModel } from "@/data/models";
import { ModelDetails } from "./model-details";

type Props = PageProps<"/models/[slug]">;

// Build the 4 model pages ahead of time (fast, and good for SEO)
export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const model = getModel((await params).slug);
  return model
    ? { title: `${model.name} | JOKER`, description: model.tagline }
    : { title: "Bike not found | JOKER" };
}

// The page itself never reads params: it stays a shared shell that shows instantly,
// and the bike-specific part streams in inside the Suspense boundary.
export default function ModelPage({ params }: Props) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 md:px-8">
      <Suspense fallback={<DetailsSkeleton />}>
        <ModelDetails params={params} />
      </Suspense>
    </main>
  );
}

function DetailsSkeleton() {
  return (
    <div className="grid animate-pulse gap-12 md:grid-cols-2" aria-hidden>
      <div className="aspect-[4/3] border-[3px] border-ink bg-ink/10" />
      <div className="flex flex-col gap-6">
        <div className="h-16 w-2/3 bg-ink/10" />
        <div className="h-6 w-full bg-ink/10" />
        <div className="h-10 w-1/3 bg-ink/10" />
        <div className="h-32 border-[3px] border-ink bg-ink/10" />
      </div>
    </div>
  );
}
