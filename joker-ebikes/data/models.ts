// Single source of truth for products.
// Later this file can be replaced by Shopify or a database without touching the UI.

export type Model = {
  slug: string;
  name: string;
  tagline: string;
  priceEgp: number; // whole pounds; the server reads prices from here, never from the browser
  accent: string; // per-model color for cards, spotlights and stickers
  rangeKm: number;
  weightKg: number;
  // 1 to 3 scores used by the "Pick your card" selector
  cargo: 1 | 2 | 3;
  weatherProof: 1 | 2 | 3;
  reliability: 1 | 2 | 3;
  image: string;
};

export const models: Model[] = [
  {
    slug: "ace",
    name: "Ace",
    tagline: "Light, quick, made for the daily run.",
    priceEgp: 24900,
    accent: "#b6ff00",
    rangeKm: 45,
    weightKg: 17,
    cargo: 1,
    weatherProof: 1,
    reliability: 2,
    image: "/bikes/ace.webp",
  },
  {
    slug: "jack",
    name: "Jack",
    tagline: "Carries the groceries, the gym bag and the kid seat.",
    priceEgp: 54900,
    accent: "#ff6b1a",
    rangeKm: 60,
    weightKg: 29,
    cargo: 3,
    weatherProof: 2,
    reliability: 2,
    image: "/bikes/jack.webp",
  },
  {
    slug: "king",
    name: "King",
    tagline: "Long commute? One charge, the whole week.",
    priceEgp: 47900,
    accent: "#7c3aed",
    rangeKm: 110,
    weightKg: 23,
    cargo: 2,
    weatherProof: 2,
    reliability: 3,
    image: "/bikes/king.webp",
  },
  {
    slug: "wild-card",
    name: "Wild Card",
    tagline: "Rain, dust, potholes. Bring it.",
    priceEgp: 62900,
    accent: "#00c2ff",
    rangeKm: 80,
    weightKg: 26,
    cargo: 2,
    weatherProof: 3,
    reliability: 3,
    image: "/bikes/wild-card.webp",
  },
];

export const getModel = (slug: string) => models.find((m) => m.slug === slug);

export const formatEgp = (amount: number) =>
  new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(amount);

// Playing-card corner symbol. Wild Card gets a star: an upside-down "W" reads as "M"
export const cardIndex = (m: Pick<Model, "slug" | "name">) => (m.slug === "wild-card" ? "★" : m.name[0]);
