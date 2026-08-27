import { defaultUniversalState, type RtiState } from "./types";

export function readRtiState(): RtiState {
  if (typeof window === "undefined") return defaultUniversalState;

  try {
    const stored = window.localStorage.getItem("rti_current_state");
    return stored ? { ...defaultUniversalState, ...JSON.parse(stored) } : defaultUniversalState;
  } catch {
    return defaultUniversalState;
  }
}