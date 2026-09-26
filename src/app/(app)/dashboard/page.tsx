"use client";

import {
  ArrowRight,
  Award,
  CalendarClock,
  CheckCircle2,
  Clock,
  Flame,
  Layers,
  PartyPopper,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { SimpleBarChart } from "@/components/charts/charts";
import { CourseBadge } from "@/components/common/labels";
import { StatCard } from "@/components/common/stat-card";
import { TaskIcon } from "@/components/common/task-ui";
import { TaskRow } from "@/components/plan/task-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress, ProgressRing } from "@/components/ui/progress";
import { getCourse } from "@/content";
import { evaluateAchievements } from "@/lib/achievements";
import { useStudyData } from "@/lib/hooks";
import { courseCompletion, courseMastery } from "@/lib/mastery";
import { buildRecommendations } from "@/lib/recommendations";
import { minutesOn, recentDays, streak, weekMinutes } from "@/lib/stats";
import { buildDailyPlan, currentWeekIndex, examDateFor, isTaskComplete, PHASES, planCompletion } from "@/lib/study-plan";
import { cn, daysBetween, formatDate, formatMinutes, parseDateKey, timeOfDayGreeting } from "@/lib/utils";
import { ACHIEVEMENT_ICONS } from "@/components/common/achievement-icons";

export default function DashboardPage() {
  const { progress, today, plan, mastery, dueCards } = useStudyData();
  const profile = progress.profile;

  const daily = useMemo(() => buildDailyPlan(plan, progress, today, dueCards.length), [plan, progress, today, dueCards.length]);
  const recs = useMemo(() => buildRecommendations(progress, mastery, today).slice(0, 3), [progress, mastery, today]);
  const streakInfo = useMemo(() => streak(progress, today), [progress, today]);
  const achievements = useMemo(() => evaluateAchievements({ progress, mastery, today }), [progress, mastery, today]);

  const nextItem = daily.find((i) => !i.done);
  const dailyMinutes = daily.reduce((s, i) => s + i.task.minutes, 0);
  const doneCount = daily.filter((i) => i.done).length;
  const minutesToday = minutesOn(progress, today);
  const minutesWeek = weekMinutes(progress, today);

  const exams = profile.courses
    .map((c) => ({ courseId: c, date: examDateFor(profile, c), days: daysBetween(today, examDateFor(profile, c)) }))
    .filter((e) => e.days >= 0)
    .sort((a, b) => a.days - b.days);
  const nextExam = exams[0];

  const weekIdx = currentWeekIndex(plan, today);
  const week = plan.weeks[weekIdx];
  const weekDone = week ? week.tasks.filter((t) => isTaskComplete(t, progress)).length : 0;
  const onTrack = planCompletion(plan, progress, weekIdx);
  const completion = courseCompletion(progress, profile.courses);

  const last7 = recentDays(progress, today, 7).map((d) => ({
    label: parseDateKey(d.date).toLocaleDateString("en-US", { weekday: "short" }),
    detail: formatDate(d.date, { weekday: "long", month: "short", day: "numeric" }),
    value: d.minutes,
  }));

  const unlocked = achievements.filter((a) => a.unlocked);
  const nextAchievement = achievements.filter((a) => !a.unlocked).sort((a, b) => b.current / b.goal - a.current / a.goal)[0];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Greeting */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{formatDate(today, { weekday: "long", month: "long", day: "numeric" })}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {timeOfDayGreeting()}, {profile.name || "there"}!
          </h1>
          {week && (
            <p className="mt-2 text-[15px] text-muted-foreground">
              Week {weekIdx + 1} of {plan.weeks.length} ·{" "}
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", PHASES[week.phase].className)}>{PHASES[week.phase].label} phase</span>
            </p>
          )}
        </div>
        {nextItem && (
          <Button asChild size="lg" className="self-start sm:self-auto">
            <Link href={nextItem.task.href}>
              Continue studying <ArrowRight />
            </Link>
          </Button>
        )}
      </header>

      {/* Stats */}
      <section aria-label="Your stats" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={<Flame />}
          tone="streak"
          label="Study streak"
          value={`${streakInfo.current} ${streakInfo.current === 1 ? "day" : "days"}`}
          sub={streakInfo.studiedToday ? `Longest: ${streakInfo.longest} days` : "Study today to keep it going"}
        />
        <StatCard
          icon={<CalendarClock />}
          label="Days until exam"
          value={nextExam ? nextExam.days : "—"}
          sub={nextExam ? `${getCourse(nextExam.courseId)?.shortTitle} · ${formatDate(nextExam.date, { month: "short", day: "numeric" })}` : "Set your exam date in Settings"}
        />
        <StatCard icon={<Target />} tone="success" label="Today's goal" value={`${minutesToday}/${profile.minutesPerDay}`} sub="minutes studied">
          <Progress value={minutesToday} max={profile.minutesPerDay} indicatorClassName="bg-success" label="Today's goal progress" />
        </StatCard>
        <StatCard icon={<Clock />} tone="xp" label="Weekly goal" value={`${minutesWeek}/${profile.weeklyGoalMinutes}`} sub="minutes this week">
          <Progress value={minutesWeek} max={profile.weeklyGoalMinutes} indicatorClassName="bg-xp" label="Weekly goal progress" />
        </StatCard>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Next step */}
          {nextItem ? (
            <section aria-labelledby="next-step" className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-5 shadow-lift sm:p-6">
              <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary-soft blur-2xl" aria-hidden />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                <TaskIcon type={nextItem.task.type} className="size-12 rounded-xl [&_svg]:size-6" />
                <div className="min-w-0 flex-1">
                  <p id="next-step" className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Your next step
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight text-balance">{nextItem.task.title}</h2>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span>{nextItem.task.detail}</span>
                    <span aria-hidden>·</span>
                    <span>{nextItem.task.minutes} minutes</span>
                    {profile.courses.length > 1 && !nextItem.task.id.startsWith("daily-") && <CourseBadge courseId={nextItem.task.courseId} />}
                  </p>
                </div>
                <Button asChild size="lg" className="shrink-0">
                  <Link href={nextItem.task.href}>
                    {nextItem.task.type === "lesson" ? "Start Lesson" : "Start"} <ArrowRight />
                  </Link>
                </Button>
              </div>
            </section>
          ) : (
            <section className="flex items-center gap-4 rounded-2xl border border-success/30 bg-success-soft p-5 sm:p-6">
              <PartyPopper className="size-8 shrink-0 text-success" aria-hidden />
              <div className="flex-1">
                <h2 className="font-semibold">You&apos;re done for today.</h2>
                <p className="text-sm text-muted-foreground">Nice work. If you want a little more, your Smart Review has suggestions below.</p>
              </div>
            </section>
          )}

          {/* Today's plan */}
          <Card>
            <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
              <div>
                <CardTitle className="text-lg">Today&apos;s Study — {formatMinutes(Math.max(dailyMinutes, profile.minutesPerDay))}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {doneCount} of {daily.length} done · built from week {weekIdx + 1} of your plan
                </p>
              </div>
              <ProgressRing value={daily.length ? (doneCount / daily.length) * 100 : 0} size={44} stroke={5} indicatorClassName="stroke-success" label={`${doneCount} of ${daily.length} tasks done`}>
                <span className="text-[11px] font-bold tabular-nums">
                  {doneCount}/{daily.length}
                </span>
              </ProgressRing>
            </CardHeader>
            <CardContent>
              {daily.length ? (
                <ol className="space-y-2">
                  {daily.map((item) => (
                    <TaskRow key={item.task.id} task={item.task} done={item.done} overdue={item.overdue} showCourse={profile.courses.length > 1} />
                  ))}
                </ol>
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">Your plan is complete. Use Smart Review and practice tests to stay sharp.</p>
              )}
            </CardContent>
          </Card>

          {/* Weekly activity */}
          <Card>
            <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
              <div>
                <CardTitle>Study time — last 7 days</CardTitle>
                <p className="text-sm text-muted-foreground">{formatMinutes(last7.reduce((s, d) => s + (d.value ?? 0), 0))} total · daily goal {profile.minutesPerDay} min</p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/progress">
                  Progress <ArrowRight />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={last7} unit="min" caption="Minutes studied per day, last 7 days" goal={profile.minutesPerDay} goalLabel="Daily goal" height={190} />
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Overall progress */}
          <Card>
            <CardHeader>
              <CardTitle>Overall progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-5">
                <ProgressRing value={completion.percent} size={104} stroke={10} label={`${completion.percent}% of lessons complete`}>
                  <span className="text-2xl font-bold tabular-nums">{completion.percent}%</span>
                </ProgressRing>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold">Course completion</p>
                  <p className="text-muted-foreground">
                    {completion.done} of {completion.total} lessons
                  </p>
                  <p className="text-muted-foreground">
                    Plan to date: <span className="font-semibold text-foreground">{onTrack.percent}%</span>
                  </p>
                </div>
              </div>
              <div className="space-y-3 border-t pt-4">
                {profile.courses.map((c) => {
                  const m = courseMastery(mastery, c);
                  return (
                    <Link key={c} href={`/courses/${c}`} className="block rounded-lg transition hover:opacity-80">
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="font-medium">{c === "usgov" ? "AP Gov mastery" : "AP Comparative Gov mastery"}</span>
                        <span className="font-semibold tabular-nums">{m}%</span>
                      </div>
                      <Progress value={m} className="mt-1.5" indicatorClassName={c === "usgov" ? "bg-usgov" : "bg-compgov"} label={`${c} mastery`} />
                    </Link>
                  );
                })}
                <p className="text-xs text-muted-foreground">Mastery covers the whole course, weighted by official unit weightings.</p>
              </div>
            </CardContent>
          </Card>

          {/* Smart review */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" aria-hidden /> What should I study?
              </CardTitle>
              <Link href="/review" className="text-sm font-medium text-primary hover:underline">
                All
              </Link>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recs.map((r) => (
                  <li key={r.id} className="rounded-lg border p-3">
                    <p className="text-sm font-semibold">{r.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{r.reason}</p>
                    <Link href={r.actions[0].href} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                      {r.actions[0].label} <ArrowRight className="size-3" />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* This week */}
          {week && (
            <Card>
              <CardHeader className="pb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">This week in your plan</p>
                <CardTitle className="text-balance">{week.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {weekDone} of {week.tasks.length} tasks
                  </span>
                  <span className="font-semibold tabular-nums">{Math.round((weekDone / Math.max(1, week.tasks.length)) * 100)}%</span>
                </div>
                <Progress value={weekDone} max={week.tasks.length} label="This week's progress" />
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href="/study-plan">
                    View study plan <ArrowRight />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Flashcards + achievements */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            <Link href="/flashcards/study?mode=due" className="group rounded-xl border bg-card p-4 shadow-card transition hover:shadow-lift">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-streak-soft text-streak">
                  <Layers className="size-[18px]" aria-hidden />
                </span>
                <div>
                  <p className="text-xl font-bold tabular-nums">{dueCards.length}</p>
                  <p className="text-xs text-muted-foreground">flashcards due</p>
                </div>
                <ArrowRight className="ml-auto hidden size-4 text-muted-foreground transition group-hover:translate-x-0.5 lg:block" aria-hidden />
              </div>
            </Link>
            <Link href="/progress#achievements" className="group rounded-xl border bg-card p-4 shadow-card transition hover:shadow-lift">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-xp-soft text-xp">
                  <Award className="size-[18px]" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xl font-bold tabular-nums">
                    {unlocked.length}
                    <span className="text-sm font-medium text-muted-foreground">/{achievements.length}</span>
                  </p>
                  <p className="truncate text-xs text-muted-foreground">achievements</p>
                </div>
              </div>
              {nextAchievement && (
                <div className="mt-3 hidden lg:block">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {(() => {
                      const Icon = ACHIEVEMENT_ICONS[nextAchievement.achievement.icon];
                      return <Icon className="size-3.5" aria-hidden />;
                    })()}
                    Next: {nextAchievement.achievement.title}
                  </p>
                  <Progress value={nextAchievement.current} max={nextAchievement.goal} size="xs" className="mt-1.5" indicatorClassName="bg-xp" label="Next achievement progress" />
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>

      <section aria-labelledby="quick-links">
        <h2 id="quick-links" className="sr-only">
          Quick links
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { href: "/practice", label: "Practice questions", icon: CheckCircle2 },
            { href: "/frq", label: "FRQ practice", icon: TrendingUp },
            { href: "/practice-tests", label: "Practice tests", icon: Target },
            { href: "/compare", label: "Compare countries", icon: Sparkles },
          ].map((q) => (
            <Link key={q.href} href={q.href} className="flex items-center gap-2 rounded-xl border bg-card px-4 py-3 text-sm font-medium shadow-card transition hover:border-primary/30">
              <q.icon className="size-4 text-primary" aria-hidden /> {q.label}
            </Link>
          ))}
        </div>
      </section>

      <p className="text-center text-xs text-muted-foreground">
        <Badge variant="neutral" className="mr-1">
          Practice
        </Badge>
        Questions and FRQs on Civitas are original practice material, not official College Board questions.
      </p>
    </div>
  );
}
