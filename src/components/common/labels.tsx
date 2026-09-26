import { BadgeCheck, BookOpenText, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ContentSource, CourseId } from "@/content/types";
import { cn } from "@/lib/utils";

export function CourseBadge({ courseId, short = true, className }: { courseId: CourseId; short?: boolean; className?: string }) {
  return (
    <Badge variant={courseId === "usgov" ? "usgov" : "compgov"} className={className}>
      {courseId === "usgov" ? (short ? "U.S. Gov" : "AP U.S. Government") : short ? "Comp Gov" : "AP Comparative Government"}
    </Badge>
  );
}

const SOURCE_INFO: Record<ContentSource, { label: string; title: string; icon: typeof BadgeCheck; variant: "success" | "neutral" | "xp" }> = {
  official: { label: "Official AP requirement", title: "From College Board's current course framework", icon: BadgeCheck, variant: "success" },
  explanation: { label: "Educational explanation", title: "Written by Civitas to explain course concepts", icon: BookOpenText, variant: "neutral" },
  practice: { label: "Practice material", title: "Original practice written for Civitas — not official College Board questions", icon: PenLine, variant: "xp" },
};

/** Labels content by origin so students can tell official requirements from explanations and practice. */
export function SourceLabel({ source, className }: { source: ContentSource; className?: string }) {
  const info = SOURCE_INFO[source];
  const Icon = info.icon;
  return (
    <Badge variant={info.variant} className={cn("font-medium", className)} title={info.title}>
      <Icon aria-hidden />
      {info.label}
    </Badge>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: "easy" | "medium" | "hard" }) {
  const variant = difficulty === "easy" ? "success" : difficulty === "medium" ? "warning" : "danger";
  return (
    <Badge variant={variant} className="capitalize">
      {difficulty}
    </Badge>
  );
}
