import type { Question } from "../types";
import { compgovU1Questions } from "./compgov-u1";
import { compgovU2Questions } from "./compgov-u2";
import { compgovU3Questions } from "./compgov-u3";
import { compgovU4Questions } from "./compgov-u4";
import { compgovU5Questions } from "./compgov-u5";
import { usgovU1Questions } from "./usgov-u1";
import { usgovU2Questions } from "./usgov-u2";
import { usgovU3Questions } from "./usgov-u3";
import { usgovU4Questions } from "./usgov-u4";
import { usgovU5Questions } from "./usgov-u5";

export const QUESTIONS: Question[] = [
  ...usgovU1Questions,
  ...usgovU2Questions,
  ...usgovU3Questions,
  ...usgovU4Questions,
  ...usgovU5Questions,
  ...compgovU1Questions,
  ...compgovU2Questions,
  ...compgovU3Questions,
  ...compgovU4Questions,
  ...compgovU5Questions,
];
