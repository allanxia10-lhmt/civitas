"use client";

import {
  CalendarRange,
  ChevronDown,
  Flame,
  Home,
  Layers,
  ListChecks,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, SheetContent } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/misc";
import { useToday } from "@/lib/hooks";
import { levelFor, streak, xp } from "@/lib/stats";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CommandSearch } from "./command-search";
import { Logo } from "./logo";
import { COURSE_NAV, isNavActive, MAIN_NAV, TOOL_NAV, type NavItem } from "./nav-config";
import { ThemeToggle } from "./theme-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  const hydrated = useStore((s) => s.hydrated);
  const onboarded = useStore((s) => s.progress.profile.onboarded);
  const init = useStore((s) => s.init);
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    void init();
  }, [init]);

  useEffect(() => {
    if (hydrated && !onboarded) router.replace("/onboarding");
  }, [hydrated, onboarded, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
      if (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-sidebar lg:flex" aria-label="Main navigation">
        <div className="flex h-16 items-center px-5">
          <Logo />
        </div>
        <Suspense>
          <SidebarNav />
        </Suspense>
      </aside>

      <div className="lg:pl-64">
        <Topbar onSearch={() => setSearchOpen(true)} onMenu={() => setMenuOpen(true)} />
        <DemoBanner />
        <main id="main" className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-12 lg:pt-8">
          {hydrated && onboarded ? children : <PageSkeleton />}
        </main>
      </div>

      <MobileBottomNav />

      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent aria-describedby={undefined}>
          <DialogTitle className="sr-only">Navigation</DialogTitle>
          <div className="flex h-16 items-center px-5">
            <Logo />
          </div>
          <Suspense>
            <SidebarNav onNavigate={() => setMenuOpen(false)} />
          </Suspense>
        </SheetContent>
      </Dialog>

      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

function NavLink({ item, active, onNavigate, nested }: { item: NavItem; active: boolean; onNavigate?: () => void; nested?: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
        nested ? "h-8 pl-10 text-[13px]" : "h-9",
        active ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {Icon && <Icon className="size-[18px] shrink-0" aria-hidden />}
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const courses = useStore((s) => s.progress.profile.courses);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const isOpen = (id: string, items: NavItem[]) =>
    open[id] ?? (courses.includes(id as never) || items.some((i) => isNavActive(i.href, pathname, params)));

  return (
    <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-6">
      <div className="space-y-0.5">
        {MAIN_NAV.map((item) => (
          <NavLink key={item.href} item={item} active={isNavActive(item.href, pathname, params)} onNavigate={onNavigate} />
        ))}
      </div>

      {COURSE_NAV.map((group) => {
        const expanded = isOpen(group.id, group.items);
        const Icon = group.icon;
        return (
          <div key={group.id} className="mt-5">
            <button
              onClick={() => setOpen((o) => ({ ...o, [group.id]: !expanded }))}
              aria-expanded={expanded}
              className="flex h-9 w-full items-center gap-3 rounded-lg px-3 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              <Icon className={cn("size-[18px] shrink-0", group.id === "usgov" ? "text-usgov" : "text-compgov")} aria-hidden />
              <span className="flex-1 truncate text-left">{group.label}</span>
              <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", expanded && "rotate-180")} aria-hidden />
            </button>
            {expanded && (
              <div className="mt-0.5 space-y-0.5">
                {group.items.map((item) => (
                  <NavLink key={item.href} item={item} nested active={isNavActive(item.href, pathname, params)} onNavigate={onNavigate} />
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-5 space-y-0.5 border-t pt-4">
        {TOOL_NAV.map((item) => (
          <NavLink key={item.href} item={item} active={isNavActive(item.href, pathname, params)} onNavigate={onNavigate} />
        ))}
      </div>
    </nav>
  );
}

function Topbar({ onSearch, onMenu }: { onSearch: () => void; onMenu: () => void }) {
  const progress = useStore((s) => s.progress);
  const hydrated = useStore((s) => s.hydrated);
  const today = useToday();
  const { current, studiedToday } = useMemo(() => streak(progress, today), [progress, today]);
  const level = useMemo(() => levelFor(xp(progress, today)), [progress, today]);
  const initial = progress.profile.name.trim().charAt(0).toUpperCase() || "S";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <Button variant="ghost" size="icon-sm" className="lg:hidden" onClick={onMenu} aria-label="Open navigation menu">
        <Menu />
      </Button>
      <div className="lg:hidden">
        <Logo />
      </div>

      <button
        onClick={onSearch}
        className="hidden h-10 w-full max-w-md items-center gap-3 rounded-lg border bg-card px-3 text-sm text-muted-foreground shadow-card transition hover:border-input lg:flex"
        aria-label="Search (Ctrl+K)"
      >
        <Search className="size-4" aria-hidden />
        <span className="flex-1 text-left">Search lessons, cases, countries…</span>
        <Kbd>Ctrl K</Kbd>
      </button>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <Button variant="ghost" size="icon-sm" className="lg:hidden" onClick={onSearch} aria-label="Search">
          <Search />
        </Button>
        {hydrated && (
          <>
            <Link
              href="/progress"
              className={cn(
                "flex h-8 items-center gap-1.5 rounded-full px-2.5 text-sm font-semibold transition hover:opacity-80",
                studiedToday ? "bg-streak-soft text-streak" : "bg-muted text-muted-foreground",
              )}
              aria-label={`${current}-day study streak${studiedToday ? "" : ". Study today to keep it going."}`}
              title={studiedToday ? "Streak active today" : "Study today to keep your streak"}
            >
              <Flame className={cn("size-4", studiedToday && "fill-current")} aria-hidden />
              <span className="tabular-nums">{current}</span>
            </Link>
            <Link
              href="/progress#achievements"
              className="hidden h-8 items-center gap-1.5 rounded-full bg-xp-soft px-2.5 text-sm font-semibold text-xp transition hover:opacity-80 sm:flex"
              aria-label={`Level ${level.level}, ${level.toNext} XP to next level`}
            >
              <Sparkles className="size-4" aria-hidden />
              Lv {level.level}
            </Link>
          </>
        )}
        <ThemeToggle />
        <Link
          href="/settings"
          className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
          aria-label="Account settings"
        >
          {initial}
        </Link>
      </div>
    </header>
  );
}

function DemoBanner() {
  const isDemo = useStore((s) => s.progress.profile.isDemo);
  const hydrated = useStore((s) => s.hydrated);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    try {
      setHidden(window.sessionStorage.getItem("civitas:demo-banner") === "hidden");
    } catch {
      setHidden(false);
    }
  }, []);
  if (!hydrated || !isDemo || hidden) return null;
  return (
    <div className="border-b bg-primary-soft/70">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 text-sm sm:px-6 lg:px-8">
        <Sparkles className="size-4 shrink-0 text-primary" aria-hidden />
        <p className="flex-1">
          You&apos;re exploring <strong>demo data</strong> for a sample student.{" "}
          <Link href="/onboarding" className="font-semibold text-primary underline-offset-4 hover:underline">
            Build your own plan →
          </Link>
        </p>
        <button
          onClick={() => {
            setHidden(true);
            try {
              window.sessionStorage.setItem("civitas:demo-banner", "hidden");
            } catch {
              // ignore
            }
          }}
          className="rounded-md p-1 text-muted-foreground hover:bg-card"
          aria-label="Dismiss demo notice"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}

const MOBILE_NAV: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/study-plan", label: "Plan", icon: CalendarRange },
  { href: "/practice", label: "Practice", icon: ListChecks },
  { href: "/flashcards", label: "Cards", icon: Layers },
  { href: "/review", label: "Review", icon: Sparkles },
];

function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-md">
        {MOBILE_NAV.map((item) => {
          const Icon = item.icon!;
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`)) || (item.href === "/practice" && pathname === "/practice");
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium", active ? "text-primary" : "text-muted-foreground")}
              >
                <Icon className={cn("size-5", active && "stroke-[2.4]")} aria-hidden />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
