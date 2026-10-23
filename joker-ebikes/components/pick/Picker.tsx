"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { models, formatEgp, cardIndex } from "@/data/models";
import { recommend, type Answers } from "@/lib/recommend";
import { questions } from "./questions";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProductPhoto } from "@/components/ProductPhoto";
import { cn } from "@/lib/cn";

export function Picker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const reduceMotion = useReducedMotion();

  const done = step >= questions.length;

  function choose(value: number) {
    const q = questions[step];
    setAnswers((a) => ({ ...a, [q.key]: value }));
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  if (done) {
    const [best, runnerUp] = recommend(answers as Answers, models);
    const m = best.model;
    return (
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* The dealt card */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 120, rotate: -25 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ type: "spring", stiffness: 140, damping: 14 }}
          className="mx-auto flex aspect-[5/7] w-full max-w-sm flex-col justify-between rounded-xl border-[3px] border-ink p-5 shadow-[10px_10px_0_#111111]"
          style={{ background: m.accent }}
        >
          <span className="font-display text-5xl">{cardIndex(m)}</span>
          <div className="text-center">
            <ProductPhoto model={m} sizes="(min-width: 768px) 30vw, 80vw" className="border-[3px] border-ink" />
            <p className="mt-3 font-display text-4xl uppercase">{m.name}</p>
          </div>
          <span className="self-end rotate-180 font-display text-5xl">{cardIndex(m)}</span>
        </motion.div>

        <div className="flex flex-col items-start gap-6" aria-live="polite">
          <p className="font-bold uppercase tracking-widest">Your card is</p>
          <h2 className="font-display text-6xl uppercase leading-none">{m.name}</h2>
          <p className="font-display text-3xl">{formatEgp(m.priceEgp)}</p>

          <ul className="flex flex-col gap-2">
            {best.reasons.map((r) => (
              <li key={r} className="flex gap-3">
                <span className="font-display text-signal [-webkit-text-stroke:1px_#111111]" aria-hidden>✔</span>
                {r}
              </li>
            ))}
            {best.warnings.map((w) => (
              <li key={w} className="flex gap-3">
                <span className="font-display" aria-hidden>!</span>
                {w}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-5">
            <ButtonLink href={`/models/${m.slug}`} size="lg">See {m.name}</ButtonLink>
            <Button variant="paper" size="lg" onClick={restart}>Deal again</Button>
          </div>

          {runnerUp && (
            <p className="text-sm">
              Close second:{" "}
              <Link href={`/models/${runnerUp.model.slug}`} className="font-bold underline decoration-[3px] underline-offset-4">
                {runnerUp.model.name}
              </Link>
            </p>
          )}
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      {/* Progress: one block per question */}
      <div className="flex items-center gap-4">
        <div className="flex flex-1 gap-2" role="progressbar" aria-valuemin={1} aria-valuemax={questions.length} aria-valuenow={step + 1}>
          {questions.map((_, i) => (
            <span key={i} className={cn("h-4 flex-1 border-2 border-ink", i <= step ? "bg-ink" : "bg-paper")} />
          ))}
        </div>
        <span className="font-bold">{step + 1}/{questions.length}</span>
      </div>

      <motion.div
        key={step}
        initial={reduceMotion ? false : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.18 }}
        className="flex flex-col gap-6"
      >
        <h2 className="font-display text-4xl uppercase md:text-5xl">{q.title}</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {q.options.map((o, i) => (
            <button
              key={o.label}
              type="button"
              onClick={() => choose(o.value)}
              className={cn(
                "flex min-h-40 cursor-pointer flex-col justify-between border-[3px] border-ink p-5 text-left shadow-hard-lg transition-transform duration-75",
                "hover:-translate-y-1 hover:-rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none",
                "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-joker",
                ["bg-paper", "bg-signal", "bg-joker text-paper"][i],
              )}
            >
              <span className="font-display text-2xl uppercase leading-tight">{o.label}</span>
              <span className="text-sm">{o.hint}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {step > 0 && (
        <button type="button" onClick={() => setStep((s) => s - 1)} className="self-start cursor-pointer font-bold uppercase underline decoration-[3px] underline-offset-4">
          ← Back
        </button>
      )}
    </div>
  );
}
