import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { FlashcardStudy } from "./flashcard-study";

export const metadata = { title: "Flashcard review" };

export default function FlashcardStudyPage() {
  return (
    <Suspense fallback={<PageSkeleton variant="detail" />}>
      <FlashcardStudy />
    </Suspense>
  );
}
