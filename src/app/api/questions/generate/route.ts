import Anthropic from "@anthropic-ai/sdk";
import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { getCourse, getLesson, getUnit, questionsForTopic } from "@/content";
import type { AnswerChoice, ChoiceId, Difficulty, Lesson, Question } from "@/content/types";

/**
 * AI question generation for Endless Practice.
 *
 * GET  → { enabled } — whether an Anthropic credential is configured.
 * POST → { questions: Question[] } — new AP-style questions for one topic,
 *        grounded in that topic's lesson notes.
 *
 * Runs only on the server; the API key never reaches the browser. Without a
 * key, Endless Practice uses the question bank and the procedural generator.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODEL = process.env.CIVITAS_AI_MODEL || "claude-opus-5";
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
const IDS: ChoiceId[] = ["A", "B", "C", "D"];

const aiEnabled = () => Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);

let client: Anthropic | null = null;
const getClient = () => (client ??= new Anthropic({ timeout: 55_000, maxRetries: 1 }));

// Light per-IP limit (per server instance) so a public deployment can't be drained quickly.
const WINDOW_MS = 10 * 60_000;
const MAX_REQUESTS = 30;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = recent.length >= MAX_REQUESTS;
  if (!limited) recent.push(now);
  hits.set(ip, recent);
  return limited;
}

const SYSTEM = `You write original multiple-choice practice questions for students preparing for AP U.S. Government and Politics and AP Comparative Government and Politics.

Write questions that test reasoning the way AP questions do: applying a concept to a scenario, interpreting a short excerpt, comparing institutions or countries, or explaining a cause or effect. Avoid bare trivia recall. Every question has exactly four answer choices, one unambiguously correct answer, and three plausible distractors drawn from real student misconceptions. Vary which position holds the correct answer.

Accuracy matters more than anything else. Ground each question in the lesson notes provided and in well-established facts about U.S. or comparative government. Do not invent statistics, court holdings, dates, or quotations. A stimulus, if you use one, is either a short hypothetical scenario or an accurate quotation from a public-domain founding document — never a data table or chart.

These are practice questions written for a study site, not College Board questions, so don't imitate or reproduce released AP exam items.

Difficulty levels:
- easy: one concept, recognizable from its definition or a direct example.
- medium: apply a concept to a new scenario, or distinguish it from a closely related concept.
- hard: combine two concepts, analyze a stimulus, or choose among distractors that are each partly true.

Give every choice a one- or two-sentence rationale explaining why it is right or wrong, and write an explanation that teaches the underlying concept.`;

const SCHEMA = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          stimulus: { type: "string", description: "Short scenario or quotation shown above the question, or an empty string for none." },
          stem: { type: "string" },
          choices: {
            type: "array",
            description: "Exactly four answer choices.",
            items: {
              type: "object",
              properties: { text: { type: "string" }, rationale: { type: "string" } },
              required: ["text", "rationale"],
              additionalProperties: false,
            },
          },
          correct_index: { type: "integer", enum: [0, 1, 2, 3] },
          concept: { type: "string", description: "The concept being tested, in a few words." },
          explanation: { type: "string" },
        },
        required: ["stimulus", "stem", "choices", "correct_index", "concept", "explanation"],
        additionalProperties: false,
      },
    },
  },
  required: ["questions"],
  additionalProperties: false,
};

interface GeneratedItem {
  stimulus: string;
  stem: string;
  choices: { text: string; rationale: string }[];
  correct_index: number;
  concept: string;
  explanation: string;
}

function lessonNotes(lesson: Lesson): string {
  const course = getCourse(lesson.courseId)!;
  const unit = getUnit(lesson.unitId)!;
  return [
    `Course: ${course.title}`,
    `Unit ${unit.number}: ${unit.title}`,
    `Topic: ${lesson.title}`,
    "",
    `Overview: ${lesson.overview}`,
    "",
    "Key concepts:",
    ...lesson.keyConcepts.map((k) => `- ${k.term}: ${k.definition}`),
    "",
    ...lesson.deepDive.map((d) => `${d.heading}\n${d.body.replace(/\*\*/g, "")}`),
    "",
    `Example — ${lesson.example.heading}: ${lesson.example.body}`,
    "",
    "Common misconceptions:",
    ...lesson.commonMistakes.map((m) => `- ${m.mistake} Correction: ${m.correction}`),
  ].join("\n");
}

function styleExamples(topicId: string): string {
  return questionsForTopic(topicId)
    .slice(0, 2)
    .map((q) =>
      JSON.stringify({
        stimulus: q.stimulus?.kind === "text" ? q.stimulus.text : "",
        stem: q.stem,
        choices: q.choices.map((c) => c.text),
        correct: q.answer,
      }),
    )
    .join("\n");
}

function toQuestion(item: GeneratedItem, lesson: Lesson, difficulty: Difficulty): Question | null {
  const clean = (s: unknown) => (typeof s === "string" ? s.trim() : "");
  if (!Array.isArray(item.choices) || item.choices.length !== 4) return null;
  const choices: AnswerChoice[] = item.choices.map((c, i) => ({ id: IDS[i], text: clean(c.text), rationale: clean(c.rationale) }));
  if (choices.some((c) => !c.text || !c.rationale)) return null;
  if (new Set(choices.map((c) => c.text.toLowerCase())).size !== 4) return null;
  if (!Number.isInteger(item.correct_index) || item.correct_index < 0 || item.correct_index > 3) return null;
  const stem = clean(item.stem);
  if (stem.length < 15) return null;
  const stimulus = clean(item.stimulus);
  return {
    id: `ai:${randomUUID()}`,
    courseId: lesson.courseId,
    unitId: lesson.unitId,
    topicId: lesson.id,
    difficulty,
    concept: clean(item.concept) || lesson.title,
    stimulus: stimulus ? { kind: "text", text: stimulus } : undefined,
    stem,
    choices,
    answer: IDS[item.correct_index],
    explanation: clean(item.explanation),
  };
}

export async function GET() {
  return NextResponse.json({ enabled: aiEnabled(), model: aiEnabled() ? MODEL : null });
}

export async function POST(req: NextRequest) {
  if (!aiEnabled()) return NextResponse.json({ error: "AI question generation is not configured." }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many requests. Try again in a few minutes." }, { status: 429 });

  let body: { topicId?: unknown; difficulty?: unknown; count?: unknown; avoid?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const lesson = typeof body.topicId === "string" ? getLesson(body.topicId) : undefined;
  const difficulty = DIFFICULTIES.find((d) => d === body.difficulty);
  if (!lesson || !difficulty) return NextResponse.json({ error: "Unknown topic or difficulty." }, { status: 400 });
  const count = Math.min(3, Math.max(1, Number(body.count) || 3));
  const avoid = Array.isArray(body.avoid) ? body.avoid.filter((s): s is string => typeof s === "string").slice(0, 12).map((s) => s.slice(0, 200)) : [];

  const prompt = [
    "<lesson_notes>",
    lessonNotes(lesson),
    "</lesson_notes>",
    "",
    "<style_examples>",
    styleExamples(lesson.id),
    "</style_examples>",
    "",
    `Write ${count} new ${difficulty} question${count > 1 ? "s" : ""} on this topic. Cover different concepts from the notes rather than repeating one idea.`,
    avoid.length ? `\nThe student has already seen questions with these stems; don't repeat them:\n${avoid.map((s) => `- ${s}`).join("\n")}` : "",
  ].join("\n");

  try {
    const response = await getClient().beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      thinking: { type: "adaptive" },
      // Medium effort keeps a 3-question batch inside the serverless time limit.
      output_config: { effort: "medium", format: { type: "json_schema", schema: SCHEMA } },
      system: SYSTEM,
      messages: [{ role: "user", content: prompt }],
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json({ error: "The model declined this request." }, { status: 422 });
    }
    if (response.stop_reason === "max_tokens") {
      return NextResponse.json({ error: "Generation was cut off. Try again." }, { status: 502 });
    }
    const text = response.content.find((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text");
    if (!text) return NextResponse.json({ error: "No questions returned." }, { status: 502 });

    let parsed: { questions?: GeneratedItem[] };
    try {
      parsed = JSON.parse(text.text);
    } catch {
      return NextResponse.json({ error: "Couldn't read the generated questions." }, { status: 502 });
    }
    const questions = (parsed.questions ?? []).map((q) => toQuestion(q, lesson, difficulty)).filter((q): q is Question => !!q);
    if (!questions.length) return NextResponse.json({ error: "Generated questions failed validation." }, { status: 502 });
    return NextResponse.json({ questions });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "The AI service is busy. Try again shortly." }, { status: 429 });
    }
    if (err instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic authentication failed — check ANTHROPIC_API_KEY.");
      return NextResponse.json({ error: "AI generation is misconfigured." }, { status: 503 });
    }
    if (err instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${err.status}: ${err.message}`);
      return NextResponse.json({ error: "AI generation failed." }, { status: 502 });
    }
    console.error("Question generation failed", err);
    return NextResponse.json({ error: "AI generation failed." }, { status: 500 });
  }
}
