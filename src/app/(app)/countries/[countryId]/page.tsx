import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/common/page-skeleton";
import { COUNTRIES, getCountry } from "@/content";
import { CountryDetail } from "./country-detail";

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ countryId: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ countryId: string }> }) {
  const { countryId } = await params;
  const c = getCountry(countryId);
  return { title: c ? `${c.name} — Country Profile` : "Country", description: c?.summary };
}

export default async function CountryPage({ params }: { params: Promise<{ countryId: string }> }) {
  const { countryId } = await params;
  if (!getCountry(countryId)) notFound();
  return (
    <Suspense fallback={<PageSkeleton variant="detail" />}>
      <CountryDetail countryId={countryId} />
    </Suspense>
  );
}
