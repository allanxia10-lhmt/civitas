import type { FlashcardState, Grade } from "./progress-types";
import { addDays } from "./utils";

/**
 * Spaced repetition — a simplified SM-2 with three grades.
 *   again → relearn today, ease drops
 *   hard  → short interval, ease drops slightly
 *   easy  → interval grows by the ease factor
 */
export function schedule(state: FlashcardState | undefined, grade: Grade, today: string, nowIso: string): FlashcardState {
  const prev: FlashcardState = state ?? { ease: 2.5, interval: 0, reps: 0, lapses: 0, reviews: 0, due: today };
  let { ease, interval, reps, lapses } = prev;

  if (grade === "again") {
    reps = 0;
    lapses += 1;
    interval = 0;
    ease = Math.max(1.3, ease - 0.2);
  } else if (grade === "hard") {
    interval = reps === 0 ? 1 : Math.max(1, Math.round(interval * 1.2));
    ease = Math.max(1.3, ease - 0.15);
    reps += 1;
  } else {
    interval = reps === 0 ? 3 : reps === 1 ? 6 : Math.round(Math.max(interval, 1) * ease);
    ease = Math.min(3.0, ease + 0.1);
    reps += 1;
  }

  return {
    ease: Math.round(ease * 100) / 100,
    interval,
    reps,
    lapses,
    reviews: prev.reviews + 1,
    due: addDays(today, interval),
    lastGrade: grade,
    lastReviewed: nowIso,
  };
}

export function previewInterval(state: FlashcardState | undefined, grade: Grade): string {
  const next = schedule(state, grade, "2000-01-01", "");
  if (next.interval === 0) return "today";
  if (next.interval === 1) return "1 day";
  if (next.interval < 30) return `${next.interval} days`;
  const months = Math.round(next.interval / 30);
  return months <= 1 ? "1 month" : `${months} months`;
}

export const isDue = (state: FlashcardState | undefined, today: string) => !!state && state.due <= today;
export const isNew = (state: FlashcardState | undefined) => !state;
export const isHard = (state: FlashcardState | undefined) => !!state && (state.lastGrade === "hard" || state.lastGrade === "again");
