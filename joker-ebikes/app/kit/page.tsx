import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { Badge } from "@/components/ui/Badge";
import { models, formatEgp } from "@/data/models";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-display text-3xl uppercase border-b-[3px] border-ink pb-2">{title}</h2>
      {children}
    </section>
  );
}

export default function Kit() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-14 p-6 md:p-10">
        <h1 className="font-display text-5xl uppercase">UI kit</h1>

        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-6">
            <Button>Signal</Button>
            <Button variant="ink">Ink</Button>
            <Button variant="paper">Paper</Button>
            <Button variant="joker">Joker</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <p className="text-sm">Hover, click and press Tab to see the hover, pressed and focus states.</p>
        </Section>

        <Section title="Cards">
          <div className="grid gap-8 md:grid-cols-3">
            <Card tilt="left">
              <h3 className="font-display text-xl uppercase">Paper, tilted</h3>
              <p className="mt-2 text-sm">Default card with a hard shadow.</p>
            </Card>
            <Card tone="signal" interactive>
              <h3 className="font-display text-xl uppercase">Interactive</h3>
              <p className="mt-2 text-sm">Lifts when you hover over it.</p>
            </Card>
            <Card tone="joker" tilt="right">
              <h3 className="font-display text-xl uppercase">Joker tone</h3>
              <p className="mt-2 text-sm">Accent color for featured items.</p>
            </Card>
          </div>
        </Section>

        <Section title="Stickers and badges">
          <div className="flex flex-wrap items-center gap-6">
            <Sticker>Starting at 24,900 EGP</Sticker>
            <Sticker tone="joker" tilt="right">New</Sticker>
            <Sticker tone="paper">Sold out</Sticker>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge>80 km range</Badge>
            <Badge>22 kg</Badge>
            <Badge>Rain proof</Badge>
          </div>
        </Section>
        <Section title="Data check">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {models.map((m) => (
              <Card key={m.slug} interactive className="flex flex-col gap-3">
                <span className="h-3 w-full border-2 border-ink" style={{ background: m.accent }} aria-hidden />
                <h3 className="font-display text-2xl uppercase">{m.name}</h3>
                <p className="text-sm">{m.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>{m.rangeKm} km</Badge>
                  <Badge>{m.weightKg} kg</Badge>
                </div>
                <Sticker className="self-start">{formatEgp(m.priceEgp)}</Sticker>
              </Card>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
