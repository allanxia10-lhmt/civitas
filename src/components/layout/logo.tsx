import { Landmark } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ href = "/dashboard", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={cn("flex items-center gap-2.5 rounded-lg", className)} aria-label="Civitas home">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-card">
        <Landmark className="size-[18px]" aria-hidden />
      </span>
      <span className="text-[17px] font-bold tracking-tight">
        Civitas<span className="ml-1.5 text-xs font-semibold text-muted-foreground">AP Gov</span>
      </span>
    </Link>
  );
}
