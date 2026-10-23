"use server";

import { getModel } from "@/data/models";
import { isEgyptianMobile } from "@/lib/form";
import { BOOKING_WINDOW_DAYS, LOCATIONS, SLOTS, cairoDate, type RideField, type RideState } from "@/lib/test-ride";

export async function bookTestRide(_prev: RideState, formData: FormData): Promise<RideState> {
  const values = {
    model: String(formData.get("model") ?? ""),
    date: String(formData.get("date") ?? ""),
    slot: String(formData.get("slot") ?? ""),
    location: String(formData.get("location") ?? ""),
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").replace(/\s+/g, ""),
  };
  const errors: Partial<Record<RideField, string>> = {};

  const model = getModel(values.model);
  if (!model) errors.model = "Choose a bike.";
  // ISO dates compare correctly as strings: tomorrow up to 30 days ahead
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || values.date < cairoDate(1) || values.date > cairoDate(BOOKING_WINDOW_DAYS))
    errors.date = `Pick a day between tomorrow and ${BOOKING_WINDOW_DAYS} days from now.`;
  if (!(SLOTS as readonly string[]).includes(values.slot)) errors.slot = "Choose a time.";
  const location = LOCATIONS.find((l) => l.value === values.location);
  if (!location) errors.location = "Choose where to ride.";
  if (values.name.length < 2 || values.name.length > 60) errors.name = "Enter your full name.";
  if (!isEgyptianMobile(values.phone)) errors.phone = "Enter an Egyptian mobile number, like 01012345678.";

  if (Object.keys(errors).length > 0 || !model || !location) return { status: "error", errors, values };

  const bookingId = `RIDE-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
  console.log("[test-ride]", { bookingId, model: model.name, date: values.date, slot: values.slot, location: location.value });

  return { status: "ok", bookingId, modelName: model.name, date: values.date, slot: values.slot, location: location.label };
}
