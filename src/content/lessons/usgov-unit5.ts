import type { Lesson } from "../types";

export const usgovUnit5: Lesson[] = [
  {
    id: "usgov-voting-turnout",
    courseId: "usgov",
    unitId: "usgov-u5",
    title: "Voting Rights, Voting Models & Turnout",
    minutes: 17,
    tags: ["voting rights", "15th Amendment", "17th Amendment", "19th Amendment", "24th Amendment", "26th Amendment", "voter turnout", "rational choice voting", "retrospective voting", "prospective voting", "party-line voting", "political efficacy"],
    overview:
      "Constitutional amendments and federal laws have expanded who can vote. Still, many eligible Americans don't vote. Turnout depends on structural factors (registration rules, election timing), political factors (competitiveness, efficacy), and demographic factors (age, education, income).",
    keyConcepts: [
      { term: "15th Amendment (1870)", definition: "Prohibits denying the vote based on race." },
      { term: "19th Amendment (1920)", definition: "Prohibits denying the vote based on sex." },
      { term: "24th Amendment (1964)", definition: "Bans poll taxes in federal elections." },
      { term: "26th Amendment (1971)", definition: "Lowers the voting age to 18." },
      { term: "Rational choice voting", definition: "Voting based on what a person believes is in their own interest." },
      { term: "Retrospective voting", definition: "Voting based on a candidate's or party's past performance." },
      { term: "Prospective voting", definition: "Voting based on predictions of how a candidate or party will perform in the future." },
      { term: "Political efficacy", definition: "A citizen's belief that they can understand and influence politics." },
    ],
    deepDive: [
      {
        heading: "Expanding the electorate",
        body: "The Constitution originally left voting qualifications to the states, and many states limited voting to white men with property. The **15th, 19th, 24th, and 26th Amendments** — along with the **Voting Rights Act of 1965** — progressively expanded access. The 17th Amendment also expanded democratic participation by providing for direct election of senators.",
      },
      {
        heading: "Why people vote — or don't",
        body: "Turnout is higher among older, more educated, and higher-income citizens. It is higher in **presidential** elections than in **midterms**, and higher in competitive races. **Structural barriers** such as registration deadlines, voter ID requirements, and weekday elections can reduce turnout; reforms such as same-day registration, early voting, and mail voting can increase it. People with high **political efficacy** are more likely to vote.",
      },
      {
        heading: "How people decide",
        body: "Voters may choose based on **party identification** (the strongest predictor for most), **rational choice** (self-interest), **retrospective** judgments (\"Am I better off than four years ago?\"), or **prospective** expectations. Candidate characteristics and campaign messages also matter, especially for voters with weaker party ties.",
      },
    ],
    example: {
      heading: "A retrospective vote",
      body: "A voter who lost her job during an economic downturn votes against the incumbent president's party, reasoning that the administration failed to manage the economy. She is judging past performance — retrospective voting.",
    },
    examConnection: {
      body: "Quantitative Analysis FRQs often show turnout data by age, education, or election type. Be ready to identify a trend, draw a conclusion, and explain how a structural factor or policy change affects turnout.",
      tip: "Midterms < presidential elections. Older > younger. More education/income → higher turnout. These patterns are very reliable exam anchors.",
    },
    commonMistakes: [
      { mistake: "Saying the Constitution originally guaranteed a right to vote.", correction: "The original Constitution left voting qualifications largely to the states." },
      { mistake: "Confusing retrospective and prospective voting.", correction: "Retrospective looks back at performance; prospective looks ahead to promises." },
      { mistake: "Attributing the 18-year-old vote to the 24th Amendment.", correction: "The 26th Amendment lowered the voting age; the 24th banned poll taxes in federal elections." },
    ],
  },
  {
    id: "usgov-political-parties",
    courseId: "usgov",
    unitId: "usgov-u5",
    title: "Political Parties: Functions, Realignment & Third Parties",
    minutes: 17,
    tags: ["political parties", "party functions", "realignment", "critical election", "dealignment", "third parties", "two-party system", "winner-take-all", "single-member district", "candidate-centered campaigns"],
    overview:
      "Parties link citizens to government by recruiting candidates, mobilizing voters, and organizing government. The U.S. two-party system is reinforced by winner-take-all, single-member district elections, which make it hard for third parties to win — though they can shape debates.",
    keyConcepts: [
      { term: "Party functions", definition: "Mobilizing and educating voters, recruiting candidates, creating platforms, and coordinating policymaking." },
      { term: "Realignment", definition: "A durable shift in party coalitions, often marked by a critical election." },
      { term: "Critical election", definition: "An election that signals a lasting change in party coalitions, such as 1932." },
      { term: "Dealignment", definition: "A decline in party loyalty, reflected in more independent voters and ticket-splitting." },
      { term: "Single-member district, winner-take-all", definition: "Electoral rules in which one candidate wins each district with a plurality, discouraging third parties." },
      { term: "Candidate-centered campaigns", definition: "Campaigns run primarily by candidates and their organizations rather than party organizations." },
    ],
    deepDive: [
      {
        heading: "Why two parties?",
        body: "In **single-member, winner-take-all** districts, finishing second earns nothing, so voters and donors gravitate to the two major parties. Most states also award electoral votes winner-take-all. Third parties struggle with ballot access, debate thresholds, and fundraising. Still, they can raise issues that major parties later adopt, and they can act as spoilers.",
      },
      {
        heading: "Change over time",
        body: "Party coalitions shift in response to issues and events. The **1932** election built the New Deal coalition. Over later decades, Southern white voters moved toward the Republican Party after the civil rights era, part of a broad regional realignment. Parties adapt by changing their positions and outreach to new voter groups.",
      },
      {
        heading: "Parties in a candidate-centered era",
        body: "Primaries, social media, and outside spending allow candidates to build their own followings and raise money independent of party leaders. Parties remain important — they provide data, voter lists, and fundraising infrastructure — but they have less control over nominations than in the era of party bosses.",
      },
    ],
    example: {
      heading: "A third party shapes the debate",
      body: "Suppose a third-party presidential candidate draws significant support by campaigning on reducing the federal deficit. The candidate wins no electoral votes, but both major parties adopt deficit reduction as a priority in the next cycle. The third party changed the agenda without winning office.",
    },
    examConnection: {
      body: "Questions often ask why third parties rarely win, how rules sustain the two-party system, and how parties have adapted to candidate-centered campaigns. Comparative reasoning — contrasting SMD systems with proportional representation — can strengthen explanations.",
      tip: "Winner-take-all + single-member districts = two-party dominance. Mention both the rule and the incentive it creates.",
    },
    commonMistakes: [
      { mistake: "Saying the Constitution creates the two-party system.", correction: "The Constitution doesn't mention parties; electoral rules and history sustain the two-party system." },
      { mistake: "Confusing realignment with dealignment.", correction: "Realignment is a durable shift in coalitions; dealignment is a weakening of party loyalty overall." },
      { mistake: "Claiming third parties have no influence.", correction: "Third parties can shape issues and election outcomes even when they don't win." },
    ],
  },
  {
    id: "usgov-interest-groups",
    courseId: "usgov",
    unitId: "usgov-u5",
    title: "Interest Groups & Social Movements",
    minutes: 16,
    tags: ["interest groups", "lobbying", "free rider problem", "amicus curiae", "grassroots", "iron triangle", "social movements", "single-issue groups", "pluralism"],
    overview:
      "Interest groups organize people with shared goals to influence policy. They lobby, educate, litigate, mobilize members, and fund campaigns. Their influence varies with resources, size, and cohesion — and they face the free-rider problem.",
    keyConcepts: [
      { term: "Lobbying", definition: "Contacting officials to persuade them to support a group's position." },
      { term: "Free-rider problem", definition: "People can benefit from a group's success without contributing, making it harder to organize large, diffuse groups." },
      { term: "Amicus curiae brief", definition: "A \"friend of the court\" brief filed by a group that is not a party to a case, to influence a court's decision." },
      { term: "Grassroots mobilization", definition: "Encouraging members and the public to contact officials, attend events, or vote." },
      { term: "Single-issue group", definition: "A group focused on one issue, often highly motivated and influential in primaries." },
    ],
    deepDive: [
      {
        heading: "How groups influence policy",
        body: "Groups **lobby** legislators and agencies, provide **expertise** during rulemaking, **litigate** or file amicus briefs, **mobilize** members, and **support candidates** through PACs. They also connect to iron triangles, where long-term relationships with committees and agencies give them sustained access.",
      },
      {
        heading: "Why some groups are stronger",
        body: "Small groups with concentrated interests often organize more easily than large groups with diffuse interests. Individual members of a large group may assume someone else will do the work — the **free-rider problem**. Groups overcome it by offering selective benefits (discounts, publications, insurance) available only to members.",
      },
      {
        heading: "Social movements",
        body: "Social movements — the civil rights movement, the women's suffrage movement, and more recent movements — combine protest, organizing, and public persuasion. They can shift public opinion, change party platforms, and lead to legislation and court rulings.",
      },
    ],
    example: {
      heading: "Many paths to influence",
      body: "An environmental group lobbies Congress on a climate bill, submits comments on a proposed EPA rule, files an amicus brief in a related court case, and runs a campaign encouraging members to call their senators. Using multiple access points reflects the pluralist model.",
    },
    examConnection: {
      body: "Concept Application questions frequently ask how an interest group would try to influence a specific branch. Be precise: lobbying Congress, commenting on agency rules, filing amicus briefs in court.",
      tip: "Match the tactic to the branch: Congress → lobbying and campaign support; bureaucracy → rulemaking comments and iron triangles; courts → litigation and amicus briefs.",
    },
    commonMistakes: [
      { mistake: "Saying interest groups nominate candidates.", correction: "Parties nominate candidates; interest groups try to influence policy and elections." },
      { mistake: "Claiming larger groups are always more powerful.", correction: "Large groups face the free-rider problem; smaller, cohesive groups can be highly influential." },
      { mistake: "Forgetting the courts as a target.", correction: "Groups often use litigation and amicus briefs to influence judicial decisions." },
    ],
  },
  {
    id: "usgov-elections",
    courseId: "usgov",
    unitId: "usgov-u5",
    title: "Elections: Nominations, the Electoral College & Congressional Races",
    minutes: 17,
    tags: ["elections", "primaries", "caucuses", "open primary", "closed primary", "national convention", "Electoral College", "incumbency advantage", "midterm elections", "front-loading"],
    overview:
      "Candidates first compete for their party's nomination through primaries and caucuses, then face the general electorate. Presidential elections run through the Electoral College; congressional elections are shaped by incumbency advantage and district lines.",
    keyConcepts: [
      { term: "Open primary", definition: "A primary in which voters may participate regardless of party registration." },
      { term: "Closed primary", definition: "A primary limited to voters registered with that party." },
      { term: "Caucus", definition: "A meeting of party members to discuss and choose delegates for candidates." },
      { term: "Front-loading", definition: "States moving primaries earlier in the calendar to increase their influence." },
      { term: "Electoral College", definition: "The body of electors (538) that formally chooses the president; a majority of 270 is needed to win." },
      { term: "Incumbency advantage", definition: "Incumbents' electoral edge from name recognition, fundraising, casework, and favorable districts." },
    ],
    deepDive: [
      {
        heading: "Winning the nomination",
        body: "Presidential candidates compete in state primaries and caucuses to win delegates, who formally nominate the candidate at the national convention. Early contests attract outsized attention, and **front-loading** compresses the calendar. Primary electorates tend to be more ideological than general electorates, pushing candidates toward their party's base.",
      },
      {
        heading: "The Electoral College",
        body: "Each state's electors equal its House seats plus two senators; the District of Columbia has three under the 23rd Amendment. Nearly all states award electors winner-take-all (Maine and Nebraska use a district method). Candidates focus on **swing states**, and it is possible to win the presidency while losing the national popular vote. Supporters argue it protects federalism and smaller states; critics argue it violates political equality and concentrates campaigns in a few states.",
      },
      {
        heading: "Congressional elections",
        body: "Incumbents win the vast majority of House races. Advantages include name recognition, the franking privilege, casework for constituents, fundraising networks, and districts drawn to be safe. The president's party typically loses seats in midterm elections.",
      },
    ],
    example: {
      heading: "A campaign's map",
      body: "A presidential campaign spends heavily in a handful of closely divided states and barely campaigns in large states it is sure to win or lose. Under winner-take-all, extra votes in safe states don't add electors — the strategy follows the incentives.",
    },
    examConnection: {
      body: "Expect questions on primaries versus general elections, the Electoral College's effects on campaign strategy, and incumbency advantage. Data questions may show reelection rates or midterm seat changes.",
      tip: "When asked why candidates focus on certain states, name winner-take-all allocation and swing-state competitiveness together.",
    },
    commonMistakes: [
      { mistake: "Saying the national popular vote elects the president.", correction: "The Electoral College elects the president; a candidate needs 270 electoral votes." },
      { mistake: "Confusing open and closed primaries.", correction: "Open primaries allow any registered voter; closed primaries limit participation to party members." },
      { mistake: "Believing incumbency advantage is the same in both chambers.", correction: "House incumbents are generally safer than Senate incumbents, who face statewide, often more competitive, electorates." },
    ],
  },
  {
    id: "usgov-campaign-finance",
    courseId: "usgov",
    unitId: "usgov-u5",
    title: "Campaign Finance: PACs, Super PACs & Citizens United",
    minutes: 16,
    tags: ["campaign finance", "FECA", "Federal Election Commission", "BCRA", "McCain-Feingold", "Citizens United v. FEC", "PAC", "super PAC", "hard money", "soft money", "independent expenditures", "Buckley v. Valeo"],
    overview:
      "Campaign finance law tries to balance free speech against the risk of corruption. Congress has regulated contributions, but the Supreme Court has treated campaign spending as protected speech. Citizens United v. FEC (2010) allowed unlimited independent expenditures by corporations and unions, fueling the rise of super PACs.",
    keyConcepts: [
      { term: "Federal Election Commission (FEC)", definition: "The independent agency that administers and enforces federal campaign finance law." },
      { term: "Hard money", definition: "Contributions given directly to candidates, subject to limits and disclosure." },
      { term: "Soft money", definition: "Money raised by parties for general activities; largely banned for national parties by BCRA (2002)." },
      { term: "PAC (political action committee)", definition: "An organization that raises and contributes money to candidates, subject to contribution limits." },
      { term: "Super PAC", definition: "An independent-expenditure-only committee that can raise and spend unlimited amounts but cannot coordinate with candidates." },
      { term: "Independent expenditure", definition: "Spending on communications that support or oppose a candidate without coordination with the campaign." },
    ],
    deepDive: [
      {
        heading: "Regulating money",
        body: "After Watergate, amendments to the **Federal Election Campaign Act** set contribution limits and created the FEC. In **Buckley v. Valeo (1976)**, the Court upheld contribution limits but struck down limits on independent and candidate expenditures, treating spending as a form of speech. The **Bipartisan Campaign Reform Act (2002)** banned national parties from raising soft money and restricted certain issue ads close to elections.",
      },
      {
        heading: "Citizens United",
        body: "Citizens United, a nonprofit, sought to air a film critical of a presidential candidate close to a primary. In **Citizens United v. FEC (2010)**, the Court ruled 5–4 that political spending is protected speech and that the government may not ban independent political expenditures by corporations and unions. Soon after, a lower court applied that reasoning to allow **super PACs** to accept unlimited contributions for independent spending.",
      },
      {
        heading: "The debate",
        body: "Supporters of the ruling emphasize free speech and argue more spending means more political information. Critics argue unlimited spending gives wealthy interests outsized influence and creates at least the appearance of corruption. The central tension is between the **First Amendment** and **political equality**.",
      },
    ],
    example: {
      heading: "A super PAC ad",
      body: "A super PAC runs television ads attacking a Senate candidate. The PAC can raise unlimited sums from individuals and corporations, but it may not coordinate with the opposing candidate's campaign. Donors to some related nonprofit organizations may not be publicly disclosed.",
    },
    examConnection: {
      body: "Citizens United is required and a common SCOTUS Comparison anchor. Know the facts, the holding, and the First Amendment reasoning, and be able to explain the free-speech-versus-corruption debate.",
      tip: "Contribution to a candidate → limited. Independent spending → unlimited after Citizens United. Coordination is the dividing line.",
    },
    commonMistakes: [
      { mistake: "Saying Citizens United allowed unlimited direct contributions to candidates.", correction: "Direct contributions to candidates remain limited; the ruling concerned independent expenditures." },
      { mistake: "Confusing PACs with super PACs.", correction: "PACs can give limited contributions to candidates; super PACs can't give to candidates but can spend unlimited amounts independently." },
      { mistake: "Treating Citizens United as a Fourteenth Amendment case.", correction: "It is a First Amendment free speech case." },
    ],
    relatedCaseIds: ["citizens-united-v-fec", "buckley-v-valeo"],
  },
  {
    id: "usgov-media",
    courseId: "usgov",
    unitId: "usgov-u5",
    title: "The Media, Technology & Political Participation",
    minutes: 15,
    tags: ["media", "gatekeeper", "scorekeeper", "watchdog", "horse race journalism", "agenda setting", "social media", "partisan news", "polarization", "misinformation", "political participation"],
    overview:
      "The media shapes what citizens know and how they think about politics. Traditional roles — gatekeeper, scorekeeper, watchdog — persist, but social media and partisan outlets have fragmented the information environment, increased polarization, and changed how campaigns reach voters.",
    keyConcepts: [
      { term: "Gatekeeper", definition: "Media influence over which issues and events receive attention." },
      { term: "Scorekeeper", definition: "Media tracking of political wins and losses, such as polls and campaign standings." },
      { term: "Watchdog", definition: "Media investigation of officials' conduct to hold them accountable." },
      { term: "Horse-race journalism", definition: "Coverage focused on who is winning or losing rather than on policy substance." },
      { term: "Agenda setting", definition: "The media's ability to influence which issues the public considers important." },
    ],
    deepDive: [
      {
        heading: "Traditional roles",
        body: "As **gatekeeper**, the media decides what's newsworthy. As **scorekeeper**, it reports poll numbers and fundraising totals, sometimes emphasizing the horse race over policy. As **watchdog**, investigative reporting — from Watergate onward — exposes misconduct and prompts investigations.",
      },
      {
        heading: "A changing landscape",
        body: "Cable news, podcasts, and social media allow people to choose sources that match their views. Algorithms and **selective exposure** can create echo chambers. Candidates use social media to communicate directly with supporters, bypassing traditional gatekeepers, and to raise small-dollar donations.",
      },
      {
        heading: "Effects on democracy",
        body: "Supporters argue digital media broadens participation and lowers barriers to organizing. Critics point to misinformation, polarization, and declining trust in news. The credibility of media sources is itself a political issue, with trust varying sharply by party.",
      },
    ],
    example: {
      heading: "Viral mobilization",
      body: "A short video about a proposed state law spreads quickly on social media. Within days, thousands of residents contact legislators, and the bill is amended. The same tools that enabled this mobilization can also spread misleading claims just as quickly.",
    },
    examConnection: {
      body: "Questions often ask how the media's roles affect elections and policy, and how changes in media consumption affect polarization and participation. Data questions may show trust in media by party or news sources by age.",
      tip: "Name the role (gatekeeper, scorekeeper, watchdog) and explain its effect in the specific scenario.",
    },
    commonMistakes: [
      { mistake: "Saying the media's main role is to report election results.", correction: "The media plays several roles, including gatekeeper, scorekeeper, and watchdog." },
      { mistake: "Assuming more media options produce a better-informed public.", correction: "More choice can lead to selective exposure and polarization." },
      { mistake: "Treating horse-race coverage as policy coverage.", correction: "Horse-race journalism focuses on who is ahead, often at the expense of policy substance." },
    ],
  },
];
