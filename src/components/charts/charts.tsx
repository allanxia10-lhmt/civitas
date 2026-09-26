"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

/**
 * Chart conventions (see the dataviz method): single series per chart in the
 * primary color, one y-axis, recessive grid, 4px rounded data ends, hover
 * tooltips, and a visually hidden table so the data never depends on sight.
 */

export interface Datum {
  label: string;
  value: number | null;
  /** Longer label for tooltips and the data table. */
  detail?: string;
}

const AXIS_TICK = { fill: "var(--muted-foreground)", fontSize: 12 };

function ChartTooltip({ active, payload, unit }: { active?: boolean; payload?: { payload: Datum }[]; unit: string }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border bg-card px-3 py-2 text-sm shadow-lift">
      <p className="text-xs text-muted-foreground">{d.detail ?? d.label}</p>
      <p className="font-semibold tabular-nums text-foreground">{d.value === null ? "No data" : `${d.value}${unit === "%" ? "%" : ` ${unit}`}`}</p>
    </div>
  );
}

function DataTable({ data, unit, caption }: { data: Datum[]; unit: string; caption: string }) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Period</th>
          <th scope="col">Value ({unit})</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.label}>
            <td>{d.detail ?? d.label}</td>
            <td>{d.value ?? "no data"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function SimpleBarChart({
  data,
  unit,
  caption,
  goal,
  goalLabel,
  height = 200,
  className,
}: {
  data: Datum[];
  unit: string;
  caption: string;
  goal?: number;
  goalLabel?: string;
  height?: number;
  className?: string;
}) {
  return (
    <figure className={cn("w-full", className)}>
      <div style={{ height }} aria-hidden>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -12 }} barCategoryGap="28%">
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="0" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={AXIS_TICK} interval={0} />
            <YAxis tickLine={false} axisLine={false} tick={AXIS_TICK} width={40} allowDecimals={false} />
            <Tooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltip unit={unit} />} />
            {goal !== undefined && (
              <ReferenceLine
                y={goal}
                stroke="var(--muted-foreground)"
                strokeDasharray="4 4"
                label={{ value: goalLabel ?? "Goal", position: "insideTopRight", fill: "var(--muted-foreground)", fontSize: 11 }}
              />
            )}
            <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <DataTable data={data} unit={unit} caption={caption} />
    </figure>
  );
}

export function SimpleLineChart({
  data,
  unit,
  caption,
  height = 200,
  domain = [0, 100],
  className,
}: {
  data: Datum[];
  unit: string;
  caption: string;
  height?: number;
  domain?: [number, number];
  className?: string;
}) {
  return (
    <figure className={cn("w-full", className)}>
      <div style={{ height }} aria-hidden>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={AXIS_TICK} interval="preserveStartEnd" />
            <YAxis tickLine={false} axisLine={false} tick={AXIS_TICK} width={40} domain={domain} unit={unit === "%" ? "%" : ""} />
            <Tooltip cursor={{ stroke: "var(--input)", strokeWidth: 1 }} content={<ChartTooltip unit={unit} />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2}
              connectNulls
              dot={{ r: 4, fill: "var(--primary)", stroke: "var(--card)", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "var(--primary)", stroke: "var(--card)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <DataTable data={data} unit={unit} caption={caption} />
    </figure>
  );
}

/** Calendar heatmap of study minutes — sequential single hue, light → dark. */
export function ActivityHeatmap({ days, className }: { days: { date: string; minutes: number; label: string }[]; className?: string }) {
  const level = (m: number) => (m <= 0 ? 0 : m < 20 ? 1 : m < 40 ? 2 : m < 60 ? 3 : 4);
  const shades = [
    "bg-muted",
    "bg-[color-mix(in_srgb,var(--primary)_25%,var(--card))]",
    "bg-[color-mix(in_srgb,var(--primary)_50%,var(--card))]",
    "bg-[color-mix(in_srgb,var(--primary)_75%,var(--card))]",
    "bg-primary",
  ];
  // Columns are weeks (Mon–Sun top to bottom).
  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return (
    <figure className={className}>
      <div className="flex gap-1 overflow-x-auto pb-1" role="img" aria-label="Study activity heatmap for recent weeks">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((d) => (
              <div key={d.date} className={cn("size-3.5 rounded-[3px] sm:size-4", shades[level(d.minutes)])} title={`${d.label}: ${d.minutes} min`} />
            ))}
          </div>
        ))}
      </div>
      <figcaption className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        Less
        {shades.map((s, i) => (
          <span key={i} className={cn("size-3 rounded-[3px]", s)} aria-hidden />
        ))}
        More
      </figcaption>
    </figure>
  );
}
