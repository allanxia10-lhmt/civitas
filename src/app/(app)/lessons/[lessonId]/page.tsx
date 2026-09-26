import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { getLesson, LESSONS } from "@/content";
import { LessonView } from "./lesson-view";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ lessonId: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  return { title: lesson?.title ?? "Lesson", description: lesson?.overview };
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  if (!getLesson(lessonId)) notFound();
  return (
    <Suspense fallback={<PageSkeleton variant="detail" />}>
      <LessonView lessonId={lessonId} />
    </Suspense>
  );
}
