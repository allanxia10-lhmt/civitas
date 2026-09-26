import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { SearchView } from "./search-view";

export const metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <Suspense fallback={<PageSkeleton variant="list" />}>
      <SearchView />
    </Suspense>
  );
}
