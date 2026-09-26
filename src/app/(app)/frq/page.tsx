import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { FrqList } from "./frq-list";

export const metadata = { title: "FRQ Practice" };

export default function FrqPage() {
  return (
    <Suspense fallback={<PageSkeleton variant="list" />}>
      <FrqList />
    </Suspense>
  );
}
