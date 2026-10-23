import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLSpanElement> & { tone?: "paper" | "ink" };

const tones = {
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
};

// Small spec label, e.g. "80 KM RANGE"
export function Badge({ tone = "paper", className, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border-2 border-ink px-3 py-0.5",
        "text-xs font-bold uppercase tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
