"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart, cartCount, MAX_QTY } from "@/store/cart";
import { getModel, formatEgp } from "@/data/models";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";

const HELMET_THRESHOLD = 50000; // free helmet above this subtotal

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  // Load the saved cart after mount, so server and browser render the same first HTML
  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);

  // Escape closes the drawer, the page behind stops scrolling, focus moves into the drawer
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  // Display prices come from data/models.ts. The real charge is calculated again on the server.
  const lines = items
    .map((i) => ({ ...i, model: getModel(i.slug) }))
    .filter((l): l is typeof l & { model: NonNullable<typeof l.model> } => Boolean(l.model));
  const subtotal = lines.reduce((sum, l) => sum + l.model.priceEgp * l.qty, 0);
  const progress = Math.min(subtotal / HELMET_THRESHOLD, 1);
  const slide = reduceMotion ? { duration: 0 } : { type: "tween" as const, duration: 0.22 };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l-[3px] border-ink bg-paper"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={slide}
          >
            <header className="flex items-center justify-between border-b-[3px] border-ink p-5">
              <h2 className="font-display text-3xl uppercase">
                Your hand <span className="text-xl">({cartCount(items)})</span>
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close cart"
                className="size-11 cursor-pointer border-[3px] border-ink font-display text-xl hover:bg-signal focus-visible:outline-4 focus-visible:outline-joker"
              >
                ✕
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
                <p className="font-display text-2xl uppercase">No cards in your hand yet.</p>
                <ButtonLink href="/pick" onClick={close}>Pick your card</ButtonLink>
              </div>
            ) : (
              <>
                <div className="border-b-[3px] border-ink p-5">
                  <p className="mb-2 text-sm font-bold">
                    {progress < 1
                      ? `${formatEgp(HELMET_THRESHOLD - subtotal)} away from a free helmet`
                      : "Free helmet unlocked ✦"}
                  </p>
                  <div className="h-5 border-[3px] border-ink bg-paper">
                    <div className="h-full bg-signal transition-[width]" style={{ width: `${progress * 100}%` }} />
                  </div>
                </div>

                <ul className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
                  {lines.map((l) => (
                    <li key={l.slug} className="flex gap-4 border-[3px] border-ink bg-paper p-3 shadow-hard">
                      <div className="w-3 shrink-0 border-2 border-ink" style={{ background: l.model.accent }} aria-hidden />
                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <Link href={`/models/${l.slug}`} onClick={close} className="font-display text-xl uppercase hover:underline">
                            {l.model.name}
                          </Link>
                          <span className="font-bold">{formatEgp(l.model.priceEgp * l.qty)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border-2 border-ink">
                            <button type="button" className="size-8 cursor-pointer font-bold hover:bg-signal" onClick={() => setQty(l.slug, l.qty - 1)} aria-label={`One less ${l.model.name}`}>−</button>
                            <span className="w-8 text-center font-bold" aria-live="polite">{l.qty}</span>
                            <button type="button" className="size-8 cursor-pointer font-bold hover:bg-signal disabled:cursor-not-allowed disabled:opacity-40" onClick={() => setQty(l.slug, l.qty + 1)} disabled={l.qty >= MAX_QTY} aria-label={`One more ${l.model.name}`}>+</button>
                          </div>
                          <button type="button" onClick={() => remove(l.slug)} className="cursor-pointer text-sm font-bold uppercase underline underline-offset-4">
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="flex flex-col gap-4 border-t-[3px] border-ink p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl uppercase">Subtotal</span>
                    <span className="font-display text-2xl">{formatEgp(subtotal)}</span>
                  </div>
                  <p className="text-xs">Delivery in Cairo included. Charged in EGP.</p>
                  {/* Real checkout arrives in step 10 */}
                  <Button size="lg" disabled title="Checkout arrives in step 10">Checkout</Button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
