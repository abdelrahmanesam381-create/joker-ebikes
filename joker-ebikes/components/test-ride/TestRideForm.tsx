"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { bookTestRide } from "@/app/test-ride/actions";
import { BOOKING_WINDOW_DAYS, LOCATIONS, SLOTS, cairoDate, type RideField, type RideState } from "@/lib/test-ride";
import { models } from "@/data/models";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { inputClass } from "@/lib/form";
import { cn } from "@/lib/cn";

const initial: RideState = { status: "idle" };

const prettyDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(iso));

export function TestRideForm() {
  // /test-ride?model=king preselects King (the model page links here)
  const fromUrl = useSearchParams().get("model");
  const [state, formAction, pending] = useActionState(bookTestRide, initial);
  // Controlled fields keep their value after an error (see CheckoutForm)
  const [model, setModel] = useState(models.some((m) => m.slug === fromUrl) ? fromUrl! : models[0].slug);
  const [slot, setSlot] = useState("");
  const [location, setLocation] = useState<string>(LOCATIONS[0].value);

  if (state.status === "ok") {
    return (
      <Card tone="signal" className="mx-auto flex max-w-xl flex-col items-start gap-5 p-8">
        <Sticker tone="joker">Ride booked</Sticker>
        <h2 className="font-display text-4xl uppercase">See you on the {state.modelName}.</h2>
        <p>
          <strong>{prettyDate(state.date)}</strong> at <strong>{state.slot}</strong>, {state.location}. Booking{" "}
          <strong>{state.bookingId}</strong>. We&apos;ll call you the day before.
        </p>
        <ButtonLink href={`/models/${models.find((m) => m.name === state.modelName)?.slug ?? ""}`} variant="paper">
          Back to the bike
        </ButtonLink>
      </Card>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : {};
  const error = (name: RideField) =>
    errors[name] && (
      <p id={`${name}-error`} role="alert" className="text-sm font-bold text-[#d10000]">{errors[name]}</p>
    );
  const a11y = (name: RideField) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-10" noValidate>
      {/* 1. Bike: four big choice tiles */}
      <fieldset className="flex flex-col gap-3" {...a11y("model")}>
        <legend className="mb-3 font-display text-2xl uppercase">1. Which bike?</legend>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {models.map((m) => (
            <label
              key={m.slug}
              className={cn(
                "cursor-pointer border-[3px] border-ink p-4 font-display uppercase transition-transform has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-joker",
                model === m.slug ? "-translate-y-1 shadow-hard" : "bg-paper hover:-translate-y-0.5",
              )}
              style={model === m.slug ? { background: m.accent } : undefined}
            >
              <input type="radio" name="model" value={m.slug} checked={model === m.slug} onChange={() => setModel(m.slug)} className="sr-only" />
              {m.name}
            </label>
          ))}
        </div>
        {error("model")}
      </fieldset>

      {/* 2. When */}
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-3 font-display text-2xl uppercase">2. When?</legend>
        <label htmlFor="date" className="font-bold uppercase">Day</label>
        <input
          id="date"
          name="date"
          type="date"
          min={cairoDate(1)}
          max={cairoDate(BOOKING_WINDOW_DAYS)}
          defaultValue={values.date}
          className={cn(inputClass, "max-w-xs")}
          {...a11y("date")}
        />
        {error("date")}
        <p className="font-bold uppercase">Time</p>
        <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Time" {...a11y("slot")}>
          {SLOTS.map((s) => (
            <label
              key={s}
              className={cn(
                "cursor-pointer border-[3px] border-ink px-5 py-2 font-bold has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-joker",
                slot === s ? "bg-ink text-signal" : "bg-paper hover:bg-signal",
              )}
            >
              <input type="radio" name="slot" value={s} checked={slot === s} onChange={() => setSlot(s)} className="sr-only" />
              {s}
            </label>
          ))}
        </div>
        {error("slot")}
      </fieldset>

      {/* 3. Where */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 font-display text-2xl uppercase">3. Where?</legend>
        {LOCATIONS.map((l) => (
          <label key={l.value} className={cn("flex cursor-pointer items-center gap-3 border-[3px] border-ink p-4", location === l.value && "bg-signal")}>
            <input type="radio" name="location" value={l.value} checked={location === l.value} onChange={() => setLocation(l.value)} className="size-5 accent-ink" />
            <span className="font-bold">{l.label}</span>
          </label>
        ))}
        {error("location")}
      </fieldset>

      {/* 4. Who */}
      <fieldset className="grid gap-5 md:grid-cols-2">
        <legend className="mb-3 font-display text-2xl uppercase">4. Who&apos;s riding?</legend>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold uppercase">Full name</label>
          <input id="name" name="name" autoComplete="name" defaultValue={values.name} className={inputClass} {...a11y("name")} />
          {error("name")}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-bold uppercase">Mobile number</label>
          <input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="01012345678" defaultValue={values.phone} className={inputClass} {...a11y("phone")} />
          {error("phone")}
        </div>
      </fieldset>

      <Button type="submit" size="lg" disabled={pending} className="self-start">
        {pending ? "Booking…" : "Book my ride"}
      </Button>
    </form>
  );
}
