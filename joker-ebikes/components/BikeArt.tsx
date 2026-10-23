// Temporary bike drawing until real product photos are ready
export function BikeArt({ accent, frame = "#111111", className }: { accent: string; frame?: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} role="img" aria-label="Bike illustration">
      <g fill="none" stroke={frame} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="45" cy="85" r="28" />
        <circle cx="155" cy="85" r="28" />
        <polyline points="45,85 88,85 122,45 72,45 45,85" />
        <line x1="88" y1="85" x2="72" y2="45" />
        <line x1="72" y1="45" x2="66" y2="28" />
        <line x1="54" y1="28" x2="78" y2="28" />
        <line x1="122" y1="45" x2="155" y2="85" />
        <polyline points="122,45 117,26 134,26" />
      </g>
      <rect x="86" y="56" width="30" height="13" rx="2" fill={accent} stroke="#111111" strokeWidth="4" transform="rotate(-49 101 62)" />
    </svg>
  );
}
