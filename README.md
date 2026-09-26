# Civitas — AP Government Study Platform

A study platform for **AP U.S. Government and Politics** and **AP Comparative Government and Politics**. It includes personalized study plans, 48 structured lessons, 151 AP-style practice questions, FRQs with practice rubrics and model answers, spaced-repetition flashcards, full-length practice tests, a Supreme Court case database, the 13 required foundational documents, profiles of the six Comp Gov countries, a country comparison tool, progress tracking, and a Smart Review that answers *"What should I study today?"*

Stack: **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn-style components (Radix) · Lucide · Recharts · Zustand**. **Supabase** is optional; it adds accounts and cloud sync.

> **AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this site.** Every practice question, FRQ, rubric, and model answer here is original material. None of it is official College Board content, and estimated FRQ scores are not official AP scores.

---

## 1. Quick start

Requirements: **Node.js 20+** (LTS recommended) and npm.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

No configuration is needed. On first visit the app loads a **demo student (Allan)** so every page is populated: 42% course completion, 73% accuracy, an 8-day streak, weak spots, due flashcards, and two finished diagnostics. Choose **Build My Study Plan** (or go to `/onboarding`) to replace the demo with your own plan.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | TypeScript check with no output |
| `npm run seed:sql > supabase/seed.sql` | Validates all content cross-references, then writes SQL inserts for the optional content tables |

## 2. Environment variables

Everything runs without environment variables. To enable accounts and sync, copy `.env.example` to `.env.local`:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Only for accounts | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Only for accounts | Supabase public anon key. It's safe in the browser because Row Level Security protects the data. |
| `ANTHROPIC_API_KEY` | Only for AI questions | Server-only key that enables AI-generated questions in Endless Practice. Never prefix it with `NEXT_PUBLIC_`. |
| `CIVITAS_AI_MODEL` | No | Overrides the question-writing model (default `claude-opus-5`). |

## 3. Project structure

```
ap-gov-prep/
├─ supabase/
│  └─ schema.sql              # User-data tables + RLS, optional content tables
├─ scripts/
│  └─ generate-seed.ts        # Content validator + SQL seed generator
└─ src/
   ├─ app/
   │  ├─ page.tsx             # Marketing landing page
   │  ├─ onboarding/          # 5-step setup → generated study plan
   │  ├─ login/               # Supabase magic-link sign-in
   │  └─ (app)/               # Everything inside the app shell (sidebar, top bar, mobile nav)
   │     ├─ dashboard/        # "What should I study today?"
   │     ├─ study-plan/       # Week-by-week timeline
   │     ├─ courses/[courseId]/(lessons/)   # Units overview, lesson catalog
   │     ├─ lessons/[lessonId]/             # 8-section lesson pages
   │     ├─ practice/ (session/)            # Question bank + practice runner
   │     ├─ frq/ ([frqId]/)                 # FRQ list + timed workspace with rubric
   │     ├─ flashcards/ (study/)            # Decks, custom cards, spaced repetition
   │     ├─ practice-tests/ ([testId]/, report/[attemptId]/)
   │     ├─ cases/ ([caseId]/)              # SCOTUS database + case map
   │     ├─ documents/ ([docId]/)           # Foundational documents
   │     ├─ countries/ ([countryId]/)       # Country profiles
   │     ├─ compare/                        # Country comparison tool
   │     ├─ progress/  review/  search/  settings/
   ├─ components/
   │  ├─ ui/                  # Button, Card, Badge, Dialog, Tabs, Progress, Input, Switch…
   │  ├─ layout/              # App shell, nav config, ⌘K search, theme toggle
   │  ├─ common/              # Page header, stat card, mastery bars, labels, stimulus renderer
   │  ├─ questions/           # QuestionCard (practice/test/review modes), QuickQuiz
   │  ├─ plan/  cases/  charts/
   ├─ content/                # ALL course content — typed, validated, no duplication
   │  ├─ types.ts             # Course, Unit, Topic, Lesson, Question, AnswerChoice, Flashcard,
   │  │                       # Frq, SupremeCourtCase, FoundationalDocument, Country, PracticeTest
   │  ├─ courses.ts           # Official course/exam/framework facts (verified dates + sources)
   │  ├─ lessons/  questions/  countries/
   │  ├─ cases.ts  documents.ts  frqs.ts  flashcards.ts  practice-tests.ts
   │  └─ index.ts             # Lookups + validateContent()
   └─ lib/
      ├─ progress-types.ts    # UserProgress, StudySession, attempts, SRS state…
      ├─ study-plan.ts        # Plan generator (phases, weeks, tasks, today's plan)
      ├─ mastery.ts           # Topic/unit/course mastery
      ├─ recommendations.ts   # Smart Review engine
      ├─ srs.ts               # Spaced repetition (Again / Hard / Easy)
      ├─ stats.ts             # Streaks, study time, XP and levels
      ├─ achievements.ts  search.ts  frq-grader.ts  demo-seed.ts
      ├─ store.ts             # Zustand store: the only place user data changes
      └─ persistence/         # ProgressRepository: local.ts (browser) · supabase.ts
```

## 4. Content accuracy policy

- **Official facts live in one file.** Exam format, unit weightings, FRQ types, 2027 exam dates, required documents, and required cases are all in `src/content/courses.ts`, `cases.ts`, and `documents.ts`. Each course records `framework.verifiedOn` and a `sourceUrl` on AP Central. They were verified on **2026-09-23**, including the **2026–27 update** that added four required documents (Emancipation Proclamation, Federalist No. 39, Gettysburg Address, and core principles from *The Wealth of Nations*) and the **14-case** required list (Roe v. Wade was removed after Dobbs).
- **Content is labeled by source.** The UI tags content as *Official AP requirement*, *Educational explanation*, or *Practice material*.
- **No invented scoring.** FRQ rubrics are labeled as practice rubrics modeled on the published task formats. Test reports show raw scores only, with no predicted 1–5 score.
- **Time-sensitive facts are flagged.** Every country profile shows **Last Updated**, marks officeholders and similar items as *time-sensitive*, and keeps current events in a separate "Current Political Issues" block.
- **Stimulus data is labeled.** Charts and tables in questions are marked *hypothetical* unless they cite a real source, such as the rounded UK 2024 election results.

## 5. Adding or updating AP content

All content is typed. A missing field is a compile error, and `validateContent()` (run by `npm run seed:sql`) catches broken cross-references.

- **Lesson:** add an object to the right file in `src/content/lessons/` and add its `id` to that unit's `lessonIds` in `courses.ts`. The lesson `id` is also its topic id. It needs all eight sections: overview, keyConcepts, deepDive, example, examConnection, commonMistakes, plus Quick Check and Practice, which are generated from the question bank.
- **Questions:** use the `bank(course, unit)` helper in `src/content/questions/`. Each choice is `[text, rationale]`, so every answer choice explains itself. Give each topic at least 3 questions, since the first ones become that lesson's Quick Check. Tag `caseIds`, `documentIds`, and `countryIds` so the questions appear on those pages.
- **Supreme Court case:** add it to `cases.ts`. Set `required: true` only if it's on the current CED list, and link related cases through `related`; the case map and connection diagrams draw from these links. A flashcard is generated automatically.
- **Document:** add it to `documents.ts`. Use `addedIn` for newly required documents. A flashcard is generated automatically.
- **Country facts:** edit `src/content/countries/<country>.ts` and **update `lastUpdated`**. The `compare` block feeds the comparison tool: matching `tag` values across countries are what the tool reports as similarities.
- **FRQ:** add it to `frqs.ts`. Each rubric criterion can include `signals` (keyword groups) for the automated estimate.
- **When College Board revises a course:** update `courses.ts` (framework notes, exam sections, weightings, `verifiedOn`), then bump `CONTENT_VERSION` in `src/content/index.ts`.
- **Moving content into a database/CMS:** create the Part 2 tables in `schema.sql`, run `npm run seed:sql > supabase/seed.sql`, and load it. Pages read content only through `src/content/index.ts`, so swapping the source only touches that file.

## 6. How the study plan works (`src/lib/study-plan.ts`)

1. For each course, the generator counts Monday-start weeks from the plan start date to the exam date.
2. It splits those weeks into **Learn · Practice · Apply · Review · Final Review** at roughly 48/16/14/12/10%. Confidence shifts time between phases: a higher rating means a shorter Learn phase and more applied practice.
3. **Learn weeks** spread the course's lessons evenly. Each lesson is paired with a 10-question topic set, and each week also gets flashcards, Supreme Court cases and documents (U.S. Gov) or a country focus (Comp Gov), and an FRQ. FRQs are weekly when there's time, otherwise every other week.
4. **Later phases** add mixed sets, timed sprints, timed FRQs, targeted review, and full-length exams.
5. With both courses, the two plans are merged week by week and their tasks interleaved, so each day's plan mixes courses.
6. **Today's Plan** fills the daily minute budget. It carries over one overdue task first, then takes this week's tasks in order. Tasks finished today stay visible as checked, so the list doesn't change under the student.

Task IDs are deterministic, so completion survives regeneration. Lesson tasks complete when the lesson is marked complete. Practice, flashcard, FRQ, and test tasks complete when their session ends. Reading tasks such as cases, documents, and countries use a **Mark complete** button.

## 6b. Endless Practice (`/practice/endless`)

Students choose a course, one or more units, and **Easy, Medium, Hard, or Adaptive**, then answer as many questions as they like. Every answer is recorded toward topic mastery. Each question is labeled with where it came from. For each question, sources are tried in this order:

1. **Question bank:** unseen curated questions matching the filters. Topics are weighted toward the student's weakest ones.
2. **AI-generated questions:** only when `ANTHROPIC_API_KEY` is set, and only once fewer than three unseen bank questions remain at the current difficulty. `POST /api/questions/generate` (`src/app/api/questions/generate/route.ts`) sends Claude the topic's lesson notes plus two bank questions as style examples. It returns three schema-validated questions using structured outputs, with server-side refusal fallbacks enabled (`fallbacks: "default"`). The key stays on the server, and requests are rate-limited per IP.
3. **Generated from course content** (`src/lib/question-generator.ts`): new questions built from key concepts, Supreme Court cases, foundational-document quotes, and country comparison data. Difficulty comes from how close the distractors are. This source works offline and never runs out.

**Adaptive** mode (`src/lib/adaptive.ts`) starts at a level based on the student's mastery of the selected units. It then uses a "2-up, 1-down" staircase: two correct answers in a row step the difficulty up, and any miss steps it down. This settles where the student gets about 70% right.

**Cost note:** AI generation bills to your Anthropic account, and a 3-question batch is one request. If you deploy publicly with a key, watch your usage. The per-IP limit (30 requests per 10 minutes per server instance) is a basic guard, not a billing cap.

## 7. How progress tracking works

The store (`src/lib/store.ts`) records **raw events only**: lesson start/complete, question attempts, flashcard reviews, FRQ submissions, test attempts, study sessions (minutes), and completed plan tasks. Everything else is **derived** on the fly, so it can never drift out of sync:

- **Mastery** (`mastery.ts`): recent accuracy per topic weighted by recency (each attempt's weight halves every 30 days), smoothed toward 50% so a few lucky answers don't read as mastery. Completing the lesson adds 20%, and topics untouched for 30+ days decay slightly. Course mastery weights units by their official exam weighting.
- **Streaks and study time** (`stats.ts`) come from study sessions. **XP and levels** are computed from activity, and **achievements** are predicates over the same data.
- **Smart Review** (`recommendations.ts`) ranks suggestions from misses this week, low mastery, FRQ results by type, due or "Hard" flashcards, time since review, next lesson, and test recency. Its copy is written to be supportive.

## 8. Authentication and storage

- **Without Supabase (default):** progress is saved to `localStorage` through `LocalProgressRepository`. Settings has export/import (JSON), load demo, and reset.
- **With Supabase:** `/login` sends a **magic link** (`signInWithOtp`, PKCE flow). After the redirect, the store finds the session and switches to `SupabaseProgressRepository`, which maps progress onto the normalized tables in `schema.sql`. Saves are incremental: only changed rows are upserted or inserted. On a new account's first sign-in, real local progress on that device is migrated; otherwise the student goes through onboarding. **Row Level Security** limits every row to `auth.uid()`.

Supabase setup:

1. Create a project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Under Authentication → URL Configuration, add `http://localhost:3000/dashboard` (and your production URL) as redirect URLs.
4. Fill in `.env.local`.
5. Restart `npm run dev`.

## 9. Database schema (summary)

| Table | Holds |
| --- | --- |
| `profiles` | name, courses, exam dates, minutes/day, confidence, plan start, weekly goal |
| `lesson_progress` | started/completed per lesson |
| `question_attempts` | every answer (source: practice, quick-check, test) |
| `flashcard_states` | SRS state per card (ease, interval, due, last grade) |
| `custom_flashcards` | student-created cards |
| `frq_submissions` | responses, confirmed rubric points (estimates) |
| `test_attempts` | answers, flags, FRQ responses, raw score, time |
| `study_sessions` | minutes per activity per local day |
| `completed_tasks` | study-plan task completion |
| `user_meta` | seen achievements, recently viewed pages |
| *(optional)* `courses`, `units`, `lessons`, `questions`, `flashcards`, `frqs`, `supreme_court_cases`, `foundational_documents`, `countries` | content, public read-only |

## 10. Seed data

- **Demo student:** `src/lib/demo-seed.ts` builds a realistic, deterministic history relative to today. It's plan-aligned lesson completions (about 42%), a few hundred question attempts calibrated to exactly 73% accuracy, an 8-day streak ending yesterday, two weak recent topics, due and "Hard" flashcards, two diagnostics, and four FRQ submissions. Reload it anytime from **Settings → Load demo student**.
- **Content seed:** `npm run seed:sql` (see §5).

## 11. Accessibility and design notes

- Semantic landmarks, a skip link, visible focus rings, ARIA labels on icon buttons, and progress bars with values.
- Keyboard support throughout: ⌘/Ctrl+K or `/` opens search. In practice, keys 1–4 or A–D choose an answer and Enter checks it. In flashcards, Space flips and 1/2/3 grade the card.
- Each chart has one series and one axis, uses the theme's primary color, and shows a hover tooltip. A visually hidden data table carries the same data for screen readers.
- Light and dark themes are defined as design tokens in `globals.css`. The app honors reduced-motion settings.
- Mobile layouts get a bottom navigation bar and a slide-in menu, and their tables and chips scroll horizontally.
