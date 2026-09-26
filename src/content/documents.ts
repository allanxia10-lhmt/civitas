import type { FoundationalDocument } from "./types";

/**
 * The 13 required foundational documents for AP U.S. Government and Politics
 * (2026–27 CED). `addedIn` marks the four documents College Board added for
 * the 2026–27 school year. Quotations are from public-domain texts, except a
 * single short line from the Letter from Birmingham Jail.
 */
export const DOCUMENTS: FoundationalDocument[] = [
  {
    id: "declaration",
    title: "The Declaration of Independence",
    shortTitle: "Declaration",
    author: "Thomas Jefferson (with John Adams and Benjamin Franklin)",
    year: "1776",
    unitIds: ["usgov-u1"],
    whatYouNeedToKnow: [
      "Restates natural rights philosophy: life, liberty, and the pursuit of happiness.",
      "Government's legitimate power comes from the consent of the governed (popular sovereignty).",
      "When government violates rights, people may alter or abolish it (social contract).",
      "Lists grievances against King George III to justify independence.",
    ],
    context:
      "By 1776, conflict between the colonies and Britain had escalated into war. The Second Continental Congress appointed a committee to draft a statement explaining why the colonies were declaring independence. Jefferson drew heavily on John Locke's Enlightenment ideas.",
    mainArgument:
      "People possess natural, unalienable rights; governments exist to secure those rights and derive their authority from the people. Because the British government had repeatedly violated colonists' rights, the colonies were justified in dissolving their political connection to Britain.",
    keyIdeas: [
      "Natural rights",
      "Popular sovereignty and consent of the governed",
      "Social contract and the right to revolution",
      "Limited government",
    ],
    quotes: [
      {
        text: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
        note: "Natural rights and equality.",
      },
      {
        text: "That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed.",
        note: "Popular sovereignty and the purpose of government.",
      },
    ],
    apRelevance:
      "A key source for democratic ideals in Unit 1. The framework pairs it with the Constitution and the Gettysburg Address to explain how democratic ideals are reflected in founding and later documents.",
    relatedConcepts: ["natural rights", "popular sovereignty", "social contract", "limited government"],
    relatedLessonIds: ["usgov-democratic-ideals"],
    relatedDocumentIds: ["constitution", "gettysburg-address"],
  },
  {
    id: "articles-of-confederation",
    title: "The Articles of Confederation",
    shortTitle: "Articles",
    author: "Second Continental Congress",
    year: "1777 (ratified 1781)",
    unitIds: ["usgov-u1"],
    whatYouNeedToKnow: [
      "Created a \"firm league of friendship\" among sovereign states.",
      "Unicameral Congress; each state had one vote.",
      "No power to tax, regulate interstate commerce, or enforce laws; no national executive or courts.",
      "Amendments required unanimous consent of the states.",
    ],
    context:
      "Drafted during the Revolutionary War and reflecting fear of centralized power, the Articles served as the first national constitution until 1789.",
    mainArgument:
      "States should retain sovereignty, with a limited national government for common defense and foreign affairs.",
    keyIdeas: ["State sovereignty", "Weak central government", "Unanimity requirement for amendments", "Confederation"],
    quotes: [
      {
        text: "Each state retains its sovereignty, freedom, and independence, and every Power, Jurisdiction, and right, which is not by this confederation expressly delegated to the United States, in Congress assembled.",
        note: "Article II — state sovereignty.",
      },
    ],
    apRelevance:
      "Questions ask which weaknesses of the Articles the Constitution corrected. Its language on reserved powers foreshadows the Tenth Amendment.",
    relatedConcepts: ["confederation", "state sovereignty", "Shays' Rebellion", "federalism"],
    relatedLessonIds: ["usgov-articles-convention"],
    relatedDocumentIds: ["constitution"],
  },
  {
    id: "constitution",
    title: "The Constitution of the United States",
    shortTitle: "Constitution",
    author: "Constitutional Convention (drafted largely by James Madison)",
    year: "1787 (ratified 1788)",
    unitIds: ["usgov-u1", "usgov-u2", "usgov-u3"],
    whatYouNeedToKnow: [
      "Creates three branches with separate powers and checks and balances (Articles I–III).",
      "Divides power between national and state governments (federalism).",
      "Contains the Necessary and Proper Clause and the Supremacy Clause.",
      "Article V establishes a difficult amendment process.",
    ],
    context:
      "Delegates met in Philadelphia in 1787 to revise the Articles and instead wrote a new constitution, balancing competing interests through compromises on representation, slavery, and the presidency.",
    mainArgument:
      "A stronger national government with divided, checked powers can secure liberty and the general welfare better than the Articles.",
    keyIdeas: ["Separation of powers", "Checks and balances", "Federalism", "Limited government", "Popular sovereignty"],
    quotes: [
      {
        text: "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity...",
        note: "Preamble — popular sovereignty and purposes of government.",
      },
      {
        text: "This Constitution, and the Laws of the United States which shall be made in Pursuance thereof... shall be the supreme Law of the Land.",
        note: "Article VI — the Supremacy Clause.",
      },
      {
        text: "To make all Laws which shall be necessary and proper for carrying into Execution the foregoing Powers...",
        note: "Article I, Section 8 — the Necessary and Proper Clause.",
      },
    ],
    apRelevance:
      "The single most important document for the course. Nearly every unit connects to its text — from Article I powers to the Bill of Rights and the Fourteenth Amendment.",
    relatedConcepts: ["separation of powers", "checks and balances", "federalism", "Supremacy Clause", "Necessary and Proper Clause"],
    relatedLessonIds: ["usgov-articles-convention", "usgov-separation-of-powers", "usgov-federalism", "usgov-congress-structure"],
    relatedDocumentIds: ["federalist-51", "federalist-39", "brutus-1"],
  },
  {
    id: "federalist-10",
    title: "Federalist No. 10",
    shortTitle: "Federalist 10",
    author: "James Madison",
    year: "1787",
    unitIds: ["usgov-u1", "usgov-u5"],
    whatYouNeedToKnow: [
      "Factions are inevitable because their causes are \"sown in the nature of man.\"",
      "Eliminating the causes of faction would destroy liberty, so government must control faction's effects.",
      "A large republic makes it harder for a majority faction to form and oppress others.",
      "Representatives \"refine and enlarge\" public views.",
    ],
    context:
      "Published in New York newspapers during the ratification debate to persuade voters to support the Constitution.",
    mainArgument:
      "A large, representative republic is the best way to control the effects of faction and protect minority rights.",
    keyIdeas: ["Factions", "Large republic", "Representative democracy", "Pluralism", "Protection of minority rights"],
    quotes: [
      {
        text: "By a faction, I understand a number of citizens, whether amounting to a majority or a minority of the whole, who are united and actuated by some common impulse of passion, or of interest, adverse to the rights of other citizens, or to the permanent and aggregate interests of the community.",
        note: "Madison's definition of faction.",
      },
      {
        text: "The latent causes of faction are thus sown in the nature of man.",
        note: "Faction is inevitable.",
      },
      {
        text: "Extend the sphere, and you take in a greater variety of parties and interests; you make it less probable that a majority of the whole will have a common motive to invade the rights of other citizens.",
        note: "The large-republic solution.",
      },
    ],
    apRelevance:
      "Among the most frequently used Argument Essay sources. Connects to pluralist democracy, interest groups, and political parties.",
    relatedConcepts: ["factions", "pluralist democracy", "republicanism", "interest groups"],
    relatedLessonIds: ["usgov-ratification", "usgov-democratic-ideals", "usgov-interest-groups"],
    relatedDocumentIds: ["brutus-1", "federalist-51"],
  },
  {
    id: "brutus-1",
    title: "Brutus No. 1",
    shortTitle: "Brutus 1",
    author: "\"Brutus\" (widely attributed to Robert Yates)",
    year: "1787",
    unitIds: ["usgov-u1"],
    whatYouNeedToKnow: [
      "The proposed national government would eventually absorb the states.",
      "The Necessary and Proper Clause and the Supremacy Clause grant nearly unlimited power.",
      "Free republics must be small; in a large republic, representatives can't know or reflect the people.",
      "Warned against broad taxing power and a standing army.",
    ],
    context: "An Anti-Federalist essay published in New York opposing ratification of the Constitution.",
    mainArgument:
      "The Constitution creates a consolidated national government that will threaten liberty and state sovereignty; a large republic cannot remain free.",
    keyIdeas: ["Anti-Federalism", "Small republic", "State sovereignty", "Fear of consolidated power"],
    quotes: [
      {
        text: "In a republic, the manners, sentiments, and interests of the people should be similar.",
        note: "The case for a small, homogeneous republic.",
      },
      {
        text: "History furnishes no example of a free republic, any thing like the extent of the United States.",
        note: "Doubts that a large republic can remain free.",
      },
    ],
    apRelevance:
      "The Anti-Federalist counterpoint to Federalist No. 10. Use it to explain concerns about national power and to support arguments about federalism and representation.",
    relatedConcepts: ["Anti-Federalists", "federalism", "Necessary and Proper Clause", "participatory democracy"],
    relatedLessonIds: ["usgov-ratification"],
    relatedDocumentIds: ["federalist-10", "constitution"],
  },
  {
    id: "federalist-51",
    title: "Federalist No. 51",
    shortTitle: "Federalist 51",
    author: "James Madison",
    year: "1788",
    unitIds: ["usgov-u1", "usgov-u2"],
    whatYouNeedToKnow: [
      "Separation of powers and checks and balances guard against tyranny.",
      "\"Ambition must be made to counteract ambition.\"",
      "The legislature naturally predominates, so it is divided into two chambers.",
      "Federalism provides a \"double security\" for rights.",
    ],
    context: "Published during ratification to explain how the Constitution's structure would prevent any branch from dominating.",
    mainArgument:
      "Because people are not angels, government needs internal structural checks in addition to elections.",
    keyIdeas: ["Separation of powers", "Checks and balances", "Bicameralism", "Federalism as double security"],
    quotes: [
      { text: "Ambition must be made to counteract ambition.", note: "Checks and balances." },
      {
        text: "If men were angels, no government would be necessary. If angels were to govern men, neither external nor internal controls on government would be necessary.",
        note: "Why structural limits are needed.",
      },
      {
        text: "In republican government, the legislative authority necessarily predominates.",
        note: "Justification for bicameralism.",
      },
    ],
    apRelevance:
      "Core evidence for questions about separation of powers and checks and balances, and for Argument Essays about the balance of power among branches.",
    relatedConcepts: ["separation of powers", "checks and balances", "bicameralism"],
    relatedLessonIds: ["usgov-separation-of-powers", "usgov-congress-structure"],
    relatedDocumentIds: ["federalist-10", "constitution"],
  },
  {
    id: "federalist-39",
    title: "Federalist No. 39",
    shortTitle: "Federalist 39",
    author: "James Madison",
    year: "1788",
    addedIn: "2026–27",
    unitIds: ["usgov-u1"],
    whatYouNeedToKnow: [
      "Defines a republic as a government deriving its powers from the people and administered by officials serving for limited terms or during good behavior.",
      "The Constitution is \"neither a national nor a federal Constitution, but a composition of both.\"",
      "Some institutions rest on the people (House), some on the states (Senate), some on both (Electoral College).",
      "Per the course framework: dividing authority limits concentrated power while providing multiple access points for participation.",
    ],
    context:
      "Madison responded to critics who argued the Constitution abandoned republican principles and destroyed the states' role.",
    mainArgument:
      "The Constitution is thoroughly republican, and its mix of national and federal features preserves the states while creating an effective national government.",
    keyIdeas: ["Republicanism", "Federalism", "Mixed national and federal features", "Multiple access points"],
    quotes: [
      {
        text: "The proposed Constitution, therefore, is, in strictness, neither a national nor a federal Constitution, but a composition of both.",
        note: "Madison's central claim.",
      },
      {
        text: "...a government which derives all its powers directly or indirectly from the great body of the people, and is administered by persons holding their offices during pleasure, for a limited period, or during good behavior.",
        note: "Madison's definition of a republic.",
      },
    ],
    apRelevance:
      "New for 2026–27. The framework ties it to federalism: the division of authority limits concentration of power and creates multiple access points for political participation.",
    relatedConcepts: ["federalism", "republicanism", "access points", "Senate", "House of Representatives"],
    relatedLessonIds: ["usgov-federalism"],
    relatedDocumentIds: ["constitution", "federalist-51", "brutus-1"],
  },
  {
    id: "federalist-70",
    title: "Federalist No. 70",
    shortTitle: "Federalist 70",
    author: "Alexander Hamilton",
    year: "1788",
    unitIds: ["usgov-u2"],
    whatYouNeedToKnow: [
      "\"Energy in the executive\" is essential to good government.",
      "A single executive acts with decision, activity, secrecy, and dispatch.",
      "Unity makes accountability clear — the public knows whom to blame.",
      "Rejects a plural executive or executive council.",
    ],
    context: "Hamilton answered Anti-Federalist fears that a single executive would become a monarch.",
    mainArgument: "A single, energetic executive is necessary for effective government and clear accountability.",
    keyIdeas: ["Unitary executive", "Energy in the executive", "Accountability"],
    quotes: [
      { text: "Energy in the executive is a leading character in the definition of good government.", note: "Hamilton's thesis." },
      {
        text: "Decision, activity, secrecy, and despatch will generally characterize the proceedings of one man in a much more eminent degree than the proceedings of any greater number.",
        note: "Advantages of a single executive.",
      },
    ],
    apRelevance: "Core evidence for Unit 2 questions and Argument Essays about presidential power.",
    relatedConcepts: ["presidency", "executive power", "accountability"],
    relatedLessonIds: ["usgov-presidential-powers"],
    relatedDocumentIds: ["federalist-51", "constitution"],
  },
  {
    id: "federalist-78",
    title: "Federalist No. 78",
    shortTitle: "Federalist 78",
    author: "Alexander Hamilton",
    year: "1788",
    unitIds: ["usgov-u2"],
    whatYouNeedToKnow: [
      "The judiciary is the \"least dangerous\" branch: \"neither FORCE nor WILL, but merely judgment.\"",
      "Tenure during good behavior (life tenure) protects judicial independence.",
      "Courts should declare legislative acts contrary to the Constitution void.",
    ],
    context: "Hamilton defended the judiciary's structure against Anti-Federalist concerns that unelected judges would be too powerful.",
    mainArgument: "An independent judiciary with life tenure is needed to protect the Constitution and individual rights.",
    keyIdeas: ["Judicial independence", "Life tenure", "Judicial review", "Least dangerous branch"],
    quotes: [
      {
        text: "The judiciary... will always be the least dangerous to the political rights of the Constitution.",
        note: "Why courts pose the least threat.",
      },
      { text: "It may truly be said to have neither FORCE nor WILL, but merely judgment.", note: "Courts depend on other branches." },
      {
        text: "The interpretation of the laws is the proper and peculiar province of the courts.",
        note: "Foundation for judicial review.",
      },
    ],
    apRelevance: "Pairs with Marbury v. Madison for questions about judicial power and independence.",
    relatedConcepts: ["judicial review", "judicial independence", "checks and balances"],
    relatedLessonIds: ["usgov-judiciary"],
    relatedDocumentIds: ["federalist-70", "constitution"],
  },
  {
    id: "letter-birmingham-jail",
    title: "Letter from Birmingham Jail",
    shortTitle: "Birmingham Letter",
    author: "Martin Luther King Jr.",
    year: "1963",
    unitIds: ["usgov-u3"],
    whatYouNeedToKnow: [
      "Written while King was jailed for participating in nonviolent protests in Birmingham, Alabama.",
      "Responds to clergy who called the demonstrations \"unwise and untimely.\"",
      "Distinguishes just laws from unjust laws; people have a moral responsibility to disobey unjust laws.",
      "Defends nonviolent direct action to create tension that forces negotiation.",
    ],
    context:
      "In 1963, civil rights activists launched a campaign against segregation in Birmingham. King was arrested, and he wrote the letter in response to a published statement by white clergymen criticizing the protests.",
    mainArgument:
      "Nonviolent civil disobedience is justified — and necessary — to confront unjust laws when legal channels fail to deliver justice.",
    keyIdeas: ["Civil disobedience", "Just vs. unjust laws", "Nonviolent direct action", "Social movements"],
    quotes: [{ text: "Injustice anywhere is a threat to justice everywhere.", note: "Why King came to Birmingham." }],
    apRelevance:
      "The key document on social movements and civil rights. Frequently used in Argument Essays about how citizens achieve political change.",
    relatedConcepts: ["civil rights", "social movements", "civil disobedience", "Equal Protection Clause"],
    relatedLessonIds: ["usgov-civil-rights", "usgov-interest-groups"],
    relatedDocumentIds: ["emancipation-proclamation", "declaration"],
  },
  {
    id: "emancipation-proclamation",
    title: "The Emancipation Proclamation",
    shortTitle: "Emancipation Proclamation",
    author: "Abraham Lincoln",
    year: "1863",
    addedIn: "2026–27",
    unitIds: ["usgov-u3"],
    whatYouNeedToKnow: [
      "An executive proclamation issued as a war measure during the Civil War.",
      "Declared enslaved people in states in rebellion against the United States to be free.",
      "Did not apply to border states that remained in the Union.",
      "The Thirteenth Amendment (1865) permanently abolished slavery and marked a shift toward civil rights for the formerly enslaved.",
    ],
    context:
      "Lincoln issued a preliminary proclamation in September 1862 and the final proclamation on January 1, 1863, using his authority as commander in chief.",
    mainArgument: "As a military measure to weaken the rebellion, enslaved people in the Confederate states are declared free.",
    keyIdeas: ["Executive power in wartime", "Civil rights", "Minority rights restricted and protected"],
    quotes: [
      {
        text: "...all persons held as slaves within any State or designated part of a State, the people whereof shall then be in rebellion against the United States, shall be then, thenceforward, and forever free.",
        note: "Language from the September 1862 preliminary proclamation, quoted in the final proclamation.",
      },
    ],
    apRelevance:
      "New for 2026–27. The framework uses it in Unit 3 as the first example of how minority rights have been restricted at times and protected at others, leading into the Thirteenth Amendment, Plessy, and Brown.",
    relatedConcepts: ["civil rights", "Thirteenth Amendment", "executive power", "commander in chief"],
    relatedLessonIds: ["usgov-civil-rights", "usgov-presidential-powers"],
    relatedDocumentIds: ["gettysburg-address", "letter-birmingham-jail"],
  },
  {
    id: "gettysburg-address",
    title: "The Gettysburg Address",
    shortTitle: "Gettysburg Address",
    author: "Abraham Lincoln",
    year: "1863",
    addedIn: "2026–27",
    unitIds: ["usgov-u1"],
    whatYouNeedToKnow: [
      "Delivered at the dedication of a military cemetery at Gettysburg, Pennsylvania, in November 1863.",
      "Invokes the Declaration's promise that \"all men are created equal.\"",
      "Frames the Civil War as a test of whether a nation dedicated to liberty and equality can endure.",
      "Per the course framework: reaffirmed equality and popular sovereignty as defining foundations of democracy.",
    ],
    context: "Four months after the Union victory at Gettysburg, Lincoln gave a brief address at the dedication of the Soldiers' National Cemetery.",
    mainArgument:
      "The nation was founded on liberty and equality; honoring the fallen requires a renewed commitment to government of, by, and for the people.",
    keyIdeas: ["Equality", "Popular sovereignty", "Democratic ideals", "National unity"],
    quotes: [
      {
        text: "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.",
        note: "Connects to the Declaration of Independence.",
      },
      {
        text: "...that government of the people, by the people, for the people, shall not perish from the earth.",
        note: "Popular sovereignty.",
      },
    ],
    apRelevance:
      "New for 2026–27. The framework now lists it alongside the Declaration and Constitution as a reflection of democratic ideals (Topic 1.1).",
    relatedConcepts: ["popular sovereignty", "equality", "democratic ideals"],
    relatedLessonIds: ["usgov-democratic-ideals"],
    relatedDocumentIds: ["declaration", "emancipation-proclamation"],
  },
  {
    id: "wealth-of-nations",
    title: "Core Principles from Adam Smith's The Wealth of Nations",
    shortTitle: "Wealth of Nations",
    author: "Adam Smith",
    year: "1776",
    addedIn: "2026–27",
    unitIds: ["usgov-u4"],
    whatYouNeedToKnow: [
      "Individuals pursuing self-interest in competitive markets tend to promote the general good (the \"invisible hand\").",
      "Division of labor and specialization increase productivity.",
      "Competition allocates resources efficiently; heavy regulation can distort markets.",
      "Government still has roles: defense, justice, and certain public works.",
      "Per the course framework: the source of the core value of free enterprise.",
    ],
    context:
      "Published in 1776 — the same year as the Declaration of Independence — by a Scottish philosopher, it became a founding text of modern economics.",
    mainArgument: "National wealth grows through free markets, competition, and the division of labor, with a limited but important role for government.",
    keyIdeas: ["Free enterprise", "Self-interest", "Competition", "Invisible hand", "Limited government"],
    quotes: [
      {
        text: "It is not from the benevolence of the butcher, the brewer, or the baker, that we expect our dinner, but from their regard to their own interest.",
        note: "Self-interest in markets.",
      },
      {
        text: "...he intends only his own gain, and he is in this, as in many other cases, led by an invisible hand to promote an end which was no part of his intention.",
        note: "The invisible hand (Book IV).",
      },
    ],
    apRelevance:
      "New for 2026–27. The framework cites Smith when defining free enterprise as a core value (Topic 4.1). Useful for questions on ideology and economic policy.",
    relatedConcepts: ["free enterprise", "core values", "limited government", "supply-side economics"],
    relatedLessonIds: ["usgov-core-values", "usgov-ideology-policy"],
    relatedDocumentIds: ["declaration"],
  },
];
