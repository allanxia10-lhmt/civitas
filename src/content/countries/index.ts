import type { CompareDimension, Country, CountryId } from "../types";
import { china } from "./china";
import { iran } from "./iran";
import { mexico } from "./mexico";
import { nigeria } from "./nigeria";
import { russia } from "./russia";
import { uk } from "./uk";

export const COUNTRIES: Country[] = [uk, mexico, nigeria, russia, china, iran];

export const COUNTRY_IDS: CountryId[] = COUNTRIES.map((c) => c.id);

export const COMPARE_DIMENSIONS: { key: CompareDimension; label: string }[] = [
  { key: "regime", label: "Regime type" },
  { key: "system", label: "System of government" },
  { key: "executive", label: "Executive structure" },
  { key: "legislature", label: "Legislative structure" },
  { key: "electoral", label: "Electoral system" },
  { key: "parties", label: "Party system" },
  { key: "judiciary", label: "Judicial system" },
  { key: "liberties", label: "Civil liberties" },
  { key: "participation", label: "Political participation" },
  { key: "economy", label: "Economic system" },
  { key: "territorial", label: "Territorial structure" },
];
