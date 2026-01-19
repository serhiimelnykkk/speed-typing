export type MainViewType = "typing" | "stats";

export const TypingModes = ["infinite", "timer"] as const;
export type TypingMode = (typeof TypingModes)[number];

export interface Stats {
  wpm: number;
  accuracy: number;
}
export const initialStats: Stats = { wpm: 0, accuracy: 0 };
