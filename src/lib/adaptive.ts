import type { Difficulty } from "@/content/types";
import type { TopicMastery } from "./mastery";

/**
 * Adaptive difficulty for Endless Practice: a "2-up, 1-down" staircase.
 * Two correct answers in a row step difficulty up; any miss steps it down.
 * This settles where a student gets roughly 70% right — hard enough to
 * learn from, easy enough to keep going.
 */

export const LEVELS: Difficulty[] = ["easy", "medium", "hard"];

export interface AdaptiveState {
  level: Difficulty;
  streak: number;
}

export function initialLevel(topicIds: string[], mastery: Map<string, TopicMastery>): Difficulty {
  const scores = topicIds.map((id) => mastery.get(id)?.score ?? 0);
  const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  if (avg >= 72) return "hard";
  if (avg >= 45) return "medium";
  return "easy";
}

export function stepAdaptive(state: AdaptiveState, correct: boolean): { state: AdaptiveState; change: "up" | "down" | null } {
  const i = LEVELS.indexOf(state.level);
  if (correct) {
    const streak = state.streak + 1;
    if (streak >= 2 && i < LEVELS.length - 1) return { state: { level: LEVELS[i + 1], streak: 0 }, change: "up" };
    return { state: { level: state.level, streak: streak >= 2 ? 0 : streak }, change: null };
  }
  if (i > 0) return { state: { level: LEVELS[i - 1], streak: 0 }, change: "down" };
  return { state: { level: state.level, streak: 0 }, change: null };
}

/**
 * Chooses the next topic, favoring weaker topics (weight 1–5 by mastery) and
 * avoiding the two most recent topics when there's any alternative.
 */
export function pickTopic(topicIds: string[], mastery: Map<string, TopicMastery>, rng: () => number, recent: string[]): string {
  const avoid = new Set(recent.slice(-2));
  const pool = topicIds.length > 2 ? topicIds.filter((id) => !avoid.has(id)) : topicIds;
  const weights = pool.map((id) => 1 + (100 - (mastery.get(id)?.score ?? 0)) / 25);
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rng() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}
