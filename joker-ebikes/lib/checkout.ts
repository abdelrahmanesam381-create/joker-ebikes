// Shared between the checkout form (client) and the order action (server)

export const AREAS = [
  "New Cairo",
  "Nasr City",
  "Heliopolis",
  "Maadi",
  "Zamalek",
  "Downtown",
  "Mokattam",
  "Sheikh Zayed",
  "6th of October",
] as const;

export type Field = "name" | "phone" | "area" | "address" | "items";

export type OrderLine = { name: string; qty: number; lineTotal: number };

export type CheckoutState =
  | { status: "idle" }
  | { status: "error"; errors: Partial<Record<Field, string>>; values: Record<string, string> }
  | { status: "ok"; orderId: string; total: number; lines: OrderLine[] };
