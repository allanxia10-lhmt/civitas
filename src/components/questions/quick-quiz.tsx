"use client";

import { ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Question } from "@/content/types";
import type { AttemptSource } from "@/lib/progress-types";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { QuestionCard } from "./question-card";

/**
 * A short inline quiz used for lesson Quick Checks and for practice on case,
 * document, and country pages. Records every attempt toward mastery.
 */
export function QuickQuiz({
  questions,
  source = "quick-check",
  onFinish,
  finishSlot,
}: {
  questions: Question[];
  source?: AttemptSource;
  onFinish?: (correct: number) => void;
  finishSlot?: React.ReactNode;
}) {
  const recordAttempt = useStore((s) => s.recordAttempt);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [answered, setAnswered] = useState(false);
  const [round, setRound] = useState(0);
  const done = results.length === questions.length && index >= questions.length;

  if (!questions.length) return <p className="text-sm text-muted-foreground">No questions available yet.</p>;

  if (done) {
    const correct = results.filter(Boolean).length;
    return (
      <div className="rounded-2xl border bg-card p-6 text-center shadow-card">
        <Trophy className={cn("mx-auto size-8", correct === questions.length ? "text-streak" : "text-primary")} aria-hidden />
        <p className="mt-3 text-lg font-semibold">
          {correct} of {questions.length} correct
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {correct === questions.length ? "Excellent — you've got this topic." : correct >= questions.length / 2 ? "Solid start. Review the explanations for anything you missed." : "Worth a second look — reread the Deep Dive, then try again."}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setIndex(0);
              setResults([]);
              setAnswered(false);
              setRound((r) => r + 1);
            }}
          >
            <RotateCcw /> Try again
          </Button>
          {finishSlot}
        </div>
      </div>
    );
  }

  const q = questions[index];
  return (
    <div>
      <div className="mb-3 flex items-center gap-1.5" aria-label={`Question ${index + 1} of ${questions.length}`}>
        {questions.map((_, i) => (
          <span
            key={i}
            className={cn("h-1.5 flex-1 rounded-full", i < results.length ? (results[i] ? "bg-success" : "bg-danger") : i === index ? "bg-primary" : "bg-muted")}
          />
        ))}
      </div>
      <QuestionCard
        key={`${q.id}-${round}`}
        question={q}
        mode="practice"
        number={index + 1}
        onAnswer={(choice, correct, seconds) => {
          recordAttempt({ questionId: q.id, courseId: q.courseId, unitId: q.unitId, topicId: q.topicId, selected: choice, correct, seconds, source });
          setResults((r) => [...r, correct]);
          setAnswered(true);
        }}
      />
      {answered && (
        <div className="mt-3 flex justify-end">
          <Button
            onClick={() => {
              setAnswered(false);
              const next = index + 1;
              setIndex(next);
              if (next >= questions.length) onFinish?.(results.filter(Boolean).length);
            }}
          >
            {index + 1 < questions.length ? "Next question" : "See results"} <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}
