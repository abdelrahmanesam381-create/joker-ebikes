"use client";

import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/Button";

export function AddToCartButton({ slug }: { slug: string }) {
  const add = useCart((s) => s.add);
  return (
    <Button size="lg" onClick={() => add(slug)}>
      Add to cart
    </Button>
  );
}
