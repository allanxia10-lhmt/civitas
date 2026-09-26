"use client";

import { ArrowRight, BookOpen, CalendarClock, ClipboardCheck, Layers, PenLine, RotateCcw, Sparkles, TrendingDown } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CourseBadge } from "@/components/common/labels";
import { PageHeader } from "@/components/common/page-header";
import { TaskBanner } from "@/components/common/task-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Segmented } from "@/components/ui/misc";
import { Progress } from "@/components/ui/progress";
import { FRQ_TYPES, getLesson } from "@/content";
import type { CourseId, FrqType } from "@/content/types";
import { useStudyData } from "@/lib/hooks";
import { buildRecommendations, type Recommendation, type RecommendationKind } from "@/lib/recommendations";
import { isHard } from "@/lib/srs";
import { addDays, cn, daysBetween, isoToDateKey, percent } from "@/lib/utils";

const KIND_ICON: Record<RecommendationKind, typeof BookOpen> = {
  missed: RotateCcw,
  "low-mastery": TrendingDown,
  frq: PenLine,
  flashcards: Layers,
  refresh: CalendarClock,
  "next-lesson": BookOpen,
  test: ClipboardCheck,
};

export function SmartReview() {
  const { progress, mastery, today, dueCards } = useStudyData();
  const params = useSearchParams();
  const router = useRouter();
  const courseParam = params.get("course") as CourseId | null;
  const filter: CourseId | "all" = courseParam === "usgov" || courseParam === "compgov" ? courseParam : "all";
  const recs = useMemo(() => buildRecommendations(progress, mastery, today, filter === "all" ? undefined : filter), [progress, mastery, today, filter]);
  const [top, ...rest] = recs;

  // Signals
  const weekAgo = addDays(today, -7);
  const missedWeek = new Map<string, number>();
  for (const a of progress.attempts) if (!a.correct && isoToDateKey(a.at) >= weekAgo) missedWeek.set(a.topicId, (missedWeek.get(a.topicId) ?? 0) + 1);
  const topMissed = [...missedWeek.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4);
  const lowest = [...mastery.values()].filter((m) => m.attempts >= 3 && (filter === "all" || m.courseId === filter)).sort((a, b) => a.score - b.score).slice(0, 4);
  const frqByType = new Map<FrqType, { e: number; p: number }>();
  for (const s of progress.frqSubmissions) {
    const v = frqByType.get(s.type) ?? { e: 0, p: 0 };
    frqByType.set(s.type, { e: v.e + s.earned, p: v.p + s.possible });
  }
  const hardDue = dueCards.filter((c) => isHard(progress.flashcards[c.id])).length;
  const stale = [...mastery.values()]
    .filter((m) => m.lessonDone && m.lastActivity)
    .sort((a, b) => (a.lastActivity! < b.lastActivity! ? -1 : 1))
    .slice(0, 3);

  return (
    <div>
      <TaskBanner />
      <PageHeader
        eyebrow={
          <>
            <Sparkles className="size-4 text-primary" /> Smart Review
          </>
        }
        title="What should I study?"
        description="Suggestions ranked from your own data: recent answers, mastery, flashcards, FRQ results, and time since you last reviewed each topic."
        actions={
          progress.profile.courses.length > 1 ? (
            <Segmented
              ariaLabel="Course"
              value={filter}
              onChange={(v) => router.replace(v === "all" ? "/review" : `/review?course=${v}`, { scroll: false })}
              options={[
                { value: "all", label: "Both" },
                { value: "usgov", label: "U.S. Gov" },
                { value: "compgov", label: "Comp Gov" },
              ]}
            />
          ) : undefined
        }
      />

      {top && <TopPick rec={top} />}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section aria-labelledby="more-recs">
          <h2 id="more-recs" className="mb-3 text-lg font-semibold tracking-tight">
            More suggestions
          </h2>
          <ul className="space-y-3">
            {rest.map((r) => {
              const Icon = KIND_ICON[r.kind];
              return (
                <li key={r.id} className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-card sm:flex-row sm:items-center">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-2 font-semibold">
                      {r.title}
                      {r.courseId && progress.profile.courses.length > 1 && <CourseBadge courseId={r.courseId} />}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{r.reason}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {r.actions.map((a, i) => (
                      <Button key={a.href} asChild size="sm" variant={i === 0 ? "default" : "outline"}>
                        <Link href={a.href}>{a.label}</Link>
                      </Button>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <aside aria-labelledby="signals" className="space-y-4">
          <h2 id="signals" className="text-lg font-semibold tracking-tight">
            What we looked at
          </h2>
          <Signal title="Missed this week">
            {topMissed.length === 0 ? (
              <Empty>No misses in the last 7 days.</Empty>
            ) : (
              topMissed.map(([t, n]) => <Row key={t} label={getLesson(t)?.title ?? t} value={`${n} missed`} />)
            )}
          </Signal>
          <Signal title="Lowest mastery">
            {lowest.length === 0 ? (
              <Empty>Answer a few more questions to see this.</Empty>
            ) : (
              lowest.map((m) => (
                <div key={m.topicId} className="py-1">
                  <Row label={getLesson(m.topicId)!.title} value={`${m.score}%`} />
                  <Progress value={m.score} size="xs" className="mt-1" indicatorClassName={m.score < 50 ? "bg-danger" : "bg-warning"} label="Mastery" />
                </div>
              ))
            )}
          </Signal>
          <Signal title="Flashcards">
            <Row label="Due today" value={String(dueCards.length)} />
            <Row label="Due and marked Hard/Again" value={String(hardDue)} />
          </Signal>
          <Signal title="FRQ performance (estimated)">
            {frqByType.size === 0 ? (
              <Empty>No FRQs submitted yet.</Empty>
            ) : (
              [...frqByType.entries()].map(([t, v]) => (
                <div key={t} className="py-1">
                  <Row label={`${FRQ_TYPES[t].name} (${FRQ_TYPES[t].course === "usgov" ? "U.S." : "Comp"})`} value={`${percent(v.e, v.p)}%`} />
                  <Progress value={v.e} max={v.p} size="xs" className="mt-1" indicatorClassName={percent(v.e, v.p) >= 70 ? "bg-success" : "bg-warning"} label="FRQ estimate" />
                </div>
              ))
            )}
          </Signal>
          <Signal title="Longest since review">
            {stale.length === 0 ? <Empty>Complete a lesson to start tracking.</Empty> : stale.map((m) => <Row key={m.topicId} label={getLesson(m.topicId)!.title} value={`${daysBetween(m.lastActivity!, today)}d ago`} />)}
          </Signal>
        </aside>
      </div>
    </div>
  );
}

function TopPick({ rec }: { rec: Recommendation }) {
  const Icon = KIND_ICON[rec.kind];
  return (
    <section aria-labelledby="top-pick" className="relative overflow-hidden rounded-2xl border border-primary/25 bg-card p-6 shadow-lift sm:p-7">
      <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary-soft blur-2xl" aria-hidden />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Icon className="size-7" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p id="top-pick" className="text-xs font-semibold uppercase tracking-wider text-primary">
            Top recommendation · about {rec.minutes} min
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-balance">{rec.title}</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{rec.reason}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          {rec.actions.map((a, i) => (
            <Button key={a.href} asChild size={i === 0 ? "lg" : "default"} variant={i === 0 ? "default" : "outline"}>
              <Link href={a.href}>
                {a.label} {i === 0 && <ArrowRight />}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Signal({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">{children}</CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className="truncate">{label}</span>
      <span className={cn("shrink-0 font-semibold tabular-nums")}>{value}</span>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
