"use client";

import { useEffect, useMemo, useState } from "react";
import { FLASHCARDS } from "@/content";
import { computeMastery } from "./mastery";
import { isDue } from "./srs";
import { useStore } from "./store";
import { generateStudyPlan } from "./study-plan";
import { toDateKey } from "./utils";

/** Today's local date key; re-evaluates if the tab stays open past midnight. */
export function useToday(): string {
  const [today, setToday] = useState(() => toDateKey());
  useEffect(() => {
    const id = setInterval(() => {
      const now = toDateKey();
      setToday((prev) => (prev === now ? prev : now));
    }, 60_000);
    return () => clearInterval(id);
  }, []);
  return today;
}

/** The generated study plan (depends only on the profile). */
export function usePlan() {
  const profile = useStore((s) => s.progress.profile);
  return useMemo(() => generateStudyPlan(profile), [profile]);
}

/** Everything most pages need, memoized on the progress object. */
export function useStudyData() {
  const progress = useStore((s) => s.progress);
  const hydrated = useStore((s) => s.hydrated);
  const today = useToday();
  const plan = usePlan();
  const mastery = useMemo(() => computeMastery(progress, today), [progress, today]);
  const allCards = useMemo(() => [...FLASHCARDS, ...progress.customFlashcards], [progress.customFlashcards]);
  const dueCards = useMemo(
    () => allCards.filter((c) => progress.profile.courses.includes(c.courseId) && isDue(progress.flashcards[c.id], today)),
    [allCards, progress.flashcards, progress.profile.courses, today],
  );
  return { progress, hydrated, today, plan, mastery, allCards, dueCards };
}

/** Counts elapsed seconds while mounted (pauses when the tab is hidden). */
export function useElapsed(running = true) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);
  return [seconds, setSeconds] as const;
}
