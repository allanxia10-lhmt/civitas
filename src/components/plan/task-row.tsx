"use client";

import { ArrowRight, Check, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import { CourseBadge } from "@/components/common/labels";
import { TaskIcon } from "@/components/common/task-ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import type { PlanTask } from "@/lib/study-plan";
import { cn } from "@/lib/utils";

const START_LABEL: Record<PlanTask["type"], string> = {
  lesson: "Start",
  practice: "Start",
  flashcards: "Review",
  frq: "Write",
  cases: "Open",
  documents: "Open",
  country: "Open",
  test: "Begin",
  review: "Open",
};

export function TaskRow({
  task,
  done,
  overdue,
  showCourse,
  allowToggle = false,
  compact = false,
}: {
  task: PlanTask;
  done: boolean;
  overdue?: boolean;
  showCourse?: boolean;
  allowToggle?: boolean;
  compact?: boolean;
}) {
  const completeTask = useStore((s) => s.completeTask);
  const uncompleteTask = useStore((s) => s.uncompleteTask);
  const isDaily = task.id.startsWith("daily-");
  const toggleable = allowToggle && task.type !== "lesson";

  return (
    <li
      className={cn(
        "group flex items-center gap-3 rounded-xl border bg-card transition",
        compact ? "px-3 py-2.5" : "px-3 py-3 sm:px-4",
        done ? "opacity-70" : "hover:border-primary/30 hover:shadow-card",
      )}
    >
      {toggleable ? (
        <button
          onClick={() => (done ? uncompleteTask(task.id) : completeTask(task.id))}
          className="shrink-0 rounded-full text-muted-foreground transition hover:text-primary"
          aria-label={done ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`}
          aria-pressed={done}
        >
          {done ? <CheckCircle2 className="size-5 text-success" /> : <Circle className="size-5" />}
        </button>
      ) : null}
      <TaskIcon type={task.type} className={compact ? "size-8" : undefined} />
      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm font-semibold", done && "text-muted-foreground line-through decoration-muted-foreground/50")}>{task.title}</p>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="truncate">{task.detail}</span>
          <span aria-hidden>·</span>
          <span className="tabular-nums">{task.minutes} min</span>
          {showCourse && !isDaily && <CourseBadge courseId={task.courseId} className="px-2 py-0 text-[10px]" />}
          {overdue && !done && (
            <Badge variant="warning" className="px-2 py-0 text-[10px]">
              Carried over
            </Badge>
          )}
        </div>
      </div>
      {done ? (
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-success">
          <Check className="size-4" /> <span className="hidden sm:inline">Done</span>
        </span>
      ) : (
        <Button asChild size="sm" variant={compact ? "outline" : "default"} className="shrink-0">
          <Link href={task.href} aria-label={`${START_LABEL[task.type]}: ${task.title}`}>
            {START_LABEL[task.type]} <ArrowRight />
          </Link>
        </Button>
      )}
    </li>
  );
}
