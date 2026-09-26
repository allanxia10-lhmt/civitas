import type { Lesson } from "../types";

export const usgovUnit2: Lesson[] = [
  {
    id: "usgov-congress-structure",
    courseId: "usgov",
    unitId: "usgov-u2",
    title: "Congress: Structure, Powers & Representation",
    minutes: 16,
    tags: ["Congress", "House of Representatives", "Senate", "bicameral", "enumerated powers", "Necessary and Proper Clause", "power of the purse", "trustee", "delegate", "politico"],
    overview:
      "Congress is a bicameral legislature designed to represent both people and states. The House and Senate differ in size, term length, constituency, and unique powers — differences that shape how each chamber behaves and how members balance national and local interests.",
    keyConcepts: [
      { term: "Bicameralism", definition: "A legislature with two chambers; in the U.S., the House (435 voting members, two-year terms) and Senate (100 members, six-year staggered terms)." },
      { term: "Power of the purse", definition: "Congress's authority over taxing and spending; revenue bills must originate in the House." },
      { term: "Unique House powers", definition: "Initiating revenue bills, impeaching officials, and choosing the president if no candidate wins an Electoral College majority." },
      { term: "Unique Senate powers", definition: "Confirming presidential appointments, ratifying treaties (two-thirds vote), and trying impeachments." },
      { term: "Trustee model", definition: "Representatives use their own judgment about the public good." },
      { term: "Delegate model", definition: "Representatives vote as their constituents want." },
      { term: "Politico model", definition: "Representatives act as delegates or trustees depending on the issue and political circumstances." },
    ],
    deepDive: [
      {
        heading: "Two chambers, two logics",
        body: "The House was designed to be closer to the people: members serve **two-year terms**, and seats are apportioned by population after each census. The Senate was designed to be more deliberative: **six-year staggered terms**, two senators per state, and — before the **Seventeenth Amendment (1913)** — selection by state legislatures.\n\nBecause the House is larger, it relies on strict rules and a powerful **Rules Committee** to manage debate. The smaller Senate operates with more individual latitude, including unlimited debate unless cloture is invoked.",
      },
      {
        heading: "Enumerated and implied powers",
        body: "Article I, Section 8 lists Congress's powers, including taxing and spending, borrowing, regulating interstate commerce, declaring war, and raising armies. The final clause — the **Necessary and Proper (Elastic) Clause** — lets Congress make laws needed to carry out those powers. McCulloch v. Maryland (1819) confirmed that this clause supports implied powers.",
      },
      {
        heading: "Representing constituents",
        body: "Members balance national concerns with constituent demands. A member who votes for a policy their district opposes because they believe it serves the national interest is acting as a **trustee**; one who votes the district's preference is acting as a **delegate**. Most members behave as **politicos**, shifting roles depending on the salience of the issue and their electoral security.",
      },
    ],
    example: {
      heading: "A treaty and a trade deal",
      body: "A president negotiates a treaty and sends it to the Senate. Two-thirds of senators must approve it. To avoid that hurdle, presidents sometimes use executive agreements, which do not require Senate ratification — a workaround that illustrates how the Senate's unique power shapes presidential strategy.",
    },
    examConnection: {
      body: "Expect questions comparing House and Senate powers and rules. Concept Application prompts often describe a member's voting decision and ask which model of representation it reflects.",
      tip: "Memorize the unique powers in two short lists: House — revenue, impeachment. Senate — confirmations, treaties, impeachment trials.",
    },
    commonMistakes: [
      { mistake: "Saying all bills must start in the House.", correction: "Only revenue (tax) bills must originate in the House. Other bills can start in either chamber." },
      { mistake: "Confusing apportionment with redistricting.", correction: "Apportionment allocates House seats among states after the census; redistricting draws district lines within a state." },
      { mistake: "Thinking senators have always been directly elected.", correction: "Direct election of senators began with the Seventeenth Amendment in 1913." },
    ],
    relatedCaseIds: ["mcculloch-v-maryland", "baker-v-carr"],
  },
  {
    id: "usgov-lawmaking",
    courseId: "usgov",
    unitId: "usgov-u2",
    title: "Lawmaking, Committees & Congressional Behavior",
    minutes: 18,
    tags: ["committees", "Rules Committee", "filibuster", "cloture", "discharge petition", "logrolling", "pork barrel", "gerrymandering", "divided government", "gridlock", "polarization", "Speaker of the House"],
    overview:
      "Most bills die in committee. Those that survive face chamber-specific hurdles — the House Rules Committee, the Senate filibuster — before both chambers must pass identical versions. Partisanship, divided government, and redistricting shape whether anything passes at all.",
    keyConcepts: [
      { term: "Standing committee", definition: "A permanent committee with jurisdiction over a policy area, such as Ways and Means or Armed Services." },
      { term: "Conference committee", definition: "A temporary joint committee that reconciles different House and Senate versions of a bill." },
      { term: "Rules Committee", definition: "House committee that sets the terms of debate and amendment for most bills." },
      { term: "Filibuster", definition: "A Senate tactic of extended debate to delay or block a vote." },
      { term: "Cloture", definition: "A Senate vote (normally three-fifths, or 60 senators) to end debate on most legislation." },
      { term: "Discharge petition", definition: "A House procedure that forces a bill out of committee with the signatures of a majority (218) of members." },
      { term: "Logrolling", definition: "Vote trading: members agree to support each other's priorities." },
      { term: "Pork barrel spending", definition: "Spending on projects that benefit a specific district, often through earmarks." },
    ],
    deepDive: [
      {
        heading: "How a bill moves",
        body: "A bill is introduced and referred to committee, where most bills never receive a hearing. Committees can amend (mark up) a bill and vote to report it. In the House, the **Rules Committee** decides whether amendments are allowed (open vs. closed rules) and how long debate lasts — giving the majority party and the **Speaker** significant agenda control. In the Senate, a bill can be delayed by a **filibuster** unless 60 senators vote for cloture. After both chambers pass identical text, the bill goes to the president.",
      },
      {
        heading: "Budgeting and spending",
        body: "Congress passes appropriations bills that fund discretionary programs. **Mandatory spending** — such as Social Security and Medicare — is set by existing law and makes up the majority of federal spending, which limits how much Congress can change through annual appropriations. Disagreements over the budget can produce government shutdowns when appropriations lapse.",
      },
      {
        heading: "Polarization, divided government, and gridlock",
        body: "Ideological distance between the parties has grown, and moderates are fewer. When different parties control Congress and the presidency (**divided government**), confirmation fights, vetoes, and investigations increase. **Gerrymandering** — drawing district lines for partisan advantage — can create safe seats whose members worry more about primary challengers than general-election voters, reinforcing polarization. Baker v. Carr (1962) and Shaw v. Reno (1993) are the key redistricting cases.",
      },
    ],
    example: {
      heading: "Using a discharge petition",
      body: "Suppose the majority leadership refuses to bring a popular bill to the floor. If a majority of House members — including some from the majority party — sign a discharge petition, they can force a floor vote. The rarity of successful petitions shows how much agenda power leadership holds.",
    },
    examConnection: {
      body: "Questions often ask how chamber rules affect policymaking, why a bill with majority support might still fail, or how divided government affects confirmations and legislation. Quantitative Analysis prompts sometimes show data on polarization or bills passed.",
      tip: "If a question asks why a bill with majority Senate support failed, think filibuster and cloture. If it asks about the House, think Rules Committee and Speaker.",
    },
    commonMistakes: [
      { mistake: "Saying the filibuster exists in both chambers.", correction: "The filibuster is a Senate practice. The House limits debate through rules set by the Rules Committee." },
      { mistake: "Believing Congress controls most spending through yearly appropriations.", correction: "Mandatory spending — mainly entitlements — is the largest share of the budget and isn't set through annual appropriations." },
      { mistake: "Equating gerrymandering with apportionment.", correction: "Gerrymandering is manipulating district boundaries within a state; apportionment distributes seats among states." },
    ],
    relatedCaseIds: ["baker-v-carr", "shaw-v-reno", "rucho-v-common-cause"],
  },
  {
    id: "usgov-presidential-powers",
    courseId: "usgov",
    unitId: "usgov-u2",
    title: "Presidential Powers: Formal & Informal",
    minutes: 17,
    tags: ["presidency", "formal powers", "informal powers", "veto", "pocket veto", "executive order", "executive agreement", "signing statement", "commander in chief", "Federalist No. 70", "bully pulpit"],
    overview:
      "The Constitution gives the president a short list of formal powers, but modern presidents also rely on informal tools — executive orders, executive agreements, signing statements, and the bully pulpit — to pursue their agendas. Hamilton's Federalist No. 70 argued that an energetic single executive is essential to good government.",
    keyConcepts: [
      { term: "Formal (expressed) powers", definition: "Powers listed in Article II: veto, commander in chief, negotiating treaties, appointing officials, granting pardons." },
      { term: "Informal powers", definition: "Powers not explicitly granted but claimed through practice, such as executive orders and executive agreements." },
      { term: "Pocket veto", definition: "If Congress adjourns within ten days (excluding Sundays) of sending a bill, and the president does not sign it, the bill dies." },
      { term: "Executive order", definition: "A directive to the executive branch that has the force of law but can be overturned by courts, superseded by Congress, or revoked by later presidents." },
      { term: "Executive agreement", definition: "An agreement with a foreign government that does not require Senate ratification." },
      { term: "Signing statement", definition: "A president's written comments when signing a bill, sometimes indicating how the executive will interpret or enforce parts of it." },
      { term: "Bully pulpit", definition: "The president's platform to persuade the public and pressure Congress." },
    ],
    deepDive: [
      {
        heading: "Hamilton's case for energy",
        body: "In **Federalist No. 70**, Hamilton argued that \"energy in the executive is a leading character in the definition of good government.\" A single executive can act with \"decision, activity, secrecy, and despatch,\" and unity makes accountability clear: voters know whom to blame. Anti-Federalists feared a single executive could become a monarch; Hamilton answered that elections, a limited term, and impeachment keep the president accountable.",
      },
      {
        heading: "Formal powers in action",
        body: "The **veto** is the president's main legislative tool, and the mere threat of one can shape bills. As **commander in chief**, presidents direct the military, though only Congress can declare war — a tension the **War Powers Resolution (1973)** tried to address by requiring notification within 48 hours and limiting deployments without authorization to 60 days (plus a 30-day withdrawal period). The president appoints ambassadors, judges, and senior officials with Senate consent.",
      },
      {
        heading: "Informal powers and their limits",
        body: "Presidents increasingly rely on **executive orders** to act when Congress is gridlocked. These orders must rest on constitutional or statutory authority, and courts can strike them down. **Executive agreements** let presidents make international commitments without the two-thirds Senate vote, but they can be reversed by future presidents. The **Twenty-Second Amendment** limits presidents to two elected terms.",
      },
    ],
    example: {
      heading: "An order that doesn't outlast its author",
      body: "A president issues an executive order directing agencies to change an enforcement priority. The next president, from the other party, revokes it on the first day in office. Because the policy was never enacted by Congress, it could be reversed with a signature — a key limitation of governing by executive action.",
    },
    examConnection: {
      body: "Expect Concept Application scenarios about executive orders or war powers, and questions asking how Congress or the courts could check a presidential action. Federalist No. 70 is a required document and frequent Argument Essay evidence about presidential power.",
      tip: "Always tie a presidential action to the check: executive order → courts or Congress; treaty → Senate; appointment → Senate; veto → override.",
    },
    commonMistakes: [
      { mistake: "Treating executive orders as permanent law.", correction: "Executive orders can be revoked by later presidents, overridden by statute, or struck down by courts." },
      { mistake: "Saying the president can declare war.", correction: "Only Congress can declare war. The president commands the military once it is deployed." },
      { mistake: "Confusing treaties and executive agreements.", correction: "Treaties require two-thirds Senate approval; executive agreements do not." },
    ],
    relatedDocumentIds: ["federalist-70", "constitution"],
  },
  {
    id: "usgov-presidential-checks",
    courseId: "usgov",
    unitId: "usgov-u2",
    title: "Checks on the Presidency & Presidential Communication",
    minutes: 15,
    tags: ["impeachment", "confirmation", "divided government", "War Powers Resolution", "State of the Union", "bully pulpit", "going public", "presidential communication", "lame duck"],
    overview:
      "Presidents face constant pushback — from the Senate on appointments, from Congress on funding and war powers, and from the courts on legality. To overcome resistance, modern presidents \"go public,\" using speeches and media to build support for their agendas.",
    keyConcepts: [
      { term: "Advice and consent", definition: "The Senate's constitutional role in confirming appointments and ratifying treaties." },
      { term: "Going public", definition: "A strategy of appealing directly to the public to pressure Congress." },
      { term: "State of the Union", definition: "The president's annual address to Congress, required by the Constitution and used to set the agenda." },
      { term: "Lame duck", definition: "An official, usually near the end of a term, with reduced influence because a successor has been chosen or is expected." },
      { term: "Divided government", definition: "When one party controls the presidency and another controls at least one chamber of Congress." },
    ],
    deepDive: [
      {
        heading: "Congress pushes back",
        body: "Congress checks the president by refusing to pass legislation, overriding vetoes, cutting or conditioning funding, holding **oversight hearings**, and, in extreme cases, impeaching. The Senate can reject or stall nominations — including **judicial appointments**, which can shape policy for decades because federal judges serve during good behavior. Confirmation battles are most intense under divided government.",
      },
      {
        heading: "Communicating in the modern era",
        body: "Presidents use the State of the Union, press conferences, and — increasingly — social media and targeted digital messaging to set the agenda and mobilize supporters. Going public can pressure legislators whose constituents favor the president. But public appeals also polarize: supporters rally, opponents dig in.",
      },
      {
        heading: "Timing matters",
        body: "New presidents often have a \"honeymoon\" period of higher approval and more cooperation. Midterm losses and lame-duck status reduce leverage. Because Supreme Court vacancies are unpredictable, a single appointment can become the most lasting legacy of a presidency.",
      },
    ],
    example: {
      heading: "A televised appeal",
      body: "A president facing resistance on an infrastructure bill travels to key states, holds rallies, and posts videos urging voters to call their senators. If wavering senators hear from enough constituents, the president's public campaign may succeed where private negotiation did not.",
    },
    examConnection: {
      body: "Questions often ask how the Senate's confirmation power checks the president, or how presidential communication changes the relationship between the executive and Congress. Data-based questions may show approval ratings over a term.",
      tip: "For \"explain how Congress could respond,\" pick a check that fits the scenario: nominees → confirmation; spending → appropriations; policy → legislation or oversight.",
    },
    commonMistakes: [
      { mistake: "Assuming going public always works.", correction: "Public appeals can increase polarization and backfire. They work best when the president is popular and the issue is salient." },
      { mistake: "Saying impeachment removes an official.", correction: "Impeachment is a formal accusation by the House. Removal requires conviction by two-thirds of the Senate." },
      { mistake: "Forgetting judicial appointments are a presidential power.", correction: "The president nominates federal judges; the Senate confirms them. Appointments are a lasting way presidents shape policy." },
    ],
  },
  {
    id: "usgov-judiciary",
    courseId: "usgov",
    unitId: "usgov-u2",
    title: "The Judicial Branch & Judicial Review",
    minutes: 18,
    tags: ["judiciary", "judicial review", "Marbury v. Madison", "Federalist No. 78", "stare decisis", "precedent", "judicial activism", "judicial restraint", "life tenure", "Supreme Court"],
    overview:
      "The federal judiciary interprets the law and, through judicial review, can invalidate actions that violate the Constitution. Hamilton argued in Federalist No. 78 that courts would be the \"least dangerous\" branch; Marbury v. Madison established judicial review. Life tenure insulates judges but also sparks debates about their power.",
    keyConcepts: [
      { term: "Judicial review", definition: "The power of courts to declare laws or government actions unconstitutional; established in Marbury v. Madison (1803)." },
      { term: "Stare decisis", definition: "The principle that courts follow precedent — earlier rulings on similar issues." },
      { term: "Judicial activism", definition: "A philosophy in which judges are more willing to overturn precedent or strike down laws to protect rights or advance constitutional principles." },
      { term: "Judicial restraint", definition: "A philosophy in which judges defer to elected branches and precedent unless a violation is clear." },
      { term: "Writ of certiorari", definition: "An order by which the Supreme Court agrees to review a lower-court decision; four justices must agree (the \"rule of four\")." },
      { term: "Majority, concurring, and dissenting opinions", definition: "The Court's ruling and reasoning; a justice's agreement with different reasoning; a justice's disagreement with the ruling." },
    ],
    deepDive: [
      {
        heading: "The least dangerous branch",
        body: "In **Federalist No. 78**, Hamilton argued that the judiciary has \"neither FORCE nor WILL, but merely judgment\" — it cannot enforce its rulings or control spending. Because courts depend on the other branches, they pose the least threat to liberty. To keep judges independent, the Constitution grants them tenure during good behavior (effectively life tenure). Hamilton also argued that courts must be able to declare legislative acts contrary to the Constitution void.",
      },
      {
        heading: "Marbury and the power to say what the law is",
        body: "In **Marbury v. Madison (1803)**, Chief Justice John Marshall held that a portion of the Judiciary Act of 1789 was unconstitutional because it tried to expand the Court's original jurisdiction beyond what Article III allows. By refusing a power Congress had given it, the Court claimed a greater one: judicial review. It remains the foundation of the Court's role in checking Congress and the president.",
      },
      {
        heading: "Precedent, philosophy, and legitimacy",
        body: "Most of the time, courts follow **stare decisis**, which promotes stability. Occasionally the Court overturns precedent — Brown v. Board of Education (1954) rejected the \"separate but equal\" doctrine of Plessy v. Ferguson (1896), and Dobbs (2022) overturned Roe v. Wade (1973). Debates over activism and restraint often track whether one agrees with the outcome. Because courts rely on public acceptance of their legitimacy, controversial rulings can prompt calls for term limits, jurisdiction changes, or changes to the Court's size.",
      },
    ],
    example: {
      heading: "Compliance depends on others",
      body: "After Brown v. Board, many Southern officials resisted desegregation. In 1957, President Eisenhower sent federal troops to Little Rock to enforce a desegregation order — a vivid reminder of Hamilton's point that the courts rely on the executive to enforce their decisions.",
    },
    examConnection: {
      body: "Federalist No. 78 and Marbury v. Madison are both required. Questions frequently ask how the other branches can check the courts (appointments, legislation, constitutional amendments, jurisdiction) and how precedent shapes rulings.",
      tip: "Checks on the Court: Senate confirmation, new legislation to address a ruling, constitutional amendment, changing jurisdiction or the number of justices, and executive (non)enforcement.",
    },
    commonMistakes: [
      { mistake: "Saying the Constitution explicitly grants judicial review.", correction: "Judicial review was established by Marbury v. Madison; it is not stated in the text." },
      { mistake: "Equating judicial activism with liberal rulings.", correction: "Activism describes willingness to overturn laws or precedent, which can produce liberal or conservative outcomes." },
      { mistake: "Believing the Supreme Court must hear every appeal.", correction: "The Court has discretionary jurisdiction over most cases and grants certiorari to only a small fraction of petitions." },
    ],
    relatedDocumentIds: ["federalist-78"],
    relatedCaseIds: ["marbury-v-madison", "brown-v-board", "plessy-v-ferguson", "dobbs-v-jackson"],
  },
  {
    id: "usgov-bureaucracy",
    courseId: "usgov",
    unitId: "usgov-u2",
    title: "The Federal Bureaucracy: Structure & Discretion",
    minutes: 16,
    tags: ["bureaucracy", "cabinet departments", "independent regulatory agencies", "government corporations", "Pendleton Act", "merit system", "patronage", "iron triangle", "issue network", "bureaucratic discretion", "rulemaking"],
    overview:
      "Congress writes laws in broad terms; the bureaucracy fills in the details. Through rulemaking and enforcement, unelected civil servants exercise real policy discretion, and their relationships with congressional committees and interest groups shape outcomes.",
    keyConcepts: [
      { term: "Cabinet departments", definition: "The 15 major executive departments, such as State, Defense, and Homeland Security, each led by a secretary (the attorney general leads Justice)." },
      { term: "Independent regulatory agency", definition: "An agency that regulates a sector and is somewhat insulated from presidential control, such as the Federal Communications Commission." },
      { term: "Government corporation", definition: "A government-owned business that provides a service, such as the U.S. Postal Service or Amtrak." },
      { term: "Merit system", definition: "Hiring and promotion based on qualifications, established by the Pendleton Civil Service Act (1883) to replace the spoils (patronage) system." },
      { term: "Bureaucratic discretion", definition: "The power agencies have to decide how to implement laws." },
      { term: "Iron triangle", definition: "A stable relationship among a congressional committee, an agency, and an interest group that benefits all three." },
      { term: "Issue network", definition: "A looser web of experts, advocates, and officials who shape policy in an area." },
    ],
    deepDive: [
      {
        heading: "Why discretion exists",
        body: "Congress lacks the time and expertise to specify every detail, so it **delegates** authority to agencies. An agency like the Environmental Protection Agency writes regulations through a notice-and-comment process: it publishes a proposed rule, accepts public comments, and issues a final rule that carries the force of law. Agencies also exercise discretion through enforcement choices — deciding which violations to prioritize.",
      },
      {
        heading: "Iron triangles and issue networks",
        body: "An **iron triangle** links a committee (which funds and oversees the agency), an agency (which implements the program), and an interest group (which supports members of Congress and benefits from the program). For example, agricultural committees, the Department of Agriculture, and farm organizations have long reinforced one another. **Issue networks** are broader and more fluid, including think tanks, academics, and advocacy groups.",
      },
      {
        heading: "From patronage to merit",
        body: "In the nineteenth century, government jobs were rewarded to political supporters. After President Garfield was assassinated by a disappointed office seeker, Congress passed the **Pendleton Act (1883)**, creating a merit-based civil service. Today most federal employees are hired through merit processes, while top positions remain political appointments.",
      },
    ],
    example: {
      heading: "A rule with real consequences",
      body: "Congress passes a law requiring \"safe\" levels of a pollutant but doesn't define a number. The EPA studies the science, proposes a specific limit, takes public comment, and issues a final rule. Industry groups, environmental advocates, and state officials all weigh in — and the result shapes behavior far more concretely than the statute alone.",
    },
    examConnection: {
      body: "Concept Application questions often describe an agency rule and ask how Congress, the president, or courts could respond. Know the difference between iron triangles and issue networks, and be able to explain why Congress delegates.",
      tip: "Discretion + rulemaking = bureaucracy making policy. The checks are oversight hearings, the power of the purse, new legislation, presidential appointments, and judicial review.",
    },
    commonMistakes: [
      { mistake: "Saying bureaucrats are elected.", correction: "Most bureaucrats are merit-based civil servants; top agency heads are appointed by the president, many with Senate confirmation." },
      { mistake: "Thinking regulations are passed by Congress.", correction: "Regulations are issued by agencies under authority delegated by Congress." },
      { mistake: "Confusing iron triangles with issue networks.", correction: "Iron triangles are stable three-way relationships; issue networks are broader and more flexible." },
    ],
  },
  {
    id: "usgov-bureaucratic-accountability",
    courseId: "usgov",
    unitId: "usgov-u2",
    title: "Holding the Bureaucracy Accountable",
    minutes: 14,
    tags: ["oversight", "congressional oversight", "power of the purse", "appointments", "executive orders", "judicial review", "accountability", "compliance monitoring"],
    overview:
      "Because agencies make policy without facing voters, all three branches have tools to keep them accountable. Congress holds hearings and controls budgets; presidents appoint leaders and issue directives; courts review whether agencies acted within the law.",
    keyConcepts: [
      { term: "Congressional oversight", definition: "Congress's review of how agencies implement laws, through hearings, investigations, and reporting requirements." },
      { term: "Power of the purse (as oversight)", definition: "Congress can increase, cut, or condition agency funding." },
      { term: "Presidential appointments", definition: "The president appoints agency heads and can remove many of them, aligning agencies with presidential priorities." },
      { term: "Compliance monitoring", definition: "Agencies' role in ensuring that regulated entities follow the law." },
    ],
    deepDive: [
      {
        heading: "Congress: hearings, budgets, and statutes",
        body: "Committees can call agency leaders to testify, demand documents, and publicize problems. Congress can **change an agency's budget**, attach conditions to funding, or rewrite the statute the agency implements. The Senate's confirmation role gives it leverage over who runs agencies in the first place.",
      },
      {
        heading: "The president: appointments and directives",
        body: "Presidents appoint loyal agency heads and use executive orders to direct how laws are implemented. They can reorganize priorities, freeze hiring, and — for most executive officials — remove leaders who resist. Independent regulatory commissions have some protection from removal, which limits presidential control.",
      },
      {
        heading: "The courts: legal boundaries",
        body: "Courts can rule that an agency exceeded its statutory authority or violated the Constitution. Affected parties often sue after a rule is issued. Because court review happens only when someone brings a case, it is a reactive rather than continuous form of oversight.",
      },
    ],
    example: {
      heading: "An agency under the microscope",
      body: "After reports of long wait times at a federal agency, a House committee holds hearings, requires the agency to submit monthly progress reports, and adds funding conditioned on reducing backlogs. The president replaces the agency's director. Multiple branches are acting on the same accountability problem.",
    },
    examConnection: {
      body: "A common Concept Application part asks how Congress or the president could limit an agency's discretion. Answers are strongest when they name the specific tool and explain the mechanism.",
      tip: "\"Explain how Congress could use its oversight power\" → hearings, funding, or new legislation — then say how that changes the agency's behavior.",
    },
    commonMistakes: [
      { mistake: "Listing \"voting agency heads out\" as a check.", correction: "Agency heads are appointed, not elected. Voters influence agencies indirectly through elected officials." },
      { mistake: "Assuming the president controls every agency equally.", correction: "Independent regulatory commissions have more insulation from presidential control than cabinet departments." },
      { mistake: "Forgetting courts can check agencies.", correction: "Courts can strike down regulations that exceed statutory authority or violate the Constitution." },
    ],
  },
];
