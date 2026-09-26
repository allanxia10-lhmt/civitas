import type { Lesson } from "../types";

export const compgovUnit5: Lesson[] = [
  {
    id: "comp-globalization",
    courseId: "compgov",
    unitId: "compgov-u5",
    title: "Globalization & Economic Liberalization",
    minutes: 17,
    tags: ["globalization", "neoliberalism", "privatization", "free trade", "NAFTA", "USMCA", "WTO", "IMF", "structural adjustment", "Brexit", "special economic zones", "Deng Xiaoping", "shock therapy"],
    overview:
      "Globalization — the increasing integration of economies, cultures, and politics — has pushed states to liberalize trade, privatize industries, and attract foreign investment. Each course country has responded differently, from China's state-guided opening to the UK's decision to leave the European Union.",
    keyConcepts: [
      { term: "Globalization", definition: "Increasing interconnection of economies, cultures, and politics across borders." },
      { term: "Neoliberalism", definition: "Economic policies favoring free markets, deregulation, privatization, and free trade." },
      { term: "Privatization", definition: "Transferring state-owned enterprises to private ownership." },
      { term: "Structural adjustment", definition: "Market-oriented reforms often required by international lenders such as the IMF in exchange for loans." },
      { term: "Special economic zones (SEZs)", definition: "Areas with market-friendly rules to attract foreign investment, pioneered in China." },
    ],
    deepDive: [
      {
        heading: "Liberalization in practice",
        body: "**China** began reforms under Deng Xiaoping in 1978, creating special economic zones and joining the World Trade Organization in 2001 while maintaining large state-owned enterprises. **Mexico** liberalized in the 1980s and 1990s, privatizing many state firms and joining NAFTA in 1994 (replaced by the USMCA in 2020). **Russia** experienced rapid \"shock therapy\" privatization in the 1990s, which concentrated wealth among oligarchs. **Nigeria** undertook structural adjustment in the 1980s and privatized some sectors, but oil remains dominant. The **UK** privatized industries under Margaret Thatcher in the 1980s.",
      },
      {
        heading: "Backlash and reversal",
        body: "Globalization produces winners and losers. The **UK's** 2016 Brexit referendum reflected concerns about sovereignty and immigration; the UK left the EU in 2020. Mexico's Zapatista uprising began the day NAFTA took effect. Russia partly **renationalized** its energy sector under Putin. Sanctions have restricted Iran's and, since 2022, Russia's integration into the global economy.",
      },
      {
        heading: "State strategies",
        body: "States choose how much to open. China demonstrates a **state-led** strategy that combines markets with party control. Iran's economy is shaped by state and quasi-state actors, including bonyads and the Revolutionary Guard's economic interests, and by sanctions. Comparing these strategies helps explain differences in growth and political stability.",
      },
    ],
    example: {
      heading: "Shenzhen's transformation",
      body: "Designated as a special economic zone in 1980, Shenzhen grew from a small town into a major manufacturing and technology hub. It demonstrates how China used targeted liberalization to attract foreign investment while maintaining Communist Party control.",
    },
    examConnection: {
      body: "Questions frequently ask how a country responded to globalization and what political effects followed. Argument Essays may ask whether economic liberalization promotes political liberalization — China is key evidence against an automatic link.",
      tip: "Pair each country with a signature policy: China → SEZs/WTO; Mexico → NAFTA/USMCA; Russia → shock therapy; UK → Thatcher privatization/Brexit; Nigeria → structural adjustment; Iran → sanctions.",
    },
    commonMistakes: [
      { mistake: "Assuming economic liberalization leads to democracy.", correction: "China liberalized its economy without democratizing." },
      { mistake: "Treating globalization as purely economic.", correction: "Globalization also involves cultural, political, and technological integration." },
      { mistake: "Saying Russia's privatization created broad ownership.", correction: "1990s privatization concentrated wealth among a small group of oligarchs." },
    ],
    relatedCountryIds: ["china", "mexico", "russia", "uk", "nigeria", "iran"],
  },
  {
    id: "comp-development",
    courseId: "compgov",
    unitId: "compgov-u5",
    title: "Development, Rentier States & the Resource Curse",
    minutes: 16,
    tags: ["economic development", "rentier state", "resource curse", "oil", "GDP per capita", "Human Development Index", "Gini coefficient", "Niger Delta", "NNPC", "Pemex", "Gazprom", "fuel subsidy"],
    overview:
      "States develop at different rates and in different ways. Rentier states — which depend heavily on natural resource revenue — often face the resource curse: weak accountability, corruption, and vulnerability to price shocks. Nigeria, Russia, and Iran all illustrate these challenges.",
    keyConcepts: [
      { term: "Rentier state", definition: "A state that relies on revenue from natural resources (rents) rather than taxing its citizens." },
      { term: "Resource curse", definition: "The pattern in which resource-rich countries experience slower growth, corruption, and weaker democracy." },
      { term: "GDP per capita", definition: "Gross domestic product divided by population; a measure of average economic output." },
      { term: "Human Development Index (HDI)", definition: "A composite measure of life expectancy, education, and income." },
      { term: "Gini coefficient", definition: "A measure of income inequality from 0 (perfect equality) to 1 (perfect inequality)." },
    ],
    deepDive: [
      {
        heading: "Why oil can weaken accountability",
        body: "When governments earn most revenue from oil rather than taxes, they depend less on citizens — and citizens have less leverage. Oil wealth can fund patronage and repression. Revenue swings with global prices make budgets unstable. **Nigeria** relies heavily on oil exports for foreign exchange and government revenue; oil wealth in the Niger Delta has coexisted with poverty, environmental damage, and conflict. **Iran** and **Russia** also depend significantly on hydrocarbons.",
      },
      {
        heading: "Measuring development",
        body: "No single measure captures development. **GDP per capita** measures average output but not distribution. The **HDI** adds health and education. The **Gini coefficient** measures inequality. The exam often gives you these indicators and asks you to draw conclusions — and to note their limitations.",
      },
      {
        heading: "Reform attempts",
        body: "Nigeria has tried to diversify its economy and, in 2023, removed a long-standing fuel subsidy — a costly policy that nonetheless kept fuel cheap for citizens — and moved to unify its exchange rate. The moves aimed to stabilize public finances but increased living costs. Mexico's state oil company, Pemex, has been central to debates over energy nationalism and private investment.",
      },
    ],
    example: {
      heading: "A price shock",
      body: "When world oil prices collapse, a rentier state's revenue can fall sharply. The government must cut spending, borrow, or devalue its currency. In authoritarian rentier states, falling revenue can weaken the patronage networks that sustain the regime.",
    },
    examConnection: {
      body: "Quantitative Analysis questions often use development indicators. Concept Application questions may ask you to define rentier state and explain its political consequences in a course country.",
      tip: "Rentier state logic: resource revenue → less need to tax → weaker accountability → more room for corruption and patronage.",
    },
    commonMistakes: [
      { mistake: "Equating high GDP with high development.", correction: "GDP per capita ignores inequality, health, and education; use multiple indicators." },
      { mistake: "Assuming resource wealth always harms a country.", correction: "Strong institutions can manage resource wealth well; the curse is a tendency, not a law." },
      { mistake: "Confusing a high Gini with a poor country.", correction: "The Gini measures inequality, not overall wealth." },
    ],
    relatedCountryIds: ["nigeria", "russia", "iran", "mexico"],
  },
  {
    id: "comp-policy-challenges",
    courseId: "compgov",
    unitId: "compgov-u5",
    title: "Public Policy: Social Welfare, Environment & Migration",
    minutes: 16,
    tags: ["public policy", "social policy", "welfare", "conditional cash transfer", "Prospera", "one-child policy", "hukou", "environmental policy", "migration", "NHS", "demographic change", "pension reform"],
    overview:
      "Governments respond to social, demographic, and environmental challenges through public policy. Comparing policies — cash transfers in Mexico, population policy in China, the NHS in the UK, and pension reform in Russia — shows how regime type and resources shape policy choices.",
    keyConcepts: [
      { term: "Conditional cash transfer", definition: "Payments to low-income families conditional on behaviors such as school attendance and health checkups (Mexico's former Progresa/Oportunidades/Prospera)." },
      { term: "One-child policy", definition: "China's population-control policy (1980–2015), later replaced by two- and three-child policies." },
      { term: "Hukou", definition: "China's household registration system, which ties access to services to a person's registered residence." },
      { term: "National Health Service (NHS)", definition: "The UK's publicly funded health care system, established in 1948." },
      { term: "Demographic change", definition: "Shifts in population size, age structure, and composition that create policy challenges." },
    ],
    deepDive: [
      {
        heading: "Social welfare policies",
        body: "**Mexico's** conditional cash transfer program — launched as Progresa in the late 1990s and later renamed Oportunidades and Prospera — became a global model. It was replaced in 2019 with direct scholarships and pensions under López Obrador. The **UK's NHS** provides health care free at the point of use and is a central political issue. **Russia** raised its retirement age in 2018, sparking protests and a drop in public approval.",
      },
      {
        heading: "Population and migration",
        body: "**China's** one-child policy slowed population growth but contributed to an aging population and gender imbalance; the government shifted to a two-child policy in 2016 and a three-child policy in 2021. The **hukou** system limits rural migrants' access to urban services. **Mexico** is a country of emigration, transit, and immigration; the **UK** debates immigration levels, which featured in Brexit.",
      },
      {
        heading: "Environmental policy",
        body: "Environmental policy illustrates how regimes differ in responding to problems. **China**, the world's largest emitter, has invested heavily in renewable energy while still relying on coal. The **UK** has legislated a net-zero target. **Nigeria** faces oil pollution in the Niger Delta. Authoritarian regimes can implement policy quickly but may suppress environmental activism.",
      },
    ],
    example: {
      heading: "Pension reform backlash",
      body: "In 2018, Russia announced it would raise the retirement age. Protests followed in many cities, and polls showed approval of the government fell. Putin softened the reform for women. Even in authoritarian regimes, unpopular social policies can prompt public pushback and adjustments.",
    },
    examConnection: {
      body: "Questions often ask you to explain why a government adopted a policy, what effects it had, and how regime type influenced the response. Comparative Analysis may ask you to compare social or environmental policies across two countries.",
      tip: "Structure policy answers: problem → policy → outcome → what it reveals about the regime.",
    },
    commonMistakes: [
      { mistake: "Saying China still has a one-child policy.", correction: "China moved to a two-child policy in 2016 and a three-child policy in 2021." },
      { mistake: "Describing Prospera as current Mexican policy.", correction: "Prospera ended in 2019 and was replaced by other social programs." },
      { mistake: "Assuming authoritarian regimes ignore public opinion.", correction: "They often adjust policies in response to protests or declining approval." },
    ],
    relatedCountryIds: ["mexico", "china", "uk", "russia", "nigeria"],
  },
];
