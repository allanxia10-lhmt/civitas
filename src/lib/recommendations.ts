import { FLASHCARDS, FRQ_TYPES, getLesson, lessonsForCourse, PRACTICE_TESTS } from "@/content";
import type { CourseId, FrqType } from "@/content/types";
import type { TopicMastery } from "./mastery";
import { buildMistakeLog } from "./mistakes";
import type { UserProgress } from "./progress-types";
import { isDue, isHard } from "./srs";
import { addDays, daysBetween, isoToDateKey, percent, plural } from "./utils";

export type RecommendationKind = "missed" | "mistakes" | "low-mastery" | "frq" | "flashcards" | "refresh" | "next-lesson" | "test";

export interface Recommendation {
  id: string;
  kind: RecommendationKind;
  courseId?: CourseId;
  title: string;
  reason: string;
  priority: number;
  minutes: number;
  actions: { label: string; href: string }[];
}

/**
 * "What should I study?" — ranks supportive, specific suggestions from the
 * student's own data: recent misses, low mastery, FRQ results, flashcard
 * backlog, time since review, and plan progress. Copy is deliberately
 * encouraging: it names the evidence and the next step, never a judgment.
 */
export function buildRecommendations(
  progress: UserProgress,
  mastery: Map<string, TopicMastery>,
  today: string,
  courseFilter?: CourseId,
): Recommendation[] {
  const courses = courseFilter ? [courseFilter] : progress.profile.courses;
  const inCourse = (c: CourseId) => courses.includes(c);
  const recs: Recommendation[] = [];
  const weekAgo = addDays(today, -7);

  // 1. Topics with several misses this week.
  const missesByTopic = new Map<string, number>();
  for (const a of progress.attempts) {
    if (!a.correct && isoToDateKey(a.at) >= weekAgo && inCourse(a.courseId)) {
      missesByTopic.set(a.topicId, (missesByTopic.get(a.topicId) ?? 0) + 1);
    }
  }
  for (const [topicId, misses] of missesByTopic) {
    if (misses < 3) continue;
    const lesson = getLesson(topicId);
    if (!lesson) continue;
    recs.push({
      id: `missed-${topicId}`,
      kind: "missed",
      courseId: lesson.courseId,
      title: `Review ${lesson.title}`,
      reason: `You missed ${misses} questions related to ${lesson.title.split(":")[0]} this week. A quick refresher on the lesson, then a short set of the questions you missed, usually clears this up.`,
      priority: 90 + Math.min(misses, 8),
      minutes: 20,
      actions: [
        { label: "Revisit lesson", href: `/lessons/${topicId}` },
        { label: "Practice missed", href: `/practice/session?course=${lesson.courseId}&topic=${topicId}&mode=missed&count=10` },
      ],
    });
  }

  // 1b. Open items in the Mistake Log.
  const openMistakes = buildMistakeLog(progress).filter((m) => m.status === "open" && inCourse(m.question.courseId)).length;
  if (openMistakes >= 3) {
    recs.push({
      id: "mistake-log",
      kind: "mistakes",
      courseId: courseFilter,
      title: `Give ${openMistakes} missed questions a second chance`,
      reason: `Your Mistake Log has ${openMistakes} questions you haven't gotten right yet. Retrying a missed question after a short gap is one of the most effective ways to lock a concept in — and each one you get right moves to Corrected.`,
      priority: 72 + Math.min(openMistakes, 20) / 2,
      minutes: Math.max(5, Math.min(20, openMistakes)),
      actions: [{ label: "Start Second Chance", href: courseFilter ? `/mistakes?course=${courseFilter}` : "/mistakes" }],
    });
  }

  // 2. Low mastery on topics the student has started.
  for (const m of mastery.values()) {
    if (!inCourse(m.courseId) || m.attempts < 4 || m.score >= 62 || (missesByTopic.get(m.topicId) ?? 0) >= 3) continue;
    const lesson = getLesson(m.topicId)!;
    recs.push({
      id: `low-${m.topicId}`,
      kind: "low-mastery",
      courseId: m.courseId,
      title: `Strengthen ${lesson.title.split(":")[0]}`,
      reason: `Your mastery here is ${m.score}% (${m.correct} of ${m.attempts} correct). Ten focused questions with explanations is often enough to move it into the proficient range.`,
      priority: 80 - m.score / 5,
      minutes: 15,
      actions: [{ label: "Practice 10 questions", href: `/practice/session?course=${m.courseId}&topic=${m.topicId}&count=10` }],
    });
  }

  // 3. FRQ types with lower estimated scores.
  const byType = new Map<FrqType, { earned: number; possible: number; n: number }>();
  for (const s of progress.frqSubmissions) {
    if (!inCourse(s.courseId)) continue;
    const e = byType.get(s.type) ?? { earned: 0, possible: 0, n: 0 };
    e.earned += s.earned;
    e.possible += s.possible;
    e.n += 1;
    byType.set(s.type, e);
  }
  for (const [type, e] of byType) {
    const pct = percent(e.earned, e.possible);
    if (pct >= 70) continue;
    const info = FRQ_TYPES[type];
    recs.push({
      id: `frq-${type}`,
      kind: "frq",
      courseId: info.course,
      title: `Practice ${info.name} FRQs`,
      reason: `Your recent estimated scores on ${info.name} average ${pct}% across ${plural(e.n, "attempt")}, so additional practice would be useful. Compare your next response against the model answer.`,
      priority: 70 - pct / 10,
      minutes: info.minutes,
      actions: [{ label: "Browse FRQs", href: `/frq?course=${info.course}&type=${type}` }],
    });
  }
  for (const c of courses) {
    const hasAny = progress.frqSubmissions.some((s) => s.courseId === c);
    if (!hasAny) {
      recs.push({
        id: `frq-first-${c}`,
        kind: "frq",
        courseId: c,
        title: "Try your first FRQ",
        reason: "Free response is half of the exam score. Writing one response now — even untimed — shows you what the rubric rewards.",
        priority: 60,
        minutes: 20,
        actions: [{ label: "Choose an FRQ", href: `/frq?course=${c}` }],
      });
    }
  }

  // 4. Flashcard backlog.
  const cards = [...FLASHCARDS, ...progress.customFlashcards].filter((f) => inCourse(f.courseId));
  const due = cards.filter((c) => isDue(progress.flashcards[c.id], today));
  const hard = due.filter((c) => isHard(progress.flashcards[c.id]));
  if (due.length) {
    recs.push({
      id: "flashcards-due",
      kind: "flashcards",
      title: `Review ${plural(due.length, "flashcard")}`,
      reason: hard.length
        ? `${plural(due.length, "card is", "cards are")} due today, including ${hard.length} you marked Hard. Reviewing on schedule is what makes spaced repetition work.`
        : `${plural(due.length, "card is", "cards are")} due today. A few minutes now keeps them in long-term memory.`,
      priority: 55 + Math.min(due.length, 30) / 2,
      minutes: Math.max(5, Math.ceil(due.length * 0.4)),
      actions: [{ label: "Start review", href: `/flashcards/study?mode=due` }],
    });
  }

  // 5. Completed topics not reviewed in a while.
  const stale = [...mastery.values()]
    .filter((m) => inCourse(m.courseId) && m.lessonDone && m.lastActivity && daysBetween(m.lastActivity, today) >= 21)
    .sort((a, b) => (a.lastActivity! < b.lastActivity! ? -1 : 1))
    .slice(0, 2);
  for (const m of stale) {
    const lesson = getLesson(m.topicId)!;
    const days = daysBetween(m.lastActivity!, today);
    recs.push({
      id: `refresh-${m.topicId}`,
      kind: "refresh",
      courseId: m.courseId,
      title: `Refresh ${lesson.title.split(":")[0]}`,
      reason: `It's been ${days} days since you last worked on this topic. A five-question check keeps it fresh for the exam.`,
      priority: 45 + Math.min(days, 40) / 4,
      minutes: 8,
      actions: [{ label: "Quick check", href: `/practice/session?course=${m.courseId}&topic=${m.topicId}&count=5` }],
    });
  }

  // 6. Next lesson in sequence.
  for (const c of courses) {
    const next = lessonsForCourse(c).find((l) => !progress.lessons[l.id]?.completedAt);
    if (next) {
      recs.push({
        id: `next-${next.id}`,
        kind: "next-lesson",
        courseId: c,
        title: `Keep going: ${next.title}`,
        reason: "This is the next lesson in your course sequence. Steady progress through new material keeps your plan on track.",
        priority: 50,
        minutes: next.minutes,
        actions: [{ label: "Start lesson", href: `/lessons/${next.id}` }],
      });
    }
  }

  // 7. Diagnostic or practice test.
  for (const c of courses) {
    const tests = progress.testAttempts.filter((t) => t.courseId === c);
    const recent = tests.some((t) => daysBetween(isoToDateKey(t.completedAt), today) <= 30);
    if (!recent) {
      const test = PRACTICE_TESTS.find((t) => t.courseId === c && t.kind === (tests.length ? "sprint" : "diagnostic"))!;
      recs.push({
        id: `test-${c}`,
        kind: "test",
        courseId: c,
        title: tests.length ? "Take a timed MCQ Sprint" : "Take a diagnostic",
        reason: tests.length
          ? "It's been over a month since your last practice test. A timed section shows how your pacing and accuracy have changed."
          : "A 20-question diagnostic gives your mastery scores a reliable starting point.",
        priority: 40,
        minutes: test.mcqMinutes,
        actions: [{ label: "Start", href: `/practice-tests/${test.id}` }],
      });
    }
  }

  return recs.sort((a, b) => b.priority - a.priority);
}
