import { defaultUniversalState, type RtiState } from "./types";

const STORAGE_KEY = "rti_current_state";

export function readRtiState(): RtiState {
  if (typeof window === "undefined") return defaultUniversalState;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultUniversalState, ...JSON.parse(stored) } : defaultUniversalState;
  } catch {
    return defaultUniversalState;
  }
}

export function writeRtiState(state: Partial<RtiState>): void {
  if (typeof window === "undefined") return;

  try {
    const current = readRtiState();
    const merged = { ...current, ...state };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (error) {
    console.error("Failed to write RTI state to storage:", error);
  }
}