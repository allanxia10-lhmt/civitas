"use client";

import { ArrowRight, BookA, FileText, Globe2, Landmark, Layers, Lightbulb, Plus, Scale, Search, Shuffle, Trash2, UserPen } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/common/empty-state";
import { CourseBadge } from "@/components/common/labels";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input, Label, NativeSelect, Textarea } from "@/components/ui/input";
import { Segmented } from "@/components/ui/misc";
import { DECKS, unitsForCourse } from "@/content";
import type { CourseId, DeckId } from "@/content/types";
import { useStudyData } from "@/lib/hooks";
import { isDue, isHard, isNew } from "@/lib/srs";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const DECK_ICONS: Record<DeckId, typeof Layers> = {
  vocabulary: BookA,
  scotus: Scale,
  documents: FileText,
  concepts: Lightbulb,
  countries: Globe2,
  institutions: Landmark,
  custom: UserPen,
};

type CourseFilter = "all" | CourseId;

export function FlashcardHub() {
  const { progress, today, allCards } = useStudyData();
  const params = useSearchParams();
  const router = useRouter();
  const deleteCustom = useStore((s) => s.deleteCustomFlashcard);
  const [course, setCourse] = useState<CourseFilter>((params.get("course") as CourseFilter) ?? "all");
  const [browseDeck, setBrowseDeck] = useState<DeckId | null>((params.get("deck") as DeckId) ?? null);
  const [query, setQuery] = useState("");

  const inCourse = allCards.filter((c) => course === "all" || c.courseId === course);
  const due = inCourse.filter((c) => isDue(progress.flashcards[c.id], today));
  const hard = inCourse.filter((c) => isHard(progress.flashcards[c.id]));
  const fresh = inCourse.filter((c) => isNew(progress.flashcards[c.id]));

  const decks = (Object.keys(DECKS) as DeckId[])
    .map((id) => {
      const cards = inCourse.filter((c) => c.deck === id);
      return {
        id,
        cards,
        due: cards.filter((c) => isDue(progress.flashcards[c.id], today)).length,
        fresh: cards.filter((c) => isNew(progress.flashcards[c.id])).length,
      };
    })
    .filter((d) => d.cards.length || d.id === "custom");

  const courseQuery = course === "all" ? "" : `course=${course}&`;
  const browsing = useMemo(() => {
    if (!browseDeck) return [];
    const q = query.trim().toLowerCase();
    return inCourse.filter((c) => c.deck === browseDeck && (!q || c.front.toLowerCase().includes(q) || c.back.toLowerCase().includes(q)));
  }, [browseDeck, inCourse, query]);

  return (
    <div>
      <PageHeader
        title="Flashcards"
        description="Spaced repetition schedules each card for review just before you'd forget it. Mark cards Again, Hard, or Easy and the schedule adapts."
        actions={
          <>
            <Segmented
              ariaLabel="Course filter"
              value={course}
              onChange={(v) => {
                setCourse(v);
                router.replace(v === "all" ? "/flashcards" : `/flashcards?course=${v}`, { scroll: false });
              }}
              options={[
                { value: "all", label: "All" },
                { value: "usgov", label: "U.S. Gov" },
                { value: "compgov", label: "Comp Gov" },
              ]}
            />
            <CreateCardDialog defaultCourse={course === "all" ? progress.profile.courses[0] ?? "usgov" : course} />
          </>
        }
      />

      <section className="mb-8 grid gap-3 md:grid-cols-3">
        <Link href={`/flashcards/study?${courseQuery}mode=due`} className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-5 shadow-lift transition hover:border-primary/40 md:col-span-1">
          <p className="text-sm font-medium text-muted-foreground">Due for review</p>
          <p className="mt-1 text-4xl font-bold tabular-nums">{due.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">{hard.length} marked Hard or Again recently</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            {due.length ? "Start review" : "Learn new cards"} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
        <Link href={`/flashcards/study?${courseQuery}mode=hard`} className="rounded-2xl border bg-card p-5 shadow-card transition hover:border-primary/30">
          <p className="text-sm font-medium text-muted-foreground">Hard cards</p>
          <p className="mt-1 text-4xl font-bold tabular-nums">{hard.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Extra reps on your trouble spots</p>
        </Link>
        <Link href={`/flashcards/study?${courseQuery}mode=all&shuffle=1`} className="rounded-2xl border bg-card p-5 shadow-card transition hover:border-primary/30">
          <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Shuffle className="size-4" aria-hidden /> Shuffle everything
          </p>
          <p className="mt-1 text-4xl font-bold tabular-nums">{inCourse.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">{fresh.length} you haven&apos;t studied yet</p>
        </Link>
      </section>

      <h2 className="mb-3 text-lg font-semibold tracking-tight">Decks</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((d) => {
          const Icon = DECK_ICONS[d.id];
          const active = browseDeck === d.id;
          return (
            <div key={d.id} className={cn("flex flex-col rounded-xl border bg-card p-4 shadow-card", active && "border-primary ring-2 ring-primary/20")}>
              <div className="flex items-start gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{DECKS[d.id].label}</h3>
                  <p className="text-xs text-muted-foreground">{DECKS[d.id].description}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{d.cards.length}</span> cards · <span className="font-semibold text-foreground">{d.due}</span> due · {d.fresh} new
              </p>
              <div className="mt-4 flex gap-2">
                <Button asChild size="sm" disabled={!d.cards.length}>
                  <Link href={`/flashcards/study?${courseQuery}deck=${d.id}`}>Study</Link>
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setBrowseDeck(active ? null : d.id)} aria-pressed={active}>
                  {active ? "Hide cards" : "Browse"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {browseDeck && (
        <section className="mt-8" aria-labelledby="browse-title">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="browse-title" className="text-lg font-semibold tracking-tight">
              {DECKS[browseDeck].label} <span className="text-muted-foreground">({browsing.length})</span>
            </h2>
            <div className="relative sm:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search this deck" className="pl-9" aria-label="Search this deck" />
            </div>
          </div>
          {browsing.length === 0 ? (
            <EmptyState
              icon={<Layers />}
              title={browseDeck === "custom" ? "No custom cards yet" : "No cards match"}
              description={browseDeck === "custom" ? "Create cards for mnemonics, examples from class, or anything you want to remember." : undefined}
              action={browseDeck === "custom" ? <CreateCardDialog defaultCourse={course === "all" ? "usgov" : course} /> : undefined}
            />
          ) : (
            <ul className="grid gap-3 md:grid-cols-2">
              {browsing.map((c) => {
                const state = progress.flashcards[c.id];
                return (
                  <li key={c.id} className="rounded-xl border bg-card p-4 shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold">{c.front}</p>
                      {c.deck === "custom" && (
                        <button onClick={() => deleteCustom(c.id)} className="rounded-md p-1 text-muted-foreground hover:bg-danger-soft hover:text-danger" aria-label={`Delete card ${c.front}`}>
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                    <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{c.back}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <CourseBadge courseId={c.courseId} />
                      {state ? <span>Next review {state.due <= today ? "today" : state.due}</span> : <span>New</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}

function CreateCardDialog({ defaultCourse }: { defaultCourse: CourseId }) {
  const addCard = useStore((s) => s.addCustomFlashcard);
  const [open, setOpen] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [courseId, setCourseId] = useState<CourseId>(defaultCourse);
  const [unitId, setUnitId] = useState("");

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;
    addCard({ courseId, front: front.trim(), back: back.trim(), unitId: unitId || undefined });
    setFront("");
    setBack("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Create card
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={save} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Create a flashcard</DialogTitle>
            <DialogDescription>Custom cards join your spaced-repetition reviews alongside the built-in decks.</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="fc-front">Front</Label>
            <Input id="fc-front" className="mt-1.5" value={front} onChange={(e) => setFront(e.target.value)} placeholder="Term, question, or case name" required />
          </div>
          <div>
            <Label htmlFor="fc-back">Back</Label>
            <Textarea id="fc-back" className="mt-1.5 min-h-24" value={back} onChange={(e) => setBack(e.target.value)} placeholder="Definition, answer, or holding" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="fc-course">Course</Label>
              <NativeSelect
                id="fc-course"
                className="mt-1.5"
                value={courseId}
                onChange={(e) => {
                  setCourseId(e.target.value as CourseId);
                  setUnitId("");
                }}
              >
                <option value="usgov">AP U.S. Gov</option>
                <option value="compgov">AP Comp Gov</option>
              </NativeSelect>
            </div>
            <div>
              <Label htmlFor="fc-unit">Unit (optional)</Label>
              <NativeSelect id="fc-unit" className="mt-1.5" value={unitId} onChange={(e) => setUnitId(e.target.value)}>
                <option value="">None</option>
                {unitsForCourse(courseId).map((u) => (
                  <option key={u.id} value={u.id}>
                    Unit {u.number}
                  </option>
                ))}
              </NativeSelect>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!front.trim() || !back.trim()}>
              Save card
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
