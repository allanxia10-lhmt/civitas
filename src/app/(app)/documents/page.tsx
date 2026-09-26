import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { DocumentList } from "./document-list";

export const metadata = { title: "Foundational Documents" };

export default function DocumentsPage() {
  return (
    <Suspense fallback={<PageSkeleton variant="list" />}>
      <DocumentList />
    </Suspense>
  );
}
