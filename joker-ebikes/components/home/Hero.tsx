import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Sticker } from "@/components/ui/Sticker";
import { getModel } from "@/data/models";

// Fixed positions (not Math.random) so server and browser render the same HTML
const splatter = [
  [6, 38, 5], [10, 30, 3], [3, 52, 4], [44, 22, 3], [52, 30, 6], [57, 18, 4], [61, 36, 3],
  [88, 20, 4], [93, 34, 6], [96, 48, 3], [70, 92, 4], [40, 86, 3], [80, 70, 5], [36, 70, 4],
];

/** SVG filters used by the hero: drawn once, referenced by id with CSS `filter: url(#...)`. */
function HeroFilters() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        {/* Rough, worn letters: warp the edges, then punch speckle holes for a spray-paint texture */}
        <filter id="hero-grunge" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="22" xChannelSelector="R" yChannelSelector="G" result="rough" />
          {/* Fine grain, but only its brightest specks become holes: letters stay solid black
              with a light spray texture (a lower threshold turns them into TV static). */}
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="3" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -14 0 0 0 11.6" result="holes" />
          <feComposite in="rough" in2="holes" operator="in" />
        </filter>
        {/* Paint splash: strong warp turns clean shapes into wet brush blobs */}
        <filter id="hero-paint" x="-20%" y="-40%" width="140%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="38" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Slight wobble for hand-drawn lines */}
        <filter id="hero-hand">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

export function Hero() {
  const king = getModel("king")!;

  return (
    <section className="relative isolate overflow-hidden">
      <HeroFilters />

      {/* Giant background wordmark. Decorative: the real headline is the h1 below. */}
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-2 -z-10 select-none whitespace-nowrap text-center font-display text-[21vw] leading-[0.8] tracking-[-0.04em] text-ink sm:text-[24vw] lg:top-0"
        style={{ filter: "url(#hero-grunge)" }}
      >
        JOKER
      </p>

      {/* Lime scribble, top left */}
      <svg aria-hidden viewBox="0 0 120 90" className="absolute top-[2vw] left-[3vw] -z-10 w-[9vw] min-w-14" style={{ filter: "url(#hero-hand)" }}>
        <polyline points="8,78 20,12 38,70 52,10 70,66 84,14 104,60" fill="none" stroke="#b6ff00" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Ink splatter dots */}
      <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full">
        {splatter.map(([x, y, r], i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill={i % 3 === 0 ? "#b6ff00" : "#111111"} />
        ))}
      </svg>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-4 pt-[17vw] pb-12 sm:pt-[20vw] md:px-8 lg:grid-cols-[1fr_1.25fr] lg:pt-[13vw] lg:pb-16">
        {/* Copy, on a torn cream patch so it stays readable over the giant letters */}
        <div className="relative z-10 flex flex-col items-start gap-6 py-6">
          <div aria-hidden className="absolute -inset-x-6 -inset-y-2 -z-10 bg-paper lg:-inset-x-10" style={{ filter: "url(#hero-paint)" }} />
          <Sticker tone="joker">Urban e-bikes · Cairo</Sticker>
          <h1 className="font-display text-5xl uppercase leading-[0.95] md:text-6xl xl:text-7xl">
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

        {/* Bike composition: paint splash, ground stroke, bike, crown, handwritten notes */}
        <div className="relative mx-auto w-full max-w-2xl lg:-mt-[7vw] lg:-mr-8 lg:max-w-none">
          <svg aria-hidden viewBox="0 0 600 260" className="absolute inset-x-[-6%] bottom-[-4%] -z-0 w-[112%] sm:w-[96%]" style={{ filter: "url(#hero-paint)" }}>
            <ellipse cx="300" cy="232" rx="285" ry="14" fill="#111111" opacity="0.9" />
            <ellipse cx="120" cy="222" rx="120" ry="20" fill="#b6ff00" />
            <ellipse cx="470" cy="220" rx="125" ry="22" fill="#b6ff00" />
            <polygon points="18,218 -10,150 70,205" fill="#b6ff00" />
            <polygon points="575,212 612,128 598,214" fill="#b6ff00" />
            <polygon points="300,226 270,186 330,224" fill="#b6ff00" />
          </svg>

          <Image
            src={king.image}
            alt={`${king.name} e-bike, side view`}
            width={1515}
            height={807}
            priority
            sizes="(min-width: 1024px) 55vw, 95vw"
            className="relative z-10 w-full drop-shadow-[0_14px_10px_rgba(17,17,17,0.35)] sm:w-[86%]"
          />

          {/* Hand-drawn crown above the handlebars */}
          <svg aria-hidden viewBox="0 0 120 90" className="absolute top-[-16%] right-[26%] z-20 w-[16%] rotate-[10deg] sm:right-[38%]" style={{ filter: "url(#hero-hand)" }}>
            <path d="M12 74 L18 18 L42 50 L60 8 L78 50 L102 18 L108 74 Z" fill="none" stroke="#b6ff00" strokeWidth="9" strokeLinejoin="round" />
            <path d="M14 84 L106 84" stroke="#b6ff00" strokeWidth="9" strokeLinecap="round" />
          </svg>

          {/* Handwritten notes with arrows (from sm up, they need room) */}
          <div aria-hidden className="absolute top-[22%] right-0 z-20 hidden -rotate-12 sm:block">
            <svg viewBox="0 0 80 40" className="absolute top-1 -left-[4.5rem] w-16 overflow-visible" style={{ filter: "url(#hero-hand)" }}>
              <path d="M76 22 C 50 10, 30 14, 8 24 M8 24 L22 12 M8 24 L24 32" fill="none" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <p className="font-marker text-xl uppercase leading-tight lg:text-2xl xl:text-3xl">
              Comfort
              <br />
              Power
              <br />
              Freedom
            </p>
            <svg viewBox="0 0 80 40" className="absolute -bottom-8 -left-16 w-16 rotate-[30deg] overflow-visible" style={{ filter: "url(#hero-hand)" }}>
              <path d="M76 18 C 50 8, 30 12, 8 24 M8 24 L22 12 M8 24 L24 32" fill="none" stroke="#111111" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
