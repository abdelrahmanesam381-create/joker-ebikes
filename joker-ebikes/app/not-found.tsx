import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <p className="font-display text-8xl">404</p>
      <h1 className="font-display text-3xl uppercase">That card isn&apos;t in the deck.</h1>
      <ButtonLink href="/models">See all bikes</ButtonLink>
    </main>
  );
}
