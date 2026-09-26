"use client";

import { BookOpen, CheckCircle2, Clock, Flame, Info, Layers, ListChecks, Lock, PenLine, Sparkles, Target } from "lucide-react";
import { useMemo, useState } from "react";
import { ActivityHeatmap, SimpleBarChart, SimpleLineChart } from "@/components/charts/charts";
import { ACHIEVEMENT_ICONS } from "@/components/common/achievement-icons";
import { MasteryBar } from "@/components/common/mastery";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Segmented } from "@/components/ui/misc";
import { Progress } from "@/components/ui/progress";
import { getLesson, lessonsForCourse, lessonsForUnit, unitsForCourse } from "@/content";
import type { CourseId } from "@/content/types";
import { evaluateAchievements } from "@/lib/achievements";
import { useStudyData } from "@/lib/hooks";
import { courseMastery, MASTERY_LABELS, unitMastery } from "@/lib/mastery";
import { accuracy, flashcardReviews, lessonsCompleted, levelFor, minutesByDay, recentWeeks, streak, totalMinutes, xp } from "@/lib/stats";
import { addDays, cn, formatDate, formatMinutes, startOfWeek } from "@/lib/utils";

export default function ProgressPage() {
  const { progress, today, mastery } = useStudyData();
  const courses = progress.profile.courses;
  const [course, setCourse] = useState<CourseId>(courses[0] ?? "usgov");
  const [order, setOrder] = useState<"curriculum" | "weakest">("curriculum");

  const acc = accuracy(progress);
  const st = streak(progress, today);
  const totalXp = xp(progress, today);
  const level = levelFor(totalXp);
  const weeks = recentWeeks(progress, today, 10);
  const achievements = evaluateAchievements({ progress, mastery, today });
  const totalLessons = courses.reduce((s, c) => s + lessonsForCourse(c).length, 0);

  const heatDays = useMemo(() => {
    const byDay = minutesByDay(progress);
    const start = addDays(startOfWeek(today), -7 * 15);
    return Array.from({ length: 16 * 7 }, (_, i) => {
      const date = addDays(start, i);
      return { date, minutes: date > today ? 0 : (byDay.get(date) ?? 0), label: formatDate(date, { weekday: "short", month: "short", day: "numeric" }) };
    });
  }, [progress, today]);

  const weakest = useMemo(
    () =>
      [...mastery.values()]
        .filter((m) => m.courseId === course && m.status !== "not-started")
        .sort((a, b) => a.score - b.score)
        .slice(0, 8),
    [mastery, course],
  );

  return (
    <div className="space-y-8">
      <PageHeader title="Progress" description="Everything you've done, and how it adds up. Mastery scores drive your recommendations and your Smart Review." />

      <section aria-label="Key numbers" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={<BookOpen />} label="Lessons completed" value={`${lessonsCompleted(progress)}/${totalLessons}`} sub="across your courses" />
        <StatCard icon={<ListChecks />} tone="xp" label="Questions answered" value={acc.answered} sub={`${acc.correct} correct`} />
        <StatCard icon={<Target />} tone="success" label="Accuracy" value={acc.answered ? `${acc.percent}%` : "—"} sub="all practice & tests" />
        <StatCard icon={<PenLine />} tone="warning" label="FRQs completed" value={progress.frqSubmissions.length} sub="submitted responses" />
        <StatCard icon={<Layers />} tone="streak" label="Flashcards reviewed" value={flashcardReviews(progress)} sub={`${Object.keys(progress.flashcards).length} cards studied`} />
        <StatCard icon={<Clock />} tone="compgov" label="Study time" value={formatMinutes(totalMinutes(progress))} sub="total logged" />
        <StatCard icon={<Flame />} tone="streak" label="Current streak" value={`${st.current} days`} sub={`Longest: ${st.longest} days`} />
        <StatCard icon={<Sparkles />} tone="xp" label={`Level ${level.level}`} value={`${totalXp.toLocaleString()} XP`} sub={`${level.toNext} XP to level ${level.level + 1}`}>
          <Progress value={level.intoLevel} max={level.levelSize} indicatorClassName="bg-xp" size="xs" label="Level progress" />
        </StatCard>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly study time</CardTitle>
            <p className="text-sm text-muted-foreground">Last 10 weeks · goal {formatMinutes(progress.profile.weeklyGoalMinutes)} per week</p>
          </CardHeader>
          <CardContent>
            <SimpleBarChart
              data={weeks.map((w) => ({ label: formatDate(w.start, { month: "numeric", day: "numeric" }), detail: `Week of ${formatDate(w.start, { month: "long", day: "numeric" })}`, value: w.minutes }))}
              unit="min"
              caption="Minutes studied per week"
              goal={progress.profile.weeklyGoalMinutes}
              goalLabel="Weekly goal"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Accuracy trend</CardTitle>
            <p className="text-sm text-muted-foreground">Percent correct per week (weeks with no questions are skipped)</p>
          </CardHeader>
          <CardContent>
            <SimpleLineChart
              data={weeks.map((w) => ({ label: formatDate(w.start, { month: "numeric", day: "numeric" }), detail: `Week of ${formatDate(w.start, { month: "long", day: "numeric" })} · ${w.questions} questions`, value: w.accuracy }))}
              unit="%"
              caption="Weekly accuracy"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Study activity</CardTitle>
          <p className="text-sm text-muted-foreground">Last 16 weeks · each square is a day (Mon–Sun top to bottom)</p>
        </CardHeader>
        <CardContent>
          <ActivityHeatmap days={heatDays} />
        </CardContent>
      </Card>

      <section aria-labelledby="mastery-title">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="mastery-title" className="text-xl font-semibold tracking-tight">
              Topic mastery
            </h2>
            <p className="text-sm text-muted-foreground">
              Course mastery: <span className="font-semibold text-foreground">{courseMastery(mastery, course)}%</span>, weighted by official unit weightings
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {courses.length > 1 && (
              <Segmented
                ariaLabel="Course"
                value={course}
                onChange={setCourse}
                options={courses.map((c) => ({ value: c, label: c === "usgov" ? "U.S. Gov" : "Comp Gov" }))}
              />
            )}
            <Segmented
              ariaLabel="Sort"
              value={order}
              onChange={setOrder}
              options={[
                { value: "curriculum", label: "By unit" },
                { value: "weakest", label: "Weakest first" },
              ]}
            />
          </div>
        </div>

        {order === "weakest" ? (
          <Card>
            <CardContent className="pt-5 sm:pt-6">
              {weakest.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">Answer some questions to see your weakest topics.</p>
              ) : (
                <div className="grid gap-x-8 gap-y-1 md:grid-cols-2">
                  {weakest.map((m) => (
                    <MasteryBar key={m.topicId} label={getLesson(m.topicId)!.title} score={m.score} status={m.status} href={`/lessons/${m.topicId}`} meta={`${m.correct}/${m.attempts} correct · ${MASTERY_LABELS[m.status]}`} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {unitsForCourse(course).map((u) => (
              <Card key={u.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <CardTitle className="text-[15px]">
                      Unit {u.number}: {u.title}
                    </CardTitle>
                    <span className="shrink-0 text-sm font-semibold tabular-nums">{unitMastery(mastery, u.id)}%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  {lessonsForUnit(u.id).map((l) => {
                    const m = mastery.get(l.id)!;
                    return (
                      <MasteryBar
                        key={l.id}
                        label={l.title}
                        score={m.score}
                        status={m.status}
                        href={`/lessons/${l.id}`}
                        meta={m.attempts ? `${m.correct}/${m.attempts} correct` : m.lessonDone ? "Lesson complete · no questions yet" : undefined}
                      />
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          How mastery works: recent question accuracy counts most (each answer&apos;s weight halves every 30 days), accuracy is smoothed toward 50% until you&apos;ve answered several
          questions, completing the lesson adds 20%, and topics untouched for 30+ days fade slightly so they resurface for review.
        </p>
      </section>

      <section id="achievements" aria-labelledby="ach-title" className="scroll-mt-24">
        <h2 id="ach-title" className="mb-4 text-xl font-semibold tracking-tight">
          Achievements <span className="text-base font-normal text-muted-foreground">({achievements.filter((a) => a.unlocked).length}/{achievements.length})</span>
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map(({ achievement: a, current, goal, unlocked }) => {
            const Icon = ACHIEVEMENT_ICONS[a.icon];
            return (
              <div key={a.id} className={cn("flex items-center gap-4 rounded-xl border bg-card p-4 shadow-card", !unlocked && "bg-card/60")}>
                <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl", unlocked ? "bg-xp-soft text-xp" : "bg-muted text-muted-foreground")}>
                  {unlocked ? <Icon className="size-6" aria-hidden /> : <Lock className="size-5" aria-hidden />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 font-semibold">
                    {a.title} {unlocked && <CheckCircle2 className="size-4 text-success" aria-label="Unlocked" />}
                  </p>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                  {!unlocked && (
                    <div className="mt-2 flex items-center gap-2">
                      <Progress value={current} max={goal} size="xs" indicatorClassName="bg-xp" label={`${a.title} progress`} />
                      <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                        {current}/{goal}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
