import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { Menu } from "@/components/menu/Menu";
import { Logo } from "./Logo";
import { mainLinks } from "@/components/menu/links";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 grid grid-cols-[1fr_auto_1fr] items-center border-b-[3px] border-ink bg-paper px-4 py-3 md:px-8">
      {/* Left: menu button (every screen size) */}
      <div className="justify-self-start">
        <Menu />
      </div>

      {/* Center: logo on phones, logo + quick links on larger screens */}
      <div className="flex items-center gap-10">
        <Logo />
        <nav aria-label="Main" className="hidden gap-8 lg:flex">
          {mainLinks.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-bold uppercase underline-offset-4 decoration-[3px] hover:underline hover:decoration-signal focus-visible:outline-4 focus-visible:outline-joker"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="justify-self-end">
        <CartButton />
      </div>
    </header>
  );
}
