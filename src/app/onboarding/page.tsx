"use client";

import { ArrowLeft, ArrowRight, Check, Clock, Globe2, Landmark, Layers, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { getCourse } from "@/content";
import type { CourseId } from "@/content/types";
import { useStore } from "@/lib/store";
import { generateStudyPlan, PHASES, PHASE_ORDER } from "@/lib/study-plan";
import { cn, daysBetween, formatDate, formatMinutes, toDateKey } from "@/lib/utils";

type CourseChoice = "usgov" | "compgov" | "both";

const TIME_OPTIONS = [
  { value: 15, label: "15 minutes/day", hint: "A steady, light pace" },
  { value: 30, label: "30 minutes/day", hint: "Most popular" },
  { value: 45, label: "45 minutes/day", hint: "Room for FRQs every week" },
  { value: 60, label: "60+ minutes/day", hint: "Intensive preparation" },
];

const CONFIDENCE = [
  { value: 1, label: "Just starting", hint: "New to most of the material" },
  { value: 2, label: "Some familiarity", hint: "I've seen a few topics" },
  { value: 3, label: "Getting there", hint: "Comfortable with the basics" },
  { value: 4, label: "Fairly confident", hint: "I know most topics" },
  { value: 5, label: "Very confident", hint: "I mainly need practice" },
];

const STEPS = ["Course", "Exam date", "Study time", "Confidence", "Your plan"];

export default function OnboardingPage() {
  const router = useRouter();
  const init = useStore((s) => s.init);
  const hydrated = useStore((s) => s.hydrated);
  const existing = useStore((s) => s.progress.profile);
  const completeOnboarding = useStore((s) => s.completeOnboarding);
  const loadDemo = useStore((s) => s.loadDemo);

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [choice, setChoice] = useState<CourseChoice | null>(null);
  const [dates, setDates] = useState<Partial<Record<CourseId, string>>>({
    usgov: getCourse("usgov")?.exam.nextExamDate,
    compgov: getCourse("compgov")?.exam.nextExamDate,
  });
  const [minutes, setMinutes] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    void init();
  }, [init]);

  const courses: CourseId[] = choice === "both" ? ["usgov", "compgov"] : choice ? [choice] : [];
  const today = toDateKey();

  const preview = useMemo(() => {
    if (!courses.length || !minutes || !confidence) return null;
    const profile = {
      name,
      courses,
      examDates: dates,
      minutesPerDay: minutes,
      confidence,
      planStartDate: today,
      weeklyGoalMinutes: minutes * 5,
      onboarded: true,
      isDemo: false,
      createdAt: new Date().toISOString(),
    };
    return generateStudyPlan(profile);
  }, [choice, dates, minutes, confidence, today]); // `courses` and `name` derive from these or don't affect the plan

  const canContinue =
    (step === 0 && !!choice) ||
    (step === 1 && courses.every((c) => dates[c] && dates[c]! > today)) ||
    (step === 2 && !!minutes) ||
    (step === 3 && !!confidence) ||
    step === 4;

  const next = () => {
    if (step === 3) {
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
        setStep(4);
      }, 900);
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const finish = () => {
    completeOnboarding({ name, courses, examDates: dates, minutesPerDay: minutes!, confidence: confidence! });
    router.push("/dashboard");
  };

  const replacingRealData = hydrated && existing.onboarded && !existing.isDemo;

  return (
    <div className="min-h-dvh bg-background">
      <header className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
        <Logo href="/" />
        <button
          onClick={() => {
            loadDemo();
            router.push("/dashboard");
          }}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Skip — explore the demo
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-4 sm:px-6">
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs font-medium text-muted-foreground">
            <span>
              Step {step + 1} of {STEPS.length}
            </span>
            <span>{STEPS[step]}</span>
          </div>
          <Progress value={((step + 1) / STEPS.length) * 100} label="Onboarding progress" />
        </div>

        {replacingRealData && step === 0 && (
          <div className="mb-6 rounded-xl border border-warning/30 bg-warning-soft px-4 py-3 text-sm text-warning">
            You already have a study plan. Finishing setup will start a fresh plan and replace your current progress on this device.
          </div>
        )}

        {generating ? (
          <div className="flex flex-col items-center py-24 text-center animate-fade-in" role="status">
            <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
            <p className="mt-4 text-lg font-semibold">Building your study plan…</p>
            <p className="mt-1 text-sm text-muted-foreground">Working backward from your exam date.</p>
          </div>
        ) : (
          <div key={step} className="animate-slide-up">
            {step === 0 && (
              <section aria-labelledby="q-course">
                <h1 id="q-course" className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Which course are you taking?
                </h1>
                <p className="mt-2 text-muted-foreground">We&apos;ll tailor lessons, practice, and your plan to your exam.</p>
                <div className="mt-6 grid gap-3" role="radiogroup" aria-labelledby="q-course">
                  {(
                    [
                      { value: "usgov", title: "AP U.S. Government", body: "Foundations, branches, liberties, beliefs, participation.", icon: Landmark, tone: "bg-usgov-soft text-usgov" },
                      { value: "compgov", title: "AP Comparative Government", body: "UK, Mexico, Nigeria, Russia, China, and Iran.", icon: Globe2, tone: "bg-compgov-soft text-compgov" },
                      { value: "both", title: "Both", body: "One combined plan that interleaves the two courses.", icon: Layers, tone: "bg-primary-soft text-primary" },
                    ] as const
                  ).map((o) => (
                    <ChoiceCard key={o.value} selected={choice === o.value} onSelect={() => setChoice(o.value)} title={o.title} body={o.body} icon={<o.icon className="size-5" />} tone={o.tone} />
                  ))}
                </div>
                <div className="mt-8 max-w-sm">
                  <Label htmlFor="name">What should we call you? (optional)</Label>
                  <Input id="name" className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" autoComplete="given-name" />
                </div>
              </section>
            )}

            {step === 1 && (
              <section aria-labelledby="q-date">
                <h1 id="q-date" className="text-2xl font-bold tracking-tight sm:text-3xl">
                  When is your AP Exam?
                </h1>
                <p className="mt-2 text-muted-foreground">We&apos;ve filled in the official 2027 dates published by College Board. Adjust them if your school tells you otherwise.</p>
                <div className="mt-6 grid gap-4">
                  {courses.map((c) => {
                    const course = getCourse(c)!;
                    const d = dates[c];
                    const days = d ? daysBetween(today, d) : 0;
                    return (
                      <div key={c} className="rounded-xl border bg-card p-5 shadow-card">
                        <Label htmlFor={`date-${c}`} className="text-base font-semibold">
                          {course.title}
                        </Label>
                        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                          <Input
                            id={`date-${c}`}
                            type="date"
                            className="sm:max-w-56"
                            value={d ?? ""}
                            min={today}
                            onChange={(e) => setDates((prev) => ({ ...prev, [c]: e.target.value }))}
                          />
                          {d && days > 0 && (
                            <p className="text-sm text-muted-foreground">
                              <span className="font-semibold text-foreground">{days} days</span> from today · about {Math.ceil(days / 7)} weeks
                            </p>
                          )}
                          {d && days <= 0 && <p className="text-sm text-danger">Choose a future date.</p>}
                        </div>
                        {course.exam.nextExamLabel && (
                          <p className="mt-2 text-xs text-muted-foreground">Official date: {course.exam.nextExamLabel} (AP Central, verified {formatDate(course.framework.verifiedOn, { month: "long", day: "numeric", year: "numeric" })}).</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {step === 2 && (
              <section aria-labelledby="q-time">
                <h1 id="q-time" className="text-2xl font-bold tracking-tight sm:text-3xl">
                  How much time can you study?
                </h1>
                <p className="mt-2 text-muted-foreground">Plans assume about six study days a week. You can change this anytime.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-labelledby="q-time">
                  {TIME_OPTIONS.map((o) => (
                    <ChoiceCard key={o.value} selected={minutes === o.value} onSelect={() => setMinutes(o.value)} title={o.label} body={o.hint} icon={<Clock className="size-5" />} tone="bg-primary-soft text-primary" />
                  ))}
                </div>
              </section>
            )}

            {step === 3 && (
              <section aria-labelledby="q-confidence">
                <h1 id="q-confidence" className="text-2xl font-bold tracking-tight sm:text-3xl">
                  What is your current confidence?
                </h1>
                <p className="mt-2 text-muted-foreground">Higher confidence shortens the Learn phase and adds more applied practice.</p>
                <div className="mt-6 grid grid-cols-5 gap-2" role="radiogroup" aria-labelledby="q-confidence">
                  {CONFIDENCE.map((o) => (
                    <button
                      key={o.value}
                      role="radio"
                      aria-checked={confidence === o.value}
                      aria-label={`${o.value} — ${o.label}`}
                      onClick={() => setConfidence(o.value)}
                      className={cn(
                        "flex aspect-square flex-col items-center justify-center rounded-xl border bg-card text-2xl font-bold shadow-card transition hover:border-primary/50 sm:aspect-auto sm:h-24",
                        confidence === o.value && "border-primary bg-primary-soft text-primary ring-2 ring-primary/20",
                      )}
                    >
                      {o.value}
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Just starting</span>
                  <span>Very confident</span>
                </div>
                {confidence && (
                  <p className="mt-5 rounded-lg bg-muted px-4 py-3 text-sm">
                    <span className="font-semibold">{CONFIDENCE[confidence - 1].label}:</span> {CONFIDENCE[confidence - 1].hint}.
                  </p>
                )}
              </section>
            )}

            {step === 4 && preview && (
              <section aria-labelledby="q-plan">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-sm font-semibold text-success">
                  <Check className="size-4" /> Your plan is ready
                </p>
                <h1 id="q-plan" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  {preview.weeks.length} weeks to exam day
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {formatDate(preview.start, { month: "long", day: "numeric" })} – {formatDate(preview.end, { month: "long", day: "numeric", year: "numeric" })} ·{" "}
                  {preview.totalTasks} tasks · about {formatMinutes(preview.totalMinutes / preview.weeks.length)} per week
                </p>

                <div className="mt-6 overflow-hidden rounded-xl border bg-card shadow-card">
                  <div className="flex h-3">
                    {PHASE_ORDER.map((p) => {
                      const n = preview.weeks.filter((w) => w.phase === p).length;
                      return n ? <div key={p} className={cn(PHASES[p].dot)} style={{ flex: n }} title={`${PHASES[p].label}: ${n} weeks`} /> : null;
                    })}
                  </div>
                  <ul className="divide-y">
                    {PHASE_ORDER.map((p) => {
                      const weeks = preview.weeks.filter((w) => w.phase === p);
                      if (!weeks.length) return null;
                      return (
                        <li key={p} className="flex items-start gap-4 px-5 py-4">
                          <span className={cn("mt-1 size-2.5 shrink-0 rounded-full", PHASES[p].dot)} aria-hidden />
                          <div className="flex-1">
                            <p className="font-semibold">
                              Phase {PHASES[p].number} — {PHASES[p].label}
                              <span className="ml-2 text-sm font-normal text-muted-foreground">
                                {weeks.length} {weeks.length === 1 ? "week" : "weeks"} · {formatDate(weeks[0].start)} – {formatDate(weeks[weeks.length - 1].end)}
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground">{PHASES[p].description}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-6 rounded-xl border bg-card p-5 shadow-card">
                  <p className="text-sm font-semibold">Week 1 — {preview.weeks[0].title}</p>
                  <ul className="mt-3 space-y-2">
                    {preview.weeks[0].tasks.slice(0, 5).map((t) => (
                      <li key={t.id} className="flex items-center justify-between gap-3 text-sm">
                        <span className="truncate">{t.title}</span>
                        <span className="shrink-0 text-muted-foreground">{t.minutes} min</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            <div className="mt-10 flex items-center justify-between gap-3">
              {step > 0 ? (
                <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                  <ArrowLeft /> Back
                </Button>
              ) : (
                <Button asChild variant="ghost">
                  <Link href="/">
                    <ArrowLeft /> Home
                  </Link>
                </Button>
              )}
              {step < 4 ? (
                <Button size="lg" onClick={next} disabled={!canContinue}>
                  {step === 3 ? (
                    <>
                      <Sparkles /> Generate my plan
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight />
                    </>
                  )}
                </Button>
              ) : (
                <Button size="lg" onClick={finish}>
                  Go to my dashboard <ArrowRight />
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ChoiceCard({
  selected,
  onSelect,
  title,
  body,
  icon,
  tone,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  body: string;
  icon: React.ReactNode;
  tone: string;
}) {
  return (
    <button
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex items-center gap-4 rounded-xl border bg-card p-4 text-left shadow-card transition hover:border-primary/50 sm:p-5",
        selected && "border-primary ring-2 ring-primary/20",
      )}
    >
      <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", tone)}>{icon}</span>
      <span className="flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-muted-foreground">{body}</span>
      </span>
      <span className={cn("flex size-5 items-center justify-center rounded-full border-2", selected ? "border-primary bg-primary text-primary-foreground" : "border-input")} aria-hidden>
        {selected && <Check className="size-3" strokeWidth={3} />}
      </span>
    </button>
  );
}
