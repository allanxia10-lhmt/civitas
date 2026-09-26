import { COMPARE_DIMENSIONS, COUNTRIES, CASES, getCase, getDocument, getLesson, LESSONS, DOCUMENTS } from "@/content";
import type { ChoiceId, CompareDimension, Difficulty, KeyConcept, Lesson, Question, Stimulus } from "@/content/types";
import { shuffle } from "./utils";

/**
 * Procedural question generator for Endless Practice.
 *
 * Builds new multiple-choice questions from structured course content — key
 * concepts, Supreme Court cases, foundational documents, and the country
 * comparison data — so practice never runs out, even offline. Difficulty
 * comes from how close the distractors are: easy questions draw wrong answers
 * from other units, hard ones from the same lesson, case cluster, or from
 * countries that look similar.
 */

const IDS: ChoiceId[] = ["A", "B", "C", "D"];

interface Option {
  text: string;
  rationale: string;
  correct: boolean;
}

interface Candidate {
  key: string;
  build: (rng: () => number) => Question | null;
}

type Rng = () => number;

let serial = 0;

function assemble(
  lesson: Lesson,
  key: string,
  difficulty: Difficulty,
  concept: string,
  stem: string,
  options: Option[],
  explanation: string,
  rng: Rng,
  stimulus?: Stimulus,
): Question | null {
  const texts = new Set(options.map((o) => o.text.trim().toLowerCase()));
  if (options.length !== 4 || texts.size !== 4 || options.filter((o) => o.correct).length !== 1) return null;
  const ordered = shuffle(options, rng);
  return {
    id: `gen:${key}:${(++serial).toString(36)}${Math.floor(rng() * 1e6).toString(36)}`,
    courseId: lesson.courseId,
    unitId: lesson.unitId,
    topicId: lesson.id,
    difficulty,
    concept,
    stimulus,
    stem,
    choices: ordered.map((o, i) => ({ id: IDS[i], text: o.text, rationale: o.rationale })),
    answer: IDS[ordered.findIndex((o) => o.correct)],
    explanation,
  };
}

/** Picks `n` items not matching `exclude`, trying each pool in order. */
function pickDistinct<T>(pools: T[][], n: number, rng: Rng, keyOf: (t: T) => string, exclude: Set<string>): T[] {
  const out: T[] = [];
  const seen = new Set(exclude);
  for (const pool of pools) {
    for (const item of shuffle(pool, rng)) {
      const k = keyOf(item).trim().toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(item);
      if (out.length === n) return out;
    }
  }
  return out;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Hides a term (and its un-parenthesized form) inside its own definition. */
function maskTerm(text: string, term: string): string {
  const forms = [term, term.replace(/\s*\(.*?\)\s*/g, " ").trim()].filter((f) => f.length > 3);
  return forms.reduce((t, f) => t.replace(new RegExp(escapeRe(f), "gi"), "_____"), text);
}

const COUNTRY_WORDS = [
  "United Kingdom", "Britain", "British", "UK", "Mexico", "Mexican", "Nigeria", "Nigerian",
  "Russia", "Russian", "China", "Chinese", "Iran", "Iranian",
];
const maskCountries = (text: string) =>
  COUNTRY_WORDS.reduce((t, w) => t.replace(new RegExp(`\\b${escapeRe(w)}\\b`, "g"), "this country"), text);

// ---------------------------------------------------------------------------
// Concept pools
// ---------------------------------------------------------------------------

interface ConceptRef extends KeyConcept {
  lesson: Lesson;
}

const conceptsOf = (lessons: Lesson[]): ConceptRef[] => lessons.flatMap((l) => l.keyConcepts.map((k) => ({ ...k, lesson: l })));

function distractorPools(lesson: Lesson, difficulty: Difficulty): ConceptRef[][] {
  const course = LESSONS.filter((l) => l.courseId === lesson.courseId);
  const sameLesson = conceptsOf([lesson]);
  const sameUnit = conceptsOf(course.filter((l) => l.unitId === lesson.unitId && l.id !== lesson.id));
  const otherUnits = conceptsOf(course.filter((l) => l.unitId !== lesson.unitId));
  if (difficulty === "easy") return [otherUnits, sameUnit];
  if (difficulty === "medium") return [sameUnit, otherUnits];
  return [sameLesson, sameUnit, otherUnits];
}

function conceptCandidates(lesson: Lesson, difficulty: Difficulty): Candidate[] {
  const out: Candidate[] = [];
  for (const k of lesson.keyConcepts) {
    const concept = k.term.replace(/\s*\(.*?\)\s*$/, "");
    const explanation = `${k.term}: ${k.definition}`;

    if (difficulty !== "hard") {
      out.push({
        key: `define:${lesson.id}:${k.term}:${difficulty}`,
        build: (rng) => {
          const wrong = pickDistinct(distractorPools(lesson, difficulty), 3, rng, (c) => c.definition, new Set([k.definition.toLowerCase()]));
          return assemble(
            lesson,
            `define:${k.term}`,
            difficulty,
            concept,
            `Which of the following best defines ${k.term}?`,
            [
              { text: k.definition, rationale: `Correct. This is the definition of ${k.term}.`, correct: true },
              ...wrong.map((w) => ({ text: w.definition, rationale: `This describes ${w.term}, not ${k.term}.`, correct: false })),
            ],
            explanation,
            rng,
          );
        },
      });
    }

    out.push({
      key: `name:${lesson.id}:${k.term}:${difficulty}`,
      build: (rng) => {
        const wrong = pickDistinct(distractorPools(lesson, difficulty), 3, rng, (c) => c.term, new Set([k.term.toLowerCase()]));
        return assemble(
          lesson,
          `name:${k.term}`,
          difficulty,
          concept,
          "Which term best matches the description below?",
          [
            { text: k.term, rationale: `Correct. ${k.term}: ${k.definition}`, correct: true },
            ...wrong.map((w) => ({ text: w.term, rationale: `${w.term} means: ${w.definition}`, correct: false })),
          ],
          explanation,
          rng,
          { kind: "text", text: maskTerm(k.definition, k.term) },
        );
      },
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Supreme Court cases (AP U.S. Gov)
// ---------------------------------------------------------------------------

function caseCandidates(lesson: Lesson, difficulty: Difficulty): Candidate[] {
  if (lesson.courseId !== "usgov" || difficulty === "easy") return [];
  const cases = (lesson.relatedCaseIds ?? []).map(getCase).filter((c): c is NonNullable<typeof c> => !!c);
  const out: Candidate[] = [];

  for (const c of cases) {
    const sameCluster = CASES.filter((o) => o.id !== c.id && o.cluster === c.cluster);
    const others = CASES.filter((o) => o.id !== c.id && o.cluster !== c.cluster);
    const pools = difficulty === "hard" ? [sameCluster, others] : [others, sameCluster];

    out.push({
      key: `principle:${c.id}:${difficulty}`,
      build: (rng) => {
        const wrong = pickDistinct(pools, 3, rng, (o) => o.principle, new Set([c.principle.toLowerCase()]));
        return assemble(
          lesson,
          `principle:${c.id}`,
          difficulty,
          c.name,
          `Which of the following best describes the principle established in ${c.name} (${c.year})?`,
          [
            { text: c.principle, rationale: `Correct. ${c.decision}`, correct: true },
            ...wrong.map((o) => ({ text: o.principle, rationale: `This principle comes from ${o.name} (${o.year}).`, correct: false })),
          ],
          `${c.name} (${c.year}): ${c.principle}`,
          rng,
        );
      },
    });

    out.push({
      key: `issue:${c.id}:${difficulty}`,
      build: (rng) => {
        const wrong = pickDistinct(pools, 3, rng, (o) => o.name, new Set([c.name.toLowerCase()]));
        return assemble(
          lesson,
          `issue:${c.id}`,
          difficulty,
          c.name,
          "Which Supreme Court case addressed the constitutional question above?",
          [
            { text: `${c.name} (${c.year})`, rationale: `Correct. ${c.decision}`, correct: true },
            ...wrong.map((o) => ({ text: `${o.name} (${o.year})`, rationale: `${o.shortName} addressed a different question: ${o.issue}`, correct: false })),
          ],
          `${c.name} (${c.year}) asked: ${c.issue} ${c.principle}`,
          rng,
          { kind: "text", title: "Constitutional question", text: c.issue },
        );
      },
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Foundational documents (AP U.S. Gov)
// ---------------------------------------------------------------------------

function documentCandidates(lesson: Lesson, difficulty: Difficulty): Candidate[] {
  if (lesson.courseId !== "usgov" || difficulty === "easy") return [];
  const docs = (lesson.relatedDocumentIds ?? []).map(getDocument).filter((d): d is NonNullable<typeof d> => !!d);
  const out: Candidate[] = [];

  for (const d of docs) {
    const sameUnit = DOCUMENTS.filter((o) => o.id !== d.id && o.unitIds.some((u) => d.unitIds.includes(u)));
    const others = DOCUMENTS.filter((o) => o.id !== d.id && !sameUnit.includes(o));

    if (difficulty === "medium") {
      out.push({
        key: `argument:${d.id}`,
        build: (rng) => {
          const wrong = pickDistinct([others, sameUnit], 3, rng, (o) => o.mainArgument, new Set());
          return assemble(
            lesson,
            `argument:${d.id}`,
            difficulty,
            d.title,
            `Which statement best summarizes the main argument of ${d.title}?`,
            [
              { text: d.mainArgument, rationale: `Correct. ${d.whatYouNeedToKnow[0]}`, correct: true },
              ...wrong.map((o) => ({ text: o.mainArgument, rationale: `This summarizes ${o.title}.`, correct: false })),
            ],
            `${d.title} (${d.year}): ${d.mainArgument}`,
            rng,
          );
        },
      });
    } else {
      d.quotes.forEach((quote, i) =>
        out.push({
          key: `quote:${d.id}:${i}`,
          build: (rng) => {
            const wrong = pickDistinct([sameUnit, others], 3, rng, (o) => o.title, new Set());
            return assemble(
              lesson,
              `quote:${d.id}:${i}`,
              difficulty,
              d.title,
              "The excerpt above comes from which foundational document?",
              [
                { text: d.title, rationale: `Correct. ${quote.note}`, correct: true },
                ...wrong.map((o) => ({ text: o.title, rationale: `${o.shortTitle} argued: ${o.mainArgument}`, correct: false })),
              ],
              `This excerpt is from ${d.title} (${d.author.split(" (")[0]}, ${d.year}). ${quote.note}`,
              rng,
              { kind: "text", text: `“${quote.text}”` },
            );
          },
        }),
      );
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Country comparisons (AP Comp Gov)
// ---------------------------------------------------------------------------

const LESSON_DIMENSIONS: Record<string, CompareDimension[]> = {
  "comp-comparative-method": ["system"],
  "comp-democracy-authoritarianism": ["regime", "liberties"],
  "comp-legitimacy": ["regime"],
  "comp-federal-unitary": ["territorial"],
  "comp-executive-systems": ["system", "executive"],
  "comp-executives": ["executive"],
  "comp-legislatures": ["legislature"],
  "comp-judiciaries": ["judiciary"],
  "comp-participation": ["participation"],
  "comp-civil-liberties-media": ["liberties"],
  "comp-cleavages": ["territorial"],
  "comp-electoral-systems": ["electoral"],
  "comp-party-systems": ["parties"],
  "comp-civil-society": ["participation"],
  "comp-globalization": ["economy"],
  "comp-development": ["economy"],
  "comp-policy-challenges": ["economy"],
};

const dimensionLabel = (d: CompareDimension) => COMPARE_DIMENSIONS.find((x) => x.key === d)!.label;

function countryCandidates(lesson: Lesson, difficulty: Difficulty): Candidate[] {
  if (lesson.courseId !== "compgov" || difficulty === "easy") return [];
  const out: Candidate[] = [];
  for (const dim of LESSON_DIMENSIONS[lesson.id] ?? []) {
    for (const country of COUNTRIES) {
      const value = country.compare[dim];
      const contrast = COUNTRIES.filter((o) => o.id !== country.id && o.compare[dim].tag !== value.tag);
      if (contrast.length < 3) continue;
      const label = dimensionLabel(dim);

      if (difficulty === "medium") {
        out.push({
          key: `which:${dim}:${country.id}`,
          build: (rng) => {
            const wrong = shuffle(contrast, rng).slice(0, 3);
            return assemble(
              lesson,
              `which:${dim}:${country.id}`,
              difficulty,
              label,
              `Which course country does this description of ${label.toLowerCase()} fit?`,
              [
                { text: country.name, rationale: `Correct. ${country.name}: ${value.text}`, correct: true },
                ...wrong.map((o) => ({ text: o.name, rationale: `${o.name} is different here (${o.compare[dim].tag}): ${o.compare[dim].text}`, correct: false })),
              ],
              `${country.name} — ${label}: ${value.text}`,
              rng,
              { kind: "text", text: maskCountries(value.text) },
            );
          },
        });
      } else {
        out.push({
          key: `statement:${dim}:${country.id}`,
          build: (rng) => {
            const wrong = shuffle(contrast, rng).slice(0, 3);
            return assemble(
              lesson,
              `statement:${dim}:${country.id}`,
              difficulty,
              label,
              `Which statement accurately describes ${country.name}'s ${label.toLowerCase()}?`,
              [
                { text: maskCountries(value.text), rationale: `Correct. ${value.text}`, correct: true },
                ...wrong.map((o) => ({ text: maskCountries(o.compare[dim].text), rationale: `This describes ${o.name}, not ${country.name}.`, correct: false })),
              ],
              `${country.name} — ${label} (${value.tag}): ${value.text}`,
              rng,
            );
          },
        });
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function candidatesFor(topicId: string, difficulty: Difficulty): Candidate[] {
  const lesson = getLesson(topicId);
  if (!lesson) return [];
  return [
    ...conceptCandidates(lesson, difficulty),
    ...caseCandidates(lesson, difficulty),
    ...documentCandidates(lesson, difficulty),
    ...countryCandidates(lesson, difficulty),
  ];
}

/**
 * Generates one question for a topic at a difficulty. `used` tracks template
 * keys already served this session; once every template for the topic has
 * been used, templates repeat with freshly drawn distractors and order, so
 * the stream never ends.
 */
export function generateQuestion(topicId: string, difficulty: Difficulty, rng: Rng, used: Set<string>): Question | null {
  const all = candidatesFor(topicId, difficulty);
  const fresh = all.filter((c) => !used.has(c.key));
  for (const c of shuffle(fresh.length ? fresh : all, rng)) {
    const q = c.build(rng);
    if (q) {
      used.add(c.key);
      return q;
    }
  }
  return null;
}
