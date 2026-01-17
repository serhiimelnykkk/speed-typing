import Infinite from "@/components/common/TextStatus/Infinite/Infinite";
import Timer from "@/components/common/TextStatus/Timer/Timer";
import { type TypingMode } from "@/types";

export const TypingModesViews: Record<TypingMode, React.ComponentType> = {
  infinite: Infinite,
  timer: Timer,
};
