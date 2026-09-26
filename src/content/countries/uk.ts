import type { Country } from "../types";

export const uk: Country = {
  id: "uk",
  name: "United Kingdom",
  officialName: "United Kingdom of Great Britain and Northern Ireland",
  code: "GB",
  regimeLabel: "Parliamentary democracy · Constitutional monarchy",
  summary:
    "The UK is a long-established democracy with an uncodified constitution, parliamentary sovereignty, and a fusion of executive and legislative power. It is a unitary state that has devolved significant power to Scotland, Wales, and Northern Ireland.",
  lastUpdated: "2026-09-23",
  keyFacts: [
    { label: "Head of state", value: "King Charles III (since 2022)", timeSensitive: true },
    { label: "Head of government", value: "Prime Minister Andy Burnham, Labour (since July 2026)", timeSensitive: true },
    { label: "Constitution", value: "Uncodified — statutes, common law, conventions, and authoritative works" },
    { label: "Legislature", value: "Parliament: House of Commons (650, elected) and House of Lords (appointed)" },
    { label: "Territorial structure", value: "Unitary, with devolved governments in Scotland, Wales, and Northern Ireland" },
    { label: "Capital", value: "London" },
  ],
  sections: [
    {
      key: "structure",
      title: "Government Structure",
      body:
        "The UK is a constitutional monarchy with a parliamentary system. Its constitution is uncodified: it rests on major statutes (such as the Parliament Acts and the Human Rights Act 1998), common law, and conventions. The core principle is parliamentary sovereignty — Parliament can make or unmake any law, and no court can overturn an act of Parliament. Executive and legislative powers are fused: the government is formed by the party (or coalition) that commands a majority in the House of Commons.",
      bullets: [
        "Unitary state; devolution since 1998 created the Scottish Parliament, the Welsh Senedd, and the Northern Ireland Assembly.",
        "Parliament could in principle alter devolved powers, but doing so without consent would be politically difficult.",
        "The UK left the European Union on January 31, 2020, after the 2016 Brexit referendum.",
      ],
    },
    {
      key: "executive",
      title: "Executive",
      body:
        "The monarch is head of state with a largely ceremonial role. The prime minister, head of government, is the leader of the majority party in the Commons and is formally appointed by the monarch. The prime minister chooses cabinet ministers, who are drawn from Parliament and share collective responsibility. There are no term limits; a prime minister serves as long as they keep the confidence of their party and the Commons.",
      bullets: [
        "Leadership can change without a general election: Andy Burnham became prime minister in July 2026 after Keir Starmer resigned and Labour chose a new leader.",
        "A government that loses a vote of no confidence must resign or seek a new election.",
        "The Dissolution and Calling of Parliament Act 2022 restored the prime minister's ability to request an early election (a Parliament may last at most five years).",
      ],
    },
    {
      key: "legislature",
      title: "Legislature",
      body:
        "Parliament is bicameral. The House of Commons has 650 members elected from single-member districts (constituencies) and is the dominant chamber: it chooses and can remove the government, controls taxation, and passes legislation. The House of Lords is unelected — composed mainly of life peers, along with bishops and a limited number of hereditary peers. It revises and can delay legislation, but under the Parliament Acts the Commons ultimately prevails on most bills.",
      bullets: [
        "Opposition parties question the prime minister weekly at Prime Minister's Questions.",
        "Backbenchers can rebel against party leadership, though party discipline is generally strong.",
        "Reform of the Lords — including removing remaining hereditary peers — has been a recurring political issue.",
      ],
    },
    {
      key: "judiciary",
      title: "Judiciary",
      body:
        "The UK Supreme Court, created by the Constitutional Reform Act 2005 and opened in 2009, is the highest court for most matters. Judges are highly independent, but because of parliamentary sovereignty they cannot strike down acts of Parliament. Under the Human Rights Act 1998, courts can issue declarations of incompatibility, leaving it to Parliament to respond. Courts can rule that government actions are unlawful — as in the 2019 ruling that the prorogation of Parliament was unlawful.",
    },
    {
      key: "parties",
      title: "Political Parties",
      body:
        "Two parties — Conservatives and Labour — have dominated government since the 1920s, but the party system has grown more fragmented. The Liberal Democrats, the Scottish National Party (SNP), Reform UK, the Greens, Plaid Cymru, and Northern Irish parties (such as Sinn Féin and the DUP) all win seats. The 2024 general election produced a large Labour majority on roughly a third of the vote, while Reform UK won about 14% of the vote but only a handful of seats.",
    },
    {
      key: "electoral",
      title: "Electoral System",
      body:
        "Commons elections use single-member district plurality (first past the post). This tends to produce single-party majority governments and disproportional results that reward geographically concentrated support. Devolved legislatures use more proportional systems (for example, mixed-member systems in Scotland), and referendums are used for major constitutional questions such as the 2014 Scottish independence and 2016 EU referendums.",
    },
    {
      key: "participation",
      title: "Political Participation",
      body:
        "Participation is voluntary and open: citizens vote, join parties and interest groups, sign petitions, and protest freely. Turnout in general elections has varied, and turnout in 2024 was lower than in 2019. Referendums have become a notable form of direct participation on constitutional issues.",
    },
    {
      key: "culture",
      title: "Political Culture",
      body:
        "British political culture emphasizes tradition, gradualism, pragmatism, and respect for institutions such as Parliament and the monarchy. Important cleavages include class (historically the main basis of party competition), national identity (England, Scotland, Wales, Northern Ireland), region, age, education, and ethnicity. Brexit revealed divisions between younger and older voters, urban and rural areas, and graduates and non-graduates.",
    },
    {
      key: "economy",
      title: "Economy",
      body:
        "The UK has a market economy with a large services sector, especially finance. After World War II, it built a welfare state, including the National Health Service (1948). In the 1980s, Margaret Thatcher's governments privatized state-owned industries and reduced union power — a signature example of neoliberal reform. Brexit changed the UK's trade relationship with the EU.",
    },
    {
      key: "civil-society",
      title: "Civil Society",
      body:
        "The UK has a robust, pluralist civil society. Business (the Confederation of British Industry), labor (the Trades Union Congress), charities, and advocacy groups compete to influence policy. The media is free and diverse, including the publicly funded but editorially independent BBC.",
    },
  ],
  currentIssues: [
    {
      title: "Change of prime minister without an election",
      body:
        "Keir Starmer led Labour to a landslide in July 2024, but his approval ratings fell. Andy Burnham won the Makerfield by-election in June 2026, was elected Labour leader unopposed on July 17, 2026, and became prime minister on July 20 — a clear example of executive change in a parliamentary system.",
    },
    {
      title: "Party fragmentation",
      body:
        "Support for parties beyond Labour and the Conservatives — especially Reform UK, the Liberal Democrats, and the Greens — has raised questions about how first past the post translates votes into seats.",
    },
    {
      title: "Devolution and the Union",
      body: "Debates continue over Scottish independence, the Northern Ireland protocol arrangements after Brexit, and the balance of power between Westminster and devolved governments.",
    },
  ],
  compare: {
    regime: { tag: "Liberal democracy", text: "Consolidated democracy with free and fair elections, strong civil liberties, and rule of law." },
    system: { tag: "Parliamentary", text: "Executive and legislative powers fused; government depends on the confidence of the House of Commons." },
    executive: { tag: "Dual executive", text: "Monarch (head of state) and prime minister (head of government). No PM term limits." },
    legislature: { tag: "Bicameral", text: "Elected House of Commons (dominant) and appointed House of Lords (revising chamber)." },
    electoral: { tag: "SMD plurality", text: "First past the post in 650 single-member constituencies." },
    parties: { tag: "Competitive multiparty", text: "Labour and Conservatives dominate government; several other parties win votes and seats." },
    judiciary: { tag: "Independent", text: "Independent Supreme Court, but no power to strike down acts of Parliament (parliamentary sovereignty)." },
    liberties: { tag: "Protected", text: "Strong protections for speech, press, and assembly; Human Rights Act 1998." },
    participation: { tag: "Open", text: "Voluntary participation through elections, parties, groups, petitions, and protest." },
    economy: { tag: "Market", text: "Market economy with a large services sector; privatization in the 1980s; NHS provides public health care." },
    territorial: { tag: "Unitary", text: "Unitary state with devolved governments in Scotland, Wales, and Northern Ireland." },
  },
};
