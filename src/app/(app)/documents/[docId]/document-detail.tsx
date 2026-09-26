"use client";

import { ArrowLeft, BookOpen, CheckCircle2, FileText, History, Layers, Lightbulb, Quote, Target } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { SourceLabel } from "@/components/common/labels";
import { TaskBanner } from "@/components/common/task-ui";
import { QuickQuiz } from "@/components/questions/quick-quiz";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDocument, getLesson, questionsForDocument, questionsForTopic } from "@/content";
import { useStore } from "@/lib/store";

export function DocumentDetail({ docId }: { docId: string }) {
  const d = getDocument(docId)!;
  const markViewed = useStore((s) => s.markViewed);
  const tagged = questionsForDocument(docId);
  // Documents without tagged items borrow questions from their related lessons.
  const questions = tagged.length ? tagged : d.relatedLessonIds.flatMap((id) => questionsForTopic(id)).slice(0, 3);

  useEffect(() => {
    markViewed(`document:${docId}`);
  }, [docId, markViewed]);

  return (
    <div>
      <Link href="/documents" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> All documents
      </Link>
      <TaskBanner />

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <SourceLabel source="official" />
          {d.addedIn && <Badge variant="success">Added {d.addedIn}</Badge>}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{d.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {d.author} · {d.year}
        </p>
      </header>

      <section aria-labelledby="need-to-know" className="mb-8 rounded-2xl border border-primary/25 bg-primary-soft/50 p-5 sm:p-6">
        <h2 id="need-to-know" className="flex items-center gap-2 font-semibold text-primary">
          <CheckCircle2 className="size-5" aria-hidden /> What You Need to Know
        </h2>
        <ul className="mt-3 space-y-2">
          {d.whatYouNeedToKnow.map((item) => (
            <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="size-4 text-muted-foreground" aria-hidden /> Historical context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[15px] leading-relaxed">{d.context}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="size-4 text-muted-foreground" aria-hidden /> Main argument
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-lg leading-relaxed">{d.mainArgument}</p>
            </CardContent>
          </Card>

          <section aria-labelledby="quotes">
            <h2 id="quotes" className="mb-3 flex items-center gap-2 text-lg font-semibold tracking-tight">
              <Quote className="size-5 text-muted-foreground" aria-hidden /> Important quotations
            </h2>
            <div className="space-y-3">
              {d.quotes.map((q) => (
                <figure key={q.text} className="rounded-xl border-l-4 border-usgov bg-card p-5 shadow-card">
                  <blockquote className="font-display text-lg leading-relaxed">“{q.text}”</blockquote>
                  <figcaption className="mt-2 text-sm text-muted-foreground">{q.note}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <div className="rounded-xl border bg-success-soft/50 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-success">
              <Target className="size-4" aria-hidden /> AP relevance
            </p>
            <p className="mt-2 text-[15px] leading-relaxed">{d.apRelevance}</p>
          </div>

          {questions.length > 0 && (
            <section aria-labelledby="doc-practice">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 id="doc-practice" className="text-lg font-semibold tracking-tight">
                  Practice questions
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
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="size-4 text-muted-foreground" aria-hidden /> Important ideas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap gap-2">
                {d.keyIdeas.map((k) => (
                  <li key={k} className="rounded-full bg-muted px-3 py-1 text-sm">
                    {k}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Related concepts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="flex flex-wrap gap-2">
                {d.relatedConcepts.map((k) => (
                  <li key={k}>
                    <Link href={`/search?q=${encodeURIComponent(k)}`} className="inline-block rounded-full border px-3 py-1 text-sm transition hover:bg-muted">
                      {k}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="space-y-1 border-t pt-3">
                {d.relatedLessonIds.map((id) => (
                  <Link key={id} href={`/lessons/${id}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition hover:bg-muted">
                    <BookOpen className="size-3.5 text-primary" aria-hidden /> {getLesson(id)?.title}
                  </Link>
                ))}
                {d.relatedDocumentIds.map((id) => (
                  <Link key={id} href={`/documents/${id}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition hover:bg-muted">
                    <FileText className="size-3.5 text-usgov" aria-hidden /> {getDocument(id)?.title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          <Button asChild variant="outline" className="w-full">
            <Link href={`/flashcards/study?card=fc-us-documents-${d.id}`}>
              <Layers /> Study this flashcard
            </Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
