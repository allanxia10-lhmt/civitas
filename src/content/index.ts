/**
 * Single entry point for all course content. Pages and libraries import from
 * here rather than from individual content files, so content can be moved
 * (for example, into a CMS or database) without touching the UI.
 */
import { CASES, CASE_CLUSTERS } from "./cases";
import { COMPARE_DIMENSIONS, COUNTRIES, COUNTRY_IDS } from "./countries";
import { COURSES, UNITS } from "./courses";
import { DOCUMENTS } from "./documents";
import { DECKS, FLASHCARDS } from "./flashcards";
import { FRQS, FRQ_TYPES } from "./frqs";
import { LESSONS } from "./lessons";
import { PRACTICE_TESTS } from "./practice-tests";
import { QUESTIONS } from "./questions";
import type { CourseId, CountryId, Lesson, Topic } from "./types";

export * from "./types";
export {
  CASES,
  CASE_CLUSTERS,
  COMPARE_DIMENSIONS,
  COUNTRIES,
  COUNTRY_IDS,
  COURSES,
  DECKS,
  DOCUMENTS,
  FLASHCARDS,
  FRQS,
  FRQ_TYPES,
  LESSONS,
  PRACTICE_TESTS,
  QUESTIONS,
  UNITS,
};

/** Version stamp for content, shown in Settings. Bump when content changes. */
export const CONTENT_VERSION = "2026.09.23";

const byId = <T extends { id: string }>(items: T[]) => new Map(items.map((i) => [i.id, i]));

const courseMap = byId(COURSES);
const unitMap = byId(UNITS);
const lessonMap = byId(LESSONS);
const questionMap = byId(QUESTIONS);
const caseMap = byId(CASES);
const documentMap = byId(DOCUMENTS);
const countryMap = byId(COUNTRIES);
const frqMap = byId(FRQS);
const testMap = byId(PRACTICE_TESTS);

export const getCourse = (id: string) => courseMap.get(id as CourseId);
export const getUnit = (id: string) => unitMap.get(id);
export const getLesson = (id: string) => lessonMap.get(id);
export const getQuestion = (id: string) => questionMap.get(id);
export const getCase = (id: string) => caseMap.get(id);
export const getDocument = (id: string) => documentMap.get(id);
export const getCountry = (id: string) => countryMap.get(id as CountryId);
export const getFrq = (id: string) => frqMap.get(id);
export const getPracticeTest = (id: string) => testMap.get(id);

export const unitsForCourse = (courseId: CourseId) => UNITS.filter((u) => u.courseId === courseId);

/** Lessons in curriculum order (unit order, then lesson order within a unit). */
export const lessonsForCourse = (courseId: CourseId): Lesson[] =>
  unitsForCourse(courseId).flatMap((u) => u.lessonIds.map((id) => lessonMap.get(id)!).filter(Boolean));

export const lessonsForUnit = (unitId: string): Lesson[] =>
  (unitMap.get(unitId)?.lessonIds ?? []).map((id) => lessonMap.get(id)!).filter(Boolean);

export const topics: Topic[] = LESSONS.map(({ id, courseId, unitId, title, tags }) => ({ id, courseId, unitId, title, tags }));

export const questionsForTopic = (topicId: string) => QUESTIONS.filter((q) => q.topicId === topicId);
export const questionsForUnit = (unitId: string) => QUESTIONS.filter((q) => q.unitId === unitId);
export const questionsForCourse = (courseId: CourseId) => QUESTIONS.filter((q) => q.courseId === courseId);
export const questionsForCase = (caseId: string) => QUESTIONS.filter((q) => q.caseIds?.includes(caseId));
export const questionsForDocument = (docId: string) => QUESTIONS.filter((q) => q.documentIds?.includes(docId));
export const questionsForCountry = (countryId: CountryId) => QUESTIONS.filter((q) => q.countryIds?.includes(countryId));

export const frqsForCourse = (courseId: CourseId) => FRQS.filter((f) => f.courseId === courseId);

export const courseColor = (courseId: CourseId) => (courseId === "usgov" ? "usgov" : "compgov");

/** Consistency checks, run in development to catch broken cross-references. */
export function validateContent(): string[] {
  const problems: string[] = [];
  for (const u of UNITS) for (const id of u.lessonIds) if (!lessonMap.has(id)) problems.push(`Unit ${u.id} lists missing lesson ${id}`);
  for (const q of QUESTIONS) {
    if (!lessonMap.has(q.topicId)) problems.push(`Question ${q.id} has unknown topic ${q.topicId}`);
    if (!unitMap.has(q.unitId)) problems.push(`Question ${q.id} has unknown unit ${q.unitId}`);
    for (const c of q.caseIds ?? []) if (!caseMap.has(c)) problems.push(`Question ${q.id} references unknown case ${c}`);
    for (const d of q.documentIds ?? []) if (!documentMap.has(d)) problems.push(`Question ${q.id} references unknown document ${d}`);
  }
  for (const l of LESSONS) {
    for (const c of l.relatedCaseIds ?? []) if (!caseMap.has(c)) problems.push(`Lesson ${l.id} references unknown case ${c}`);
    for (const d of l.relatedDocumentIds ?? []) if (!documentMap.has(d)) problems.push(`Lesson ${l.id} references unknown document ${d}`);
  }
  for (const c of CASES) for (const r of c.related) if (!caseMap.has(r.id)) problems.push(`Case ${c.id} references unknown case ${r.id}`);
  for (const d of DOCUMENTS) {
    for (const l of d.relatedLessonIds) if (!lessonMap.has(l)) problems.push(`Document ${d.id} references unknown lesson ${l}`);
    for (const r of d.relatedDocumentIds) if (!documentMap.has(r)) problems.push(`Document ${d.id} references unknown document ${r}`);
  }
  const ids = new Set<string>();
  for (const q of QUESTIONS) {
    if (ids.has(q.id)) problems.push(`Duplicate question id ${q.id}`);
    ids.add(q.id);
  }
  return problems;
}
