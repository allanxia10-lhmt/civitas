import type { AnswerChoice, ChoiceId, CourseId, Question } from "../types";

type ChoiceTuple = [text: string, rationale: string];

type QuestionInput = Omit<Question, "courseId" | "unitId" | "choices"> & {
  choices: [ChoiceTuple, ChoiceTuple, ChoiceTuple, ChoiceTuple];
};

const IDS: ChoiceId[] = ["A", "B", "C", "D"];

/**
 * Compact authoring helper: `bank("usgov", "usgov-u1")` returns a function
 * that turns `[text, rationale]` tuples into fully typed Question objects.
 * All practice questions are original items written for this site.
 */
export function bank(courseId: CourseId, unitId: string) {
  return (input: QuestionInput): Question => ({
    ...input,
    courseId,
    unitId,
    choices: input.choices.map(
      ([text, rationale], i): AnswerChoice => ({ id: IDS[i], text, rationale }),
    ),
  });
}
