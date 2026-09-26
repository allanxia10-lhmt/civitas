"use client";

import { BookOpen, CheckCircle2, CircleDashed, Clock, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { EmptyState } from "@/components/common/empty-state";
import { MasteryPill } from "@/components/common/mastery";
import { PageHeader } from "@/components/common/page-header";
import { Input } from "@/components/ui/input";
import { getCourse, lessonsForUnit, unitsForCourse } from "@/content";
import type { CourseId } from "@/content/types";
import { useStudyData } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function LessonCatalog({ courseId }: { courseId: CourseId }) {
  const { progress, mastery } = useStudyData();
  const params = useSearchParams();
  const router = useRouter();
  const course = getCourse(courseId)!;
  const units = unitsForCourse(courseId);
  const unitFilter = params.get("unit") ?? "all";
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = units
    .filter((u) => unitFilter === "all" || u.id === unitFilter)
    .map((u) => ({
      unit: u,
      lessons: lessonsForUnit(u.id).filter((l) => !q || l.title.toLowerCase().includes(q) || l.tags.some((t) => t.toLowerCase().includes(q))),
    }))
    .filter((g) => g.lessons.length);

  return (
    <div>
      <PageHeader
        eyebrow={
          <Link href={`/courses/${courseId}`} className="hover:text-foreground">
            {course.title}
          </Link>
        }
        title="Lessons"
        description="Every topic has a lesson with an overview, key concepts, a deep dive, an example, AP exam connections, common mistakes, a quick check, and practice."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter lessons or concepts" className="pl-9" aria-label="Filter lessons" />
        </div>
        <div className="scrollbar-thin -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter by unit">
          {[{ id: "all", label: "All units" }, ...units.map((u) => ({ id: u.id, label: `Unit ${u.number}` }))].map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={unitFilter === f.id}
              onClick={() => router.replace(f.id === "all" ? `/courses/${courseId}/lessons` : `/courses/${courseId}/lessons?unit=${f.id}`, { scroll: false })}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition",
                unitFilter === f.id ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <EmptyState icon={<BookOpen />} title="No lessons match" description="Try a different word, or clear the filter." />
      ) : (
        <div className="space-y-8">
          {shown.map(({ unit, lessons }) => (
            <section key={unit.id} aria-labelledby={`unit-${unit.id}`}>
              <h2 id={`unit-${unit.id}`} className="mb-3 flex items-baseline gap-2 text-base font-semibold">
                <span className="text-muted-foreground">Unit {unit.number}</span> {unit.title}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {lessons.map((l) => {
                  const lp = progress.lessons[l.id];
                  const m = mastery.get(l.id);
                  return (
                    <Link
                      key={l.id}
                      href={`/lessons/${l.id}`}
                      className="group flex flex-col rounded-xl border bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3.5" aria-hidden /> {l.minutes} min
                        </span>
                        {lp?.completedAt ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
                            <CheckCircle2 className="size-3.5" /> Complete
                          </span>
                        ) : lp?.startedAt ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                            <CircleDashed className="size-3.5" /> In progress
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-2 font-semibold leading-snug tracking-tight group-hover:text-primary">{l.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{l.overview}</p>
                      <div className="mt-auto pt-3">{m && m.status !== "not-started" && <MasteryPill status={m.status} />}</div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
