export type MainViewType = "typing" | "stats";

export const TypingModes = ["infinite", "timer"] as const;
export type TypingMode = (typeof TypingModes)[number];
