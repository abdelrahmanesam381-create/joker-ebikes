"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { mainLinks } from "./links";
import { Logo } from "@/components/ui/Logo";
import { ProductPhoto } from "@/components/ProductPhoto";
import { models, formatEgp } from "@/data/models";

// Note: we don't highlight the current page with usePathname here. The menu lives in the
// layout, and reading the URL there would tie every page's instant shell to one URL.

export function Menu() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus(); // give focus back to the Menu button when it closes
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="site-menu"
        className="flex cursor-pointer items-center gap-2 border-[3px] border-ink bg-paper px-3 py-1.5 font-display uppercase shadow-[3px_3px_0_#111111] hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-signal hover:shadow-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-joker"
      >
        <span aria-hidden className="flex flex-col gap-[3px]">
          <span className="block h-[3px] w-4 bg-ink" />
          <span className="block h-[3px] w-4 bg-ink" />
          <span className="block h-[3px] w-4 bg-ink" />
        </span>
        Menu
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-signal text-ink"
            initial={reduceMotion ? { opacity: 0 } : { y: "-100%" }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "-100%" }}
            transition={{ type: "tween", ease: [0.7, 0, 0.3, 1], duration: 0.45 }}
          >
            <div className="flex items-center justify-between border-b-[3px] border-ink px-4 py-3 md:px-8">
              <Logo onClick={close} variant="sticker" />
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="size-11 cursor-pointer border-[3px] border-ink bg-paper font-display text-xl hover:bg-ink hover:text-signal focus-visible:outline-4 focus-visible:outline-joker"
              >
                ✕
              </button>
            </div>

            <div className="mx-auto grid w-full max-w-6xl flex-1 gap-12 px-4 py-10 md:grid-cols-[1.2fr_1fr] md:px-8 md:py-16">
              <nav aria-label="Menu">
                <ul className="flex flex-col">
                  {mainLinks.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={reduceMotion ? false : { opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.06 }}
                      className="border-b-[3px] border-ink"
                    >
                      <Link
                        href={l.href}
                        onClick={close}
                        className="group flex items-baseline gap-4 py-4 font-display text-4xl uppercase transition-transform hover:translate-x-3 focus-visible:translate-x-3 focus-visible:outline-none md:text-6xl"
                      >
                        <span className="font-mono text-base font-bold">0{i + 1}</span>
                        <span className="group-hover:underline group-focus-visible:underline decoration-[5px] underline-offset-8">{l.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* The deck: quick links to each bike (desktop and tablet) */}
              <div className="hidden flex-col gap-4 md:flex">
                <p className="font-bold uppercase tracking-widest">The deck</p>
                <div className="grid grid-cols-2 gap-4">
                  {models.map((m, i) => (
                    <motion.div
                      key={m.slug}
                      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.06 }}
                    >
                      <Link
                        href={`/models/${m.slug}`}
                        onClick={close}
                        className="block border-[3px] border-ink bg-paper shadow-hard transition-transform hover:-translate-y-1 hover:-rotate-1 focus-visible:outline-4 focus-visible:outline-joker"
                      >
                        <ProductPhoto model={m} sizes="220px" className="border-b-[3px] border-ink" />
                        <span className="flex flex-col items-start gap-0.5 p-3 lg:flex-row lg:items-center lg:justify-between lg:gap-2">
                          <span className="font-display uppercase">{m.name}</span>
                          <span className="whitespace-nowrap text-xs font-bold">{formatEgp(m.priceEgp)}</span>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <p className="border-t-[3px] border-ink px-4 py-4 text-center text-xs font-bold uppercase md:px-8">
              Free test ride · Delivery in Cairo · 2-year warranty
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
