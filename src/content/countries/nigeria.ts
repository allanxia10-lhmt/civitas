import type { Country } from "../types";

export const nigeria: Country = {
  id: "nigeria",
  name: "Nigeria",
  officialName: "Federal Republic of Nigeria",
  code: "NG",
  regimeLabel: "Federal presidential republic · Electoral democracy",
  summary:
    "Africa's most populous country, Nigeria returned to civilian rule in 1999 after long periods of military government. It is a federal presidential republic shaped by coinciding ethnic, religious, and regional cleavages and by heavy dependence on oil revenue.",
  lastUpdated: "2026-09-23",
  keyFacts: [
    { label: "Head of state & government", value: "President Bola Ahmed Tinubu, APC (since May 2023)", timeSensitive: true },
    { label: "Presidential term", value: "Four years, maximum two terms" },
    { label: "Next general election", value: "Scheduled for early 2027", timeSensitive: true },
    { label: "Constitution", value: "1999 (Fourth Republic)" },
    { label: "Legislature", value: "National Assembly: Senate (109) and House of Representatives (360)" },
    { label: "Territorial structure", value: "Federal: 36 states and the Federal Capital Territory" },
    { label: "Capital", value: "Abuja" },
  ],
  sections: [
    {
      key: "structure",
      title: "Government Structure",
      body:
        "Nigeria is a federal presidential republic under the 1999 Constitution, which launched the Fourth Republic after military rule. Since independence from Britain in 1960, Nigeria has experienced multiple coups and long periods of military government (1966–1979 and 1983–1999), as well as the Biafran civil war (1967–1970).",
      bullets: [
        "Federalism is designed partly to manage ethnic and regional diversity; the number of states grew from 3 regions at independence to 36 states.",
        "Twelve northern states adopted sharia-based criminal law beginning around 1999–2000.",
      ],
    },
    {
      key: "executive",
      title: "Executive",
      body:
        "The president is head of state, head of government, and commander in chief, elected for a four-year term and limited to two terms. The president appoints ministers (at least one from each state, reflecting the federal character principle) and controls significant patronage, especially through oil revenue. Executive power is strong relative to the other branches.",
    },
    {
      key: "legislature",
      title: "Legislature",
      body:
        "The National Assembly is bicameral: the Senate has 109 members (three per state plus one for the Federal Capital Territory) and the House of Representatives has 360 members, all elected from single-member districts. The legislature can override vetoes and has at times clashed with the president over budgets, but patronage and party loyalty often limit its independence.",
    },
    {
      key: "judiciary",
      title: "Judiciary",
      body:
        "The Supreme Court heads the federal judiciary and exercises judicial review. Courts and election tribunals resolve disputed elections and have sometimes overturned results. Concerns about corruption, political pressure, and delays affect public confidence. Sharia courts operate in northern states alongside secular courts.",
    },
    {
      key: "parties",
      title: "Political Parties",
      body:
        "The two major parties are the All Progressives Congress (APC), which has held the presidency since 2015, and the People's Democratic Party (PDP), which held it from 1999 to 2015. The Labour Party drew strong support, especially among young urban voters, in 2023. Parties tend to be organized around personalities, patronage, and cross-regional coalitions more than ideology, and politicians frequently switch parties.",
    },
    {
      key: "electoral",
      title: "Electoral System",
      body:
        "Legislators are elected by plurality in single-member districts. To win the presidency, a candidate must receive the most votes and at least 25% of the vote in at least two-thirds of the states — a rule meant to require broad, cross-regional support. The Independent National Electoral Commission (INEC) administers elections; disputes are common and often litigated.",
      bullets: [
        "2015: incumbent Goodluck Jonathan (PDP) lost to Muhammadu Buhari (APC) and conceded — the first peaceful transfer of power to an opposition candidate.",
        "2023: Bola Tinubu (APC) won with roughly 37% of the vote amid low turnout and legal challenges.",
      ],
    },
    {
      key: "participation",
      title: "Political Participation",
      body:
        "Participation includes voting, party activity, religious and ethnic associations, and protest. Turnout has been relatively low in recent presidential elections. The 2020 EndSARS protests against police brutality — organized largely through social media by young Nigerians — were met with a violent crackdown in Lagos.",
    },
    {
      key: "culture",
      title: "Political Culture",
      body:
        "Nigeria has more than 250 ethnic groups. The largest are the Hausa-Fulani (mainly in the Muslim north), the Yoruba (southwest), and the Igbo (southeast, largely Christian). These coinciding cleavages shape party coalitions and conflict. Informal \"zoning\" — rotating the presidency between north and south — and the federal character principle aim to share power. Prebendalism (using public office to reward supporters) and clientelism are recurring features.",
    },
    {
      key: "economy",
      title: "Economy",
      body:
        "Nigeria is a rentier state: oil exports provide a large share of government revenue and foreign exchange. The Niger Delta, where oil is produced, has experienced environmental damage, poverty, and militancy. Structural adjustment programs in the 1980s and later privatizations sought to liberalize the economy. In 2023, the government removed a costly fuel subsidy and moved to unify exchange rates, raising living costs in the short term.",
    },
    {
      key: "civil-society",
      title: "Civil Society",
      body:
        "Civil society is vibrant and includes religious organizations, labor unions, professional associations, student groups, and human rights organizations. The press is lively but has faced government pressure — for example, the 2021–2022 suspension of Twitter. Insecurity from Boko Haram and other armed groups in the northeast, banditry in the northwest, and farmer–herder conflicts affect civic life.",
    },
  ],
  currentIssues: [
    {
      title: "Economic reform and cost of living",
      body: "The effects of fuel subsidy removal, currency reforms, and inflation remain central political issues heading into the next general election.",
    },
    {
      title: "Security challenges",
      body: "Insurgency in the northeast, banditry and kidnapping in the northwest, and farmer–herder conflicts test state capacity and legitimacy.",
    },
    {
      title: "The next general election",
      body: "Parties are preparing for general elections scheduled for early 2027, a test of INEC's credibility and of the ruling APC's coalition.",
    },
  ],
  compare: {
    regime: { tag: "Electoral democracy", text: "Competitive elections since 1999, with problems of corruption, violence, and electoral disputes." },
    system: { tag: "Presidential", text: "Separately elected president with fixed terms; separation of powers." },
    executive: { tag: "Single executive", text: "President is head of state and government; two four-year terms." },
    legislature: { tag: "Bicameral", text: "Senate (109) and House of Representatives (360)." },
    electoral: { tag: "SMD plurality", text: "Single-member districts; president needs a plurality plus 25% in two-thirds of states." },
    parties: { tag: "Competitive multiparty", text: "APC and PDP dominate; parties organized around personalities and regional coalitions." },
    judiciary: { tag: "Partially independent", text: "Exercises judicial review and resolves election disputes; concerns about corruption and pressure." },
    liberties: { tag: "Partially protected", text: "Constitutional protections with periodic restrictions on media and protest." },
    participation: { tag: "Open", text: "Voluntary participation; protest movements such as EndSARS; relatively low turnout." },
    economy: { tag: "Rentier", text: "Heavily dependent on oil revenue; structural adjustment and recent subsidy reform." },
    territorial: { tag: "Federal", text: "36 states and a Federal Capital Territory; federalism used to manage diversity." },
  },
};
