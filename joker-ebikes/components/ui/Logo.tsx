import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  onClick?: () => void;
  // "plain" sits directly on cream. "sticker" puts it on a cream sticker, for lime or dark
  // backgrounds: on lime the green splashes disappear, on black the letters disappear.
  variant?: "plain" | "sticker";
  size?: "sm" | "lg";
  priority?: boolean;
  className?: string;
};

export function Logo({ onClick, variant = "plain", size = "sm", priority, className }: Props) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="JOKER home"
      className={cn(
        "inline-block shrink-0 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-joker",
        variant === "sticker" && "-rotate-2 border-[3px] border-ink bg-paper px-3 py-1 shadow-[4px_4px_0_#111111]",
        className,
      )}
    >
      <Image
        src="/brand/joker-logo.webp"
        alt="JOKER"
        width={1194}
        height={540}
        priority={priority}
        sizes={size === "lg" ? "(min-width: 768px) 420px, 280px" : "140px"}
        className={size === "lg" ? "h-28 w-auto md:h-44" : "h-10 w-auto md:h-12"}
      />
    </Link>
  );
}
