import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { CompareTool } from "./compare-tool";

export const metadata = { title: "Country Comparison Tool" };

export default function ComparePage() {
  return (
    <Suspense fallback={<PageSkeleton variant="detail" />}>
      <CompareTool />
    </Suspense>
  );
}
