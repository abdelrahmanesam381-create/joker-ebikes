"use server";

import { getModel } from "@/data/models";
import { AREAS, type CheckoutState, type Field, type OrderLine } from "@/lib/checkout";
import { MAX_QTY } from "@/store/cart";
import { isEgyptianMobile } from "@/lib/form";

const MAX_LINES = 10;

/**
 * Places a cash-on-delivery order.
 * Everything in FormData is untrusted: anyone can send this request without using our form,
 * so every field is validated here and every price comes from data/models.ts.
 */
export async function placeOrder(_prev: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").replace(/\s+/g, ""),
    area: String(formData.get("area") ?? ""),
    address: String(formData.get("address") ?? "").trim(),
  };
  const errors: Partial<Record<Field, string>> = {};

  if (values.name.length < 2 || values.name.length > 60) errors.name = "Enter your full name.";
  if (!isEgyptianMobile(values.phone)) errors.phone = "Enter an Egyptian mobile number, like 01012345678.";
  if (!(AREAS as readonly string[]).includes(values.area)) errors.area = "Choose an area we deliver to.";
  if (values.address.length < 5 || values.address.length > 200) errors.address = "Enter a street address.";

  // The cart arrives as JSON text: parse it defensively and rebuild every line from our own data
  const lines: OrderLine[] = [];
  let total = 0;
  try {
    const raw: unknown = JSON.parse(String(formData.get("items") ?? "[]"));
    if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_LINES) throw new Error();
    for (const item of raw) {
      const model = getModel(String(item?.slug));
      const qty = Number(item?.qty);
      if (!model || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) throw new Error();
      const lineTotal = model.priceEgp * qty; // the server's price, never the browser's
      lines.push({ name: model.name, qty, lineTotal });
      total += lineTotal;
    }
  } catch {
    errors.items = "Your cart looks invalid. Please refresh and try again.";
  }

  if (Object.keys(errors).length > 0) return { status: "error", errors, values };

  const orderId = `JKR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  // No database yet: the order is printed in the dev server terminal. Step 11+ can store it.
  console.log("[order]", { orderId, total, lines, customer: { name: values.name, area: values.area } });

  return { status: "ok", orderId, total, lines };
}
