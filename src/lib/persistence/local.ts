import type { UserProgress } from "../progress-types";
import type { ProgressRepository } from "./types";

const KEY = "civitas:progress:v1";

export class LocalProgressRepository implements ProgressRepository {
  readonly kind = "local" as const;

  async load(): Promise<UserProgress | null> {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as UserProgress;
      return parsed?.version === 1 && parsed.profile ? parsed : null;
    } catch {
      return null;
    }
  }

  async save(progress: UserProgress): Promise<void> {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      // Storage can be full or blocked (private mode). Progress stays in memory for this session.
    }
  }

  async clear(): Promise<void> {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      // ignore
    }
  }
}
