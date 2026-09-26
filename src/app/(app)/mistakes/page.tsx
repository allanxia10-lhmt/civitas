import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { MistakeLog } from "./mistake-log";

export const metadata = { title: "Mistake Log" };

export default function MistakesPage() {
  return (
    <Suspense fallback={<PageSkeleton variant="list" />}>
      <MistakeLog />
    </Suspense>
  );
}
