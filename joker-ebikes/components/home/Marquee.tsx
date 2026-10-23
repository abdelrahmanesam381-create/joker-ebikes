const items = ["Free test ride", "2-year warranty", "Delivery in Cairo", "Pay in installments", "Service in 48h"];

export function Marquee() {
  // The row is rendered twice so the loop has no visible gap
  const row = items.map((t) => (
    <span key={t} className="flex items-center gap-8 px-4">
      {t} <span aria-hidden>✦</span>
    </span>
  ));
  return (
    <div className="overflow-hidden border-y-[3px] border-ink bg-ink py-3 text-signal" aria-label={items.join(", ")}>
      <div className="flex w-max animate-marquee font-display text-xl uppercase motion-reduce:animate-none" aria-hidden>
        {row}
        {row}
      </div>
    </div>
  );
}
