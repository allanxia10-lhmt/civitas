import type { Lesson } from "../types";

export const usgovUnit4: Lesson[] = [
  {
    id: "usgov-core-values",
    courseId: "usgov",
    unitId: "usgov-u4",
    title: "Core Values & Attitudes About Government",
    minutes: 13,
    tags: ["core values", "individualism", "equality of opportunity", "free enterprise", "rule of law", "limited government", "Wealth of Nations", "Adam Smith"],
    overview:
      "Americans broadly share a set of core values — individualism, equality of opportunity, free enterprise, rule of law, and limited government — but interpret them differently. Those differing interpretations drive debates about the proper role of government. Adam Smith's The Wealth of Nations, newly required for 2026–27, is the classic statement of free enterprise.",
    keyConcepts: [
      { term: "Individualism", definition: "The belief that each person can shape their own life and destiny through their choices." },
      { term: "Equality of opportunity", definition: "All people should have an equal chance to compete and succeed." },
      { term: "Free enterprise", definition: "Pursuit of self-interest, competition, efficient allocation of resources, and limited regulation of the market — as espoused by Adam Smith." },
      { term: "Rule of law", definition: "Everyone, including those in power, must follow and is accountable to the same laws." },
      { term: "Limited government", definition: "Government power is restricted to protect individual liberty." },
    ],
    deepDive: [
      {
        heading: "Shared values, different interpretations",
        body: "Nearly every American endorses equality of opportunity. The disagreement is about what it requires. Some believe it means removing legal barriers and then letting individuals compete; others believe it requires government action — such as funding early education — to offset unequal starting points. The same pattern applies to individualism and limited government.",
      },
      {
        heading: "Adam Smith and free enterprise",
        body: "In **The Wealth of Nations (1776)**, Adam Smith argued that individuals pursuing their own interest in competitive markets are led, as if by an \"invisible hand,\" to promote the general welfare. Specialization and the division of labor increase productivity, and competition allocates resources efficiently. Smith still saw important roles for government — defense, justice, and certain public works. The framework cites Smith as the source of the free enterprise value.",
      },
      {
        heading: "Values in policy debates",
        body: "Debates over minimum wage, health care, and regulation are often framed as clashes among values. Supporters of a regulation may invoke fairness or equality of opportunity; opponents may invoke free enterprise and limited government. Recognizing which value a speaker is appealing to is a core AP skill.",
      },
    ],
    example: {
      heading: "A minimum-wage debate",
      body: "A senator argues that raising the minimum wage helps workers compete on fairer terms — an appeal to equality of opportunity. Another senator argues that wage floors interfere with employers' and workers' free choices and reduce hiring — an appeal to free enterprise. Both use shared American values to reach opposite conclusions.",
    },
    examConnection: {
      body: "Multiple-choice questions ask you to connect a statement or policy to the core value it reflects. With The Wealth of Nations now required, expect Smith's ideas on markets and self-interest to appear in stimulus questions about economic policy.",
      tip: "Look for the verb: \"compete\" → equality of opportunity; \"market decides\" → free enterprise; \"no one above the law\" → rule of law.",
    },
    commonMistakes: [
      { mistake: "Confusing equality of opportunity with equality of outcome.", correction: "Equality of opportunity is an equal chance to compete; it does not guarantee equal results." },
      { mistake: "Claiming Adam Smith opposed all government.", correction: "Smith supported limited but real government roles, including defense, justice, and public works." },
      { mistake: "Assuming core values belong to one party.", correction: "Both parties invoke the same values; they interpret and prioritize them differently." },
    ],
    relatedDocumentIds: ["wealth-of-nations"],
  },
  {
    id: "usgov-socialization",
    courseId: "usgov",
    unitId: "usgov-u4",
    title: "Political Socialization & Generational Effects",
    minutes: 14,
    tags: ["political socialization", "family", "schools", "peers", "media", "generational effects", "life-cycle effects", "globalization", "civic culture"],
    overview:
      "Political socialization is the lifelong process through which people form political beliefs. Family is usually the strongest early influence, but schools, peers, media, religion, and major events also matter. Generational and life-cycle effects explain why age groups often differ politically.",
    keyConcepts: [
      { term: "Political socialization", definition: "The process by which individuals acquire political beliefs, values, and behaviors." },
      { term: "Agents of socialization", definition: "Sources of political learning: family, schools, peers, media, religious institutions, civic and social organizations." },
      { term: "Generational effect", definition: "Shared political attitudes among people who came of age during the same major events." },
      { term: "Life-cycle effect", definition: "Changes in political attitudes and behavior as people age and their life circumstances change." },
      { term: "Globalization", definition: "Increasing interconnectedness that exposes Americans to other cultures and affects attitudes about trade, immigration, and foreign policy." },
    ],
    deepDive: [
      {
        heading: "Family first",
        body: "Children often adopt their parents' party identification and general orientation toward politics. The effect is strongest when parents share the same party and talk about politics often. Schools teach civic norms — the Pledge of Allegiance, elections for class officers, government courses — and peers and social media become more influential in adolescence and adulthood.",
      },
      {
        heading: "Generations and life cycles",
        body: "People who come of age during major events — the Great Depression, the Vietnam War, September 11, the 2008 financial crisis — often share attitudes shaped by those experiences. That is a **generational effect**. A **life-cycle effect** is different: as people age, buy homes, raise children, and pay more taxes, their priorities may shift. Distinguishing the two is a favorite exam task.",
      },
      {
        heading: "Media and a changing environment",
        body: "Americans increasingly get political information from online and social media sources, which can reinforce existing views through selective exposure. The fragmented media environment means different groups may be socialized with very different information.",
      },
    ],
    example: {
      heading: "Growing older, voting differently",
      body: "A voter in her twenties focuses on student debt and job opportunities. By her fifties, she owns a home and focuses on property taxes and retirement security. Her priorities changed because of her stage in life — a life-cycle effect — not because of a shared generational event.",
    },
    examConnection: {
      body: "Stimulus questions often show survey data by age group and ask whether a pattern reflects generational or life-cycle effects, or ask which agent of socialization a scenario describes.",
      tip: "Generational = shared formative event. Life cycle = changing circumstances with age.",
    },
    commonMistakes: [
      { mistake: "Using \"generational effect\" for any age difference.", correction: "Generational effects come from shared formative experiences; age differences can also reflect life-cycle effects." },
      { mistake: "Claiming socialization ends in childhood.", correction: "Socialization continues throughout life as people encounter new experiences and information." },
      { mistake: "Assuming media always changes minds.", correction: "Media often reinforces existing views because people select sources that match their beliefs." },
    ],
  },
  {
    id: "usgov-public-opinion-polling",
    courseId: "usgov",
    unitId: "usgov-u4",
    title: "Measuring Public Opinion: Polls & Their Reliability",
    minutes: 16,
    tags: ["public opinion", "polling", "random sample", "margin of error", "sampling error", "question wording", "benchmark poll", "tracking poll", "exit poll", "push poll", "reliability"],
    overview:
      "Polls measure public opinion by surveying a sample of a population. A poll is only as good as its sample and its questions: a large, random, representative sample and neutral wording produce reliable results; biased samples and loaded questions do not.",
    keyConcepts: [
      { term: "Random sample", definition: "A sample in which every member of the population has an equal chance of being selected." },
      { term: "Representative sample", definition: "A sample that reflects the demographic characteristics of the population." },
      { term: "Margin of error", definition: "A measure of the range within which the true population value likely falls; larger samples reduce it." },
      { term: "Benchmark poll", definition: "An initial poll that establishes a candidate's standing at the start of a campaign." },
      { term: "Tracking poll", definition: "Repeated polling of the same question over time to measure changes in opinion." },
      { term: "Entrance and exit polls", definition: "Surveys of voters as they arrive at or leave polling places, used to project results and analyze voting patterns." },
      { term: "Push poll", definition: "A campaign tactic disguised as a poll that spreads negative information about an opponent." },
    ],
    deepDive: [
      {
        heading: "What makes a poll reliable",
        body: "A reliable poll uses a **random, representative sample** of adequate size, asks **neutrally worded** questions, and reports its **margin of error**. If a poll shows Candidate A at 48% and Candidate B at 45% with a margin of error of ±3 points, the race is effectively a statistical tie. Pollsters often weight samples to match known population characteristics.",
      },
      {
        heading: "Sources of error",
        body: "Problems include **sampling error**, **nonresponse bias** (certain groups are less likely to answer), **question wording** that leads respondents, and **social desirability bias**. Online opt-in polls that let anyone respond are not random samples, so their results are unreliable no matter how many people participate.",
      },
      {
        heading: "How polls shape politics",
        body: "Elected officials and candidates use polls to decide which issues to emphasize. Media coverage of polls can create **horse-race** journalism and influence donors and voters. Some argue polls help representatives respond to constituents; others worry they encourage leaders to follow rather than lead.",
      },
    ],
    example: {
      heading: "Two questions, two answers",
      body: "Asking \"Do you support government assistance to the poor?\" typically yields more support than asking \"Do you support welfare?\" even though the policies are similar. Wording can shift results dramatically, which is why reliable pollsters test and publish their exact questions.",
    },
    examConnection: {
      body: "Quantitative Analysis FRQs frequently use polling data. You must describe trends, draw conclusions, and explain limitations — including whether differences fall within the margin of error.",
      tip: "When comparing two numbers in a poll, always check whether the gap is larger than the margin of error before calling it a real difference.",
    },
    commonMistakes: [
      { mistake: "Believing a bigger opt-in poll is more accurate.", correction: "Size doesn't fix a non-random sample. Randomness and representativeness matter most." },
      { mistake: "Ignoring the margin of error.", correction: "Differences smaller than the margin of error may not reflect real differences in the population." },
      { mistake: "Treating push polls as legitimate research.", correction: "Push polls are persuasion tactics, not measurements of opinion." },
    ],
  },
  {
    id: "usgov-ideologies",
    courseId: "usgov",
    unitId: "usgov-u4",
    title: "Political Ideologies & Party Platforms",
    minutes: 15,
    tags: ["ideology", "liberal", "conservative", "libertarian", "party platform", "political ideology", "Democratic Party", "Republican Party", "role of government"],
    overview:
      "Political ideology is a consistent set of beliefs about the role of government. In the U.S., liberals generally favor a larger government role in the economy and less in personal matters; conservatives generally favor less government economic regulation and more emphasis on traditional values and order; libertarians favor minimal government in both.",
    keyConcepts: [
      { term: "Liberalism (modern American)", definition: "Supports government action to promote economic equality and provide social services, and generally opposes government regulation of personal behavior." },
      { term: "Conservatism (modern American)", definition: "Supports free markets, lower taxes, and limited economic regulation; often supports traditional social values and a strong national defense." },
      { term: "Libertarianism", definition: "Favors minimal government in both economic and personal matters." },
      { term: "Party platform", definition: "A party's formal statement of its goals and policy positions, adopted at its national convention." },
    ],
    deepDive: [
      {
        heading: "Mapping ideology",
        body: "A single left–right scale oversimplifies ideology. A two-dimensional view separates **economic** questions (taxes, regulation, social programs) from **social** questions (personal behavior, traditional values). Liberals tend to favor more government action on the economy; conservatives favor more market freedom; libertarians favor freedom in both dimensions.",
      },
      {
        heading: "Ideology and parties",
        body: "Today the Democratic Party is associated with liberal positions and the Republican Party with conservative positions, and the parties have become more ideologically sorted since the 1970s. Party platforms signal priorities to voters and activists, though elected officials don't always follow them.",
      },
      {
        heading: "Ideology and the role of government",
        body: "Ideological differences show up in debates over health care, taxes, business regulation, immigration, and law enforcement. Exam questions often provide a quote or policy and ask which ideology it reflects, or ask you to explain how an ideological group would view a policy.",
      },
    ],
    example: {
      heading: "Health care positions",
      body: "A liberal politician argues for expanding public health insurance to cover more people. A conservative argues for market-based solutions such as health savings accounts and fewer regulations. A libertarian argues government should largely stay out of health insurance. All three are responding to the same problem from different ideological premises.",
    },
    examConnection: {
      body: "Expect stimulus questions with quotes from officials and questions asking which ideology favors a given policy. Concept Application prompts may ask how ideology shapes a party's response to a scenario.",
      tip: "Ask two questions: What role should government play in the economy? In personal life? The two answers usually identify the ideology.",
    },
    commonMistakes: [
      { mistake: "Using \"liberal\" in its classical, 18th-century sense.", correction: "On the AP exam, liberal refers to the modern American meaning — support for government action to promote equality." },
      { mistake: "Assuming all members of a party share its platform.", correction: "Individual officials frequently diverge from their party's platform." },
      { mistake: "Treating libertarians as moderates.", correction: "Libertarians hold a distinct ideology favoring minimal government, not a middle-of-the-road position." },
    ],
  },
  {
    id: "usgov-ideology-policy",
    courseId: "usgov",
    unitId: "usgov-u4",
    title: "Ideology & Policymaking: Economic and Social Policy",
    minutes: 16,
    tags: ["fiscal policy", "monetary policy", "Federal Reserve", "Keynesian economics", "supply-side economics", "social policy", "entitlements", "health care", "economic policy"],
    overview:
      "Ideology shapes how officials approach the economy and social problems. Fiscal policy (taxing and spending) is set by Congress and the president; monetary policy (interest rates and money supply) is set by the independent Federal Reserve. Keynesian and supply-side theories offer competing prescriptions.",
    keyConcepts: [
      { term: "Fiscal policy", definition: "Government decisions about taxing and spending, made by Congress and the president." },
      { term: "Monetary policy", definition: "Management of the money supply and interest rates by the Federal Reserve." },
      { term: "Keynesian economics", definition: "Theory that government spending and tax cuts that boost demand can stimulate the economy during downturns." },
      { term: "Supply-side economics", definition: "Theory that lower taxes and less regulation increase investment and production, spurring growth." },
      { term: "Federal Reserve", definition: "The central bank of the U.S., designed to be independent from short-term political pressure." },
    ],
    deepDive: [
      {
        heading: "Fiscal and monetary tools",
        body: "In a recession, a **Keynesian** approach calls for increased government spending or targeted tax cuts to boost demand, even if it adds to the deficit. A **supply-side** approach emphasizes cutting taxes, especially on businesses and investment, and reducing regulation to encourage production. Meanwhile, the **Federal Reserve** can lower interest rates to encourage borrowing or raise them to fight inflation. Its independence is meant to keep monetary policy from being driven by election cycles.",
      },
      {
        heading: "Social policy and ideology",
        body: "Liberals generally support government programs that address inequality and expand access to health care and education; conservatives generally prefer private, local, or market-based solutions and emphasize personal responsibility. Libertarians oppose most government involvement. These differences shape debates over entitlements, welfare, and health care.",
      },
      {
        heading: "Policy is also shaped by institutions",
        body: "Ideology alone doesn't determine outcomes. Divided government, the filibuster, federalism, interest groups, and public opinion all constrain what policies can pass. A president's ideological goals may be reshaped by Congress, the courts, and the states.",
      },
    ],
    example: {
      heading: "Responding to a downturn",
      body: "During an economic crisis, Congress passes a stimulus package with direct payments and infrastructure spending — a Keynesian approach. At the same time, the Federal Reserve lowers interest rates. Critics argue for tax cuts on businesses instead, reflecting supply-side thinking.",
    },
    examConnection: {
      body: "Questions often ask you to identify whether a policy reflects Keynesian or supply-side thinking, or whether it is fiscal or monetary. The Federal Reserve's independence is a common topic.",
      tip: "If it involves Congress and the budget, it's fiscal. If it involves interest rates and the Fed, it's monetary.",
    },
    commonMistakes: [
      { mistake: "Saying the president sets interest rates.", correction: "The Federal Reserve sets monetary policy independently." },
      { mistake: "Equating supply-side economics with increased spending.", correction: "Supply-side economics emphasizes tax cuts and deregulation to stimulate production." },
      { mistake: "Assuming ideology alone determines policy.", correction: "Institutions, public opinion, and interest groups all constrain policy outcomes." },
    ],
  },
];
