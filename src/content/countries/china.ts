import type { Country } from "../types";

export const china: Country = {
  id: "china",
  name: "China",
  officialName: "People's Republic of China",
  code: "CN",
  regimeLabel: "One-party communist state · Authoritarian",
  summary:
    "The People's Republic of China has been ruled by the Chinese Communist Party (CCP) since 1949. Since 1978, market reforms have produced rapid growth while the party has maintained a monopoly on political power, making China a central case for testing whether economic liberalization leads to political liberalization.",
  lastUpdated: "2026-09-23",
  keyFacts: [
    { label: "Party leader & president", value: "Xi Jinping — General Secretary (since 2012) and President (since 2013)", timeSensitive: true },
    { label: "Premier", value: "Li Qiang (since 2023)", timeSensitive: true },
    { label: "Constitution", value: "1982 (amended; 2018 removed presidential term limits)" },
    { label: "Legislature", value: "National People's Congress (about 3,000 deputies) and its Standing Committee" },
    { label: "Territorial structure", value: "Unitary: provinces, autonomous regions, municipalities, and special administrative regions" },
    { label: "Capital", value: "Beijing" },
  ],
  sections: [
    {
      key: "structure",
      title: "Government Structure",
      body:
        "China is a unitary one-party state. The Chinese Communist Party leads the state: party organs parallel and direct state institutions, and top state officials are senior party leaders. Power flows through the party's hierarchy — the General Secretary, the Politburo Standing Committee, the Politburo, and the Central Committee — under the principle of democratic centralism.",
      bullets: [
        "The nomenklatura system lets the party control appointments to key positions in government, state enterprises, and other institutions.",
        "Hong Kong and Macau are special administrative regions; the 2020 National Security Law sharply curtailed Hong Kong's autonomy.",
      ],
    },
    {
      key: "executive",
      title: "Executive",
      body:
        "Real executive power lies with the party's General Secretary and the Politburo Standing Committee. The state presidency is powerful because the same person also serves as General Secretary and chair of the Central Military Commission. The premier heads the State Council, which runs the government bureaucracy and economic policy. The 2018 constitutional amendment removing presidential term limits allowed Xi Jinping to remain president beyond two terms.",
    },
    {
      key: "legislature",
      title: "Legislature",
      body:
        "The National People's Congress (NPC) is formally the highest organ of state power, with authority to amend the constitution, pass laws, and elect state leaders. In practice it meets briefly each year and approves decisions made by party leaders; its Standing Committee handles legislation between sessions. Deputies are indirectly elected by lower-level people's congresses.",
    },
    {
      key: "judiciary",
      title: "Judiciary",
      body:
        "Courts, headed by the Supreme People's Court, operate under party leadership and do not exercise judicial review over the party or the NPC. The party's discipline inspection commissions handle corruption cases involving officials, often before any court proceeding. The anti-corruption campaign launched in 2012 has also been used to remove political rivals.",
    },
    {
      key: "parties",
      title: "Political Parties",
      body:
        "China has a one-party system. Eight small \"democratic parties\" exist legally and participate in the Chinese People's Political Consultative Conference, but they accept CCP leadership. The CCP has roughly 100 million members, and membership is a path to career advancement.",
    },
    {
      key: "electoral",
      title: "Electoral System",
      body:
        "There are no competitive national elections. Direct elections occur only at the lowest levels — village committees (formalized by the Organic Law of Village Committees) and local people's congresses — and candidates are generally vetted. Higher-level congresses are chosen indirectly.",
    },
    {
      key: "participation",
      title: "Political Participation",
      body:
        "Independent political participation is restricted. The party encourages mobilized participation and consultation through official channels. Local protests over land seizures, pollution, and labor disputes occur, and the state sometimes responds with concessions while repressing organizers. The 1989 Tiananmen Square protests were crushed by the military, and discussion of them remains censored.",
    },
    {
      key: "culture",
      title: "Political Culture",
      body:
        "Chinese political culture blends Confucian values of hierarchy, order, and social harmony with communist ideology and nationalism. The party emphasizes \"socialism with Chinese characteristics\" and national rejuvenation, and uses patriotic education and state media to socialize citizens. Cleavages include urban–rural inequality (reinforced by the hukou system), regional disparities, and ethnic tensions in Xinjiang and Tibet.",
    },
    {
      key: "economy",
      title: "Economy",
      body:
        "Beginning in 1978, Deng Xiaoping launched market reforms: decollectivizing agriculture, creating special economic zones, and opening to foreign investment. China joined the WTO in 2001. The result is a hybrid model often called state capitalism — markets operate alongside powerful state-owned enterprises and party guidance. The Belt and Road Initiative extends China's economic influence abroad. The 15th Five-Year Plan covers 2026–2030.",
    },
    {
      key: "civil-society",
      title: "Civil Society",
      body:
        "Civil society is tightly controlled. NGOs must register and operate under supervision; foreign NGOs face special restrictions. The All-China Federation of Trade Unions is the only legal union (state corporatism). The Great Firewall and domestic censorship shape information, and surveillance technology has expanded, especially in Xinjiang.",
    },
  ],
  currentIssues: [
    {
      title: "Slower growth and demographic change",
      body: "Slowing growth, a property-sector downturn, youth unemployment, and an aging population challenge the performance legitimacy that has underpinned party rule.",
    },
    {
      title: "Centralization under Xi Jinping",
      body: "Removal of term limits, the anti-corruption campaign, and expanded party control illustrate the personalization and centralization of power.",
    },
    {
      title: "Human rights and autonomy",
      body: "Policies in Xinjiang and Tibet and the curtailment of Hong Kong's autonomy draw international criticism and illustrate the regime's approach to cleavages.",
    },
  ],
  compare: {
    regime: { tag: "Authoritarian", text: "One-party communist state; no competitive national elections." },
    system: { tag: "Party-state", text: "The Communist Party directs state institutions; state offices held by party leaders." },
    executive: { tag: "Dual executive", text: "President (head of state, also party General Secretary) and premier (head of government)." },
    legislature: { tag: "Unicameral", text: "National People's Congress (~3,000); approves party decisions." },
    electoral: { tag: "Non-competitive", text: "Direct elections only at village and local levels; indirect elections above." },
    parties: { tag: "One party", text: "CCP rules; eight minor parties accept its leadership." },
    judiciary: { tag: "Subordinate", text: "Courts under party leadership; no judicial review of the party." },
    liberties: { tag: "Restricted", text: "Censorship, the Great Firewall, surveillance, and repression of dissent." },
    participation: { tag: "Restricted", text: "Mobilized and consultative participation; independent activism repressed." },
    economy: { tag: "State-led", text: "State capitalism: markets combined with state-owned enterprises and party guidance." },
    territorial: { tag: "Unitary", text: "Unitary state; provinces implement central policy with local discretion." },
  },
};
