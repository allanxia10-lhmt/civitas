import type { Frq, FrqType } from "./types";

/**
 * FRQ practice bank. All prompts, rubrics, and model answers were written for
 * this site. Rubrics are practice rubrics modeled on the published task
 * formats — they are not official College Board scoring guidelines.
 */

export const FRQ_TYPES: Record<FrqType, { name: string; course: "usgov" | "compgov"; description: string; minutes: number }> = {
  "concept-application": {
    name: "Concept Application",
    course: "usgov",
    description: "Respond to a political scenario and explain how it relates to a political institution, behavior, or process.",
    minutes: 20,
  },
  "quantitative-analysis": {
    name: "Quantitative Analysis",
    course: "usgov",
    description: "Analyze data, identify a trend or pattern, draw a conclusion, and connect it to a political principle or process.",
    minutes: 20,
  },
  "scotus-comparison": {
    name: "SCOTUS Comparison",
    course: "usgov",
    description: "Compare a non-required Supreme Court case with a required case and explain how the holdings relate.",
    minutes: 20,
  },
  "argument-essay": {
    name: "Argument Essay",
    course: "usgov",
    description: "Develop an argument using evidence from required foundational documents and course concepts.",
    minutes: 40,
  },
  "comp-concept-application": {
    name: "Concept Application",
    course: "compgov",
    description: "Define or describe a political concept and explain or compare it using course countries.",
    minutes: 15,
  },
  "comp-quantitative-analysis": {
    name: "Quantitative Analysis",
    course: "compgov",
    description: "Analyze data, identify a pattern, draw a conclusion, and explain how it relates to political systems or behaviors.",
    minutes: 20,
  },
  "comparative-analysis": {
    name: "Comparative Analysis",
    course: "compgov",
    description: "Compare political concepts, systems, institutions, or policies in two course countries.",
    minutes: 20,
  },
  "comp-argument-essay": {
    name: "Argument Essay",
    course: "compgov",
    description: "Develop an argument using evidence from course countries related to the concepts in the prompt.",
    minutes: 35,
  },
};

const ARGUMENT_CRITERIA_US = (docs: string[]) => [
  {
    id: "claim",
    description: "Articulates a defensible claim or thesis that responds to the prompt and establishes a line of reasoning.",
    points: 1,
    signals: [["because", "therefore", "since", "better", "more effective", "best"]],
    minWords: 20,
  },
  {
    id: "evidence-1",
    description: "Uses one piece of specific and relevant evidence.",
    points: 1,
    minWords: 60,
  },
  {
    id: "evidence-2",
    description: `The evidence comes from one of the listed documents (${docs.join(", ")}) and supports the claim.`,
    points: 1,
    signals: [docs.map((d) => d.toLowerCase().replace(/^the /, "").replace("federalist no. ", "federalist "))],
  },
  {
    id: "evidence-3",
    description: "Uses a second piece of specific and relevant evidence (another listed document or a course concept) to support the claim.",
    points: 1,
    minWords: 150,
  },
  {
    id: "reasoning",
    description: "Explains why or how the evidence supports the claim.",
    points: 1,
    signals: [["this shows", "this demonstrates", "because", "which means", "as a result", "this illustrates"]],
  },
  {
    id: "alternative",
    description: "Responds to an opposing or alternative perspective using refutation, concession, or rebuttal.",
    points: 1,
    signals: [["although", "however", "critics", "opponents", "some argue", "others argue", "while", "on the other hand"]],
  },
];

export const FRQS: Frq[] = [
  // ============================================================ AP U.S. GOV
  {
    id: "us-frq-ca-federalism",
    courseId: "usgov",
    type: "concept-application",
    title: "Student Data Privacy and Federal Funding",
    unitIds: ["usgov-u1"],
    suggestedMinutes: 20,
    intro:
      "Congress passes a law requiring every state that accepts federal education funding to adopt strict data-privacy standards for student records in public schools. Several governors object, arguing that decisions about running public schools belong to the states. One state legislature debates whether to reject its federal education funds rather than comply.",
    parts: [
      {
        label: "A",
        prompt: "Describe the tool of federalism Congress is using in the scenario.",
        criteria: [
          {
            id: "a1",
            description: "Describes conditions of aid / a categorical grant — federal money with requirements attached (fiscal federalism).",
            points: 1,
            signals: [["condition", "categorical", "strings", "fiscal federalism", "grant"]],
          },
        ],
        modelAnswer:
          "Congress is using conditions of aid, a form of fiscal federalism. It attaches requirements — adopting data-privacy standards — to federal education grants, so states that want the money must follow national policy.",
      },
      {
        label: "B",
        prompt: "In the context of the scenario, explain how the governors' objections reflect the principle of federalism.",
        criteria: [
          {
            id: "b1",
            description: "Explains that the governors are defending state authority over education as a reserved power (Tenth Amendment) against expanding national power.",
            points: 1,
            signals: [["reserved", "tenth", "10th", "state power", "states' rights", "state authority"], ["education", "school"]],
          },
        ],
        modelAnswer:
          "Federalism divides power between the national and state governments, and education has traditionally been a reserved power of the states under the Tenth Amendment. The governors argue that by using funding conditions to dictate school policy, Congress is intruding on an area the Constitution leaves to the states.",
      },
      {
        label: "C",
        prompt: "In the context of the scenario, explain how a state could use another branch of the national government to challenge the law.",
        criteria: [
          {
            id: "c1",
            description: "Explains that the state could sue in federal court, asking the judiciary to use judicial review to rule the conditions unconstitutional (e.g., unduly coercive).",
            points: 1,
            signals: [["court", "sue", "lawsuit", "judicial review", "judiciary"]],
          },
        ],
        modelAnswer:
          "The state could file a lawsuit in federal court arguing that the conditions exceed Congress's spending power or are so coercive that they violate state sovereignty. Through judicial review, the courts could strike down or limit the conditions, checking Congress.",
      },
    ],
    scoringNotes: [
      "Each part is worth one point in this practice rubric (3 total).",
      "Answers must connect to the scenario — a correct definition with no link to the governors or the funding conditions would not earn the point.",
    ],
  },
  {
    id: "us-frq-ca-filibuster",
    courseId: "usgov",
    type: "concept-application",
    title: "An Immigration Bill Stalls in the Senate",
    unitIds: ["usgov-u2"],
    suggestedMinutes: 20,
    intro:
      "A bill reforming federal immigration law passes the House of Representatives with bipartisan support. In the Senate, 56 senators say they support the bill, but senators from the minority party announce they will use every procedural tool available to prevent a final vote. Some majority-party senators propose changing Senate rules so that most legislation could pass by a simple majority.",
    parts: [
      {
        label: "A",
        prompt: "Describe the procedural tool the minority-party senators are most likely to use.",
        criteria: [
          { id: "a1", description: "Describes the filibuster — extended debate that delays or blocks a vote unless cloture is invoked.", points: 1, signals: [["filibuster", "extended debate", "unlimited debate"]] },
        ],
        modelAnswer:
          "They are likely to filibuster — using the Senate's tradition of extended debate to prevent the bill from coming to a final vote.",
      },
      {
        label: "B",
        prompt: "Explain how Senate rules make the legislative process in the Senate different from that in the House.",
        criteria: [
          {
            id: "b1",
            description: "Explains that ending a filibuster requires 60 votes for cloture in the Senate, while the House limits debate through the Rules Committee and majority control.",
            points: 1,
            signals: [["cloture", "60", "sixty", "three-fifths"], ["house", "rules committee", "majority"]],
          },
        ],
        modelAnswer:
          "In the Senate, ending a filibuster requires a cloture vote of 60 senators, so even a bill with 56 supporters can be blocked. In the House, the majority-controlled Rules Committee sets limits on debate and amendments, so a simple majority can move a bill to a vote.",
      },
      {
        label: "C",
        prompt: "Explain one potential consequence of changing Senate rules so that most legislation could pass by a simple majority.",
        criteria: [
          {
            id: "c1",
            description: "Explains a plausible consequence, such as faster passage of the majority's agenda, reduced protection for the minority party, or larger policy swings when control changes.",
            points: 1,
            signals: [["faster", "easier", "minority", "swing", "reverse", "polariz", "majority"]],
          },
        ],
        modelAnswer:
          "Majority rule would make it easier for the majority party to pass its agenda, but it would reduce the minority's ability to force compromise. Policies could then swing back and forth more sharply whenever party control of the Senate changes.",
      },
    ],
    scoringNotes: ["Each part is worth one point in this practice rubric (3 total).", "In part B, you must address both chambers to show the difference."],
  },
  {
    id: "us-frq-qa-turnout",
    courseId: "usgov",
    type: "quantitative-analysis",
    title: "Turnout by Age in Presidential and Midterm Elections",
    unitIds: ["usgov-u5", "usgov-u4"],
    suggestedMinutes: 20,
    intro: "Use the data to answer the questions that follow.",
    stimulus: {
      kind: "table",
      title: "Voter Turnout by Age Group (hypothetical)",
      headers: ["Age group", "Presidential election", "Midterm election"],
      rows: [
        ["18–29", "51%", "27%"],
        ["30–44", "61%", "41%"],
        ["45–64", "69%", "55%"],
        ["65+", "75%", "65%"],
      ],
      note: "Hypothetical data for practice, modeled on commonly observed patterns.",
    },
    parts: [
      {
        label: "A",
        prompt: "Identify the age group with the highest turnout in midterm elections.",
        criteria: [{ id: "a1", description: "Identifies the 65+ age group (65%).", points: 1, signals: [["65"]] }],
        modelAnswer: "Voters aged 65 and older had the highest midterm turnout, at 65%.",
      },
      {
        label: "B",
        prompt: "Describe a difference between turnout in presidential and midterm elections shown in the data.",
        criteria: [
          {
            id: "b1",
            description: "Describes that turnout is lower in midterms for every age group, or that the drop-off is largest among 18–29-year-olds (24 points).",
            points: 1,
            signals: [["lower", "drop", "decrease", "less", "declin"], ["midterm"]],
          },
        ],
        modelAnswer:
          "Turnout is lower in midterm elections than in presidential elections for every age group, and the drop-off is largest among 18–29-year-olds — 24 percentage points, compared with 10 points for voters 65 and older.",
      },
      {
        label: "C",
        prompt: "Draw a conclusion about why turnout differs between presidential and midterm elections.",
        criteria: [
          {
            id: "c1",
            description: "Draws a reasonable conclusion, such as lower media attention, less campaign mobilization, or lower perceived stakes in midterms.",
            points: 1,
            signals: [["attention", "media", "mobiliz", "campaign", "stakes", "interest", "salien"]],
          },
        ],
        modelAnswer:
          "Presidential elections receive more media attention and campaign mobilization, so voters — especially younger, less habitual voters — perceive higher stakes and are more likely to participate than in midterm elections.",
      },
      {
        label: "D",
        prompt: "Explain how the pattern in the data could affect how members of Congress make policy.",
        criteria: [
          {
            id: "d1",
            description: "Explains that members may be more responsive to older voters' priorities (e.g., Social Security, Medicare) because older voters turn out reliably, especially in midterms.",
            points: 1,
            signals: [["older", "senior", "65"], ["responsive", "priorit", "policy", "social security", "medicare", "attention"]],
          },
        ],
        modelAnswer:
          "Because older citizens vote reliably — especially in midterms, when every House seat is on the ballot — members of Congress have an electoral incentive to prioritize issues that matter to older voters, such as protecting Social Security and Medicare, over issues important to younger voters.",
      },
    ],
    scoringNotes: [
      "Each part is worth one point in this practice rubric (4 total).",
      "Use specific numbers from the data when describing patterns.",
    ],
  },
  {
    id: "us-frq-qa-outside-spending",
    courseId: "usgov",
    type: "quantitative-analysis",
    title: "Outside Spending in Federal Elections",
    unitIds: ["usgov-u5"],
    suggestedMinutes: 20,
    intro: "Use the data to answer the questions that follow.",
    stimulus: {
      kind: "bar",
      title: "Outside Spending in Federal Elections (hypothetical, billions of dollars)",
      unit: "$B",
      series: [
        { label: "2008", value: 0.4 },
        { label: "2012", value: 1.1 },
        { label: "2016", value: 1.5 },
        { label: "2020", value: 3.0 },
        { label: "2024", value: 3.3 },
      ],
      note: "Hypothetical data for practice. Outside spending = spending by groups other than candidates and parties.",
    },
    parts: [
      {
        label: "A",
        prompt: "Identify the election cycle with the greatest outside spending.",
        criteria: [{ id: "a1", description: "Identifies 2024 ($3.3 billion).", points: 1, signals: [["2024"]] }],
        modelAnswer: "Outside spending was greatest in the 2024 cycle, at $3.3 billion.",
      },
      {
        label: "B",
        prompt: "Describe the trend in outside spending shown in the data.",
        criteria: [
          { id: "b1", description: "Describes that outside spending increased over the period (roughly eightfold from 2008 to 2024).", points: 1, signals: [["increase", "grew", "rose", "higher", "risen"]] },
        ],
        modelAnswer: "Outside spending increased steadily, from $0.4 billion in 2008 to $3.3 billion in 2024 — more than eight times as much.",
      },
      {
        label: "C",
        prompt: "Draw a conclusion about the trend using a Supreme Court decision.",
        criteria: [
          {
            id: "c1",
            description: "Connects the increase after 2010 to Citizens United v. FEC, which allowed unlimited independent expenditures by corporations and unions (and led to super PACs).",
            points: 1,
            signals: [["citizens united"], ["independent", "super pac", "unlimited", "corporation"]],
          },
        ],
        modelAnswer:
          "The sharp growth after 2008 is consistent with Citizens United v. FEC (2010), which held that the government may not ban independent political expenditures by corporations and unions. The ruling helped create super PACs, which can raise and spend unlimited sums.",
      },
      {
        label: "D",
        prompt: "Explain how the trend could affect the relationship between candidates and political parties.",
        criteria: [
          {
            id: "d1",
            description: "Explains that candidates can rely on outside groups rather than parties, weakening party control and encouraging candidate-centered campaigns.",
            points: 1,
            signals: [["party", "parties"], ["candidate-centered", "independent", "rely", "weaken", "less dependent", "less control"]],
          },
        ],
        modelAnswer:
          "As outside groups spend more, candidates depend less on party organizations for support. Party leaders have less leverage over nominees, reinforcing candidate-centered campaigns in which super PACs and allied groups shape messaging.",
      },
    ],
    scoringNotes: ["Each part is worth one point in this practice rubric (4 total)."],
  },
  {
    id: "us-frq-scotus-morse",
    courseId: "usgov",
    type: "scotus-comparison",
    title: "Morse v. Frederick and Student Speech",
    unitIds: ["usgov-u3"],
    suggestedMinutes: 20,
    intro:
      "In 2002, students at a high school in Juneau, Alaska, were released from class to watch the Olympic torch relay pass by the school. Student Joseph Frederick and friends unfurled a large banner reading \"BONG HiTS 4 JESUS.\" The principal, Deborah Morse, confiscated the banner and suspended Frederick, reasoning that it promoted illegal drug use in violation of school policy. Frederick sued, claiming his First Amendment rights had been violated. In Morse v. Frederick (2007), the Supreme Court ruled 5–4 that schools may restrict student speech at school-supervised events when that speech is reasonably viewed as promoting illegal drug use.",
    parts: [
      {
        label: "A",
        prompt: "Identify the constitutional clause that is common to both Morse v. Frederick (2007) and Tinker v. Des Moines Independent Community School District (1969).",
        criteria: [
          { id: "a1", description: "Identifies the Free Speech Clause of the First Amendment.", points: 1, signals: [["first amendment", "1st amendment", "free speech", "freedom of speech"]] },
        ],
        modelAnswer: "Both cases involve the Free Speech Clause of the First Amendment.",
      },
      {
        label: "B",
        prompt: "Based on the constitutional clause identified in part A, explain why the facts of Tinker v. Des Moines led to a different holding than the holding in Morse v. Frederick.",
        criteria: [
          {
            id: "b1",
            description: "Describes the relevant facts of Tinker: students wore black armbands to protest the Vietnam War and were suspended.",
            points: 1,
            signals: [["armband"], ["vietnam", "war", "protest"]],
          },
          {
            id: "b2",
            description: "Explains that Tinker's political, symbolic speech caused no substantial disruption and was protected, whereas Morse's banner was reasonably seen as promoting illegal drug use, which schools may restrict.",
            points: 1,
            signals: [["disrupt"], ["drug", "illegal"]],
          },
        ],
        modelAnswer:
          "In Tinker, students wore black armbands to school to protest the Vietnam War and were suspended. The Court held that this silent, symbolic political speech was protected because it did not cause a substantial disruption of school activities. In Morse, by contrast, the banner was not political commentary and was reasonably interpreted as promoting illegal drug use, which the Court held schools have an important interest in discouraging — so the school could restrict it.",
      },
      {
        label: "C",
        prompt: "Explain how citizens who disagree with the holding in Morse v. Frederick could try to limit its impact.",
        criteria: [
          {
            id: "c1",
            description: "Explains a relevant action, such as lobbying state legislatures to pass laws protecting student speech, pressing school boards to adopt protective policies, or bringing new cases to narrow the ruling.",
            points: 1,
            signals: [["state", "school board", "legislat", "lobby", "law", "lawsuit", "policy"]],
          },
        ],
        modelAnswer:
          "Citizens could lobby their state legislatures to pass laws giving students broader free-expression protections than the Constitution requires, or press local school boards to adopt policies protecting student speech. Because of federalism, states can offer more protection than the federal minimum.",
      },
    ],
    scoringNotes: [
      "Part B is worth two points: one for describing Tinker's facts and one for explaining why the holdings differ (4 total in this practice rubric).",
      "Avoid simply restating the Morse facts from the prompt.",
    ],
  },
  {
    id: "us-frq-scotus-rucho",
    courseId: "usgov",
    type: "scotus-comparison",
    title: "Rucho v. Common Cause and Redistricting",
    unitIds: ["usgov-u2"],
    suggestedMinutes: 20,
    intro:
      "After the 2010 census, legislatures in North Carolina and Maryland drew congressional district maps that heavily favored one political party. In North Carolina, the Republican-controlled legislature openly drew districts to maximize Republican seats; in Maryland, Democrats redrew a district to defeat a Republican incumbent. Voters sued, arguing that partisan gerrymandering violated the Constitution. In Rucho v. Common Cause (2019), the Supreme Court ruled 5–4 that partisan gerrymandering claims present political questions beyond the reach of the federal courts.",
    parts: [
      {
        label: "A",
        prompt: "Identify the constitutional issue common to both Baker v. Carr (1962) and Rucho v. Common Cause (2019).",
        criteria: [
          {
            id: "a1",
            description: "Identifies whether federal courts may hear challenges to how legislative districts are drawn (justiciability / political question) under the Equal Protection Clause.",
            points: 1,
            signals: [["district", "redistrict", "apportion", "gerrymander"], ["court", "justiciab", "political question", "equal protection"]],
          },
        ],
        modelAnswer:
          "Both cases address whether federal courts can decide challenges to the way legislative districts are drawn — that is, whether redistricting claims are justiciable or are political questions for the elected branches.",
      },
      {
        label: "B",
        prompt: "Based on the issue identified in part A, explain why the facts of Baker v. Carr led to a different holding than the holding in Rucho v. Common Cause.",
        criteria: [
          {
            id: "b1",
            description: "Describes Baker's facts: Tennessee had not redrawn legislative districts since 1901, so urban voters' votes were diluted by population differences.",
            points: 1,
            signals: [["tennessee", "1901", "population"], ["urban", "dilut", "unequal", "rural"]],
          },
          {
            id: "b2",
            description: "Explains that malapportionment could be measured by a clear population standard (one person, one vote), whereas the Court found no manageable standard for judging how much partisanship is too much.",
            points: 1,
            signals: [["standard", "measur", "one person", "population equality"], ["partisan", "political"]],
          },
        ],
        modelAnswer:
          "In Baker v. Carr, Tennessee had not redrawn its legislative districts since 1901, so rural districts had far fewer people than urban ones and urban votes were diluted. The Court held the claim was justiciable because unequal population is a measurable harm under the Equal Protection Clause, leading to the one-person, one-vote standard. In Rucho, the districts were equal in population; the complaint was about partisan advantage. The majority concluded there was no judicially manageable standard for deciding how much partisanship is too much, so the claims were political questions.",
      },
      {
        label: "C",
        prompt: "Explain how voters who disagree with the holding in Rucho v. Common Cause could respond.",
        criteria: [
          {
            id: "c1",
            description: "Explains a relevant response, such as creating independent redistricting commissions through ballot initiatives, suing in state courts under state constitutions, or asking Congress to set redistricting standards.",
            points: 1,
            signals: [["commission", "initiative", "state court", "state constitution", "congress", "ballot"]],
          },
        ],
        modelAnswer:
          "Voters could use ballot initiatives to create independent redistricting commissions that take map-drawing away from legislatures, or bring lawsuits in state courts under state constitutional provisions. They could also pressure Congress to pass national redistricting standards.",
      },
    ],
    scoringNotes: ["Part B is worth two points (4 total in this practice rubric)."],
  },
  {
    id: "us-frq-arg-federalism",
    courseId: "usgov",
    type: "argument-essay",
    title: "Which Level of Government Best Protects Liberty?",
    unitIds: ["usgov-u1"],
    suggestedMinutes: 40,
    intro:
      "Develop an argument that explains whether the national government or state governments are better suited to protect individual liberty.\n\nUse at least one piece of evidence from one of the following foundational documents:\n• Brutus No. 1\n• Federalist No. 10\n• Federalist No. 39\n\nIn your response, you should do the following:\n• Respond to the prompt with a defensible claim or thesis that establishes a line of reasoning.\n• Support your claim with at least TWO pieces of specific and relevant evidence. One piece must come from the list above; the other can be from the list or from your knowledge of course concepts.\n• Use reasoning to explain why your evidence supports your claim.\n• Respond to an opposing or alternative perspective using refutation, concession, or rebuttal.",
    parts: [
      {
        label: "Essay",
        prompt: "Write your argument essay.",
        criteria: ARGUMENT_CRITERIA_US(["Brutus No. 1", "Federalist No. 10", "Federalist No. 39"]),
        modelAnswer:
          "Thesis: The national government is better suited to protect individual liberty because a large republic makes it harder for any single faction to oppress minorities, as history has repeatedly shown when states failed to protect their own citizens.\n\nIn Federalist No. 10, Madison argued that factions are inevitable and that the danger is a majority faction invading the rights of others. In a small republic, a single faction can easily dominate. By \"extending the sphere,\" the national republic includes so many interests that it becomes less likely a majority will share a common motive to oppress. This reasoning explains why national institutions have often protected rights that states violated.\n\nThe civil rights era illustrates Madison's point. Southern states enforced segregation and denied Black citizens the vote. It took national action — the Supreme Court's ruling in Brown v. Board of Education (1954), and Congress's passage of the Civil Rights Act of 1964 and the Voting Rights Act of 1965 — to protect those citizens' liberty and equality. Local majorities had captured state governments; only the broader national republic could overcome them.\n\nSelective incorporation reinforces this. Through the Fourteenth Amendment, cases like Gideon v. Wainwright and McDonald v. Chicago applied Bill of Rights protections against the states, giving individuals national protection against state governments.\n\nOpponents, like Brutus, argue that a distant national government cannot know the people and will gradually absorb state power, threatening liberty. There is some truth to this concern — the national government can overreach, which is why Lopez limited the Commerce Clause. But the historical record shows that states, not the national government, have more often been the source of violations of minority rights, and Federalist No. 39 notes that the Constitution preserves state roles anyway. The national government's size and diversity make it the more reliable protector of individual liberty.",
      },
    ],
    scoringNotes: [
      "Practice rubric: 6 points — claim (1), evidence (3), reasoning (1), alternative perspective (1).",
      "The claim must do more than restate the prompt; it should preview your reasoning.",
      "Describing a document isn't enough — you must use it to support your claim.",
    ],
  },
  {
    id: "us-frq-arg-presidency",
    courseId: "usgov",
    type: "argument-essay",
    title: "Executive Orders and the Framers' Intent",
    unitIds: ["usgov-u2"],
    suggestedMinutes: 40,
    intro:
      "Develop an argument that explains whether the modern presidency's frequent use of executive orders is consistent with the Framers' intentions for the executive branch.\n\nUse at least one piece of evidence from one of the following foundational documents:\n• Federalist No. 51\n• Federalist No. 70\n• The Constitution of the United States\n\nIn your response, you should do the following:\n• Respond to the prompt with a defensible claim or thesis that establishes a line of reasoning.\n• Support your claim with at least TWO pieces of specific and relevant evidence. One piece must come from the list above; the other can be from the list or from your knowledge of course concepts.\n• Use reasoning to explain why your evidence supports your claim.\n• Respond to an opposing or alternative perspective using refutation, concession, or rebuttal.",
    parts: [
      {
        label: "Essay",
        prompt: "Write your argument essay.",
        criteria: ARGUMENT_CRITERIA_US(["Federalist No. 51", "Federalist No. 70", "The Constitution"]),
        modelAnswer:
          "Thesis: The modern use of executive orders is largely consistent with the Framers' intentions because they deliberately created an energetic single executive, and the constitutional checks they built still limit how far those orders can go.\n\nIn Federalist No. 70, Hamilton argued that \"energy in the executive is a leading character in the definition of good government,\" and that a single executive can act with \"decision, activity, secrecy, and despatch.\" Executive orders are a modern expression of that energy: when Congress is gridlocked, presidents can direct how the executive branch enforces existing laws. This matches Hamilton's view that a unified executive should be able to act decisively.\n\nThe Constitution also supports this. Article II vests \"the executive Power\" in the president and requires the president to \"take Care that the Laws be faithfully executed.\" Executive orders are tools for managing the executive branch in carrying out that duty.\n\nCrucially, the Framers' system of checks still applies. As Madison wrote in Federalist No. 51, \"ambition must be made to counteract ambition.\" Congress can pass laws superseding executive orders or deny funding for their implementation, courts can strike down orders that exceed legal authority, and future presidents can revoke them. The fact that orders are so easily reversed shows they remain constrained.\n\nCritics argue that presidents use executive orders to bypass Congress and make law unilaterally, contrary to the Framers' fear of monarchy. This concern has merit when orders stretch statutory authority. However, the courts' willingness to invalidate orders that exceed legal authority shows that the separation of powers continues to function as designed. Executive orders therefore reflect, rather than violate, the Framers' vision of an energetic but checked presidency.",
      },
    ],
    scoringNotes: ["Practice rubric: 6 points — claim (1), evidence (3), reasoning (1), alternative perspective (1)."],
  },

  // ============================================================ AP COMP GOV
  {
    id: "comp-frq-ca-rentier",
    courseId: "compgov",
    type: "comp-concept-application",
    title: "Rentier States and Accountability",
    unitIds: ["compgov-u5"],
    suggestedMinutes: 15,
    intro: "Answer all parts of the question.",
    parts: [
      {
        label: "A",
        prompt: "Define a rentier state.",
        criteria: [{ id: "a1", description: "Defines a rentier state as one that relies heavily on revenue from natural resources (rents) rather than taxing its citizens.", points: 1, signals: [["resource", "oil", "gas", "rent"], ["revenue", "income"]] }],
        modelAnswer: "A rentier state is a state that derives a large share of its revenue from natural resource rents — such as oil and gas exports — rather than from taxing its citizens.",
      },
      {
        label: "B",
        prompt: "Describe one way a government in a rentier state can use resource revenue to maintain political control.",
        criteria: [{ id: "b1", description: "Describes a method such as patronage, subsidies, funding security forces, or co-opting elites.", points: 1, signals: [["patronage", "subsid", "security", "co-opt", "reward", "loyal", "spend"]] }],
        modelAnswer: "The government can use oil revenue to fund patronage networks and subsidies — for example, cheap fuel — that reward supporters and reduce discontent, while also financing security forces that can repress opposition.",
      },
      {
        label: "C",
        prompt: "Explain why reliance on resource revenue can weaken government accountability to citizens.",
        criteria: [{ id: "c1", description: "Explains that because the state does not depend on taxpayers, citizens have less leverage to demand accountability and transparency.", points: 1, signals: [["tax"], ["accountab", "leverage", "demand", "depend"]] }],
        modelAnswer:
          "When a government does not depend on tax revenue, it has less need to bargain with citizens or justify its spending. Citizens who aren't paying significant taxes have less leverage to demand transparency and accountability, which weakens the link between public preferences and government action.",
      },
      {
        label: "D",
        prompt: "Explain how the government of a course country has responded to a challenge created by dependence on resource revenue.",
        criteria: [{ id: "d1", description: "Explains a specific response, such as Nigeria removing its fuel subsidy in 2023, Russia's state control of energy firms, or Iran's use of bonyads and responses to sanctions.", points: 1, signals: [["nigeria", "russia", "iran", "mexico"], ["subsid", "sanction", "diversif", "gazprom", "rosneft", "pemex", "bonyad", "exchange rate"]] }],
        modelAnswer:
          "Nigeria's heavy dependence on oil left it with a costly fuel subsidy that strained public finances. In 2023, the government removed the subsidy and moved to unify exchange rates to stabilize its budget and encourage investment — but the reform sharply raised living costs, illustrating the political risks of reducing rentier-state benefits.",
      },
    ],
    scoringNotes: ["Practice rubric: 4 points (one per part)."],
  },
  {
    id: "comp-frq-ca-civil-society",
    courseId: "compgov",
    type: "comp-concept-application",
    title: "Civil Society Under Authoritarian Rule",
    unitIds: ["compgov-u4", "compgov-u3"],
    suggestedMinutes: 15,
    intro: "Answer all parts of the question.",
    parts: [
      {
        label: "A",
        prompt: "Define civil society.",
        criteria: [{ id: "a1", description: "Defines civil society as voluntary organizations outside the state through which citizens pursue shared interests.", points: 1, signals: [["voluntary", "independent", "outside", "non-government", "nongovernment"], ["organization", "group", "association"]] }],
        modelAnswer: "Civil society is the realm of voluntary organizations — such as NGOs, religious groups, unions, and advocacy groups — that exist independently of the state and allow citizens to pursue shared interests.",
      },
      {
        label: "B",
        prompt: "Describe one way an authoritarian regime can restrict civil society.",
        criteria: [{ id: "b1", description: "Describes a method such as registration requirements, foreign agents laws, state-controlled organizations, or arrests of activists.", points: 1, signals: [["register", "foreign agent", "ban", "arrest", "control", "censor", "undesirable"]] }],
        modelAnswer: "An authoritarian regime can require organizations to register with the state and label those receiving foreign funds as \"foreign agents,\" as Russia has done, imposing burdens and stigma that force many groups to close.",
      },
      {
        label: "C",
        prompt: "Explain why an authoritarian regime might tolerate some civil society activity.",
        criteria: [{ id: "c1", description: "Explains a reason such as providing services, gathering information about public grievances, or appearing legitimate.", points: 1, signals: [["service", "information", "legitima", "grievance", "feedback", "pressure valve"]] }],
        modelAnswer: "Allowing some civil society activity — such as service-providing charities — helps the regime deliver services, gather information about public grievances, and appear more legitimate, as long as groups don't challenge its hold on power.",
      },
      {
        label: "D",
        prompt: "Explain how civil society in a course country has challenged the government or influenced policy.",
        criteria: [{ id: "d1", description: "Explains a specific example such as Nigeria's EndSARS protests, Iran's 2022 protests, Mexico's Zapatistas, or UK interest groups influencing policy.", points: 1, signals: [["endsars", "zapatista", "mahsa", "woman, life", "green movement", "tuc", "cbi", "navalny"]] }],
        modelAnswer:
          "In Nigeria, young people organized the 2020 EndSARS protests largely through social media to demand an end to abuses by a police unit. The government announced the unit's dissolution, showing civil society's influence — though a later violent crackdown also showed the limits of state responsiveness.",
      },
    ],
    scoringNotes: ["Practice rubric: 4 points (one per part)."],
  },
  {
    id: "comp-frq-qa-seats-votes",
    courseId: "compgov",
    type: "comp-quantitative-analysis",
    title: "Votes and Seats Under First Past the Post",
    unitIds: ["compgov-u4"],
    suggestedMinutes: 20,
    intro: "Use the data to answer the questions that follow.",
    stimulus: {
      kind: "table",
      title: "UK General Election, 2024 — Vote Share vs. Seat Share (rounded)",
      headers: ["Party", "Vote share", "Seat share"],
      rows: [
        ["Labour", "34%", "63%"],
        ["Conservative", "24%", "19%"],
        ["Reform UK", "14%", "1%"],
        ["Liberal Democrats", "12%", "11%"],
        ["Green", "7%", "1%"],
      ],
      source: "UK House of Commons Library, 2024 general election results.",
      note: "Rounded. Seat share is the percentage of 650 Commons seats.",
    },
    parts: [
      {
        label: "A",
        prompt: "Using the data, identify the party whose seat share was farthest below its vote share.",
        criteria: [{ id: "a1", description: "Identifies Reform UK (14% of votes, about 1% of seats).", points: 1, signals: [["reform"]] }],
        modelAnswer: "Reform UK: it won about 14% of the vote but only about 1% of seats.",
      },
      {
        label: "B",
        prompt: "Using the data, describe a pattern in the relationship between vote share and seat share.",
        criteria: [{ id: "b1", description: "Describes that the largest party won a much larger share of seats than votes while smaller parties with dispersed support were underrepresented.", points: 1, signals: [["labour", "largest", "winner"], ["more seats", "overrepresent", "larger share", "underrepresent", "fewer seats", "disproportion"]] }],
        modelAnswer: "The largest party, Labour, won 63% of seats with only 34% of the vote, while smaller parties such as Reform UK and the Greens won far smaller shares of seats than votes.",
      },
      {
        label: "C",
        prompt: "Draw a conclusion about why the Liberal Democrats' seat share was close to their vote share while Reform UK's was not.",
        criteria: [{ id: "c1", description: "Concludes that Liberal Democrat support was geographically concentrated, letting them win pluralities in specific constituencies, while Reform UK's support was spread thinly.", points: 1, signals: [["concentrat", "geograph", "spread", "dispers"]] }],
        modelAnswer: "Liberal Democrat support was geographically concentrated, so they won pluralities in many specific constituencies. Reform UK's support was spread thinly across the country, so it finished second or third in many seats and won very few.",
      },
      {
        label: "D",
        prompt: "Explain how the UK's electoral system produces the pattern shown in the data.",
        criteria: [{ id: "d1", description: "Explains that single-member district plurality (first past the post) awards each seat to the plurality winner, so votes for losing candidates don't translate into seats.", points: 1, signals: [["first past the post", "single-member", "smd", "plurality", "winner-take-all"]] }],
        modelAnswer: "The UK uses single-member district plurality (first past the post). Each constituency elects only the candidate with the most votes, so votes for losing candidates earn no representation. This rewards the largest party and parties with concentrated support.",
      },
      {
        label: "E",
        prompt: "Explain one way the pattern in the data could affect political competition in the UK.",
        criteria: [{ id: "e1", description: "Explains an effect such as sustaining single-party majority governments, pressure for electoral reform (PR), or strategic voting.", points: 1, signals: [["majority", "reform", "proportional", "strategic", "two-party", "coalition"]] }],
        modelAnswer: "Disproportional results tend to produce single-party majority governments, reducing the need for coalitions. They also fuel demands from smaller parties such as Reform UK and the Greens for proportional representation, and encourage strategic voting for larger parties.",
      },
    ],
    scoringNotes: ["Practice rubric: 5 points (one per part).", "Cite numbers from the table in parts A–C."],
  },
  {
    id: "comp-frq-comp-term-limits",
    courseId: "compgov",
    type: "comparative-analysis",
    title: "Executive Term Limits",
    unitIds: ["compgov-u2"],
    suggestedMinutes: 20,
    intro: "Answer all parts of the question using two different course countries (China, Iran, Mexico, Nigeria, Russia, or the United Kingdom).",
    parts: [
      {
        label: "A",
        prompt: "Define executive term limits.",
        criteria: [{ id: "a1", description: "Defines term limits as legal limits on the number or length of terms an executive may serve.", points: 1, signals: [["limit", "restrict"], ["term", "years", "serve"]] }],
        modelAnswer: "Executive term limits are constitutional or legal restrictions on how many terms, or how long, a chief executive may serve.",
      },
      {
        label: "B",
        prompt: "Describe the rules governing executive term limits in two different course countries.",
        criteria: [
          { id: "b1", description: "Accurately describes term limits in a first course country (e.g., Mexico: one six-year term).", points: 1, signals: [["mexico", "nigeria", "russia", "china", "iran", "united kingdom", "uk"]] },
          { id: "b2", description: "Accurately describes term limits in a second course country (e.g., Russia: 2020 amendments reset the incumbent's count).", points: 1, minWords: 60 },
        ],
        modelAnswer:
          "In Mexico, the president serves a single six-year term (the sexenio) and can never be reelected. In Russia, the president serves six-year terms with a limit of two, but 2020 constitutional amendments reset the sitting president's term count, allowing Vladimir Putin to run again in 2024 and potentially 2030.",
      },
      {
        label: "C",
        prompt: "Explain why each country's approach to term limits reflects its regime type or history.",
        criteria: [
          { id: "c1", description: "Explains how the first country's approach reflects its regime or history (e.g., Mexico's reaction to the Díaz dictatorship; democratic constraint).", points: 1, signals: [["díaz", "diaz", "dictator", "revolution", "democra", "constrain"]] },
          { id: "c2", description: "Explains how the second country's approach reflects its regime (e.g., Russia's authoritarian personalization of power using legal procedures).", points: 1, signals: [["authoritarian", "personal", "consolidat", "entrench", "power"]] },
        ],
        modelAnswer:
          "Mexico's strict single-term rule reflects its history: the Mexican Revolution was fought partly against Porfirio Díaz's decades-long rule, so \"no reelection\" became a core principle, and it continues to constrain presidents in a competitive democracy. Russia's reset of term limits reflects its authoritarian regime: rather than openly abolishing limits, the leadership used a constitutional referendum to extend Putin's eligibility, entrenching personal power while maintaining an appearance of legality.",
      },
    ],
    scoringNotes: ["Practice rubric: 5 points — A (1), B (2), C (2).", "You must use two different course countries."],
  },
  {
    id: "comp-frq-comp-cleavages",
    courseId: "compgov",
    type: "comparative-analysis",
    title: "Responding to Ethnic and Religious Cleavages",
    unitIds: ["compgov-u3", "compgov-u1"],
    suggestedMinutes: 20,
    intro: "Answer all parts of the question using two different course countries.",
    parts: [
      {
        label: "A",
        prompt: "Define a social cleavage.",
        criteria: [{ id: "a1", description: "Defines a cleavage as a division in society (ethnic, religious, regional, class) that shapes political behavior or conflict.", points: 1, signals: [["division", "divide", "split"], ["ethnic", "religio", "region", "class", "identity"]] }],
        modelAnswer: "A social cleavage is a division within society — based on ethnicity, religion, region, class, or other identities — that shapes political attitudes, behavior, and conflict.",
      },
      {
        label: "B",
        prompt: "Describe a policy or institution that a government in each of two different course countries has used to respond to an ethnic, national, or religious cleavage.",
        criteria: [
          { id: "b1", description: "Describes a response in a first country (e.g., Nigeria's federal character principle or state creation).", points: 1, signals: [["federal character", "zoning", "states", "devolution", "good friday", "reserved seats"]] },
          { id: "b2", description: "Describes a response in a second country (e.g., UK devolution; China's policies in Xinjiang).", points: 1, minWords: 70 },
        ],
        modelAnswer:
          "Nigeria uses the federal character principle, which requires government appointments to reflect the country's diversity, and has expanded its federal system to 36 states. The United Kingdom responded to national identities in Scotland, Wales, and Northern Ireland through devolution in 1998, creating regional legislatures, and used power-sharing in Northern Ireland under the Good Friday Agreement.",
      },
      {
        label: "C",
        prompt: "Explain why each government chose its approach, given its regime type.",
        criteria: [
          { id: "c1", description: "Explains the first country's choice in terms of regime type or conditions.", points: 1, signals: [["democra", "authoritarian", "legitima", "stability", "civil war", "biafra"]] },
          { id: "c2", description: "Explains the second country's choice in terms of regime type or conditions.", points: 1, minWords: 120 },
        ],
        modelAnswer:
          "Nigeria's history of coinciding cleavages and the Biafran civil war made inclusion essential to stability; as an electoral democracy, its leaders need cross-regional coalitions, so institutions that distribute power help maintain legitimacy. The UK, as a consolidated democracy facing peaceful demands for self-government, chose accommodation through devolution and power-sharing to reduce separatist pressure while preserving parliamentary sovereignty.",
      },
    ],
    scoringNotes: ["Practice rubric: 5 points — A (1), B (2), C (2)."],
  },
  {
    id: "comp-frq-arg-federalism",
    courseId: "compgov",
    type: "comp-argument-essay",
    title: "Federalism and Managing Diversity",
    unitIds: ["compgov-u1", "compgov-u3"],
    suggestedMinutes: 35,
    intro:
      "Develop an argument as to whether federal systems or unitary systems are more effective at maintaining political stability in countries with significant ethnic, religious, or regional diversity.\n\nUse one or more of the following course concepts in your response:\n• Legitimacy\n• Devolution\n• Cleavages\n\nIn your response, do the following:\n• Respond to the prompt with a defensible claim or thesis that establishes a line of reasoning.\n• Support your claim with at least TWO pieces of specific and relevant evidence from one or more course countries.\n• Use reasoning to explain why your evidence supports your claim.\n• Respond to an opposing or alternative perspective using refutation, concession, or rebuttal.",
    parts: [
      {
        label: "Essay",
        prompt: "Write your argument essay.",
        criteria: [
          { id: "claim", description: "Articulates a defensible claim that responds to the prompt and establishes a line of reasoning.", points: 1, signals: [["federal", "unitary"], ["because", "since", "more effective", "better"]] },
          { id: "evidence-1", description: "Provides specific and relevant evidence from a course country.", points: 1, signals: [["nigeria", "mexico", "russia", "uk", "united kingdom", "china", "iran"]] },
          { id: "evidence-2", description: "Provides a second piece of specific and relevant evidence that supports the claim.", points: 1, minWords: 180 },
          { id: "reasoning", description: "Explains why or how the evidence supports the claim.", points: 1, signals: [["this shows", "because", "as a result", "which", "therefore"]] },
          { id: "alternative", description: "Responds to an opposing or alternative perspective using refutation, concession, or rebuttal.", points: 1, signals: [["although", "however", "critics", "some argue", "while", "on the other hand"]] },
        ],
        modelAnswer:
          "Thesis: Federal systems are more effective at maintaining stability in diverse countries because they give regional and ethnic groups a real share of power, which strengthens the regime's legitimacy and reduces incentives for secession.\n\nNigeria shows how federalism can manage deep, coinciding cleavages. After the Biafran civil war, Nigeria expanded from a few large regions to 36 states, breaking up ethnic blocs and giving more groups control of state governments. Combined with the federal character principle and the presidential rule requiring 25% of the vote in two-thirds of states, federalism forces national leaders to build cross-regional coalitions. Despite serious challenges, Nigeria has avoided another civil war and achieved a peaceful transfer of power in 2015.\n\nThe United Kingdom offers supporting evidence even though it is formally unitary: stability improved when it adopted federal-like devolution. Creating the Scottish Parliament and the Northern Ireland Assembly — with power-sharing under the Good Friday Agreement — gave national groups self-government. Scotland's 2014 independence referendum was resolved peacefully, and violence in Northern Ireland declined. This shows that dividing power territorially, the core logic of federalism, builds legitimacy among minority nations.\n\nCritics point to Russia and argue that federalism can empower separatists, as in Chechnya, and that strong unitary states such as China maintain order more effectively. However, Russia's recentralization since 2000 hollowed out its federalism, and China's stability in Xinjiang relies on mass surveillance and repression rather than legitimacy — an approach that suppresses cleavages rather than managing them. Stability built on consent, as federal arrangements provide, is more durable than stability built on coercion.",
      },
    ],
    scoringNotes: ["Practice rubric: 5 points — claim (1), evidence (2), reasoning (1), alternative perspective (1)."],
  },
];
