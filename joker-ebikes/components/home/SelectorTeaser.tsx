import { ButtonLink } from "@/components/ui/ButtonLink";
import { models, cardIndex } from "@/data/models";

const rotations = ["-rotate-12", "-rotate-4", "rotate-4", "rotate-12"];

export function SelectorTeaser() {
  return (
    <section className="border-y-[3px] border-ink bg-ink text-paper">
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

        {/* A fanned hand of playing cards, one per model */}
        <div className="flex justify-center py-6" aria-hidden>
          {models.map((m, i) => (
            <div
              key={m.slug}
              className={`-ml-10 flex h-56 w-36 flex-col justify-between rounded-lg border-[3px] border-paper p-3 text-ink shadow-[6px_6px_0_#b6ff00] first:ml-0 md:h-64 md:w-40 ${rotations[i]}`}
              style={{ background: m.accent }}
            >
              <span className="font-display text-3xl">{cardIndex(m)}</span>
              <span className="font-display text-center text-lg uppercase">{m.name}</span>
              <span className="self-end rotate-180 font-display text-3xl">{cardIndex(m)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
