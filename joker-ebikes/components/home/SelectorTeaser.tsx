import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProductPhoto } from "@/components/ProductPhoto";
import { models, cardIndex } from "@/data/models";
import { cn } from "@/lib/cn";

// One entry per card, left to right. Full class strings, because Tailwind only
// generates classes it can find written out in the code.
const fan = [
  "-rotate-12 group-hover:-rotate-[18deg] group-hover:-translate-x-6",
  "-rotate-4 group-hover:-rotate-6 group-hover:-translate-x-2",
  "rotate-4 group-hover:rotate-6 group-hover:translate-x-2",
  "rotate-12 group-hover:rotate-[18deg] group-hover:translate-x-6",
];

export function SelectorTeaser() {
  return (
    <section className="overflow-hidden border-y-[3px] border-ink bg-ink text-paper">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 py-20 md:grid-cols-2 md:px-8">
        <div className="flex flex-col items-start gap-6">
          <p className="font-bold uppercase tracking-widest text-signal">Not sure which one?</p>
          <h2 className="font-display text-4xl uppercase md:text-6xl">
            Four questions. <span className="text-signal">One card.</span>
          </h2>
          <p className="max-w-md">
            Tell us your daily distance, what you carry, the weather you ride in and how far you are from a
            service point. We deal you the bike that fits.
          </p>
          <ButtonLink href="/pick" variant="signal-dark" size="lg">Deal me in</ButtonLink>
        </div>

        {/* A hand of playing cards: spreads apart on hover, each card opens its bike */}
        <div className="group flex justify-center py-10">
          {models.map((m, i) => (
            <Link
              key={m.slug}
              href={`/models/${m.slug}`}
              aria-label={`${m.name}, see the bike`}
              className={cn(
                "relative -ml-8 flex h-44 w-28 shrink-0 flex-col justify-between rounded-lg border-[3px] border-paper p-2 text-ink first:ml-0 md:-ml-10 md:h-64 md:w-44 md:p-3",
                "shadow-[6px_6px_0_#b6ff00] transition-transform duration-300 ease-out",
                "hover:z-10 hover:-translate-y-6 hover:rotate-0 hover:shadow-[10px_10px_0_#b6ff00]",
                "focus-visible:z-10 focus-visible:-translate-y-6 focus-visible:rotate-0 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-signal",
                "motion-reduce:transition-none",
                fan[i],
              )}
              style={{ background: m.accent }}
            >
              <span className="font-display text-xl leading-none md:text-3xl">{cardIndex(m)}</span>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <ProductPhoto model={m} sizes="(min-width: 768px) 160px, 100px" className="w-full rounded border-2 border-ink" />
                <span className="font-display text-center text-xs uppercase md:text-base">{m.name}</span>
              </div>
              <span className="self-end rotate-180 font-display text-xl leading-none md:text-3xl">{cardIndex(m)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
