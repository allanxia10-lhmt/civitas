import type { CourseId } from "@/content/types";
import type { UserProgress } from "./progress-types";
import { addDays, daysBetween, isoToDateKey, percent, startOfWeek } from "./utils";

export function minutesByDay(progress: UserProgress): Map<string, number> {
  const map = new Map<string, number>();
  for (const s of progress.sessions) map.set(s.date, (map.get(s.date) ?? 0) + s.minutes);
  return map;
}

export function minutesOn(progress: UserProgress, day: string): number {
  return progress.sessions.filter((s) => s.date === day).reduce((sum, s) => sum + s.minutes, 0);
}

export function minutesBetween(progress: UserProgress, from: string, to: string): number {
  return progress.sessions.filter((s) => s.date >= from && s.date <= to).reduce((sum, s) => sum + s.minutes, 0);
}

export function weekMinutes(progress: UserProgress, today: string): number {
  return minutesBetween(progress, startOfWeek(today), today);
}

export function totalMinutes(progress: UserProgress): number {
  return progress.sessions.reduce((sum, s) => sum + s.minutes, 0);
}

/** Current and longest streak of consecutive days with study time. */
export function streak(progress: UserProgress, today: string) {
  const days = minutesByDay(progress);
  const studiedToday = (days.get(today) ?? 0) > 0;

  let current = 0;
  let cursor = studiedToday ? today : addDays(today, -1);
  while ((days.get(cursor) ?? 0) > 0) {
    current++;
    cursor = addDays(cursor, -1);
  }

  let longest = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of [...days.keys()].sort()) {
    if ((days.get(day) ?? 0) <= 0) continue;
    run = prev && daysBetween(prev, day) === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = day;
  }

  return { current, longest: Math.max(longest, current), studiedToday };
}

/** Minutes per day for the last `n` days ending today (oldest first). */
export function recentDays(progress: UserProgress, today: string, n: number) {
  const days = minutesByDay(progress);
  return Array.from({ length: n }, (_, i) => {
    const date = addDays(today, i - n + 1);
    return { date, minutes: days.get(date) ?? 0 };
  });
}

/** Minutes and accuracy per week for the last `n` weeks (oldest first). */
export function recentWeeks(progress: UserProgress, today: string, n: number) {
  const thisWeek = startOfWeek(today);
  return Array.from({ length: n }, (_, i) => {
    const start = addDays(thisWeek, (i - n + 1) * 7);
    const end = addDays(start, 6);
    const attempts = progress.attempts.filter((a) => {
      const d = isoToDateKey(a.at);
      return d >= start && d <= end;
    });
    const correct = attempts.filter((a) => a.correct).length;
    return {
      start,
      minutes: minutesBetween(progress, start, end),
      questions: attempts.length,
      accuracy: attempts.length ? percent(correct, attempts.length) : null,
    };
  });
}

export function accuracy(progress: UserProgress, courseId?: CourseId) {
  const attempts = courseId ? progress.attempts.filter((a) => a.courseId === courseId) : progress.attempts;
  const correct = attempts.filter((a) => a.correct).length;
  return { answered: attempts.length, correct, percent: percent(correct, attempts.length) };
}

export function flashcardReviews(progress: UserProgress): number {
  return Object.values(progress.flashcards).reduce((sum, s) => sum + s.reviews, 0);
}

export function lessonsCompleted(progress: UserProgress): number {
  return Object.values(progress.lessons).filter((l) => l.completedAt).length;
}

// ---------------------------------------------------------------------------
// XP and levels — derived, never stored.
// ---------------------------------------------------------------------------

export const XP_RULES = {
  lesson: 50,
  correct: 10,
  attempt: 2,
  flashcard: 2,
  frq: 40,
  test: 150,
  streakDay: 5,
};

export function xp(progress: UserProgress, today: string): number {
  const correct = progress.attempts.filter((a) => a.correct).length;
  const { longest } = streak(progress, today);
  return (
    lessonsCompleted(progress) * XP_RULES.lesson +
    correct * XP_RULES.correct +
    progress.attempts.length * XP_RULES.attempt +
    flashcardReviews(progress) * XP_RULES.flashcard +
    progress.frqSubmissions.length * XP_RULES.frq +
    progress.testAttempts.length * XP_RULES.test +
    longest * XP_RULES.streakDay
  );
}

/** Levels get gradually longer: level n requires 400 + 100·n XP. */
export function levelFor(totalXp: number) {
  let level = 1;
  let floor = 0;
  let size = 500;
  while (totalXp >= floor + size) {
    floor += size;
    level++;
    size = 400 + 100 * level;
  }
  return { level, intoLevel: totalXp - floor, levelSize: size, toNext: floor + size - totalXp };
}
