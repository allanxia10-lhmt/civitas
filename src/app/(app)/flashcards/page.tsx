import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { FlashcardHub } from "./flashcard-hub";

export const metadata = { title: "Flashcards" };

export default function FlashcardsPage() {
  return (
    <Suspense fallback={<PageSkeleton variant="list" />}>
      <FlashcardHub />
    </Suspense>
  );
}
