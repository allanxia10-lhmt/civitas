import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CustomFlashcard,
  FlashcardState,
  FrqSubmission,
  QuestionAttempt,
  StudySession,
  TestAttempt,
  UserProgress,
} from "../progress-types";
import type { ProgressRepository } from "./types";

/**
 * Supabase-backed repository. Maps UserProgress onto the normalized tables in
 * supabase/schema.sql. Saves are incremental: it diffs against the last
 * synced snapshot and only upserts rows that changed. Row Level Security
 * ensures each user can only read and write their own rows.
 */
export class SupabaseProgressRepository implements ProgressRepository {
  readonly kind = "supabase" as const;
  private last: UserProgress | null = null;

  constructor(
    private readonly db: SupabaseClient,
    private readonly userId: string,
  ) {}

  async load(): Promise<UserProgress | null> {
    const uid = this.userId;
    const [profile, lessons, attempts, cards, custom, frqs, tests, sessions, tasks, meta] = await Promise.all([
      this.db.from("profiles").select("*").eq("id", uid).maybeSingle(),
      this.db.from("lesson_progress").select("*").eq("user_id", uid),
      this.db.from("question_attempts").select("*").eq("user_id", uid).order("attempted_at"),
      this.db.from("flashcard_states").select("*").eq("user_id", uid),
      this.db.from("custom_flashcards").select("*").eq("user_id", uid),
      this.db.from("frq_submissions").select("*").eq("user_id", uid).order("submitted_at"),
      this.db.from("test_attempts").select("*").eq("user_id", uid).order("completed_at"),
      this.db.from("study_sessions").select("*").eq("user_id", uid).order("created_at"),
      this.db.from("completed_tasks").select("*").eq("user_id", uid),
      this.db.from("user_meta").select("*").eq("user_id", uid).maybeSingle(),
    ]);
    if (profile.error) throw profile.error;
    if (!profile.data) return null;
    const p = profile.data;

    const progress: UserProgress = {
      version: 1,
      profile: {
        name: p.name,
        courses: p.courses,
        examDates: p.exam_dates ?? {},
        minutesPerDay: p.minutes_per_day,
        confidence: p.confidence,
        planStartDate: p.plan_start_date,
        weeklyGoalMinutes: p.weekly_goal_minutes,
        onboarded: p.onboarded,
        isDemo: false,
        createdAt: p.created_at,
      },
      lessons: Object.fromEntries((lessons.data ?? []).map((r) => [r.lesson_id, { startedAt: r.started_at ?? undefined, completedAt: r.completed_at ?? undefined }])),
      attempts: (attempts.data ?? []).map(
        (r): QuestionAttempt => ({
          id: r.id,
          questionId: r.question_id,
          courseId: r.course_id,
          unitId: r.unit_id,
          topicId: r.topic_id,
          selected: r.selected,
          correct: r.correct,
          seconds: r.seconds,
          source: r.source,
          at: r.attempted_at,
        }),
      ),
      flashcards: Object.fromEntries(
        (cards.data ?? []).map((r): [string, FlashcardState] => [
          r.card_id,
          {
            ease: r.ease,
            interval: r.interval_days,
            reps: r.reps,
            lapses: r.lapses,
            reviews: r.reviews,
            due: r.due,
            lastGrade: r.last_grade ?? undefined,
            lastReviewed: r.last_reviewed ?? undefined,
          },
        ]),
      ),
      customFlashcards: (custom.data ?? []).map(
        (r): CustomFlashcard => ({ id: r.id, courseId: r.course_id, deck: "custom", front: r.front, back: r.back, unitId: r.unit_id ?? undefined, createdAt: r.created_at }),
      ),
      frqSubmissions: (frqs.data ?? []).map(
        (r): FrqSubmission => ({
          id: r.id,
          frqId: r.frq_id,
          courseId: r.course_id,
          type: r.frq_type,
          responses: r.responses,
          criteriaMet: r.criteria_met,
          earned: r.earned,
          possible: r.possible,
          seconds: r.seconds,
          submittedAt: r.submitted_at,
        }),
      ),
      testAttempts: (tests.data ?? []).map(
        (r): TestAttempt => ({
          id: r.id,
          testId: r.test_id,
          courseId: r.course_id,
          mode: r.mode,
          section: r.section,
          answers: r.answers,
          flagged: r.flagged,
          frqResponses: r.frq_responses ?? {},
          correct: r.correct,
          total: r.total,
          seconds: r.seconds,
          startedAt: r.started_at,
          completedAt: r.completed_at,
        }),
      ),
      sessions: (sessions.data ?? []).map(
        (r): StudySession => ({ id: r.id, date: r.date, minutes: r.minutes, activity: r.activity, refId: r.ref_id ?? undefined, at: r.created_at }),
      ),
      completedTasks: Object.fromEntries((tasks.data ?? []).map((r) => [r.task_id, r.completed_at])),
      seenAchievements: meta.data?.seen_achievements ?? [],
      lastViewed: meta.data?.last_viewed ?? {},
    };
    this.last = progress;
    return progress;
  }

  async save(next: UserProgress): Promise<void> {
    const prev = this.last;
    const uid = this.userId;
    const ops: PromiseLike<{ error: unknown }>[] = [];
    const changed = <T>(a: T | undefined, b: T) => JSON.stringify(a) !== JSON.stringify(b);

    if (!prev || changed(prev.profile, next.profile)) {
      const p = next.profile;
      ops.push(
        this.db.from("profiles").upsert({
          id: uid,
          name: p.name,
          courses: p.courses,
          exam_dates: p.examDates,
          minutes_per_day: p.minutesPerDay,
          confidence: p.confidence,
          plan_start_date: p.planStartDate,
          weekly_goal_minutes: p.weeklyGoalMinutes,
          onboarded: p.onboarded,
          updated_at: new Date().toISOString(),
        }),
      );
    }

    const lessonRows = Object.entries(next.lessons)
      .filter(([id, l]) => !prev || changed(prev.lessons[id], l))
      .map(([lesson_id, l]) => ({ user_id: uid, lesson_id, started_at: l.startedAt ?? null, completed_at: l.completedAt ?? null }));
    if (lessonRows.length) ops.push(this.db.from("lesson_progress").upsert(lessonRows));

    const seen = <T extends { id: string }>(list: T[] | undefined) => new Set((list ?? []).map((x) => x.id));
    const newAttempts = next.attempts.filter((a) => !seen(prev?.attempts).has(a.id));
    if (newAttempts.length) {
      ops.push(
        this.db.from("question_attempts").insert(
          newAttempts.map((a) => ({
            id: a.id,
            user_id: uid,
            question_id: a.questionId,
            course_id: a.courseId,
            unit_id: a.unitId,
            topic_id: a.topicId,
            selected: a.selected,
            correct: a.correct,
            seconds: a.seconds,
            source: a.source,
            attempted_at: a.at,
          })),
        ),
      );
    }

    const cardRows = Object.entries(next.flashcards)
      .filter(([id, s]) => !prev || changed(prev.flashcards[id], s))
      .map(([card_id, s]) => ({
        user_id: uid,
        card_id,
        ease: s.ease,
        interval_days: s.interval,
        reps: s.reps,
        lapses: s.lapses,
        reviews: s.reviews,
        due: s.due,
        last_grade: s.lastGrade ?? null,
        last_reviewed: s.lastReviewed ?? null,
      }));
    if (cardRows.length) ops.push(this.db.from("flashcard_states").upsert(cardRows));

    const nextCustom = seen(next.customFlashcards);
    const addedCustom = next.customFlashcards.filter((c) => !seen(prev?.customFlashcards).has(c.id));
    const removedCustom = (prev?.customFlashcards ?? []).filter((c) => !nextCustom.has(c.id)).map((c) => c.id);
    if (addedCustom.length) {
      ops.push(
        this.db.from("custom_flashcards").insert(
          addedCustom.map((c) => ({ id: c.id, user_id: uid, course_id: c.courseId, front: c.front, back: c.back, unit_id: c.unitId ?? null, created_at: c.createdAt })),
        ),
      );
    }
    if (removedCustom.length) ops.push(this.db.from("custom_flashcards").delete().in("id", removedCustom).eq("user_id", uid));

    const newFrqs = next.frqSubmissions.filter((f) => !seen(prev?.frqSubmissions).has(f.id));
    if (newFrqs.length) {
      ops.push(
        this.db.from("frq_submissions").insert(
          newFrqs.map((f) => ({
            id: f.id,
            user_id: uid,
            frq_id: f.frqId,
            course_id: f.courseId,
            frq_type: f.type,
            responses: f.responses,
            criteria_met: f.criteriaMet,
            earned: f.earned,
            possible: f.possible,
            seconds: f.seconds,
            submitted_at: f.submittedAt,
          })),
        ),
      );
    }

    const newTests = next.testAttempts.filter((t) => !seen(prev?.testAttempts).has(t.id));
    if (newTests.length) {
      ops.push(
        this.db.from("test_attempts").insert(
          newTests.map((t) => ({
            id: t.id,
            user_id: uid,
            test_id: t.testId,
            course_id: t.courseId,
            mode: t.mode,
            section: t.section,
            answers: t.answers,
            flagged: t.flagged,
            frq_responses: t.frqResponses,
            correct: t.correct,
            total: t.total,
            seconds: t.seconds,
            started_at: t.startedAt,
            completed_at: t.completedAt,
          })),
        ),
      );
    }

    const newSessions = next.sessions.filter((s) => !seen(prev?.sessions).has(s.id));
    if (newSessions.length) {
      ops.push(
        this.db.from("study_sessions").insert(
          newSessions.map((s) => ({ id: s.id, user_id: uid, date: s.date, minutes: s.minutes, activity: s.activity, ref_id: s.refId ?? null, created_at: s.at })),
        ),
      );
    }

    const taskRows = Object.entries(next.completedTasks)
      .filter(([id]) => !prev || !(id in prev.completedTasks))
      .map(([task_id, completed_at]) => ({ user_id: uid, task_id, completed_at }));
    if (taskRows.length) ops.push(this.db.from("completed_tasks").upsert(taskRows));
    const removedTasks = Object.keys(prev?.completedTasks ?? {}).filter((id) => !(id in next.completedTasks));
    if (removedTasks.length) ops.push(this.db.from("completed_tasks").delete().in("task_id", removedTasks).eq("user_id", uid));

    if (!prev || changed(prev.seenAchievements, next.seenAchievements) || changed(prev.lastViewed, next.lastViewed)) {
      ops.push(this.db.from("user_meta").upsert({ user_id: uid, seen_achievements: next.seenAchievements, last_viewed: next.lastViewed }));
    }

    const results = await Promise.all(ops);
    const failed = results.find((r) => r.error);
    if (failed) throw failed.error;
    this.last = next;
  }

  async clear(): Promise<void> {
    const uid = this.userId;
    const tables = [
      "lesson_progress",
      "question_attempts",
      "flashcard_states",
      "custom_flashcards",
      "frq_submissions",
      "test_attempts",
      "study_sessions",
      "completed_tasks",
      "user_meta",
    ];
    await Promise.all(tables.map((t) => this.db.from(t).delete().eq("user_id", uid)));
    await this.db.from("profiles").delete().eq("id", uid);
    this.last = null;
  }
}
