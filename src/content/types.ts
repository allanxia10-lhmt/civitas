/**
 * Content model for Civitas.
 *
 * All course content (lessons, questions, cases, documents, countries, FRQs)
 * lives in typed modules under src/content. Pages never hardcode content —
 * they look it up through src/content/index.ts. User data (progress, attempts,
 * flashcard scheduling) is a separate model in src/lib/progress-types.ts.
 */

export type CourseId = "usgov" | "compgov";
export type Difficulty = "easy" | "medium" | "hard";

/**
 * Where a piece of content comes from. The UI labels content by source so
 * students can tell official AP requirements from explanations and from
 * practice items written for this site.
 */
export type ContentSource = "official" | "explanation" | "practice";

// ---------------------------------------------------------------------------
// Courses, units, topics, lessons
// ---------------------------------------------------------------------------

export interface ExamSection {
  name: string;
  detail: string;
  minutes: number;
  weight: string;
}

export interface Course {
  id: CourseId;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  /** Official framework metadata — update when College Board revises the CED. */
  framework: {
    name: string;
    schoolYear: string;
    verifiedOn: string;
    sourceUrl: string;
    notes: string[];
  };
  exam: {
    /** Official date for the next administration, if published. */
    nextExamDate?: string;
    nextExamLabel?: string;
    digital: boolean;
    sections: ExamSection[];
    frqTypes: FrqType[];
  };
  unitIds: string[];
}

export interface Unit {
  id: string;
  courseId: CourseId;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  /** Official exam weighting range from the CED, e.g. "15%–22%". */
  examWeight: string;
  /** Midpoint of the weighting range, used to weight mastery and tests. */
  weightMidpoint: number;
  lessonIds: string[];
}

export interface KeyConcept {
  term: string;
  definition: string;
}

export interface LessonSection {
  heading: string;
  /** Paragraphs separated by blank lines. `**bold**` is supported. */
  body: string;
}

export interface Lesson {
  id: string;
  courseId: CourseId;
  unitId: string;
  title: string;
  minutes: number;
  tags: string[];
  overview: string;
  keyConcepts: KeyConcept[];
  deepDive: LessonSection[];
  example: LessonSection;
  examConnection: { body: string; tip: string };
  commonMistakes: { mistake: string; correction: string }[];
  relatedCaseIds?: string[];
  relatedDocumentIds?: string[];
  relatedCountryIds?: CountryId[];
}

/** A topic is the addressable unit of mastery. Each topic has exactly one lesson. */
export type Topic = Pick<Lesson, "id" | "courseId" | "unitId" | "title" | "tags">;

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export type ChoiceId = "A" | "B" | "C" | "D";

export interface AnswerChoice {
  id: ChoiceId;
  text: string;
  /** Why this choice is right or wrong. */
  rationale: string;
}

export type Stimulus =
  | { kind: "text"; title?: string; text: string; source?: string }
  | {
      kind: "table";
      title: string;
      headers: string[];
      rows: string[][];
      source?: string;
      note?: string;
    }
  | {
      kind: "bar";
      title: string;
      unit: string;
      series: { label: string; value: number }[];
      source?: string;
      note?: string;
    };

export interface Question {
  id: string;
  courseId: CourseId;
  unitId: string;
  topicId: string;
  difficulty: Difficulty;
  /** The concept being tested, shown after answering. */
  concept: string;
  stimulus?: Stimulus;
  stem: string;
  choices: AnswerChoice[];
  answer: ChoiceId;
  explanation: string;
  /** Cross-links used by case/document pages to pull related practice. */
  caseIds?: string[];
  documentIds?: string[];
  countryIds?: CountryId[];
}

// ---------------------------------------------------------------------------
// Free response
// ---------------------------------------------------------------------------

export type FrqType =
  | "concept-application"
  | "quantitative-analysis"
  | "scotus-comparison"
  | "argument-essay"
  | "comp-concept-application"
  | "comp-quantitative-analysis"
  | "comparative-analysis"
  | "comp-argument-essay";

export interface RubricCriterion {
  id: string;
  description: string;
  points: number;
  /**
   * Keyword groups for the automated estimate. The criterion is flagged as
   * "likely met" when every group has at least one match. This is a study aid
   * only — students confirm each criterion themselves.
   */
  signals?: string[][];
  minWords?: number;
}

export interface FrqPart {
  label: string;
  prompt: string;
  criteria: RubricCriterion[];
  modelAnswer: string;
}

export interface Frq {
  id: string;
  courseId: CourseId;
  type: FrqType;
  title: string;
  unitIds: string[];
  suggestedMinutes: number;
  intro: string;
  stimulus?: Stimulus;
  parts: FrqPart[];
  scoringNotes: string[];
}

// ---------------------------------------------------------------------------
// Supreme Court cases & foundational documents
// ---------------------------------------------------------------------------

export type CaseCluster =
  | "federalism"
  | "judicial-power"
  | "speech-press"
  | "religion"
  | "accused"
  | "incorporation"
  | "privacy"
  | "equal-protection"
  | "elections";

export interface SupremeCourtCase {
  id: string;
  name: string;
  shortName: string;
  year: number;
  /** True for the cases required by the current AP U.S. Gov CED. */
  required: boolean;
  requiredNote?: string;
  vote?: string;
  amendments: string[];
  topics: string[];
  unitId: string;
  cluster: CaseCluster;
  issue: string;
  background: string;
  decision: string;
  principle: string;
  apRelevance: string;
  related: { id: string; relation: string }[];
}

export interface FoundationalDocument {
  id: string;
  title: string;
  shortTitle: string;
  author: string;
  year: string;
  /** The school year the document became required, if recently added. */
  addedIn?: string;
  unitIds: string[];
  whatYouNeedToKnow: string[];
  context: string;
  mainArgument: string;
  keyIdeas: string[];
  quotes: { text: string; note: string }[];
  apRelevance: string;
  relatedConcepts: string[];
  relatedLessonIds: string[];
  relatedDocumentIds: string[];
}

// ---------------------------------------------------------------------------
// Comparative countries
// ---------------------------------------------------------------------------

export type CountryId = "uk" | "mexico" | "nigeria" | "russia" | "china" | "iran";

export type CountrySectionKey =
  | "structure"
  | "executive"
  | "legislature"
  | "judiciary"
  | "parties"
  | "electoral"
  | "participation"
  | "culture"
  | "economy"
  | "civil-society";

export type CompareDimension =
  | "regime"
  | "system"
  | "executive"
  | "legislature"
  | "electoral"
  | "parties"
  | "judiciary"
  | "liberties"
  | "participation"
  | "economy"
  | "territorial";

export interface CountrySection {
  key: CountrySectionKey;
  title: string;
  body: string;
  bullets?: string[];
}

export interface Country {
  id: CountryId;
  name: string;
  officialName: string;
  code: string;
  regimeLabel: string;
  summary: string;
  /** ISO date the profile was last reviewed. Shown on the page. */
  lastUpdated: string;
  keyFacts: { label: string; value: string; timeSensitive?: boolean }[];
  sections: CountrySection[];
  currentIssues: { title: string; body: string }[];
  /**
   * Structured values for the comparison tool. `tag` is a short category
   * used to detect similarities; `text` is the explanation.
   */
  compare: Record<CompareDimension, { tag: string; text: string }>;
}

// ---------------------------------------------------------------------------
// Flashcards
// ---------------------------------------------------------------------------

export type DeckId =
  | "vocabulary"
  | "scotus"
  | "documents"
  | "concepts"
  | "countries"
  | "institutions"
  | "custom";

export interface Flashcard {
  id: string;
  courseId: CourseId;
  deck: DeckId;
  front: string;
  back: string;
  unitId?: string;
  tags?: string[];
}

// ---------------------------------------------------------------------------
// Practice tests
// ---------------------------------------------------------------------------

export interface PracticeTest {
  id: string;
  courseId: CourseId;
  title: string;
  kind: "full" | "diagnostic" | "sprint";
  description: string;
  mcqIds: string[];
  mcqMinutes: number;
  frqIds: string[];
  frqMinutes: number;
}
