"use client";

import { Check, Flag, Lightbulb, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DifficultyBadge } from "@/components/common/labels";
import { StimulusView } from "@/components/common/stimulus";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/misc";
import { getUnit } from "@/content";
import type { ChoiceId, Question } from "@/content/types";
import { cn } from "@/lib/utils";

export type QuestionMode = "practice" | "test" | "review";

interface QuestionCardProps {
  question: Question;
  mode: QuestionMode;
  /** Controlled selection (test and review modes). */
  selected?: ChoiceId | null;
  onSelect?: (choice: ChoiceId) => void;
  /** Practice mode: called once when the student checks their answer. */
  onAnswer?: (choice: ChoiceId, correct: boolean, seconds: number) => void;
  /** Enables 1–4 / A–D and Enter shortcuts. Use for one card per screen only. */
  keyboard?: boolean;
  number?: number;
  flagged?: boolean;
  onToggleFlag?: () => void;
  className?: string;
}

const LETTER_KEYS: Record<string, ChoiceId> = { "1": "A", "2": "B", "3": "C", "4": "D", a: "A", b: "B", c: "C", d: "D" };

export function QuestionCard({ question, mode, selected: controlled, onSelect, onAnswer, keyboard, number, flagged, onToggleFlag, className }: QuestionCardProps) {
  const [local, setLocal] = useState<ChoiceId | null>(null);
  const [checked, setChecked] = useState(false);
  const started = useRef(Date.now());
  const selected = mode === "practice" ? local : (controlled ?? null);
  const revealed = mode === "review" || (mode === "practice" && checked);
  const unit = getUnit(question.unitId);

  useEffect(() => {
    setLocal(null);
    setChecked(false);
    started.current = Date.now();
  }, [question.id]);

  const choose = (id: ChoiceId) => {
    if (revealed) return;
    if (mode === "practice") setLocal(id);
    onSelect?.(id);
  };

  const check = () => {
    if (mode !== "practice" || !local || checked) return;
    setChecked(true);
    onAnswer?.(local, local === question.answer, Math.round((Date.now() - started.current) / 1000));
  };

  useEffect(() => {
    if (!keyboard) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || e.metaKey || e.ctrlKey || e.altKey) return;
      const letter = LETTER_KEYS[e.key.toLowerCase()];
      if (letter && !revealed) {
        e.preventDefault();
        choose(letter);
      } else if (e.key === "Enter" && mode === "practice" && local && !checked) {
        e.preventDefault();
        check();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <article className={cn("rounded-2xl border bg-card p-5 shadow-card sm:p-7", className)} aria-labelledby={`q-${question.id}`}>
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {number !== undefined && <span className="font-semibold text-foreground">Question {number}</span>}
        <span>
          {question.courseId === "usgov" ? "AP U.S. Gov" : "AP Comp Gov"} · Unit {unit?.number}
        </span>
        <DifficultyBadge difficulty={question.difficulty} />
        {onToggleFlag && (
          <button
            onClick={onToggleFlag}
            aria-pressed={flagged}
            className={cn("ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium transition hover:bg-muted", flagged && "text-warning")}
          >
            <Flag className={cn("size-3.5", flagged && "fill-current")} /> {flagged ? "Flagged" : "Flag for review"}
          </button>
        )}
      </div>

      {question.stimulus && <StimulusView stimulus={question.stimulus} className="mb-5" />}

      <h2 id={`q-${question.id}`} className="text-[16px] font-medium leading-relaxed sm:text-[17px]">
        {question.stem}
      </h2>

      <div role="radiogroup" aria-labelledby={`q-${question.id}`} className="mt-5 space-y-2.5">
        {question.choices.map((c) => {
          const isSelected = selected === c.id;
          const isCorrect = c.id === question.answer;
          const state = revealed ? (isCorrect ? "correct" : isSelected ? "incorrect" : "idle") : isSelected ? "selected" : "idle";
          return (
            <div key={c.id}>
              <button
                role="radio"
                aria-checked={isSelected}
                disabled={revealed}
                onClick={() => choose(c.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-[15px] leading-relaxed transition",
                  state === "idle" && "hover:border-primary/40 hover:bg-muted/50",
                  state === "selected" && "border-primary bg-primary-soft ring-1 ring-primary/30",
                  state === "correct" && "border-success bg-success-soft",
                  state === "incorrect" && "border-danger bg-danger-soft",
                  revealed && state === "idle" && "opacity-75",
                  "disabled:cursor-default",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                    state === "selected" && "border-primary bg-primary text-primary-foreground",
                    state === "correct" && "border-success bg-success text-white",
                    state === "incorrect" && "border-danger bg-danger text-white",
                  )}
                  aria-hidden
                >
                  {state === "correct" ? <Check className="size-3.5" strokeWidth={3} /> : state === "incorrect" ? <X className="size-3.5" strokeWidth={3} /> : c.id}
                </span>
                <span className="flex-1">
                  <span className="sr-only">Choice {c.id}: </span>
                  {c.text}
                </span>
              </button>
              {revealed && (isSelected || isCorrect) && (
                <p className={cn("mt-1.5 pl-13 text-sm leading-relaxed", isCorrect ? "text-success" : "text-danger")}>
                  {c.rationale}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {mode === "practice" && !checked && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {keyboard ? (
            <p className="hidden text-xs text-muted-foreground sm:block">
              Press <Kbd>1</Kbd>–<Kbd>4</Kbd> to choose, <Kbd>Enter</Kbd> to check
            </p>
          ) : (
            <span />
          )}
          <Button onClick={check} disabled={!local}>
            Check answer
          </Button>
        </div>
      )}

      {revealed && <Explanation question={question} selected={selected} />}
    </article>
  );
}

function Explanation({ question, selected }: { question: Question; selected: ChoiceId | null }) {
  const correct = selected === question.answer;
  return (
    <div className="mt-6 animate-slide-up space-y-4">
      {selected && (
        <p className={cn("flex items-center gap-2 text-sm font-semibold", correct ? "text-success" : "text-danger")} role="status">
          {correct ? <Check className="size-4" /> : <X className="size-4" />}
          {correct ? "Correct" : `Not quite — the answer is ${question.answer}.`}
        </p>
      )}
      <div className="rounded-xl bg-muted/60 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <Lightbulb className="size-4 text-warning" aria-hidden /> Explanation
          <span className="rounded-full bg-card px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{question.concept}</span>
        </p>
        <p className="mt-1.5 text-sm leading-relaxed">{question.explanation}</p>
      </div>
      <details className="group rounded-xl border px-4 py-3">
        <summary className="cursor-pointer text-sm font-semibold">Why each answer is right or wrong</summary>
        <ul className="mt-3 space-y-2">
          {question.choices.map((c) => (
            <li key={c.id} className="flex gap-2 text-sm leading-relaxed">
              <span className={cn("font-bold", c.id === question.answer ? "text-success" : "text-muted-foreground")}>{c.id}.</span>
              <span className="text-muted-foreground">{c.rationale}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
