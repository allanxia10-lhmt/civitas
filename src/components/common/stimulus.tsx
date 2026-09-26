import type { Stimulus } from "@/content/types";
import { cn } from "@/lib/utils";

/** Renders a question or FRQ stimulus: a quoted text, a data table, or a simple bar chart. */
export function StimulusView({ stimulus, className }: { stimulus: Stimulus; className?: string }) {
  if (stimulus.kind === "text") {
    return (
      <figure className={cn("rounded-xl border-l-4 border-primary bg-muted/60 px-5 py-4", className)}>
        {stimulus.title && <figcaption className="mb-1 text-sm font-semibold">{stimulus.title}</figcaption>}
        <blockquote className="font-display text-[17px] leading-relaxed">{stimulus.text}</blockquote>
        {stimulus.source && <figcaption className="mt-2 text-sm text-muted-foreground">— {stimulus.source}</figcaption>}
      </figure>
    );
  }

  if (stimulus.kind === "table") {
    return (
      <figure className={cn("overflow-hidden rounded-xl border", className)}>
        <figcaption className="border-b bg-muted/60 px-4 py-2.5 text-sm font-semibold">{stimulus.title}</figcaption>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-card">
                {stimulus.headers.map((h) => (
                  <th key={h} scope="col" className="px-4 py-2 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stimulus.rows.map((row, i) => (
                <tr key={i} className="border-b last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className={cn("px-4 py-2 tabular-nums", j === 0 && "font-medium")}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(stimulus.source || stimulus.note) && (
          <div className="space-y-0.5 border-t bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
            {stimulus.source && <p>Source: {stimulus.source}</p>}
            {stimulus.note && <p>{stimulus.note}</p>}
          </div>
        )}
      </figure>
    );
  }

  const max = Math.max(...stimulus.series.map((s) => s.value)) * 1.1;
  return (
    <figure className={cn("rounded-xl border p-4", className)}>
      <figcaption className="mb-4 text-sm font-semibold">{stimulus.title}</figcaption>
      <div className="flex h-44 items-end gap-3 border-b border-l pl-2" role="img" aria-label={`${stimulus.title}. ${stimulus.series.map((s) => `${s.label}: ${s.value}${stimulus.unit}`).join(", ")}`}>
        {stimulus.series.map((s) => (
          <div key={s.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span className="text-xs font-semibold tabular-nums">
              {s.value}
              {stimulus.unit === "%" ? "%" : ""}
            </span>
            <div className="w-full max-w-14 rounded-t-md bg-primary/80" style={{ height: `${(s.value / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-3 pl-2">
        {stimulus.series.map((s) => (
          <span key={s.label} className="flex-1 text-center text-xs text-muted-foreground">
            {s.label}
          </span>
        ))}
      </div>
      {(stimulus.source || stimulus.note) && (
        <div className="mt-3 space-y-0.5 text-xs text-muted-foreground">
          {stimulus.source && <p>Source: {stimulus.source}</p>}
          {stimulus.note && <p>{stimulus.note}</p>}
        </div>
      )}
    </figure>
  );
}
