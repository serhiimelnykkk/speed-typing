export type MainViewType = "typing" | "stats";

export const TypingModes = ["infinite", "timer"] as const;
export type TypingMode = (typeof TypingModes)[number];

export interface Stats {
  wpm: number;
  accuracy: number;
}
