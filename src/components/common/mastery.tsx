import Link from "next/link";
import { MASTERY_LABELS, MASTERY_STYLES, type MasteryStatus } from "@/lib/mastery";
import { cn } from "@/lib/utils";

export function MasteryBar({ label, score, status, href, meta }: { label: string; score: number; status: MasteryStatus; href?: string; meta?: string }) {
  const style = MASTERY_STYLES[status];
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="truncate text-sm font-medium">{label}</span>
        <span className={cn("shrink-0 text-sm font-semibold tabular-nums", style.text)}>{status === "not-started" ? "—" : `${score}%`}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={`${label} mastery`}>
        <div className={cn("h-full rounded-full transition-[width] duration-700", style.bar)} style={{ width: `${score}%` }} />
      </div>
      {meta && <div className="mt-1 text-xs text-muted-foreground">{meta}</div>}
    </>
  );
  return href ? (
    <Link href={href} className="-mx-2 block rounded-lg px-2 py-1.5 transition hover:bg-muted">
      {body}
    </Link>
  ) : (
    <div className="py-1.5">{body}</div>
  );
}

export function MasteryPill({ status }: { status: MasteryStatus }) {
  const style = MASTERY_STYLES[status];
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold", style.soft, style.text)}>{MASTERY_LABELS[status]}</span>;
}
