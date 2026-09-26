"use client";

import { Check, Equal, GitCompareArrows, Lightbulb, Split } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SourceLabel } from "@/components/common/labels";
import { PageHeader } from "@/components/common/page-header";
import { COMPARE_DIMENSIONS, COUNTRIES, getCountry } from "@/content";
import type { CompareDimension, Country, CountryId } from "@/content/types";
import { cn } from "@/lib/utils";
import { CountryCode } from "../countries/country-code";

const PRESETS: { label: string; ids: CountryId[] }[] = [
  { label: "China vs. United Kingdom", ids: ["china", "uk"] },
  { label: "Mexico vs. Nigeria", ids: ["mexico", "nigeria"] },
  { label: "Russia vs. Iran", ids: ["russia", "iran"] },
  { label: "UK vs. Russia vs. Mexico", ids: ["uk", "russia", "mexico"] },
  { label: "All six", ids: ["uk", "mexico", "nigeria", "russia", "china", "iran"] },
];

type Agreement = "shared" | "partial" | "different";

function analyze(dim: CompareDimension, countries: Country[]) {
  const groups = new Map<string, Country[]>();
  for (const c of countries) {
    const tag = c.compare[dim].tag;
    groups.set(tag, [...(groups.get(tag) ?? []), c]);
  }
  const agreement: Agreement = groups.size === 1 ? "shared" : groups.size === countries.length ? "different" : "partial";
  return { groups, agreement };
}

const joinNames = (names: string[]) => (names.length <= 2 ? names.join(" and ") : `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`);

export function CompareTool() {
  const params = useSearchParams();
  const router = useRouter();
  const selectedIds = (params.get("c") ?? "china,uk").split(",").filter((id): id is CountryId => !!getCountry(id));
  // Keep the order the student chose ("China vs. United Kingdom").
  const selected = [...new Set(selectedIds)].map((id) => getCountry(id)!);

  const setSelection = (ids: CountryId[]) => router.replace(`/compare?c=${ids.join(",")}`, { scroll: false });
  const toggle = (id: CountryId) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) setSelection(selectedIds.filter((x) => x !== id));
    } else setSelection([...selectedIds, id]);
  };

  const rows = COMPARE_DIMENSIONS.map((d) => ({ ...d, ...analyze(d.key, selected) }));
  const shared = rows.filter((r) => r.agreement === "shared");
  const different = rows.filter((r) => r.agreement === "different");
  const partial = rows.filter((r) => r.agreement === "partial");

  return (
    <div>
      <PageHeader
        eyebrow={<SourceLabel source="explanation" />}
        title={selected.length === 2 ? `Compare ${selected[0].name} vs. ${selected[1].name}` : "Compare countries"}
        description="Choose two or more countries. Rows are labeled Shared, Partly shared, or Different, and matching values are called out so you can build comparative arguments quickly."
      />

      <section aria-labelledby="pick" className="mb-6 rounded-xl border bg-card p-4 shadow-card sm:p-5">
        <h2 id="pick" className="mb-3 text-sm font-semibold">
          Countries <span className="font-normal text-muted-foreground">(select at least two)</span>
        </h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select countries">
          {COUNTRIES.map((c) => {
            const on = selectedIds.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                aria-pressed={on}
                disabled={on && selectedIds.length <= 2}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed",
                  on ? "border-compgov bg-compgov-soft text-compgov" : "bg-card hover:bg-muted",
                )}
              >
                {on && <Check className="size-3.5" aria-hidden />}
                {c.name}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3 text-sm">
          <span className="text-muted-foreground">Quick picks:</span>
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => setSelection(p.ids)} className="rounded-md px-2 py-1 font-medium text-primary transition hover:bg-primary-soft">
              {p.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="takeaways" className="mb-6 grid gap-3 md:grid-cols-3">
        <h2 id="takeaways" className="sr-only">
          Key takeaways
        </h2>
        <div className="rounded-xl border bg-card p-4 shadow-card">
          <p className="flex items-center gap-2 text-sm font-semibold text-success">
            <Equal className="size-4" aria-hidden /> Similarities
          </p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {shared.length === 0 && partial.length === 0 && <li className="text-muted-foreground">No shared categories among these countries.</li>}
            {shared.map((r) => (
              <li key={r.key}>
                <span className="font-medium">{r.label}:</span> “{r.groups.keys().next().value}” for {selected.length === 2 ? "both" : `all ${selected.length}`}.
              </li>
            ))}
            {partial.slice(0, 4).map((r) => {
              const pair = [...r.groups.entries()].find(([, cs]) => cs.length > 1)!;
              return (
                <li key={r.key}>
                  <span className="font-medium">{r.label}:</span> {joinNames(pair[1].map((c) => c.name))} share “{pair[0]}.”
                </li>
              );
            })}
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-card">
          <p className="flex items-center gap-2 text-sm font-semibold text-warning">
            <Split className="size-4" aria-hidden /> Differences
          </p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {different.length === 0 && <li className="text-muted-foreground">No dimension where every country differs.</li>}
            {different.slice(0, 5).map((r) => (
              <li key={r.key}>
                <span className="font-medium">{r.label}:</span> {selected.map((c) => `${c.name} (${c.compare[r.key].tag})`).join(" · ")}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-primary-soft/50 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Lightbulb className="size-4" aria-hidden /> Use it on the exam
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            Comparative Analysis questions reward a specific similarity or difference <em>and</em> an explanation of why. Pick one row below, then explain the cause using regime type,
            history, or institutions.
          </p>
        </div>
      </section>

      <div className="scrollbar-thin overflow-x-auto rounded-xl border bg-card shadow-card">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <caption className="sr-only">Comparison of {selected.map((c) => c.name).join(", ")}</caption>
          <thead>
            <tr className="border-b bg-muted/50">
              <th scope="col" className="sticky left-0 z-[1] w-44 bg-muted/95 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Dimension
              </th>
              {selected.map((c) => (
                <th key={c.id} scope="col" className="px-4 py-3 text-left">
                  <Link href={`/countries/${c.id}`} className="flex items-center gap-2 font-semibold hover:text-compgov">
                    <CountryCode code={c.code} className="size-8 rounded-lg text-xs" /> {c.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-b align-top last:border-0">
                <th scope="row" className="sticky left-0 z-[1] bg-card px-4 py-4 text-left">
                  <span className="block font-semibold">{r.label}</span>
                  <span
                    className={cn(
                      "mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      r.agreement === "shared" && "bg-success-soft text-success",
                      r.agreement === "partial" && "bg-primary-soft text-primary",
                      r.agreement === "different" && "bg-warning-soft text-warning",
                    )}
                  >
                    {r.agreement === "shared" ? "Shared" : r.agreement === "partial" ? "Partly shared" : "Different"}
                  </span>
                </th>
                {selected.map((c) => {
                  const v = c.compare[r.key];
                  const matches = (r.groups.get(v.tag) ?? []).filter((x) => x.id !== c.id);
                  return (
                    <td key={c.id} className="px-4 py-4">
                      <span className={cn("inline-flex rounded-md px-2 py-0.5 text-xs font-semibold", matches.length ? "bg-success-soft text-success" : "bg-muted text-foreground")}>{v.tag}</span>
                      <p className="mt-1.5 leading-relaxed text-muted-foreground">{v.text}</p>
                      {matches.length > 0 && r.agreement !== "shared" && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-success">
                          <GitCompareArrows className="size-3.5" aria-hidden /> Same as {joinNames(matches.map((m) => m.name))}
                        </p>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
