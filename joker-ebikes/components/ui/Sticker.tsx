import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLSpanElement> & {
  tone?: "signal" | "joker" | "paper";
  tilt?: "left" | "right";
};

const tones = {
  signal: "bg-signal text-ink",
  joker: "bg-joker text-paper",
  paper: "bg-paper text-ink",
};

// A rotated label, like a price tag slapped on a product
export function Sticker({ tone = "signal", tilt = "left", className, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-block font-display uppercase text-sm px-3 py-1",
        "border-[3px] border-ink shadow-[3px_3px_0_#111111]",
        tilt === "left" ? "-rotate-3" : "rotate-3",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
