import type { Lesson } from "../types";

export const usgovUnit1: Lesson[] = [
  {
    id: "usgov-democratic-ideals",
    courseId: "usgov",
    unitId: "usgov-u1",
    title: "Democratic Ideals & Models of Democracy",
    minutes: 16,
    tags: ["natural rights", "popular sovereignty", "social contract", "republicanism", "limited government", "participatory democracy", "pluralist democracy", "elite democracy", "Gettysburg Address"],
    overview:
      "American government rests on Enlightenment ideas: people have natural rights, government exists by their consent, and power must be limited. The Framers built a republic — not a direct democracy — and Americans still debate how much ordinary citizens, organized groups, or elites should drive decisions. Those three competing models of democracy show up constantly on the AP exam.",
    keyConcepts: [
      { term: "Natural rights", definition: "Rights people hold by virtue of being human — for Locke, life, liberty, and property — which government cannot legitimately take away." },
      { term: "Social contract", definition: "The idea that people consent to be governed in exchange for the protection of their rights; if government breaks the contract, people may alter or abolish it." },
      { term: "Popular sovereignty", definition: "Government's authority comes from the people." },
      { term: "Republicanism", definition: "A system in which citizens elect representatives to make decisions on their behalf." },
      { term: "Limited government", definition: "Government power is restricted by law, usually a written constitution, to protect individual rights." },
      { term: "Participatory democracy", definition: "A model emphasizing broad, direct citizen participation in politics and civil society." },
      { term: "Pluralist democracy", definition: "A model in which groups compete to influence policy, and no single group dominates." },
      { term: "Elite democracy", definition: "A model in which a small, educated, wealthy minority has outsized influence over policy." },
    ],
    deepDive: [
      {
        heading: "From Enlightenment theory to founding documents",
        body: "John Locke argued that people form governments to protect natural rights, and that a government which violates those rights loses its legitimacy. Thomas Jefferson put these ideas to work in the **Declaration of Independence**: governments derive \"their just powers from the consent of the governed,\" and when a government becomes destructive of people's rights, they may alter or abolish it.\n\nThe **Constitution** turned those principles into a working system of limited government. Its opening words — \"We the People\" — express popular sovereignty, and its enumerated powers, separation of powers, and later the Bill of Rights all limit what government may do.",
      },
      {
        heading: "Equality and popular sovereignty reaffirmed",
        body: "The course framework now pairs the Declaration and Constitution with the **Gettysburg Address** (1863). Lincoln described the nation as \"dedicated to the proposition that all men are created equal\" and closed by calling for \"government of the people, by the people, for the people.\" On the exam, treat the address as evidence that equality and popular sovereignty were reaffirmed — and contested — as defining foundations of American democracy during the Civil War.",
      },
      {
        heading: "Three models of democracy",
        body: "**Participatory democracy** values broad engagement: grassroots movements, town halls, and state-level ballot initiatives are examples. **Pluralist democracy** sees politics as group competition — interest groups such as the AARP or the National Rifle Association press their members' views, and policy emerges from bargaining. **Elite democracy** stresses the disproportionate influence of the wealthy and well-educated; the Electoral College and the original selection of senators by state legislatures are often cited as elite features.\n\nThe Constitution contains all three. Madison's defense of a large republic in Federalist No. 10 is pluralist; the Anti-Federalists' preference for small, close-to-the-people republics is participatory; indirect selection mechanisms reflect elite thinking.",
      },
    ],
    example: {
      heading: "A ballot initiative as participatory democracy",
      body: "Many states let citizens gather signatures to place a law directly on the ballot. When voters in a state approve a minimum-wage increase through an initiative, they bypass the legislature entirely — a clear example of participatory democracy. A national interest group spending money to support or oppose that initiative would add a pluralist dimension to the same event.",
    },
    examConnection: {
      body: "Expect stimulus questions that quote a founder or describe a scenario and ask which model of democracy it reflects. The Argument Essay can ask you to defend a claim using the Declaration, the Constitution, or — beginning in 2026–27 — the Gettysburg Address as evidence.",
      tip: "When a question describes groups competing, think pluralist. When it describes ordinary citizens acting directly, think participatory. When it describes influence concentrated in a few, think elite.",
    },
    commonMistakes: [
      { mistake: "Calling the United States a direct democracy.", correction: "The U.S. is a representative democracy (a republic). Direct democracy exists only at the state and local level, through tools like initiatives and referendums." },
      { mistake: "Treating the three models as mutually exclusive.", correction: "Most institutions mix models. The exam rewards explaining which feature of a scenario reflects which model." },
      { mistake: "Attributing natural rights to the Constitution.", correction: "Natural rights language appears in the Declaration of Independence. The Constitution establishes a structure of limited government; the Bill of Rights protects specific liberties." },
    ],
    relatedDocumentIds: ["declaration", "constitution", "gettysburg-address", "federalist-10", "brutus-1"],
  },
  {
    id: "usgov-articles-convention",
    courseId: "usgov",
    unitId: "usgov-u1",
    title: "The Articles of Confederation & the Constitutional Convention",
    minutes: 17,
    tags: ["Articles of Confederation", "Shays' Rebellion", "Great Compromise", "Three-Fifths Compromise", "Electoral College", "Constitutional Convention", "amendment process"],
    overview:
      "The Articles of Confederation created a weak national government that could not tax, regulate trade, or enforce its laws. Shays' Rebellion exposed those weaknesses and helped prompt the Constitutional Convention of 1787, where delegates negotiated a series of compromises over representation, slavery, and the selection of the president.",
    keyConcepts: [
      { term: "Articles of Confederation", definition: "The first U.S. constitution (ratified 1781), which created a loose alliance of sovereign states and a weak unicameral Congress." },
      { term: "Shays' Rebellion", definition: "A 1786–87 uprising of indebted Massachusetts farmers that the national government could not help suppress, highlighting its weakness." },
      { term: "Great (Connecticut) Compromise", definition: "Created a bicameral Congress: representation by population in the House and equal representation in the Senate." },
      { term: "Three-Fifths Compromise", definition: "Counted three-fifths of the enslaved population for representation and taxation — a compromise between Southern and Northern delegates." },
      { term: "Electoral College", definition: "The system of electors chosen by states that selects the president; a compromise between election by Congress and by popular vote." },
      { term: "Article V", definition: "The amendment process: proposal by two-thirds of both houses of Congress (or a convention called by two-thirds of states) and ratification by three-fourths of the states." },
    ],
    deepDive: [
      {
        heading: "Why the Articles failed",
        body: "Fearing a repeat of British tyranny, the Articles reserved sovereignty to the states. Congress had **no power to tax** — it could only request money — and **no power to regulate interstate commerce**, so states imposed tariffs on one another. There was no national executive to enforce laws and no national court system. Amendments required **unanimous** consent of the states, and major legislation required the approval of nine of thirteen states.\n\nShays' Rebellion made these weaknesses concrete: the national government could not raise an army to respond, and Massachusetts relied on privately funded militia. Many political leaders concluded that a stronger central government was necessary.",
      },
      {
        heading: "Compromises at the Convention",
        body: "Large states backed the **Virginia Plan** (representation by population); small states backed the **New Jersey Plan** (equal representation). The **Great Compromise** blended them into a bicameral Congress. The **Three-Fifths Compromise** settled how enslaved people would be counted, and delegates also agreed that Congress could not ban the importation of enslaved people before 1808 — compromises that protected slavery and reflected deep regional divisions.\n\nDelegates debated whether Congress, state legislatures, or the people should choose the president. The **Electoral College** was the compromise, and it remains a subject of debate today.",
      },
      {
        heading: "Built to last — and to change slowly",
        body: "Article V makes formal amendment deliberately difficult, requiring broad agreement across both Congress and the states. That difficulty is why most constitutional change has happened informally — through judicial interpretation, custom, and statute — rather than through the 27 formal amendments.",
      },
    ],
    example: {
      heading: "The Senate as a living compromise",
      body: "Wyoming and California each have two senators even though California's population is dozens of times larger. That equal representation is a direct legacy of the Great Compromise, and it continues to shape which policies can pass the Senate.",
    },
    examConnection: {
      body: "Questions often present a weakness of the Articles and ask which constitutional provision addressed it — for example, the Articles' lack of a taxing power was fixed by giving Congress the power to lay and collect taxes. The Articles of Confederation is a required foundational document.",
      tip: "Pair each weakness with its fix: no taxing power → Article I taxing power; no commerce power → Commerce Clause; unanimity for amendments → Article V; no executive → Article II.",
    },
    commonMistakes: [
      { mistake: "Saying the Articles had no legislature.", correction: "The Articles had a unicameral Congress in which each state had one vote. What it lacked was an independent executive and national courts." },
      { mistake: "Thinking the amendment process requires a national popular vote.", correction: "Article V uses Congress and the states; there is no national referendum mechanism." },
      { mistake: "Describing the Great Compromise as the source of the Electoral College.", correction: "The Great Compromise created the bicameral Congress. The Electoral College was a separate compromise over presidential selection (though each state's electors equal its House plus Senate seats)." },
    ],
    relatedDocumentIds: ["articles-of-confederation", "constitution"],
  },
  {
    id: "usgov-ratification",
    courseId: "usgov",
    unitId: "usgov-u1",
    title: "Ratification: Federalists vs. Anti-Federalists",
    minutes: 18,
    tags: ["Federalists", "Anti-Federalists", "Federalist No. 10", "Brutus No. 1", "factions", "large republic", "Bill of Rights", "Necessary and Proper Clause"],
    overview:
      "Ratification pitted Federalists, who supported a stronger national government, against Anti-Federalists, who feared it would swallow the states and endanger liberty. Federalist No. 10 and Brutus No. 1 are the clearest statements of each side, and the Bill of Rights was the price of ratification.",
    keyConcepts: [
      { term: "Federalists", definition: "Supporters of ratification — including Madison, Hamilton, and Jay — who argued a stronger central government would protect liberty and stability." },
      { term: "Anti-Federalists", definition: "Opponents of ratification who feared centralized power and demanded a bill of rights." },
      { term: "Faction", definition: "In Madison's definition, a group of citizens united by a common passion or interest adverse to the rights of others or the community's interests." },
      { term: "Large republic", definition: "Madison's solution to faction: an extended republic includes so many interests that no single faction is likely to dominate." },
      { term: "Necessary and Proper Clause", definition: "Article I, Section 8's grant of power to make laws needed to carry out enumerated powers; Anti-Federalists feared it would become unlimited." },
    ],
    deepDive: [
      {
        heading: "Federalist No. 10: control the effects of faction",
        body: "Madison argued that the causes of faction are \"sown in the nature of man\" and cannot be removed without destroying liberty. Instead, government should **control the effects**. A **large republic** does this in two ways: elected representatives \"refine and enlarge\" public views, and a large territory contains so many competing interests that a tyrannical majority is less likely to form or act together.",
      },
      {
        heading: "Brutus No. 1: a large republic cannot stay free",
        body: "Brutus warned that the proposed national government would gradually absorb state power. He pointed to the **Necessary and Proper Clause** and the **Supremacy Clause** as open-ended grants, and to the unlimited taxing power as a threat. He argued that free republics must be small: in a vast country, representatives cannot know their constituents, citizens will not have confidence in distant rulers, and government will rely on force.\n\nBrutus's worries echo in later debates over federal power, from McCulloch v. Maryland to modern Commerce Clause cases.",
      },
      {
        heading: "The Bill of Rights as compromise",
        body: "Several states ratified only with the expectation that amendments protecting individual rights would follow. Madison drafted amendments in the First Congress, and ten were ratified in 1791. The Tenth Amendment — reserving undelegated powers to the states or the people — directly answered Anti-Federalist fears.",
      },
    ],
    example: {
      heading: "Faction in a modern setting",
      body: "Suppose one industry wants a tariff that raises prices for everyone else. In a single small state, that industry might dominate the legislature. In Congress, it must compete with consumer groups, retailers, farm interests, and members from states where the industry has no presence. Madison would call that the extended republic working as designed.",
    },
    examConnection: {
      body: "Federalist No. 10 and Brutus No. 1 are required documents and frequent Argument Essay evidence. Multiple-choice questions often quote one of them and ask you to identify the author's position or which constitutional feature responds to it.",
      tip: "Federalist No. 10 = large republic + control factions' effects. Brutus No. 1 = small republic + fear of the Necessary and Proper and Supremacy Clauses.",
    },
    commonMistakes: [
      { mistake: "Saying Madison wanted to eliminate factions.", correction: "Madison explicitly rejected eliminating factions because it would destroy liberty. He wanted to control their effects." },
      { mistake: "Assuming Anti-Federalists opposed any national government.", correction: "Most Anti-Federalists accepted a union but wanted a weaker national government, stronger states, and explicit protection of rights." },
      { mistake: "Confusing Federalist No. 10 with No. 51.", correction: "No. 10 is about faction and the large republic. No. 51 is about separation of powers and checks and balances." },
    ],
    relatedDocumentIds: ["federalist-10", "brutus-1", "constitution"],
    relatedCaseIds: ["mcculloch-v-maryland"],
  },
  {
    id: "usgov-separation-of-powers",
    courseId: "usgov",
    unitId: "usgov-u1",
    title: "Separation of Powers & Checks and Balances",
    minutes: 15,
    tags: ["separation of powers", "checks and balances", "Federalist No. 51", "veto", "impeachment", "judicial review", "ambition counteract ambition"],
    overview:
      "The Constitution divides power among three branches and gives each the means to resist encroachment by the others. Madison's Federalist No. 51 explains the logic: because people are not angels, ambition must be made to counteract ambition.",
    keyConcepts: [
      { term: "Separation of powers", definition: "Legislative, executive, and judicial powers are assigned to separate branches." },
      { term: "Checks and balances", definition: "Each branch has constitutional tools to limit the others — for example, the veto, Senate confirmation, and judicial review." },
      { term: "Federalist No. 51", definition: "Madison's essay arguing that structural checks, not just elections, are needed to prevent tyranny." },
      { term: "Impeachment", definition: "The House's power to charge an official with wrongdoing; the Senate tries the case, and removal requires a two-thirds vote." },
      { term: "Veto override", definition: "Congress can pass a bill over a presidential veto with a two-thirds vote in both chambers." },
    ],
    deepDive: [
      {
        heading: "Why structure matters",
        body: "In Federalist No. 51, Madison wrote that \"if men were angels, no government would be necessary.\" Elections are the primary control on government, but \"auxiliary precautions\" are also necessary. By giving each branch its own constitutional powers and its own motive to defend them, the system turns personal ambition into a safeguard.\n\nMadison also noted that the legislature naturally predominates in a republic, which is why the Constitution divides Congress into two chambers with different terms and constituencies.",
      },
      {
        heading: "Checks in practice",
        body: "**Congress checks the president** by overriding vetoes, refusing to fund programs, rejecting nominees and treaties, investigating, and impeaching. **The president checks Congress** with the veto and by shaping implementation. **The courts check both** through judicial review, while **the president and Senate check the courts** through appointments, and Congress can set the courts' size and jurisdiction.",
      },
      {
        heading: "Checks create friction by design",
        body: "Checks and balances slow policymaking. Critics see gridlock; defenders see deliberation and protection against hasty or tyrannical action. AP questions frequently ask you to explain this trade-off in a specific scenario, such as a failed nomination or a vetoed spending bill.",
      },
    ],
    example: {
      heading: "A nomination fight",
      body: "When the Senate declines to confirm a president's nominee to lead a cabinet department, it is using its advice-and-consent power to check the executive. The president may respond by naming an acting official or choosing a different nominee — an example of the branches bargaining within the constitutional structure.",
    },
    examConnection: {
      body: "Concept Application questions often describe a conflict between branches and ask you to identify the check being used and explain how another branch could respond. Federalist No. 51 is a required document and strong Argument Essay evidence on separation of powers.",
      tip: "When asked how a branch could respond, name a specific constitutional power (override, confirmation, appropriations, judicial review) rather than a vague action like \"disagree.\"",
    },
    commonMistakes: [
      { mistake: "Saying the Senate impeaches.", correction: "The House impeaches (brings charges). The Senate holds the trial and can remove an official with a two-thirds vote." },
      { mistake: "Listing judicial review as an explicit constitutional power.", correction: "Judicial review is not written in the Constitution. It was established by the Court in Marbury v. Madison (1803)." },
      { mistake: "Treating separation of powers and federalism as the same thing.", correction: "Separation of powers divides power among branches; federalism divides power between national and state governments." },
    ],
    relatedDocumentIds: ["federalist-51", "constitution"],
    relatedCaseIds: ["marbury-v-madison"],
  },
  {
    id: "usgov-federalism",
    courseId: "usgov",
    unitId: "usgov-u1",
    title: "Federalism: Dual vs. Cooperative Federalism",
    minutes: 18,
    tags: ["federalism", "dual federalism", "cooperative federalism", "enumerated powers", "implied powers", "reserved powers", "concurrent powers", "Tenth Amendment", "Supremacy Clause", "Federalist No. 39", "McCulloch v. Maryland"],
    overview:
      "Federalism divides power between the national government and the states. The balance has shifted over time — from dual federalism's separate spheres (\"layer cake\") to cooperative federalism's shared responsibilities (\"marble cake\"). Federalist No. 39, newly required for 2026–27, explains why the Constitution is partly national and partly federal.",
    keyConcepts: [
      { term: "Enumerated (expressed) powers", definition: "Powers specifically granted to Congress in the Constitution, such as coining money and declaring war." },
      { term: "Implied powers", definition: "Powers not listed but reasonably inferred from enumerated powers through the Necessary and Proper Clause." },
      { term: "Reserved powers", definition: "Powers kept by the states under the Tenth Amendment, such as running elections and regulating intrastate commerce." },
      { term: "Concurrent powers", definition: "Powers held by both levels, such as taxing, borrowing, and establishing courts." },
      { term: "Supremacy Clause", definition: "Article VI: the Constitution and federal laws made under it are the supreme law of the land." },
      { term: "Dual federalism", definition: "Each level of government has distinct, separate responsibilities (the \"layer cake\")." },
      { term: "Cooperative federalism", definition: "National and state governments share responsibilities and funding for many policies (the \"marble cake\")." },
    ],
    deepDive: [
      {
        heading: "A \"composition of both\"",
        body: "In **Federalist No. 39**, Madison argued that the proposed Constitution was \"neither a national nor a federal Constitution, but a composition of both.\" Some features rest on the people directly (the House), some on the states as equals (the Senate and ratification), and some on a mix (the Electoral College). The course framework highlights his point that dividing authority this way limits the concentration of power while creating **multiple access points** for citizens to participate.",
      },
      {
        heading: "Dual federalism",
        body: "For much of the nineteenth century, courts tended to treat national and state powers as separate spheres. The national government handled matters like foreign affairs and currency; states handled most domestic policy, including education, criminal law, and commerce within their borders. The image is a **layer cake**: distinct layers that rarely mix.",
      },
      {
        heading: "Cooperative federalism",
        body: "Beginning with the New Deal in the 1930s, and expanding with the Great Society of the 1960s, the national government increasingly funded and set standards for programs that states administered — highways, welfare, health care, and education. Responsibilities became intertwined, like a **marble cake**. Medicaid, jointly funded and state-administered, is a classic example.\n\n**McCulloch v. Maryland (1819)** laid the constitutional groundwork: the Court upheld Congress's implied power to create a national bank under the Necessary and Proper Clause and ruled, based on the Supremacy Clause, that states cannot tax a federal institution.",
      },
    ],
    example: {
      heading: "Disaster response",
      body: "After a major hurricane, a governor declares a state emergency and deploys the National Guard, local governments run shelters, and the Federal Emergency Management Agency provides funding and coordination after a presidential disaster declaration. Three levels of government acting together on one problem is cooperative federalism in action.",
    },
    examConnection: {
      body: "Expect questions asking you to classify a power as enumerated, implied, reserved, or concurrent, and to connect federalism debates to McCulloch v. Maryland and United States v. Lopez. Federalist No. 39 is now a required document, so be ready to use its \"partly national, partly federal\" argument as essay evidence.",
      tip: "If a scenario involves the national government funding or setting conditions on a state-run program, you're usually looking at cooperative federalism or fiscal federalism.",
    },
    commonMistakes: [
      { mistake: "Saying the Tenth Amendment lists specific state powers.", correction: "The Tenth Amendment doesn't list powers; it reserves all undelegated powers to the states or the people." },
      { mistake: "Thinking McCulloch limited national power.", correction: "McCulloch expanded national power by endorsing implied powers and national supremacy. Lopez (1995) is the case that limited Congress's commerce power." },
      { mistake: "Confusing concurrent powers with shared programs.", correction: "Concurrent powers are held independently by both levels (both can tax). Cooperative federalism describes joint programs." },
    ],
    relatedDocumentIds: ["federalist-39", "constitution", "brutus-1"],
    relatedCaseIds: ["mcculloch-v-maryland", "united-states-v-lopez", "gibbons-v-ogden"],
  },
  {
    id: "usgov-federalism-in-practice",
    courseId: "usgov",
    unitId: "usgov-u1",
    title: "Federalism in Practice: Grants, Mandates & the Commerce Clause",
    minutes: 16,
    tags: ["fiscal federalism", "categorical grants", "block grants", "unfunded mandates", "devolution", "Commerce Clause", "United States v. Lopez", "revenue sharing"],
    overview:
      "The national government shapes state policy largely through money. Categorical grants, block grants, and mandates give Washington different amounts of control, and the Commerce Clause has been the main constitutional battleground over how far national power reaches.",
    keyConcepts: [
      { term: "Fiscal federalism", definition: "The use of federal grants and funding conditions to influence state policy." },
      { term: "Categorical grant", definition: "Federal money for a specific purpose, with strings attached." },
      { term: "Block grant", definition: "Federal money for a broad policy area, giving states more flexibility in how to spend it." },
      { term: "Mandate", definition: "A federal requirement that states must follow; unfunded mandates come without money to pay for compliance." },
      { term: "Devolution", definition: "Returning policy responsibility from the national government to the states." },
      { term: "Commerce Clause", definition: "Article I power to regulate commerce with foreign nations, among the states, and with Indian tribes." },
    ],
    deepDive: [
      {
        heading: "Strings, flexibility, and control",
        body: "Categorical grants give the national government the most control; block grants give states more discretion. States generally prefer block grants, while members of Congress seeking specific outcomes often prefer categorical grants. **Conditions of aid** can push states toward national goals — the classic example is the national minimum drinking age, encouraged by withholding a portion of highway funds from states that did not set it at 21.",
      },
      {
        heading: "Mandates and devolution",
        body: "Mandates such as the Americans with Disabilities Act require state and local compliance. When mandates come without funding, states object that they must pay for national priorities. Congress passed the Unfunded Mandates Reform Act in 1995 to discourage the practice. **Devolution** — turning programs into block grants or giving states waivers — shifts power back toward the states.",
      },
      {
        heading: "The Commerce Clause battleground",
        body: "From the New Deal onward, the Court read the Commerce Clause broadly, allowing Congress to regulate activities with a substantial effect on interstate commerce. **United States v. Lopez (1995)** marked a turn: the Court struck down the Gun-Free School Zones Act because possessing a gun near a school was not economic activity substantially affecting interstate commerce. Lopez signaled renewed limits on congressional power and a revival of state authority.",
      },
    ],
    example: {
      heading: "Education funding with conditions",
      body: "Federal education funding frequently comes with requirements — for example, conditions related to testing, reporting, or civil rights compliance. States can decline the money, but because federal dollars are significant, most accept the conditions. This leverage is fiscal federalism at work.",
    },
    examConnection: {
      body: "Concept Application prompts frequently describe a state-federal conflict over funding or regulation. You may be asked to explain how a grant type or the Commerce Clause affects the balance of power. Lopez is a required case and a frequent SCOTUS Comparison anchor.",
      tip: "Categorical = more federal control. Block = more state flexibility. Lopez = limit on Commerce Clause power; McCulloch = expansion of implied power.",
    },
    commonMistakes: [
      { mistake: "Saying block grants increase federal control.", correction: "Block grants give states more flexibility; categorical grants increase federal control." },
      { mistake: "Claiming Lopez ended congressional power over commerce.", correction: "Lopez limited one application. Congress still regulates a vast range of economic activity under the Commerce Clause." },
      { mistake: "Treating conditions of aid as mandates.", correction: "States can refuse grant money with conditions attached; a mandate applies regardless of funding." },
    ],
    relatedCaseIds: ["united-states-v-lopez", "mcculloch-v-maryland", "gibbons-v-ogden"],
  },
];
