import type { Country } from "../types";

export const mexico: Country = {
  id: "mexico",
  name: "Mexico",
  officialName: "United Mexican States",
  code: "MX",
  regimeLabel: "Federal presidential republic · Electoral democracy",
  summary:
    "Mexico transitioned from seven decades of dominant-party rule under the PRI to competitive elections, marked by the opposition's presidential victory in 2000. It is a federal presidential republic whose democracy faces challenges from organized crime, corruption, and debates over institutional independence.",
  lastUpdated: "2026-09-23",
  keyFacts: [
    { label: "Head of state & government", value: "President Claudia Sheinbaum, MORENA (took office October 2024)", timeSensitive: true },
    { label: "Presidential term", value: "One six-year term (sexenio); no reelection" },
    { label: "Constitution", value: "1917 (frequently amended)" },
    { label: "Legislature", value: "Congress of the Union: Chamber of Deputies (500) and Senate (128)" },
    { label: "Territorial structure", value: "Federal: 31 states and Mexico City" },
    { label: "Capital", value: "Mexico City" },
  ],
  sections: [
    {
      key: "structure",
      title: "Government Structure",
      body:
        "Mexico is a federal presidential republic under the 1917 Constitution, which emerged from the Mexican Revolution. Power is separated among an executive, a bicameral legislature, and a judiciary, and divided between the national government and 31 states plus Mexico City. In practice, the national government — and especially the presidency — has historically dominated.",
      bullets: [
        "From 1929 to 2000, the Institutional Revolutionary Party (PRI) won every presidential election, using patronage, corporatism, and electoral manipulation.",
        "Electoral reforms in the 1990s, including an independent electoral institute, enabled real competition.",
      ],
    },
    {
      key: "executive",
      title: "Executive",
      body:
        "The president is both head of state and head of government, directly elected by plurality for a single six-year term with no reelection — a legacy of opposition to Porfirio Díaz's long dictatorship. The president appoints the cabinet and has significant agenda-setting and decree-like regulatory powers. Presidential dominance has varied with the president's party's strength in Congress.",
      bullets: [
        "Claudia Sheinbaum became Mexico's first woman president in October 2024, succeeding Andrés Manuel López Obrador.",
      ],
    },
    {
      key: "legislature",
      title: "Legislature",
      body:
        "The Congress of the Union is bicameral. The Chamber of Deputies has 500 members: 300 elected from single-member districts and 200 by proportional representation. The Senate has 128 members: three per state (two for the plurality winner, one for the first minority) plus 32 elected nationally by PR. Since 2018, legislators may be reelected for a limited number of consecutive terms. Congress became more assertive after PRI dominance ended, especially under divided government.",
    },
    {
      key: "judiciary",
      title: "Judiciary",
      body:
        "Reforms in the 1990s strengthened the Supreme Court's power to review laws. A 2024 constitutional reform introduced popular elections for judges, including Supreme Court justices, and restructured the Court. The first judicial elections were held in 2025 with low turnout. Supporters argued the reform would fight corruption and make judges accountable; critics argued it would politicize the courts and weaken judicial independence.",
    },
    {
      key: "parties",
      title: "Political Parties",
      body:
        "MORENA, founded by López Obrador, won the presidency in 2018 and 2024 and has become the dominant political force. The PAN (center-right) and PRI (historically dominant, centrist) have weakened; the PRD lost its registration after 2024. Smaller parties include Movimiento Ciudadano, the Greens (PVEM), and the Labor Party (PT), several of which ally with MORENA.",
    },
    {
      key: "electoral",
      title: "Electoral System",
      body:
        "The president is elected by simple plurality. Congress uses a mixed system combining single-member districts and proportional representation. The National Electoral Institute (INE) administers elections and was central to democratization; its independence and budget have been the subject of political conflict.",
    },
    {
      key: "participation",
      title: "Political Participation",
      body:
        "Citizens participate through elections, parties, protests, and social movements. Notable movements include the Zapatista uprising (EZLN) in Chiapas beginning January 1, 1994, which highlighted Indigenous rights and opposition to NAFTA, and protests over violence, disappearances, and gender-based violence.",
    },
    {
      key: "culture",
      title: "Political Culture",
      body:
        "Mexican political culture reflects the legacy of clientelism and corporatism from the PRI era, along with growing expectations of accountability. Important cleavages include north–south economic differences, urban–rural divides, class, and Indigenous identity. Religion (predominantly Catholic) matters socially, though the constitution establishes a secular state.",
    },
    {
      key: "economy",
      title: "Economy",
      body:
        "After decades of state-led import-substitution industrialization, Mexico liberalized in the 1980s and 1990s, privatizing many state-owned enterprises and joining NAFTA in 1994 (replaced by the USMCA in 2020). Its economy is closely tied to the United States through manufacturing and trade. The state oil company, Pemex, remains central to debates over energy policy and national sovereignty. Social programs included the conditional cash transfer program Progresa/Oportunidades/Prospera, replaced in 2019 by direct transfers.",
    },
    {
      key: "civil-society",
      title: "Civil Society",
      body:
        "Civil society has grown more independent since the end of PRI corporatism, with active human rights groups, journalists, and Indigenous organizations. However, Mexico is one of the most dangerous countries in the world for journalists, largely because of violence linked to organized crime.",
    },
  ],
  currentIssues: [
    {
      title: "Judicial reform and institutional independence",
      body: "The effects of the 2024 judicial reform and the 2025 judicial elections on court independence remain a central political debate.",
    },
    {
      title: "Trade and relations with the United States",
      body: "Mexico's deep economic ties to the U.S. make tariffs, the USMCA's review, security cooperation, and migration policy major political issues.",
    },
    {
      title: "Security and organized crime",
      body: "Violence linked to cartels continues to challenge the rule of law, state capacity, and the safety of journalists and candidates.",
    },
  ],
  compare: {
    regime: { tag: "Electoral democracy", text: "Competitive elections since 2000, but weaknesses in rule of law, security, and institutional independence." },
    system: { tag: "Presidential", text: "Separately elected president with a fixed term; separation of powers." },
    executive: { tag: "Single executive", text: "President is head of state and government; single six-year term, no reelection." },
    legislature: { tag: "Bicameral", text: "Chamber of Deputies (500) and Senate (128)." },
    electoral: { tag: "Mixed (SMD + PR)", text: "300 SMD and 200 PR deputies; president elected by plurality." },
    parties: { tag: "Competitive multiparty", text: "MORENA dominant since 2018; PAN and PRI weakened; several smaller parties." },
    judiciary: { tag: "Partially independent", text: "Gained power in the 1990s; 2024 reform introduced elected judges, raising independence concerns." },
    liberties: { tag: "Partially protected", text: "Legal protections exist, but violence against journalists and activists is severe." },
    participation: { tag: "Open", text: "Voluntary participation, protest, and social movements such as the Zapatistas." },
    economy: { tag: "Market", text: "Liberalized, export-oriented economy tied to the U.S. through NAFTA/USMCA; state oil company Pemex." },
    territorial: { tag: "Federal", text: "31 states and Mexico City, though the center has historically dominated." },
  },
};
