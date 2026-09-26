import type { ChoiceId, CourseId, Flashcard, FrqType } from "@/content/types";

/**
 * User data model. Everything a student does is recorded here; dashboards,
 * mastery, streaks, XP, and recommendations are all *derived* from it rather
 * than stored, so they can never drift out of sync.
 *
 * The same shape maps onto the Supabase tables in supabase/schema.sql.
 */

export type Grade = "again" | "hard" | "easy";

export interface Profile {
  name: string;
  courses: CourseId[];
  /** Target exam date per course, as YYYY-MM-DD. */
  examDates: Partial<Record<CourseId, string>>;
  minutesPerDay: number;
  /** Self-reported confidence, 1–5. Shapes how long the Learn phase lasts. */
  confidence: number;
  /** The day the study plan starts (plans are built in Monday-start weeks). */
  planStartDate: string;
  weeklyGoalMinutes: number;
  onboarded: boolean;
  isDemo: boolean;
  createdAt: string;
}

export interface LessonProgress {
  startedAt?: string;
  completedAt?: string;
}

export type AttemptSource = "practice" | "quick-check" | "test" | "review";

export interface QuestionAttempt {
  id: string;
  questionId: string;
  courseId: CourseId;
  unitId: string;
  topicId: string;
  selected: ChoiceId;
  correct: boolean;
  seconds: number;
  source: AttemptSource;
  /** ISO timestamp */
  at: string;
}

export interface FlashcardState {
  ease: number;
  /** Days until the next review. */
  interval: number;
  reps: number;
  lapses: number;
  reviews: number;
  /** YYYY-MM-DD */
  due: string;
  lastGrade?: Grade;
  lastReviewed?: string;
}

export interface CustomFlashcard extends Flashcard {
  createdAt: string;
}

export interface FrqSubmission {
  id: string;
  frqId: string;
  courseId: CourseId;
  type: FrqType;
  responses: string[];
  criteriaMet: string[];
  earned: number;
  possible: number;
  seconds: number;
  submittedAt: string;
}

export interface TestAttempt {
  id: string;
  testId: string;
  courseId: CourseId;
  mode: "timed" | "untimed";
  section: "full" | "mcq" | "frq";
  answers: Record<string, ChoiceId | null>;
  flagged: string[];
  frqResponses: Record<string, string[]>;
  correct: number;
  total: number;
  seconds: number;
  startedAt: string;
  completedAt: string;
}

export type SessionActivity = "lesson" | "practice" | "flashcards" | "frq" | "test" | "reading";

export interface StudySession {
  id: string;
  /** YYYY-MM-DD (local) */
  date: string;
  minutes: number;
  activity: SessionActivity;
  refId?: string;
  at: string;
}

export interface UserProgress {
  version: 1;
  profile: Profile;
  lessons: Record<string, LessonProgress>;
  attempts: QuestionAttempt[];
  flashcards: Record<string, FlashcardState>;
  customFlashcards: CustomFlashcard[];
  frqSubmissions: FrqSubmission[];
  testAttempts: TestAttempt[];
  sessions: StudySession[];
  /** Plan task id → ISO completion time (lesson tasks complete via `lessons`). */
  completedTasks: Record<string, string>;
  /** Achievement ids the student has already been notified about. */
  seenAchievements: string[];
  /** Content id → ISO time last opened (cases, documents, countries). */
  lastViewed: Record<string, string>;
}
