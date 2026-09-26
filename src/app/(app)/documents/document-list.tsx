"use client";

import { FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SourceLabel } from "@/components/common/labels";
import { PageHeader } from "@/components/common/page-header";
import { TaskBanner } from "@/components/common/task-ui";
import { Badge } from "@/components/ui/badge";
import { DOCUMENTS, getUnit } from "@/content";
import { useStudyData } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function DocumentList() {
  const params = useSearchParams();
  const { progress } = useStudyData();
  const unitFilter = params.get("unit");
  const docs = [...DOCUMENTS].sort((a, b) => Number(!!unitFilter && !b.unitIds.includes(unitFilter)) - Number(!!unitFilter && !a.unitIds.includes(unitFilter)));
  const added = DOCUMENTS.filter((d) => d.addedIn);

  return (
    <div>
      <TaskBanner />
      <PageHeader
        eyebrow={<SourceLabel source="official" />}
        title="Foundational documents"
        description={`The ${DOCUMENTS.length} documents required by the 2026–27 AP U.S. Government and Politics framework. Each page covers context, the main argument, key quotations, and what you need to know for the exam.`}
      />

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-success/25 bg-success-soft/50 p-4 text-sm">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
        <p>
          <span className="font-semibold">New for 2026–27:</span> {added.map((d) => d.shortTitle).join(", ")}. College Board added these to the required list starting in fall 2026.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((d) => {
          const viewed = progress.lastViewed[`document:${d.id}`];
          const inUnit = unitFilter && d.unitIds.includes(unitFilter);
          return (
            <Link
              key={d.id}
              href={`/documents/${d.id}`}
              className={cn(
                "group flex flex-col rounded-xl border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift",
                inUnit && "border-primary/40 ring-1 ring-primary/20",
              )}
            >
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-usgov-soft text-usgov">
                  <FileText className="size-[18px]" aria-hidden />
                </span>
                {d.addedIn && <Badge variant="success">New {d.addedIn}</Badge>}
                {viewed && <span className="ml-auto text-xs text-muted-foreground">Viewed</span>}
              </div>
              <h2 className="mt-3 font-semibold leading-snug tracking-tight group-hover:text-primary">{d.title}</h2>
              <p className="text-sm text-muted-foreground">
                {d.author.split(" (")[0]} · {d.year}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{d.mainArgument}</p>
              <p className="mt-auto pt-4 text-xs text-muted-foreground">{d.unitIds.map((u) => `Unit ${getUnit(u)?.number}`).join(", ")}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
