import type { Country } from "../types";

export const iran: Country = {
  id: "iran",
  name: "Iran",
  officialName: "Islamic Republic of Iran",
  code: "IR",
  regimeLabel: "Theocratic republic · Authoritarian",
  summary:
    "Since the 1979 revolution, Iran has been an Islamic Republic that combines elected institutions — a president and a legislature — with unelected clerical bodies that hold ultimate authority. Its regime rests on the principle of guardianship of the Islamic jurist (velayat-e faqih).",
  lastUpdated: "2026-09-23",
  keyFacts: [
    { label: "Supreme Leader", value: "Mojtaba Khamenei (selected March 2026)", timeSensitive: true },
    { label: "President", value: "Masoud Pezeshkian (elected 2024)", timeSensitive: true },
    { label: "Constitution", value: "1979 (amended 1989)" },
    { label: "Legislature", value: "Islamic Consultative Assembly (Majles), 290 seats" },
    { label: "Key unelected bodies", value: "Guardian Council, Expediency Council" },
    { label: "Capital", value: "Tehran" },
  ],
  sections: [
    {
      key: "structure",
      title: "Government Structure",
      body:
        "Iran is a unitary theocratic republic. The 1979 revolution overthrew the Pahlavi monarchy, and the new constitution, shaped by Ayatollah Ruhollah Khomeini, established velayat-e faqih: a senior Islamic jurist, the Supreme Leader, guides the state. Elected institutions operate within limits set by unelected clerical bodies.",
      bullets: [
        "Supreme Leader — highest authority; commands the armed forces, appoints the head of the judiciary and half of the Guardian Council.",
        "Guardian Council — 12 members (6 clerics appointed by the Supreme Leader, 6 jurists nominated by the head of the judiciary and approved by the Majles); vets candidates and reviews legislation.",
        "Assembly of Experts — 88 elected clerics who choose (and in principle can remove) the Supreme Leader.",
        "Expediency Council — resolves disputes between the Majles and the Guardian Council and advises the Supreme Leader.",
      ],
    },
    {
      key: "executive",
      title: "Executive",
      body:
        "Iran has a dual executive. The Supreme Leader serves without a fixed term and holds ultimate authority. The president, directly elected for a four-year term (limited to two consecutive terms), is head of government: he runs the bureaucracy, proposes the budget, and appoints ministers with Majles approval. Presidents who push for reform have often been constrained by the Supreme Leader and unelected bodies.",
      bullets: [
        "Ali Khamenei served as Supreme Leader from 1989 until he was killed in U.S.-Israeli strikes on February 28, 2026.",
        "In March 2026, the Assembly of Experts selected his son, Mojtaba Khamenei, as Supreme Leader.",
      ],
    },
    {
      key: "legislature",
      title: "Legislature",
      body:
        "The Majles (Islamic Consultative Assembly) has 290 members elected for four-year terms, including reserved seats for recognized religious minorities (Zoroastrians, Jews, Armenian Christians, and Assyrian and Chaldean Christians). It drafts and passes legislation, approves ministers, and can impeach them, but the Guardian Council must approve all bills, limiting its independence.",
    },
    {
      key: "judiciary",
      title: "Judiciary",
      body:
        "The judiciary is headed by an official appointed by the Supreme Leader and applies a legal system based on Shia Islamic law. It has been used to prosecute dissidents, journalists, and protesters, and Revolutionary Courts handle cases involving national security. The judiciary lacks independence from the clerical leadership.",
    },
    {
      key: "parties",
      title: "Political Parties",
      body:
        "Formal parties are weak. Politics is organized around factions: principlists (conservatives loyal to the Supreme Leader and revolutionary ideals) and reformists (who favor greater social freedom and engagement with the West), with pragmatic centrists in between. All operate within boundaries set by the Guardian Council's vetting.",
    },
    {
      key: "electoral",
      title: "Electoral System",
      body:
        "The president is elected by a two-round majority system. The Majles is elected from single- and multi-member districts. The Guardian Council vets all candidates for the presidency, the Majles, and the Assembly of Experts, and it has disqualified large numbers of candidates, including prominent reformists. The 2024 presidential election went to a runoff, won by Masoud Pezeshkian.",
    },
    {
      key: "participation",
      title: "Political Participation",
      body:
        "Turnout in recent elections fell to historic lows — around 41% in the 2024 legislative election — which many analysts read as disillusionment with the system. Mass protests have challenged the regime: the 2009 Green Movement after a disputed presidential election, economic protests in 2017–2019, and the 2022 \"Woman, Life, Freedom\" protests after the death of Mahsa Amini in morality police custody. Each was met with harsh repression.",
    },
    {
      key: "culture",
      title: "Political Culture",
      body:
        "Iranian political culture blends Shia Islam, revolutionary ideology, and Persian nationalism. The majority are Persian and Shia Muslim, but significant ethnic minorities (Azeris, Kurds, Arabs, Baluchis) and religious minorities (Sunnis, Baha'is, Christians, Jews, Zoroastrians) exist. Cleavages between religious conservatives and secular or reform-minded citizens — often along urban–rural and generational lines — are central to politics.",
    },
    {
      key: "economy",
      title: "Economy",
      body:
        "Iran is a rentier state heavily dependent on oil and gas exports. The state, religious foundations (bonyads), and entities linked to the Islamic Revolutionary Guard Corps control large parts of the economy. International sanctions — eased under the 2015 nuclear agreement (JCPOA) and reimposed after the U.S. withdrew in 2018 — have contributed to inflation and currency depreciation. Constitutional reinterpretations of Article 44 have allowed partial privatization.",
    },
    {
      key: "civil-society",
      title: "Civil Society",
      body:
        "Civil society is restricted. The state controls broadcast media, blocks many foreign platforms, and has imposed internet shutdowns during protests. The IRGC and Basij militia help enforce social rules and suppress dissent. Despite repression, women's rights activists, labor organizers, and students remain active.",
    },
  ],
  currentIssues: [
    {
      title: "Leadership succession during war",
      body:
        "Ali Khamenei's death in U.S.-Israeli strikes in February 2026 and the Assembly of Experts' selection of Mojtaba Khamenei in March tested the regime's succession rules under wartime pressure. The hereditary appearance of the succession is itself politically contested. Check current news for the status of the conflict.",
    },
    {
      title: "Legitimacy and participation",
      body: "Historically low turnout and recurring protest waves raise questions about the regime's legitimacy, especially among younger Iranians.",
    },
    {
      title: "Sanctions and the economy",
      body: "Sanctions, inflation, and dependence on oil revenue continue to strain the economy and public trust.",
    },
  ],
  compare: {
    regime: { tag: "Authoritarian", text: "Theocratic regime: elected institutions constrained by unelected clerical bodies." },
    system: { tag: "Theocratic republic", text: "Velayat-e faqih: the Supreme Leader holds ultimate authority over elected officials." },
    executive: { tag: "Dual executive", text: "Supreme Leader (no fixed term) and an elected president (head of government)." },
    legislature: { tag: "Unicameral", text: "Majles (290) whose bills require Guardian Council approval." },
    electoral: { tag: "Majoritarian, vetted", text: "Two-round presidential elections; Majles districts; Guardian Council vets all candidates." },
    parties: { tag: "Factional", text: "Weak parties; principlist and reformist factions within approved limits." },
    judiciary: { tag: "Subordinate", text: "Head appointed by the Supreme Leader; Islamic law; used against dissidents." },
    liberties: { tag: "Restricted", text: "Media control, internet shutdowns, and repression of protest." },
    participation: { tag: "Restricted", text: "Elections among vetted candidates; declining turnout; protests repressed." },
    economy: { tag: "Rentier", text: "Oil-dependent; state, bonyads, and IRGC-linked firms dominate; sanctions." },
    territorial: { tag: "Unitary", text: "Highly centralized unitary state." },
  },
};
