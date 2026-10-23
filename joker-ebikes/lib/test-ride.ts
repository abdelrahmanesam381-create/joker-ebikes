// Shared between the test ride form (client) and the booking action (server)

export const SLOTS = ["10:00", "13:00", "16:00", "19:00"] as const;

export const LOCATIONS = [
  { value: "showroom", label: "JOKER showroom, New Cairo" },
  { value: "home", label: "At my place (Cairo only)" },
] as const;

export const BOOKING_WINDOW_DAYS = 30;

export type RideField = "model" | "date" | "slot" | "location" | "name" | "phone";

export type RideState =
  | { status: "idle" }
  | { status: "error"; errors: Partial<Record<RideField, string>>; values: Record<string, string> }
  | { status: "ok"; bookingId: string; modelName: string; date: string; slot: string; location: string };

// "2026-10-24" in Cairo time, so "tomorrow" is right for Egyptian users
export function cairoDate(offsetDays = 0) {
  const d = new Date(Date.now() + offsetDays * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(d);
}
