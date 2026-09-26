"use client";

import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  Globe2,
  Layers,
  Lightbulb,
  ListChecks,
  PenLine,
  Scale,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SourceLabel } from "@/components/common/labels";
import { MasteryPill } from "@/components/common/mastery";
import { RichText } from "@/components/common/rich-text";
import { TaskBanner } from "@/components/common/task-ui";
import { QuickQuiz } from "@/components/questions/quick-quiz";
import { Button } from "@/components/ui/button";
import { getCase, getCountry, getCourse, getDocument, getLesson, getUnit, FRQS, FRQ_TYPES, lessonsForCourse, questionsForTopic, questionsForUnit } from "@/content";
import { useElapsed, useStudyData } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "overview", label: "Quick Overview", icon: Sparkles },
  { id: "concepts", label: "Key Concepts", icon: GraduationCap },
  { id: "deep-dive", label: "Deep Dive", icon: BookOpen },
  { id: "example", label: "Example", icon: Lightbulb },
  { id: "exam", label: "AP Exam Connection", icon: Target },
  { id: "mistakes", label: "Common Mistakes", icon: AlertTriangle },
  { id: "quick-check", label: "Quick Check", icon: CheckCircle2 },
  { id: "practice", label: "Practice", icon: ListChecks },
];

export function LessonView({ lessonId }: { lessonId: string }) {
  const lesson = getLesson(lessonId)!;
  const unit = getUnit(lesson.unitId)!;
  const course = getCourse(lesson.courseId)!;
  const { progress, mastery } = useStudyData();
  const startLesson = useStore((s) => s.startLesson);
  const completeLesson = useStore((s) => s.completeLesson);
  const [elapsed] = useElapsed();
  const [active, setActive] = useState("overview");

  const lp = progress.lessons[lessonId];
  const done = !!lp?.completedAt;
  const m = mastery.get(lessonId);

  const ordered = lessonsForCourse(lesson.courseId);
  const idx = ordered.findIndex((l) => l.id === lessonId);
  const prev = ordered[idx - 1];
  const next = ordered[idx + 1];

  const topicQuestions = questionsForTopic(lessonId);
  const quickCheck = topicQuestions.slice(0, Math.min(5, Math.max(3, topicQuestions.length)));
  const quick = quickCheck.length >= 3 ? quickCheck : [...quickCheck, ...questionsForUnit(lesson.unitId).filter((q) => q.topicId !== lessonId)].slice(0, 3);
  const relatedFrq = FRQS.find((f) => f.unitIds.includes(lesson.unitId));

  useEffect(() => {
    startLesson(lessonId);
    window.scrollTo({ top: 0 });
  }, [lessonId, startLesson]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [lessonId]);

  const markComplete = () => completeLesson(lessonId, Math.max(1, Math.round(elapsed / 60)));

  const CompleteButton = ({ className }: { className?: string }) =>
    done ? (
      <p className={cn("inline-flex items-center gap-2 text-sm font-semibold text-success", className)}>
        <CheckCircle2 className="size-4" /> Lesson complete
      </p>
    ) : (
      <Button onClick={markComplete} className={className}>
        <CheckCircle2 /> Mark lesson complete
      </Button>
    );

  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href={`/courses/${course.id}`} className="hover:text-foreground">
          {course.shortTitle}
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <Link href={`/courses/${course.id}/lessons?unit=${unit.id}`} className="hover:text-foreground">
          Unit {unit.number}: {unit.shortTitle}
        </Link>
      </nav>

      <TaskBanner manual={false} />

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <SourceLabel source="explanation" />
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="size-3.5" aria-hidden /> {lesson.minutes} min
          </span>
          {m && m.status !== "not-started" && <MasteryPill status={m.status} />}
          {done && (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-success">
              <CheckCircle2 className="size-4" /> Completed
            </span>
          )}
        </div>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">{lesson.title}</h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
        <article className="min-w-0 space-y-10">
          <Section id="overview" title="Quick Overview" number={1}>
            <p className="rounded-xl border-l-4 border-primary bg-primary-soft/50 px-5 py-4 text-[17px] leading-relaxed">{lesson.overview}</p>
          </Section>

          <Section id="concepts" title="Key Concepts" number={2}>
            <dl className="grid gap-3 sm:grid-cols-2">
              {lesson.keyConcepts.map((k) => (
                <div key={k.term} className="rounded-xl border bg-card p-4 shadow-card">
                  <dt className="font-semibold">{k.term}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{k.definition}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="deep-dive" title="Deep Dive" number={3}>
            <div className="space-y-6">
              {lesson.deepDive.map((d) => (
                <div key={d.heading}>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight">{d.heading}</h3>
                  <RichText text={d.body} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="example" title="Example" number={4}>
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <p className="flex items-center gap-2 font-semibold">
                <Lightbulb className="size-4 text-warning" aria-hidden /> {lesson.example.heading}
              </p>
              <RichText text={lesson.example.body} className="mt-2" />
            </div>
          </Section>

          <Section id="exam" title="AP Exam Connection" number={5}>
            <RichText text={lesson.examConnection.body} />
            <div className="mt-4 flex gap-3 rounded-xl bg-success-soft p-4">
              <Target className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-success">Exam tip</p>
                <p className="mt-0.5 text-sm leading-relaxed">{lesson.examConnection.tip}</p>
              </div>
            </div>
          </Section>

          <Section id="mistakes" title="Common Mistakes" number={6}>
            <ul className="space-y-3">
              {lesson.commonMistakes.map((cm) => (
                <li key={cm.mistake} className="overflow-hidden rounded-xl border bg-card shadow-card">
                  <p className="flex gap-2.5 border-b bg-danger-soft/50 px-4 py-3 text-sm">
                    <X className="mt-0.5 size-4 shrink-0 text-danger" aria-label="Mistake" />
                    <span className="font-medium">{cm.mistake}</span>
                  </p>
                  <p className="flex gap-2.5 px-4 py-3 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-label="Correction" />
                    <span>{cm.correction}</span>
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="quick-check" title="Quick Check" number={7} aside={<SourceLabel source="practice" />}>
            <p className="mb-4 text-sm text-muted-foreground">{quick.length} questions. Your answers count toward your topic mastery.</p>
            <QuickQuiz questions={quick} finishSlot={!done ? <Button onClick={markComplete}>Mark lesson complete</Button> : undefined} />
          </Section>

          <Section id="practice" title="Practice" number={8}>
            <div className="grid gap-3 sm:grid-cols-2">
              <PracticeLink href={`/practice/session?course=${lesson.courseId}&topic=${lesson.id}&count=10`} icon={<ListChecks />} title="10 AP-style MCQs on this topic" body="Mixed with related unit questions when the topic bank runs out." />
              <PracticeLink href={`/practice/session?course=${lesson.courseId}&unit=${lesson.unitId}&count=15`} icon={<Layers />} title={`Unit ${unit.number} mixed practice`} body="15 questions across every topic in this unit." />
              {relatedFrq && (
                <PracticeLink href={`/frq/${relatedFrq.id}`} icon={<PenLine />} title={`FRQ: ${FRQ_TYPES[relatedFrq.type].name}`} body={relatedFrq.title} />
              )}
              <PracticeLink href={`/flashcards/study?course=${lesson.courseId}&unit=${lesson.unitId}`} icon={<Layers />} title="Unit flashcards" body="Spaced-repetition review of this unit's terms." />
            </div>
            <Related lesson={lesson} />
          </Section>

          <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
            <CompleteButton />
            <div className="flex gap-2">
              {prev && (
                <Button asChild variant="outline">
                  <Link href={`/lessons/${prev.id}`} aria-label={`Previous lesson: ${prev.title}`}>
                    <ArrowLeft /> Previous
                  </Link>
                </Button>
              )}
              {next && (
                <Button asChild variant="outline">
                  <Link href={`/lessons/${next.id}`} aria-label={`Next lesson: ${next.title}`}>
                    Next <ArrowRight />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <nav aria-label="On this page" className="rounded-xl border bg-card p-3 shadow-card">
              <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">On this page</p>
              <ul className="space-y-0.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition",
                        active === s.id ? "bg-primary-soft font-medium text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <s.icon className="size-3.5" aria-hidden /> {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="rounded-xl border bg-card p-4 shadow-card">
              <p className="text-sm font-semibold">Your progress</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {m?.attempts ? `${m.correct} of ${m.attempts} correct · ${m.score}% mastery` : "Answer the Quick Check to start tracking mastery."}
              </p>
              <CompleteButton className="mt-3 w-full" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ id, title, number, children, aside }: { id: string; title: string; number: number; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="flex size-7 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">{number}</span>
        <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight">
          {title}
        </h2>
        {aside && <div className="ml-auto">{aside}</div>}
      </div>
      {children}
    </section>
  );
}

function PracticeLink({ href, icon, title, body }: { href: string; icon: React.ReactNode; title: string; body: string }) {
  return (
    <Link href={href} className="group flex gap-3 rounded-xl border bg-card p-4 shadow-card transition hover:border-primary/30 hover:shadow-lift">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary [&_svg]:size-[18px]">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold group-hover:text-primary">{title}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{body}</span>
      </span>
    </Link>
  );
}

function Related({ lesson }: { lesson: NonNullable<ReturnType<typeof getLesson>> }) {
  const cases = (lesson.relatedCaseIds ?? []).map(getCase).filter(Boolean);
  const docs = (lesson.relatedDocumentIds ?? []).map(getDocument).filter(Boolean);
  const countries = (lesson.relatedCountryIds ?? []).map(getCountry).filter(Boolean);
  if (!cases.length && !docs.length && !countries.length) return null;
  return (
    <div className="mt-6 space-y-3">
      <p className="text-sm font-semibold">Related</p>
      <div className="flex flex-wrap gap-2">
        {cases.map((c) => (
          <Link key={c!.id} href={`/cases/${c!.id}`} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-sm transition hover:bg-muted">
            <Scale className="size-3.5 text-usgov" aria-hidden /> {c!.shortName} ({c!.year})
          </Link>
        ))}
        {docs.map((d) => (
          <Link key={d!.id} href={`/documents/${d!.id}`} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-sm transition hover:bg-muted">
            <FileText className="size-3.5 text-usgov" aria-hidden /> {d!.shortTitle}
          </Link>
        ))}
        {countries.map((c) => (
          <Link key={c!.id} href={`/countries/${c!.id}`} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-sm transition hover:bg-muted">
            <Globe2 className="size-3.5 text-compgov" aria-hidden /> {c!.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
