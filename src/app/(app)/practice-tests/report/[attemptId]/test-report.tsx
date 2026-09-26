"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, Clock, FileBarChart, Flag, ListChecks, PenLine, Target, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SimpleBarChart } from "@/components/charts/charts";
import { EmptyState } from "@/components/common/empty-state";
import { StatCard } from "@/components/common/stat-card";
import { QuestionCard } from "@/components/questions/question-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Segmented } from "@/components/ui/misc";
import { Progress } from "@/components/ui/progress";
import { FRQ_TYPES, getFrq, getLesson, getPracticeTest, getQuestion, getUnit } from "@/content";
import { estimateFrq, possiblePoints } from "@/lib/frq-grader";
import { useStore } from "@/lib/store";
import { cn, formatClock, formatDate, isoToDateKey, percent } from "@/lib/utils";

export function TestReport({ attemptId }: { attemptId: string }) {
  const attempts = useStore((s) => s.progress.testAttempts);
  const attempt = attempts.find((a) => a.id === attemptId);
  const [view, setView] = useState<"missed" | "all" | "flagged">("missed");

  if (!attempt) {
    return (
      <EmptyState
        icon={<FileBarChart />}
        title="Report not found"
        description="This score report isn't saved on this device."
        action={
          <Button asChild>
            <Link href="/practice-tests">Practice tests</Link>
          </Button>
        }
      />
    );
  }

  const test = getPracticeTest(attempt.testId)!;
  const qids = Object.keys(attempt.answers);
  const items = qids.map((id) => {
    const q = getQuestion(id)!;
    const selected = attempt.answers[id];
    return { q, selected, correct: selected === q.answer };
  });
  const pct = percent(attempt.correct, attempt.total);
  const allowed = (attempt.section !== "frq" ? test.mcqMinutes : 0) + (attempt.section !== "mcq" ? test.frqMinutes : 0);

  const byUnit = new Map<string, { correct: number; total: number }>();
  const byTopic = new Map<string, { correct: number; total: number }>();
  for (const it of items) {
    for (const [map, key] of [
      [byUnit, it.q.unitId],
      [byTopic, it.q.topicId],
    ] as const) {
      const e = map.get(key) ?? { correct: 0, total: 0 };
      e.total++;
      if (it.correct) e.correct++;
      map.set(key, e);
    }
  }
  const unitData = [...byUnit.entries()]
    .sort(([a], [b]) => (getUnit(a)!.number > getUnit(b)!.number ? 1 : -1))
    .map(([id, e]) => ({ label: `Unit ${getUnit(id)!.number}`, detail: getUnit(id)!.title, value: percent(e.correct, e.total) }));
  const weakTopics = [...byTopic.entries()]
    .map(([id, e]) => ({ id, ...e, pct: percent(e.correct, e.total) }))
    .filter((t) => t.pct < 67)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 5);

  const shown = items.filter((it) => (view === "all" ? true : view === "missed" ? !it.correct : attempt.flagged.includes(it.q.id)));
  const frqIds = Object.keys(attempt.frqResponses ?? {});

  return (
    <div className="space-y-6">
      <Link href={`/practice-tests?course=${attempt.courseId}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Practice tests
      </Link>

      <header>
        <p className="text-sm text-muted-foreground">
          Score report · {formatDate(isoToDateKey(attempt.completedAt), { weekday: "long", month: "long", day: "numeric", year: "numeric" })} ·{" "}
          {attempt.mode === "timed" ? "Timed" : "Untimed"}
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{test.title}</h1>
      </header>

      {attempt.total > 0 && (
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Summary">
          <StatCard icon={<Target />} label="MCQ score" value={`${attempt.correct}/${attempt.total}`} sub="raw score" />
          <StatCard icon={<CheckCircle2 />} tone="success" label="Accuracy" value={`${pct}%`} sub={`${attempt.total - attempt.correct} missed`} />
          <StatCard icon={<Clock />} tone="xp" label="Time spent" value={formatClock(attempt.seconds)} sub={`of ${allowed} min allowed`} />
          <StatCard icon={<Flag />} tone="warning" label="Flagged" value={attempt.flagged.length} sub="for review" />
        </section>
      )}

      {attempt.total > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Unit breakdown</CardTitle>
              <p className="text-sm text-muted-foreground">Percent correct by unit</p>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={unitData} unit="%" caption="Percent correct by unit" height={210} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recommended review</CardTitle>
              <p className="text-sm text-muted-foreground">Topics where you got fewer than two-thirds right</p>
            </CardHeader>
            <CardContent>
              {weakTopics.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">No weak topics on this test — great work.</p>
              ) : (
                <ul className="space-y-3">
                  {weakTopics.map((t) => (
                    <li key={t.id} className="flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{getLesson(t.id)?.title}</p>
                        <Progress value={t.correct} max={t.total} size="xs" className="mt-1.5" indicatorClassName="bg-warning" label="Topic score" />
                      </div>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {t.correct}/{t.total}
                      </span>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/lessons/${t.id}`}>Review</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {attempt.total > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Topic breakdown</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr className="border-b">
                  <th scope="col" className="py-2 pr-4 font-semibold">Topic</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Unit</th>
                  <th scope="col" className="py-2 text-right font-semibold">Correct</th>
                </tr>
              </thead>
              <tbody>
                {[...byTopic.entries()].map(([id, e]) => (
                  <tr key={id} className="border-b last:border-0">
                    <td className="py-2 pr-4">
                      <Link href={`/lessons/${id}`} className="hover:text-primary">
                        {getLesson(id)?.title}
                      </Link>
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">{getUnit(getLesson(id)!.unitId)?.number}</td>
                    <td className={cn("py-2 text-right font-semibold tabular-nums", e.correct / e.total >= 0.67 ? "text-success" : "text-warning")}>
                      {e.correct}/{e.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {frqIds.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenLine className="size-4" aria-hidden /> Free response
            </CardTitle>
            <p className="text-sm text-muted-foreground">Estimated points from rubric keywords — not official AP scoring. Open each FRQ to compare against the model answer and self-score.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {frqIds.map((id) => {
              const frq = getFrq(id)!;
              const est = estimateFrq(frq, attempt.frqResponses[id]);
              const pts = est.filter((e) => e.likely).reduce((s, e) => s + e.points, 0);
              return (
                <div key={id} className="flex flex-wrap items-center gap-3 rounded-xl border p-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{FRQ_TYPES[frq.type].name}</p>
                    <p className="truncate text-xs text-muted-foreground">{frq.title}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">
                    ~{pts}/{possiblePoints(frq)}
                  </span>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/frq/${id}`}>
                      Model answer <ArrowRight />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {items.length > 0 && (
        <section aria-labelledby="review-title">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 id="review-title" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <ListChecks className="size-5" aria-hidden /> Review mode
              <Link href={`/mistakes?course=${attempt.courseId}`} className="ml-2 text-sm font-medium text-primary hover:underline">
                Retry misses in Mistake Log →
              </Link>
            </h2>
            <Segmented
              ariaLabel="Which questions to review"
              value={view}
              onChange={setView}
              options={[
                { value: "missed", label: `Missed (${items.filter((i) => !i.correct).length})` },
                { value: "flagged", label: `Flagged (${attempt.flagged.length})` },
                { value: "all", label: `All (${items.length})` },
              ]}
            />
          </div>
          <div className="space-y-2">
            {shown.length === 0 && <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">Nothing here.</p>}
            {shown.map((it) => (
              <details key={it.q.id} className="group rounded-xl border bg-card shadow-card">
                <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
                  {it.correct ? (
                    <CheckCircle2 className="size-5 shrink-0 text-success" aria-label="Correct" />
                  ) : (
                    <XCircle className="size-5 shrink-0 text-danger" aria-label={it.selected ? "Incorrect" : "Unanswered"} />
                  )}
                  <span className="line-clamp-1 flex-1 text-sm">
                    <span className="font-semibold">Q{qids.indexOf(it.q.id) + 1}.</span> {it.q.stem}
                  </span>
                  {!it.selected && <span className="text-xs text-muted-foreground">Skipped</span>}
                </summary>
                <div className="border-t p-3">
                  <QuestionCard question={it.q} mode="review" selected={it.selected} className="border-0 p-2 shadow-none sm:p-3" />
                </div>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
