"use client";

import { ArrowRight, CheckCircle2, Infinity as InfinityIcon, ListChecks, RotateCcw, Target, Timer } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SourceLabel } from "@/components/common/labels";
import { MasteryPill } from "@/components/common/mastery";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label, NativeSelect } from "@/components/ui/input";
import { Segmented, Switch } from "@/components/ui/misc";
import { lessonsForUnit, questionsForCourse, questionsForTopic, unitsForCourse } from "@/content";
import type { CourseId } from "@/content/types";
import { useStudyData } from "@/lib/hooks";
import { accuracy } from "@/lib/stats";
import { openMistakeCount } from "@/lib/mistakes";

export function PracticeHub() {
  const { progress, mastery } = useStudyData();
  const params = useSearchParams();
  const router = useRouter();
  const courseParam = params.get("course") as CourseId | null;
  const course: CourseId = courseParam === "usgov" || courseParam === "compgov" ? courseParam : progress.profile.courses[0] ?? "usgov";
  const units = unitsForCourse(course);

  const [unit, setUnit] = useState("all");
  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [count, setCount] = useState("10");
  const [mode, setMode] = useState<"all" | "unanswered" | "missed">("all");
  const [timed, setTimed] = useState(false);

  const bank = questionsForCourse(course);
  const acc = accuracy(progress, course);
  const missed = useMemo(() => openMistakeCount(progress, course), [progress, course]);
  const topicOptions = unit === "all" ? [] : lessonsForUnit(unit);

  const start = () => {
    const qs = new URLSearchParams({ course, count });
    if (topic !== "all") qs.set("topic", topic);
    else if (unit !== "all") qs.set("unit", unit);
    if (difficulty !== "all") qs.set("difficulty", difficulty);
    if (mode !== "all") qs.set("mode", mode);
    if (timed) qs.set("timed", String(Math.round(Number(count) * (course === "usgov" ? 1.45 : 1.1))));
    router.push(`/practice/session?${qs.toString()}`);
  };

  return (
    <div>
      <PageHeader
        eyebrow={<SourceLabel source="practice" />}
        title="Practice questions"
        description="AP-style multiple-choice practice with explanations for every answer choice. Every answer updates your topic mastery."
        actions={
          <Segmented
            ariaLabel="Course"
            value={course}
            onChange={(c) => router.replace(`/practice?course=${c}`, { scroll: false })}
            options={[
              { value: "usgov", label: "U.S. Gov" },
              { value: "compgov", label: "Comp Gov" },
            ]}
          />
        }
      />

      <Link
        href="/practice/endless"
        className="group mb-6 flex flex-col gap-4 rounded-2xl border border-primary/25 bg-card p-5 shadow-lift transition hover:border-primary/50 sm:flex-row sm:items-center"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <InfinityIcon className="size-6" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold tracking-tight">Endless Practice</span>
          <span className="block text-sm text-muted-foreground">
            Pick units and Easy, Medium, Hard, or Adaptive, then keep going. When the bank runs out, new questions are generated for your filters.
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Start <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </Link>

      <section aria-label="Practice stats" className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={<ListChecks />} label="Question bank" value={bank.length} sub={`${units.length} units`} />
        <StatCard icon={<CheckCircle2 />} tone="success" label="Answered" value={acc.answered} sub="all time" />
        <StatCard icon={<Target />} tone="xp" label="Accuracy" value={acc.answered ? `${acc.percent}%` : "—"} sub={`${acc.correct} correct`} />
        <Link href={`/mistakes?course=${course}`} className="rounded-xl transition hover:opacity-90" aria-label={`Mistake Log: ${missed} to retry`}>
          <StatCard icon={<RotateCcw />} tone="warning" label="Mistake Log" value={missed} sub="to retry · Second Chance →" className="h-full" />
        </Link>
      </section>

      <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="h-fit lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle>Build a practice set</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="p-unit">Unit</Label>
              <NativeSelect
                id="p-unit"
                className="mt-1.5"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  setTopic("all");
                }}
              >
                <option value="all">All units</option>
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    Unit {u.number}: {u.title}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div>
              <Label htmlFor="p-topic">Topic</Label>
              <NativeSelect id="p-topic" className="mt-1.5" value={topic} onChange={(e) => setTopic(e.target.value)} disabled={unit === "all"}>
                <option value="all">{unit === "all" ? "Choose a unit first" : "All topics in unit"}</option>
                {topicOptions.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="p-diff">Difficulty</Label>
                <NativeSelect id="p-diff" className="mt-1.5" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  <option value="all">Any</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </NativeSelect>
              </div>
              <div>
                <Label htmlFor="p-count">Questions</Label>
                <NativeSelect id="p-count" className="mt-1.5" value={count} onChange={(e) => setCount(e.target.value)}>
                  {["5", "10", "15", "20", "30"].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium" id="p-mode">
                Questions to include
              </p>
              <Segmented
                ariaLabel="Questions to include"
                value={mode}
                onChange={setMode}
                className="w-full [&>button]:flex-1"
                options={[
                  { value: "all", label: "All" },
                  { value: "unanswered", label: "New" },
                  { value: "missed", label: "Missed" },
                ]}
              />
            </div>
            <label className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Timer className="size-4 text-muted-foreground" aria-hidden /> Timed at AP pace
              </span>
              <Switch checked={timed} onCheckedChange={setTimed} aria-label="Timed at AP pace" />
            </label>
            <Button className="w-full" size="lg" onClick={start}>
              Start practice <ArrowRight />
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {units.map((u) => (
            <section key={u.id} aria-labelledby={`pu-${u.id}`}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 id={`pu-${u.id}`} className="font-semibold">
                  <span className="text-muted-foreground">Unit {u.number}</span> {u.title}
                </h2>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/practice/session?course=${course}&unit=${u.id}&count=15`}>Practice unit</Link>
                </Button>
              </div>
              <ul className="divide-y overflow-hidden rounded-xl border bg-card shadow-card">
                {lessonsForUnit(u.id).map((l) => {
                  const m = mastery.get(l.id);
                  const n = questionsForTopic(l.id).length;
                  return (
                    <li key={l.id} className="flex items-center gap-3 px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{l.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {n} questions{m?.attempts ? ` · ${m.correct}/${m.attempts} correct` : ""}
                        </p>
                      </div>
                      {m && <MasteryPill status={m.status} />}
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/practice/session?course=${course}&topic=${l.id}&count=10`} aria-label={`Practice ${l.title}`}>
                          Practice
                        </Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
