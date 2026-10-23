// A 3-block score bar, e.g. cargo 2 of 3
export function Meter({ label, value }: { label: string; value: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-bold uppercase">{label}</span>
      <span className="flex gap-1.5" role="img" aria-label={`${label}: ${value} of 3`}>
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-4 w-8 border-2 border-ink ${i <= value ? "bg-ink" : "bg-paper"}`} />
        ))}
      </span>
    </div>
  );
}
