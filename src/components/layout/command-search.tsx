"use client";

import { ArrowRight, BookOpen, CornerDownLeft, FileText, Globe2, Layers, ListChecks, PenLine, Scale, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/misc";
import { search, SEARCH_SUGGESTIONS, type SearchType } from "@/lib/search";
import { cn } from "@/lib/utils";

export const TYPE_ICONS: Record<SearchType, typeof BookOpen> = {
  lesson: BookOpen,
  case: Scale,
  document: FileText,
  country: Globe2,
  frq: PenLine,
  question: ListChecks,
  flashcard: Layers,
};

export function CommandSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => (query.trim() ? search(query, { limit: 8 }) : []), [query]);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const total = results.length + (query.trim() ? 1 : 0);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(1, total));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + Math.max(1, total)) % Math.max(1, total));
    } else if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      if (active < results.length) go(results[active].href);
      else go(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[12%] max-w-xl translate-y-0 gap-0 p-0" hideClose aria-describedby={undefined}>
        <DialogTitle className="sr-only">Search Civitas</DialogTitle>
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search lessons, cases, documents, countries…"
            className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="command-results"
            aria-activedescendant={results.length ? `cmd-${active}` : undefined}
            aria-label="Search"
          />
          <Kbd>Esc</Kbd>
        </div>

        {!query.trim() ? (
          <div className="p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Try searching</p>
            <div className="flex flex-wrap gap-2">
              {SEARCH_SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => setQuery(s)} className="rounded-full border bg-card px-3 py-1 text-sm transition hover:bg-muted">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ul id="command-results" ref={listRef} role="listbox" className="scrollbar-thin max-h-[60dvh] overflow-y-auto p-2">
            {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted-foreground">No results for “{query}”.</li>}
            {results.map((r, i) => {
              const Icon = TYPE_ICONS[r.type];
              return (
                <li key={r.id} id={`cmd-${i}`} data-index={i} role="option" aria-selected={active === i}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.href)}
                    className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition", active === i && "bg-muted")}
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{r.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">{r.subtitle}</span>
                    </span>
                    {active === i && <CornerDownLeft className="size-4 text-muted-foreground" aria-hidden />}
                  </button>
                </li>
              );
            })}
            {query.trim() && (
              <li data-index={results.length} role="option" aria-selected={active === results.length}>
                <button
                  onMouseEnter={() => setActive(results.length)}
                  onClick={() => go(`/search?q=${encodeURIComponent(query)}`)}
                  className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-primary transition", active === results.length && "bg-muted")}
                >
                  See all results for “{query}” <ArrowRight className="size-4" />
                </button>
              </li>
            )}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
