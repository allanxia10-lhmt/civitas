"use client";

import { ArrowLeft, CheckCircle2, Layers, RotateCcw, Shuffle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { EmptyState } from "@/components/common/empty-state";
import { CourseBadge } from "@/components/common/labels";
import { TaskBanner } from "@/components/common/task-ui";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/misc";
import { Progress } from "@/components/ui/progress";
import { DECKS, FLASHCARDS } from "@/content";
import type { Flashcard } from "@/content/types";
import type { Grade } from "@/lib/progress-types";
import { isDue, isHard, isNew, previewInterval } from "@/lib/srs";
import { useStore } from "@/lib/store";
import { cn, shuffle, toDateKey } from "@/lib/utils";

const GRADES: { grade: Grade; label: string; key: string; className: string }[] = [
  { grade: "again", label: "Again", key: "1", className: "border-danger/40 text-danger hover:bg-danger-soft" },
  { grade: "hard", label: "Hard", key: "2", className: "border-warning/40 text-warning hover:bg-warning-soft" },
  { grade: "easy", label: "Easy", key: "3", className: "border-success/40 text-success hover:bg-success-soft" },
];

export function FlashcardStudy() {
  const params = useSearchParams();
  const progress = useStore((s) => s.progress);
  const reviewFlashcard = useStore((s) => s.reviewFlashcard);
  const logStudy = useStore((s) => s.logStudy);
  const completeTask = useStore((s) => s.completeTask);

  const [queue, setQueue] = useState<Flashcard[]>(() => buildQueue(params, progress));
  const [position, setPosition] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [tally, setTally] = useState<Record<Grade, number>>({ again: 0, hard: 0, easy: 0 });
  const [requeued, setRequeued] = useState<Set<string>>(new Set());
  const started = useRef(Date.now());
  const finishedRef = useRef(false);

  const card = queue[position];
  const done = position >= queue.length && queue.length > 0;
  const reviewed = tally.again + tally.hard + tally.easy;

  const grade = useCallback(
    (g: Grade) => {
      if (!card || !flipped) return;
      reviewFlashcard(card.id, g);
      setTally((t) => ({ ...t, [g]: t[g] + 1 }));
      if (g === "again" && !requeued.has(card.id)) {
        setQueue((q) => [...q, card]);
        setRequeued((s) => new Set(s).add(card.id));
      }
      setFlipped(false);
      setPosition((p) => p + 1);
    },
    [card, flipped, reviewFlashcard, requeued],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === " " || e.key === "Enter") {
        // A focused button already activates on Space/Enter; don't double-toggle.
        if (tag === "BUTTON" || tag === "A") return;
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && ["1", "2", "3"].includes(e.key)) {
        e.preventDefault();
        grade(GRADES[Number(e.key) - 1].grade);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped, grade]);

  useEffect(() => {
    if (!done || finishedRef.current) return;
    finishedRef.current = true;
    logStudy(Math.max(1, Math.round((Date.now() - started.current) / 60000)), "flashcards");
    const task = params.get("task");
    if (task) completeTask(task);
  }, [done, logStudy, completeTask, params]);

  if (!queue.length) {
    return (
      <div className="mx-auto max-w-2xl">
        <TaskBanner />
        <EmptyState
          icon={<CheckCircle2 />}
          title="You're all caught up"
          description="No cards match this review right now. New reviews appear as cards come due."
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild variant="outline">
                <Link href="/flashcards/study?mode=all&shuffle=1">
                  <Shuffle /> Study all cards anyway
                </Link>
              </Button>
              <Button asChild>
                <Link href="/flashcards">Back to decks</Link>
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl">
        <TaskBanner manual={false} />
        <div className="rounded-2xl border bg-card p-8 text-center shadow-card">
          <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden />
          <h1 className="mt-4 text-2xl font-bold tracking-tight">Review complete</h1>
          <p className="mt-1 text-muted-foreground">
            {reviewed} reviews · {queue.length - requeued.size} cards
          </p>
          <dl className="mt-6 grid grid-cols-3 gap-3">
            {GRADES.map((g) => (
              <div key={g.grade} className="rounded-xl border p-3">
                <dt className="text-xs text-muted-foreground">{g.label}</dt>
                <dd className="text-2xl font-bold tabular-nums">{tally[g.grade]}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-muted-foreground">Cards you marked Hard or Again will come back sooner. The rest are scheduled further out.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                finishedRef.current = false;
                started.current = Date.now();
                setQueue(buildQueue(params, useStore.getState().progress));
                setPosition(0);
                setTally({ again: 0, hard: 0, easy: 0 });
                setRequeued(new Set());
              }}
            >
              <RotateCcw /> Keep going
            </Button>
            <Button asChild>
              <Link href="/dashboard">Back to dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const state = progress.flashcards[card.id];
  return (
    <div className="mx-auto max-w-2xl">
      <TaskBanner manual={false} />
      <div className="mb-5 flex items-center gap-3">
        <Button asChild variant="ghost" size="icon-sm" aria-label="Back to decks">
          <Link href="/flashcards">
            <ArrowLeft />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="mb-1.5 flex justify-between text-xs font-medium text-muted-foreground">
            <span>{DECKS[card.deck].label}</span>
            <span className="tabular-nums">
              {position + 1} / {queue.length}
            </span>
          </div>
          <Progress value={position} max={queue.length} label="Review progress" />
        </div>
      </div>

      <div className="flip-scene">
        <button
          onClick={() => setFlipped((f) => !f)}
          className="flip-card relative block h-[340px] w-full text-left sm:h-[360px]"
          data-flipped={flipped}
          aria-label={flipped ? "Show front of card" : "Show answer"}
          aria-live="polite"
        >
          <div className="flip-face absolute inset-0 flex flex-col rounded-2xl border bg-card p-6 shadow-lift sm:p-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Layers className="size-3.5" aria-hidden /> {isNew(state) ? "New card" : isDue(state, toDateKey()) ? "Due" : "Review"}
              <CourseBadge courseId={card.courseId} className="ml-auto" />
            </div>
            <div className="flex flex-1 items-center justify-center text-center">
              <p className="font-display text-2xl font-semibold leading-snug text-balance sm:text-3xl">{card.front}</p>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Click or press <Kbd>Space</Kbd> to flip
            </p>
          </div>
          <div className="flip-face flip-back absolute inset-0 flex flex-col overflow-y-auto rounded-2xl border border-primary/30 bg-card p-6 shadow-lift sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{card.front}</p>
            <div className="flex flex-1 items-center">
              <p className="whitespace-pre-line text-[17px] leading-relaxed">{card.back}</p>
            </div>
          </div>
        </button>
      </div>

      <div className={cn("mt-5 grid grid-cols-3 gap-2 transition", !flipped && "pointer-events-none opacity-40")} aria-hidden={!flipped}>
        {GRADES.map((g) => (
          <button
            key={g.grade}
            onClick={() => grade(g.grade)}
            disabled={!flipped}
            className={cn("flex flex-col items-center rounded-xl border bg-card py-3 font-semibold shadow-card transition", g.className)}
          >
            <span>
              {g.label} <Kbd className="ml-1 hidden sm:inline">{g.key}</Kbd>
            </span>
            <span className="mt-0.5 text-xs font-normal text-muted-foreground">{previewInterval(state, g.grade)}</span>
          </button>
        ))}
      </div>
      {!flipped && <p className="mt-3 text-center text-sm text-muted-foreground">Recall the answer, then flip to check yourself.</p>}
    </div>
  );
}

function buildQueue(params: URLSearchParams, progress: ReturnType<typeof useStore.getState>["progress"]): Flashcard[] {
  const today = toDateKey();
  const all = [...FLASHCARDS, ...progress.customFlashcards];
  const cardId = params.get("card");
  if (cardId) return all.filter((c) => c.id === cardId);

  const course = params.get("course");
  const deck = params.get("deck");
  const units = params.get("unit")?.split(",");
  const mode = params.get("mode");
  let cards = all.filter(
    (c) =>
      (course ? c.courseId === course : progress.profile.courses.includes(c.courseId)) &&
      (!deck || c.deck === deck) &&
      (!units || (c.unitId && units.includes(c.unitId))),
  );

  const state = (c: Flashcard) => progress.flashcards[c.id];
  if (mode === "all") return params.get("shuffle") ? shuffle(cards) : cards;
  if (mode === "hard") return shuffle(cards.filter((c) => isHard(state(c))));

  const due = shuffle(cards.filter((c) => isDue(state(c), today)));
  const fresh = cards.filter((c) => isNew(state(c)));
  if (mode === "due") cards = due.length ? due : fresh.slice(0, 15);
  else cards = [...due, ...fresh.slice(0, Math.max(5, 20 - due.length))];
  return cards.slice(0, 40);
}
