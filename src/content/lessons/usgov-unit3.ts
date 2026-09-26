import type { Lesson } from "../types";

export const usgovUnit3: Lesson[] = [
  {
    id: "usgov-bill-of-rights-incorporation",
    courseId: "usgov",
    unitId: "usgov-u3",
    title: "The Bill of Rights & Selective Incorporation",
    minutes: 17,
    tags: ["Bill of Rights", "civil liberties", "civil rights", "selective incorporation", "Fourteenth Amendment", "due process clause", "Second Amendment", "McDonald v. Chicago", "District of Columbia v. Heller"],
    overview:
      "The Bill of Rights originally limited only the national government. Through selective incorporation, the Supreme Court has used the Fourteenth Amendment's Due Process Clause to apply most of those protections to the states, one case at a time. McDonald v. Chicago (2010) incorporated the Second Amendment.",
    keyConcepts: [
      { term: "Civil liberties", definition: "Constitutionally protected freedoms from government interference, such as speech and religion." },
      { term: "Civil rights", definition: "Protections against discrimination by government or individuals, often grounded in the Equal Protection Clause and federal statutes." },
      { term: "Due Process Clause (14th Amendment)", definition: "No state shall \"deprive any person of life, liberty, or property, without due process of law.\"" },
      { term: "Selective incorporation", definition: "The case-by-case process of applying Bill of Rights protections to the states through the Fourteenth Amendment." },
      { term: "Second Amendment", definition: "Protects the right to keep and bear arms; the Court has held this is an individual right (Heller, 2008) that applies to states (McDonald, 2010)." },
    ],
    deepDive: [
      {
        heading: "Liberties versus rights",
        body: "**Civil liberties** are limits on what government can do to you — you cannot be jailed for criticizing officials. **Civil rights** are guarantees of equal treatment — you cannot be denied a job or a vote because of race. The distinction matters on the exam: the First Amendment is a liberties topic; the Civil Rights Act of 1964 is a rights topic.",
      },
      {
        heading: "How incorporation works",
        body: "In Barron v. Baltimore (1833), the Court held that the Bill of Rights restricted only the national government. After the Civil War, the **Fourteenth Amendment (1868)** prohibited states from denying due process or equal protection. Beginning in the twentieth century, the Court held that the liberty protected by due process includes most specific guarantees in the Bill of Rights. Incorporation was **selective**: the Court applied rights one by one as cases arose, so some provisions (such as the Third Amendment and the grand jury requirement) have never been incorporated.",
      },
      {
        heading: "McDonald v. Chicago",
        body: "After District of Columbia v. Heller (2008) recognized an individual right to possess a handgun for self-defense in the home — in a federal enclave — Chicago's handgun ban raised the question of whether that right also limited states and cities. In **McDonald v. Chicago (2010)**, the Court held that the Second Amendment is incorporated through the Due Process Clause, striking down the ban. McDonald is the required case for incorporation.",
      },
    ],
    example: {
      heading: "Gideon as incorporation",
      body: "Clarence Gideon was tried in a Florida state court without a lawyer. In Gideon v. Wainwright (1963), the Court held that the Sixth Amendment right to counsel applies to states through the Fourteenth Amendment — another example of selective incorporation, applied to criminal procedure.",
    },
    examConnection: {
      body: "SCOTUS Comparison questions often pair McDonald with a non-required incorporation case. Be ready to explain the Fourteenth Amendment's Due Process Clause as the mechanism, and to distinguish liberties from rights.",
      tip: "Incorporation = Due Process Clause. Equal treatment = Equal Protection Clause. Don't mix them up in your explanations.",
    },
    commonMistakes: [
      { mistake: "Saying the Bill of Rights has always applied to states.", correction: "It originally applied only to the national government; most protections apply to states today because of selective incorporation." },
      { mistake: "Citing the Equal Protection Clause as the basis for incorporation.", correction: "Incorporation relies on the Due Process Clause of the Fourteenth Amendment." },
      { mistake: "Claiming all amendments are incorporated.", correction: "Incorporation is selective; a few provisions remain unincorporated." },
    ],
    relatedCaseIds: ["mcdonald-v-chicago", "dc-v-heller", "gideon-v-wainwright"],
  },
  {
    id: "usgov-freedom-of-religion",
    courseId: "usgov",
    unitId: "usgov-u3",
    title: "Freedom of Religion: Establishment & Free Exercise",
    minutes: 15,
    tags: ["First Amendment", "Establishment Clause", "Free Exercise Clause", "Engel v. Vitale", "Wisconsin v. Yoder", "school prayer", "wall of separation", "Kennedy v. Bremerton"],
    overview:
      "The First Amendment contains two religion clauses that sometimes pull in different directions. The Establishment Clause prevents government from endorsing or sponsoring religion; the Free Exercise Clause protects people's right to practice their faith. Engel v. Vitale and Wisconsin v. Yoder are the required cases.",
    keyConcepts: [
      { term: "Establishment Clause", definition: "\"Congress shall make no law respecting an establishment of religion\" — bars government sponsorship of religion." },
      { term: "Free Exercise Clause", definition: "Prohibits government from interfering with the practice of religion." },
      { term: "Engel v. Vitale (1962)", definition: "School-sponsored prayer in public schools violates the Establishment Clause, even if voluntary and nondenominational." },
      { term: "Wisconsin v. Yoder (1972)", definition: "Requiring Amish children to attend school past eighth grade violated the Free Exercise Clause; the parents' religious interest outweighed the state's." },
    ],
    deepDive: [
      {
        heading: "Establishment: government may not sponsor",
        body: "In **Engel v. Vitale (1962)**, New York's Board of Regents wrote a short, nondenominational prayer for students to recite. The Court held that government-written prayer in public schools violates the Establishment Clause, even though participation was voluntary. The key idea: it is not the government's role to compose or lead official prayers.\n\nThe Court's approach to establishment questions has shifted. In Kennedy v. Bremerton School District (2022), it emphasized historical practices and understandings and upheld a coach's personal, private prayer after games.",
      },
      {
        heading: "Free exercise: accommodating belief",
        body: "In **Wisconsin v. Yoder (1972)**, Amish parents refused to send their children to high school, arguing that it would undermine their religious way of life. The Court ruled for the parents: Wisconsin's interest in two additional years of compulsory education did not outweigh their free exercise rights.",
      },
      {
        heading: "When the clauses collide",
        body: "If government accommodates religion too much, it risks establishment; if it accommodates too little, it risks burdening free exercise. Questions about school vouchers, religious displays, or exemptions from generally applicable laws sit at this intersection.",
      },
    ],
    example: {
      heading: "Two school scenarios",
      body: "A principal leads students in a daily prayer over the loudspeaker: this raises Establishment Clause problems similar to Engel. A student chooses to pray silently at lunch: this is protected private religious exercise, and a school that punished it could violate the Free Exercise Clause.",
    },
    examConnection: {
      body: "SCOTUS Comparison prompts frequently use Engel or Yoder. You'll need to describe the facts and holding of the required case, then explain whether a non-required case reached a similar or different outcome and why.",
      tip: "Engel = Establishment (school-sponsored prayer). Yoder = Free Exercise (Amish schooling). Don't swap them.",
    },
    commonMistakes: [
      { mistake: "Saying Engel banned all prayer in schools.", correction: "Engel barred government-sponsored prayer. Students may still pray privately." },
      { mistake: "Describing Yoder as an Establishment Clause case.", correction: "Yoder is about free exercise — the state burdened the Amish's religious practice." },
      { mistake: "Treating the religion clauses as a single test.", correction: "They protect against different harms: sponsorship versus interference." },
    ],
    relatedCaseIds: ["engel-v-vitale", "wisconsin-v-yoder", "kennedy-v-bremerton"],
  },
  {
    id: "usgov-speech-press",
    courseId: "usgov",
    unitId: "usgov-u3",
    title: "Freedom of Speech & Press",
    minutes: 18,
    tags: ["First Amendment", "free speech", "symbolic speech", "Tinker v. Des Moines", "Schenck v. United States", "clear and present danger", "prior restraint", "New York Times Co. v. United States", "Pentagon Papers", "Brandenburg v. Ohio", "Morse v. Frederick"],
    overview:
      "The First Amendment protects speech and press, but not absolutely. The Court has protected symbolic speech (Tinker), allowed some limits on dangerous speech (Schenck, later narrowed by Brandenburg), and set a heavy presumption against prior restraint of the press (New York Times Co. v. United States).",
    keyConcepts: [
      { term: "Symbolic speech", definition: "Conduct that conveys a message, such as wearing armbands or burning a flag." },
      { term: "Clear and present danger", definition: "The test from Schenck v. United States (1919): speech can be restricted if it creates a clear and present danger of harms Congress may prevent." },
      { term: "Imminent lawless action", definition: "The Brandenburg v. Ohio (1969) standard: advocacy can be punished only if it is directed to inciting imminent lawless action and likely to produce it." },
      { term: "Prior restraint", definition: "Government action that blocks publication before it happens; presumed unconstitutional." },
      { term: "Time, place, and manner restrictions", definition: "Content-neutral limits on when, where, and how speech occurs." },
    ],
    deepDive: [
      {
        heading: "Student speech: Tinker",
        body: "In **Tinker v. Des Moines (1969)**, students wore black armbands to protest the Vietnam War and were suspended. The Court held that students do not \"shed their constitutional rights... at the schoolhouse gate.\" Schools may restrict speech only if it would cause a **substantial disruption** of the educational process. Later cases, such as Morse v. Frederick (2007), allowed schools to restrict speech reasonably viewed as promoting illegal drug use.",
      },
      {
        heading: "Dangerous speech: Schenck to Brandenburg",
        body: "In **Schenck v. United States (1919)**, Charles Schenck distributed leaflets urging men to resist the World War I draft. The Court upheld his conviction, reasoning that speech creating a **clear and present danger** during wartime could be punished — illustrated by the famous example of falsely shouting fire in a crowded theater. Brandenburg v. Ohio (1969) later replaced that standard with the more speech-protective imminent lawless action test.",
      },
      {
        heading: "The press and prior restraint",
        body: "In **New York Times Co. v. United States (1971)**, the Nixon administration sought to block publication of the Pentagon Papers, a classified history of the Vietnam War. The Court ruled 6–3 that the government had not met the heavy burden needed to justify **prior restraint**. The case strengthened freedom of the press against government censorship.",
      },
    ],
    example: {
      heading: "A protest T-shirt",
      body: "A student wears a shirt criticizing a school policy. Under Tinker, the school can't punish the student unless it can show the shirt would substantially disrupt learning. If the shirt promoted illegal drug use, Morse v. Frederick suggests the school would have more authority to restrict it.",
    },
    examConnection: {
      body: "Three required cases live here: Tinker, Schenck, and New York Times v. U.S. They appear often in SCOTUS Comparison questions. Be able to state each holding and the constitutional principle in one sentence.",
      tip: "Tinker = symbolic student speech protected absent substantial disruption. Schenck = speech limited during clear and present danger. NYT v. U.S. = prior restraint strongly disfavored.",
    },
    commonMistakes: [
      { mistake: "Claiming Schenck is still the governing test for incitement.", correction: "Brandenburg v. Ohio replaced clear and present danger with the imminent lawless action test." },
      { mistake: "Saying NYT v. U.S. means the press can publish anything.", correction: "The Court said prior restraint carries a heavy presumption against it; publishers can still face other legal consequences in some circumstances." },
      { mistake: "Treating Tinker as protecting all student speech.", correction: "Tinker protects speech that doesn't cause substantial disruption; later cases recognized additional limits." },
    ],
    relatedCaseIds: ["tinker-v-des-moines", "schenck-v-united-states", "nyt-v-united-states", "brandenburg-v-ohio", "morse-v-frederick", "texas-v-johnson"],
  },
  {
    id: "usgov-rights-of-accused",
    courseId: "usgov",
    unitId: "usgov-u3",
    title: "Rights of the Accused: 4th, 5th, 6th & 8th Amendments",
    minutes: 17,
    tags: ["Fourth Amendment", "Fifth Amendment", "Sixth Amendment", "Eighth Amendment", "exclusionary rule", "Mapp v. Ohio", "Miranda v. Arizona", "Gideon v. Wainwright", "right to counsel", "cruel and unusual punishment", "double jeopardy", "self-incrimination"],
    overview:
      "Several amendments protect people suspected or accused of crimes: the Fourth (searches and seizures), Fifth (self-incrimination, double jeopardy, due process), Sixth (counsel, speedy and public trial, jury), and Eighth (cruel and unusual punishment, excessive bail). Gideon v. Wainwright is the required case.",
    keyConcepts: [
      { term: "Fourth Amendment", definition: "Protects against unreasonable searches and seizures; warrants require probable cause." },
      { term: "Exclusionary rule", definition: "Evidence obtained illegally generally can't be used at trial; applied to states in Mapp v. Ohio (1961)." },
      { term: "Fifth Amendment", definition: "Protects against self-incrimination and double jeopardy and guarantees due process in federal proceedings." },
      { term: "Miranda rights", definition: "From Miranda v. Arizona (1966): police must inform suspects in custody of their rights before interrogation." },
      { term: "Sixth Amendment", definition: "Guarantees a speedy and public trial, an impartial jury, and the assistance of counsel." },
      { term: "Eighth Amendment", definition: "Bars excessive bail and fines and cruel and unusual punishment." },
    ],
    deepDive: [
      {
        heading: "Gideon and the right to counsel",
        body: "Clarence Earl Gideon, charged with a felony in Florida, asked for a lawyer and was refused because Florida provided counsel only in capital cases. Representing himself, he was convicted. In **Gideon v. Wainwright (1963)**, the Court unanimously held that the Sixth Amendment right to counsel is a fundamental right incorporated through the Fourteenth Amendment, so states must provide attorneys to defendants in felony cases who cannot afford one. Public defender systems grew from this ruling.",
      },
      {
        heading: "Searches and the exclusionary rule",
        body: "The Fourth Amendment's protection matters only if it has teeth. The **exclusionary rule** deters illegal police conduct by excluding improperly obtained evidence. Mapp v. Ohio applied it to the states. Courts have recognized exceptions, such as a good-faith exception, and questions about digital searches continue to test the amendment.",
      },
      {
        heading: "Balancing liberty and order",
        body: "Rights of the accused reflect a tension between protecting individual liberty and maintaining public safety. Critics argue some rules let guilty people go free; defenders argue they protect the innocent and restrain government power. The exam often asks you to explain this trade-off.",
      },
    ],
    example: {
      heading: "A search without a warrant",
      body: "Police enter an apartment without a warrant or emergency and find evidence. The defense moves to suppress it. Under the exclusionary rule, the judge may exclude the evidence — even if it proves guilt — because the search violated the Fourth Amendment.",
    },
    examConnection: {
      body: "Gideon is required, and questions often connect it to selective incorporation. Stimulus questions may describe a police action and ask which amendment is implicated.",
      tip: "Search → 4th. Silence and double jeopardy → 5th. Lawyer and jury → 6th. Punishment and bail → 8th.",
    },
    commonMistakes: [
      { mistake: "Saying Gideon applies to every minor offense.", correction: "Gideon addressed felony cases; later decisions extended the right to counsel to cases that result in imprisonment." },
      { mistake: "Confusing Miranda with Gideon.", correction: "Miranda concerns warnings before custodial interrogation (5th Amendment); Gideon concerns appointed counsel at trial (6th Amendment)." },
      { mistake: "Believing illegally obtained evidence is always excluded.", correction: "Courts recognize exceptions to the exclusionary rule, such as the good-faith exception." },
    ],
    relatedCaseIds: ["gideon-v-wainwright", "mapp-v-ohio", "miranda-v-arizona"],
  },
  {
    id: "usgov-privacy-due-process",
    courseId: "usgov",
    unitId: "usgov-u3",
    title: "Due Process & the Right to Privacy",
    minutes: 14,
    tags: ["right to privacy", "due process", "Griswold v. Connecticut", "Roe v. Wade", "Dobbs v. Jackson", "substantive due process", "Ninth Amendment", "penumbras"],
    overview:
      "The Constitution never mentions privacy, but the Court has recognized privacy interests implied by several amendments and the Due Process Clause. Griswold (1965), Roe (1973), and Dobbs (2022) trace the rise and limits of that doctrine — and illustrate how the Court can overturn its own precedent.",
    keyConcepts: [
      { term: "Right to privacy", definition: "A right implied from several amendments and the Due Process Clause, first recognized in Griswold v. Connecticut (1965)." },
      { term: "Substantive due process", definition: "The idea that due process protects certain fundamental rights from government interference, not just fair procedures." },
      { term: "Griswold v. Connecticut (1965)", definition: "Struck down a state ban on contraceptives for married couples, recognizing a right to privacy." },
      { term: "Roe v. Wade (1973)", definition: "Extended the privacy right to a woman's decision to have an abortion, with limits that varied by trimester." },
      { term: "Dobbs v. Jackson Women's Health Organization (2022)", definition: "Overturned Roe, holding that the Constitution does not confer a right to abortion and returning the issue to elected officials." },
    ],
    deepDive: [
      {
        heading: "Finding privacy",
        body: "In **Griswold v. Connecticut**, the Court reasoned that guarantees in the First, Third, Fourth, Fifth, and Ninth Amendments create \"zones of privacy.\" Other justices grounded the right in the Fourteenth Amendment's Due Process Clause. Griswold showed how the Court can recognize an unenumerated right.",
      },
      {
        heading: "Roe and Dobbs",
        body: "**Roe v. Wade** relied on the privacy right to protect abortion decisions, subject to state interests that grew over the course of pregnancy. In **Dobbs (2022)**, the Court overturned Roe and Planned Parenthood v. Casey, reasoning that abortion is not deeply rooted in the nation's history and tradition. States now set abortion policy, producing wide variation across the country.",
      },
      {
        heading: "Why this matters for the exam",
        body: "College Board removed Roe v. Wade from the list of required cases after Dobbs, but the course framework still discusses Griswold, Roe, and Dobbs in the privacy topic. Use them as examples of how the Court interprets due process, how precedent can change, and how Court decisions shift policy to the states.",
      },
    ],
    example: {
      heading: "Federalism after Dobbs",
      body: "Following Dobbs, some states enacted near-total bans while others protected access in state law or state constitutions, sometimes through ballot initiatives. A single Supreme Court ruling reshaped policy across the federal system.",
    },
    examConnection: {
      body: "Although not a required case, Dobbs illustrates judicial review, stare decisis, and federalism in one decision. It's a useful example in essays about the Court's power or about how policy shifts between levels of government.",
      tip: "Use Dobbs as evidence that precedent can be overturned — alongside Brown overturning Plessy.",
    },
    commonMistakes: [
      { mistake: "Saying the Constitution explicitly protects privacy.", correction: "Privacy is an implied right recognized by the Court, not stated in the text." },
      { mistake: "Claiming Dobbs banned abortion nationwide.", correction: "Dobbs held there is no federal constitutional right to abortion and returned the issue to states and Congress." },
      { mistake: "Treating Roe v. Wade as a current required case.", correction: "Roe is no longer on the required list, though it remains relevant content in the privacy topic." },
    ],
    relatedCaseIds: ["griswold-v-connecticut", "roe-v-wade", "dobbs-v-jackson"],
  },
  {
    id: "usgov-civil-rights",
    courseId: "usgov",
    unitId: "usgov-u3",
    title: "Civil Rights & Equal Protection",
    minutes: 19,
    tags: ["civil rights", "Equal Protection Clause", "Brown v. Board of Education", "Plessy v. Ferguson", "Letter from Birmingham Jail", "Emancipation Proclamation", "Thirteenth Amendment", "Civil Rights Act of 1964", "Voting Rights Act of 1965", "Title IX", "affirmative action", "Shaw v. Reno"],
    overview:
      "Civil rights protect people from discrimination. The Emancipation Proclamation and Thirteenth Amendment began the shift toward civil rights for formerly enslaved people; Plessy v. Ferguson allowed segregation; Brown v. Board rejected it. Social movements — captured in King's Letter from Birmingham Jail — pushed Congress to pass landmark civil rights laws.",
    keyConcepts: [
      { term: "Equal Protection Clause", definition: "Fourteenth Amendment: no state may \"deny to any person within its jurisdiction the equal protection of the laws.\"" },
      { term: "Emancipation Proclamation (1863)", definition: "Lincoln's order freeing enslaved people in states in rebellion; the Thirteenth Amendment (1865) permanently abolished slavery." },
      { term: "Brown v. Board of Education (1954)", definition: "Racial segregation in public schools violates the Equal Protection Clause, overturning \"separate but equal\" in public education." },
      { term: "Civil Rights Act of 1964", definition: "Banned discrimination in public accommodations and employment based on race, color, religion, sex, or national origin." },
      { term: "Voting Rights Act of 1965", definition: "Outlawed discriminatory voting practices such as literacy tests and authorized federal oversight of elections in some jurisdictions." },
      { term: "Title IX (1972)", definition: "Prohibits sex discrimination in federally funded education programs." },
      { term: "Affirmative action", definition: "Policies that considered race or sex to expand opportunity; the Court ended race-conscious college admissions in SFFA v. Harvard (2023)." },
    ],
    deepDive: [
      {
        heading: "Rights restricted and protected",
        body: "The course framework now traces minority rights across time. The **Emancipation Proclamation** freed enslaved people in Confederate states, and the **Thirteenth Amendment** abolished slavery everywhere. Yet after Reconstruction, states passed segregation laws, and **Plessy v. Ferguson (1896)** upheld them under the \"separate but equal\" doctrine.",
      },
      {
        heading: "Brown and the movement",
        body: "In **Brown v. Board of Education (1954)**, the NAACP argued that segregated schools were inherently unequal. A unanimous Court agreed, holding that segregation violated the Equal Protection Clause. Implementation was slow and resisted, and the civil rights movement used boycotts, marches, and civil disobedience to press for change. In the **Letter from Birmingham Jail (1963)**, Martin Luther King Jr. defended nonviolent direct action and argued that people have a moral responsibility to disobey unjust laws.",
      },
      {
        heading: "Congress acts",
        body: "Social movements and public pressure helped produce the **Civil Rights Act of 1964**, the **Voting Rights Act of 1965**, and **Title IX**. These laws show that civil rights advances come from all three branches, and from citizens organizing to push them. Redistricting cases such as **Shaw v. Reno (1993)** show the Court also scrutinizing race-conscious government action: districts drawn primarily on the basis of race must survive strict scrutiny.",
      },
    ],
    example: {
      heading: "A movement moves Congress",
      body: "The 1965 marches from Selma to Montgomery drew national attention to the denial of Black voting rights. Months later, Congress passed the Voting Rights Act. This sequence — protest, public opinion shift, legislation — is a model for how social movements influence policy.",
    },
    examConnection: {
      body: "Brown, Shaw, the Letter from Birmingham Jail, and (starting 2026–27) the Emancipation Proclamation are all required. Argument Essays often ask about the most effective way to achieve political change — Congress, courts, or movements — making this lesson essential evidence.",
      tip: "Pair each branch with an example: Courts → Brown. Congress → Civil Rights Act of 1964. Movements → Letter from Birmingham Jail / Selma.",
    },
    commonMistakes: [
      { mistake: "Saying the Emancipation Proclamation freed all enslaved people.", correction: "It applied only to states in rebellion; the Thirteenth Amendment abolished slavery nationwide." },
      { mistake: "Citing the Due Process Clause for Brown.", correction: "Brown rests on the Equal Protection Clause." },
      { mistake: "Treating Shaw v. Reno as expanding majority-minority districts.", correction: "Shaw held that districts drawn predominantly by race are subject to strict scrutiny, limiting racial gerrymandering." },
    ],
    relatedDocumentIds: ["letter-birmingham-jail", "emancipation-proclamation"],
    relatedCaseIds: ["brown-v-board", "plessy-v-ferguson", "shaw-v-reno", "sffa-v-harvard"],
  },
];
