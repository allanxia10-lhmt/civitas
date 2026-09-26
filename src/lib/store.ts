"use client";

import { toast } from "sonner";
import { create } from "zustand";
import type { CourseId, Flashcard } from "@/content/types";
import { evaluateAchievements } from "./achievements";
import { createDemoProgress, createEmptyProgress } from "./demo-seed";
import { computeMastery } from "./mastery";
import { LocalProgressRepository } from "./persistence/local";
import { SupabaseProgressRepository } from "./persistence/supabase";
import type { ProgressRepository } from "./persistence/types";
import type {
  FrqSubmission,
  Grade,
  Profile,
  QuestionAttempt,
  SessionActivity,
  TestAttempt,
  UserProgress,
} from "./progress-types";
import { schedule } from "./srs";
import { getSupabase } from "./supabase/client";
import { toDateKey, uid } from "./utils";

export interface OnboardingInput {
  name: string;
  courses: CourseId[];
  examDates: Partial<Record<CourseId, string>>;
  minutesPerDay: number;
  confidence: number;
}

interface StoreState {
  hydrated: boolean;
  progress: UserProgress;
  backend: "local" | "supabase";
  user: { id: string; email?: string } | null;

  init: () => Promise<void>;
  completeOnboarding: (input: OnboardingInput) => void;
  loadDemo: () => void;
  resetProgress: () => Promise<void>;
  updateProfile: (patch: Partial<Profile>) => void;
  importProgress: (data: UserProgress) => void;

  startLesson: (lessonId: string) => void;
  completeLesson: (lessonId: string, minutes: number) => void;
  recordAttempt: (attempt: Omit<QuestionAttempt, "id" | "at">) => void;
  reviewFlashcard: (cardId: string, grade: Grade) => void;
  addCustomFlashcard: (card: Omit<Flashcard, "id" | "deck">) => void;
  deleteCustomFlashcard: (id: string) => void;
  submitFrq: (submission: Omit<FrqSubmission, "id" | "submittedAt">) => string;
  saveTestAttempt: (attempt: Omit<TestAttempt, "id">) => string;
  logStudy: (minutes: number, activity: SessionActivity, refId?: string) => void;
  completeTask: (taskId: string) => void;
  uncompleteTask: (taskId: string) => void;
  markViewed: (contentId: string) => void;
}

let repository: ProgressRepository = new LocalProgressRepository();
let saveTimer: ReturnType<typeof setTimeout> | null = null;

function persist(progress: UserProgress) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    repository.save(progress).catch((err) => {
      console.error("Failed to save progress", err);
      toast.error("Couldn't sync your progress. It's saved on this device and will retry.");
    });
  }, 300);
}

/** Announces newly unlocked achievements once, then records them as seen. */
function withAchievementCheck(progress: UserProgress): UserProgress {
  const today = toDateKey();
  const mastery = computeMastery(progress, today);
  const unlocked = evaluateAchievements({ progress, mastery, today }).filter((a) => a.unlocked);
  const fresh = unlocked.filter((a) => !progress.seenAchievements.includes(a.achievement.id));
  if (!fresh.length) return progress;
  for (const a of fresh) toast.success(`Achievement unlocked: ${a.achievement.title}`, { description: a.achievement.description });
  return { ...progress, seenAchievements: [...progress.seenAchievements, ...fresh.map((a) => a.achievement.id)] };
}

function seenAll(progress: UserProgress): UserProgress {
  const today = toDateKey();
  const mastery = computeMastery(progress, today);
  const unlocked = evaluateAchievements({ progress, mastery, today }).filter((a) => a.unlocked).map((a) => a.achievement.id);
  return { ...progress, seenAchievements: unlocked };
}

function sessionFor(minutes: number, activity: SessionActivity, refId?: string) {
  const now = new Date();
  return { id: uid("s"), date: toDateKey(now), minutes: Math.max(1, Math.round(minutes)), activity, refId, at: now.toISOString() };
}

export const useStore = create<StoreState>((set, get) => {
  /** Apply a change, check achievements, and persist. */
  const commit = (fn: (p: UserProgress) => UserProgress, checkAchievements = true) => {
    const next = fn(get().progress);
    const final = checkAchievements ? withAchievementCheck(next) : next;
    set({ progress: final });
    persist(final);
  };

  return {
    hydrated: false,
    progress: createEmptyProgress({
      name: "",
      courses: [],
      examDates: {},
      minutesPerDay: 30,
      confidence: 3,
      planStartDate: toDateKey(),
      weeklyGoalMinutes: 150,
      onboarded: false,
      isDemo: false,
      createdAt: new Date().toISOString(),
    }),
    backend: "local",
    user: null,

    init: async () => {
      if (get().hydrated) return;
      const supabase = getSupabase();
      let user: StoreState["user"] = null;
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          user = { id: data.session.user.id, email: data.session.user.email };
          repository = new SupabaseProgressRepository(supabase, user.id);
        }
      }

      let progress: UserProgress | null = null;
      try {
        progress = await repository.load();
      } catch (err) {
        console.error("Failed to load progress; falling back to this device", err);
        repository = new LocalProgressRepository();
        progress = await repository.load();
      }

      if (!progress && repository.kind === "supabase") {
        // New account: carry over this device's real progress if there is any;
        // otherwise send the student through onboarding.
        const local = await new LocalProgressRepository().load();
        if (local && !local.profile.isDemo) {
          progress = local;
          persist(progress);
        } else {
          const demo = seenAll(createDemoProgress());
          progress = { ...demo, profile: { ...demo.profile, onboarded: false } };
        }
      }
      if (!progress) {
        // First visit: start with the demo student so every page is populated.
        // Onboarding replaces this with the student's own plan.
        progress = seenAll(createDemoProgress());
        persist(progress);
      }
      set({ progress, hydrated: true, backend: repository.kind, user });
    },

    completeOnboarding: (input) => {
      const today = toDateKey();
      const progress = createEmptyProgress({
        name: input.name.trim() || "Student",
        courses: input.courses,
        examDates: input.examDates,
        minutesPerDay: input.minutesPerDay,
        confidence: input.confidence,
        planStartDate: today,
        weeklyGoalMinutes: input.minutesPerDay * 5,
        onboarded: true,
        isDemo: false,
        createdAt: new Date().toISOString(),
      });
      set({ progress });
      persist(progress);
    },

    loadDemo: () => {
      const progress = seenAll(createDemoProgress());
      set({ progress });
      persist(progress);
    },

    resetProgress: async () => {
      await repository.clear();
      const progress = seenAll(createDemoProgress());
      set({ progress: { ...progress, profile: { ...progress.profile, onboarded: false } } });
    },

    updateProfile: (patch) => commit((p) => ({ ...p, profile: { ...p.profile, ...patch } }), false),

    importProgress: (data) => {
      if (data?.version !== 1 || !data.profile) throw new Error("This file isn't a Civitas progress export.");
      set({ progress: data });
      persist(data);
    },

    startLesson: (lessonId) => {
      if (get().progress.lessons[lessonId]?.startedAt) return;
      commit((p) => ({ ...p, lessons: { ...p.lessons, [lessonId]: { ...p.lessons[lessonId], startedAt: new Date().toISOString() } } }), false);
    },

    completeLesson: (lessonId, minutes) => {
      if (get().progress.lessons[lessonId]?.completedAt) return;
      const now = new Date().toISOString();
      commit((p) => ({
        ...p,
        lessons: { ...p.lessons, [lessonId]: { startedAt: p.lessons[lessonId]?.startedAt ?? now, completedAt: now } },
        sessions: [...p.sessions, sessionFor(minutes, "lesson", lessonId)],
      }));
    },

    recordAttempt: (attempt) =>
      commit((p) => ({
        ...p,
        attempts: [...p.attempts, { ...attempt, id: uid("a"), at: new Date().toISOString() }],
      })),

    reviewFlashcard: (cardId, grade) =>
      commit((p) => ({
        ...p,
        flashcards: { ...p.flashcards, [cardId]: schedule(p.flashcards[cardId], grade, toDateKey(), new Date().toISOString()) },
      })),

    addCustomFlashcard: (card) => {
      commit(
        (p) => ({
          ...p,
          customFlashcards: [...p.customFlashcards, { ...card, id: uid("custom"), deck: "custom", createdAt: new Date().toISOString() }],
        }),
        false,
      );
      toast.success("Flashcard created");
    },

    deleteCustomFlashcard: (id) =>
      commit((p) => {
        const { [id]: _removed, ...flashcards } = p.flashcards;
        void _removed;
        return { ...p, customFlashcards: p.customFlashcards.filter((c) => c.id !== id), flashcards };
      }, false),

    submitFrq: (submission) => {
      const id = uid("frq");
      commit((p) => ({
        ...p,
        frqSubmissions: [...p.frqSubmissions, { ...submission, id, submittedAt: new Date().toISOString() }],
        sessions: [...p.sessions, sessionFor(submission.seconds / 60, "frq", submission.frqId)],
      }));
      return id;
    },

    saveTestAttempt: (attempt) => {
      const id = uid("test");
      commit((p) => ({
        ...p,
        testAttempts: [...p.testAttempts, { ...attempt, id }],
        sessions: [...p.sessions, sessionFor(attempt.seconds / 60, "test", attempt.testId)],
      }));
      return id;
    },

    logStudy: (minutes, activity, refId) => {
      if (minutes <= 0) return;
      commit((p) => ({ ...p, sessions: [...p.sessions, sessionFor(minutes, activity, refId)] }));
    },

    completeTask: (taskId) => {
      if (get().progress.completedTasks[taskId]) return;
      commit((p) => ({ ...p, completedTasks: { ...p.completedTasks, [taskId]: new Date().toISOString() } }));
    },

    uncompleteTask: (taskId) =>
      commit((p) => {
        const { [taskId]: _removed, ...rest } = p.completedTasks;
        void _removed;
        return { ...p, completedTasks: rest };
      }, false),

    markViewed: (contentId) =>
      commit((p) => ({ ...p, lastViewed: { ...p.lastViewed, [contentId]: new Date().toISOString() } }), false),
  };
});
