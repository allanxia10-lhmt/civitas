import { COURSES, FLASHCARDS, LESSONS, PRACTICE_TESTS, getFrq, getLesson, getQuestion, questionsForTopic, questionsForUnit } from "@/content";
import type { ChoiceId, CourseId } from "@/content/types";
import type { FlashcardState, FrqSubmission, QuestionAttempt, StudySession, TestAttempt, UserProgress } from "./progress-types";
import { generateStudyPlan, type PlanTask } from "./study-plan";
import { addDays, daysBetween, parseDateKey, seededRandom, startOfWeek, toDateKey } from "./utils";

/**
 * Seeded demo student ("Allan"). Built relative to *today* so the dashboard
 * always looks like a student seven weeks into a year-long plan:
 *   ~42% of lessons complete · 73% question accuracy · 8-day streak ·
 *   weak spots in recent topics · flashcards due · two diagnostics taken.
 */
export function createDemoProgress(today: string = toDateKey()): UserProgress {
  const rand = seededRandom(20260923);
  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

  const planStartDate = addDays(startOfWeek(today), -49);
  const profile = {
    name: "Allan",
    courses: ["usgov", "compgov"] as CourseId[],
    examDates: {
      usgov: COURSES[0].exam.nextExamDate,
      compgov: COURSES[1].exam.nextExamDate,
    },
    minutesPerDay: 45,
    confidence: 3,
    planStartDate,
    weeklyGoalMinutes: 225,
    onboarded: true,
    isDemo: true,
    createdAt: `${planStartDate}T15:00:00.000Z`,
  };

  const plan = generateStudyPlan(profile);
  const currentWeek = Math.min(plan.weeks.length - 1, Math.floor(daysBetween(plan.start, today) / 7));

  // ---- Study days: an 8-day streak ending yesterday, a gap before it,
  // and roughly five days a week before that.
  const streakDays = new Set(Array.from({ length: 8 }, (_, i) => addDays(today, -(i + 1))));
  const studyDays: string[] = [];
  for (let d = plan.start; d < today; d = addDays(d, 1)) {
    if (streakDays.has(d)) studyDays.push(d);
    else if (d < addDays(today, -9) && rand() < 0.72) studyDays.push(d);
  }
  const studyDayIn = (start: string, end: string, index: number) => {
    const inWeek = studyDays.filter((d) => d >= start && d <= end);
    return inWeek.length ? inWeek[index % inWeek.length] : addDays(start, index % 5);
  };
  const stamp = (day: string, hour = 16, minute = 30) => {
    const date = parseDateKey(day);
    date.setHours(hour, minute + Math.floor(rand() * 40), Math.floor(rand() * 59));
    return date.toISOString();
  };

  // ---- Plan tasks: past weeks complete except two overdue items last week;
  // this week, the first few tasks are done on earlier days.
  const lessons: UserProgress["lessons"] = {};
  const completedTasks: Record<string, string> = {};
  const doneTasks: { task: PlanTask; day: string }[] = [];

  plan.weeks.slice(0, currentWeek + 1).forEach((week) => {
    const isCurrent = week.index === currentWeek;
    const isLast = week.index === currentWeek - 1;
    const earlierDays = studyDays.filter((d) => d >= week.start && d < today);
    const limit = isCurrent ? Math.min(week.tasks.length, earlierDays.length * 2) : isLast ? week.tasks.length - 2 : week.tasks.length;
    week.tasks.slice(0, limit).forEach((task, i) => {
      const day = isCurrent ? earlierDays[Math.floor(i / 2)] ?? earlierDays[0] : studyDayIn(week.start, week.end, Math.floor(i / 2));
      if (!day || day >= today) return;
      doneTasks.push({ task, day });
    });
  });

  // Nudge lesson completion to ~42% of the course total.
  const totalLessons = LESSONS.filter((l) => profile.courses.includes(l.courseId)).length;
  const target = Math.round(totalLessons * 0.42);
  let lessonCount = doneTasks.filter((d) => d.task.type === "lesson").length;
  const future = plan.weeks.slice(currentWeek).flatMap((w) => w.tasks.filter((t) => t.type === "lesson"));
  for (const task of future) {
    if (lessonCount >= target) break;
    if (doneTasks.some((d) => d.task.id === task.id)) continue;
    doneTasks.push({ task, day: addDays(today, -1) });
    lessonCount++;
  }
  while (lessonCount > target) {
    const idx = doneTasks.map((d) => d.task.type).lastIndexOf("lesson");
    if (idx < 0) break;
    const [removed] = doneTasks.splice(idx, 1);
    // Its paired topic practice set shouldn't be done if the lesson isn't.
    const practiceIdx = doneTasks.findIndex((d) => d.task.type === "practice" && d.task.refId === removed.task.refId);
    if (practiceIdx >= 0) doneTasks.splice(practiceIdx, 1);
    lessonCount--;
  }

  for (const { task, day } of doneTasks) {
    if (task.type === "lesson" && task.refId) {
      lessons[task.refId] = { startedAt: stamp(day, 15, 40), completedAt: stamp(day, 16, 5) };
    } else {
      completedTasks[task.id] = stamp(day, 17, 0);
    }
  }
  // A lesson opened but not finished — shows up as "in progress".
  const nextLesson = LESSONS.find((l) => profile.courses.includes(l.courseId) && !lessons[l.id]);
  if (nextLesson) lessons[nextLesson.id] = { startedAt: stamp(addDays(today, -1), 19, 10) };

  // ---- Question attempts. Recent topics include two weak spots so the
  // Smart Review has something specific (and kind) to say.
  const completedLessonDays = doneTasks
    .filter((d) => d.task.type === "lesson")
    .sort((a, b) => (a.day < b.day ? -1 : 1));
  const recentUs = [...completedLessonDays].reverse().find((d) => d.task.courseId === "usgov")?.task.refId;
  const recentComp = [...completedLessonDays].reverse().find((d) => d.task.courseId === "compgov")?.task.refId;
  const olderWeak = completedLessonDays.find((d) => d.task.courseId === "usgov" && d.task.refId !== recentUs && completedLessonDays.indexOf(d) >= 3)?.task.refId;
  const weakRecent = new Set([recentUs, recentComp].filter(Boolean) as string[]);

  const attempts: QuestionAttempt[] = [];
  let attemptSeq = 0;
  const addAttempt = (questionId: string, day: string, correct: boolean, source: QuestionAttempt["source"], hour = 17) => {
    const q = getQuestion(questionId)!;
    const wrong = q.choices.filter((c) => c.id !== q.answer);
    attempts.push({
      id: `demo-a${++attemptSeq}`,
      questionId,
      courseId: q.courseId,
      unitId: q.unitId,
      topicId: q.topicId,
      selected: correct ? q.answer : pick(wrong).id,
      correct,
      seconds: 40 + Math.floor(rand() * 70),
      source,
      at: stamp(day, hour),
    });
  };

  for (const { task, day } of doneTasks) {
    if (task.type !== "practice" || !task.refId) continue;
    const topic = task.refId;
    const lesson = getLesson(topic)!;
    const pool = [...questionsForTopic(topic), ...questionsForUnit(lesson.unitId).filter((q) => q.topicId !== topic)];
    const set = pool.slice(0, 3).concat(Array.from({ length: 5 }, () => pick(pool.slice(3))));
    const p = weakRecent.has(topic) ? 0.38 : topic === olderWeak ? 0.5 : 0.8;
    // Weak recent topics: practice happened within the last week.
    const when = weakRecent.has(topic) ? addDays(today, -1 - Math.floor(rand() * 4)) : day;
    set.forEach((q) => addAttempt(q.id, when, rand() < p, "practice"));
  }

  // Quick checks in completed lessons.
  for (const [lessonId, lp] of Object.entries(lessons)) {
    if (!lp.completedAt) continue;
    const day = toDateKey(new Date(lp.completedAt));
    const p = weakRecent.has(lessonId) ? 0.45 : 0.82;
    questionsForTopic(lessonId)
      .slice(0, 3)
      .forEach((q) => addAttempt(q.id, day, rand() < p, "quick-check", 16));
  }

  // ---- Two diagnostics, taken in weeks 1 and 2.
  const testAttempts: TestAttempt[] = [];
  (["usgov", "compgov"] as CourseId[]).forEach((courseId, i) => {
    const test = PRACTICE_TESTS.find((t) => t.courseId === courseId && t.kind === "diagnostic")!;
    const day = studyDayIn(addDays(plan.start, 7 * (i + 1)), addDays(plan.start, 7 * (i + 1) + 6), 2);
    const answers: Record<string, ChoiceId | null> = {};
    let correct = 0;
    test.mcqIds.forEach((qid) => {
      const q = getQuestion(qid)!;
      const ok = rand() < (courseId === "usgov" ? 0.66 : 0.6);
      answers[qid] = ok ? q.answer : pick(q.choices.filter((c) => c.id !== q.answer)).id;
      if (ok) correct++;
      addAttempt(qid, day, ok, "test", 18);
    });
    testAttempts.push({
      id: `demo-test-${courseId}`,
      testId: test.id,
      courseId,
      mode: "timed",
      section: "mcq",
      answers,
      flagged: test.mcqIds.slice(3, 5),
      frqResponses: {},
      correct,
      total: test.mcqIds.length,
      seconds: test.mcqMinutes * 60 - 140,
      startedAt: stamp(day, 18, 0),
      completedAt: stamp(day, 18, 40),
    });
  });

  // Calibrate overall accuracy to exactly 73% by adjusting non-weak attempts.
  const targetCorrect = Math.round(attempts.length * 0.73);
  let correctCount = attempts.filter((a) => a.correct).length;
  const adjustable = attempts.filter((a) => !weakRecent.has(a.topicId) && a.source !== "test");
  for (const a of adjustable) {
    if (correctCount === targetCorrect) break;
    const q = getQuestion(a.questionId)!;
    if (correctCount < targetCorrect && !a.correct) {
      a.correct = true;
      a.selected = q.answer;
      correctCount++;
    } else if (correctCount > targetCorrect && a.correct && a.topicId !== olderWeak) {
      a.correct = false;
      a.selected = q.choices.find((c) => c.id !== q.answer)!.id;
      correctCount--;
    }
  }

  // ---- FRQs: steady on concept application, still building on quantitative analysis.
  const frqPlan: [string, string[], number][] = [
    ["us-frq-ca-federalism", ["a1", "b1"], 2],
    ["comp-frq-ca-rentier", ["a1", "b1", "d1"], 3],
    ["us-frq-qa-turnout", ["a1", "b1"], 4],
    ["us-frq-ca-filibuster", ["a1", "b1", "c1"], 6],
  ];
  const frqSubmissions: FrqSubmission[] = frqPlan.map(([frqId, met, week], i) => {
    const frq = getFrq(frqId)!;
    const criteria = frq.parts.flatMap((p) => p.criteria);
    const day = studyDayIn(addDays(plan.start, 7 * week), addDays(plan.start, 7 * week + 6), 1);
    return {
      id: `demo-frq-${i}`,
      frqId,
      courseId: frq.courseId,
      type: frq.type,
      responses: frq.parts.map((p, pi) => (met.includes(p.criteria[0].id) ? p.modelAnswer.split(". ").slice(0, 2).join(". ") : pi % 2 ? "The data shows turnout is different between the groups." : "This relates to how the government works.")),
      criteriaMet: met,
      earned: criteria.filter((c) => met.includes(c.id)).reduce((s, c) => s + c.points, 0),
      possible: criteria.reduce((s, c) => s + c.points, 0),
      seconds: frq.suggestedMinutes * 60 + 90,
      submittedAt: stamp(day, 19, 0),
    };
  });

  // ---- Flashcards: cards from studied units have review history; some are due.
  const studiedUnits = new Set(Object.keys(lessons).filter((id) => lessons[id].completedAt).map((id) => getLesson(id)!.unitId));
  const flashcards: Record<string, FlashcardState> = {};
  const candidateCards = FLASHCARDS.filter((c) => c.unitId && studiedUnits.has(c.unitId));
  candidateCards.forEach((card, i) => {
    const roll = rand();
    const lastGrade = roll < 0.62 ? "easy" : roll < 0.86 ? "hard" : "again";
    const reviews = 1 + Math.floor(rand() * 4);
    const isDueNow = i % 4 === 0 || lastGrade === "again";
    const lastReviewedDay = addDays(today, -2 - Math.floor(rand() * 10));
    flashcards[card.id] = {
      ease: lastGrade === "easy" ? 2.6 : lastGrade === "hard" ? 2.2 : 1.9,
      interval: lastGrade === "easy" ? 6 : lastGrade === "hard" ? 2 : 0,
      reps: lastGrade === "again" ? 0 : Math.min(reviews, 3),
      lapses: lastGrade === "again" ? 1 : 0,
      reviews,
      due: isDueNow ? addDays(today, -Math.floor(rand() * 3)) : addDays(today, 1 + Math.floor(rand() * 9)),
      lastGrade,
      lastReviewed: stamp(lastReviewedDay, 20, 0),
    };
  });

  // ---- Study sessions derived from activity, so minutes match what was done.
  const sessions: StudySession[] = [];
  let sessionSeq = 0;
  const addSession = (date: string, minutes: number, activity: StudySession["activity"], refId?: string) =>
    sessions.push({ id: `demo-s${++sessionSeq}`, date, minutes, activity, refId, at: stamp(date, 18) });

  for (const { task, day } of doneTasks) {
    const activity = task.type === "lesson" ? "lesson" : task.type === "practice" ? "practice" : task.type === "flashcards" ? "flashcards" : task.type === "frq" ? "frq" : task.type === "test" ? "test" : "reading";
    addSession(day, task.minutes, activity, task.refId);
  }
  for (const t of testAttempts) addSession(toDateKey(new Date(t.completedAt)), Math.round(t.seconds / 60), "test", t.testId);
  for (const day of studyDays) {
    if (!sessions.some((s) => s.date === day)) addSession(day, 10 + Math.floor(rand() * 15), "flashcards");
  }
  // Recent weak-topic practice sessions.
  for (const a of attempts.filter((x) => weakRecent.has(x.topicId) && x.source === "practice")) {
    const day = toDateKey(new Date(a.at));
    if (!sessions.some((s) => s.date === day && s.refId === a.topicId)) addSession(day, 10, "practice", a.topicId);
  }

  // Recently viewed reference pages.
  const lastViewed: Record<string, string> = {
    "case:mcculloch-v-maryland": stamp(addDays(today, -6), 20),
    "case:marbury-v-madison": stamp(addDays(today, -3), 20),
    "document:federalist-10": stamp(addDays(today, -12), 20),
    "country:uk": stamp(addDays(today, -4), 21),
    "country:mexico": stamp(addDays(today, -2), 21),
  };

  return {
    version: 1,
    profile,
    lessons,
    attempts,
    flashcards,
    customFlashcards: [
      {
        id: "custom-demo-1",
        courseId: "usgov",
        deck: "custom",
        front: "Mnemonic: unique Senate powers",
        back: "\"CTI\" — Confirm appointments, ratify Treaties, try Impeachments.",
        unitId: "usgov-u2",
        createdAt: stamp(addDays(today, -15), 20),
      },
    ],
    frqSubmissions,
    testAttempts,
    sessions,
    completedTasks,
    seenAchievements: [],
    lastViewed,
    savedQuestions: {},
    dismissedMistakes: [],
  };
}

/** Empty progress for a new (non-demo) student. */
export function createEmptyProgress(profile: UserProgress["profile"]): UserProgress {
  return {
    version: 1,
    profile,
    lessons: {},
    attempts: [],
    flashcards: {},
    customFlashcards: [],
    frqSubmissions: [],
    testAttempts: [],
    sessions: [],
    completedTasks: {},
    seenAchievements: [],
    lastViewed: {},
    savedQuestions: {},
    dismissedMistakes: [],
  };
}
