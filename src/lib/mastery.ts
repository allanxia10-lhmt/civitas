import { LESSONS, UNITS, lessonsForCourse, unitsForCourse } from "@/content";
import type { CourseId } from "@/content/types";
import type { UserProgress } from "./progress-types";
import { daysBetween, isoToDateKey, percent } from "./utils";

export type MasteryStatus = "not-started" | "needs-work" | "developing" | "proficient" | "mastered";

export interface TopicMastery {
  topicId: string;
  courseId: CourseId;
  unitId: string;
  score: number;
  attempts: number;
  correct: number;
  accuracy: number | null;
  lessonDone: boolean;
  lastActivity?: string;
  status: MasteryStatus;
}

export const MASTERY_LABELS: Record<MasteryStatus, string> = {
  "not-started": "Not started",
  "needs-work": "Needs work",
  developing: "Developing",
  proficient: "Proficient",
  mastered: "Mastered",
};

export function statusFor(score: number, started: boolean): MasteryStatus {
  if (!started) return "not-started";
  if (score >= 85) return "mastered";
  if (score >= 70) return "proficient";
  if (score >= 50) return "developing";
  return "needs-work";
}

/**
 * Mastery for every topic. Transparent by design (explained in the UI):
 *  - Recent question accuracy counts most; each attempt's weight halves every 30 days.
 *  - Accuracy is smoothed toward 50% so two lucky answers don't read as mastery.
 *  - Completing the lesson contributes 20%.
 *  - Topics untouched for 30+ days decay slightly, prompting review.
 */
export function computeMastery(progress: UserProgress, today: string): Map<string, TopicMastery> {
  const byTopic = new Map<string, { w: number; wc: number; n: number; c: number; last?: string }>();
  for (const a of progress.attempts) {
    const day = isoToDateKey(a.at);
    const age = Math.max(0, daysBetween(day, today));
    const w = Math.pow(0.5, age / 30);
    const entry = byTopic.get(a.topicId) ?? { w: 0, wc: 0, n: 0, c: 0 };
    entry.w += w;
    entry.wc += a.correct ? w : 0;
    entry.n += 1;
    entry.c += a.correct ? 1 : 0;
    if (!entry.last || day > entry.last) entry.last = day;
    byTopic.set(a.topicId, entry);
  }

  const result = new Map<string, TopicMastery>();
  for (const lesson of LESSONS) {
    const stats = byTopic.get(lesson.id);
    const lessonProgress = progress.lessons[lesson.id];
    const lessonDone = !!lessonProgress?.completedAt;
    const lessonDay = lessonProgress?.completedAt ? isoToDateKey(lessonProgress.completedAt) : undefined;
    const last = [stats?.last, lessonDay].filter(Boolean).sort().pop();

    let score = 0;
    if (stats && stats.n > 0) {
      const smoothed = (stats.wc + 0.5 * 2) / (stats.w + 2);
      score = 100 * (0.8 * smoothed + 0.2 * (lessonDone ? 1 : 0));
    } else if (lessonDone) {
      score = 40;
    }
    if (last && daysBetween(last, today) > 30) score *= 0.92;
    score = Math.round(score);

    const started = lessonDone || (stats?.n ?? 0) > 0;
    result.set(lesson.id, {
      topicId: lesson.id,
      courseId: lesson.courseId,
      unitId: lesson.unitId,
      score,
      attempts: stats?.n ?? 0,
      correct: stats?.c ?? 0,
      accuracy: stats?.n ? percent(stats.c, stats.n) : null,
      lessonDone,
      lastActivity: last,
      status: statusFor(score, started),
    });
  }
  return result;
}

export function unitMastery(mastery: Map<string, TopicMastery>, unitId: string): number {
  const unit = UNITS.find((u) => u.id === unitId);
  if (!unit || unit.lessonIds.length === 0) return 0;
  const total = unit.lessonIds.reduce((sum, id) => sum + (mastery.get(id)?.score ?? 0), 0);
  return Math.round(total / unit.lessonIds.length);
}

/** Course mastery, weighted by each unit's official exam weighting. */
export function courseMastery(mastery: Map<string, TopicMastery>, courseId: CourseId): number {
  const units = unitsForCourse(courseId);
  const totalWeight = units.reduce((s, u) => s + u.weightMidpoint, 0);
  const weighted = units.reduce((s, u) => s + unitMastery(mastery, u.id) * u.weightMidpoint, 0);
  return totalWeight ? Math.round(weighted / totalWeight) : 0;
}

export function courseCompletion(progress: UserProgress, courseIds: CourseId[]) {
  const lessons = courseIds.flatMap((c) => lessonsForCourse(c));
  const done = lessons.filter((l) => progress.lessons[l.id]?.completedAt).length;
  return { done, total: lessons.length, percent: percent(done, lessons.length) };
}

export function unitCompletion(progress: UserProgress, unitId: string) {
  const unit = UNITS.find((u) => u.id === unitId);
  const ids = unit?.lessonIds ?? [];
  const done = ids.filter((id) => progress.lessons[id]?.completedAt).length;
  return { done, total: ids.length, percent: percent(done, ids.length) };
}

export const MASTERY_STYLES: Record<MasteryStatus, { bar: string; text: string; soft: string }> = {
  "not-started": { bar: "bg-subtle", text: "text-muted-foreground", soft: "bg-muted" },
  "needs-work": { bar: "bg-danger", text: "text-danger", soft: "bg-danger-soft" },
  developing: { bar: "bg-warning", text: "text-warning", soft: "bg-warning-soft" },
  proficient: { bar: "bg-primary", text: "text-primary", soft: "bg-primary-soft" },
  mastered: { bar: "bg-success", text: "text-success", soft: "bg-success-soft" },
};
