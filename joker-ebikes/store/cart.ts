import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { slug: string; qty: number };

type CartState = {
  items: CartItem[]; // slug + qty only: prices are always looked up, never stored or trusted
  isOpen: boolean;
  add: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

export const MAX_QTY = 5;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (slug) =>
        set((s) => {
          const found = s.items.find((i) => i.slug === slug);
          return {
            isOpen: true,
            items: found
              ? s.items.map((i) => (i.slug === slug ? { ...i, qty: Math.min(i.qty + 1, MAX_QTY) } : i))
              : [...s.items, { slug, qty: 1 }],
          };
        }),
      setQty: (slug, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.slug !== slug)
              : s.items.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, MAX_QTY) } : i)),
        })),
      remove: (slug) => set((s) => ({ items: s.items.filter((i) => i.slug !== slug) })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "joker-cart",
      partialize: (s) => ({ items: s.items }), // save the items, not whether the drawer is open
      skipHydration: true, // we load from localStorage after the page mounts, see CartDrawer
    },
  ),
);

export const cartCount = (items: CartItem[]) => items.reduce((n, i) => n + i.qty, 0);
