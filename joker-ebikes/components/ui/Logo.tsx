import Link from "next/link";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2 font-display text-2xl uppercase focus-visible:outline-4 focus-visible:outline-joker">
      <span className="inline-block size-5 rotate-12 border-[3px] border-ink bg-signal" aria-hidden />
      Joker
    </Link>
  );
}
