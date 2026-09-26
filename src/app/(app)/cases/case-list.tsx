"use client";

import { LayoutGrid, Network, Scale, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { CaseMap } from "@/components/cases/case-diagrams";
import { EmptyState } from "@/components/common/empty-state";
import { SourceLabel } from "@/components/common/labels";
import { PageHeader } from "@/components/common/page-header";
import { TaskBanner } from "@/components/common/task-ui";
import { Badge } from "@/components/ui/badge";
import { Input, NativeSelect } from "@/components/ui/input";
import { Segmented, Switch } from "@/components/ui/misc";
import { CASE_CLUSTERS, CASES, unitsForCourse } from "@/content";
import type { CaseCluster } from "@/content/types";
import { normalize } from "@/lib/search";
import { cn } from "@/lib/utils";

const AMENDMENTS = ["1st", "2nd", "4th", "5th", "6th", "9th", "10th", "14th"];

export function CaseList() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [amendment, setAmendment] = useState("all");
  const [unit, setUnit] = useState(params.get("unit") ?? "all");
  const [cluster, setCluster] = useState<CaseCluster | "all">("all");
  const [requiredOnly, setRequiredOnly] = useState(false);
  const [view, setView] = useState<"cards" | "map">("cards");

  const filtered = useMemo(() => {
    const q = normalize(query);
    return CASES.filter(
      (c) =>
        (amendment === "all" || c.amendments.includes(amendment)) &&
        (unit === "all" || c.unitId === unit) &&
        (cluster === "all" || c.cluster === cluster) &&
        (!requiredOnly || c.required) &&
        (!q || normalize(`${c.name} ${c.shortName} ${c.year} ${c.topics.join(" ")} ${c.issue}`).includes(q)),
    ).sort((a, b) => Number(b.required) - Number(a.required) || a.year - b.year);
  }, [query, amendment, unit, cluster, requiredOnly]);

  const requiredCount = CASES.filter((c) => c.required).length;

  return (
    <div>
      <TaskBanner />
      <PageHeader
        eyebrow={<SourceLabel source="official" />}
        title="Supreme Court cases"
        description={`All ${requiredCount} cases required by the 2026–27 AP U.S. Government framework, plus ${CASES.length - requiredCount} supplemental cases that commonly appear in SCOTUS Comparison questions.`}
        actions={
          <Segmented
            ariaLabel="View"
            value={view}
            onChange={setView}
            options={[
              { value: "cards", label: <><LayoutGrid /> Cards</> },
              { value: "map", label: <><Network /> Case map</> },
            ]}
          />
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_160px_200px_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search cases, issues, topics" className="pl-9" aria-label="Search cases" />
        </div>
        <NativeSelect value={amendment} onChange={(e) => setAmendment(e.target.value)} aria-label="Filter by amendment">
          <option value="all">All amendments</option>
          {AMENDMENTS.map((a) => (
            <option key={a} value={a}>
              {a} Amendment
            </option>
          ))}
        </NativeSelect>
        <NativeSelect value={unit} onChange={(e) => setUnit(e.target.value)} aria-label="Filter by unit">
          <option value="all">All units</option>
          {unitsForCourse("usgov").map((u) => (
            <option key={u.id} value={u.id}>
              Unit {u.number}: {u.shortTitle}
            </option>
          ))}
        </NativeSelect>
        <label className="flex h-10 items-center gap-2 rounded-lg border bg-card px-3 text-sm font-medium shadow-card">
          <Switch checked={requiredOnly} onCheckedChange={setRequiredOnly} aria-label="Required cases only" /> Required only
        </label>
      </div>

      <div className="scrollbar-thin -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by topic">
        {(["all", ...Object.keys(CASE_CLUSTERS)] as (CaseCluster | "all")[]).map((c) => (
          <button
            key={c}
            onClick={() => setCluster(c)}
            aria-pressed={cluster === c}
            className={cn("shrink-0 rounded-full border px-3 py-1 text-sm transition", cluster === c ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted")}
          >
            {c === "all" ? "All topics" : CASE_CLUSTERS[c].label}
          </button>
        ))}
      </div>

      {view === "map" ? (
        <CaseMap cases={filtered} />
      ) : filtered.length === 0 ? (
        <EmptyState icon={<Scale />} title="No cases match these filters" description="Try clearing a filter or searching a different term." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Link key={c.id} href={`/cases/${c.id}`} className="group flex flex-col rounded-xl border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift">
              <div className="flex flex-wrap items-center gap-2">
                {c.required ? <Badge variant="success">Required</Badge> : <Badge variant="neutral">Supplemental</Badge>}
                <span className="text-xs text-muted-foreground">{CASE_CLUSTERS[c.cluster].label}</span>
              </div>
              <h2 className="mt-3 font-semibold leading-snug tracking-tight group-hover:text-primary">{c.name}</h2>
              <p className="text-sm text-muted-foreground">
                {c.year}
                {c.vote && ` · ${c.vote}`}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{c.issue}</p>
              {c.amendments.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {c.amendments.map((a) => (
                    <span key={a} className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {a} Amend.
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
