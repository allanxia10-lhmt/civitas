import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { DOCUMENTS, getDocument } from "@/content";
import { DocumentDetail } from "./document-detail";

export function generateStaticParams() {
  return DOCUMENTS.map((d) => ({ docId: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ docId: string }> }) {
  const { docId } = await params;
  const d = getDocument(docId);
  return { title: d?.title ?? "Document", description: d?.mainArgument };
}

export default async function DocumentPage({ params }: { params: Promise<{ docId: string }> }) {
  const { docId } = await params;
  if (!getDocument(docId)) notFound();
  return (
    <Suspense fallback={<PageSkeleton variant="detail" />}>
      <DocumentDetail docId={docId} />
    </Suspense>
  );
}
