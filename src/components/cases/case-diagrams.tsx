"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CASE_CLUSTERS, CASES, getCase } from "@/content";
import type { CaseCluster, SupremeCourtCase } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Case map: rows are constitutional topics, the x-axis is time. Lines connect
 * related cases (precedents built on, narrowed, or overturned). Hover a case
 * to highlight its connections; select it to open the case.
 */
export function CaseMap({ cases, highlight }: { cases: SupremeCourtCase[]; highlight?: Set<string> }) {
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);
  const clusters = Object.keys(CASE_CLUSTERS) as CaseCluster[];

  const W = 1000;
  const LEFT = 170;
  const RIGHT = 30;
  const ROW = 62;
  const TOP = 36;
  const H = TOP + clusters.length * ROW + 10;

  // Piecewise time scale: most landmark cases are after 1950.
  const x = (year: number) => {
    const span = W - LEFT - RIGHT;
    if (year < 1900) return LEFT + ((year - 1800) / 100) * span * 0.14;
    if (year < 1950) return LEFT + span * 0.14 + ((year - 1900) / 50) * span * 0.2;
    return LEFT + span * 0.34 + ((year - 1950) / 75) * span * 0.66;
  };

  const layout = useMemo(() => {
    const pos = new Map<string, { x: number; y: number; labelAbove: boolean }>();
    clusters.forEach((cluster, row) => {
      const rowCases = CASES.filter((c) => c.cluster === cluster).sort((a, b) => a.year - b.year);
      let lastX = -Infinity;
      let above = false;
      for (const c of rowCases) {
        const cx = x(c.year);
        above = cx - lastX < 90 ? !above : false;
        pos.set(c.id, { x: cx, y: TOP + row * ROW + ROW / 2, labelAbove: above });
        lastX = cx;
      }
    });
    return pos;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const edges = useMemo(() => {
    const seen = new Set<string>();
    const out: { a: string; b: string }[] = [];
    for (const c of CASES)
      for (const r of c.related) {
        const key = [c.id, r.id].sort().join("|");
        if (!seen.has(key)) {
          seen.add(key);
          out.push({ a: c.id, b: r.id });
        }
      }
    return out;
  }, []);

  const visible = new Set(cases.map((c) => c.id));
  const active = hover ?? null;
  const connected = new Set(active ? edges.filter((e) => e.a === active || e.b === active).flatMap((e) => [e.a, e.b]) : []);

  const ticks = [1800, 1850, 1900, 1925, 1950, 1970, 1990, 2010, 2025];

  return (
    <div className="scrollbar-thin overflow-x-auto rounded-xl border bg-card shadow-card">
      <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[760px]" role="group" aria-label="Map of Supreme Court cases by topic and year, with lines connecting related cases">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={TOP - 6} y2={H - 10} stroke="var(--border)" strokeDasharray="2 4" />
            <text x={x(t)} y={TOP - 14} textAnchor="middle" fontSize={11} fill="var(--muted-foreground)">
              {t}
            </text>
          </g>
        ))}
        {clusters.map((cl, row) => (
          <g key={cl}>
            {row % 2 === 0 && <rect x={0} y={TOP + row * ROW} width={W} height={ROW} fill="var(--muted)" opacity={0.45} />}
            <text x={14} y={TOP + row * ROW + ROW / 2 + 4} fontSize={12} fontWeight={600} fill="var(--foreground)">
              {CASE_CLUSTERS[cl].label}
            </text>
          </g>
        ))}

        {edges.map((e) => {
          const pa = layout.get(e.a);
          const pb = layout.get(e.b);
          if (!pa || !pb) return null;
          const on = active && (e.a === active || e.b === active);
          const mx = (pa.x + pb.x) / 2;
          const bend = pa.y === pb.y ? -26 : 0;
          const d = `M ${pa.x} ${pa.y} C ${mx} ${pa.y + bend}, ${mx} ${pb.y + bend}, ${pb.x} ${pb.y}`;
          return <path key={`${e.a}-${e.b}`} d={d} fill="none" stroke={on ? "var(--primary)" : "var(--input)"} strokeWidth={on ? 2 : 1.25} opacity={active && !on ? 0.25 : 1} />;
        })}

        {CASES.map((c) => {
          const p = layout.get(c.id)!;
          const dim = !visible.has(c.id) || (active !== null && !connected.has(c.id) && active !== c.id);
          const isActive = active === c.id;
          const marked = highlight?.has(c.id);
          return (
            <a
              key={c.id}
              href={`/cases/${c.id}`}
              onClick={(ev) => {
                ev.preventDefault();
                router.push(`/cases/${c.id}`);
              }}
              onMouseEnter={() => setHover(c.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(c.id)}
              onBlur={() => setHover(null)}
              aria-label={`${c.name}, ${c.year}${c.required ? ", required case" : ""}`}
              style={{ opacity: dim ? 0.25 : 1, transition: "opacity 150ms" }}
            >
              <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
              <circle
                cx={p.x}
                cy={p.y}
                r={isActive ? 8 : 6.5}
                fill={c.required ? "var(--primary)" : "var(--card)"}
                stroke={marked ? "var(--streak)" : "var(--primary)"}
                strokeWidth={marked ? 3 : 2}
              />
              <text x={p.x} y={p.labelAbove ? p.y - 13 : p.y + 21} textAnchor="middle" fontSize={11} fontWeight={isActive ? 700 : 500} fill="var(--foreground)">
                {c.shortName}
              </text>
            </a>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-4 border-t px-4 py-2.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-primary" /> Required case
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-full border-2 border-primary bg-card" /> Supplemental case
        </span>
        <span>Hover or focus a case to see its connections.</span>
      </div>
    </div>
  );
}

/** Radial diagram of one case and its related cases, with relationship labels. */
export function CaseConnections({ caseId }: { caseId: string }) {
  const center = getCase(caseId)!;
  const related = center.related.map((r) => ({ ...r, c: getCase(r.id)! })).filter((r) => r.c);
  const W = 640;
  const H = related.length > 2 ? 380 : 260;
  const cx = W / 2;
  const cy = H / 2;
  const R = related.length > 2 ? 140 : 110;

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${center.shortName} and ${related.length} related cases`}>
        {related.map((r, i) => {
          const angle = (i / related.length) * Math.PI * 2 - Math.PI / 2 + (related.length === 2 ? 0 : 0);
          const x = cx + Math.cos(angle) * R * 1.6;
          const y = cy + Math.sin(angle) * R;
          return (
            <g key={r.id}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--input)" strokeWidth={1.5} />
              <circle cx={x} cy={y} r={7} fill={r.c.required ? "var(--primary)" : "var(--card)"} stroke="var(--primary)" strokeWidth={2} />
              <text x={x} y={y + (Math.sin(angle) < -0.3 ? -16 : 24)} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--foreground)">
                {r.c.shortName} ({r.c.year})
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={34} fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth={2} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--primary)">
          {center.shortName.length > 12 ? `${center.shortName.slice(0, 11)}…` : center.shortName}
        </text>
      </svg>
      <ul className="mt-2 space-y-2">
        {related.map((r) => (
          <li key={r.id}>
            <Link href={`/cases/${r.id}`} className="flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition hover:bg-muted">
              <span className={cn("size-2.5 shrink-0 rounded-full border-2 border-primary", r.c.required && "bg-primary")} aria-hidden />
              <span className="font-semibold">
                {r.c.name} ({r.c.year})
              </span>
              <span className="ml-auto text-right text-xs text-muted-foreground">{r.relation}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
