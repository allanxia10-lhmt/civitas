import { CASES, COUNTRIES, DECKS, DOCUMENTS, FLASHCARDS, FRQS, FRQ_TYPES, LESSONS, QUESTIONS, getUnit } from "@/content";
import type { CourseId } from "@/content/types";

export type SearchType = "lesson" | "case" | "document" | "country" | "frq" | "question" | "flashcard";

export const SEARCH_TYPE_LABELS: Record<SearchType, string> = {
  lesson: "Lessons",
  case: "Supreme Court Cases",
  document: "Foundational Documents",
  country: "Country Pages",
  frq: "FRQs",
  question: "Practice Questions",
  flashcard: "Flashcards",
};

export interface SearchEntry {
  id: string;
  type: SearchType;
  title: string;
  subtitle: string;
  href: string;
  courseId?: CourseId;
  keywords: string;
  text: string;
}

export interface SearchResult extends SearchEntry {
  score: number;
}

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\bno\.\s*/g, " ")
    .replace(/\bvs?\.?(?=\s)/g, " v ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOPWORDS = new Set(["the", "of", "a", "an", "and", "in", "on", "v", "for", "to", "is", "what"]);

const SYNONYMS: Record<string, string[]> = {
  scotus: ["supreme court"],
  legislature: ["parliament", "congress", "assembly", "duma", "majles", "national people s congress", "legislative"],
  congress: ["legislature", "house", "senate"],
  parliament: ["legislature", "commons", "lords"],
  court: ["judiciary", "judicial"],
  courts: ["judiciary", "judicial"],
  judiciary: ["court", "judicial"],
  president: ["executive", "presidency"],
  executive: ["president", "prime minister", "presidency"],
  election: ["electoral", "vote", "voting"],
  elections: ["electoral", "vote", "voting"],
  uk: ["united kingdom", "britain"],
  britain: ["united kingdom", "uk"],
  england: ["united kingdom"],
  parties: ["party"],
  amendment: ["amendments"],
  "1st": ["first amendment"],
  first: ["1st"],
  prayer: ["religion", "establishment"],
  speech: ["expression", "first amendment"],
  fed: ["federalist", "federal reserve"],
};

const stem = (t: string) => (t.length > 4 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t);

const containsWord = (haystack: string, needle: string) => ` ${haystack} `.includes(` ${needle} `);

let cachedIndex: (SearchEntry & { n: { title: string; subtitle: string; keywords: string; text: string } })[] | null = null;

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const l of LESSONS) {
    const unit = getUnit(l.unitId);
    entries.push({
      id: `lesson:${l.id}`,
      type: "lesson",
      title: l.title,
      subtitle: `Lesson · ${l.courseId === "usgov" ? "AP U.S. Gov" : "AP Comp Gov"} · Unit ${unit?.number}`,
      href: `/lessons/${l.id}`,
      courseId: l.courseId,
      keywords: [...l.tags, ...l.keyConcepts.map((k) => k.term)].join(" "),
      text: [l.overview, ...l.keyConcepts.map((k) => k.definition), ...l.deepDive.map((d) => `${d.heading} ${d.body}`)].join(" "),
    });
  }

  for (const c of CASES) {
    entries.push({
      id: `case:${c.id}`,
      type: "case",
      title: `${c.name} (${c.year})`,
      subtitle: `Supreme Court case${c.required ? " · Required" : ""} · ${c.amendments.length ? `${c.amendments.join(", ")} Amendment` : "Constitutional structure"}`,
      href: `/cases/${c.id}`,
      courseId: "usgov",
      keywords: [c.shortName, ...c.topics, ...c.amendments.map((a) => `${a} amendment`)].join(" "),
      text: [c.issue, c.background, c.decision, c.principle].join(" "),
    });
  }

  for (const d of DOCUMENTS) {
    entries.push({
      id: `document:${d.id}`,
      type: "document",
      title: d.title,
      subtitle: `Foundational document · ${d.author.split(" (")[0]}, ${d.year}`,
      href: `/documents/${d.id}`,
      courseId: "usgov",
      keywords: [d.shortTitle, ...d.keyIdeas, ...d.relatedConcepts].join(" "),
      text: [d.context, d.mainArgument, ...d.whatYouNeedToKnow].join(" "),
    });
  }

  for (const c of COUNTRIES) {
    entries.push({
      id: `country:${c.id}`,
      type: "country",
      title: c.name,
      subtitle: `Country profile · ${c.regimeLabel}`,
      href: `/countries/${c.id}`,
      courseId: "compgov",
      keywords: [c.officialName, c.regimeLabel].join(" "),
      text: c.summary,
    });
    for (const s of c.sections) {
      entries.push({
        id: `country:${c.id}:${s.key}`,
        type: "country",
        title: `${c.name} — ${s.title}`,
        subtitle: `Country profile · ${c.name}`,
        href: `/countries/${c.id}#${s.key}`,
        courseId: "compgov",
        keywords: `${c.name} ${s.title}`,
        text: [s.body, ...(s.bullets ?? [])].join(" "),
      });
    }
  }

  for (const f of FRQS) {
    entries.push({
      id: `frq:${f.id}`,
      type: "frq",
      title: f.title,
      subtitle: `FRQ · ${FRQ_TYPES[f.type].name} · ${f.courseId === "usgov" ? "AP U.S. Gov" : "AP Comp Gov"}`,
      href: `/frq/${f.id}`,
      courseId: f.courseId,
      keywords: FRQ_TYPES[f.type].name,
      text: [f.intro, ...f.parts.map((p) => p.prompt)].join(" "),
    });
  }

  for (const q of QUESTIONS) {
    entries.push({
      id: `question:${q.id}`,
      type: "question",
      title: q.stem.length > 110 ? `${q.stem.slice(0, 107)}…` : q.stem,
      subtitle: `Practice question · ${q.concept}`,
      href: `/practice/session?question=${q.id}`,
      courseId: q.courseId,
      keywords: q.concept,
      text: [q.stem, q.explanation].join(" "),
    });
  }

  for (const f of FLASHCARDS) {
    entries.push({
      id: `flashcard:${f.id}`,
      type: "flashcard",
      title: f.front,
      subtitle: `Flashcard · ${DECKS[f.deck].label}`,
      href: `/flashcards/study?card=${f.id}`,
      courseId: f.courseId,
      keywords: DECKS[f.deck].label,
      text: f.back,
    });
  }

  return entries;
}

function index() {
  if (!cachedIndex) {
    cachedIndex = buildIndex().map((e) => ({
      ...e,
      n: { title: normalize(e.title), subtitle: normalize(e.subtitle), keywords: normalize(e.keywords), text: normalize(e.text) },
    }));
  }
  return cachedIndex;
}

const TYPE_BOOST: Record<SearchType, number> = { lesson: 3, case: 3, document: 3, country: 3, frq: 1, question: 0, flashcard: 0 };

export function search(query: string, options: { limit?: number; types?: SearchType[] } = {}): SearchResult[] {
  const phrase = normalize(query);
  if (!phrase) return [];
  const raw = phrase.split(" ");
  const tokens = raw.filter((t) => !STOPWORDS.has(t));
  const terms = tokens.length ? tokens : raw;

  const results: SearchResult[] = [];
  for (const e of index()) {
    if (options.types && !options.types.includes(e.type)) continue;
    let score = 0;
    let matched = 0;
    for (const term of terms) {
      const variants = [term, stem(term), ...(SYNONYMS[term] ?? [])];
      let best = 0;
      for (const v of variants) {
        if (e.n.title.includes(v)) best = Math.max(best, containsWord(e.n.title, v) ? 10 : 6);
        else if (e.n.keywords.includes(v)) best = Math.max(best, 5);
        else if (e.n.subtitle.includes(v)) best = Math.max(best, 3);
        else if (e.n.text.includes(v)) best = Math.max(best, 1);
      }
      if (best > 0) matched++;
      score += best;
    }
    if (matched === 0) continue;
    if (matched < terms.length) score *= 0.3;
    if (e.n.title.includes(phrase)) score += 25;
    if (e.n.title.startsWith(phrase)) score += 10;
    score += TYPE_BOOST[e.type];
    results.push({ ...e, score });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, options.limit ?? 60);
}

export const SEARCH_SUGGESTIONS = ["Federalism", "McCulloch v. Maryland", "China legislature", "Federalist 10", "Electoral College", "Guardian Council"];
