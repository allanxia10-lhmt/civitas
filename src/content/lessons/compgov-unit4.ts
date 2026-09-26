import type { Lesson } from "../types";

export const compgovUnit4: Lesson[] = [
  {
    id: "comp-electoral-systems",
    courseId: "compgov",
    unitId: "compgov-u4",
    title: "Electoral Systems & Election Management",
    minutes: 17,
    tags: ["electoral systems", "single-member district", "SMD", "proportional representation", "PR", "mixed system", "first past the post", "threshold", "INE", "INEC", "Guardian Council", "Duverger's law", "runoff"],
    overview:
      "Electoral rules shape party systems, representation, and legitimacy. Single-member district plurality systems tend toward two dominant parties; proportional representation tends to produce multiparty systems; mixed systems combine both. Who runs elections — an independent body or a regime-controlled one — matters just as much.",
    keyConcepts: [
      { term: "Single-member district (SMD) plurality", definition: "One representative per district; the candidate with the most votes wins (first past the post)." },
      { term: "Proportional representation (PR)", definition: "Parties win seats in proportion to their vote share, usually from party lists in multi-member districts." },
      { term: "Mixed electoral system", definition: "Combines SMD and PR seats in the same legislature (Mexico's Chamber of Deputies, Russia's State Duma)." },
      { term: "Electoral threshold", definition: "The minimum share of the vote a party needs to win PR seats." },
      { term: "Runoff (two-round) system", definition: "If no candidate wins a required share, a second round is held between top candidates." },
      { term: "Independent electoral commission", definition: "A body that administers elections free from government control (Mexico's INE, Nigeria's INEC)." },
    ],
    deepDive: [
      {
        heading: "SMD, PR, and mixed systems",
        body: "The **UK** uses SMD plurality for the House of Commons. This rewards parties with geographically concentrated support and penalizes those with dispersed support. In the 2024 general election, Labour won a large majority of seats with roughly a third of the vote, while Reform UK won about 14% of the vote but only a handful of seats. **Mexico's** Chamber of Deputies is mixed: 300 SMD seats and 200 PR seats. **Russia's** State Duma is mixed: 225 SMD and 225 PR seats with a 5% threshold.",
      },
      {
        heading: "Presidential election rules",
        body: "**Nigeria** requires the winning presidential candidate to have the most votes and at least 25% of the vote in two-thirds of the states — a rule designed to require broad, cross-regional support. **Mexico** elects its president by simple plurality. **Russia** and **Iran** use two-round systems requiring a majority. Iran's 2024 presidential election went to a runoff, which Masoud Pezeshkian won.",
      },
      {
        heading: "Who runs the election",
        body: "Mexico's **National Electoral Institute (INE)** was central to the country's democratization. Nigeria's **Independent National Electoral Commission (INEC)** administers elections, though disputes are common and often go to court. In **Iran**, the **Guardian Council** vets candidates and can disqualify them, sharply limiting choice. In **Russia**, electoral authorities and courts have kept prominent opposition figures off the ballot. **China** has no competitive national elections.",
      },
    ],
    example: {
      heading: "Seats vs. votes in the UK",
      body: "Under first past the post, a party can finish second in hundreds of constituencies and win very few seats. This disproportionality is why smaller UK parties with dispersed support — such as the Liberal Democrats historically, or Reform UK in 2024 — advocate for proportional representation.",
    },
    examConnection: {
      body: "Quantitative Analysis prompts often show vote shares vs. seat shares; you'll need to describe the gap and explain how the electoral system produced it. Know which countries use SMD, PR, and mixed systems.",
      tip: "SMD → disproportional results, fewer parties. PR → proportional results, more parties. Mixed → some of each.",
    },
    commonMistakes: [
      { mistake: "Saying the UK uses PR for the House of Commons.", correction: "The UK uses SMD plurality (first past the post) for Commons elections." },
      { mistake: "Assuming elections in Iran are uncompetitive in every respect.", correction: "Iranian elections have real competition among approved candidates, but the Guardian Council limits who can run." },
      { mistake: "Forgetting Nigeria's distribution requirement.", correction: "Nigerian presidential winners need 25% in at least two-thirds of states, not just a plurality." },
    ],
    relatedCountryIds: ["uk", "mexico", "nigeria", "russia", "iran", "china"],
  },
  {
    id: "comp-party-systems",
    courseId: "compgov",
    unitId: "compgov-u4",
    title: "Political Parties & Party Systems",
    minutes: 15,
    tags: ["party system", "one-party system", "dominant-party system", "two-party system", "multiparty system", "PRI", "MORENA", "PAN", "United Russia", "Chinese Communist Party", "APC", "PDP", "Labour", "Conservative", "Reform UK"],
    overview:
      "Party systems range from one-party states to competitive multiparty systems. The six countries illustrate each type: China's one-party system, Russia's dominant-party system, the UK's two-party-dominant system with a growing multiparty character, and Mexico's and Nigeria's competitive but shifting party landscapes.",
    keyConcepts: [
      { term: "One-party system", definition: "Only one party is allowed to hold power (China)." },
      { term: "Dominant-party system", definition: "Multiple parties exist, but one party consistently wins and controls government (Russia's United Russia; Mexico's PRI historically)." },
      { term: "Two-party system", definition: "Two major parties dominate elections and government." },
      { term: "Multiparty system", definition: "Several parties compete and often form coalitions." },
      { term: "Catch-all party", definition: "A party that appeals broadly to many voters rather than a narrow ideological base." },
    ],
    deepDive: [
      {
        heading: "One-party and dominant-party systems",
        body: "**China's** Communist Party controls the state; eight small \"democratic parties\" exist but accept its leadership. **Russia's** United Russia dominates the Duma; several \"systemic opposition\" parties hold seats but rarely challenge the Kremlin on core issues. Mexico's **PRI** was a dominant party for about seven decades until 2000.",
      },
      {
        heading: "Competitive party systems",
        body: "**Mexico's** system transformed after 2000. MORENA, founded by Andrés Manuel López Obrador, won the presidency in 2018 and again in 2024 with Claudia Sheinbaum, and became the dominant force, while the PAN and PRI weakened. **Nigeria's** main parties are the APC and PDP, with the Labour Party gaining attention in 2023; parties there are often organized around personalities and regional coalitions more than ideology. The **UK** has long been dominated by Conservatives and Labour, but the Liberal Democrats, the SNP, and Reform UK have gained significant vote shares.",
      },
      {
        heading: "Iran: factions without strong parties",
        body: "Iran's formal parties are weak; politics is organized around factions — principlists (conservatives) and reformists — within the boundaries set by the Guardian Council and the Supreme Leader.",
      },
    ],
    example: {
      heading: "From dominant party to competitive system",
      body: "For most of the 20th century, the PRI won nearly every major election in Mexico, relying on patronage and corporatist ties. Electoral reforms, an independent electoral institute, and economic crises opened the system. The PAN's victory in 2000 marked the end of one-party dominance — though MORENA's recent strength has sparked debate about whether a new dominant party is emerging.",
    },
    examConnection: {
      body: "Questions often ask you to classify party systems and explain how rules or history produced them. You may be asked how party systems affect government stability or accountability.",
      tip: "Classify by competition: Is there real alternation in power? China: no. Russia: no. UK: yes. Mexico: yes since 2000. Nigeria: yes since 2015.",
    },
    commonMistakes: [
      { mistake: "Saying China has only one legal party.", correction: "China has eight minor parties, but all accept Communist Party leadership." },
      { mistake: "Calling the UK a pure two-party system.", correction: "Two parties dominate government, but several other parties win significant votes and seats." },
      { mistake: "Assuming Nigerian parties are ideological.", correction: "Nigerian parties are often built on personalities and regional coalitions rather than ideology." },
    ],
    relatedCountryIds: ["china", "russia", "mexico", "nigeria", "uk", "iran"],
  },
  {
    id: "comp-civil-society",
    courseId: "compgov",
    unitId: "compgov-u4",
    title: "Civil Society, Pluralism & Corporatism",
    minutes: 15,
    tags: ["civil society", "interest groups", "pluralism", "corporatism", "state corporatism", "NGOs", "social movements", "Confederation of British Industry", "Trades Union Congress", "All-China Federation of Trade Unions", "bonyads"],
    overview:
      "Civil society is the space of voluntary organizations outside the state. In pluralist systems, many independent groups compete for influence. In corporatist systems, the state recognizes or creates a limited number of groups to represent sectors. Authoritarian regimes restrict or co-opt civil society.",
    keyConcepts: [
      { term: "Civil society", definition: "Voluntary organizations outside the state that help citizens pursue shared interests." },
      { term: "Pluralism", definition: "Many independent groups compete to influence policy." },
      { term: "Corporatism", definition: "The state officially recognizes a limited number of groups to represent sectors such as labor and business." },
      { term: "State corporatism", definition: "The state creates and controls the groups that represent society, often in authoritarian regimes." },
      { term: "Co-optation", definition: "Bringing potential opponents into the system through benefits or positions to neutralize opposition." },
    ],
    deepDive: [
      {
        heading: "Pluralism in the UK",
        body: "The UK has a robust, pluralist civil society: business groups (the Confederation of British Industry), labor (the Trades Union Congress), and thousands of charities and advocacy groups compete for influence. Groups lobby Parliament and ministries and use media campaigns.",
      },
      {
        heading: "Corporatism and co-optation",
        body: "Mexico's **PRI** built a corporatist system in which peasant, labor, and popular organizations were incorporated into the party, exchanging political support for benefits. **China** practices state corporatism: the All-China Federation of Trade Unions is the only legal union and is controlled by the party. Iran's **bonyads** — large, religiously affiliated foundations — control significant economic assets and are tied to the regime's elite.",
      },
      {
        heading: "Restricting civil society",
        body: "**Russia** has used foreign agents laws and \"undesirable organization\" designations to restrict NGOs. **China** tightly regulates NGOs, especially foreign-funded ones. **Nigeria** has a vibrant civil society — including religious organizations, professional associations, and student groups — though it faces government pressure at times.",
      },
    ],
    example: {
      heading: "A regime-approved union",
      body: "Chinese workers who want to organize must do so through the All-China Federation of Trade Unions, which operates under Communist Party leadership. Independent labor organizing is not permitted. The arrangement lets the party manage labor relations while preventing independent power bases.",
    },
    examConnection: {
      body: "Concept Application questions frequently ask you to define civil society, pluralism, or corporatism and explain how a course country illustrates it. Comparative Analysis may ask how two regimes treat civil society.",
      tip: "Pluralism = many independent groups. Corporatism = limited, state-recognized groups. State corporatism = state-controlled groups.",
    },
    commonMistakes: [
      { mistake: "Saying authoritarian regimes have no civil society.", correction: "Civil society often exists but is restricted, monitored, or co-opted." },
      { mistake: "Confusing corporatism with corporations.", correction: "Corporatism refers to state-recognized interest representation, not business corporations." },
      { mistake: "Treating all NGOs as independent.", correction: "Some organizations are government-organized (GONGOs) and serve regime goals." },
    ],
    relatedCountryIds: ["uk", "mexico", "china", "russia", "iran", "nigeria"],
  },
];
