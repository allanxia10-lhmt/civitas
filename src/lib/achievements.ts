import { CASES, UNITS } from "@/content";
import { courseMastery, type TopicMastery } from "./mastery";
import type { UserProgress } from "./progress-types";
import { flashcardReviews, lessonsCompleted, streak } from "./stats";

export type AchievementIcon = "flame" | "trophy" | "book" | "scale" | "globe" | "pen" | "clipboard" | "layers" | "target" | "sparkles";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: AchievementIcon;
  /** Returns progress toward the goal as [current, goal]. */
  progress: (ctx: AchievementContext) => [number, number];
}

export interface AchievementContext {
  progress: UserProgress;
  mastery: Map<string, TopicMastery>;
  today: string;
}

const requiredCaseIds = CASES.filter((c) => c.required).map((c) => `fc-us-scotus-${c.id}`);

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-lesson",
    title: "First Steps",
    description: "Complete your first lesson.",
    icon: "sparkles",
    progress: ({ progress }) => [Math.min(1, lessonsCompleted(progress)), 1],
  },
  {
    id: "streak-7",
    title: "7-Day Streak",
    description: "Study seven days in a row.",
    icon: "flame",
    progress: ({ progress, today }) => [Math.min(7, streak(progress, today).longest), 7],
  },
  {
    id: "questions-100",
    title: "First 100 Questions",
    description: "Answer 100 practice questions.",
    icon: "trophy",
    progress: ({ progress }) => [Math.min(100, progress.attempts.length), 100],
  },
  {
    id: "unit-complete",
    title: "Complete Your First Unit",
    description: "Finish every lesson in any unit.",
    icon: "book",
    progress: ({ progress }) => {
      const best = Math.max(
        ...UNITS.map((u) => u.lessonIds.filter((id) => progress.lessons[id]?.completedAt).length / u.lessonIds.length),
      );
      return [Math.round(best * 100), 100];
    },
  },
  {
    id: "frq-5",
    title: "FRQ Finisher",
    description: "Submit five free-response answers.",
    icon: "pen",
    progress: ({ progress }) => [Math.min(5, progress.frqSubmissions.length), 5],
  },
  {
    id: "test-taker",
    title: "Test Taker",
    description: "Complete a practice test.",
    icon: "clipboard",
    progress: ({ progress }) => [Math.min(1, progress.testAttempts.length), 1],
  },
  {
    id: "cards-250",
    title: "Flashcard Regular",
    description: "Complete 250 flashcard reviews.",
    icon: "layers",
    progress: ({ progress }) => [Math.min(250, flashcardReviews(progress)), 250],
  },
  {
    id: "streak-30",
    title: "30-Day Streak",
    description: "Study thirty days in a row.",
    icon: "flame",
    progress: ({ progress, today }) => [Math.min(30, streak(progress, today).longest), 30],
  },
  {
    id: "questions-500",
    title: "500 Questions",
    description: "Answer 500 practice questions.",
    icon: "target",
    progress: ({ progress }) => [Math.min(500, progress.attempts.length), 500],
  },
  {
    id: "scotus-master",
    title: "Supreme Court Master",
    description: "Review all 14 required cases in flashcards without a miss on your latest review.",
    icon: "scale",
    progress: ({ progress }) => [
      requiredCaseIds.filter((id) => {
        const s = progress.flashcards[id];
        return s && s.lastGrade && s.lastGrade !== "again";
      }).length,
      requiredCaseIds.length,
    ],
  },
  {
    id: "usgov-master",
    title: "U.S. Government Master",
    description: "Reach 80% course mastery in AP U.S. Government.",
    icon: "book",
    progress: ({ mastery }) => [Math.min(80, courseMastery(mastery, "usgov")), 80],
  },
  {
    id: "compgov-master",
    title: "Comparative Government Master",
    description: "Reach 80% course mastery in AP Comparative Government.",
    icon: "globe",
    progress: ({ mastery }) => [Math.min(80, courseMastery(mastery, "compgov")), 80],
  },
];

export function evaluateAchievements(ctx: AchievementContext) {
  return ACHIEVEMENTS.map((a) => {
    const [current, goal] = a.progress(ctx);
    return { achievement: a, current, goal, unlocked: current >= goal };
  });
}
