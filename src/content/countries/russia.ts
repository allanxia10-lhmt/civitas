import type { Country } from "../types";

export const russia: Country = {
  id: "russia",
  name: "Russia",
  officialName: "Russian Federation",
  code: "RU",
  regimeLabel: "Semi-presidential federation · Authoritarian",
  summary:
    "After the Soviet Union collapsed in 1991, Russia briefly experimented with competitive politics before power recentralized under Vladimir Putin. Formally a semi-presidential federal republic, it functions as an authoritarian regime with a dominant president, a dominant party, and tight control over media and civil society.",
  lastUpdated: "2026-09-23",
  keyFacts: [
    { label: "President", value: "Vladimir Putin (president 2000–2008 and since 2012; current term began 2024)", timeSensitive: true },
    { label: "Prime minister", value: "Mikhail Mishustin (since 2020)", timeSensitive: true },
    { label: "Presidential term", value: "Six years; 2020 amendments reset the incumbent's term count" },
    { label: "Constitution", value: "1993 (amended 2020)" },
    { label: "Legislature", value: "Federal Assembly: State Duma (450) and Federation Council" },
    { label: "Capital", value: "Moscow" },
  ],
  sections: [
    {
      key: "structure",
      title: "Government Structure",
      body:
        "The 1993 Constitution created a semi-presidential federal system with a strong president. Russia is formally federal, with dozens of federal subjects including ethnic republics, but since 2000 the Kremlin has recentralized power — creating federal districts, gaining influence over regional governors, and controlling regional budgets.",
      bullets: [
        "Russia's official count of federal subjects includes Ukrainian territories it claims to have annexed; most countries do not recognize these annexations.",
        "Constitutional amendments approved in 2020 strengthened the presidency and reset the sitting president's term count.",
      ],
    },
    {
      key: "executive",
      title: "Executive",
      body:
        "The president is head of state, directs foreign and security policy, commands the armed forces, issues decrees, and appoints the prime minister with the State Duma's approval. The president can dismiss the government. The prime minister manages the economy and domestic administration. In practice, the president dominates, and informal networks — especially security services (siloviki) — matter greatly.",
    },
    {
      key: "legislature",
      title: "Legislature",
      body:
        "The Federal Assembly is bicameral. The State Duma (450 members) passes legislation and approves the prime minister; the Federation Council includes two representatives from each federal subject. United Russia holds large Duma majorities, and the \"systemic opposition\" parties rarely challenge the Kremlin on core issues, so the legislature has limited independence.",
    },
    {
      key: "judiciary",
      title: "Judiciary",
      body:
        "The Constitutional Court and Supreme Court sit atop the judiciary. Courts may handle ordinary disputes, but in politically sensitive cases they rarely rule against the Kremlin. Prosecutions of opposition figures and journalists illustrate a judiciary that lacks independence.",
    },
    {
      key: "parties",
      title: "Political Parties",
      body:
        "Russia has a dominant-party system. United Russia supports the president. The Communist Party (CPRF), LDPR, A Just Russia, and New People hold Duma seats as a tolerated \"systemic opposition.\" Genuine opposition movements — such as those associated with Alexei Navalny, who died in prison in 2024 — have been excluded from elections and repressed.",
    },
    {
      key: "electoral",
      title: "Electoral System",
      body:
        "The president is elected by two-round majority vote. The State Duma uses a mixed system: 225 seats from single-member districts and 225 by proportional representation with a 5% threshold. Election authorities and courts have kept prominent opponents off the ballot, and independent observers have documented irregularities.",
    },
    {
      key: "participation",
      title: "Political Participation",
      body:
        "Participation is heavily managed. Large protests over election fraud occurred in 2011–2012, and protests against the war in Ukraine followed its launch in 2022, but authorities have responded with mass arrests and new laws restricting assembly and speech. State-organized events and pressure on public employees to vote are forms of mobilized participation.",
    },
    {
      key: "culture",
      title: "Political Culture",
      body:
        "Russian political culture reflects a history of centralized authority (tsarist and Soviet), skepticism of the chaotic 1990s, and nationalism emphasizing Russia's status as a great power. The Russian Orthodox Church is closely aligned with the state. Ethnic cleavages exist — especially in the North Caucasus, where Russia fought two wars in Chechnya.",
    },
    {
      key: "economy",
      title: "Economy",
      body:
        "In the 1990s, rapid \"shock therapy\" privatization concentrated wealth among oligarchs. Under Putin, the state reasserted control over strategic sectors, especially energy (Gazprom, Rosneft). Russia relies heavily on oil and gas exports, giving it rentier characteristics. Western sanctions since 2014 and especially since 2022 have restricted trade and finance, pushing Russia toward other partners.",
    },
    {
      key: "civil-society",
      title: "Civil Society",
      body:
        "Civil society is tightly restricted. Foreign agents laws and \"undesirable organization\" designations have forced many NGOs and independent media outlets to close or relocate abroad. Major television networks are state-controlled, and a 2022 law criminalized spreading \"false information\" about the military.",
    },
  ],
  currentIssues: [
    {
      title: "The war in Ukraine",
      body: "Russia's full-scale invasion of Ukraine, launched in February 2022, has continued into 2026, shaping domestic repression, the economy, and relations with the West.",
    },
    {
      title: "Sanctions and economic adaptation",
      body: "Sanctions have pushed Russia to reorient trade toward partners such as China and India and have increased the state's role in the economy.",
    },
    {
      title: "Repression of dissent",
      body: "Laws restricting speech, protest, and civil society have expanded, narrowing space for any independent political activity.",
    },
  ],
  compare: {
    regime: { tag: "Authoritarian", text: "Elections held but not free or fair; opposition, media, and civil society restricted." },
    system: { tag: "Semi-presidential", text: "Elected president plus a prime minister approved by the Duma; president dominates." },
    executive: { tag: "Dual executive", text: "President (head of state, dominant) and prime minister (head of government)." },
    legislature: { tag: "Bicameral", text: "State Duma (450) and Federation Council; limited independence." },
    electoral: { tag: "Mixed (SMD + PR)", text: "Duma: 225 SMD + 225 PR with a 5% threshold; president by two-round majority." },
    parties: { tag: "Dominant party", text: "United Russia dominant; tolerated \"systemic opposition\" parties." },
    judiciary: { tag: "Subordinate", text: "Courts rarely rule against the Kremlin in political cases." },
    liberties: { tag: "Restricted", text: "Foreign agents laws, media control, and criminalized dissent about the military." },
    participation: { tag: "Restricted", text: "Protest met with arrests; mobilized participation encouraged." },
    economy: { tag: "Rentier", text: "Oil and gas dependent; state control of strategic sectors; sanctions since 2022." },
    territorial: { tag: "Federal", text: "Formally federal, but heavily recentralized since 2000." },
  },
};
