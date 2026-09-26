import type { Lesson } from "../types";

export const compgovUnit2: Lesson[] = [
  {
    id: "comp-executive-systems",
    courseId: "compgov",
    unitId: "compgov-u2",
    title: "Parliamentary, Presidential & Semi-Presidential Systems",
    minutes: 17,
    tags: ["parliamentary system", "presidential system", "semi-presidential system", "fusion of powers", "separation of powers", "vote of no confidence", "prime minister", "president", "head of state", "head of government"],
    overview:
      "How the executive relates to the legislature defines the system. In parliamentary systems, the executive emerges from and depends on the legislature. In presidential systems, the president is separately elected with a fixed term. Semi-presidential systems combine an elected president with a prime minister accountable to the legislature.",
    keyConcepts: [
      { term: "Parliamentary system", definition: "The head of government (prime minister) is drawn from and accountable to the legislature; executive and legislative powers are fused." },
      { term: "Presidential system", definition: "The president is elected separately from the legislature and serves a fixed term; powers are separated." },
      { term: "Semi-presidential system", definition: "An elected president shares executive power with a prime minister who is accountable to the legislature." },
      { term: "Vote of no confidence", definition: "A legislative vote that can force a government in a parliamentary system to resign or call new elections." },
      { term: "Head of state", definition: "The symbolic representative of the country (e.g., the British monarch)." },
      { term: "Head of government", definition: "The leader responsible for running the government (e.g., the British prime minister)." },
    ],
    deepDive: [
      {
        heading: "The UK: parliamentary fusion",
        body: "In the **UK**, the prime minister is typically the leader of the party that commands a majority in the House of Commons. The cabinet is drawn from Parliament, so executive and legislative powers are **fused**. A government that loses a vote of confidence must resign or seek new elections. The monarch is head of state; the prime minister is head of government.",
      },
      {
        heading: "Mexico and Nigeria: presidential systems",
        body: "**Mexico's** president serves a single six-year term (the *sexenio*) with no reelection. **Nigeria's** president serves a four-year term, renewable once. In both, the president is both head of state and head of government, and the legislature cannot remove the president through a simple no-confidence vote — only through impeachment.",
      },
      {
        heading: "Russia: semi-presidential in form",
        body: "**Russia's** president is directly elected and appoints the prime minister with the State Duma's approval. The president dominates: he can dismiss the government, issue decrees, and direct foreign and security policy. **Iran** has an elected president who is head of government, but ultimate authority rests with the unelected Supreme Leader — a distinctive theocratic arrangement. **China's** top leaders are chosen within the Communist Party, and state offices are filled by party leaders.",
      },
    ],
    example: {
      heading: "A leadership change without an election",
      body: "In the UK, when a governing party replaces its leader, the new party leader becomes prime minister without a general election. It happened several times between 2019 and 2022, and again in July 2026, when Keir Starmer resigned and Andy Burnham — elected Labour leader unopposed after returning to the Commons through a by-election — was appointed prime minister. This is possible because the executive depends on the governing party's majority in Parliament, not on a separate national vote.",
    },
    examConnection: {
      body: "Comparative Analysis questions frequently ask how executive-legislative relations differ between two countries. Be precise about who is head of state, who is head of government, and how each can be removed.",
      tip: "Parliamentary → no-confidence vote. Presidential → fixed term, removal only by impeachment. Semi-presidential → president plus a PM accountable to the legislature.",
    },
    commonMistakes: [
      { mistake: "Saying British voters directly elect the prime minister.", correction: "Voters elect members of Parliament; the leader of the majority party becomes prime minister." },
      { mistake: "Classifying Russia as purely presidential.", correction: "Russia is semi-presidential in structure, though the president dominates in practice." },
      { mistake: "Treating Iran's president as the most powerful official.", correction: "Iran's Supreme Leader holds ultimate authority; the president is head of government." },
    ],
    relatedCountryIds: ["uk", "mexico", "nigeria", "russia", "iran", "china"],
  },
  {
    id: "comp-executives",
    courseId: "compgov",
    unitId: "compgov-u2",
    title: "Executives: Powers, Term Limits & Accountability",
    minutes: 16,
    tags: ["executive", "term limits", "Supreme Leader", "General Secretary", "decree", "impeachment", "sexenio", "Xi Jinping", "Putin", "2020 constitutional amendments"],
    overview:
      "Executives set agendas, direct bureaucracies, and command militaries. Term limits and removal procedures constrain them — but authoritarian leaders may change or evade those rules. Comparing term limits across the six countries is a reliable way to measure executive accountability.",
    keyConcepts: [
      { term: "Term limits", definition: "Constitutional or legal limits on how long an executive may serve." },
      { term: "Decree power", definition: "An executive's ability to issue orders with the force of law without legislative approval." },
      { term: "Supreme Leader (Iran)", definition: "The highest authority in Iran, chosen by the Assembly of Experts and serving without a fixed term." },
      { term: "General Secretary (China)", definition: "The top position in the Chinese Communist Party, the real center of power in China." },
      { term: "Impeachment/removal", definition: "Formal procedures by which legislatures can remove executives." },
    ],
    deepDive: [
      {
        heading: "Term limits as a test",
        body: "**Mexico's** single six-year term with no reelection is one of the strictest limits anywhere — a reaction to the Porfirio Díaz dictatorship. **Nigeria** limits the president to two four-year terms. The **UK** has no term limits for the prime minister, who serves as long as they retain their party's and Parliament's support. In **Russia**, 2020 constitutional amendments reset Vladimir Putin's term count, allowing him to seek additional six-year terms. In **China**, the 2018 removal of presidential term limits allowed Xi Jinping to remain president beyond two terms.",
      },
      {
        heading: "Power in practice",
        body: "Formal powers don't tell the whole story. China's president matters because the officeholder is also **General Secretary of the Communist Party** and chair of the Central Military Commission. Iran's **Supreme Leader** controls the armed forces, appoints the head of the judiciary, and appoints half of the Guardian Council. Russia's president issues decrees and controls the security services.",
      },
      {
        heading: "Checks on executives",
        body: "In democracies, legislatures, courts, elections, a free press, and parties constrain executives. In the UK, a prime minister can be ousted by their own party. In authoritarian systems, the most meaningful constraints may come from within the elite — such as factions within the Chinese Communist Party or the clerical establishment in Iran.",
      },
    ],
    example: {
      heading: "Succession in Iran and term rules in Russia",
      body: "In February 2026, Supreme Leader Ali Khamenei was killed in U.S.-Israeli strikes. In March, the Assembly of Experts — the body the constitution charges with choosing the Supreme Leader — selected his son, Mojtaba Khamenei. The episode shows the formal succession rule operating under wartime pressure, and it raised debate about hereditary succession in a regime founded by overthrowing a monarchy.\n\nIn Russia, 2020 constitutional amendments included a provision resetting the sitting president's term count. Authoritarian leaders can use legal procedures to extend their rule while maintaining a veneer of constitutionalism.",
    },
    examConnection: {
      body: "Questions often ask you to compare term limits or removal procedures in two course countries and explain what they reveal about executive power and regime type.",
      tip: "Use term limits as evidence: strict and respected limits suggest institutional constraints; limits removed or reset suggest personalization of power.",
    },
    commonMistakes: [
      { mistake: "Assuming China's president is powerful because of the office itself.", correction: "Power comes from the party positions — General Secretary and chair of the Central Military Commission." },
      { mistake: "Saying the UK prime minister has a fixed term.", correction: "UK prime ministers have no fixed term or term limit; they serve while they retain majority support." },
      { mistake: "Claiming Mexico's president can serve two terms.", correction: "Mexico's president serves a single six-year term with no reelection." },
    ],
    relatedCountryIds: ["mexico", "nigeria", "uk", "russia", "china", "iran"],
  },
  {
    id: "comp-legislatures",
    courseId: "compgov",
    unitId: "compgov-u2",
    title: "Legislatures: Structure, Functions & Independence",
    minutes: 16,
    tags: ["legislature", "bicameral", "unicameral", "House of Commons", "House of Lords", "State Duma", "Federation Council", "National People's Congress", "Majles", "Guardian Council", "Chamber of Deputies", "National Assembly", "rubber stamp"],
    overview:
      "Legislatures make laws, represent citizens, and oversee executives — at least in theory. Their real power varies enormously: the UK House of Commons can bring down a government, while China's National People's Congress largely approves decisions made by the Communist Party.",
    keyConcepts: [
      { term: "Bicameral legislature", definition: "A legislature with two chambers (UK, Mexico, Nigeria, Russia)." },
      { term: "Unicameral legislature", definition: "A legislature with one chamber (China's National People's Congress, Iran's Majles)." },
      { term: "House of Lords", definition: "The UK's unelected upper chamber, which can delay but not ultimately block most legislation." },
      { term: "National People's Congress (NPC)", definition: "China's legislature of roughly 3,000 indirectly elected deputies that meets annually; its Standing Committee acts between sessions." },
      { term: "Guardian Council", definition: "Iran's 12-member body that vets legislation for compatibility with Islamic law and the constitution and vets candidates." },
      { term: "Legislative independence", definition: "A legislature's ability to act autonomously from the executive." },
    ],
    deepDive: [
      {
        heading: "Powerful legislatures",
        body: "The UK **House of Commons** (650 members elected from single-member districts) is the center of political power: it chooses the government and can remove it. The **House of Lords** includes life peers, bishops, and a limited number of hereditary peers; it revises and delays legislation, but the Parliament Acts limit its ability to block bills passed by the Commons. **Mexico's** Congress has become more assertive since the end of PRI dominance, especially during periods of divided government.",
      },
      {
        heading: "Constrained legislatures",
        body: "**Russia's** Federal Assembly includes the State Duma and the Federation Council; it has generally supported the president's agenda, with the United Russia party holding large majorities. **China's NPC** formally has broad powers, including amending the constitution, but it meets briefly and rarely rejects party decisions. **Iran's Majles** debates and passes laws, but the **Guardian Council** can reject legislation, and the Supreme Leader's influence limits its independence.",
      },
      {
        heading: "Nigeria's National Assembly",
        body: "Nigeria's bicameral **National Assembly** has a Senate (three senators per state plus one for the Federal Capital Territory) and a House of Representatives. It has at times checked the president — for example, over budgets — though patronage and party loyalty shape its behavior.",
      },
    ],
    example: {
      heading: "The Lords push back",
      body: "When the House of Lords amends a government bill, the Commons can accept, reject, or modify the amendments. If the chambers disagree, the Parliament Acts ultimately allow the Commons to pass most legislation over the Lords' objections after a delay — illustrating a legislature with an elected chamber that dominates.",
    },
    examConnection: {
      body: "Expect questions comparing the independence of two legislatures, the structure of chambers, and how legislatures check executives. Rubber-stamp legislatures are a frequent contrast with the UK.",
      tip: "Measure independence by asking: Can it reject executive proposals? Can it remove the executive? Do opposition parties hold seats?",
    },
    commonMistakes: [
      { mistake: "Saying the House of Lords can veto legislation.", correction: "The Lords can delay most legislation, but the Commons ultimately prevails under the Parliament Acts." },
      { mistake: "Claiming China's NPC is directly elected nationally.", correction: "NPC deputies are indirectly elected by lower-level people's congresses." },
      { mistake: "Treating Iran's Majles as independent.", correction: "The Guardian Council can reject its legislation, and candidates are vetted." },
    ],
    relatedCountryIds: ["uk", "mexico", "nigeria", "russia", "china", "iran"],
  },
  {
    id: "comp-judiciaries",
    courseId: "compgov",
    unitId: "compgov-u2",
    title: "Judicial Systems & Judicial Independence",
    minutes: 15,
    tags: ["judiciary", "judicial independence", "judicial review", "UK Supreme Court", "parliamentary sovereignty", "Mexico judicial reform", "Constitutional Court", "sharia", "rule of law", "Human Rights Act"],
    overview:
      "Independent courts protect rights and enforce limits on government. The six countries range from the UK's independent but limited courts, to Mexico's recently overhauled judiciary, to courts in Russia, China, and Iran that ultimately serve the regime.",
    keyConcepts: [
      { term: "Judicial independence", definition: "The ability of courts to make decisions free from political pressure." },
      { term: "Judicial review", definition: "Courts' power to strike down laws or actions that violate a constitution." },
      { term: "Parliamentary sovereignty", definition: "The UK principle that Parliament is the supreme legal authority; courts cannot strike down acts of Parliament." },
      { term: "Declaration of incompatibility", definition: "A UK court's finding that a law conflicts with the Human Rights Act; Parliament decides whether to change the law." },
      { term: "Sharia", definition: "Islamic law, which forms the basis of Iran's legal system and applies in criminal matters in 12 northern Nigerian states." },
    ],
    deepDive: [
      {
        heading: "The UK: independent but limited",
        body: "The **UK Supreme Court**, created by the Constitutional Reform Act 2005 and opened in 2009, separated the top court from the House of Lords. Judges are highly independent, but because of **parliamentary sovereignty**, they cannot invalidate acts of Parliament. Under the Human Rights Act 1998, they can issue declarations of incompatibility, leaving the response to Parliament. Courts can rule that government actions are unlawful, as in rulings on Brexit-era prorogation.",
      },
      {
        heading: "Mexico and Nigeria: contested independence",
        body: "**Mexico's** Supreme Court gained power in the 1990s, including greater authority to review laws. A 2024 constitutional reform introduced **popular election of judges**, including Supreme Court justices, with the first judicial elections held in 2025. Supporters argued it would fight corruption; critics warned it would weaken judicial independence. **Nigeria's** courts exercise judicial review and have overturned some election results, but face concerns about corruption and political influence.",
      },
      {
        heading: "Authoritarian judiciaries",
        body: "**Russia's** Constitutional Court rarely rules against the Kremlin in politically sensitive cases. **China's** courts operate under Communist Party leadership and do not exercise judicial review over the party. **Iran's** judiciary is headed by an official appointed by the Supreme Leader and applies Islamic law; it has been used to prosecute dissidents.",
      },
    ],
    example: {
      heading: "A court checks the government",
      body: "In 2019, the UK Supreme Court ruled that the government's decision to prorogue (suspend) Parliament for five weeks was unlawful because it frustrated Parliament's ability to perform its constitutional functions. The ruling shows UK courts checking the executive even though they cannot strike down acts of Parliament.",
    },
    examConnection: {
      body: "Questions often ask you to compare judicial independence in two countries or explain how a reform affected independence. Mexico's judicial reform and the UK's lack of judicial review over statutes are rich examples.",
      tip: "Distinguish reviewing government actions (UK courts can) from striking down statutes (UK courts can't).",
    },
    commonMistakes: [
      { mistake: "Saying the UK Supreme Court can overturn acts of Parliament.", correction: "Because of parliamentary sovereignty, it cannot; it can issue declarations of incompatibility." },
      { mistake: "Assuming all courts in authoritarian regimes are powerless.", correction: "They may handle ordinary disputes independently while deferring on politically sensitive cases." },
      { mistake: "Describing Mexico's judiciary with pre-2024 rules only.", correction: "Mexico's 2024 reform introduced popular elections for judges — note this change in your answers." },
    ],
    relatedCountryIds: ["uk", "mexico", "nigeria", "russia", "china", "iran"],
  },
];
