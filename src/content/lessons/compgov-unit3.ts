import type { Lesson } from "../types";

export const compgovUnit3: Lesson[] = [
  {
    id: "comp-political-culture",
    courseId: "compgov",
    unitId: "compgov-u3",
    title: "Political Culture, Socialization & Ideology",
    minutes: 15,
    tags: ["political culture", "political socialization", "ideology", "liberalism", "communism", "socialism", "fascism", "populism", "Confucianism", "nationalism"],
    overview:
      "Political culture is a society's shared attitudes about politics and government. It is transmitted through socialization — family, schools, religion, media, and the state itself. Ideologies such as liberalism, socialism, communism, fascism, and populism offer competing visions of the proper relationship between individuals and the state.",
    keyConcepts: [
      { term: "Political culture", definition: "Collective beliefs, values, and attitudes about politics and government." },
      { term: "Political socialization", definition: "The process by which people acquire political beliefs and values." },
      { term: "Liberalism", definition: "An ideology emphasizing individual rights, limited government, and free markets." },
      { term: "Communism", definition: "An ideology advocating collective ownership, the elimination of class distinctions, and, in practice, a single ruling party." },
      { term: "Socialism", definition: "An ideology supporting significant government involvement in the economy to reduce inequality." },
      { term: "Fascism", definition: "An authoritarian, nationalist ideology that subordinates the individual to the state." },
      { term: "Populism", definition: "A political approach claiming to represent ordinary people against a corrupt elite." },
    ],
    deepDive: [
      {
        heading: "Agents of socialization — including the state",
        body: "In democracies, socialization is pluralistic: families, schools, religious institutions, and independent media all shape beliefs. In authoritarian regimes, the **state** plays a larger role. China's education system and state media promote party-approved narratives; patriotic education campaigns emphasize national unity. Iran's schools and state media promote the values of the Islamic Republic. Russia's state television dominates news for many citizens.",
      },
      {
        heading: "Culture across the six countries",
        body: "The UK's political culture emphasizes tradition, gradual change, and pragmatism. Mexico's includes a legacy of clientelism and corporatism from the PRI era, alongside growing demands for accountability. Nigeria's is shaped by ethnic and religious identities and by a history of military rule. China's draws on Confucian ideas of hierarchy and social harmony combined with Communist Party ideology. Iran's blends Shia Islam, revolutionary ideology, and Persian nationalism.",
      },
      {
        heading: "Ideology and the state",
        body: "Regimes use ideology to justify rule. China's leaders describe \"socialism with Chinese characteristics.\" Iran's regime rests on the ideology of guardianship of the Islamic jurist. Populist leaders across many countries — including in Mexico and elsewhere — frame politics as the people against elites.",
      },
    ],
    example: {
      heading: "Patriotic education in China",
      body: "Chinese schools teach a curriculum emphasizing the Communist Party's role in national rejuvenation and the humiliation China suffered at the hands of foreign powers. This deliberate socialization aims to build support for the party and reinforce performance and nationalist legitimacy.",
    },
    examConnection: {
      body: "Questions often ask how a government uses socialization to maintain legitimacy, or ask you to identify an ideology from a description.",
      tip: "In authoritarian states, look for the state as an agent of socialization — through schools, media, and campaigns.",
    },
    commonMistakes: [
      { mistake: "Treating political culture as unchanging.", correction: "Political culture evolves with generational change, economic development, and major events." },
      { mistake: "Assuming socialization is always voluntary.", correction: "Authoritarian regimes often direct socialization through state-controlled media and education." },
      { mistake: "Using \"liberal\" in the modern American sense.", correction: "In comparative politics, liberalism usually means individual rights, limited government, and markets." },
    ],
    relatedCountryIds: ["china", "iran", "russia", "uk", "mexico", "nigeria"],
  },
  {
    id: "comp-participation",
    courseId: "compgov",
    unitId: "compgov-u3",
    title: "Political Participation & Protest",
    minutes: 15,
    tags: ["political participation", "voluntary participation", "coerced participation", "protest", "social movements", "turnout", "EndSARS", "Woman Life Freedom", "Zapatistas", "compulsory voting"],
    overview:
      "Participation includes voting, joining organizations, contacting officials, and protesting. Democracies generally encourage voluntary participation; authoritarian regimes may mobilize participation to display support while restricting independent activity. Protest is a key way citizens pressure governments in both.",
    keyConcepts: [
      { term: "Voluntary participation", definition: "Participation that citizens choose freely." },
      { term: "Coerced (mobilized) participation", definition: "Participation directed or pressured by the state to demonstrate support." },
      { term: "Social movement", definition: "A sustained, organized effort by people to achieve political or social change." },
      { term: "Voter turnout", definition: "The percentage of eligible voters who cast ballots." },
    ],
    deepDive: [
      {
        heading: "Voting and its meaning",
        body: "Turnout varies across the six countries and over time. In Iran, turnout in the 2024 parliamentary and presidential elections was historically low, which many analysts interpreted as a signal of disillusionment. In Russia, turnout figures are reported but elections are not competitive. In the UK, turnout in general elections is influenced by competitiveness and engagement. In China, citizens vote only in limited local elections.",
      },
      {
        heading: "Protest and movements",
        body: "Mexico's **Zapatista** uprising in Chiapas in 1994 drew attention to Indigenous rights and opposition to neoliberal trade policy. Nigeria's **EndSARS** protests in 2020 targeted police brutality and were organized largely through social media. Iran's **2022 protests** after the death of Mahsa Amini in custody, under the slogan \"Woman, Life, Freedom,\" challenged mandatory hijab laws and the regime itself. Russia has seen protests over election fraud (2011–12) and against the war in Ukraine, met with arrests.",
      },
      {
        heading: "State responses",
        body: "Governments respond to participation with accommodation, co-optation, or repression. Democracies generally tolerate peaceful protest; authoritarian regimes often restrict assembly, arrest leaders, and control the internet. Even authoritarian regimes sometimes make concessions to reduce unrest — such as China allowing limited local elections or responding to local environmental protests.",
      },
    ],
    example: {
      heading: "EndSARS",
      body: "In October 2020, young Nigerians organized protests demanding the disbanding of the Special Anti-Robbery Squad, a police unit accused of abuses. The government announced the unit's dissolution, but protests continued and were met with a violent crackdown in Lagos. The episode shows both the power of digital organizing and the limits of state responsiveness.",
    },
    examConnection: {
      body: "Questions often ask you to compare participation in a democracy and an authoritarian regime, or to explain how a government responded to a protest movement.",
      tip: "Always explain the mechanism: how does participation pressure the government, and what does the government's response reveal about the regime?",
    },
    commonMistakes: [
      { mistake: "Assuming high turnout indicates democracy.", correction: "Authoritarian regimes may report high turnout through mobilized participation." },
      { mistake: "Claiming protest never succeeds in authoritarian regimes.", correction: "Authoritarian regimes sometimes make concessions to reduce unrest, even while repressing leaders." },
      { mistake: "Treating all participation as voting.", correction: "Participation includes protest, joining groups, contacting officials, and online activism." },
    ],
    relatedCountryIds: ["iran", "nigeria", "mexico", "russia", "china", "uk"],
  },
  {
    id: "comp-civil-liberties-media",
    courseId: "compgov",
    unitId: "compgov-u3",
    title: "Citizenship, Civil Liberties & Media Control",
    minutes: 15,
    tags: ["civil liberties", "civil rights", "media", "censorship", "Great Firewall", "foreign agents law", "state media", "press freedom", "social credit", "internet shutdowns"],
    overview:
      "Civil liberties protect individuals from government; media freedom lets citizens hold leaders accountable. The six countries range from strong protections in the UK to tight control in China, Russia, and Iran, with Mexico and Nigeria in between — where legal protections exist but journalists face serious dangers.",
    keyConcepts: [
      { term: "Civil liberties", definition: "Protections of individual freedom from government interference, such as speech, press, and assembly." },
      { term: "State-controlled media", definition: "Media owned or directed by the government, used to shape public opinion." },
      { term: "Censorship", definition: "Government suppression of information or expression." },
      { term: "Great Firewall", definition: "China's system of internet controls that blocks foreign websites and filters content." },
      { term: "Foreign agents law (Russia)", definition: "Laws requiring organizations and individuals deemed to receive foreign support to register and label their materials, used to restrict NGOs and journalists." },
    ],
    deepDive: [
      {
        heading: "Media in democracies",
        body: "The **UK** has a free and pluralistic press, including the publicly funded but editorially independent BBC. **Mexico** has legal protections for the press, but it is one of the world's most dangerous countries for journalists, with violence linked to organized crime. **Nigeria** has a lively press, but journalists have faced arrests and government restrictions — for example, a temporary suspension of Twitter in 2021.",
      },
      {
        heading: "Media in authoritarian regimes",
        body: "**China** uses the Great Firewall, censorship of social media, and state media to shape information. **Russia** controls major television networks, has used foreign agents and \"undesirable organization\" laws to restrict independent media, and criminalized spreading \"false information\" about the military after 2022. **Iran** restricts media, blocks many foreign platforms, and has imposed internet shutdowns during protests.",
      },
      {
        heading: "Rights on paper vs. in practice",
        body: "All six constitutions contain rights language. The exam often asks you to distinguish formal guarantees from actual practice. China's constitution guarantees freedom of speech, but party control limits it. Iran's constitution protects some freedoms but subjects them to Islamic principles.",
      },
    ],
    example: {
      heading: "Blocking platforms",
      body: "In 2021, Nigeria suspended Twitter after the platform deleted a post by the president. Many Nigerians used VPNs to access it anyway, and the suspension was lifted in 2022. The episode illustrates tension between a democracy's legal protections and a government's efforts to control information.",
    },
    examConnection: {
      body: "Expect questions comparing media freedom across two countries and explaining how media control supports regime stability. Quantitative questions may use press freedom indices.",
      tip: "When you describe media control, name the tool: state ownership, censorship, internet controls, or legal restrictions on journalists.",
    },
    commonMistakes: [
      { mistake: "Assuming constitutional rights guarantee practice.", correction: "Many authoritarian constitutions contain rights language that is not enforced." },
      { mistake: "Saying democracies never restrict media.", correction: "Democracies may have legal limits and sometimes restrict platforms, though they generally protect press freedom." },
      { mistake: "Treating Mexico's press problems as state censorship only.", correction: "In Mexico, threats to journalists come largely from organized crime and local officials." },
    ],
    relatedCountryIds: ["china", "russia", "iran", "nigeria", "mexico", "uk"],
  },
  {
    id: "comp-cleavages",
    courseId: "compgov",
    unitId: "compgov-u3",
    title: "Political & Social Cleavages",
    minutes: 16,
    tags: ["cleavages", "ethnicity", "religion", "region", "class", "urban-rural", "Hausa-Fulani", "Yoruba", "Igbo", "Uyghurs", "Chechnya", "Scotland", "Northern Ireland", "Indigenous", "federal character"],
    overview:
      "Cleavages are divisions in society — ethnic, religious, regional, class, and urban-rural — that shape political conflict. Whether cleavages are cross-cutting or coinciding helps explain how dangerous they are. Governments respond through accommodation, federalism, power-sharing, or repression.",
    keyConcepts: [
      { term: "Cleavage", definition: "A division within society based on identity, economic status, or other characteristics that shapes political behavior." },
      { term: "Coinciding cleavages", definition: "Divisions that reinforce one another (e.g., ethnicity, religion, and region align), increasing conflict." },
      { term: "Cross-cutting cleavages", definition: "Divisions that overlap across groups, moderating conflict." },
      { term: "Federal character principle (Nigeria)", definition: "A constitutional principle requiring that appointments reflect the country's diversity." },
    ],
    deepDive: [
      {
        heading: "Nigeria: coinciding cleavages",
        body: "Nigeria's north is predominantly Muslim and Hausa-Fulani; the southwest is largely Yoruba; the southeast is largely Igbo and Christian. These **coinciding cleavages** contributed to the Biafran civil war (1967–70). Nigeria has responded with federalism (expanding the number of states to 36), the **federal character principle**, and an informal practice of rotating the presidency between north and south.",
      },
      {
        heading: "Other course countries",
        body: "The **UK** manages national identities through devolution; Northern Ireland's divisions were addressed through the 1998 Good Friday Agreement's power-sharing. **Mexico** has urban-rural, regional (north vs. south), and Indigenous cleavages. **Russia** has ethnic republics and fought two wars in Chechnya. **China** faces tensions in Xinjiang and Tibet, where it has responded with heavy security, surveillance, and assimilation policies, including the mass detention of Uyghurs. **Iran** has ethnic minorities (Kurds, Baluchis, Azeris, Arabs) and religious minorities, with limited reserved seats in the Majles for recognized religious minorities.",
      },
      {
        heading: "Responses: accommodation or repression",
        body: "Democracies tend to accommodate cleavages through federalism, devolution, electoral rules, and minority protections. Authoritarian regimes more often use repression and co-optation. The choice of institutions — federal vs. unitary, proportional vs. majoritarian — affects whether cleavages are channeled peacefully.",
      },
    ],
    example: {
      heading: "Rotating the presidency",
      body: "Nigeria's major parties have informally followed a practice of \"zoning\" — alternating presidential candidates between the north and the south — to prevent any region from monopolizing power. The practice is not constitutional, but it reflects an effort to manage coinciding cleavages.",
    },
    examConnection: {
      body: "Comparative Analysis prompts often ask how two countries responded to ethnic or religious cleavages. Argument Essays may ask whether federalism or unitary structures better manage cleavages.",
      tip: "Name the cleavage, the policy response, and the result. For Nigeria: ethnic/religious cleavage → federal character principle → broader representation, but continuing tensions.",
    },
    commonMistakes: [
      { mistake: "Treating all cleavages as ethnic.", correction: "Cleavages include religion, region, class, and urban-rural divides." },
      { mistake: "Assuming federalism always reduces conflict.", correction: "Federalism can channel conflict but can also intensify competition over resources." },
      { mistake: "Ignoring cleavages in the UK.", correction: "The UK has significant national, regional, class, and religious cleavages." },
    ],
    relatedCountryIds: ["nigeria", "uk", "china", "russia", "mexico", "iran"],
  },
];
