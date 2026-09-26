import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { CASES, getCase } from "@/content";
import { CaseDetail } from "./case-detail";

export function generateStaticParams() {
  return CASES.map((c) => ({ caseId: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const c = getCase(caseId);
  return { title: c ? `${c.name} (${c.year})` : "Case", description: c?.principle };
}

export default async function CasePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  if (!getCase(caseId)) notFound();
  return (
    <Suspense fallback={<PageSkeleton variant="detail" />}>
      <CaseDetail caseId={caseId} />
    </Suspense>
  );
}
