import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { FRQS, getFrq } from "@/content";
import { FrqWorkspace } from "./frq-workspace";

export function generateStaticParams() {
  return FRQS.map((f) => ({ frqId: f.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ frqId: string }> }) {
  const { frqId } = await params;
  return { title: getFrq(frqId)?.title ?? "FRQ" };
}

export default async function FrqDetailPage({ params }: { params: Promise<{ frqId: string }> }) {
  const { frqId } = await params;
  if (!getFrq(frqId)) notFound();
  return (
    <Suspense fallback={<PageSkeleton variant="detail" />}>
      <FrqWorkspace frqId={frqId} />
    </Suspense>
  );
}
