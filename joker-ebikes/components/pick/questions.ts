import type { Answers } from "@/lib/recommend";

type Question = {
  key: keyof Answers;
  title: string;
  options: { label: string; hint: string; value: number }[];
};

export const questions: Question[] = [
  {
    key: "dailyKm",
    title: "How far is your daily ride, one way?",
    options: [
      { label: "Under 10 km", hint: "Around the neighbourhood", value: 6 },
      { label: "10 to 25 km", hint: "Across a few districts", value: 18 },
      { label: "Over 25 km", hint: "City to city", value: 40 },
    ],
  },
  {
    key: "cargo",
    title: "What do you carry?",
    options: [
      { label: "Just me", hint: "Maybe a small bag", value: 1 },
      { label: "A backpack or gym bag", hint: "Daily stuff", value: 2 },
      { label: "Groceries, deliveries, a kid seat", hint: "Real loads", value: 3 },
    ],
  },
  {
    key: "weather",
    title: "What do you ride through?",
    options: [
      { label: "Dry days only", hint: "I skip bad weather", value: 1 },
      { label: "Some rain and dust", hint: "Normal Cairo year", value: 2 },
      { label: "Everything, every day", hint: "Rain, sand, potholes", value: 3 },
    ],
  },
  {
    key: "serviceDistance",
    title: "How far are you from a service point?",
    options: [
      { label: "Close by", hint: "Under 15 minutes", value: 1 },
      { label: "Not too far", hint: "Half an hour or so", value: 2 },
      { label: "Far away", hint: "It has to just work", value: 3 },
    ],
  },
];
