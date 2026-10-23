import Link from "next/link";

const columns = [
  { title: "Shop", links: [{ href: "/models", label: "All bikes" }, { href: "/pick", label: "Pick your card" }, { href: "/test-ride", label: "Test ride" }] },
  { title: "Help", links: [{ href: "#", label: "Shipping" }, { href: "#", label: "Warranty" }, { href: "#", label: "Service points" }] },
];

export function Footer() {
  return (
    <footer className="bg-signal text-ink">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 md:grid-cols-[2fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-6xl uppercase md:text-8xl">Joker</p>
          <p className="mt-2 max-w-xs text-sm">Urban e-bikes for people who ride the city every day.</p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="mb-3 font-display uppercase">{c.title}</p>
            <ul className="flex flex-col gap-2 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:underline decoration-[3px] underline-offset-4">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t-[3px] border-ink px-4 py-4 text-center text-xs font-bold uppercase">© 2026 Joker · All rights dealt</p>
    </footer>
  );
}
