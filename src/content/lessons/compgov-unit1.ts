import type { Lesson } from "../types";

export const compgovUnit1: Lesson[] = [
  {
    id: "comp-comparative-method",
    courseId: "compgov",
    unitId: "compgov-u1",
    title: "States, Nations, Regimes & the Comparative Method",
    minutes: 15,
    tags: ["state", "nation", "regime", "government", "sovereignty", "comparative method", "empirical", "normative", "correlation", "causation"],
    overview:
      "Comparative politics begins with precise vocabulary. A state is a political organization with sovereignty over a territory; a nation is a people who share an identity; a regime is the set of rules that endures across governments; a government is the group of people in power. Political scientists compare cases to find patterns — carefully distinguishing correlation from causation.",
    keyConcepts: [
      { term: "State", definition: "A political organization that has sovereignty over a defined territory and population, with a government that controls the legitimate use of force." },
      { term: "Nation", definition: "A group of people who share a common identity — language, culture, history, or ethnicity — and often desire self-government." },
      { term: "Regime", definition: "The fundamental rules and norms governing how power is exercised, which typically outlast individual leaders." },
      { term: "Government", definition: "The specific leaders and institutions in power at a given time." },
      { term: "Sovereignty", definition: "The ability of a state to carry out actions and policies within its borders independently of outside interference." },
      { term: "Empirical statement", definition: "A claim based on observable facts and data." },
      { term: "Normative statement", definition: "A claim based on values or opinions about what ought to be." },
    ],
    deepDive: [
      {
        heading: "State, nation, regime, government",
        body: "The United Kingdom is one **state** that contains several **nations** — England, Scotland, Wales, and Northern Ireland. Nigeria is a state with more than 250 ethnic groups and no single dominant national identity, which complicates nation-building. Iran's **regime** — a theocratic Islamic Republic — has persisted since 1979 even as **governments** led by different presidents come and go. When a new party wins power in the UK, the government changes but the regime does not.",
      },
      {
        heading: "How comparativists reason",
        body: "Comparative political scientists use **empirical** evidence to test claims and try to separate them from **normative** judgments. They also watch for the difference between **correlation** (two things occur together) and **causation** (one produces the other). For example, higher GDP per capita correlates with democracy, but that doesn't prove that wealth causes democracy — other factors, such as education or institutions, may explain both.",
      },
      {
        heading: "Why these six countries",
        body: "The six course countries span a range of regimes: an established parliamentary democracy (UK), a federal presidential democracy that transitioned from dominant-party rule (Mexico), a federal presidential system with a history of military rule (Nigeria), an authoritarian semi-presidential system (Russia), a one-party communist state (China), and a theocratic republic (Iran). Comparing them lets you test concepts across very different settings.",
      },
    ],
    example: {
      heading: "Government change, regime continuity",
      body: "When the Labour Party won the UK's 2024 general election, the government changed — a new prime minister and cabinet took office — but the regime, a constitutional monarchy with parliamentary sovereignty, did not. In contrast, Iran's 1979 revolution replaced a monarchy with a theocratic republic: a regime change.",
    },
    examConnection: {
      body: "Concept Application questions frequently ask you to define a term like regime or sovereignty and apply it to a course country. Multiple-choice questions test empirical versus normative statements and correlation versus causation, often with a data stimulus.",
      tip: "If a claim includes words like \"should,\" \"better,\" or \"fair,\" it's normative. If it can be checked with data, it's empirical.",
    },
    commonMistakes: [
      { mistake: "Using \"state\" and \"nation\" interchangeably.", correction: "A state is a political-legal entity; a nation is a people with shared identity. Many states contain multiple nations." },
      { mistake: "Calling any election a regime change.", correction: "Elections usually change governments. A regime change alters the fundamental rules of the political system." },
      { mistake: "Inferring causation from correlation.", correction: "A correlation shows association only; causation requires ruling out other explanations." },
    ],
    relatedCountryIds: ["uk", "nigeria", "iran"],
  },
  {
    id: "comp-democracy-authoritarianism",
    courseId: "compgov",
    unitId: "compgov-u1",
    title: "Democracy, Authoritarianism & Regime Change",
    minutes: 17,
    tags: ["democracy", "authoritarianism", "illiberal democracy", "hybrid regime", "competitive authoritarianism", "democratization", "rule of law", "transparency", "theocracy", "one-party state", "military rule", "democratic backsliding"],
    overview:
      "Democracies hold free and fair elections, protect civil liberties, and uphold the rule of law. Authoritarian regimes concentrate power and restrict competition. Many countries fall in between. Democratization — and its reversal — is a central theme across the six course countries.",
    keyConcepts: [
      { term: "Democracy", definition: "A regime with competitive, free, and fair elections, protected civil liberties, rule of law, and an independent judiciary." },
      { term: "Authoritarianism", definition: "A regime in which power is concentrated in a leader or small elite not accountable to the public through meaningful elections." },
      { term: "Illiberal democracy", definition: "A regime with elections but weak protection of civil liberties and limited rule of law." },
      { term: "Rule of law", definition: "Laws are applied equally and consistently, and leaders are subject to them." },
      { term: "Democratization", definition: "The transition from an authoritarian regime toward democracy." },
      { term: "Democratic backsliding", definition: "The erosion of democratic institutions and norms, often gradually and through legal means." },
    ],
    deepDive: [
      {
        heading: "Defining the spectrum",
        body: "Democracies and authoritarian regimes both hold elections — what differs is whether elections are **free, fair, and competitive**. The **UK** has long-established democratic institutions. **Mexico** and **Nigeria** are electoral democracies that have faced challenges with corruption, violence, and rule of law. **Russia** holds elections but restricts opposition and media, making it authoritarian. **China** is a one-party state. **Iran** combines elected institutions with unelected clerical bodies that vet candidates and override decisions.",
      },
      {
        heading: "Pathways of democratization",
        body: "Mexico democratized gradually: the PRI ruled for about seven decades until electoral reforms and an independent electoral institute enabled opposition victories, culminating in Vicente Fox's presidential win in **2000**. Nigeria transitioned from military rule to civilian government in **1999**, and in **2015** an incumbent president lost and peacefully handed over power — an important democratic milestone. Russia briefly liberalized in the 1990s before power recentralized under Vladimir Putin.",
      },
      {
        heading: "Why regimes change — or don't",
        body: "Regimes change through elections, negotiated transitions, revolutions, coups, or gradual erosion. Economic crises, elite splits, mass protest, and international pressure can destabilize regimes. Authoritarian regimes survive through a mix of repression, co-optation, performance legitimacy, and control of information.",
      },
    ],
    example: {
      heading: "A peaceful transfer in Nigeria",
      body: "In 2015, Muhammadu Buhari of the All Progressives Congress defeated incumbent Goodluck Jonathan of the People's Democratic Party. Jonathan conceded, marking the first time in Nigeria's history that an incumbent president lost to an opposition candidate and handed over power peacefully.",
    },
    examConnection: {
      body: "Expect questions asking you to classify regimes using evidence, explain why a transition succeeded or stalled, or describe a measure of democracy. Argument Essays may ask which factor most promotes democratization.",
      tip: "Always justify a regime classification with a specific institution or practice — for example, Iran's Guardian Council disqualifying candidates.",
    },
    commonMistakes: [
      { mistake: "Assuming elections make a country democratic.", correction: "Elections must be free, fair, and competitive, with civil liberties protected, to indicate democracy." },
      { mistake: "Treating democratization as irreversible.", correction: "Democratic backsliding can reverse gains, as the recentralization of power in Russia shows." },
      { mistake: "Classifying all authoritarian regimes the same way.", correction: "Authoritarian regimes vary: one-party states (China), theocracies (Iran), personalist or competitive authoritarian regimes (Russia), and military regimes." },
    ],
    relatedCountryIds: ["mexico", "nigeria", "russia", "china", "iran", "uk"],
  },
  {
    id: "comp-legitimacy",
    courseId: "compgov",
    unitId: "compgov-u1",
    title: "Sources of Power, Legitimacy & Stability",
    minutes: 16,
    tags: ["legitimacy", "traditional authority", "charismatic authority", "rational-legal authority", "performance legitimacy", "nationalism", "religion", "ideology", "state capacity", "failed state", "stability"],
    overview:
      "Legitimacy is the belief that a government has the right to rule. Regimes draw legitimacy from tradition, charismatic leaders, legal rules, economic performance, religion, ideology, and nationalism. Legitimate, effective governments tend to be more stable; those that lose legitimacy may rely on coercion.",
    keyConcepts: [
      { term: "Legitimacy", definition: "The public's acceptance of a government's right to rule." },
      { term: "Traditional legitimacy", definition: "Authority based on custom and history, such as a hereditary monarchy." },
      { term: "Charismatic legitimacy", definition: "Authority based on a leader's personal qualities and appeal." },
      { term: "Rational-legal legitimacy", definition: "Authority based on laws, rules, and procedures, such as a constitution and elections." },
      { term: "Performance legitimacy", definition: "Authority based on delivering results, especially economic growth and stability." },
      { term: "State capacity", definition: "A state's ability to carry out its functions, such as collecting taxes, providing services, and maintaining order." },
    ],
    deepDive: [
      {
        heading: "Weber's three types — and more",
        body: "Max Weber distinguished **traditional**, **charismatic**, and **rational-legal** authority. The British monarchy draws on tradition; Ayatollah Khomeini's leadership of Iran's revolution illustrates charisma; the UK's elected Parliament and Mexico's constitutional elections illustrate rational-legal authority. Comparativists add **performance** (China's economic growth), **religion** (Iran's Islamic Republic), **ideology** (communism in China), and **nationalism** (Russia's appeals to national greatness).",
      },
      {
        heading: "How regimes maintain legitimacy",
        body: "Democracies rely on elections, rule of law, and responsive government. Authoritarian regimes combine **performance legitimacy** with control of information, nationalism, and selective repression. China's Communist Party has tied its legitimacy to rising living standards and national rejuvenation. Russia's leadership has emphasized stability after the 1990s and national pride.",
      },
      {
        heading: "When legitimacy erodes",
        body: "Falling voter turnout, protests, and corruption scandals can signal declining legitimacy. In Iran, turnout in recent elections fell to historic lows, and mass protests — such as those in 2022 after the death of Mahsa Amini — challenged the regime. Nigeria's EndSARS protests in 2020 reflected anger at police abuse. Low state capacity can also undermine legitimacy when governments fail to provide security or services.",
      },
    ],
    example: {
      heading: "Performance legitimacy in China",
      body: "China's rapid economic growth since the reforms that began in 1978 lifted hundreds of millions out of poverty. The Communist Party points to this record as justification for its rule. If growth slows significantly, performance-based legitimacy could come under pressure — a common argument about the regime's long-term challenges.",
    },
    examConnection: {
      body: "Concept Application questions often ask you to describe a source of legitimacy and explain how a specific country uses it. Quantitative questions may use turnout data as evidence of changing legitimacy.",
      tip: "Name the source (e.g., religion), give the country example (Iran's Supreme Leader), and explain the mechanism (clerical authority justifies policy).",
    },
    commonMistakes: [
      { mistake: "Assuming authoritarian regimes have no legitimacy.", correction: "Authoritarian regimes can have substantial legitimacy based on performance, nationalism, religion, or ideology." },
      { mistake: "Equating legitimacy with popularity.", correction: "A government can be unpopular while the regime remains legitimate, as when voters reject a party but accept the system." },
      { mistake: "Using turnout as a perfect measure of legitimacy.", correction: "Turnout is one indicator; it can also reflect apathy, convenience, or coercion." },
    ],
    relatedCountryIds: ["china", "iran", "russia", "uk", "nigeria"],
  },
  {
    id: "comp-federal-unitary",
    courseId: "compgov",
    unitId: "compgov-u1",
    title: "Federal vs. Unitary Systems & Devolution",
    minutes: 15,
    tags: ["federalism", "unitary state", "devolution", "decentralization", "recentralization", "Scotland", "Wales", "Northern Ireland", "Nigeria states", "Mexico states", "Russia federal subjects"],
    overview:
      "Unitary states concentrate authority in the central government; federal states constitutionally divide power between national and regional governments. Devolution transfers power from the center to regions without making the state federal. The six course countries show how formal structure and actual practice can differ.",
    keyConcepts: [
      { term: "Unitary system", definition: "The central government holds ultimate authority; regional governments exist at its discretion." },
      { term: "Federal system", definition: "The constitution divides power between the national government and subnational units." },
      { term: "Devolution", definition: "The transfer of power from a central government to regional governments in a unitary system." },
      { term: "Decentralization", definition: "Shifting policy responsibilities from the center to lower levels of government." },
      { term: "Recentralization", definition: "The central government reclaiming power from regional authorities." },
    ],
    deepDive: [
      {
        heading: "Unitary states: UK, China, Iran",
        body: "The **UK** is a unitary state, but since 1998 it has **devolved** significant power to a Scottish Parliament, a Welsh Senedd, and a Northern Ireland Assembly. Parliament in Westminster remains sovereign and could, in principle, change these arrangements. **China** is unitary, with provinces implementing central policy, although local officials have substantial discretion in implementation and economic management. **Iran** is unitary and highly centralized.",
      },
      {
        heading: "Federal states: Mexico, Nigeria, Russia",
        body: "**Mexico** is a federal republic with 31 states and Mexico City. **Nigeria** is a federal republic with 36 states and a Federal Capital Territory; its federalism was designed partly to manage ethnic and regional diversity, and 12 northern states have adopted sharia-based criminal law. **Russia** is formally federal, but since 2000 the central government has **recentralized** power — for example, through federal districts and greater control over regional leaders.",
      },
      {
        heading: "Why structure matters",
        body: "Federalism can accommodate diversity and provide multiple access points, but it can also create conflicts over resources — such as oil revenue distribution in Nigeria. Devolution can reduce separatist pressure, as in the UK, or can strengthen demands for independence, as with Scotland's 2014 referendum. Formal federalism does not guarantee real regional autonomy, as Russia shows.",
      },
    ],
    example: {
      heading: "Scotland's referendum",
      body: "Devolution gave Scotland its own parliament with power over areas such as education and health. The Scottish National Party's rise led to a 2014 independence referendum, in which voters chose to remain in the UK. Devolution addressed some demands for autonomy while also giving independence advocates a platform.",
    },
    examConnection: {
      body: "Comparative Analysis questions often ask you to compare how two course countries distribute power between levels of government. Know which countries are federal and which are unitary, and be ready to explain devolution in the UK and recentralization in Russia.",
      tip: "Federal: Mexico, Nigeria, Russia. Unitary: UK (with devolution), China, Iran.",
    },
    commonMistakes: [
      { mistake: "Calling the UK federal because of devolution.", correction: "The UK remains unitary; devolved powers exist at Parliament's discretion." },
      { mistake: "Assuming formal federalism means strong regions.", correction: "Russia is formally federal, but power has been heavily recentralized." },
      { mistake: "Claiming China's provinces have no discretion.", correction: "China is unitary, but local officials have significant discretion in implementing policy." },
    ],
    relatedCountryIds: ["uk", "mexico", "nigeria", "russia", "china", "iran"],
  },
];
