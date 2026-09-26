"use client";

import { ArrowRight, BookOpen, CheckCircle2, Circle, CircleDashed, ExternalLink, Globe2, Landmark, ListChecks, PenLine } from "lucide-react";
import Link from "next/link";
import { SourceLabel } from "@/components/common/labels";
import { MasteryPill } from "@/components/common/mastery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FRQ_TYPES, getCourse, lessonsForUnit, unitsForCourse } from "@/content";
import type { CourseId } from "@/content/types";
import { useStudyData } from "@/lib/hooks";
import { courseMastery, statusFor, unitCompletion, unitMastery } from "@/lib/mastery";
import { cn, formatDate } from "@/lib/utils";

export function CourseOverview({ courseId }: { courseId: CourseId }) {
  const { progress, mastery } = useStudyData();
  const course = getCourse(courseId)!;
  const units = unitsForCourse(courseId);
  const Icon = courseId === "usgov" ? Landmark : Globe2;
  const overall = courseMastery(mastery, courseId);
  const enrolled = progress.profile.courses.includes(courseId);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border bg-card shadow-card">
        <div className={cn("h-1.5", courseId === "usgov" ? "bg-usgov" : "bg-compgov")} />
        <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <span className={cn("inline-flex size-11 items-center justify-center rounded-xl", courseId === "usgov" ? "bg-usgov-soft text-usgov" : "bg-compgov-soft text-compgov")}>
              <Icon className="size-5" aria-hidden />
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{course.title}</h1>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{course.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild>
                <Link href={`/courses/${courseId}/lessons`}>
                  <BookOpen /> Browse lessons
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/practice?course=${courseId}`}>
                  <ListChecks /> Practice
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/frq?course=${courseId}`}>
                  <PenLine /> FRQs
                </Link>
              </Button>
            </div>
            {!enrolled && (
              <p className="mt-4 text-sm text-muted-foreground">
                This course isn&apos;t in your study plan.{" "}
                <Link href="/settings#plan" className="font-medium text-primary hover:underline">
                  Add it in Settings
                </Link>
              </p>
            )}
          </div>
          <div className="rounded-xl bg-muted/60 p-5 lg:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Exam format</h2>
              <SourceLabel source="official" />
            </div>
            <ul className="mt-3 space-y-3">
              {course.exam.sections.map((s) => (
                <li key={s.name} className="text-sm">
                  <div className="flex justify-between gap-2 font-medium">
                    <span>{s.name}</span>
                    <span className="shrink-0 tabular-nums">
                      {s.minutes} min · {s.weight}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              FRQ types: {course.exam.frqTypes.map((t) => FRQ_TYPES[t].name).join(", ")}.
              {course.exam.nextExamLabel && <> Next exam: {course.exam.nextExamLabel}.</>} Fully digital (Bluebook).
            </p>
            <a href={course.framework.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              AP Central · verified {formatDate(course.framework.verifiedOn, { month: "short", day: "numeric", year: "numeric" })} <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </section>

      {course.framework.notes.length > 0 && (
        <section aria-labelledby="updates" className="rounded-xl border border-success/25 bg-success-soft/50 p-5">
          <h2 id="updates" className="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="size-4 text-success" aria-hidden /> What&apos;s current for {course.framework.schoolYear}
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {course.framework.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="units">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 id="units" className="text-xl font-semibold tracking-tight">
              Units
            </h2>
            <p className="text-sm text-muted-foreground">Organized by the five units of the official course framework. Weightings are official.</p>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-2xl font-bold tabular-nums">{overall}%</p>
            <p className="text-xs text-muted-foreground">course mastery</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {units.map((u) => {
            const comp = unitCompletion(progress, u.id);
            const m = unitMastery(mastery, u.id);
            const lessons = lessonsForUnit(u.id);
            return (
              <Card key={u.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Unit {u.number}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground" title="Official exam weighting">
                      {u.examWeight} of exam
                    </span>
                  </div>
                  <CardTitle className="text-lg">{u.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{u.description}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lessons</span>
                        <span className="font-semibold tabular-nums">
                          {comp.done}/{comp.total}
                        </span>
                      </div>
                      <Progress value={comp.percent} size="xs" className="mt-1.5" label={`Unit ${u.number} completion`} />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mastery</span>
                        <span className="font-semibold tabular-nums">{m}%</span>
                      </div>
                      <Progress value={m} size="xs" className="mt-1.5" indicatorClassName="bg-success" label={`Unit ${u.number} mastery`} />
                    </div>
                  </div>
                  <ul className="mb-4 space-y-1">
                    {lessons.map((l) => {
                      const lp = progress.lessons[l.id];
                      const tm = mastery.get(l.id);
                      return (
                        <li key={l.id}>
                          <Link href={`/lessons/${l.id}`} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition hover:bg-muted">
                            {lp?.completedAt ? (
                              <CheckCircle2 className="size-4 shrink-0 text-success" aria-label="Completed" />
                            ) : lp?.startedAt ? (
                              <CircleDashed className="size-4 shrink-0 text-primary" aria-label="In progress" />
                            ) : (
                              <Circle className="size-4 shrink-0 text-muted-foreground/60" aria-label="Not started" />
                            )}
                            <span className="flex-1 truncate">{l.title}</span>
                            {tm && tm.status !== "not-started" && <MasteryPill status={statusFor(tm.score, true)} />}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-auto flex gap-2">
                    <Button asChild size="sm" variant="secondary">
                      <Link href={`/practice/session?course=${courseId}&unit=${u.id}&count=10`}>
                        Practice unit <ArrowRight />
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/flashcards/study?course=${courseId}&unit=${u.id}`}>Flashcards</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
