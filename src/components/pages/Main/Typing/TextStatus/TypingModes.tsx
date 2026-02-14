import Infinite from "@/components/pages/Main/Typing/TextStatus/Infinite/Infinite";
import Timer from "@/components/pages/Main/Typing/TextStatus/Timer/Timer";
import { type TypingMode } from "@/types";

export const TypingModesViews: Record<TypingMode, React.ComponentType> = {
  infinite: Infinite,
  timer: Timer,
};
