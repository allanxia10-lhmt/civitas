import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { getPracticeTest, PRACTICE_TESTS } from "@/content";
import { TestRunner } from "./test-runner";

export function generateStaticParams() {
  return PRACTICE_TESTS.map((t) => ({ testId: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  return { title: getPracticeTest(testId)?.title ?? "Practice test" };
}

export default async function TestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  if (!getPracticeTest(testId)) notFound();
  return (
    <Suspense fallback={<PageSkeleton variant="detail" />}>
      <TestRunner testId={testId} />
    </Suspense>
  );
}
