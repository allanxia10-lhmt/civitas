"use client";

import { ArrowRight, CheckCircle2, Clock, ListChecks, LogOut, RotateCcw, Timer, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EmptyState } from "@/components/common/empty-state";
import { TaskBanner } from "@/components/common/task-ui";
import { QuestionCard } from "@/components/questions/question-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress, ProgressRing } from "@/components/ui/progress";
import { getLesson } from "@/content";
import type { ChoiceId, Question } from "@/content/types";
import { useElapsed } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { cn, formatClock, percent } from "@/lib/utils";
import { buildPracticeSet } from "../practice-utils";

interface Result {
  question: Question;
  selected: ChoiceId | null;
  correct: boolean;
}

export function PracticeSession() {
  const params = useSearchParams();
  const router = useRouter();
  const progress = useStore((s) => s.progress);
  const recordAttempt = useStore((s) => s.recordAttempt);
  const logStudy = useStore((s) => s.logStudy);
  const completeTask = useStore((s) => s.completeTask);

  const [questions] = useState(() =>
    buildPracticeSet(
      {
        course: params.get("course"),
        unit: params.get("unit"),
        topic: params.get("topic"),
        difficulty: params.get("difficulty"),
        mode: params.get("mode"),
        question: params.get("question"),
        count: params.get("count"),
      },
      progress,
    ),
  );
  const timedMinutes = Number(params.get("timed")) || 0;
  const taskId = params.get("task");

  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [elapsed] = useElapsed(!finished);
  const finishedRef = useRef(false);

  const remaining = timedMinutes ? timedMinutes * 60 - elapsed : null;

  const finish = (final: Result[]) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFinished(true);
    logStudy(Math.max(1, Math.round(elapsed / 60)), "practice", params.get("topic") ?? params.get("unit") ?? undefined);
    if (taskId && final.length > 0) completeTask(taskId);
  };

  useEffect(() => {
    if (remaining !== null && remaining <= 0 && !finished) {
      const skipped = questions.slice(results.length).map((q) => ({ question: q, selected: null, correct: false }));
      finish([...results, ...skipped]);
      setResults((r) => [...r, ...skipped]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const title = params.get("topic")
    ? getLesson(params.get("topic")!)?.title
    : params.get("mode") === "missed"
      ? "Redo missed questions"
      : params.get("question")
        ? "Practice question"
        : "Practice set";

  if (!questions.length) {
    return (
      <div className="mx-auto max-w-2xl">
        <TaskBanner />
        <EmptyState
          icon={<ListChecks />}
          title={params.get("mode") === "missed" ? "Nothing to redo" : "No questions match"}
          description={
            params.get("mode") === "missed"
              ? "You haven't missed any questions here on your most recent attempts. Nice work."
              : "Try a different unit, topic, or difficulty."
          }
          action={
            <Button asChild>
              <Link href={`/practice${params.get("course") ? `?course=${params.get("course")}` : ""}`}>Back to practice</Link>
            </Button>
          }
        />
      </div>
    );
  }

  if (finished) {
    const correct = results.filter((r) => r.correct).length;
    const pct = percent(correct, questions.length);
    const byTopic = new Map<string, { correct: number; total: number }>();
    for (const r of results) {
      const t = byTopic.get(r.question.topicId) ?? { correct: 0, total: 0 };
      t.total++;
      if (r.correct) t.correct++;
      byTopic.set(r.question.topicId, t);
    }
    const missed = results.filter((r) => !r.correct);
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <TaskBanner manual={false} />
        <Card>
          <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:p-8">
            <ProgressRing value={pct} size={120} stroke={11} indicatorClassName={pct >= 70 ? "stroke-success" : pct >= 50 ? "stroke-warning" : "stroke-danger"} label={`${pct}% correct`}>
              <span className="text-3xl font-bold tabular-nums">{pct}%</span>
            </ProgressRing>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">
                {correct} of {questions.length} correct
              </h1>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
                <Clock className="size-4" aria-hidden /> {formatClock(elapsed)} · {Math.round(elapsed / Math.max(1, questions.length))}s per question
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                {missed.length > 0 && (
                  <Button onClick={() => router.push(`/practice/session?course=${questions[0].courseId}&mode=missed&count=${missed.length}`)}>
                    <RotateCcw /> Redo the {missed.length} I missed
                  </Button>
                )}
                <Button asChild variant="outline">
                  <Link href="/dashboard">Back to dashboard</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>By topic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...byTopic.entries()].map(([topicId, t]) => (
              <div key={topicId}>
                <div className="flex justify-between gap-3 text-sm">
                  <Link href={`/lessons/${topicId}`} className="truncate font-medium hover:text-primary">
                    {getLesson(topicId)?.title}
                  </Link>
                  <span className="shrink-0 tabular-nums text-muted-foreground">
                    {t.correct}/{t.total}
                  </span>
                </div>
                <Progress value={t.correct} max={t.total} size="xs" className="mt-1.5" indicatorClassName={t.correct / t.total >= 0.7 ? "bg-success" : "bg-warning"} label="Topic score" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review your answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {results.map((r, i) => (
              <details key={r.question.id} className="group rounded-xl border">
                <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
                  {r.correct ? <CheckCircle2 className="size-5 shrink-0 text-success" aria-label="Correct" /> : <XCircle className="size-5 shrink-0 text-danger" aria-label="Incorrect" />}
                  <span className="line-clamp-1 flex-1 text-sm">
                    <span className="font-semibold">{i + 1}.</span> {r.question.stem}
                  </span>
                  <span className="text-xs text-muted-foreground group-open:hidden">Show</span>
                </summary>
                <div className="border-t p-3">
                  <QuestionCard question={r.question} mode="review" selected={r.selected} className="border-0 p-2 shadow-none sm:p-3" />
                </div>
              </details>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  const q = questions[index];
  return (
    <div className="mx-auto max-w-3xl">
      <TaskBanner manual={false} />
      <div className="mb-4 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{title}</p>
          <div className="mt-2 flex items-center gap-3">
            <Progress value={results.length} max={questions.length} label="Session progress" />
            <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
              {Math.min(index + 1, questions.length)}/{questions.length}
            </span>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold tabular-nums",
            remaining !== null && remaining < 60 ? "bg-danger-soft text-danger" : "bg-muted text-muted-foreground",
          )}
          aria-live={remaining !== null && remaining < 60 ? "polite" : "off"}
          aria-label={remaining !== null ? `${formatClock(remaining)} remaining` : `${formatClock(elapsed)} elapsed`}
        >
          {remaining !== null ? <Timer className="size-4" /> : <Clock className="size-4" />}
          {formatClock(remaining ?? elapsed)}
        </span>
        <Button variant="ghost" size="icon-sm" onClick={() => (results.length ? finish(results) : router.back())} aria-label="End session" title="End session">
          <LogOut />
        </Button>
      </div>

      <QuestionCard
        key={q.id}
        question={q}
        mode="practice"
        keyboard
        number={index + 1}
        onAnswer={(choice, correct, seconds) => {
          recordAttempt({ questionId: q.id, courseId: q.courseId, unitId: q.unitId, topicId: q.topicId, selected: choice, correct, seconds, source: "practice" });
          setResults((r) => [...r, { question: q, selected: choice, correct }]);
          setAnswered(true);
        }}
      />

      {answered && (
        <div className="sticky bottom-20 mt-4 flex justify-end lg:bottom-6">
          <Button
            size="lg"
            className="shadow-lift"
            autoFocus
            onClick={() => {
              setAnswered(false);
              if (index + 1 >= questions.length) finish(results);
              else setIndex(index + 1);
            }}
          >
            {index + 1 >= questions.length ? "See results" : "Next question"} <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}
