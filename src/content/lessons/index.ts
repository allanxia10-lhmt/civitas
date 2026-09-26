import type { Lesson } from "../types";
import { compgovUnit1 } from "./compgov-unit1";
import { compgovUnit2 } from "./compgov-unit2";
import { compgovUnit3 } from "./compgov-unit3";
import { compgovUnit4 } from "./compgov-unit4";
import { compgovUnit5 } from "./compgov-unit5";
import { usgovUnit1 } from "./usgov-unit1";
import { usgovUnit2 } from "./usgov-unit2";
import { usgovUnit3 } from "./usgov-unit3";
import { usgovUnit4 } from "./usgov-unit4";
import { usgovUnit5 } from "./usgov-unit5";

export const LESSONS: Lesson[] = [
  ...usgovUnit1,
  ...usgovUnit2,
  ...usgovUnit3,
  ...usgovUnit4,
  ...usgovUnit5,
  ...compgovUnit1,
  ...compgovUnit2,
  ...compgovUnit3,
  ...compgovUnit4,
  ...compgovUnit5,
];
