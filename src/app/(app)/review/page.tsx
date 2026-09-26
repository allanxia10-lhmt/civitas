import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { SmartReview } from "./smart-review";

export const metadata = { title: "What Should I Study?" };

export default function ReviewPage() {
  return (
    <Suspense fallback={<PageSkeleton variant="list" />}>
      <SmartReview />
    </Suspense>
  );
}
