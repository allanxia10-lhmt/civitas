import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarRange,
  Check,
  CheckCircle2,
  Flame,
  Globe2,
  Landmark,
  Layers,
  ListChecks,
  PenLine,
  Scale,
  ShieldCheck,
  Target,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { CASES, COURSES, DOCUMENTS, FLASHCARDS, FRQS, LESSONS, QUESTIONS, UNITS } from "@/content";
import { PHASES, PHASE_ORDER } from "@/lib/study-plan";
import { cn } from "@/lib/utils";

const stats = [
  { value: LESSONS.length, label: "structured lessons" },
  { value: QUESTIONS.length, label: "AP-style questions" },
  { value: CASES.filter((c) => c.required).length, label: "required SCOTUS cases" },
  { value: DOCUMENTS.length, label: "required documents" },
];

const features = [
  {
    icon: CalendarRange,
    title: "Personalized Study Plans",
    body: "Pick your course, exam date, and daily time. Civitas works backward from test day through five phases — Learn, Practice, Apply, Review, Final Review.",
  },
  {
    icon: ListChecks,
    title: "AP-Style Practice",
    body: `${QUESTIONS.length} original questions with stimulus sets, plus explanations for why every answer choice is right or wrong.`,
  },
  {
    icon: Scale,
    title: "Master Every Supreme Court Case",
    body: "All 14 required cases, plus common comparison cases, with facts, holdings, principles, and a visual map of how they connect.",
  },
  {
    icon: Globe2,
    title: "Compare Governments",
    body: "Profiles for the UK, Mexico, Nigeria, Russia, China, and Iran — and a side-by-side tool that highlights similarities and differences.",
  },
  {
    icon: BarChart3,
    title: "Track Your Progress",
    body: "Mastery scores for every topic, weighted by official unit weightings, with streaks, study time, and accuracy trends.",
  },
  {
    icon: ShieldCheck,
    title: "Prepare With Confidence",
    body: "Timed full-length exams that mirror the official structure, FRQs with rubrics and model answers, and a Smart Review that tells you what to study next.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
          <Logo href="/" />
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex" aria-label="Site">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#courses" className="hover:text-foreground">Courses</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link href="/dashboard">View demo</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/onboarding">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,var(--primary-soft),transparent)]" />
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 text-center sm:px-6 sm:pt-20">
            <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-[13px] font-medium text-muted-foreground shadow-card">
              <span className="size-1.5 rounded-full bg-success" aria-hidden />
              Updated for the 2026–27 AP course frameworks
            </p>
            <h1 className="mx-auto max-w-3xl font-display text-[44px] font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Master AP Government.
              <span className="block italic text-primary">One Day at a Time.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              A structured study platform for AP U.S. Government and AP Comparative Government—with personalized study plans, AP-style practice, FRQs, flashcards, and progress tracking.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/onboarding">
                  Build My Study Plan <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/courses/usgov">Explore Courses</Link>
              </Button>
            </div>
            <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-3xl font-bold tracking-tight tabular-nums">{s.value}</dd>
                  <dd className="text-sm text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Dashboard preview */}
          <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
            <DashboardPreview />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t bg-card/50 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-primary">Everything in one place</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Built around one question: what should I study today?</h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border bg-card p-6 shadow-card transition hover:shadow-lift">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <f.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-primary">How your plan works</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Five phases, sized to your calendar.</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Tell us your exam date and how much time you have. Civitas schedules every lesson, practice set, and FRQ — then adapts review to your weak spots.
              </p>
            </div>
            <ol className="mt-10 grid gap-4 md:grid-cols-5">
              {PHASE_ORDER.map((p) => (
                <li key={p} className="relative rounded-xl border bg-card p-5 shadow-card">
                  <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold", PHASES[p].className)}>Phase {PHASES[p].number}</span>
                  <h3 className="mt-3 font-semibold">{PHASES[p].label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{PHASES[p].description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Courses */}
        <section id="courses" className="border-t bg-card/50 py-20">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
            {COURSES.map((course) => {
              const units = UNITS.filter((u) => u.courseId === course.id);
              const Icon = course.id === "usgov" ? Landmark : Globe2;
              return (
                <div key={course.id} className="flex flex-col rounded-2xl border bg-card p-6 shadow-card sm:p-8">
                  <span className={cn("flex size-11 items-center justify-center rounded-xl", course.id === "usgov" ? "bg-usgov-soft text-usgov" : "bg-compgov-soft text-compgov")}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{course.title}</h3>
                  <p className="mt-2 text-[15px] text-muted-foreground">{course.description}</p>
                  <ul className="mt-5 space-y-2">
                    {units.map((u) => (
                      <li key={u.id} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-bold">{u.number}</span>
                        <span className="flex-1">{u.title}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">{u.examWeight}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs text-muted-foreground">
                    Exam: {course.exam.sections.map((s) => `${s.name.split(": ")[1]} ${s.minutes} min`).join(" · ")}. Unit weightings from College Board.
                  </p>
                  <Button asChild variant="outline" className="mt-6 self-start">
                    <Link href={`/courses/${course.id}`}>
                      Explore {course.shortTitle} <ArrowRight />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Your exam date is set. Your plan can be too.</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Two minutes of setup gives you a week-by-week plan and a clear next step every time you open Civitas.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/onboarding">
                  Build My Study Plan <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/dashboard">Explore the demo dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-start md:justify-between">
          <Logo href="/" />
          <p className="max-w-2xl text-xs leading-relaxed">
            AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, Civitas. Practice questions, FRQs, rubrics, and
            model answers are original materials written for this site — they are not official College Board questions, and estimated scores are not official AP scores.
            Official requirements are labeled and linked to College Board sources. {FLASHCARDS.length} flashcards · {FRQS.length} FRQs.
          </p>
        </div>
      </footer>
    </div>
  );
}

/** A static, illustrative preview of the dashboard for the marketing page. */
function DashboardPreview() {
  const tasks = [
    { icon: BookOpen, title: "Federalism: Dual vs. Cooperative Federalism", meta: "Lesson · 18 min", done: true },
    { icon: ListChecks, title: "10 MCQs: Federalism", meta: "Topic practice · 10 min", done: false },
    { icon: Scale, title: "Supreme Court cases", meta: "McCulloch, Lopez · 10 min", done: false },
    { icon: PenLine, title: "FRQ practice: Concept Application", meta: "20 min", done: false },
  ];
  const mastery = [
    { label: "Federalism", value: 86, cls: "bg-success" },
    { label: "Civil Liberties", value: 64, cls: "bg-warning" },
    { label: "Political Participation", value: 91, cls: "bg-success" },
  ];
  return (
    <div className="rounded-2xl border bg-card p-2 shadow-pop" aria-label="Dashboard preview" role="img">
      <div className="flex items-center gap-1.5 px-3 py-2">
        <span className="size-2.5 rounded-full bg-danger/60" />
        <span className="size-2.5 rounded-full bg-warning/60" />
        <span className="size-2.5 rounded-full bg-success/60" />
      </div>
      <div className="rounded-xl bg-background p-4 text-left sm:p-6">
        <p className="text-sm text-muted-foreground">Wednesday, September 23</p>
        <p className="mt-1 font-display text-2xl font-semibold sm:text-3xl">Good afternoon, Allan!</p>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { icon: Flame, label: "Study streak", value: "8 days", tone: "bg-streak-soft text-streak" },
            { icon: CalendarRange, label: "Until AP U.S. Gov", value: "223 days", tone: "bg-primary-soft text-primary" },
            { icon: Target, label: "Today's goal", value: "45 min", tone: "bg-success-soft text-success" },
            { icon: Layers, label: "Cards due", value: "18", tone: "bg-xp-soft text-xp" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-3 shadow-card">
              <span className={cn("flex size-8 items-center justify-center rounded-lg", s.tone)}>
                <s.icon className="size-4" aria-hidden />
              </span>
              <p className="mt-2 text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          <div className="rounded-xl border bg-card p-4 shadow-card md:col-span-3">
            <p className="text-sm font-semibold">Today&apos;s Study — 45 minutes</p>
            <ul className="mt-3 space-y-2">
              {tasks.map((t) => (
                <li key={t.title} className="flex items-center gap-3 rounded-lg border px-3 py-2">
                  <span className="flex size-7 items-center justify-center rounded-md bg-primary-soft text-primary">
                    <t.icon className="size-3.5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("block truncate text-[13px] font-medium", t.done && "text-muted-foreground line-through")}>{t.title}</span>
                    <span className="block text-[11px] text-muted-foreground">{t.meta}</span>
                  </span>
                  {t.done ? (
                    <CheckCircle2 className="size-4 text-success" aria-hidden />
                  ) : (
                    <span className="rounded-md bg-primary px-2 py-1 text-[11px] font-semibold text-primary-foreground">Start →</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow-card md:col-span-2">
            <p className="text-sm font-semibold">Topic mastery</p>
            <ul className="mt-3 space-y-3">
              {mastery.map((m) => (
                <li key={m.label}>
                  <div className="flex justify-between text-[13px]">
                    <span>{m.label}</span>
                    <span className="font-semibold">{m.value}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted">
                    <div className={cn("h-full rounded-full", m.cls)} style={{ width: `${m.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="size-3.5 text-success" aria-hidden /> Illustrative preview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
