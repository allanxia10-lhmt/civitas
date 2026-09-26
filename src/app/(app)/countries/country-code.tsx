import { cn } from "@/lib/utils";

/** A neutral country marker (ISO code) — avoids emoji flags, which render inconsistently across platforms. */
export function CountryCode({ code, className }: { code: string; className?: string }) {
  return (
    <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl bg-compgov-soft text-sm font-bold tracking-wide text-compgov", className)} aria-hidden>
      {code}
    </span>
  );
}
