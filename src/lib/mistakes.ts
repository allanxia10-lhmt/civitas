import { getQuestion } from "@/content";
import type { ChoiceId, CourseId, Question } from "@/content/types";
import type { UserProgress } from "./progress-types";
import { shuffle } from "./utils";

/**
 * The Mistake Log is derived from attempt history — nothing extra is stored
 * except copies of generated questions (bank questions are always available).
 *
 *   open      → the most recent attempt at the question was wrong
 *   corrected → it was missed before, and the most recent attempt was right
 */

export type MistakeStatus = "open" | "corrected";
export type MistakeOrigin = "bank" | "generated" | "ai";

export interface MistakeEntry {
  question: Question;
  origin: MistakeOrigin;
  status: MistakeStatus;
  misses: number;
  attempts: number;
  firstMissedAt: string;
  lastMissedAt: string;
  /** The student's most recent wrong answer. */
  lastWrongChoice?: ChoiceId;
  correctedAt?: string;
}

export const originOf = (id: string): MistakeOrigin => (id.startsWith("ai:") ? "ai" : id.startsWith("gen:") ? "generated" : "bank");

export function buildMistakeLog(progress: UserProgress): MistakeEntry[] {
  const dismissed = new Set(progress.dismissedMistakes);
  const byQuestion = new Map<string, UserProgress["attempts"]>();
  for (const a of [...progress.attempts].sort((x, y) => (x.at < y.at ? -1 : x.at > y.at ? 1 : 0))) {
    const list = byQuestion.get(a.questionId) ?? [];
    list.push(a);
    byQuestion.set(a.questionId, list);
  }

  const entries: MistakeEntry[] = [];
  for (const [id, attempts] of byQuestion) {
    const misses = attempts.filter((a) => !a.correct);
    if (!misses.length || dismissed.has(id)) continue;
    const question = getQuestion(id) ?? progress.savedQuestions[id];
    if (!question) continue; // generated before snapshots existed
    const last = attempts[attempts.length - 1];
    entries.push({
      question,
      origin: originOf(id),
      status: last.correct ? "corrected" : "open",
      misses: misses.length,
      attempts: attempts.length,
      firstMissedAt: misses[0].at,
      lastMissedAt: misses[misses.length - 1].at,
      lastWrongChoice: misses[misses.length - 1].selected,
      correctedAt: last.correct ? last.at : undefined,
    });
  }
  return entries;
}

export function openMistakeCount(progress: UserProgress, courseId?: CourseId): number {
  return buildMistakeLog(progress).filter((m) => m.status === "open" && (!courseId || m.question.courseId === courseId)).length;
}

/**
 * Reorders a question's answer choices for a second try so students recall
 * the answer rather than its position. Returns a map back to the original
 * letters so attempts are recorded against the original question.
 */
export function reshuffleChoices(question: Question, rng: () => number = Math.random) {
  const ids: ChoiceId[] = ["A", "B", "C", "D"];
  const order = shuffle(question.choices, rng);
  const toOriginal = {} as Record<ChoiceId, ChoiceId>;
  const choices = order.map((c, i) => {
    toOriginal[ids[i]] = c.id;
    return { ...c, id: ids[i] };
  });
  const answer = ids[order.findIndex((c) => c.id === question.answer)];
  return { question: { ...question, choices, answer }, toOriginal };
}

export const choiceText = (question: Question, id?: ChoiceId) => question.choices.find((c) => c.id === id)?.text;
