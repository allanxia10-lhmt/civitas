"use client";

import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/common/empty-state";
import { CourseBadge } from "@/components/common/labels";
import { PageHeader } from "@/components/common/page-header";
import { TYPE_ICONS } from "@/components/layout/command-search";
import { Input } from "@/components/ui/input";
import { search, SEARCH_SUGGESTIONS, SEARCH_TYPE_LABELS, type SearchType } from "@/lib/search";
import { cn } from "@/lib/utils";

const TYPE_ORDER: SearchType[] = ["lesson", "case", "document", "country", "frq", "question", "flashcard"];

export function SearchView() {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [type, setType] = useState<SearchType | "all">("all");

  useEffect(() => {
    const id = setTimeout(() => {
      const q = query.trim();
      router.replace(q ? `/search?q=${encodeURIComponent(q)}` : "/search", { scroll: false });
    }, 250);
    return () => clearTimeout(id);
  }, [query, router]);

  const results = useMemo(() => (query.trim() ? search(query, { limit: 200 }) : []), [query]);
  const counts = TYPE_ORDER.map((t) => ({ t, n: results.filter((r) => r.type === t).length })).filter((c) => c.n > 0);
  const shown = type === "all" ? results : results.filter((r) => r.type === type);
  const grouped = TYPE_ORDER.map((t) => ({ t, items: shown.filter((r) => r.type === t) })).filter((g) => g.items.length);

  return (
    <div>
      <PageHeader title="Search" description="Lessons, flashcards, practice questions, Supreme Court cases, foundational documents, and country pages." />

      <div className="relative mb-4">
        <SearchIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setType("all");
          }}
          placeholder="Try “Federalism” or “China legislature”"
          className="h-14 rounded-xl pl-12 text-base"
          aria-label="Search"
        />
      </div>

      {!query.trim() ? (
        <div className="flex flex-wrap gap-2">
          {SEARCH_SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => setQuery(s)} className="rounded-full border bg-card px-3 py-1.5 text-sm transition hover:bg-muted">
              {s}
            </button>
          ))}
        </div>
      ) : results.length === 0 ? (
        <EmptyState icon={<SearchIcon />} title={`No results for “${query}”`} description="Check the spelling, or try a broader term like “Congress” or “elections.”" />
      ) : (
        <>
          <div className="scrollbar-thin -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter results by type">
            <FilterChip active={type === "all"} onClick={() => setType("all")} label={`All (${results.length})`} />
            {counts.map(({ t, n }) => (
              <FilterChip key={t} active={type === t} onClick={() => setType(t)} label={`${SEARCH_TYPE_LABELS[t]} (${n})`} />
            ))}
          </div>
          <div className="space-y-8">
            {grouped.map(({ t, items }) => {
              const Icon = TYPE_ICONS[t];
              return (
                <section key={t} aria-labelledby={`g-${t}`}>
                  <h2 id={`g-${t}`} className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    <Icon className="size-4" aria-hidden /> {SEARCH_TYPE_LABELS[t]}
                  </h2>
                  <ul className="divide-y overflow-hidden rounded-xl border bg-card shadow-card">
                    {items.slice(0, type === "all" ? 6 : 100).map((r) => (
                      <li key={r.id}>
                        <Link href={r.href} className="flex items-center gap-3 px-4 py-3 transition hover:bg-muted/60">
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{r.title}</p>
                            <p className="truncate text-sm text-muted-foreground">{r.subtitle}</p>
                          </div>
                          {r.courseId && <CourseBadge courseId={r.courseId} className="hidden sm:inline-flex" />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {type === "all" && items.length > 6 && (
                    <button onClick={() => setType(t)} className="mt-2 text-sm font-medium text-primary hover:underline">
                      Show all {items.length} {SEARCH_TYPE_LABELS[t].toLowerCase()}
                    </button>
                  )}
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn("shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition", active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted")}
    >
      {label}
    </button>
  );
}
