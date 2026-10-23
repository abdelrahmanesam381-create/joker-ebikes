import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { buttonClasses, type ButtonStyle } from "./Button";

// Looks like a Button, behaves like a link (navigation should be a link, not a button)
export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & ButtonStyle) {
  return <Link className={cn(buttonClasses({ variant, size }), className)} {...props} />;
}
