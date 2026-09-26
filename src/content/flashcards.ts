import { CASES } from "./cases";
import { DOCUMENTS } from "./documents";
import type { CourseId, DeckId, Flashcard } from "./types";

export const DECKS: Record<DeckId, { label: string; description: string }> = {
  vocabulary: { label: "Vocabulary", description: "Essential terms and definitions" },
  scotus: { label: "Supreme Court Cases", description: "Required and supplemental cases" },
  documents: { label: "Foundational Documents", description: "The 13 required documents" },
  concepts: { label: "Political Concepts", description: "Models, theories, and comparisons" },
  countries: { label: "Country Profiles", description: "Key facts for the six countries" },
  institutions: { label: "Political Institutions", description: "Bodies, offices, and how they work" },
  custom: { label: "My Cards", description: "Cards you created" },
};

function deck(courseId: CourseId, deckId: DeckId, unitId?: string) {
  return (slug: string, front: string, back: string): Flashcard => ({
    id: `fc-${courseId === "usgov" ? "us" : "cg"}-${deckId}-${slug}`,
    courseId,
    deck: deckId,
    front,
    back,
    unitId,
  });
}

// ------------------------------------------------------------ U.S. vocabulary
const usV1 = deck("usgov", "vocabulary", "usgov-u1");
const usV2 = deck("usgov", "vocabulary", "usgov-u2");
const usV3 = deck("usgov", "vocabulary", "usgov-u3");
const usV4 = deck("usgov", "vocabulary", "usgov-u4");
const usV5 = deck("usgov", "vocabulary", "usgov-u5");

const usVocabulary: Flashcard[] = [
  usV1("popular-sovereignty", "Popular sovereignty", "The principle that government's authority comes from the people."),
  usV1("republicanism", "Republicanism", "A system in which citizens elect representatives to make policy on their behalf."),
  usV1("social-contract", "Social contract", "People consent to be governed in exchange for protection of their rights; if government breaks the contract, people may alter or abolish it."),
  usV1("limited-government", "Limited government", "Government power is restricted by law, usually a written constitution, to protect individual rights."),
  usV1("enumerated-powers", "Enumerated powers", "Powers specifically granted to Congress in Article I, Section 8 (e.g., taxing, coining money, declaring war)."),
  usV1("implied-powers", "Implied powers", "Powers inferred from enumerated powers through the Necessary and Proper Clause; affirmed in McCulloch v. Maryland."),
  usV1("reserved-powers", "Reserved powers", "Powers kept by the states under the Tenth Amendment (e.g., running elections, education)."),
  usV1("concurrent-powers", "Concurrent powers", "Powers held by both national and state governments, such as taxing and borrowing."),
  usV1("categorical-grant", "Categorical grant", "Federal money for a specific purpose with conditions attached — more federal control."),
  usV1("block-grant", "Block grant", "Federal money for a broad purpose with few restrictions — more state flexibility."),
  usV1("unfunded-mandate", "Unfunded mandate", "A federal requirement imposed on states without funding to pay for it."),
  usV1("devolution", "Devolution", "Returning policy responsibility from the national government to the states."),
  usV1("checks-balances", "Checks and balances", "Each branch can limit the others (e.g., veto, override, judicial review, Senate confirmation)."),
  usV2("judicial-review", "Judicial review", "The power of courts to declare laws and government actions unconstitutional; established in Marbury v. Madison (1803)."),
  usV2("stare-decisis", "Stare decisis", "The principle that courts follow precedent from earlier decisions."),
  usV2("filibuster", "Filibuster", "Senate tactic of extended debate to delay or block a vote."),
  usV2("cloture", "Cloture", "Senate vote to end debate; requires three-fifths (60 senators) for most legislation."),
  usV2("discharge-petition", "Discharge petition", "House procedure to force a bill out of committee with signatures of a majority (218) of members."),
  usV2("logrolling", "Logrolling", "Vote trading among legislators to pass each other's priorities."),
  usV2("pork-barrel", "Pork barrel spending", "Legislation directing money to projects in a member's district, often via earmarks."),
  usV2("gerrymandering", "Gerrymandering", "Drawing district boundaries to advantage a party or group."),
  usV2("executive-order", "Executive order", "A presidential directive to the executive branch with the force of law; can be revoked, superseded, or struck down."),
  usV2("executive-agreement", "Executive agreement", "An international agreement made by the president without Senate ratification."),
  usV2("pocket-veto", "Pocket veto", "If Congress adjourns within 10 days of sending a bill and the president doesn't sign it, the bill dies."),
  usV2("signing-statement", "Signing statement", "A president's written comments when signing a bill, sometimes signaling how parts will be interpreted or enforced."),
  usV2("bureaucratic-discretion", "Bureaucratic discretion", "Agencies' power to decide how to implement laws, often through rulemaking."),
  usV2("iron-triangle", "Iron triangle", "Stable relationship among a congressional committee, an agency, and an interest group."),
  usV3("selective-incorporation", "Selective incorporation", "Applying Bill of Rights protections to states case by case through the Fourteenth Amendment's Due Process Clause."),
  usV3("exclusionary-rule", "Exclusionary rule", "Illegally obtained evidence is generally inadmissible in court (Fourth Amendment; Mapp v. Ohio)."),
  usV3("prior-restraint", "Prior restraint", "Government blocking publication in advance; presumed unconstitutional (NYT v. United States)."),
  usV3("symbolic-speech", "Symbolic speech", "Conduct that expresses a message, such as armbands or flag burning; protected by the First Amendment."),
  usV3("establishment-clause", "Establishment Clause", "First Amendment clause barring government establishment or sponsorship of religion (Engel v. Vitale)."),
  usV3("free-exercise-clause", "Free Exercise Clause", "First Amendment clause protecting the practice of religion (Wisconsin v. Yoder)."),
  usV3("equal-protection", "Equal Protection Clause", "Fourteenth Amendment: states may not deny any person equal protection of the laws (Brown v. Board)."),
  usV4("political-socialization", "Political socialization", "The process through which people develop political beliefs and values (family, schools, peers, media)."),
  usV4("margin-of-error", "Margin of error", "The range within which the true population value likely falls; differences smaller than it may not be real."),
  usV4("tracking-poll", "Tracking poll", "A poll repeated over time to measure changes in opinion."),
  usV4("fiscal-policy", "Fiscal policy", "Taxing and spending decisions made by Congress and the president."),
  usV4("monetary-policy", "Monetary policy", "Management of interest rates and the money supply by the Federal Reserve."),
  usV5("retrospective-voting", "Retrospective voting", "Voting based on an incumbent's or party's past performance."),
  usV5("political-efficacy", "Political efficacy", "A citizen's belief that they can understand and influence politics."),
  usV5("free-rider", "Free-rider problem", "People benefit from a group's work without contributing, making large groups harder to organize."),
  usV5("super-pac", "Super PAC", "Independent-expenditure-only committee that can raise and spend unlimited money but cannot coordinate with candidates."),
  usV5("realignment", "Realignment", "A durable shift in party coalitions, often marked by a critical election (e.g., 1932)."),
  usV5("linkage-institutions", "Linkage institutions", "Channels connecting citizens to government: parties, elections, interest groups, and the media."),
  usV5("amicus-brief", "Amicus curiae brief", "A \"friend of the court\" brief filed by a group not party to a case to influence the decision."),
];

// ------------------------------------------------------------ U.S. concepts
const usC = deck("usgov", "concepts");
const usConcepts: Flashcard[] = [
  { ...usC("democracy-models", "Participatory vs. pluralist vs. elite democracy", "Participatory: broad direct citizen involvement. Pluralist: groups compete for influence. Elite: a wealthy, educated few hold outsized influence."), unitId: "usgov-u1" },
  { ...usC("great-compromise", "Great (Connecticut) Compromise", "Bicameral Congress: House by population, Senate with two senators per state."), unitId: "usgov-u1" },
  { ...usC("three-fifths", "Three-Fifths Compromise", "Counted three-fifths of the enslaved population for representation and taxation."), unitId: "usgov-u1" },
  { ...usC("dual-coop", "Dual vs. cooperative federalism", "Dual (\"layer cake\"): separate spheres. Cooperative (\"marble cake\"): shared responsibilities and funding, expanding since the New Deal."), unitId: "usgov-u1" },
  { ...usC("representation-models", "Trustee vs. delegate vs. politico", "Trustee: own judgment. Delegate: follows constituents. Politico: switches depending on the issue."), unitId: "usgov-u2" },
  { ...usC("activism-restraint", "Judicial activism vs. restraint", "Activism: willingness to overturn laws or precedent. Restraint: deference to elected branches and precedent."), unitId: "usgov-u2" },
  { ...usC("liberties-rights", "Civil liberties vs. civil rights", "Liberties: freedoms from government interference. Rights: protection from discrimination and guarantees of equal treatment."), unitId: "usgov-u3" },
  { ...usC("generational-lifecycle", "Generational vs. life-cycle effects", "Generational: shared formative events shape a cohort. Life-cycle: views shift as people age and circumstances change."), unitId: "usgov-u4" },
  { ...usC("keynes-supply", "Keynesian vs. supply-side economics", "Keynesian: government spending boosts demand in downturns. Supply-side: tax cuts and deregulation boost production."), unitId: "usgov-u4" },
  { ...usC("core-values", "Five core American values", "Individualism, equality of opportunity, free enterprise, rule of law, limited government."), unitId: "usgov-u4" },
  { ...usC("voting-models", "Four voting models", "Rational choice (self-interest), retrospective (past performance), prospective (future promises), party-line."), unitId: "usgov-u5" },
  { ...usC("incumbency", "Incumbency advantage", "Name recognition, fundraising, casework, franking, and safe districts help incumbents win reelection."), unitId: "usgov-u5" },
  { ...usC("media-roles", "Media roles", "Gatekeeper (what's covered), scorekeeper (who's winning), watchdog (investigating officials)."), unitId: "usgov-u5" },
  { ...usC("two-party", "Why two parties?", "Single-member, winner-take-all districts make it hard for third parties to win seats (Duverger's law)."), unitId: "usgov-u5" },
];

// ------------------------------------------------------------ U.S. institutions
const usI = deck("usgov", "institutions");
const usInstitutions: Flashcard[] = [
  { ...usI("house-powers", "Unique powers of the House", "Originate revenue bills; impeach officials; choose the president if no Electoral College majority."), unitId: "usgov-u2" },
  { ...usI("senate-powers", "Unique powers of the Senate", "Confirm appointments; ratify treaties (two-thirds); try impeachments."), unitId: "usgov-u2" },
  { ...usI("rules-committee", "House Rules Committee", "Sets the terms of debate and amendment for most bills, giving majority leadership agenda control."), unitId: "usgov-u2" },
  { ...usI("speaker", "Speaker of the House", "Presiding officer and majority-party leader; controls committee assignments and the floor agenda."), unitId: "usgov-u2" },
  { ...usI("conference-committee", "Conference committee", "Temporary joint committee that reconciles House and Senate versions of a bill."), unitId: "usgov-u2" },
  { ...usI("cert", "Writ of certiorari", "Order to review a lower-court case; granted if four justices agree (rule of four)."), unitId: "usgov-u2" },
  { ...usI("independent-agency", "Independent regulatory agency", "Agency regulating a sector with some insulation from presidential control (e.g., FCC)."), unitId: "usgov-u2" },
  { ...usI("fed", "Federal Reserve", "Independent central bank that sets monetary policy, insulated from short-term political pressure."), unitId: "usgov-u4" },
  { ...usI("fec", "Federal Election Commission (FEC)", "Independent agency that administers and enforces federal campaign finance law."), unitId: "usgov-u5" },
  { ...usI("electoral-college", "Electoral College", "538 electors (House + Senate seats, plus 3 for D.C.); 270 needed to win; most states winner-take-all."), unitId: "usgov-u5" },
];

// ------------------------------------------------------------ Comp vocabulary
const cgV1 = deck("compgov", "vocabulary", "compgov-u1");
const cgV3 = deck("compgov", "vocabulary", "compgov-u3");
const cgV4 = deck("compgov", "vocabulary", "compgov-u4");
const cgV5 = deck("compgov", "vocabulary", "compgov-u5");
const compVocabulary: Flashcard[] = [
  cgV1("state", "State", "A political organization with sovereignty over a territory and population and a monopoly on the legitimate use of force."),
  cgV1("nation", "Nation", "A group of people who share an identity (language, culture, history) and often seek self-government."),
  cgV1("regime", "Regime", "The fundamental rules and norms of politics that persist across different governments."),
  cgV1("sovereignty", "Sovereignty", "A state's ability to act within its borders independently of outside interference."),
  cgV1("legitimacy", "Legitimacy", "The public's belief that a government has the right to rule."),
  cgV1("weber", "Traditional, charismatic, rational-legal authority", "Weber's sources of legitimacy: custom and history; a leader's personal appeal; laws and procedures."),
  cgV1("empirical-normative", "Empirical vs. normative", "Empirical: based on observable facts. Normative: based on values about what ought to be."),
  cgV1("democratization", "Democratization", "Transition from authoritarian rule toward democracy (e.g., Mexico by 2000)."),
  cgV1("devolution", "Devolution", "Transfer of power from the central government to regions in a unitary state (e.g., UK since 1998)."),
  cgV3("cleavage", "Cleavage", "A societal division (ethnic, religious, regional, class) that shapes political conflict."),
  cgV3("coinciding", "Coinciding vs. cross-cutting cleavages", "Coinciding cleavages reinforce each other and intensify conflict; cross-cutting cleavages overlap and moderate it."),
  cgV3("socialization", "Political socialization", "How people acquire political values — via family, schools, media, religion, and (in authoritarian states) the state."),
  cgV4("smd", "Single-member district (SMD)", "One representative per district, chosen by plurality; tends to produce two-party systems."),
  cgV4("pr", "Proportional representation (PR)", "Seats allocated in proportion to vote share; tends to produce multiparty systems."),
  cgV4("mixed", "Mixed electoral system", "Combines SMD and PR seats (Mexico's Chamber of Deputies, Russia's State Duma)."),
  cgV4("threshold", "Electoral threshold", "Minimum vote share for PR seats (e.g., 5% in Russia's Duma)."),
  cgV4("corporatism", "Corporatism", "State recognizes a limited number of groups to represent sectors (e.g., PRI-era Mexico; state corporatism in China)."),
  cgV4("pluralism", "Pluralism", "Many independent groups compete to influence policy (e.g., UK)."),
  cgV4("civil-society", "Civil society", "Voluntary organizations outside the state through which citizens pursue shared interests."),
  cgV4("co-optation", "Co-optation", "Bringing potential opponents into the system with benefits or positions to neutralize them."),
  cgV5("rentier", "Rentier state", "A state reliant on natural-resource revenue rather than taxes (Nigeria, Russia, Iran)."),
  cgV5("resource-curse", "Resource curse", "Tendency of resource-rich states toward corruption, weak accountability, and volatile growth."),
  cgV5("neoliberalism", "Neoliberalism", "Market-oriented policies: privatization, deregulation, free trade."),
  cgV5("gini", "Gini coefficient", "Measure of income inequality from 0 (equal) to 1 (unequal)."),
  cgV5("hdi", "Human Development Index (HDI)", "Composite of life expectancy, education, and income."),
  cgV5("sez", "Special economic zones", "Areas with market-friendly rules to attract investment, pioneered by China from 1980."),
];

// ------------------------------------------------------------ Comp concepts & institutions
const cgC = deck("compgov", "concepts");
const compConcepts: Flashcard[] = [
  { ...cgC("parl-pres", "Parliamentary vs. presidential", "Parliamentary: executive drawn from and accountable to the legislature (no-confidence votes). Presidential: separately elected executive with a fixed term."), unitId: "compgov-u2" },
  { ...cgC("semi-pres", "Semi-presidential system", "Elected president plus a prime minister accountable to the legislature (Russia)."), unitId: "compgov-u2" },
  { ...cgC("head-state-gov", "Head of state vs. head of government", "Head of state: symbolic representative. Head of government: runs the government. UK: monarch vs. PM."), unitId: "compgov-u2" },
  { ...cgC("parliamentary-sovereignty", "Parliamentary sovereignty", "UK principle that Parliament is supreme; courts cannot strike down acts of Parliament."), unitId: "compgov-u2" },
  { ...cgC("velayat", "Velayat-e faqih", "Guardianship of the Islamic jurist — the principle giving Iran's Supreme Leader ultimate authority."), unitId: "compgov-u1" },
  { ...cgC("democratic-centralism", "Democratic centralism", "Leninist principle: debate within the party, then strict obedience to decisions from the top (China)."), unitId: "compgov-u2" },
  { ...cgC("nomenklatura", "Nomenklatura", "Party control over appointments to key positions (China)."), unitId: "compgov-u2" },
  { ...cgC("party-systems", "Party system types", "One-party (China), dominant-party (Russia; Mexico's PRI historically), two-party-dominant (UK), competitive multiparty."), unitId: "compgov-u4" },
];

const cgI = deck("compgov", "institutions");
const compInstitutions: Flashcard[] = [
  { ...cgI("guardian-council", "Guardian Council (Iran)", "12 members (6 clerics named by the Supreme Leader, 6 jurists); vets candidates and reviews Majles legislation."), unitId: "compgov-u2" },
  { ...cgI("assembly-experts", "Assembly of Experts (Iran)", "88 elected clerics who choose — and can in principle remove — the Supreme Leader. Chose Mojtaba Khamenei in March 2026."), unitId: "compgov-u2" },
  { ...cgI("expediency", "Expediency Council (Iran)", "Resolves disputes between the Majles and the Guardian Council; advises the Supreme Leader."), unitId: "compgov-u2" },
  { ...cgI("npc", "National People's Congress (China)", "~3,000 indirectly elected deputies; formally the highest state organ, in practice approves party decisions."), unitId: "compgov-u2" },
  { ...cgI("psc", "Politburo Standing Committee (China)", "The small group at the top of the Communist Party that holds real decision-making power."), unitId: "compgov-u2" },
  { ...cgI("duma", "State Duma (Russia)", "450-member lower house; mixed SMD/PR with a 5% threshold; dominated by United Russia."), unitId: "compgov-u2" },
  { ...cgI("lords", "House of Lords (UK)", "Unelected upper chamber (mostly life peers); can revise and delay but not ultimately block most bills."), unitId: "compgov-u2" },
  { ...cgI("commons", "House of Commons (UK)", "650 members elected by first past the post; chooses and can remove the government."), unitId: "compgov-u2" },
  { ...cgI("ine", "INE (Mexico)", "National Electoral Institute; independent election administrator central to Mexico's democratization."), unitId: "compgov-u4" },
  { ...cgI("inec", "INEC (Nigeria)", "Independent National Electoral Commission; administers Nigerian elections."), unitId: "compgov-u4" },
];

// ------------------------------------------------------------ Countries
const cgK = deck("compgov", "countries");
const compCountries: Flashcard[] = [
  cgK("uk-system", "United Kingdom — system", "Parliamentary constitutional monarchy; uncodified constitution; unitary with devolution."),
  cgK("uk-elections", "United Kingdom — elections", "First past the post in 650 single-member constituencies; disproportional results."),
  cgK("uk-2026", "United Kingdom — 2026 leadership change", "Andy Burnham became PM in July 2026 after Keir Starmer resigned — no general election needed in a parliamentary system."),
  cgK("mx-system", "Mexico — system", "Federal presidential republic; president serves one six-year term (sexenio) with no reelection."),
  cgK("mx-2000", "Mexico — why 2000 matters", "PAN's Vicente Fox won the presidency, ending about 70 years of PRI dominance."),
  cgK("mx-judiciary", "Mexico — 2024 judicial reform", "Introduced popular election of judges, including Supreme Court justices; first judicial elections in 2025."),
  cgK("ng-system", "Nigeria — system", "Federal presidential republic; 36 states + FCT; Fourth Republic since 1999 after military rule."),
  cgK("ng-election-rule", "Nigeria — presidential election rule", "Winner needs a plurality plus at least 25% of the vote in two-thirds of the states."),
  cgK("ng-cleavages", "Nigeria — cleavages", "Coinciding ethnic, religious, regional cleavages: Hausa-Fulani (Muslim north), Yoruba (southwest), Igbo (southeast)."),
  cgK("ru-system", "Russia — system", "Semi-presidential federation; authoritarian in practice; power recentralized since 2000."),
  cgK("ru-terms", "Russia — 2020 amendments", "Reset the sitting president's term count, allowing Putin to run again in 2024 (and potentially 2030)."),
  cgK("ru-civil", "Russia — civil society", "Foreign agents and \"undesirable organization\" laws restrict NGOs and independent media."),
  cgK("cn-system", "China — system", "One-party communist party-state; the CCP directs state institutions; unitary."),
  cgK("cn-terms", "China — 2018 amendment", "Removed presidential term limits, allowing Xi Jinping to stay beyond two terms."),
  cgK("cn-economy", "China — economic reform", "Deng Xiaoping's reforms from 1978: SEZs, opening to investment, WTO entry in 2001; state capitalism."),
  cgK("ir-system", "Iran — system", "Theocratic republic (velayat-e faqih); elected president and Majles constrained by unelected clerical bodies."),
  cgK("ir-2026", "Iran — 2026 succession", "Ali Khamenei was killed in U.S.-Israeli strikes (Feb 2026); the Assembly of Experts chose Mojtaba Khamenei (Mar 2026)."),
  cgK("ir-participation", "Iran — participation", "Record-low turnout (~41% in 2024 legislative election); protest waves in 2009, 2017–19, and 2022."),
];

// ------------------------------------------------------------ Derived decks
const scotusCards: Flashcard[] = CASES.map((c): Flashcard => ({
  id: `fc-us-scotus-${c.id}`,
  courseId: "usgov",
  deck: "scotus",
  unitId: c.unitId,
  front: `${c.name} (${c.year})${c.required ? " · Required" : ""}`,
  back: `${c.decision}\n\nPrinciple: ${c.principle}`,
  tags: [c.cluster, ...(c.required ? ["required"] : [])],
}));

const documentCards: Flashcard[] = DOCUMENTS.map((d): Flashcard => ({
  id: `fc-us-documents-${d.id}`,
  courseId: "usgov",
  deck: "documents",
  unitId: d.unitIds[0],
  front: `${d.title} (${d.year})`,
  back: `${d.mainArgument}\n\nKey ideas: ${d.keyIdeas.join(", ")}`,
}));

export const FLASHCARDS: Flashcard[] = [
  ...usVocabulary,
  ...usConcepts,
  ...usInstitutions,
  ...scotusCards,
  ...documentCards,
  ...compVocabulary,
  ...compConcepts,
  ...compInstitutions,
  ...compCountries,
];
