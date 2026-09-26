"use client";

import { AlertTriangle, CalendarRange, CheckCircle2, ChevronDown, CircleDot, Clock, Settings2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CourseBadge } from "@/components/common/labels";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { TaskRow } from "@/components/plan/task-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/misc";
import { Progress } from "@/components/ui/progress";
import { getCourse } from "@/content";
import { useStudyData } from "@/lib/hooks";
import { currentWeekIndex, examDateFor, isTaskComplete, PHASES, PHASE_ORDER, planCompletion, weekStatus, type PlanWeek, type WeekStatus } from "@/lib/study-plan";
import { cn, formatDate, formatDateRange, formatMinutes } from "@/lib/utils";

type Filter = "all" | "upcoming" | "completed" | "overdue";

const STATUS_STYLE: Record<WeekStatus, { label: string; variant: "success" | "default" | "neutral" | "warning"; icon: typeof CheckCircle2 }> = {
  completed: { label: "Completed", variant: "success", icon: CheckCircle2 },
  "in-progress": { label: "In progress", variant: "default", icon: CircleDot },
  upcoming: { label: "Upcoming", variant: "neutral", icon: Clock },
  overdue: { label: "Overdue", variant: "warning", icon: AlertTriangle },
};

export default function StudyPlanPage() {
  const { progress, plan, today } = useStudyData();
  const profile = progress.profile;
  const current = currentWeekIndex(plan, today);
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Set<number>>(() => new Set([current]));
  const currentRef = useRef<HTMLLIElement>(null);

  const statuses = useMemo(() => plan.weeks.map((w) => weekStatus(w, progress, today)), [plan, progress, today]);
  const overall = planCompletion(plan, progress);
  const overdueTasks = plan.weeks
    .slice(0, current)
    .flatMap((w) => w.tasks)
    .filter((t) => !isTaskComplete(t, progress)).length;

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center", behavior: "instant" as ScrollBehavior });
  }, []);

  const visible = plan.weeks.filter((w) => {
    const s = statuses[w.index];
    if (filter === "all") return true;
    if (filter === "upcoming") return s === "upcoming" || s === "in-progress";
    return s === filter;
  });

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      <PageHeader
        eyebrow={
          <>
            <CalendarRange className="size-4" /> Study plan
          </>
        }
        title="Your road to exam day"
        description={
          <>
            {profile.courses.map((c) => `${getCourse(c)?.shortTitle} on ${formatDate(examDateFor(profile, c), { month: "long", day: "numeric", year: "numeric" })}`).join(" and ")} ·{" "}
            {profile.minutesPerDay} minutes a day. Your plan works backward from your exam through five phases.
          </>
        }
        actions={
          <Button asChild variant="outline">
            <Link href="/settings#plan">
              <Settings2 /> Adjust plan
            </Link>
          </Button>
        }
      />

      <section aria-label="Plan summary" className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={<CalendarRange />} label="Current week" value={`${current + 1} of ${plan.weeks.length}`} sub={formatDateRange(plan.weeks[current].start, plan.weeks[current].end)} />
        <StatCard icon={<CheckCircle2 />} tone="success" label="Plan complete" value={`${overall.percent}%`} sub={`${overall.done} of ${overall.total} tasks`} />
        <StatCard icon={<Clock />} tone="xp" label="Planned per week" value={formatMinutes(plan.totalMinutes / Math.max(1, plan.weeks.length))} sub={`Goal: ${formatMinutes(profile.weeklyGoalMinutes)}`} />
        <StatCard icon={<AlertTriangle />} tone="warning" label="Carried over" value={overdueTasks} sub={overdueTasks ? "Tasks from earlier weeks" : "Nothing behind — nice"} />
      </section>

      {/* Phase timeline */}
      <section aria-labelledby="timeline" className="mb-8 rounded-xl border bg-card p-4 shadow-card sm:p-5">
        <h2 id="timeline" className="mb-3 text-sm font-semibold">
          Timeline
        </h2>
        <div className="relative">
          <div className="flex h-8 gap-[2px] overflow-hidden rounded-lg" role="list" aria-label="Weeks by phase">
            {plan.weeks.map((w) => {
              const s = statuses[w.index];
              return (
                <button
                  key={w.index}
                  role="listitem"
                  onClick={() => {
                    setFilter("all");
                    setOpen((prev) => new Set(prev).add(w.index));
                    setTimeout(() => document.getElementById(`week-${w.index}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
                  }}
                  title={`Week ${w.index + 1}: ${w.title} (${STATUS_STYLE[s].label})`}
                  aria-label={`Week ${w.index + 1}, ${PHASES[w.phase].label}, ${STATUS_STYLE[s].label}`}
                  className={cn("flex-1 transition hover:opacity-80", PHASES[w.phase].dot, s === "completed" ? "opacity-100" : s === "upcoming" ? "opacity-35" : "opacity-70", w.index === current && "ring-2 ring-foreground ring-inset")}
                />
              );
            })}
          </div>
          <div
            className="pointer-events-none absolute -bottom-5 text-[11px] font-semibold text-foreground"
            style={{ left: `calc(${((current + 0.5) / plan.weeks.length) * 100}% - 18px)` }}
            aria-hidden
          >
            ▲ Now
          </div>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {PHASE_ORDER.map((p) => {
            const weeks = plan.weeks.filter((w) => w.phase === p);
            if (!weeks.length) return null;
            return (
              <li key={p} className="flex items-center gap-2">
                <span className={cn("size-2.5 rounded-full", PHASES[p].dot)} aria-hidden />
                <span className="font-medium">{PHASES[p].label}</span>
                <span className="text-muted-foreground">
                  {formatDate(weeks[0].start)} – {formatDate(weeks[weeks.length - 1].end)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">Week by week</h2>
        <Segmented
          ariaLabel="Filter weeks"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All" },
            { value: "upcoming", label: "Upcoming" },
            { value: "completed", label: "Completed" },
            { value: "overdue", label: "Overdue" },
          ]}
        />
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">No weeks match this filter.</p>
      ) : (
        <ol className="relative space-y-3 before:absolute before:bottom-4 before:left-[19px] before:top-4 before:w-px before:bg-border sm:before:left-[23px]">
          {visible.map((w) => (
            <WeekItem
              key={w.index}
              ref={w.index === current ? currentRef : undefined}
              week={w}
              status={statuses[w.index]}
              isOpen={open.has(w.index)}
              onToggle={() => toggle(w.index)}
              doneCount={w.tasks.filter((t) => isTaskComplete(t, progress)).length}
              multiCourse={profile.courses.length > 1}
              progress={progress}
            />
          ))}
        </ol>
      )}
    </div>
  );
}

function WeekItem({
  week,
  status,
  isOpen,
  onToggle,
  doneCount,
  multiCourse,
  progress,
  ref,
}: {
  week: PlanWeek;
  status: WeekStatus;
  isOpen: boolean;
  onToggle: () => void;
  doneCount: number;
  multiCourse: boolean;
  progress: ReturnType<typeof useStudyData>["progress"];
  ref?: React.Ref<HTMLLIElement>;
}) {
  const style = STATUS_STYLE[status];
  const StatusIcon = style.icon;
  return (
    <li id={`week-${week.index}`} ref={ref} className="relative pl-12 sm:pl-14">
      <span
        className={cn(
          "absolute left-2 top-5 flex size-6 items-center justify-center rounded-full border-2 bg-card sm:left-3",
          status === "completed" && "border-success bg-success text-white",
          status === "in-progress" && "border-primary text-primary",
          status === "overdue" && "border-warning text-warning",
          status === "upcoming" && "border-input text-muted-foreground",
        )}
        aria-hidden
      >
        <StatusIcon className="size-3.5" />
      </span>
      <div className={cn("rounded-xl border bg-card shadow-card", status === "in-progress" && "border-primary/40 ring-1 ring-primary/20")}>
        <button onClick={onToggle} aria-expanded={isOpen} aria-controls={`week-panel-${week.index}`} className="flex w-full items-start gap-3 p-4 text-left sm:p-5">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold">Week {week.index + 1}</span>
              <span className="text-sm text-muted-foreground">{formatDateRange(week.start, week.end)}</span>
              <Badge variant={style.variant}>{style.label}</Badge>
              <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", PHASES[week.phase].className)}>{PHASES[week.phase].label}</span>
            </div>
            <h3 className="mt-1.5 font-semibold tracking-tight text-balance">{week.title}</h3>
            {multiCourse && week.tracks.length > 1 && <p className="mt-0.5 text-sm text-muted-foreground">+ {week.tracks.slice(1).map((t) => t.title).join(" · ")}</p>}
            <div className="mt-3 flex items-center gap-3">
              <Progress value={doneCount} max={week.tasks.length} className="max-w-48" indicatorClassName={status === "completed" ? "bg-success" : undefined} label={`Week ${week.index + 1} progress`} />
              <span className="text-xs text-muted-foreground tabular-nums">
                {doneCount}/{week.tasks.length} tasks · {formatMinutes(week.minutes)}
              </span>
            </div>
          </div>
          <ChevronDown className={cn("mt-1 size-5 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} aria-hidden />
        </button>
        {isOpen && (
          <div id={`week-panel-${week.index}`} className="space-y-5 border-t px-4 py-4 sm:px-5">
            {week.tracks.map((track) => (
              <div key={track.courseId}>
                {multiCourse && (
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <CourseBadge courseId={track.courseId} />
                    <span className="text-sm font-medium">{track.title}</span>
                    <span className="text-xs text-muted-foreground">{track.subtitle}</span>
                  </div>
                )}
                {!multiCourse && <p className="mb-2 text-xs text-muted-foreground">{track.subtitle}</p>}
                <ul className="space-y-2">
                  {track.tasks.map((t) => (
                    <TaskRow key={t.id} task={t} done={isTaskComplete(t, progress)} allowToggle compact />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
