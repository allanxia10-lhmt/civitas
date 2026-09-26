import { FRQS } from "./frqs";
import { QUESTIONS } from "./questions";
import { UNITS } from "./courses";
import type { CourseId, PracticeTest, Question } from "./types";

/** Small deterministic PRNG so test forms are stable across builds. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], seed: number): T[] {
  const rand = seeded(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Picks `count` questions for a course, allocating by the midpoint of each
 * unit's official exam weighting, then orders them by unit like a real form.
 */
function buildForm(courseId: CourseId, count: number, seed: number): string[] {
  const units = UNITS.filter((u) => u.courseId === courseId);
  const totalWeight = units.reduce((sum, u) => sum + u.weightMidpoint, 0);
  const pools = new Map<string, Question[]>(
    units.map((u) => [u.id, shuffle(QUESTIONS.filter((q) => q.unitId === u.id), seed + u.number)]),
  );

  // Largest-remainder allocation, capped by available questions.
  const raw = units.map((u) => ({ id: u.id, exact: (u.weightMidpoint / totalWeight) * count }));
  const alloc = new Map(raw.map((r) => [r.id, Math.min(Math.floor(r.exact), pools.get(r.id)!.length)]));
  let remaining = count - [...alloc.values()].reduce((a, b) => a + b, 0);
  const byRemainder = [...raw].sort((a, b) => (b.exact % 1) - (a.exact % 1));
  while (remaining > 0) {
    let placed = false;
    for (const r of byRemainder) {
      if (remaining === 0) break;
      if (alloc.get(r.id)! < pools.get(r.id)!.length) {
        alloc.set(r.id, alloc.get(r.id)! + 1);
        remaining--;
        placed = true;
      }
    }
    if (!placed) break;
  }

  return units.flatMap((u) => pools.get(u.id)!.slice(0, alloc.get(u.id)).map((q) => q.id));
}

const frqIdsFor = (courseId: CourseId) => {
  const seen = new Set<string>();
  return FRQS.filter((f) => f.courseId === courseId && !seen.has(f.type) && seen.add(f.type)).map((f) => f.id);
};

export const PRACTICE_TESTS: PracticeTest[] = [
  {
    id: "usgov-full-1",
    courseId: "usgov",
    title: "AP U.S. Gov Full-Length Practice Exam 1",
    kind: "full",
    description: "Mirrors the official structure: 55 multiple-choice questions in 80 minutes, then 4 free-response questions in 100 minutes.",
    mcqIds: buildForm("usgov", 55, 11),
    mcqMinutes: 80,
    frqIds: frqIdsFor("usgov"),
    frqMinutes: 100,
  },
  {
    id: "usgov-diagnostic",
    courseId: "usgov",
    title: "AP U.S. Gov Diagnostic",
    kind: "diagnostic",
    description: "20 questions across all five units to find your starting point.",
    mcqIds: buildForm("usgov", 20, 3),
    mcqMinutes: 29,
    frqIds: [],
    frqMinutes: 0,
  },
  {
    id: "usgov-sprint",
    courseId: "usgov",
    title: "AP U.S. Gov MCQ Sprint",
    kind: "sprint",
    description: "A half-length multiple-choice section: 27 questions in 40 minutes — the official pace.",
    mcqIds: buildForm("usgov", 27, 29),
    mcqMinutes: 40,
    frqIds: [],
    frqMinutes: 0,
  },
  {
    id: "compgov-full-1",
    courseId: "compgov",
    title: "AP Comp Gov Full-Length Practice Exam 1",
    kind: "full",
    description: "Mirrors the official structure: 55 multiple-choice questions in 60 minutes, then 4 free-response questions in 90 minutes.",
    mcqIds: buildForm("compgov", 55, 17),
    mcqMinutes: 60,
    frqIds: frqIdsFor("compgov"),
    frqMinutes: 90,
  },
  {
    id: "compgov-diagnostic",
    courseId: "compgov",
    title: "AP Comp Gov Diagnostic",
    kind: "diagnostic",
    description: "20 questions across all five units to find your starting point.",
    mcqIds: buildForm("compgov", 20, 5),
    mcqMinutes: 22,
    frqIds: [],
    frqMinutes: 0,
  },
  {
    id: "compgov-sprint",
    courseId: "compgov",
    title: "AP Comp Gov MCQ Sprint",
    kind: "sprint",
    description: "A half-length multiple-choice section: 27 questions in 30 minutes — the official pace.",
    mcqIds: buildForm("compgov", 27, 31),
    mcqMinutes: 30,
    frqIds: [],
    frqMinutes: 0,
  },
];
