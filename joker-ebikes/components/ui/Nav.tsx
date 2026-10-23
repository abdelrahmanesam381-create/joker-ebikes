import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";

const links = [
  { href: "/models", label: "Bikes" },
  { href: "/pick", label: "Pick your card" },
  { href: "/test-ride", label: "Test ride" },
];

export function Nav() {
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

      <CartButton />
    </header>
  );
}
