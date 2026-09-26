import { CASES, COUNTRIES, DOCUMENTS, FRQS, FRQ_TYPES, getCourse, lessonsForCourse, unitsForCourse } from "@/content";
import type { CourseId, Frq, Lesson, Unit } from "@/content/types";
import type { Profile, UserProgress } from "./progress-types";
import { addDays, clamp, daysBetween, isoToDateKey, startOfWeek } from "./utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Phase = "learn" | "practice" | "apply" | "review" | "final";

export const PHASES: Record<Phase, { label: string; number: number; description: string; className: string; dot: string }> = {
  learn: { label: "Learn", number: 1, description: "Build understanding through lessons and explanations.", className: "bg-primary-soft text-primary", dot: "bg-primary" },
  practice: { label: "Practice", number: 2, description: "Practice MCQs, concepts, vocabulary, and FRQs.", className: "bg-xp-soft text-xp", dot: "bg-xp" },
  apply: { label: "Apply", number: 3, description: "Complete AP-style questions and timed sections.", className: "bg-warning-soft text-warning", dot: "bg-warning" },
  review: { label: "Review", number: 4, description: "Identify weak areas and revisit them.", className: "bg-compgov-soft text-compgov", dot: "bg-compgov" },
  final: { label: "Final Review", number: 5, description: "Full-length practice exams and targeted review.", className: "bg-success-soft text-success", dot: "bg-success" },
};

export const PHASE_ORDER: Phase[] = ["learn", "practice", "apply", "review", "final"];

export type TaskType = "lesson" | "practice" | "flashcards" | "frq" | "cases" | "documents" | "country" | "test" | "review";

export interface PlanTask {
  id: string;
  type: TaskType;
  courseId: CourseId;
  title: string;
  detail: string;
  minutes: number;
  href: string;
  refId?: string;
}

export interface PlanTrack {
  courseId: CourseId;
  phase: Phase;
  title: string;
  subtitle: string;
  tasks: PlanTask[];
  groups: PlanTask[][];
}

export interface PlanWeek {
  index: number;
  start: string;
  end: string;
  phase: Phase;
  title: string;
  tracks: PlanTrack[];
  tasks: PlanTask[];
  minutes: number;
}

export interface StudyPlan {
  start: string;
  end: string;
  weeks: PlanWeek[];
  totalTasks: number;
  totalMinutes: number;
}

export type WeekStatus = "completed" | "in-progress" | "upcoming" | "overdue";

// ---------------------------------------------------------------------------
// Phase allocation
// ---------------------------------------------------------------------------

/**
 * Splits the weeks before an exam into the five phases. Students who report
 * higher confidence get a shorter Learn phase and more applied practice.
 */
export function allocatePhases(total: number, confidence: number): Phase[] {
  if (total <= 0) return [];
  if (total === 1) return ["final"];
  if (total === 2) return ["learn", "final"];
  if (total === 3) return ["learn", "apply", "final"];
  if (total === 4) return ["learn", "practice", "review", "final"];

  const shift = (clamp(confidence, 1, 5) - 3) * 0.04;
  const weights: Record<Phase, number> = {
    learn: 0.48 - shift,
    practice: 0.16 + shift / 2,
    apply: 0.14 + shift / 2,
    review: 0.12,
    final: 0.1,
  };
  const exact = PHASE_ORDER.map((p) => weights[p] * total);
  const counts = exact.map((e) => Math.max(1, Math.floor(e)));
  let sum = counts.reduce((a, b) => a + b, 0);

  while (sum < total) {
    let best = 0;
    for (let i = 1; i < counts.length; i++) if (exact[i] - counts[i] > exact[best] - counts[best]) best = i;
    counts[best]++;
    sum++;
  }
  while (sum > total) {
    let largest = 0;
    for (let i = 1; i < counts.length; i++) if (counts[i] > counts[largest]) largest = i;
    counts[largest]--;
    sum--;
  }
  return PHASE_ORDER.flatMap((p, i) => Array<Phase>(counts[i]).fill(p));
}

function splitEvenly<T>(items: T[], parts: number): T[][] {
  if (parts <= 0) return [];
  const base = Math.floor(items.length / parts);
  const extra = items.length % parts;
  const out: T[][] = [];
  let cursor = 0;
  for (let i = 0; i < parts; i++) {
    const size = base + (i < extra ? 1 : 0);
    out.push(items.slice(cursor, cursor + size));
    cursor += size;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Plan generation
// ---------------------------------------------------------------------------

export function examDateFor(profile: Profile, courseId: CourseId): string {
  return profile.examDates[courseId] ?? getCourse(courseId)?.exam.nextExamDate ?? addDays(profile.planStartDate, 180);
}

function weeksUntilExam(firstWeekStart: string, examDate: string): number {
  return Math.max(1, Math.floor(daysBetween(firstWeekStart, examDate) / 7) + 1);
}

const unitLabel = (units: Unit[]) =>
  units.length === 1
    ? `Unit ${units[0].number}: ${units[0].title}`
    : `Units ${units[0].number}–${units[units.length - 1].number}: ${units.map((u) => u.shortTitle).join(" & ")}`;

function buildTrack(courseId: CourseId, profile: Profile, firstWeek: string): PlanTrack[] {
  const course = getCourse(courseId)!;
  const total = weeksUntilExam(firstWeek, examDateFor(profile, courseId));
  const phases = allocatePhases(total, profile.confidence);
  const units = unitsForCourse(courseId);
  const lessons = lessonsForCourse(courseId);
  const courseFrqs = FRQS.filter((f) => f.courseId === courseId);
  const weekBudget = (profile.minutesPerDay * 6) / Math.max(1, profile.courses.length);
  const short = courseId === "usgov" ? "us" : "cg";
  const sprint = `${courseId}-sprint`;
  const fullTest = `${courseId}-full-1`;

  const learnWeeks = phases.filter((p) => p === "learn").length;
  const chunks = splitEvenly(lessons, learnWeeks);
  const unitWeekCount = new Map<string, number>();
  for (const chunk of chunks) for (const uid of new Set(chunk.map((l) => l.unitId))) unitWeekCount.set(uid, (unitWeekCount.get(uid) ?? 0) + 1);

  const seenUnits = new Set<string>();
  const unitPartCounter = new Map<string, number>();
  const usedFrqs = new Set<string>();
  let frqCycle = 0;
  let countryCycle = 0;
  let lastUnits: Unit[] = [units[0]];
  const phaseOrdinal: Record<Phase, number> = { learn: 0, practice: 0, apply: 0, review: 0, final: 0 };
  const phaseTotals = PHASE_ORDER.reduce((acc, p) => ({ ...acc, [p]: phases.filter((x) => x === p).length }), {} as Record<Phase, number>);

  const pickFrq = (preferUnits: string[]): Frq => {
    const matched = courseFrqs.find((f) => !usedFrqs.has(f.id) && f.unitIds.some((u) => preferUnits.includes(u)));
    const next = matched ?? courseFrqs.find((f) => !usedFrqs.has(f.id)) ?? courseFrqs[frqCycle++ % courseFrqs.length];
    usedFrqs.add(next.id);
    if (usedFrqs.size >= courseFrqs.length) usedFrqs.clear();
    return next;
  };

  const frqTask = (i: number, frq: Frq, label = "FRQ practice", timed = false): PlanTask => ({
    id: `${courseId}-w${i}-frq-${frq.id}`,
    type: "frq",
    courseId,
    title: `${label}: ${FRQ_TYPES[frq.type].name}`,
    detail: frq.title,
    minutes: frq.suggestedMinutes,
    href: `/frq/${frq.id}${timed ? "?timed=1&" : "?"}task=${courseId}-w${i}-frq-${frq.id}`,
    refId: frq.id,
  });

  const practiceHref = (params: Record<string, string | number>, taskId: string) => {
    const qs = new URLSearchParams({ course: courseId, ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])), task: taskId });
    return `/practice/session?${qs.toString()}`;
  };

  return phases.map((phase, i): PlanTrack => {
    const ordinal = phaseOrdinal[phase]++;
    const groups: PlanTask[][] = [];
    let title = "";
    let subtitle = "";

    if (phase === "learn") {
      const chunk: Lesson[] = chunks[ordinal] ?? [];
      const weekUnits = chunk.length ? units.filter((u) => chunk.some((l) => l.unitId === u.id)) : lastUnits;
      lastUnits = weekUnits;
      title = unitLabel(weekUnits);

      if (chunk.length === 0) {
        subtitle = "Unit review";
        const id = `${courseId}-w${i}-unit-review`;
        groups.push([
          {
            id,
            type: "practice",
            courseId,
            title: `Unit review: 20 MCQs`,
            detail: weekUnits.map((u) => u.shortTitle).join(", "),
            minutes: 20,
            href: practiceHref({ unit: weekUnits.map((u) => u.id).join(","), count: 20 }, id),
          },
        ]);
      } else {
        const parts = weekUnits.map((u) => {
          const n = (unitPartCounter.get(u.id) ?? 0) + 1;
          unitPartCounter.set(u.id, n);
          const of = unitWeekCount.get(u.id) ?? 1;
          return of > 1 ? `Part ${n} of ${of}` : null;
        });
        subtitle = [`${chunk.length} ${chunk.length === 1 ? "lesson" : "lessons"}`, parts.find(Boolean)].filter(Boolean).join(" · ");

        for (const lesson of chunk) {
          const practiceId = `${courseId}-practice-${lesson.id}`;
          groups.push([
            {
              id: `${courseId}-lesson-${lesson.id}`,
              type: "lesson",
              courseId,
              title: lesson.title,
              detail: `Lesson · ${lesson.minutes} min`,
              minutes: lesson.minutes,
              href: `/lessons/${lesson.id}`,
              refId: lesson.id,
            },
            {
              id: practiceId,
              type: "practice",
              courseId,
              title: `10 MCQs: ${lesson.title.split(":")[0]}`,
              detail: "Topic practice",
              minutes: 10,
              href: practiceHref({ topic: lesson.id, count: 10 }, practiceId),
              refId: lesson.id,
            },
          ]);
        }
      }

      const newUnits = weekUnits.filter((u) => !seenUnits.has(u.id)).map((u) => u.id);
      const extras: PlanTask[] = [];

      if (courseId === "usgov") {
        const cases = CASES.filter((c) => c.required && newUnits.includes(c.unitId));
        if (cases.length) {
          const id = `usgov-cases-${newUnits.join("-")}`;
          extras.push({
            id,
            type: "cases",
            courseId,
            title: "Supreme Court cases",
            detail: cases.map((c) => c.shortName).join(", "),
            minutes: Math.min(20, 5 + cases.length * 2),
            href: `/cases?unit=${newUnits[0]}&task=${id}`,
          });
        }
        const docs = DOCUMENTS.filter((d) => newUnits.includes(d.unitIds[0]));
        if (docs.length) {
          const id = `usgov-docs-${newUnits.join("-")}`;
          extras.push({
            id,
            type: "documents",
            courseId,
            title: "Foundational documents",
            detail: docs.map((d) => d.shortTitle).join(", "),
            minutes: Math.min(25, 5 + docs.length * 3),
            href: `/documents?unit=${newUnits[0]}&task=${id}`,
          });
        }
      } else {
        const country = COUNTRIES[countryCycle++ % COUNTRIES.length];
        const id = `compgov-w${i}-country-${country.id}`;
        extras.push({
          id,
          type: "country",
          courseId,
          title: `Country focus: ${country.name}`,
          detail: country.regimeLabel,
          minutes: 15,
          href: `/countries/${country.id}?task=${id}`,
          refId: country.id,
        });
      }
      newUnits.forEach((u) => seenUnits.add(u));

      const fcId = `${courseId}-w${i}-flashcards`;
      extras.push({
        id: fcId,
        type: "flashcards",
        courseId,
        title: "Flashcard review",
        detail: weekUnits.map((u) => u.shortTitle).join(", "),
        minutes: 10,
        href: `/flashcards/study?course=${courseId}&unit=${weekUnits.map((u) => u.id).join(",")}&task=${fcId}`,
      });

      if (weekBudget >= 150 || ordinal % 2 === 1) extras.push(frqTask(i, pickFrq(weekUnits.map((u) => u.id))));
      groups.push(extras);
    }

    if (phase === "practice") {
      const a = units[(2 * ordinal) % units.length];
      const b = units[(2 * ordinal + 1) % units.length];
      title = `Mixed Practice: Units ${a.number} & ${b.number}`;
      subtitle = `${a.shortTitle} · ${b.shortTitle}`;
      const mixedId = `${courseId}-w${i}-mixed`;
      const vocabId = `${courseId}-w${i}-vocab`;
      const missedId = `${courseId}-w${i}-missed`;
      const count = weekBudget >= 150 ? 25 : 20;
      groups.push(
        [
          { id: mixedId, type: "practice", courseId, title: `${count} mixed MCQs`, detail: `Units ${a.number} & ${b.number}`, minutes: count, href: practiceHref({ unit: `${a.id},${b.id}`, count }, mixedId) },
          { id: vocabId, type: "flashcards", courseId, title: "Vocabulary flashcards", detail: "Spaced-repetition review", minutes: 15, href: `/flashcards/study?course=${courseId}&deck=vocabulary&task=${vocabId}` },
        ],
        [
          frqTask(i, pickFrq([a.id, b.id])),
          { id: missedId, type: "practice", courseId, title: "Redo missed questions", detail: "Questions you answered incorrectly", minutes: 10, href: practiceHref({ mode: "missed", count: 10 }, missedId) },
        ],
      );
    }

    if (phase === "apply") {
      title = "AP-Style Timed Practice";
      subtitle = "Build pacing under exam conditions";
      if (ordinal === 0) {
        const id = `${courseId}-w${i}-sprint`;
        groups.push([{ id, type: "test", courseId, title: "Timed MCQ Sprint", detail: "27 questions at official pace", minutes: courseId === "usgov" ? 40 : 30, href: `/practice-tests/${sprint}?task=${id}`, refId: sprint }]);
      } else {
        const id = `${courseId}-w${i}-timed-set`;
        groups.push([{ id, type: "practice", courseId, title: "Timed set: 20 MCQs", detail: "All units · countdown timer", minutes: 25, href: practiceHref({ count: 20, timed: courseId === "usgov" ? 29 : 22 }, id) }]);
      }
      const hardId = `${courseId}-w${i}-hard-cards`;
      groups.push([
        frqTask(i, pickFrq([]), "Timed FRQ", true),
        { id: hardId, type: "flashcards", courseId, title: "Hard flashcards", detail: "Cards you marked Hard or Again", minutes: 10, href: `/flashcards/study?course=${courseId}&mode=hard&task=${hardId}` },
      ]);
    }

    if (phase === "review") {
      title = "Targeted Review";
      subtitle = "Focus on your lowest-mastery topics";
      const reviewId = `${courseId}-w${i}-targeted`;
      const missedId = `${courseId}-w${i}-missed`;
      const dueId = `${courseId}-w${i}-due-cards`;
      groups.push(
        [
          { id: reviewId, type: "review", courseId, title: "Targeted review session", detail: "Based on your mastery scores", minutes: 30, href: `/review?course=${courseId}&task=${reviewId}` },
          { id: missedId, type: "practice", courseId, title: "Redo missed questions", detail: "15 questions", minutes: 15, href: practiceHref({ mode: "missed", count: 15 }, missedId) },
        ],
        [
          frqTask(i, pickFrq([]), "FRQ rewrite"),
          { id: dueId, type: "flashcards", courseId, title: "Due flashcards", detail: "Spaced repetition", minutes: 15, href: `/flashcards/study?course=${courseId}&mode=due&task=${dueId}` },
        ],
      );
    }

    if (phase === "final") {
      const isLast = ordinal === phaseTotals.final - 1;
      title = isLast && phaseTotals.final > 1 ? "Exam Week" : "Full-Length Exam & Final Review";
      subtitle = isLast ? `${course.shortTitle} exam ${examDateFor(profile, courseId)}` : "Simulate test day, then close gaps";
      if (ordinal === 0) {
        const id = `${courseId}-w${i}-full-test`;
        const reportId = `${courseId}-w${i}-report`;
        groups.push([
          { id, type: "test", courseId, title: "Full-length practice exam", detail: "Timed, both sections", minutes: courseId === "usgov" ? 180 : 150, href: `/practice-tests/${fullTest}?task=${id}`, refId: fullTest },
          { id: reportId, type: "review", courseId, title: "Review your score report", detail: "Missed questions and unit breakdown", minutes: 20, href: `/practice-tests?course=${courseId}&task=${reportId}` },
        ]);
      } else if (!isLast) {
        const id = `${courseId}-w${i}-sprint-2`;
        groups.push([{ id, type: "test", courseId, title: "Second timed MCQ Sprint", detail: "Check your pacing", minutes: courseId === "usgov" ? 40 : 30, href: `/practice-tests/${sprint}?task=${id}`, refId: sprint }]);
      }
      const reviewId = `${courseId}-w${i}-final-review`;
      const cardsId = `${courseId}-w${i}-final-cards`;
      groups.push([
        { id: reviewId, type: "review", courseId, title: isLast ? "Light targeted review" : "Targeted review", detail: "Your top recommendations", minutes: isLast ? 15 : 30, href: `/review?course=${courseId}&task=${reviewId}` },
        { id: cardsId, type: "flashcards", courseId, title: isLast ? "Final flashcard sweep" : "Due flashcards", detail: "Cases, documents, and vocabulary", minutes: 15, href: `/flashcards/study?course=${courseId}&mode=due&task=${cardsId}` },
      ]);
    }

    return { courseId, phase, title, subtitle, groups, tasks: groups.flat() };
  });
}

export function generateStudyPlan(profile: Profile): StudyPlan {
  const start = startOfWeek(profile.planStartDate);
  const courses = profile.courses.length ? profile.courses : (["usgov"] as CourseId[]);
  const tracks = new Map(courses.map((c) => [c, buildTrack(c, profile, start)]));
  const weekCount = Math.max(...[...tracks.values()].map((t) => t.length));

  const weeks: PlanWeek[] = Array.from({ length: weekCount }, (_, index) => {
    const weekTracks = courses.map((c) => tracks.get(c)![index]).filter((t): t is PlanTrack => !!t);
    // Interleave task groups across courses so daily plans mix both courses.
    const maxGroups = Math.max(...weekTracks.map((t) => t.groups.length));
    const tasks: PlanTask[] = [];
    for (let g = 0; g < maxGroups; g++) for (const t of weekTracks) if (t.groups[g]) tasks.push(...t.groups[g]);
    const weekStart = addDays(start, index * 7);
    return {
      index,
      start: weekStart,
      end: addDays(weekStart, 6),
      phase: weekTracks[0].phase,
      title: weekTracks[0].title,
      tracks: weekTracks,
      tasks,
      minutes: tasks.reduce((s, t) => s + t.minutes, 0),
    };
  });

  return {
    start,
    end: weeks.length ? weeks[weeks.length - 1].end : start,
    weeks,
    totalTasks: weeks.reduce((s, w) => s + w.tasks.length, 0),
    totalMinutes: weeks.reduce((s, w) => s + w.minutes, 0),
  };
}

// ---------------------------------------------------------------------------
// Status
// ---------------------------------------------------------------------------

export function taskCompletedAt(task: PlanTask, progress: UserProgress): string | undefined {
  if (task.type === "lesson" && task.refId) return progress.lessons[task.refId]?.completedAt;
  return progress.completedTasks[task.id];
}

export const isTaskComplete = (task: PlanTask, progress: UserProgress) => !!taskCompletedAt(task, progress);

export function weekStatus(week: PlanWeek, progress: UserProgress, today: string): WeekStatus {
  const done = week.tasks.every((t) => isTaskComplete(t, progress));
  if (done) return "completed";
  if (today >= week.start && today <= week.end) return "in-progress";
  if (today > week.end) return "overdue";
  return "upcoming";
}

export function currentWeekIndex(plan: StudyPlan, today: string): number {
  if (!plan.weeks.length) return 0;
  const idx = Math.floor(daysBetween(plan.start, today) / 7);
  return clamp(idx, 0, plan.weeks.length - 1);
}

export function planCompletion(plan: StudyPlan, progress: UserProgress, throughWeek?: number) {
  const weeks = throughWeek === undefined ? plan.weeks : plan.weeks.slice(0, throughWeek + 1);
  const tasks = weeks.flatMap((w) => w.tasks);
  const done = tasks.filter((t) => isTaskComplete(t, progress)).length;
  return { done, total: tasks.length, percent: tasks.length ? Math.round((done / tasks.length) * 100) : 0 };
}

export function findTask(plan: StudyPlan, taskId: string): PlanTask | undefined {
  for (const w of plan.weeks) for (const t of w.tasks) if (t.id === taskId) return t;
  return undefined;
}

// ---------------------------------------------------------------------------
// Today's plan
// ---------------------------------------------------------------------------

export interface DailyItem {
  task: PlanTask;
  done: boolean;
  overdue: boolean;
}

/**
 * Builds today's study list. Tasks finished today stay visible (checked) so
 * the list is stable through the day; remaining budget is filled with the
 * oldest unfinished work first — one overdue task, then this week's tasks in
 * order, then next week's.
 */
export function buildDailyPlan(plan: StudyPlan, progress: UserProgress, today: string, dueCards: number): DailyItem[] {
  const budget = progress.profile.minutesPerDay;
  const current = currentWeekIndex(plan, today);
  const items: DailyItem[] = [];
  const included = new Set<string>();

  const allTasks = plan.weeks.flatMap((w) => w.tasks.map((task) => ({ task, week: w.index })));
  for (const { task } of allTasks) {
    const at = taskCompletedAt(task, progress);
    if (at && isoToDateKey(at) === today) {
      items.push({ task, done: true, overdue: false });
      included.add(task.id);
    }
  }

  const dailyCardsId = `daily-flashcards-${today}`;
  if (progress.completedTasks[dailyCardsId] && isoToDateKey(progress.completedTasks[dailyCardsId]) === today) {
    items.push({ task: dailyCardsTask(dailyCardsId, dueCards), done: true, overdue: false });
    included.add(dailyCardsId);
  }

  let used = items.reduce((s, i) => s + i.task.minutes, 0);
  const pending = allTasks.filter(({ task }) => !included.has(task.id) && !isTaskComplete(task, progress));
  const overdue = pending.filter((p) => p.week < current).slice(0, 1);
  const thisWeek = pending.filter((p) => p.week === current);
  const nextWeek = pending.filter((p) => p.week === current + 1);

  for (const { task, week } of [...overdue, ...thisWeek, ...nextWeek]) {
    if (used >= budget * 0.9) break;
    const fits = used + task.minutes <= budget * 1.3;
    if (!fits && items.some((i) => !i.done)) continue;
    items.push({ task, done: false, overdue: week < current });
    used += task.minutes;
  }

  if (dueCards > 0 && !included.has(dailyCardsId) && used < budget) {
    items.push({ task: dailyCardsTask(dailyCardsId, dueCards), done: false, overdue: false });
  }
  return items;
}

function dailyCardsTask(id: string, due: number): PlanTask {
  return {
    id,
    type: "flashcards",
    courseId: "usgov",
    title: due > 0 ? `Review ${due} due flashcards` : "Flashcard review",
    detail: "Spaced repetition",
    minutes: Math.max(5, Math.min(15, Math.ceil(due * 0.4))),
    href: `/flashcards/study?mode=due&task=${id}`,
  };
}
