import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLDivElement> & {
  tilt?: "left" | "right" | "none";
  interactive?: boolean; // lifts on hover, for clickable cards
  tone?: "paper" | "signal" | "joker" | "ink";
};

const tones = {
  paper: "bg-paper text-ink",
  signal: "bg-signal text-ink",
  joker: "bg-joker text-paper",
  ink: "bg-ink text-paper",
};

export function Card({
  tilt = "none",
  interactive = false,
  tone = "paper",
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "border-[3px] border-ink rounded-lg shadow-hard-lg p-6",
        tones[tone],
        tilt === "left" && "-rotate-1",
        tilt === "right" && "rotate-1",
        interactive &&
          "transition-transform duration-75 hover:-translate-y-1 hover:rotate-0 cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}
