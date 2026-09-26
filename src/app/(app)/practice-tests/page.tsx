import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { TestList } from "./test-list";

export const metadata = { title: "Practice Tests" };

export default function PracticeTestsPage() {
  return (
    <Suspense fallback={<PageSkeleton variant="list" />}>
      <TestList />
    </Suspense>
  );
}
