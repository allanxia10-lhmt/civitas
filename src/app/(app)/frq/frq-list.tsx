"use client";

import { ArrowRight, Clock, PenLine } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SourceLabel } from "@/components/common/labels";
import { PageHeader } from "@/components/common/page-header";
import { TaskBanner } from "@/components/common/task-ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/misc";
import { FRQ_TYPES, frqsForCourse, getCourse, getUnit } from "@/content";
import type { CourseId, FrqType } from "@/content/types";
import { useStudyData } from "@/lib/hooks";
import { cn, formatDate, isoToDateKey, percent } from "@/lib/utils";

export function FrqList() {
  const { progress } = useStudyData();
  const params = useSearchParams();
  const router = useRouter();
  const courseParam = params.get("course") as CourseId | null;
  const course: CourseId = courseParam === "usgov" || courseParam === "compgov" ? courseParam : progress.profile.courses[0] ?? "usgov";
  const typeFilter = params.get("type") as FrqType | null;
  const types = getCourse(course)!.exam.frqTypes;
  const frqs = frqsForCourse(course).filter((f) => !typeFilter || f.type === typeFilter);

  const setParam = (key: string, value: string | null) => {
    const qs = new URLSearchParams(params.toString());
    if (value) qs.set(key, value);
    else qs.delete(key);
    if (key === "course") qs.delete("type");
    router.replace(`/frq?${qs.toString()}`, { scroll: false });
  };

  return (
    <div>
      <TaskBanner />
      <PageHeader
        eyebrow={<SourceLabel source="practice" />}
        title="Free-response practice"
        description="Read the prompt, start the timer, write, and submit. Then compare your answer with a model response and score yourself against the rubric."
        actions={
          <Segmented
            ariaLabel="Course"
            value={course}
            onChange={(c) => setParam("course", c)}
            options={[
              { value: "usgov", label: "U.S. Gov" },
              { value: "compgov", label: "Comp Gov" },
            ]}
          />
        }
      />

      <section aria-label="FRQ types" className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {types.map((t, i) => {
          const subs = progress.frqSubmissions.filter((s) => s.type === t);
          const avg = subs.length ? percent(subs.reduce((a, s) => a + s.earned, 0), subs.reduce((a, s) => a + s.possible, 0)) : null;
          const active = typeFilter === t;
          return (
            <button
              key={t}
              onClick={() => setParam("type", active ? null : t)}
              aria-pressed={active}
              className={cn("rounded-xl border bg-card p-4 text-left shadow-card transition hover:border-primary/40", active && "border-primary ring-2 ring-primary/20")}
            >
              <p className="text-xs font-semibold text-muted-foreground">Question {i + 1}</p>
              <p className="mt-0.5 font-semibold">{FRQ_TYPES[t].name}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{FRQ_TYPES[t].description}</p>
              <p className="mt-3 text-xs">
                {avg === null ? (
                  <span className="text-muted-foreground">Not attempted yet</span>
                ) : (
                  <span className={cn("font-semibold", avg >= 70 ? "text-success" : "text-warning")}>Avg. estimate {avg}%</span>
                )}
              </p>
            </button>
          );
        })}
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {frqs.map((f) => {
          const subs = progress.frqSubmissions.filter((s) => s.frqId === f.id);
          const best = subs.length ? subs.reduce((a, b) => (b.earned / b.possible > a.earned / a.possible ? b : a)) : null;
          return (
            <article key={f.id} className="flex flex-col rounded-xl border bg-card p-5 shadow-card">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={course === "usgov" ? "usgov" : "compgov"}>{FRQ_TYPES[f.type].name}</Badge>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3.5" aria-hidden /> {f.suggestedMinutes} min
                </span>
                <span className="text-xs text-muted-foreground">· {f.unitIds.map((u) => `Unit ${getUnit(u)?.number}`).join(", ")}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">{f.title}</h2>
              <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{f.intro}</p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <span className="text-xs text-muted-foreground">
                  {best ? `Best estimate ${best.earned}/${best.possible} · ${formatDate(isoToDateKey(best.submittedAt))}` : `${f.parts.length} ${f.parts.length === 1 ? "part" : "parts"}`}
                </span>
                <Button asChild size="sm">
                  <Link href={`/frq/${f.id}`}>
                    {subs.length ? "Write again" : "Start"} <ArrowRight />
                  </Link>
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <PenLine className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        Rubrics here are practice rubrics modeled on the published task formats. They are not official College Board scoring guidelines, and estimated scores are not official AP scores. See AP Central for released questions and official scoring guidelines.
      </p>
    </div>
  );
}
