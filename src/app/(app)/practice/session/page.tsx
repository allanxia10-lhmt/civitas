import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { PracticeSession } from "./practice-session";

export const metadata = { title: "Practice session" };

export default function PracticeSessionPage() {
  return (
    <Suspense fallback={<PageSkeleton variant="detail" />}>
      <PracticeSession />
    </Suspense>
  );
}
