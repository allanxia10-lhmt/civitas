"use client";

import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Globe2,
  Layers,
  ListChecks,
  PenLine,
  Scale,
  Sparkles,
  Target,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { findTask, type TaskType } from "@/lib/study-plan";
import { cn } from "@/lib/utils";

export const TASK_ICONS: Record<TaskType, typeof BookOpen> = {
  lesson: BookOpen,
  practice: ListChecks,
  flashcards: Layers,
  frq: PenLine,
  cases: Scale,
  documents: FileText,
  country: Globe2,
  test: ClipboardCheck,
  review: Target,
};

export const TASK_TONES: Record<TaskType, string> = {
  lesson: "bg-primary-soft text-primary",
  practice: "bg-xp-soft text-xp",
  flashcards: "bg-streak-soft text-streak",
  frq: "bg-warning-soft text-warning",
  cases: "bg-usgov-soft text-usgov",
  documents: "bg-usgov-soft text-usgov",
  country: "bg-compgov-soft text-compgov",
  test: "bg-success-soft text-success",
  review: "bg-danger-soft text-danger",
};

export function TaskIcon({ type, className }: { type: TaskType; className?: string }) {
  const Icon = TASK_ICONS[type] ?? Sparkles;
  return (
    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", TASK_TONES[type], className)}>
      <Icon className="size-[18px]" aria-hidden />
    </span>
  );
}

/**
 * Shown at the top of any page opened from a study-plan task (`?task=`).
 * Pages that finish tasks automatically (lessons, practice, FRQs, tests,
 * flashcard sessions) mark them done themselves; reading-style tasks use the
 * button here.
 */
export function TaskBanner({ manual = true }: { manual?: boolean }) {
  const params = useSearchParams();
  const taskId = params.get("task");
  const plan = usePlan();
  const completedAt = useStore((s) => (taskId ? s.progress.completedTasks[taskId] : undefined));
  const completeTask = useStore((s) => s.completeTask);
  const logStudy = useStore((s) => s.logStudy);
  if (!taskId) return null;
  const task = findTask(plan, taskId);
  const title = task?.title ?? (taskId.startsWith("daily-flashcards") ? "Daily flashcard review" : "Study plan task");

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary-soft/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {task ? <TaskIcon type={task.type} /> : <TaskIcon type="review" />}
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">From your study plan</p>
          <p className="truncate text-sm font-semibold">
            {title}
            {task?.detail && <span className="font-normal text-muted-foreground"> · {task.detail}</span>}
          </p>
        </div>
      </div>
      {completedAt ? (
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-success">
          <CheckCircle2 className="size-4" /> Completed
        </span>
      ) : manual ? (
        <Button
          size="sm"
          onClick={() => {
            completeTask(taskId);
            if (task) logStudy(task.minutes, "reading", task.refId);
          }}
        >
          <CheckCircle2 /> Mark complete
        </Button>
      ) : (
        <span className="text-sm text-muted-foreground">Completes automatically when you finish</span>
      )}
    </div>
  );
}
