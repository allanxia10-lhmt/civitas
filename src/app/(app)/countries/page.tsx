"use client";

import { ArrowRight, Clock, GitCompareArrows } from "lucide-react";
import Link from "next/link";
import { SourceLabel } from "@/components/common/labels";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { COUNTRIES } from "@/content";
import { formatDate } from "@/lib/utils";
import { CountryCode } from "./country-code";

export default function CountriesPage() {
  return (
    <div>
      <PageHeader
        eyebrow={<SourceLabel source="explanation" />}
        title="Country profiles"
        description="The six AP Comparative Government course countries: structure, institutions, parties, elections, participation, culture, economy, and civil society."
        actions={
          <Button asChild>
            <Link href="/compare">
              <GitCompareArrows /> Compare countries
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {COUNTRIES.map((c) => (
          <Link key={c.id} href={`/countries/${c.id}`} className="group flex flex-col rounded-2xl border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-compgov/40 hover:shadow-lift">
            <div className="flex items-center gap-3">
              <CountryCode code={c.code} />
              <div>
                <h2 className="font-semibold tracking-tight group-hover:text-compgov">{c.name}</h2>
                <p className="text-xs text-muted-foreground">{c.regimeLabel}</p>
              </div>
            </div>
            <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
            <dl className="mt-4 space-y-1.5 text-sm">
              {c.keyFacts.slice(0, 2).map((f) => (
                <div key={f.label} className="flex gap-2">
                  <dt className="w-28 shrink-0 text-muted-foreground">{f.label}</dt>
                  <dd className="font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto flex items-center justify-between pt-5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden /> Last Updated: {formatDate(c.lastUpdated, { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
