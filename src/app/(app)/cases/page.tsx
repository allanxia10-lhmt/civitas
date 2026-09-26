import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { CaseList } from "./case-list";

export const metadata = { title: "Supreme Court Cases" };

export default function CasesPage() {
  return (
    <Suspense fallback={<PageSkeleton variant="list" />}>
      <CaseList />
    </Suspense>
  );
}
