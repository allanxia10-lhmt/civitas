import type { Course, Unit } from "./types";

/**
 * Official course and exam facts. Everything in this file is sourced from
 * College Board's AP Central / AP Students pages and was verified on the date
 * in `framework.verifiedOn`. When the CED changes, update this file first —
 * the rest of the app reads exam structure from here.
 */
export const COURSES: Course[] = [
  {
    id: "usgov",
    title: "AP U.S. Government and Politics",
    shortTitle: "AP U.S. Gov",
    tagline: "Constitutional foundations, institutions, rights, beliefs, and participation.",
    description:
      "Study the principles, institutions, and behaviors that shape American politics — from Federalist No. 10 to the modern campaign.",
    framework: {
      name: "AP U.S. Government and Politics Course and Exam Description",
      schoolYear: "2026–27",
      verifiedOn: "2026-09-23",
      sourceUrl: "https://apcentral.collegeboard.org/courses/ap-united-states-government-and-politics",
      notes: [
        "For 2026–27, College Board added four required foundational documents: the Emancipation Proclamation, Federalist No. 39, the Gettysburg Address, and core principles from Adam Smith's The Wealth of Nations. There are now 13 required documents.",
        "There are 14 required Supreme Court cases. Roe v. Wade was removed from the required list after Dobbs v. Jackson Women's Health Organization (2022); Griswold, Roe, and Dobbs are still discussed in the course framework's due-process and privacy topic.",
        "The exam is fully digital and taken in the Bluebook testing app.",
      ],
    },
    exam: {
      nextExamDate: "2027-05-04",
      nextExamLabel: "Tuesday, May 4, 2027",
      digital: true,
      sections: [
        {
          name: "Section I: Multiple Choice",
          detail: "55 questions, including individual questions and stimulus-based sets (quantitative, text-based, and visual sources).",
          minutes: 80,
          weight: "50%",
        },
        {
          name: "Section II: Free Response",
          detail: "4 questions: Concept Application, Quantitative Analysis, SCOTUS Comparison, and Argument Essay.",
          minutes: 100,
          weight: "50%",
        },
      ],
      frqTypes: ["concept-application", "quantitative-analysis", "scotus-comparison", "argument-essay"],
    },
    unitIds: ["usgov-u1", "usgov-u2", "usgov-u3", "usgov-u4", "usgov-u5"],
  },
  {
    id: "compgov",
    title: "AP Comparative Government and Politics",
    shortTitle: "AP Comp Gov",
    tagline: "Six countries, one toolkit for comparing how political systems work.",
    description:
      "Compare the United Kingdom, Mexico, Nigeria, Russia, China, and Iran to understand regimes, institutions, participation, and change.",
    framework: {
      name: "AP Comparative Government and Politics Course and Exam Description",
      schoolYear: "2026–27",
      verifiedOn: "2026-09-23",
      sourceUrl: "https://apcentral.collegeboard.org/courses/ap-comparative-government-and-politics",
      notes: [
        "The six required course countries are China, Iran, Mexico, Nigeria, Russia, and the United Kingdom.",
        "The exam is fully digital and taken in the Bluebook testing app.",
        "Unit weightings on this site are the official multiple-choice weightings published on AP Students.",
      ],
    },
    exam: {
      nextExamDate: "2027-05-14",
      nextExamLabel: "Friday, May 14, 2027",
      digital: true,
      sections: [
        {
          name: "Section I: Multiple Choice",
          detail: "55 questions: individual questions plus stimulus-based sets (quantitative and text-based sources).",
          minutes: 60,
          weight: "50%",
        },
        {
          name: "Section II: Free Response",
          detail: "4 questions: Concept Application, Quantitative Analysis, Comparative Analysis, and Argument Essay.",
          minutes: 90,
          weight: "50%",
        },
      ],
      frqTypes: [
        "comp-concept-application",
        "comp-quantitative-analysis",
        "comparative-analysis",
        "comp-argument-essay",
      ],
    },
    unitIds: ["compgov-u1", "compgov-u2", "compgov-u3", "compgov-u4", "compgov-u5"],
  },
];

export const UNITS: Unit[] = [
  // ------------------------------------------------------------ AP U.S. Gov
  {
    id: "usgov-u1",
    courseId: "usgov",
    number: 1,
    title: "Foundations of American Democracy",
    shortTitle: "Foundations",
    description:
      "Democratic ideals, the road from the Articles to the Constitution, ratification debates, separation of powers, and federalism.",
    examWeight: "15%–22%",
    weightMidpoint: 18.5,
    lessonIds: [
      "usgov-democratic-ideals",
      "usgov-articles-convention",
      "usgov-ratification",
      "usgov-separation-of-powers",
      "usgov-federalism",
      "usgov-federalism-in-practice",
    ],
  },
  {
    id: "usgov-u2",
    courseId: "usgov",
    number: 2,
    title: "Interactions Among Branches of Government",
    shortTitle: "Branches",
    description:
      "Congress, the presidency, the courts, and the bureaucracy — and how each checks and competes with the others.",
    examWeight: "25%–36%",
    weightMidpoint: 30.5,
    lessonIds: [
      "usgov-congress-structure",
      "usgov-lawmaking",
      "usgov-presidential-powers",
      "usgov-presidential-checks",
      "usgov-judiciary",
      "usgov-bureaucracy",
      "usgov-bureaucratic-accountability",
    ],
  },
  {
    id: "usgov-u3",
    courseId: "usgov",
    number: 3,
    title: "Civil Liberties and Civil Rights",
    shortTitle: "Liberties & Rights",
    description:
      "The Bill of Rights, selective incorporation, due process, equal protection, and the movements that expanded civil rights.",
    examWeight: "13%–18%",
    weightMidpoint: 15.5,
    lessonIds: [
      "usgov-bill-of-rights-incorporation",
      "usgov-freedom-of-religion",
      "usgov-speech-press",
      "usgov-rights-of-accused",
      "usgov-privacy-due-process",
      "usgov-civil-rights",
    ],
  },
  {
    id: "usgov-u4",
    courseId: "usgov",
    number: 4,
    title: "American Political Ideologies and Beliefs",
    shortTitle: "Ideologies & Beliefs",
    description:
      "Core values, political socialization, public opinion and polling, ideology, and how beliefs shape policy.",
    examWeight: "10%–15%",
    weightMidpoint: 12.5,
    lessonIds: [
      "usgov-core-values",
      "usgov-socialization",
      "usgov-public-opinion-polling",
      "usgov-ideologies",
      "usgov-ideology-policy",
    ],
  },
  {
    id: "usgov-u5",
    courseId: "usgov",
    number: 5,
    title: "Political Participation",
    shortTitle: "Participation",
    description:
      "Voting, parties, interest groups, elections, campaign finance, and the media.",
    examWeight: "20%–27%",
    weightMidpoint: 23.5,
    lessonIds: [
      "usgov-voting-turnout",
      "usgov-political-parties",
      "usgov-interest-groups",
      "usgov-elections",
      "usgov-campaign-finance",
      "usgov-media",
    ],
  },

  // ------------------------------------------------------------ AP Comp Gov
  {
    id: "compgov-u1",
    courseId: "compgov",
    number: 1,
    title: "Political Systems, Regimes, and Governments",
    shortTitle: "Systems & Regimes",
    description:
      "States, nations, regimes, and governments; democracy and authoritarianism; legitimacy; and federal vs. unitary systems.",
    examWeight: "18%–27%",
    weightMidpoint: 22.5,
    lessonIds: [
      "comp-comparative-method",
      "comp-democracy-authoritarianism",
      "comp-legitimacy",
      "comp-federal-unitary",
    ],
  },
  {
    id: "compgov-u2",
    courseId: "compgov",
    number: 2,
    title: "Political Institutions",
    shortTitle: "Institutions",
    description:
      "Parliamentary, presidential, and semi-presidential systems; executives; legislatures; and judiciaries across the six countries.",
    examWeight: "22%–33%",
    weightMidpoint: 27.5,
    lessonIds: ["comp-executive-systems", "comp-executives", "comp-legislatures", "comp-judiciaries"],
  },
  {
    id: "compgov-u3",
    courseId: "compgov",
    number: 3,
    title: "Political Culture and Participation",
    shortTitle: "Culture & Participation",
    description:
      "Political culture and socialization, ideologies, participation and protest, civil liberties and media, and social cleavages.",
    examWeight: "11%–18%",
    weightMidpoint: 14.5,
    lessonIds: ["comp-political-culture", "comp-participation", "comp-civil-liberties-media", "comp-cleavages"],
  },
  {
    id: "compgov-u4",
    courseId: "compgov",
    number: 4,
    title: "Party and Electoral Systems and Citizen Organizations",
    shortTitle: "Parties & Elections",
    description:
      "Electoral rules, party systems, and the interest groups and social movements that link citizens to the state.",
    examWeight: "13%–18%",
    weightMidpoint: 15.5,
    lessonIds: ["comp-electoral-systems", "comp-party-systems", "comp-civil-society"],
  },
  {
    id: "compgov-u5",
    courseId: "compgov",
    number: 5,
    title: "Political and Economic Changes and Development",
    shortTitle: "Change & Development",
    description:
      "Globalization, economic liberalization, development, rentier states, and public policy responses to social, environmental, and demographic challenges.",
    examWeight: "16%–24%",
    weightMidpoint: 20,
    lessonIds: ["comp-globalization", "comp-development", "comp-policy-challenges"],
  },
];
