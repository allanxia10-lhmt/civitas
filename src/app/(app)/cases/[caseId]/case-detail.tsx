"use client";

import { ArrowLeft, BookOpen, Gavel, Layers, Scale, Target } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { CaseConnections } from "@/components/cases/case-diagrams";
import { SourceLabel } from "@/components/common/labels";
import { TaskBanner } from "@/components/common/task-ui";
import { QuickQuiz } from "@/components/questions/quick-quiz";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CASE_CLUSTERS, getCase, getUnit, LESSONS, questionsForCase } from "@/content";
import { useStore } from "@/lib/store";

export function CaseDetail({ caseId }: { caseId: string }) {
  const c = getCase(caseId)!;
  const markViewed = useStore((s) => s.markViewed);
  const unit = getUnit(c.unitId);
  const questions = questionsForCase(caseId);
  const lessons = LESSONS.filter((l) => l.relatedCaseIds?.includes(caseId));

  useEffect(() => {
    markViewed(`case:${caseId}`);
  }, [caseId, markViewed]);

  return (
    <div>
      <Link href="/cases" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> All cases
      </Link>
      <TaskBanner />

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {c.required ? <SourceLabel source="official" /> : <Badge variant="neutral">Supplemental case</Badge>}
          <Badge variant="usgov">{CASE_CLUSTERS[c.cluster].label}</Badge>
          {unit && <span className="text-sm text-muted-foreground">Unit {unit.number}: {unit.shortTitle}</span>}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{c.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {c.year}
          {c.vote && ` · Decided ${c.vote}`}
          {c.amendments.length > 0 && ` · ${c.amendments.join(", ")} Amendment${c.amendments.length > 1 ? "s" : ""}`}
        </p>
        {c.requiredNote && <p className="mt-3 max-w-2xl rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">{c.requiredNote}</p>}
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="rounded-2xl border-l-4 border-primary bg-primary-soft/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Constitutional issue</p>
            <p className="mt-1 font-display text-xl leading-snug">{c.issue}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="size-4 text-muted-foreground" aria-hidden /> Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[15px] leading-relaxed">{c.background}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="size-4 text-muted-foreground" aria-hidden /> Decision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[15px] leading-relaxed">{c.decision}</p>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Scale className="size-4 text-usgov" aria-hidden /> Constitutional principle
              </p>
              <p className="mt-2 text-sm leading-relaxed">{c.principle}</p>
            </div>
            <div className="rounded-xl border bg-success-soft/50 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-success">
                <Target className="size-4" aria-hidden /> AP Gov relevance
              </p>
              <p className="mt-2 text-sm leading-relaxed">{c.apRelevance}</p>
            </div>
          </div>

          {questions.length > 0 && (
            <section aria-labelledby="case-practice">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 id="case-practice" className="text-lg font-semibold tracking-tight">
                  Practice
                </h2>
                <SourceLabel source="practice" />
              </div>
              <QuickQuiz questions={questions} source="practice" />
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Related cases</CardTitle>
              <p className="text-sm text-muted-foreground">How this case connects to others</p>
            </CardHeader>
            <CardContent>
              <CaseConnections caseId={caseId} />
            </CardContent>
          </Card>
          {lessons.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Appears in lessons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {lessons.map((l) => (
                  <Link key={l.id} href={`/lessons/${l.id}`} className="block rounded-lg px-2 py-1.5 text-sm transition hover:bg-muted">
                    {l.title}
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
          <Button asChild variant="outline" className="w-full">
            <Link href={`/flashcards/study?card=fc-us-scotus-${c.id}`}>
              <Layers /> Study this flashcard
            </Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
