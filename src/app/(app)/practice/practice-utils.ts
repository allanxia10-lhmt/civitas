import { getLesson, getQuestion, QUESTIONS } from "@/content";
import type { CourseId, Difficulty, Question } from "@/content/types";
import type { UserProgress } from "@/lib/progress-types";
import { shuffle } from "@/lib/utils";

/** Questions whose most recent attempt was incorrect. */
export function missedQuestionIds(progress: UserProgress, courseId?: CourseId): string[] {
  const latest = new Map<string, boolean>();
  for (const a of progress.attempts) latest.set(a.questionId, a.correct);
  return [...latest.entries()]
    .filter(([id, correct]) => !correct && (!courseId || getQuestion(id)?.courseId === courseId))
    .map(([id]) => id);
}

export interface SessionParams {
  course?: string | null;
  unit?: string | null;
  topic?: string | null;
  difficulty?: string | null;
  mode?: string | null;
  question?: string | null;
  count?: string | null;
}

/**
 * Builds a practice set from URL parameters. Topic sets lead with the topic's
 * own questions, then fill from the same unit so every set reaches its size.
 */
export function buildPracticeSet(params: SessionParams, progress: UserProgress): Question[] {
  if (params.question) {
    const q = getQuestion(params.question);
    return q ? [q] : [];
  }
  const count = Math.max(1, Math.min(55, Number(params.count) || 10));
  let pool = QUESTIONS.filter((q) => !params.course || q.courseId === params.course);

  if (params.mode === "missed") {
    const missed = new Set(missedQuestionIds(progress));
    pool = pool.filter((q) => missed.has(q.id));
  } else if (params.mode === "unanswered") {
    const seen = new Set(progress.attempts.map((a) => a.questionId));
    pool = pool.filter((q) => !seen.has(q.id));
  }
  if (params.difficulty) pool = pool.filter((q) => q.difficulty === (params.difficulty as Difficulty));

  if (params.topic) {
    const topicQs = shuffle(pool.filter((q) => q.topicId === params.topic));
    const unitId = getLesson(params.topic)?.unitId;
    const fill = params.mode === "missed" ? [] : shuffle(pool.filter((q) => q.unitId === unitId && q.topicId !== params.topic));
    return [...topicQs, ...fill].slice(0, count);
  }
  if (params.unit) {
    const units = params.unit.split(",");
    pool = pool.filter((q) => units.includes(q.unitId));
  }
  return shuffle(pool).slice(0, count);
}
