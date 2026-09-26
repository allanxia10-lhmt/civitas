import { cn } from "@/lib/utils";

export function StatCard({
  icon,
  label,
  value,
  sub,
  tone = "primary",
  className,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "primary" | "streak" | "success" | "xp" | "warning" | "compgov";
  className?: string;
  children?: React.ReactNode;
}) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    streak: "bg-streak-soft text-streak",
    success: "bg-success-soft text-success",
    xp: "bg-xp-soft text-xp",
    warning: "bg-warning-soft text-warning",
    compgov: "bg-compgov-soft text-compgov",
  } as const;
  return (
    <div className={cn("flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-card sm:p-5", className)}>
      <div className="flex items-center gap-2.5">
        <span className={cn("flex size-9 items-center justify-center rounded-lg [&_svg]:size-[18px]", tones[tone])}>{icon}</span>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight tabular-nums sm:text-[28px]">{value}</div>
        {sub && <div className="mt-0.5 text-[13px] text-muted-foreground">{sub}</div>}
      </div>
      {children}
    </div>
  );
}
