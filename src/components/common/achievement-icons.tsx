import { BookOpen, ClipboardCheck, Flame, Globe2, Layers, PenLine, Scale, Sparkles, Target, Trophy } from "lucide-react";
import type { AchievementIcon } from "@/lib/achievements";

export const ACHIEVEMENT_ICONS: Record<AchievementIcon, typeof Flame> = {
  flame: Flame,
  trophy: Trophy,
  book: BookOpen,
  scale: Scale,
  globe: Globe2,
  pen: PenLine,
  clipboard: ClipboardCheck,
  layers: Layers,
  target: Target,
  sparkles: Sparkles,
};
