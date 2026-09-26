"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BookOpen,
  Bot,
  CheckCircle2,
  Flame,
  Gauge,
  Infinity as InfinityIcon,
  Library,
  Loader2,
  RotateCcw,
  Settings2,
  SkipForward,
  Sparkles,
  Square,
  Target,
  Wand2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { QuestionCard } from "@/components/questions/question-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Segmented, Switch } from "@/components/ui/misc";
import { Progress } from "@/components/ui/progress";
import { getLesson, lessonsForUnit, QUESTIONS, unitsForCourse } from "@/content";
import type { ChoiceId, CourseId, Difficulty, Question } from "@/content/types";
import { initialLevel, LEVELS, pickTopic, stepAdaptive, type AdaptiveState } from "@/lib/adaptive";
import { useStudyData } from "@/lib/hooks";
import { generateQuestion } from "@/lib/question-generator";
import { useStore } from "@/lib/store";
import { cn, formatClock, percent, shuffle } from "@/lib/utils";

type Mode = Difficulty | "adaptive";
type Source = "bank" | "generated" | "ai";

interface EndlessConfig {
  courseId: CourseId;
  unitIds: string[];
  mode: Mode;
  ai: boolean;
}

interface Item {
  question: Question;
  source: Source;
}

interface Answer {
  item: Item;
  selected: ChoiceId;
  correct: boolean;
  level: Difficulty;
}

const STORAGE_KEY = "civitas:endless-config";

const MODES: { value: Mode; label: string; description: string; icon: typeof Gauge }[] = [
  { value: "easy", label: "Easy", description: "Definitions and direct examples", icon: Target },
  { value: "medium", label: "Medium", description: "Apply concepts to new situations", icon: Target },
  { value: "hard", label: "Hard", description: "Close distractors and stimulus analysis", icon: Target },
  { value: "adaptive", label: "Adaptive", description: "Adjusts to you: two right steps up, a miss steps down", icon: Gauge },
];

const SOURCE_BADGE: Record<Source, { label: string; icon: typeof Library; variant: "neutral" | "xp" | "warning" }> = {
  bank: { label: "Question bank", icon: Library, variant: "neutral" },
  generated: { label: "Generated from course content", icon: Wand2, variant: "xp" },
  ai: { label: "AI-generated · check it against the lesson", icon: Bot, variant: "warning" },
};

function loadConfig(fallbackCourse: CourseId): EndlessConfig {
  const fallback: EndlessConfig = { courseId: fallbackCourse, unitIds: unitsForCourse(fallbackCourse).map((u) => u.id), mode: "adaptive", ai: true };
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as EndlessConfig | null;
    if (saved && (saved.courseId === "usgov" || saved.courseId === "compgov") && Array.isArray(saved.unitIds) && saved.unitIds.length) {
      const valid = unitsForCourse(saved.courseId).map((u) => u.id);
      const unitIds = saved.unitIds.filter((u) => valid.includes(u));
      if (unitIds.length) return { ...fallback, ...saved, unitIds };
    }
  } catch {
    // ignore unreadable storage
  }
  return fallback;
}

export function EndlessPractice() {
  const { progress, mastery } = useStudyData();
  const recordAttempt = useStore((s) => s.recordAttempt);
  const logStudy = useStore((s) => s.logStudy);

  const [config, setConfig] = useState<EndlessConfig>(() => loadConfig(progress.profile.courses[0] ?? "usgov"));
  const [phase, setPhase] = useState<"setup" | "running" | "summary">("setup");
  const [item, setItem] = useState<Item | null>(null);
  const [answered, setAnswered] = useState(false);
  const [history, setHistory] = useState<Answer[]>([]);
  const [adaptive, setAdaptive] = useState<AdaptiveState>({ level: "medium", streak: 0 });
  const [levelChange, setLevelChange] = useState<"up" | "down" | null>(null);
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiTick, setAiTick] = useState(0);
  const [now, setNow] = useState(Date.now());

  const served = useRef(new Set<string>());
  const usedTemplates = useRef(new Set<string>());
  const recentTopics = useRef<string[]>([]);
  const aiBuffer = useRef<Question[]>([]);
  const aiStems = useRef<string[]>([]);
  const aiFailures = useRef(0);
  const adaptiveRef = useRef(adaptive);
  const startedAt = useRef(0);
  const logged = useRef(false);
  const answeredCount = useRef(0);

  const topicIds = useMemo(() => config.unitIds.flatMap((u) => lessonsForUnit(u).map((l) => l.id)), [config.unitIds]);
  const bank = useMemo(() => QUESTIONS.filter((q) => q.courseId === config.courseId && config.unitIds.includes(q.unitId)), [config.courseId, config.unitIds]);
  const useAi = config.ai && aiAvailable === true;
  const currentLevel = (): Difficulty => (config.mode === "adaptive" ? adaptiveRef.current.level : config.mode);
  const bankRemaining = (lvl: Difficulty) => bank.filter((q) => q.difficulty === lvl && !served.current.has(q.id)).length;

  useEffect(() => {
    fetch("/api/questions/generate")
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((d: { enabled?: boolean }) => setAiAvailable(!!d.enabled))
      .catch(() => setAiAvailable(false));
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  // Session clock.
  useEffect(() => {
    if (phase !== "running") return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Log study time if the student leaves mid-session.
  useEffect(
    () => () => {
      if (!logged.current && answeredCount.current > 0) {
        logStudy(Math.max(1, Math.round((Date.now() - startedAt.current) / 60000)), "practice");
      }
    },
    [logStudy],
  );

  /** Picks the next question: unseen bank items first, then AI, then procedural generation. */
  const draw = (lvl: Difficulty): Item => {
    const rng = Math.random;
    const topic = pickTopic(topicIds, mastery, rng, recentTopics.current);

    const unseen = bank.filter((q) => q.difficulty === lvl && !served.current.has(q.id));
    const fromBank = unseen.find((q) => q.topicId === topic) ?? shuffle(unseen, rng)[0];
    if (fromBank) return { question: fromBank, source: "bank" };

    if (useAi) {
      const idx = aiBuffer.current.findIndex((q) => q.difficulty === lvl);
      if (idx >= 0) {
        const [q] = aiBuffer.current.splice(idx, 1);
        aiStems.current.push(q.stem);
        setAiTick((t) => t + 1);
        return { question: q, source: "ai" };
      }
    }

    for (const t of [topic, ...shuffle(topicIds.filter((x) => x !== topic), rng)]) {
      const q = generateQuestion(t, lvl, rng, usedTemplates.current);
      if (q) return { question: q, source: "generated" };
    }
    return { question: shuffle(bank, rng)[0] ?? QUESTIONS[0], source: "bank" };
  };

  const serveNext = () => {
    const next = draw(currentLevel());
    served.current.add(next.question.id);
    recentTopics.current = [...recentTopics.current, next.question.topicId].slice(-6);
    setItem(next);
    setAnswered(false);
  };

  // Keep a small buffer of AI questions once the curated bank runs low.
  useEffect(() => {
    if (phase !== "running" || !useAi || aiLoading || aiFailures.current >= 3) return;
    const lvl = currentLevel();
    if (bankRemaining(lvl) > 2) return;
    if (aiBuffer.current.filter((q) => q.difficulty === lvl).length >= 2) return;

    const topicId = pickTopic(topicIds, mastery, Math.random, recentTopics.current);
    setAiLoading(true);
    fetch("/api/questions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicId, difficulty: lvl, count: 3, avoid: aiStems.current.slice(-12) }),
    })
      .then(async (r) => {
        const data = (await r.json().catch(() => ({}))) as { questions?: Question[]; error?: string };
        if (!r.ok || !data.questions) throw new Error(data.error ?? `Request failed (${r.status})`);
        return data.questions;
      })
      .then((questions) => {
        aiFailures.current = 0;
        aiBuffer.current.push(...questions);
        setAiError(null);
      })
      .catch((err: Error) => {
        aiFailures.current += 1;
        setAiError(err.message);
      })
      .finally(() => {
        const wait = aiFailures.current ? 8000 * aiFailures.current : 0;
        setTimeout(() => setAiLoading(false), wait);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, useAi, aiLoading, item, aiTick]);

  const start = () => {
    served.current = new Set();
    usedTemplates.current = new Set();
    recentTopics.current = [];
    aiBuffer.current = [];
    aiStems.current = [];
    aiFailures.current = 0;
    logged.current = false;
    answeredCount.current = 0;
    startedAt.current = Date.now();
    const initial: AdaptiveState = { level: initialLevel(topicIds, mastery), streak: 0 };
    adaptiveRef.current = initial;
    setAdaptive(initial);
    setHistory([]);
    setLevelChange(null);
    setAiError(null);
    setNow(Date.now());
    setPhase("running");
    serveNext();
  };

  const onAnswer = (selected: ChoiceId, correct: boolean, seconds: number) => {
    if (!item) return;
    const q = item.question;
    recordAttempt({ questionId: q.id, courseId: q.courseId, unitId: q.unitId, topicId: q.topicId, selected, correct, seconds, source: "practice" });
    answeredCount.current += 1;
    setHistory((h) => [...h, { item, selected, correct, level: q.difficulty }]);
    setAnswered(true);
    if (config.mode === "adaptive") {
      const { state, change } = stepAdaptive(adaptiveRef.current, correct);
      adaptiveRef.current = state;
      setAdaptive(state);
      setLevelChange(change);
    }
  };

  const end = () => {
    if (!logged.current && answeredCount.current > 0) {
      logStudy(Math.max(1, Math.round((Date.now() - startedAt.current) / 60000)), "practice");
      logged.current = true;
    }
    setPhase("summary");
  };

  const correctCount = history.filter((h) => h.correct).length;
  let streak = 0;
  for (let i = history.length - 1; i >= 0 && history[i].correct; i--) streak++;

  // ------------------------------------------------------------------ Setup
  if (phase === "setup") {
    const units = unitsForCourse(config.courseId);
    return (
      <div>
        <PageHeader
          eyebrow={
            <>
              <InfinityIcon className="size-4 text-primary" /> Endless Practice
            </>
          }
          title="Practice that never runs out"
          description="Choose units and a difficulty. You'll get unseen questions from the bank first, then fresh questions generated for your filters, for as long as you want to keep going."
        />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card>
            <CardContent className="space-y-7 pt-5 sm:pt-6">
              <section aria-labelledby="e-course">
                <h2 id="e-course" className="mb-2 text-sm font-semibold">
                  Course
                </h2>
                <Segmented
                  ariaLabel="Course"
                  value={config.courseId}
                  onChange={(c) => setConfig((prev) => ({ ...prev, courseId: c, unitIds: unitsForCourse(c).map((u) => u.id) }))}
                  options={[
                    { value: "usgov", label: "AP U.S. Gov" },
                    { value: "compgov", label: "AP Comp Gov" },
                  ]}
                />
              </section>

              <section aria-labelledby="e-units">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h2 id="e-units" className="text-sm font-semibold">
                    Units <span className="font-normal text-muted-foreground">(choose one or more)</span>
                  </h2>
                  <button
                    onClick={() =>
                      setConfig((prev) => ({ ...prev, unitIds: prev.unitIds.length === units.length ? [units[0].id] : units.map((u) => u.id) }))
                    }
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {config.unitIds.length === units.length ? "Clear" : "Select all"}
                  </button>
                </div>
                <div className="grid gap-2 sm:grid-cols-2" role="group" aria-labelledby="e-units">
                  {units.map((u) => {
                    const on = config.unitIds.includes(u.id);
                    return (
                      <button
                        key={u.id}
                        aria-pressed={on}
                        onClick={() =>
                          setConfig((prev) => {
                            const next = on ? prev.unitIds.filter((x) => x !== u.id) : [...prev.unitIds, u.id];
                            return next.length ? { ...prev, unitIds: next } : prev;
                          })
                        }
                        className={cn(
                          "flex items-center gap-3 rounded-xl border p-3 text-left transition",
                          on ? "border-primary bg-primary-soft/60 ring-1 ring-primary/30" : "bg-card hover:bg-muted",
                        )}
                      >
                        <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold", on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                          {u.number}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">{u.title}</span>
                          <span className="block text-xs text-muted-foreground">
                            {u.lessonIds.length} topics · {QUESTIONS.filter((q) => q.unitId === u.id).length} bank questions
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section aria-labelledby="e-level">
                <h2 id="e-level" className="mb-2 text-sm font-semibold">
                  Difficulty
                </h2>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="radiogroup" aria-labelledby="e-level">
                  {MODES.map((m) => {
                    const on = config.mode === m.value;
                    return (
                      <button
                        key={m.value}
                        role="radio"
                        aria-checked={on}
                        onClick={() => setConfig((prev) => ({ ...prev, mode: m.value }))}
                        className={cn(
                          "rounded-xl border p-3 text-left transition",
                          on ? "border-primary bg-primary-soft/60 ring-1 ring-primary/30" : "bg-card hover:bg-muted",
                        )}
                      >
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          <m.icon className={cn("size-4", on ? "text-primary" : "text-muted-foreground")} aria-hidden /> {m.label}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{m.description}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section aria-labelledby="e-ai" className="rounded-xl border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 id="e-ai" className="flex items-center gap-2 text-sm font-semibold">
                      <Bot className="size-4 text-muted-foreground" aria-hidden /> AI-generated questions
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {aiAvailable === null
                        ? "Checking availability…"
                        : aiAvailable
                          ? "Adds new AP-style questions written by Claude from the lesson notes once the bank runs low. They're labeled, and can occasionally contain mistakes."
                          : "Not set up on this site. You'll still get unlimited questions generated from the course content."}
                    </p>
                  </div>
                  <Switch
                    checked={config.ai && !!aiAvailable}
                    disabled={!aiAvailable}
                    onCheckedChange={(ai) => setConfig((prev) => ({ ...prev, ai }))}
                    aria-labelledby="e-ai"
                  />
                </div>
              </section>

              <Button size="lg" className="w-full sm:w-auto" onClick={start}>
                Start Endless Practice <ArrowRight />
              </Button>
            </CardContent>
          </Card>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Where questions come from</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="flex gap-2.5">
                  <Library className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span>
                    <span className="font-semibold">Question bank first.</span> Unseen questions that match your units and difficulty, favoring your weaker topics.
                  </span>
                </p>
                <p className="flex gap-2.5">
                  <Wand2 className="mt-0.5 size-4 shrink-0 text-xp" aria-hidden />
                  <span>
                    <span className="font-semibold">Then generated from course content.</span> New questions built from key concepts, Supreme Court cases, founding documents, and country comparisons. They never run out.
                  </span>
                </p>
                <p className="flex gap-2.5">
                  <Bot className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
                  <span>
                    <span className="font-semibold">Plus AI questions</span> when enabled: fresh scenario-based items written for your chosen topics.
                  </span>
                </p>
                <p className="border-t pt-3 text-xs text-muted-foreground">Every answer counts toward your topic mastery. All questions are practice material, not official College Board questions.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------ Summary
  if (phase === "summary") {
    const byLevel = LEVELS.map((l) => {
      const rows = history.filter((h) => h.level === l);
      return { level: l, total: rows.length, correct: rows.filter((r) => r.correct).length };
    }).filter((r) => r.total);
    const byTopic = new Map<string, { correct: number; total: number }>();
    for (const h of history) {
      const e = byTopic.get(h.item.question.topicId) ?? { correct: 0, total: 0 };
      e.total++;
      if (h.correct) e.correct++;
      byTopic.set(h.item.question.topicId, e);
    }
    const missed = history.filter((h) => !h.correct);
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Card>
          <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Endless Practice · session complete</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">
                {correctCount} of {history.length} correct{history.length ? ` · ${percent(correctCount, history.length)}%` : ""}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatClock((now - startedAt.current) / 1000)} · {config.mode === "adaptive" ? `finished at ${adaptive.level} difficulty` : `${config.mode} difficulty`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={start}>
                <RotateCcw /> Keep going
              </Button>
              <Button variant="outline" onClick={() => setPhase("setup")}>
                <Settings2 /> Change filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {history.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>By difficulty</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {byLevel.map((r) => (
                  <div key={r.level}>
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{r.level}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {r.correct}/{r.total}
                      </span>
                    </div>
                    <Progress value={r.correct} max={r.total} size="xs" className="mt-1.5" label={`${r.level} accuracy`} />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>By topic</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[...byTopic.entries()].map(([id, e]) => (
                  <div key={id} className="flex items-center justify-between gap-3 text-sm">
                    <Link href={`/lessons/${id}`} className="truncate hover:text-primary">
                      {getLesson(id)?.title}
                    </Link>
                    <span className={cn("shrink-0 font-semibold tabular-nums", e.correct / e.total >= 0.7 ? "text-success" : "text-warning")}>
                      {e.correct}/{e.total}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {missed.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Review what you missed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {missed.map((h, i) => (
                <details key={`${h.item.question.id}-${i}`} className="rounded-xl border">
                  <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
                    <XCircle className="size-5 shrink-0 text-danger" aria-hidden />
                    <span className="line-clamp-1 flex-1 text-sm">{h.item.question.stem}</span>
                  </summary>
                  <div className="border-t p-3">
                    <QuestionCard question={h.item.question} mode="review" selected={h.selected} className="border-0 p-2 shadow-none sm:p-3" />
                  </div>
                </details>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // ------------------------------------------------------------------ Running
  const unitNumbers = config.unitIds
    .map((id) => unitsForCourse(config.courseId).find((u) => u.id === id)?.number)
    .filter(Boolean)
    .sort()
    .join(", ");
  const badge = item ? SOURCE_BADGE[item.source] : null;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant={config.courseId === "usgov" ? "usgov" : "compgov"}>{config.courseId === "usgov" ? "U.S. Gov" : "Comp Gov"}</Badge>
        <Badge variant="neutral">Unit{config.unitIds.length > 1 ? "s" : ""} {unitNumbers}</Badge>
        <Badge variant="neutral" className="capitalize">
          {config.mode}
        </Badge>
        <span className="ml-auto inline-flex items-center gap-1.5 text-sm tabular-nums text-muted-foreground">
          {formatClock((now - startedAt.current) / 1000)}
        </span>
        <Button variant="outline" size="sm" onClick={end}>
          <Square /> End session
        </Button>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
        <Stat label="Answered" value={String(history.length)} />
        <Stat label="Accuracy" value={history.length ? `${percent(correctCount, history.length)}%` : "—"} />
        <Stat label="Streak" value={String(streak)} icon={streak >= 3 ? <Flame className="size-4 text-streak" aria-hidden /> : undefined} />
        {config.mode === "adaptive" && <AdaptiveMeter level={adaptive.level} className="col-span-3 sm:col-span-1" />}
      </div>

      {levelChange && (
        <p
          role="status"
          className={cn(
            "mb-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium animate-slide-up",
            levelChange === "up" ? "bg-success-soft text-success" : "bg-warning-soft text-warning",
          )}
        >
          {levelChange === "up" ? <ArrowUp className="size-4" /> : <ArrowDown className="size-4" />}
          {levelChange === "up" ? `Two in a row — stepping up to ${adaptive.level}.` : `Dropping to ${adaptive.level} to rebuild momentum.`}
        </p>
      )}

      {item && badge && (
        <>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant={badge.variant}>
              <badge.icon aria-hidden /> {badge.label}
            </Badge>
            <Link href={`/lessons/${item.question.topicId}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
              <BookOpen className="size-3.5" aria-hidden /> {getLesson(item.question.topicId)?.title}
            </Link>
          </div>
          <QuestionCard key={item.question.id} question={item.question} mode="practice" keyboard number={history.length + (answered ? 0 : 1)} onAnswer={onAnswer} />
        </>
      )}

      <div className="sticky bottom-20 mt-4 flex items-center justify-between gap-3 lg:bottom-6">
        <p className="flex min-h-5 items-center gap-1.5 text-xs text-muted-foreground">
          {useAi && aiLoading && !aiError && (
            <>
              <Loader2 className="size-3.5 animate-spin" aria-hidden /> Writing new questions for your filters…
            </>
          )}
          {useAi && aiError && (
            <>
              <Sparkles className="size-3.5" aria-hidden /> AI questions paused ({aiError}). Using course-content questions.
            </>
          )}
        </p>
        {answered ? (
          <Button size="lg" className="shadow-lift" autoFocus onClick={serveNext}>
            Next question <ArrowRight />
          </Button>
        ) : (
          <Button variant="ghost" onClick={serveNext}>
            <SkipForward /> Skip
          </Button>
        )}
      </div>

      {history.length > 0 && history.length % 10 === 0 && answered && (
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-primary-soft/60 px-3 py-2 text-sm">
          <CheckCircle2 className="size-4 text-primary" aria-hidden /> {history.length} questions done. Keep going, or end the session to review what you missed.
        </p>
      )}
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card px-3 py-2 shadow-card">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="flex items-center gap-1 text-lg font-bold tabular-nums">
        {value} {icon}
      </p>
    </div>
  );
}

function AdaptiveMeter({ level, className }: { level: Difficulty; className?: string }) {
  const idx = LEVELS.indexOf(level);
  return (
    <div className={cn("rounded-xl border bg-card px-3 py-2 shadow-card", className)} aria-label={`Adaptive difficulty: ${level}`}>
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Level</p>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold capitalize">{level}</span>
        <span className="flex items-end gap-0.5" aria-hidden>
          {LEVELS.map((l, i) => (
            <span key={l} className={cn("w-1.5 rounded-sm", i <= idx ? "bg-primary" : "bg-subtle")} style={{ height: 6 + i * 5 }} />
          ))}
        </span>
      </div>
    </div>
  );
}
