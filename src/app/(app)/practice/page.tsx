import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { PracticeHub } from "./practice-hub";

export const metadata = { title: "Practice" };

export default function PracticePage() {
  return (
    <Suspense fallback={<PageSkeleton variant="list" />}>
      <PracticeHub />
    </Suspense>
  );
}
