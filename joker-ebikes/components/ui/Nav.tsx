import Link from "next/link";
import { Badge } from "./Badge";

const links = [
  { href: "/models", label: "Bikes" },
  { href: "/pick", label: "Pick your card" },
  { href: "/test-ride", label: "Test ride" },
];

export function Nav({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b-[3px] border-ink bg-paper px-4 py-3 md:px-8">
      <Link href="/" className="flex items-center gap-2 font-display text-2xl uppercase">
        <span className="inline-block size-5 rotate-12 border-[3px] border-ink bg-signal" aria-hidden />
        Joker
      </Link>

      {/* Links hide on small screens for now; the mobile menu comes later */}
      <nav aria-label="Main" className="hidden gap-8 md:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-bold uppercase underline-offset-4 decoration-[3px] hover:underline hover:decoration-signal focus-visible:outline-4 focus-visible:outline-joker"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="flex items-center gap-2 border-[3px] border-ink bg-signal px-3 py-1.5 font-display uppercase shadow-[3px_3px_0_#111111] cursor-pointer enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-joker"
        aria-label={`Open cart, ${cartCount} items`}
      >
        Cart <Badge tone="ink">{cartCount}</Badge>
      </button>
    </header>
  );
}
