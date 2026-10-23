import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "signal" | "signal-dark" | "ink" | "paper" | "joker";
type Size = "sm" | "md" | "lg";

// --sh is the shadow color: it changes per variant, the shape stays the same
const variants: Record<Variant, string> = {
  signal: "bg-signal text-ink [--sh:#111111]",
  // For dark sections: a black shadow is invisible on black, so the shadow turns paper
  "signal-dark": "bg-signal text-ink [--sh:#f4f1ea]",
  paper: "bg-paper text-ink [--sh:#111111]",
  joker: "bg-joker text-paper [--sh:#111111]",
  ink: "bg-ink text-paper [--sh:#7c3aed]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-xl",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export type ButtonStyle = { variant?: Variant; size?: Size };

export function buttonClasses({ variant = "signal", size = "md" }: ButtonStyle = {}) {
  return cn(
    "inline-block text-center font-display uppercase border-[3px] border-ink rounded-md",
    "shadow-[6px_6px_0_var(--sh)] transition-transform duration-75 cursor-pointer",
    // Pressed-button feel: move toward the shadow, then sink into it
    "not-disabled:hover:translate-x-1 not-disabled:hover:translate-y-1 not-disabled:hover:shadow-[2px_2px_0_var(--sh)]",
    "not-disabled:active:translate-x-1.5 not-disabled:active:translate-y-1.5 not-disabled:active:shadow-none",
    "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-joker",
    "disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
  );
}

export function Button({ variant, size, className, type = "button", ...props }: Props) {
  return <button type={type} className={cn(buttonClasses({ variant, size }), className)} {...props} />;
}
