"use client";

import { ArrowLeft, Clock, GitCompareArrows, Newspaper } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { SourceLabel } from "@/components/common/labels";
import { RichText } from "@/components/common/rich-text";
import { TaskBanner } from "@/components/common/task-ui";
import { QuickQuiz } from "@/components/questions/quick-quiz";
import { Button } from "@/components/ui/button";
import { COUNTRIES, getCountry, questionsForCountry } from "@/content";
import type { CountryId } from "@/content/types";
import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { CountryCode } from "../country-code";

export function CountryDetail({ countryId }: { countryId: string }) {
  const c = getCountry(countryId)!;
  const markViewed = useStore((s) => s.markViewed);
  const questions = questionsForCountry(c.id as CountryId).slice(0, 5);
  const others = COUNTRIES.filter((o) => o.id !== c.id);

  useEffect(() => {
    markViewed(`country:${countryId}`);
  }, [countryId, markViewed]);

  return (
    <div>
      <Link href="/countries" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> All countries
      </Link>
      <TaskBanner />

      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
        <CountryCode code={c.code} className="size-14 text-base" />
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <SourceLabel source="explanation" />
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              <Clock className="size-3" aria-hidden /> Last Updated: {formatDate(c.lastUpdated, { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.name}</h1>
          <p className="mt-1 text-muted-foreground">
            {c.officialName} · {c.regimeLabel}
          </p>
        </div>
      </header>

      <p className="mb-6 max-w-3xl text-[16px] leading-relaxed">{c.summary}</p>

      <section aria-labelledby="facts" className="mb-8 overflow-hidden rounded-xl border bg-card shadow-card">
        <h2 id="facts" className="border-b px-5 py-3 text-sm font-semibold">
          Key facts
        </h2>
        <dl className="divide-y">
          {c.keyFacts.map((f) => (
            <div key={f.label} className="grid gap-1 px-5 py-3 sm:grid-cols-[180px_1fr]">
              <dt className="text-sm text-muted-foreground">{f.label}</dt>
              <dd className="flex items-start gap-2 text-sm font-medium">
                {f.value}
                {f.timeSensitive && (
                  <span className="shrink-0 rounded bg-warning-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning" title="Time-sensitive — verify with a current news source">
                    Time-sensitive
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="border-t bg-muted/40 px-5 py-2.5 text-xs text-muted-foreground">
          Structural facts (institutions, rules) change rarely. Items marked time-sensitive reflect the last update and may have changed — check a current news source.
        </p>
      </section>

      <nav aria-label="Profile sections" className="scrollbar-thin sticky top-16 z-10 -mx-4 mb-6 flex gap-2 overflow-x-auto border-b bg-background/90 px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {[...c.sections.map((s) => ({ id: s.key, title: s.title })), { id: "current", title: "Current Political Issues" }].map((s) => (
          <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full border bg-card px-3 py-1 text-sm transition hover:bg-muted">
            {s.title}
          </a>
        ))}
      </nav>

      <div className="grid gap-4 md:grid-cols-2">
        {c.sections.map((s) => (
          <section key={s.key} id={s.key} aria-labelledby={`${s.key}-t`} className="scroll-mt-32 rounded-xl border bg-card p-5 shadow-card">
            <h2 id={`${s.key}-t`} className="text-lg font-semibold tracking-tight">
              {s.title}
            </h2>
            <RichText text={s.body} className="mt-2 text-sm" />
            {s.bullets && (
              <ul className="mt-3 space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm leading-relaxed">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-compgov" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <section id="current" aria-labelledby="current-t" className="mt-8 scroll-mt-32 rounded-2xl border border-warning/30 bg-warning-soft/40 p-5 sm:p-6">
        <h2 id="current-t" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Newspaper className="size-5 text-warning" aria-hidden /> Current Political Issues
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">As of {formatDate(c.lastUpdated, { month: "long", day: "numeric", year: "numeric" })}. Current events move quickly — confirm details before citing them on the exam.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {c.currentIssues.map((i) => (
            <div key={i.title} className="rounded-xl border bg-card p-4">
              <p className="font-semibold">{i.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{i.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-xl border bg-card p-5 shadow-card">
        <h2 className="flex items-center gap-2 font-semibold">
          <GitCompareArrows className="size-4 text-compgov" aria-hidden /> Compare {c.name} with…
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {others.map((o) => (
            <Button key={o.id} asChild variant="outline" size="sm">
              <Link href={`/compare?c=${c.id},${o.id}`}>{o.name}</Link>
            </Button>
          ))}
        </div>
      </section>

      {questions.length > 0 && (
        <section className="mt-8" aria-labelledby="country-practice">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 id="country-practice" className="text-lg font-semibold tracking-tight">
              Practice: {c.name}
            </h2>
            <SourceLabel source="practice" />
          </div>
          <QuickQuiz questions={questions} source="practice" />
        </section>
      )}
    </div>
  );
}
