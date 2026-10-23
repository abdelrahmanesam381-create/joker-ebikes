import type { Model } from "@/data/models";

export type Level = 1 | 2 | 3;

export type Answers = {
  dailyKm: number; // one way
  cargo: Level; // what they carry
  weather: Level; // how rough the conditions are
  serviceDistance: Level; // 1 = near a service point, 3 = far away
};

export type Pick = { model: Model; score: number; reasons: string[]; warnings: string[] };

// How each 1 to 3 need maps to a model attribute, plus the words we show the rider
const needs = [
  { answer: "cargo", attr: "cargo", good: "Carries what you need to carry", short: "Tight on cargo space for you" },
  { answer: "weather", attr: "weatherProof", good: "Handles the weather you ride in", short: "Not built for your weather" },
  { answer: "serviceDistance", attr: "reliability", good: "Reliable enough for how far you are from service", short: "Needs more service visits than you can easily make" },
] as const;

/**
 * Scores every model against the rider's answers. Pure function: same input, same output,
 * so it is easy to test and it can run on the server or the client.
 *
 * Rules:
 *  - Missing what the rider needs costs a lot (shortfall).
 *  - Having much more than they need costs a little (they would pay for features they don't use).
 */
export function recommend(answers: Answers, models: Model[]): Pick[] {
  const roundTrip = answers.dailyKm * 2;

  return models
    .map((model) => {
      let score = 0;
      const reasons: string[] = [];
      const warnings: string[] = [];

      if (model.rangeKm >= roundTrip) {
        score += 2;
        reasons.push(`${model.rangeKm} km range covers your ${roundTrip} km round trip`);
        if (model.rangeKm > roundTrip * 3) score -= 1; // far more battery than needed
      } else {
        score -= 5;
        warnings.push(`${model.rangeKm} km range is short for your ${roundTrip} km round trip`);
      }

      for (const n of needs) {
        const diff = model[n.attr] - answers[n.answer];
        if (diff >= 0) {
          score -= diff * 0.5;
          if (answers[n.answer] >= 2) reasons.push(n.good);
        } else {
          score += diff * 3;
          warnings.push(n.short);
        }
      }

      if (model.weightKg <= 20 && answers.cargo === 1) reasons.push(`Only ${model.weightKg} kg, easy to carry upstairs`);

      return { model, score, reasons, warnings };
    })
    .sort((a, b) => b.score - a.score);
}
