"use client";

import { AlertCircle, ArrowLeft, CheckCircle2, Clock, Pause, Play, RotateCcw, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SourceLabel } from "@/components/common/labels";
import { StimulusView } from "@/components/common/stimulus";
import { TaskBanner } from "@/components/common/task-ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FRQ_TYPES, getFrq } from "@/content";
import { estimateFrq, possiblePoints, wordCount } from "@/lib/frq-grader";
import { useStore } from "@/lib/store";
import { cn, formatClock, formatDate, isoToDateKey } from "@/lib/utils";

const draftKey = (id: string) => `civitas:frq-draft:${id}`;

export function FrqWorkspace({ frqId }: { frqId: string }) {
  const frq = getFrq(frqId)!;
  const params = useSearchParams();
  const submitFrq = useStore((s) => s.submitFrq);
  const completeTask = useStore((s) => s.completeTask);
  const submissions = useStore((s) => s.progress.frqSubmissions);
  const history = useMemo(() => submissions.filter((x) => x.frqId === frqId), [submissions, frqId]);

  const [responses, setResponses] = useState<string[]>(() => frq.parts.map(() => ""));
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(params.get("timed") === "1");
  const [phase, setPhase] = useState<"writing" | "scoring" | "saved">("writing");
  const [met, setMet] = useState<Set<string>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);

  const limit = frq.suggestedMinutes * 60;
  const total = possiblePoints(frq);
  const estimates = useMemo(() => (phase === "writing" ? [] : estimateFrq(frq, responses)), [phase, frq, responses]);
  const earned = frq.parts.flatMap((p) => p.criteria).filter((c) => met.has(c.id)).reduce((s, c) => s + c.points, 0);

  // Restore and autosave drafts on this device.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(draftKey(frqId));
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        if (Array.isArray(parsed) && parsed.some((r) => r.trim())) setResponses(parsed);
      }
    } catch {
      // ignore
    }
  }, [frqId]);
  useEffect(() => {
    if (phase !== "writing") return;
    const id = setTimeout(() => {
      try {
        window.localStorage.setItem(draftKey(frqId), JSON.stringify(responses));
      } catch {
        // ignore
      }
    }, 400);
    return () => clearTimeout(id);
  }, [responses, frqId, phase]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const submit = () => {
    setRunning(false);
    setConfirmOpen(false);
    const est = estimateFrq(frq, responses);
    setMet(new Set(est.filter((e) => e.likely).map((e) => e.criterionId)));
    setPhase("scoring");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = () => {
    submitFrq({
      frqId,
      courseId: frq.courseId,
      type: frq.type,
      responses,
      criteriaMet: [...met],
      earned,
      possible: total,
      seconds: Math.max(60, seconds),
    });
    const task = params.get("task");
    if (task) completeTask(task);
    try {
      window.localStorage.removeItem(draftKey(frqId));
    } catch {
      // ignore
    }
    setPhase("saved");
    toast.success(`Saved: ${earned}/${total} (estimated)`);
  };

  const remaining = limit - seconds;
  const emptyParts = responses.filter((r) => !r.trim()).length;

  return (
    <div>
      <Link href={`/frq?course=${frq.courseId}`} className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> All FRQs
      </Link>
      <TaskBanner manual={false} />

      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant={frq.courseId === "usgov" ? "usgov" : "compgov"}>{FRQ_TYPES[frq.type].name}</Badge>
            <SourceLabel source="practice" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{frq.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Suggested time {frq.suggestedMinutes} minutes · {total} points in this practice rubric
          </p>
        </div>
        {phase === "writing" && (
          <div className="flex items-center gap-2 rounded-xl border bg-card p-2 shadow-card">
            <span
              className={cn("min-w-20 px-2 text-center text-xl font-bold tabular-nums", remaining < 0 ? "text-danger" : remaining < 120 ? "text-warning" : "")}
              aria-live="off"
              aria-label={remaining >= 0 ? `${formatClock(remaining)} remaining` : `${formatClock(-remaining)} over time`}
            >
              {remaining >= 0 ? formatClock(remaining) : `+${formatClock(-remaining)}`}
            </span>
            <Button size="sm" variant={running ? "outline" : "default"} onClick={() => setRunning((r) => !r)}>
              {running ? <Pause /> : <Play />} {running ? "Pause" : seconds ? "Resume" : "Start timer"}
            </Button>
            <Button size="icon-sm" variant="ghost" aria-label="Reset timer" onClick={() => (setSeconds(0), setRunning(false))}>
              <RotateCcw />
            </Button>
          </div>
        )}
      </header>

      {phase === "writing" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="prompt" className="space-y-4 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:pr-2 scrollbar-thin">
            <h2 id="prompt" className="sr-only">
              Prompt
            </h2>
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <p className="whitespace-pre-line text-[15px] leading-relaxed">{frq.intro}</p>
            </div>
            {frq.stimulus && <StimulusView stimulus={frq.stimulus} />}
            {frq.parts.length > 1 && (
              <ol className="space-y-2 rounded-xl border bg-card p-5 shadow-card">
                {frq.parts.map((p) => (
                  <li key={p.label} className="flex gap-3 text-[15px] leading-relaxed">
                    <span className="font-bold">{p.label}.</span>
                    <span>{p.prompt}</span>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section aria-labelledby="response" className="space-y-4">
            <h2 id="response" className="sr-only">
              Your response
            </h2>
            {frq.parts.map((p, i) => (
              <div key={p.label}>
                <label htmlFor={`part-${i}`} className="mb-1.5 flex items-baseline justify-between gap-3 text-sm font-semibold">
                  <span>{frq.parts.length > 1 ? `Part ${p.label}` : "Your essay"}</span>
                  <span className="text-xs font-normal tabular-nums text-muted-foreground">{wordCount(responses[i])} words</span>
                </label>
                {frq.parts.length > 1 && <p className="mb-2 text-sm text-muted-foreground">{p.prompt}</p>}
                <Textarea
                  id={`part-${i}`}
                  value={responses[i]}
                  onChange={(e) => {
                    if (!running && !seconds) setRunning(true);
                    setResponses((r) => r.map((x, j) => (j === i ? e.target.value : x)));
                  }}
                  className={cn(frq.parts.length > 1 ? "min-h-32" : "min-h-[420px]")}
                  placeholder={frq.parts.length > 1 ? "Write your response…" : "Thesis, evidence, reasoning, and a response to an alternative perspective…"}
                  spellCheck
                />
              </div>
            ))}
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">Drafts save automatically on this device.</p>
              <Button size="lg" onClick={() => (emptyParts ? setConfirmOpen(true) : submit())} disabled={responses.every((r) => !r.trim())}>
                <Send /> Submit
              </Button>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <section className="flex flex-col gap-5 rounded-2xl border bg-card p-6 shadow-card sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Sparkles className="size-4 text-primary" aria-hidden /> Estimated score — not official AP scoring
              </p>
              <p className="mt-1 text-4xl font-bold tabular-nums">
                {earned}
                <span className="text-xl text-muted-foreground">/{total}</span>
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                We pre-checked rubric points where your writing contains the key language. Keyword matching can&apos;t judge accuracy or reasoning, so review each point
                against the model answer and adjust the checkboxes to be honest with yourself.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="size-4" aria-hidden /> {formatClock(seconds)} of {frq.suggestedMinutes}:00
              </span>
              {phase === "scoring" ? (
                <Button size="lg" onClick={save}>
                  <CheckCircle2 /> Save my score
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setResponses(frq.parts.map(() => ""));
                      setSeconds(0);
                      setMet(new Set());
                      setPhase("writing");
                    }}
                  >
                    <RotateCcw /> Write again
                  </Button>
                  <Button asChild>
                    <Link href={`/frq?course=${frq.courseId}`}>More FRQs</Link>
                  </Button>
                </div>
              )}
            </div>
          </section>

          {frq.parts.map((p, i) => (
            <section key={p.label} className="rounded-2xl border bg-card shadow-card">
              <div className="border-b px-5 py-4">
                <h2 className="font-semibold">{frq.parts.length > 1 ? `Part ${p.label}` : "Essay"}</h2>
                {frq.parts.length > 1 && <p className="mt-0.5 text-sm text-muted-foreground">{p.prompt}</p>}
              </div>
              <div className="grid gap-6 p-5 lg:grid-cols-2">
                <Tabs defaultValue="yours">
                  <TabsList>
                    <TabsTrigger value="yours">Your response</TabsTrigger>
                    <TabsTrigger value="model">Model answer</TabsTrigger>
                  </TabsList>
                  <TabsContent value="yours">
                    <p className="whitespace-pre-line rounded-xl bg-muted/60 p-4 text-sm leading-relaxed">{responses[i]?.trim() || <em className="text-muted-foreground">No response.</em>}</p>
                  </TabsContent>
                  <TabsContent value="model">
                    <p className="whitespace-pre-line rounded-xl border border-success/30 bg-success-soft/50 p-4 text-sm leading-relaxed">{p.modelAnswer}</p>
                  </TabsContent>
                </Tabs>
                <div>
                  <p className="mb-2 text-sm font-semibold">Rubric</p>
                  <ul className="space-y-2">
                    {p.criteria.map((c) => {
                      const est = estimates.find((e) => e.criterionId === c.id && e.partIndex === i);
                      const checked = met.has(c.id);
                      return (
                        <li key={c.id}>
                          <label className={cn("flex cursor-pointer gap-3 rounded-xl border p-3 transition", checked ? "border-success/40 bg-success-soft/40" : "hover:bg-muted/50", phase === "saved" && "cursor-default")}>
                            <input
                              type="checkbox"
                              className="mt-0.5 size-4 accent-[var(--success)]"
                              checked={checked}
                              disabled={phase === "saved"}
                              onChange={() =>
                                setMet((prev) => {
                                  const next = new Set(prev);
                                  if (next.has(c.id)) next.delete(c.id);
                                  else next.add(c.id);
                                  return next;
                                })
                              }
                            />
                            <span className="flex-1">
                              <span className="flex items-start justify-between gap-2 text-sm">
                                <span>{c.description}</span>
                                <span className="shrink-0 font-semibold tabular-nums">{c.points} pt</span>
                              </span>
                              {est && (
                                <span className={cn("mt-1 flex items-center gap-1 text-xs", est.likely ? "text-success" : "text-muted-foreground")}>
                                  {est.likely ? <CheckCircle2 className="size-3.5" aria-hidden /> : <AlertCircle className="size-3.5" aria-hidden />}
                                  {est.note}
                                </span>
                              )}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </section>
          ))}

          <section className="rounded-2xl border bg-card p-5 shadow-card">
            <h2 className="font-semibold">Scoring notes</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {frq.scoringNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {history.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-2 text-sm font-semibold">Your past attempts</h2>
          <ul className="flex flex-wrap gap-2">
            {history.map((h) => (
              <li key={h.id} className="rounded-full border bg-card px-3 py-1 text-sm">
                {formatDate(isoToDateKey(h.submittedAt))}: <span className="font-semibold">{h.earned}/{h.possible}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit with {emptyParts} empty {emptyParts === 1 ? "part" : "parts"}?</DialogTitle>
            <DialogDescription>On the real exam, a blank part earns no points. You can still submit to see the rubric and model answer.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Keep writing
            </Button>
            <Button onClick={submit}>Submit anyway</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
