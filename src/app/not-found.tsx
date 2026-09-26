import { Compass } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <Logo href="/" />
      <Compass className="mt-10 size-10 text-muted-foreground" aria-hidden />
      <h1 className="mt-4 text-2xl font-bold tracking-tight">We couldn&apos;t find that page</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">It may have moved, or the link might be mistyped.</p>
      <div className="mt-6 flex gap-2">
        <Button asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/search">Search</Link>
        </Button>
      </div>
    </div>
  );
}
