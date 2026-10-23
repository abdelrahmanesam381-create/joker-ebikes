"use client";

import { useActionState, useEffect, useState } from "react";
import { placeOrder } from "@/app/checkout/actions";
import { AREAS, type CheckoutState, type Field } from "@/lib/checkout";
import { useCart } from "@/store/cart";
import { getModel, formatEgp } from "@/data/models";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { cn } from "@/lib/cn";
import { inputClass } from "@/lib/form";

const initial: CheckoutState = { status: "idle" };


export function CheckoutForm() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const [state, formAction, pending] = useActionState(placeOrder, initial);
  // React resets uncontrolled fields after a form action. Text inputs fall back to their
  // defaultValue, but a <select> loses its choice, so the area is a controlled field.
  const [area, setArea] = useState("");

  // Empty the cart once the server confirms the order
  useEffect(() => {
    if (state.status === "ok") clear();
  }, [state.status, clear]);

  if (state.status === "ok") {
    return (
      <Card tone="signal" className="mx-auto flex max-w-xl flex-col items-start gap-5 p-8">
        <Sticker tone="joker">Order placed</Sticker>
        <h2 className="font-display text-4xl uppercase">You&apos;re dealt in.</h2>
        <p>
          Order <strong>{state.orderId}</strong>. We&apos;ll call you to confirm the delivery time. You pay{" "}
          <strong>{formatEgp(state.total)}</strong> in cash when the bike arrives.
        </p>
        <ul className="w-full border-t-[3px] border-ink pt-4">
          {state.lines.map((l) => (
            <li key={l.name} className="flex justify-between">
              <span>{l.qty} × {l.name}</span>
              <span>{formatEgp(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <ButtonLink href="/" variant="paper">Back home</ButtonLink>
      </Card>
    );
  }

  const lines = items.flatMap((i) => {
    const model = getModel(i.slug);
    return model ? [{ ...i, model }] : [];
  });
  const subtotal = lines.reduce((s, l) => s + l.model.priceEgp * l.qty, 0);

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-start gap-5">
        <p className="font-display text-2xl uppercase">Your hand is empty.</p>
        <ButtonLink href="/pick">Pick your card</ButtonLink>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : {};

  const field = (name: Field, label: string, input: React.ReactNode) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-bold uppercase">{label}</label>
      {input}
      {errors[name] && (
        <p id={`${name}-error`} className="font-bold text-sm text-[#d10000]" role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  );
  const a11y = (name: Field) => ({
    id: name,
    name,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form action={formAction} className="grid gap-12 md:grid-cols-[1.4fr_1fr]" noValidate>
      {/* Only slugs and quantities go to the server. It looks prices up itself. */}
      <input type="hidden" name="items" value={JSON.stringify(items)} />

      <div className="flex flex-col gap-6">
        {field("name", "Full name", <input {...a11y("name")} autoComplete="name" defaultValue={values.name} className={inputClass} />)}
        {field("phone", "Mobile number", <input {...a11y("phone")} type="tel" inputMode="numeric" autoComplete="tel" placeholder="01012345678" defaultValue={values.phone} className={inputClass} />)}
        {field(
          "area",
          "Area",
          <select {...a11y("area")} value={area} onChange={(e) => setArea(e.target.value)} className={cn(inputClass, "cursor-pointer")}>
            <option value="" disabled>Choose your area</option>
            {AREAS.map((a) => <option key={a}>{a}</option>)}
          </select>,
        )}
        {field("address", "Street address", <textarea {...a11y("address")} rows={3} autoComplete="street-address" defaultValue={values.address} className={inputClass} />)}

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 font-bold uppercase">Payment</legend>
          <label className="flex cursor-pointer items-center gap-3 border-[3px] border-ink bg-signal p-4">
            <input type="radio" name="payment" value="cod" defaultChecked className="size-5 accent-ink" />
            <span className="font-bold">Cash on delivery</span>
          </label>
          <label className="flex items-center gap-3 border-[3px] border-ink p-4 opacity-50">
            <input type="radio" name="payment" value="card" disabled className="size-5" />
            <span className="font-bold">Card payment (coming soon)</span>
          </label>
        </fieldset>
      </div>

      <aside className="flex h-fit flex-col gap-4 border-[3px] border-ink bg-paper p-6 shadow-hard-lg">
        <h2 className="font-display text-2xl uppercase">Your hand</h2>
        <ul className="flex flex-col gap-2">
          {lines.map((l) => (
            <li key={l.slug} className="flex justify-between gap-4">
              <span>{l.qty} × {l.model.name}</span>
              <span className="font-bold">{formatEgp(l.model.priceEgp * l.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t-[3px] border-ink pt-4">
          <span className="font-display uppercase">Total</span>
          <span className="font-display text-2xl">{formatEgp(subtotal)}</span>
        </div>
        <p className="text-xs">Delivery in Cairo included. Pay in cash when it arrives.</p>
        {errors.items && <p className="font-bold text-sm text-[#d10000]" role="alert">{errors.items}</p>}
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Placing order…" : "Place order"}
        </Button>
      </aside>
    </form>
  );
}
