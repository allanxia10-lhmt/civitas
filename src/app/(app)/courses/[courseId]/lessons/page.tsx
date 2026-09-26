import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { COURSES, getCourse } from "@/content";
import { LessonCatalog } from "./lesson-catalog";

export function generateStaticParams() {
  return COURSES.map((c) => ({ courseId: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return { title: `Lessons · ${getCourse(courseId)?.shortTitle ?? "Course"}` };
}

export default async function LessonsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();
  return (
    <Suspense fallback={<PageSkeleton variant="list" />}>
      <LessonCatalog courseId={course.id} />
    </Suspense>
  );
}
