"use client";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Eye,
  EyeOff,
  NotebookPen,
  PartyPopper,
  RotateCcw,
  Shuffle,
  Square,
  Trash2,
  TrendingDown,
  Wand2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { QuestionCard } from "@/components/questions/question-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NativeSelect } from "@/components/ui/input";
import { Segmented } from "@/components/ui/misc";
import { Progress } from "@/components/ui/progress";
import { getLesson, getUnit, unitsForCourse } from "@/content";
import type { ChoiceId, CourseId } from "@/content/types";
import { useStudyData } from "@/lib/hooks";
import { buildMistakeLog, choiceText, reshuffleChoices, type MistakeEntry } from "@/lib/mistakes";
import { useStore } from "@/lib/store";
import { cn, formatDate, isoToDateKey, shuffle } from "@/lib/utils";

type Tab = "open" | "corrected";
type Sort = "recent" | "most" | "topic";

const PAGE = 25;

export function MistakeLog() {
  const { progress } = useStudyData();
  const params = useSearchParams();
  const router = useRouter();
  const dismiss = useStore((s) => s.dismissMistake);
  const restore = useStore((s) => s.restoreMistake);

  const courseParam = params.get("course");
  const [course, setCourse] = useState<CourseId | "all">(courseParam === "usgov" || courseParam === "compgov" ? courseParam : "all");
  const [tab, setTab] = useState<Tab>("open");
  const [unit, setUnit] = useState("all");
  const [sort, setSort] = useState<Sort>("recent");
  const [limit, setLimit] = useState(PAGE);
  const [session, setSession] = useState<MistakeEntry[] | null>(null);

  const log = useMemo(() => buildMistakeLog(progress), [progress]);
  const inCourse = log.filter((m) => course === "all" || m.question.courseId === course);
  const open = inCourse.filter((m) => m.status === "open");
  const corrected = inCourse.filter((m) => m.status === "corrected");

  const shown = (tab === "open" ? open : corrected)
    .filter((m) => unit === "all" || m.question.unitId === unit)
    .sort((a, b) => {
      if (sort === "most") return b.misses - a.misses || (a.lastMissedAt < b.lastMissedAt ? 1 : -1);
      if (sort === "topic") return a.question.topicId.localeCompare(b.question.topicId);
      const ta = tab === "corrected" ? a.correctedAt! : a.lastMissedAt;
      const tb = tab === "corrected" ? b.correctedAt! : b.lastMissedAt;
      return ta < tb ? 1 : -1;
    });

  const topicMisses = new Map<string, number>();
  for (const m of open) topicMisses.set(m.question.topicId, (topicMisses.get(m.question.topicId) ?? 0) + 1);
  const worstTopic = [...topicMisses.entries()].sort((a, b) => b[1] - a[1])[0];

  const unitOptions = course === "all" ? [...unitsForCourse("usgov"), ...unitsForCourse("compgov")] : unitsForCourse(course);

  if (session) return <SecondChance entries={session} onExit={() => setSession(null)} />;

  return (
    <div>
      <PageHeader
        eyebrow={
          <>
            <NotebookPen className="size-4 text-primary" /> Mistake Log
          </>
        }
        title="Every question you've missed, in one place"
        description="Misses from lessons, practice, Endless Practice, and tests land here automatically. Retry them with Second Chance. Get one right and it moves to Corrected."
        actions={
          <Button size="lg" disabled={!shown.length} onClick={() => setSession(shuffle(shown))}>
            <RotateCcw /> {tab === "open" ? "Second Chance" : "Retry corrected"}
            {shown.length ? ` (${shown.length})` : ""}
          </Button>
        }
      />

      <section aria-label="Mistake summary" className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatCard icon={<XCircle />} tone="warning" label="To retry" value={open.length} sub="most recent attempt was wrong" />
        <StatCard icon={<CheckCircle2 />} tone="success" label="Corrected" value={corrected.length} sub="right on a later try" />
        <StatCard
          icon={<TrendingDown />}
          label="Most missed topic"
          value={worstTopic ? `${worstTopic[1]}` : "—"}
          sub={worstTopic ? getLesson(worstTopic[0])?.title : "Nothing to retry"}
          className="col-span-2 lg:col-span-1"
        />
      </section>

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Segmented
          ariaLabel="Mistake status"
          value={tab}
          onChange={(t) => {
            setTab(t);
            setLimit(PAGE);
          }}
          options={[
            { value: "open", label: `To retry (${open.length})` },
            { value: "corrected", label: `Corrected (${corrected.length})` },
          ]}
        />
        <div className="flex flex-wrap gap-2">
          {progress.profile.courses.length > 1 && (
            <Segmented
              ariaLabel="Course"
              value={course}
              onChange={(c) => {
                setCourse(c);
                setUnit("all");
                router.replace(c === "all" ? "/mistakes" : `/mistakes?course=${c}`, { scroll: false });
              }}
              options={[
                { value: "all", label: "Both" },
                { value: "usgov", label: "U.S. Gov" },
                { value: "compgov", label: "Comp Gov" },
              ]}
            />
          )}
          <NativeSelect value={unit} onChange={(e) => setUnit(e.target.value)} aria-label="Filter by unit" className="w-44">
            <option value="all">All units</option>
            {unitOptions.map((u) => (
              <option key={u.id} value={u.id}>
                {course === "all" ? (u.courseId === "usgov" ? "U.S. " : "Comp ") : ""}Unit {u.number}
              </option>
            ))}
          </NativeSelect>
          <NativeSelect value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort" className="w-40">
            <option value="recent">Most recent</option>
            <option value="most">Most missed</option>
            <option value="topic">By topic</option>
          </NativeSelect>
        </div>
      </div>

      {shown.length === 0 ? (
        tab === "open" ? (
          <EmptyState
            icon={<PartyPopper />}
            title={open.length ? "Nothing to retry for this filter" : "No mistakes to retry"}
            description={open.length ? "Try a different unit or course." : "Every question you've missed has been corrected. Keep practicing — new misses will show up here."}
            action={
              <Button asChild>
                <Link href="/practice/endless">Endless Practice</Link>
              </Button>
            }
          />
        ) : (
          <EmptyState icon={<CheckCircle2 />} title="Nothing corrected yet" description="Answer a missed question correctly on a later try and it moves here." />
        )
      ) : (
        <>
          <ul className="space-y-3">
            {shown.slice(0, limit).map((m) => (
              <MistakeRow
                key={m.question.id}
                entry={m}
                onRetry={() => setSession([m])}
                onDismiss={() => {
                  dismiss(m.question.id);
                  toast("Removed from your Mistake Log", { action: { label: "Undo", onClick: () => restore(m.question.id) } });
                }}
              />
            ))}
          </ul>
          {shown.length > limit && (
            <div className="mt-4 text-center">
              <Button variant="outline" onClick={() => setLimit((l) => l + PAGE)}>
                Show more ({shown.length - limit} left)
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function OriginBadge({ entry }: { entry: MistakeEntry }) {
  if (entry.origin === "bank") return null;
  return entry.origin === "ai" ? (
    <Badge variant="warning">
      <Bot aria-hidden /> AI-generated
    </Badge>
  ) : (
    <Badge variant="xp">
      <Wand2 aria-hidden /> Generated
    </Badge>
  );
}

function MistakeRow({ entry, onRetry, onDismiss }: { entry: MistakeEntry; onRetry: () => void; onDismiss: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const q = entry.question;
  const unit = getUnit(q.unitId);
  const lesson = getLesson(q.topicId);
  const isOpen = entry.status === "open";

  return (
    <li className="rounded-xl border bg-card shadow-card">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start">
        {isOpen ? (
          <XCircle className="mt-0.5 size-5 shrink-0 text-danger" aria-label="Still to retry" />
        ) : (
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-label="Corrected" />
        )}
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-[15px] font-medium leading-snug">{q.stem}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>
              {q.courseId === "usgov" ? "U.S. Gov" : "Comp Gov"} · Unit {unit?.number}
            </span>
            {lesson && (
              <Link href={`/lessons/${lesson.id}`} className="hover:text-primary">
                {lesson.title}
              </Link>
            )}
            <Badge variant={entry.misses > 1 ? "danger" : "neutral"}>Missed ×{entry.misses}</Badge>
            <OriginBadge entry={entry} />
            <span>
              {isOpen
                ? `Last missed ${formatDate(isoToDateKey(entry.lastMissedAt))}`
                : `Corrected ${formatDate(isoToDateKey(entry.correctedAt!))}`}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
          <Button size="sm" onClick={onRetry}>
            <RotateCcw /> {isOpen ? "Retry" : "Retry again"}
          </Button>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={() => setRevealed((r) => !r)} aria-expanded={revealed}>
              {revealed ? <EyeOff /> : <Eye />} {revealed ? "Hide" : "Answer"}
            </Button>
            <Button size="icon-sm" variant="ghost" onClick={onDismiss} aria-label="Remove from Mistake Log" title="Remove from Mistake Log">
              <Trash2 />
            </Button>
          </div>
        </div>
      </div>
      {revealed && (
        <div className="border-t p-3">
          {isOpen && (
            <p className="mb-2 px-2 text-xs text-muted-foreground">Tip: try it with Second Chance before reading the answer — retrieving it yourself makes it stick.</p>
          )}
          <QuestionCard question={q} mode="review" selected={entry.lastWrongChoice ?? null} className="border-0 p-2 shadow-none sm:p-3" />
        </div>
      )}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Second Chance
// ---------------------------------------------------------------------------

interface Result {
  entry: MistakeEntry;
  correct: boolean;
}

function SecondChance({ entries, onExit }: { entries: MistakeEntry[]; onExit: () => void }) {
  const recordAttempt = useStore((s) => s.recordAttempt);
  const logStudy = useStore((s) => s.logStudy);
  const [round, setRound] = useState(entries);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [outcome, setOutcome] = useState<boolean | null>(null);
  const started = useRef(Date.now());
  const answered = useRef(0);
  const logged = useRef(false);

  const entry = round[index];
  const current = useMemo(() => (entry ? reshuffleChoices(entry.question) : null), [entry]);
  const done = index >= round.length;

  const logTime = () => {
    if (logged.current || !answered.current) return;
    logged.current = true;
    logStudy(Math.max(1, Math.round((Date.now() - started.current) / 60000)), "practice");
  };

  useEffect(() => {
    if (done) logTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);
  useEffect(() => () => logTime(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const onAnswer = (choice: ChoiceId, correct: boolean, seconds: number) => {
    if (!entry || !current) return;
    const q = entry.question;
    recordAttempt(
      { questionId: q.id, courseId: q.courseId, unitId: q.unitId, topicId: q.topicId, selected: current.toOriginal[choice], correct, seconds, source: "review" },
      entry.origin === "bank" ? undefined : q,
    );
    answered.current += 1;
    setResults((r) => [...r, { entry, correct }]);
    setOutcome(correct);
  };

  if (done) {
    const fixed = results.filter((r) => r.correct).length;
    const still = results.filter((r) => !r.correct).map((r) => r.entry);
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Card>
          <CardContent className="pt-6 text-center">
            {fixed === results.length ? (
              <PartyPopper className="mx-auto size-10 text-success" aria-hidden />
            ) : (
              <RotateCcw className="mx-auto size-10 text-primary" aria-hidden />
            )}
            <h1 className="mt-3 text-2xl font-bold tracking-tight">
              You corrected {fixed} of {results.length}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {still.length === 0
                ? "Every one of these moved to your Corrected list."
                : `${still.length} ${still.length === 1 ? "question stays" : "questions stay"} in your log. Reading the explanation and trying again later is how they stick.`}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {still.length > 0 && (
                <Button
                  onClick={() => {
                    setRound(shuffle(still));
                    setIndex(0);
                    setResults([]);
                    setOutcome(null);
                    logged.current = false;
                    answered.current = 0;
                    started.current = Date.now();
                  }}
                >
                  <RotateCcw /> Retry the {still.length} still missed
                </Button>
              )}
              <Button variant="outline" onClick={onExit}>
                Back to Mistake Log
              </Button>
            </div>
          </CardContent>
        </Card>
        {still.length > 0 && (
          <Card>
            <CardContent className="space-y-2 pt-5">
              <p className="text-sm font-semibold">Still in your log</p>
              {still.map((e) => {
                const lesson = getLesson(e.question.topicId);
                return (
                  <div key={e.question.id} className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm">
                    <span className="line-clamp-1">{e.question.stem}</span>
                    {lesson && (
                      <Link href={`/lessons/${lesson.id}`} className="shrink-0 text-xs font-medium text-primary hover:underline">
                        Review lesson
                      </Link>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  const fixedSoFar = results.filter((r) => r.correct).length;
  const missedSoFar = results.length - fixedSoFar;
  const lastWrong = choiceText(entry.question, entry.lastWrongChoice);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <RotateCcw className="size-4 text-primary" aria-hidden /> Second Chance
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Progress value={results.length} max={round.length} label="Second Chance progress" />
            <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
              {Math.min(index + 1, round.length)}/{round.length}
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-lg bg-success-soft px-2 py-1 text-sm font-semibold text-success" title="Corrected">
          <CheckCircle2 className="size-4" aria-hidden /> {fixedSoFar}
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg bg-danger-soft px-2 py-1 text-sm font-semibold text-danger" title="Still missed">
          <XCircle className="size-4" aria-hidden /> {missedSoFar}
        </span>
        <Button variant="ghost" size="sm" onClick={() => setIndex(round.length)}>
          <Square /> End
        </Button>
      </div>

      <p className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Shuffle className="size-3.5" aria-hidden /> Answer choices are reshuffled, so recall the answer, not its position. Missed ×{entry.misses} before.
        <OriginBadge entry={entry} />
      </p>

      {current && <QuestionCard key={`${entry.question.id}-${index}`} question={current.question} mode="practice" keyboard number={index + 1} onAnswer={onAnswer} />}

      {outcome !== null && (
        <div
          role="status"
          className={cn(
            "mt-4 rounded-xl border p-4 text-sm animate-slide-up",
            outcome ? "border-success/30 bg-success-soft text-success" : "border-warning/30 bg-warning-soft text-warning",
          )}
        >
          <p className="flex items-center gap-2 font-semibold">
            {outcome ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />}
            {outcome ? "Corrected — this one moves to your Corrected list." : "Not yet — it stays in your Mistake Log for another try."}
          </p>
          {lastWrong && <p className="mt-1 text-foreground/80">Last time you chose: “{lastWrong}”</p>}
        </div>
      )}

      {outcome !== null && (
        <div className="sticky bottom-20 mt-4 flex justify-end lg:bottom-6">
          <Button
            size="lg"
            className="shadow-lift"
            autoFocus
            onClick={() => {
              setOutcome(null);
              setIndex((i) => i + 1);
            }}
          >
            {index + 1 >= round.length ? "See results" : "Next mistake"} <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}
