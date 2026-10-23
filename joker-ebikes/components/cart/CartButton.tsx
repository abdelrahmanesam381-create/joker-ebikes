"use client";

import { useCart, cartCount } from "@/store/cart";
import { Badge } from "@/components/ui/Badge";

export function CartButton() {
  const items = useCart((s) => s.items);
  const open = useCart((s) => s.open);
  const count = cartCount(items);
  return (
    <button
      type="button"
      onClick={open}
      className="flex items-center gap-2 border-[3px] border-ink bg-signal px-3 py-1.5 font-display uppercase shadow-[3px_3px_0_#111111] cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-joker"
      aria-label={`Open cart, ${count} items`}
    >
      Cart <Badge tone="ink">{count}</Badge>
    </button>
  );
}
