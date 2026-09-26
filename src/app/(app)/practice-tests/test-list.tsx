"use client";

import { ArrowRight, ClipboardCheck, Clock, FileBarChart, ListChecks, PenLine } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { EmptyState } from "@/components/common/empty-state";
import { CourseBadge, SourceLabel } from "@/components/common/labels";
import { PageHeader } from "@/components/common/page-header";
import { TaskBanner } from "@/components/common/task-ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/misc";
import { getPracticeTest, PRACTICE_TESTS } from "@/content";
import type { CourseId } from "@/content/types";
import { useStudyData } from "@/lib/hooks";
import { formatClock, formatDate, isoToDateKey, percent } from "@/lib/utils";

const KIND_LABEL = { full: "Full-length", diagnostic: "Diagnostic", sprint: "Section sprint" } as const;

export function TestList() {
  const { progress } = useStudyData();
  const params = useSearchParams();
  const router = useRouter();
  const courseParam = params.get("course") as CourseId | null;
  const course: CourseId = courseParam === "usgov" || courseParam === "compgov" ? courseParam : progress.profile.courses[0] ?? "usgov";
  const tests = PRACTICE_TESTS.filter((t) => t.courseId === course);
  const attempts = [...progress.testAttempts].filter((a) => a.courseId === course).reverse();

  return (
    <div>
      <TaskBanner />
      <PageHeader
        eyebrow={<SourceLabel source="practice" />}
        title="Practice tests"
        description="Full-length exams mirror the official section structure and timing. Take them timed or untimed, by section, and review every answer afterward."
        actions={
          <Segmented
            ariaLabel="Course"
            value={course}
            onChange={(c) => router.replace(`/practice-tests?course=${c}`, { scroll: false })}
            options={[
              { value: "usgov", label: "U.S. Gov" },
              { value: "compgov", label: "Comp Gov" },
            ]}
          />
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {tests.map((t) => (
          <article key={t.id} className="flex flex-col rounded-2xl border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2">
              <Badge variant={t.kind === "full" ? "default" : "neutral"}>{KIND_LABEL[t.kind]}</Badge>
              <CourseBadge courseId={t.courseId} />
            </div>
            <h2 className="mt-3 text-lg font-semibold tracking-tight">{t.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li className="flex items-center gap-2">
                <ListChecks className="size-4 text-muted-foreground" aria-hidden /> {t.mcqIds.length} multiple choice · {t.mcqMinutes} min
              </li>
              {t.frqIds.length > 0 && (
                <li className="flex items-center gap-2">
                  <PenLine className="size-4 text-muted-foreground" aria-hidden /> {t.frqIds.length} free response · {t.frqMinutes} min
                </li>
              )}
            </ul>
            <Button asChild className="mt-5 self-start">
              <Link href={`/practice-tests/${t.id}${params.get("task") ? `?task=${params.get("task")}` : ""}`}>
                Set up test <ArrowRight />
              </Link>
            </Button>
          </article>
        ))}
      </div>

      <section className="mt-10" aria-labelledby="history">
        <h2 id="history" className="mb-3 text-lg font-semibold tracking-tight">
          Score reports
        </h2>
        {attempts.length === 0 ? (
          <EmptyState icon={<FileBarChart />} title="No tests taken yet" description="Your score reports will appear here after you finish a test." />
        ) : (
          <div className="overflow-hidden rounded-xl border bg-card shadow-card">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Test</th>
                  <th scope="col" className="hidden px-4 py-2.5 font-semibold sm:table-cell">Date</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">MCQ score</th>
                  <th scope="col" className="hidden px-4 py-2.5 font-semibold md:table-cell">Time</th>
                  <th scope="col" className="px-4 py-2.5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((a) => (
                  <tr key={a.id} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium">{getPracticeTest(a.testId)?.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {a.mode === "timed" ? "Timed" : "Untimed"} · {a.section === "full" ? "Both sections" : a.section === "mcq" ? "MCQ section" : "FRQ section"}
                      </p>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{formatDate(isoToDateKey(a.completedAt), { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="px-4 py-3 font-semibold tabular-nums">{a.total ? `${a.correct}/${a.total} · ${percent(a.correct, a.total)}%` : "—"}</td>
                    <td className="hidden px-4 py-3 tabular-nums text-muted-foreground md:table-cell">{formatClock(a.seconds)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/practice-tests/report/${a.id}`}>
                          <ClipboardCheck /> Report
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
        <Clock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        College Board doesn&apos;t publish a raw-to-AP-score conversion for practice material, so Civitas reports raw scores and percentages rather than predicting a 1–5 score.
      </p>
    </div>
  );
}
