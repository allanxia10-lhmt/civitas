import {
  BarChart3,
  CalendarRange,
  ClipboardCheck,
  Globe2,
  Infinity as InfinityIcon,
  Landmark,
  Layers,
  LayoutDashboard,
  NotebookPen,
  Search,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { CourseId } from "@/content/types";

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
}

export const MAIN_NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/study-plan", label: "Study Plan", icon: CalendarRange },
  { href: "/review", label: "What Should I Study?", icon: Sparkles },
];

export const COURSE_NAV: { id: CourseId; label: string; icon: LucideIcon; items: NavItem[] }[] = [
  {
    id: "usgov",
    label: "AP U.S. Government",
    icon: Landmark,
    items: [
      { href: "/courses/usgov", label: "Units" },
      { href: "/courses/usgov/lessons", label: "Lessons" },
      { href: "/practice?course=usgov", label: "Practice" },
      { href: "/frq?course=usgov", label: "FRQs" },
      { href: "/cases", label: "Supreme Court Cases" },
      { href: "/documents", label: "Foundational Documents" },
    ],
  },
  {
    id: "compgov",
    label: "AP Comparative Government",
    icon: Globe2,
    items: [
      { href: "/courses/compgov", label: "Units" },
      { href: "/courses/compgov/lessons", label: "Lessons" },
      { href: "/practice?course=compgov", label: "Practice" },
      { href: "/frq?course=compgov", label: "FRQs" },
      { href: "/countries", label: "Country Profiles" },
      { href: "/compare", label: "Comparison Tool" },
    ],
  },
];

export const TOOL_NAV: NavItem[] = [
  { href: "/practice/endless", label: "Endless Practice", icon: InfinityIcon },
  { href: "/mistakes", label: "Mistake Log", icon: NotebookPen },
  { href: "/flashcards", label: "Flashcards", icon: Layers },
  { href: "/practice-tests", label: "Practice Tests", icon: ClipboardCheck },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/search", label: "Search", icon: Search },
  { href: "/settings", label: "Settings", icon: Settings },
];

/**
 * Active-state matching that understands `?course=` links, so "Practice"
 * under U.S. Gov and Comp Gov highlight independently.
 */
export function isNavActive(href: string, pathname: string, params: URLSearchParams): boolean {
  const [path, query] = href.split("?");
  if (query) {
    const wanted = new URLSearchParams(query);
    const matchesPath = pathname === path || pathname.startsWith(`${path}/`);
    return matchesPath && [...wanted.entries()].every(([k, v]) => params.get(k) === v);
  }
  if (path === "/courses/usgov" || path === "/courses/compgov") return pathname === path;
  return pathname === path || pathname.startsWith(`${path}/`);
}
