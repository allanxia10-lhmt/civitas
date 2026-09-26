import type { Frq } from "@/content/types";

export interface CriterionEstimate {
  partIndex: number;
  criterionId: string;
  points: number;
  likely: boolean;
  note: string;
}

export const wordCount = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);

/**
 * Automated *estimate* for FRQ responses. It checks each rubric criterion for
 * key language and sufficient development. It cannot judge accuracy or
 * reasoning quality the way a trained reader does, so the UI always labels it
 * as an estimate and asks students to confirm each point themselves.
 */
export function estimateFrq(frq: Frq, responses: string[]): CriterionEstimate[] {
  return frq.parts.flatMap((part, partIndex) => {
    const text = (responses[partIndex] ?? "").toLowerCase();
    const words = wordCount(text);
    return part.criteria.map((c): CriterionEstimate => {
      const base = { partIndex, criterionId: c.id, points: c.points };
      if (words < 8) return { ...base, likely: false, note: "Too short to evaluate — aim for at least two complete sentences." };
      if (c.minWords && words < c.minWords) {
        return { ...base, likely: false, note: `Likely needs more development (about ${c.minWords}+ words for this point).` };
      }
      if (c.signals?.length) {
        const missing = c.signals.find((group) => !group.some((s) => text.includes(s.toLowerCase())));
        if (missing) return { ...base, likely: false, note: `Didn't find language like "${missing.slice(0, 3).join("\", \"")}".` };
        return { ...base, likely: true, note: "Key language found — confirm your explanation is accurate and specific." };
      }
      return { ...base, likely: words >= 15, note: words >= 15 ? "Developed response — check it against the rubric." : "Consider developing this further." };
    });
  });
}

export function possiblePoints(frq: Frq): number {
  return frq.parts.reduce((sum, p) => sum + p.criteria.reduce((s, c) => s + c.points, 0), 0);
}
