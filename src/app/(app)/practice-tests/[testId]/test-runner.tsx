"use client";

import { ArrowLeft, ArrowRight, Clock, Coffee, Flag, Grid3x3, ListChecks, PenLine, Timer } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SourceLabel } from "@/components/common/labels";
import { StimulusView } from "@/components/common/stimulus";
import { QuestionCard } from "@/components/questions/question-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/input";
import { Segmented } from "@/components/ui/misc";
import { FRQ_TYPES, getFrq, getPracticeTest, getQuestion } from "@/content";
import type { ChoiceId } from "@/content/types";
import { wordCount } from "@/lib/frq-grader";
import { useStore } from "@/lib/store";
import { cn, formatClock } from "@/lib/utils";

type Stage = "setup" | "mcq" | "mcq-review" | "break" | "frq";
type Section = "full" | "mcq" | "frq";

export function TestRunner({ testId }: { testId: string }) {
  const test = getPracticeTest(testId)!;
  const router = useRouter();
  const params = useSearchParams();
  const recordAttempt = useStore((s) => s.recordAttempt);
  const saveTestAttempt = useStore((s) => s.saveTestAttempt);
  const completeTask = useStore((s) => s.completeTask);

  const hasFrq = test.frqIds.length > 0;
  const [stage, setStage] = useState<Stage>("setup");
  const [mode, setMode] = useState<"timed" | "untimed">("timed");
  const [section, setSection] = useState<Section>(hasFrq ? "full" : "mcq");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ChoiceId | null>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [frqResponses, setFrqResponses] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(test.frqIds.map((id) => [id, getFrq(id)!.parts.map(() => "")])),
  );
  const [activeFrq, setActiveFrq] = useState(test.frqIds[0] ?? "");
  const [sectionSeconds, setSectionSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const startedAt = useRef<string>("");
  const submitted = useRef(false);

  const inProgress = stage === "mcq" || stage === "mcq-review" || stage === "frq";
  const limit = stage === "frq" ? test.frqMinutes * 60 : test.mcqMinutes * 60;
  const remaining = mode === "timed" ? limit - sectionSeconds : null;

  useEffect(() => {
    if (!inProgress) return;
    const id = setInterval(() => {
      setSectionSeconds((s) => s + 1);
      setTotalSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [inProgress]);

  useEffect(() => {
    if (!inProgress) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [inProgress]);

  const finishMcq = () => {
    if (section === "full") {
      setStage("break");
      setSectionSeconds(0);
    } else submit();
  };

  useEffect(() => {
    if (remaining === null || remaining > 0) return;
    if (stage === "mcq" || stage === "mcq-review") finishMcq();
    else if (stage === "frq") submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const begin = () => {
    startedAt.current = new Date().toISOString();
    setSectionSeconds(0);
    setStage(section === "frq" ? "frq" : "mcq");
  };

  function submit() {
    if (submitted.current) return;
    submitted.current = true;
    const includeMcq = section !== "frq";
    let correct = 0;
    if (includeMcq) {
      for (const qid of test.mcqIds) {
        const q = getQuestion(qid)!;
        const choice = answers[qid];
        const ok = choice === q.answer;
        if (ok) correct++;
        if (choice) recordAttempt({ questionId: qid, courseId: q.courseId, unitId: q.unitId, topicId: q.topicId, selected: choice, correct: ok, seconds: 0, source: "test" });
      }
    }
    const id = saveTestAttempt({
      testId,
      courseId: test.courseId,
      mode,
      section,
      answers: includeMcq ? Object.fromEntries(test.mcqIds.map((q) => [q, answers[q] ?? null])) : {},
      flagged: [...flagged],
      frqResponses: section === "mcq" ? {} : frqResponses,
      correct,
      total: includeMcq ? test.mcqIds.length : 0,
      seconds: totalSeconds,
      startedAt: startedAt.current || new Date().toISOString(),
      completedAt: new Date().toISOString(),
    });
    const task = params.get("task");
    if (task) completeTask(task);
    router.push(`/practice-tests/report/${id}`);
  }

  // ------------------------------------------------------------------ Setup
  if (stage === "setup") {
    return (
      <div className="mx-auto max-w-2xl">
        <Link href={`/practice-tests?course=${test.courseId}`} className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Practice tests
        </Link>
        <div className="rounded-2xl border bg-card p-6 shadow-card sm:p-8">
          <SourceLabel source="practice" />
          <h1 className="mt-3 text-2xl font-bold tracking-tight">{test.title}</h1>
          <p className="mt-2 text-muted-foreground">{test.description}</p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="mb-2 text-sm font-semibold">Timing</p>
              <Segmented
                ariaLabel="Timing mode"
                value={mode}
                onChange={setMode}
                options={[
                  { value: "timed", label: <><Timer /> Timed</> },
                  { value: "untimed", label: <><Clock /> Untimed</> },
                ]}
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                {mode === "timed" ? "The section ends automatically when time runs out, like the real exam." : "A clock still tracks your time so you can see your pace."}
              </p>
            </div>
            {hasFrq && (
              <div>
                <p className="mb-2 text-sm font-semibold">Sections</p>
                <Segmented
                  ariaLabel="Sections"
                  value={section}
                  onChange={setSection}
                  options={[
                    { value: "full", label: "Full exam" },
                    { value: "mcq", label: "MCQ only" },
                    { value: "frq", label: "FRQ only" },
                  ]}
                />
              </div>
            )}
            <ul className="space-y-2 rounded-xl bg-muted/60 p-4 text-sm">
              {section !== "frq" && (
                <li className="flex items-center gap-2">
                  <ListChecks className="size-4 text-muted-foreground" aria-hidden /> Section I: {test.mcqIds.length} multiple-choice questions · {test.mcqMinutes} minutes
                </li>
              )}
              {section !== "mcq" && hasFrq && (
                <li className="flex items-center gap-2">
                  <PenLine className="size-4 text-muted-foreground" aria-hidden /> Section II: {test.frqIds.length} free-response questions · {test.frqMinutes} minutes
                </li>
              )}
              <li className="text-xs text-muted-foreground">You can flag questions, jump between them, and review the section before submitting.</li>
            </ul>
          </div>
          <Button size="lg" className="mt-6 w-full sm:w-auto" onClick={begin}>
            Begin test <ArrowRight />
          </Button>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------ Break
  if (stage === "break") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border bg-card p-8 text-center shadow-card">
        <Coffee className="mx-auto size-10 text-primary" aria-hidden />
        <h1 className="mt-4 text-2xl font-bold tracking-tight">Section I complete</h1>
        <p className="mt-2 text-muted-foreground">
          Take a short break if you need one. Section II has {test.frqIds.length} free-response questions in {test.frqMinutes} minutes.
        </p>
        <Button size="lg" className="mt-6" onClick={() => (setSectionSeconds(0), setStage("frq"))}>
          Start Section II <ArrowRight />
        </Button>
      </div>
    );
  }

  const Header = (
    <div className="sticky top-16 z-10 -mx-4 mb-5 flex items-center gap-3 border-b bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{test.title}</p>
        <p className="text-xs text-muted-foreground">{stage === "frq" ? "Section II: Free Response" : "Section I: Multiple Choice"}</p>
      </div>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold tabular-nums",
          remaining !== null && remaining < 300 ? "bg-danger-soft text-danger" : "bg-muted",
        )}
        aria-label={remaining !== null ? `${formatClock(remaining)} remaining` : `${formatClock(sectionSeconds)} elapsed`}
      >
        {remaining !== null ? <Timer className="size-4" /> : <Clock className="size-4" />}
        {formatClock(remaining ?? sectionSeconds)}
      </span>
      <Button variant="ghost" size="sm" onClick={() => setConfirmExit(true)}>
        Exit
      </Button>
    </div>
  );

  const exitDialog = (
    <Dialog open={confirmExit} onOpenChange={setConfirmExit}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave this test?</DialogTitle>
          <DialogDescription>Your answers so far will be lost. To keep them, submit the test instead.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setConfirmExit(false)}>
            Keep going
          </Button>
          <Button variant="destructive" onClick={() => router.push(`/practice-tests?course=${test.courseId}`)}>
            Leave without saving
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // ------------------------------------------------------------------ FRQ
  if (stage === "frq") {
    const frq = getFrq(activeFrq)!;
    return (
      <div>
        {Header}
        <div className="mb-4 flex gap-2 overflow-x-auto" role="tablist" aria-label="Free-response questions">
          {test.frqIds.map((id, i) => {
            const f = getFrq(id)!;
            const words = (frqResponses[id] ?? []).reduce((s, r) => s + wordCount(r), 0);
            return (
              <button
                key={id}
                role="tab"
                aria-selected={activeFrq === id}
                onClick={() => setActiveFrq(id)}
                className={cn("shrink-0 rounded-lg border px-3 py-2 text-left text-sm transition", activeFrq === id ? "border-primary bg-primary-soft" : "bg-card hover:bg-muted")}
              >
                <span className="block font-semibold">Question {i + 1}</span>
                <span className="block text-xs text-muted-foreground">
                  {FRQ_TYPES[f.type].name} · {words} words
                </span>
              </button>
            );
          })}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="whitespace-pre-line rounded-xl border bg-card p-5 text-[15px] leading-relaxed shadow-card">{frq.intro}</p>
            {frq.stimulus && <StimulusView stimulus={frq.stimulus} />}
          </div>
          <div className="space-y-4">
            {frq.parts.map((p, i) => (
              <div key={p.label}>
                <label htmlFor={`t-${frq.id}-${i}`} className="mb-1 block text-sm font-semibold">
                  {frq.parts.length > 1 ? `Part ${p.label}` : "Essay"}
                </label>
                {frq.parts.length > 1 && <p className="mb-2 text-sm text-muted-foreground">{p.prompt}</p>}
                <Textarea
                  id={`t-${frq.id}-${i}`}
                  className={frq.parts.length > 1 ? "min-h-28" : "min-h-96"}
                  value={frqResponses[frq.id][i]}
                  onChange={(e) =>
                    setFrqResponses((r) => ({ ...r, [frq.id]: r[frq.id].map((x, j) => (j === i ? e.target.value : x)) }))
                  }
                />
              </div>
            ))}
            <div className="flex justify-end">
              <Button size="lg" onClick={submit}>
                Submit test
              </Button>
            </div>
          </div>
        </div>
        {exitDialog}
      </div>
    );
  }

  // ------------------------------------------------------------------ MCQ review screen
  const answeredCount = test.mcqIds.filter((id) => answers[id]).length;
  if (stage === "mcq-review") {
    return (
      <div>
        {Header}
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight">Check your work</h1>
          <p className="mt-1 text-muted-foreground">
            {answeredCount} of {test.mcqIds.length} answered · {flagged.size} flagged. Select a question to return to it.
          </p>
          <QuestionGrid ids={test.mcqIds} answers={answers} flagged={flagged} current={-1} onPick={(i) => (setIndex(i), setStage("mcq"))} className="mt-6" />
          <div className="mt-8 flex justify-between gap-3">
            <Button variant="outline" onClick={() => setStage("mcq")}>
              <ArrowLeft /> Back to questions
            </Button>
            <Button size="lg" onClick={finishMcq}>
              {section === "full" ? "Submit Section I" : "Submit test"}
            </Button>
          </div>
        </div>
        {exitDialog}
      </div>
    );
  }

  // ------------------------------------------------------------------ MCQ
  const qid = test.mcqIds[index];
  const q = getQuestion(qid)!;
  return (
    <div>
      {Header}
      <div className="mx-auto max-w-3xl">
        <QuestionCard
          key={qid}
          question={q}
          mode="test"
          keyboard
          number={index + 1}
          selected={answers[qid] ?? null}
          onSelect={(c) => setAnswers((a) => ({ ...a, [qid]: c }))}
          flagged={flagged.has(qid)}
          onToggleFlag={() =>
            setFlagged((f) => {
              const next = new Set(f);
              if (next.has(qid)) next.delete(qid);
              else next.add(qid);
              return next;
            })
          }
        />
        <div className="sticky bottom-20 mt-4 flex items-center justify-between gap-2 rounded-xl border bg-card/95 p-2 shadow-lift backdrop-blur lg:bottom-4">
          <Button variant="ghost" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
            <ArrowLeft /> Back
          </Button>
          <Button variant="outline" onClick={() => setNavOpen(true)}>
            <Grid3x3 /> {index + 1} of {test.mcqIds.length}
          </Button>
          {index + 1 < test.mcqIds.length ? (
            <Button onClick={() => setIndex((i) => i + 1)}>
              Next <ArrowRight />
            </Button>
          ) : (
            <Button onClick={() => setStage("mcq-review")}>Review</Button>
          )}
        </div>
      </div>

      <Dialog open={navOpen} onOpenChange={setNavOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Question navigator</DialogTitle>
            <DialogDescription>
              {answeredCount} answered · {flagged.size} flagged · {test.mcqIds.length - answeredCount} unanswered
            </DialogDescription>
          </DialogHeader>
          <QuestionGrid
            ids={test.mcqIds}
            answers={answers}
            flagged={flagged}
            current={index}
            onPick={(i) => {
              setIndex(i);
              setNavOpen(false);
            }}
          />
          <DialogFooter>
            <Button
              onClick={() => {
                setNavOpen(false);
                setStage("mcq-review");
              }}
            >
              Go to review screen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {exitDialog}
    </div>
  );
}

function QuestionGrid({
  ids,
  answers,
  flagged,
  current,
  onPick,
  className,
}: {
  ids: string[];
  answers: Record<string, ChoiceId | null>;
  flagged: Set<string>;
  current: number;
  onPick: (i: number) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <ol className="grid grid-cols-8 gap-2 sm:grid-cols-10">
        {ids.map((id, i) => (
          <li key={id}>
            <button
              onClick={() => onPick(i)}
              aria-label={`Question ${i + 1}${answers[id] ? ", answered" : ", unanswered"}${flagged.has(id) ? ", flagged" : ""}`}
              aria-current={i === current ? "true" : undefined}
              className={cn(
                "relative flex h-10 w-full items-center justify-center rounded-lg border text-sm font-semibold tabular-nums transition hover:border-primary",
                answers[id] ? "border-primary/40 bg-primary-soft text-primary" : "border-dashed bg-card text-muted-foreground",
                i === current && "ring-2 ring-primary",
              )}
            >
              {i + 1}
              {flagged.has(id) && <Flag className="absolute -right-1 -top-1 size-3.5 fill-warning text-warning" aria-hidden />}
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded border border-primary/40 bg-primary-soft" /> Answered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded border border-dashed" /> Unanswered
        </span>
        <span className="flex items-center gap-1.5">
          <Flag className="size-3 fill-warning text-warning" /> Flagged
        </span>
      </div>
    </div>
  );
}
