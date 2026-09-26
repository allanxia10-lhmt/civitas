import { notFound } from "next/navigation";
import { COURSES, getCourse } from "@/content";
import { CourseOverview } from "./course-overview";

export function generateStaticParams() {
  return COURSES.map((c) => ({ courseId: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return { title: getCourse(courseId)?.title ?? "Course" };
}

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();
  return <CourseOverview courseId={course.id} />;
}
