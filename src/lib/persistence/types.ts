import type { UserProgress } from "../progress-types";

/**
 * Storage boundary for user progress. The store only talks to this interface,
 * so switching from browser storage to Supabase (or anything else) doesn't
 * touch any UI code.
 */
export interface ProgressRepository {
  readonly kind: "local" | "supabase";
  load(): Promise<UserProgress | null>;
  save(progress: UserProgress): Promise<void>;
  clear(): Promise<void>;
}
