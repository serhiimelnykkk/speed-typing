import Infinite from "@/components/pages/Main/Typing/TextStatus/Infinite/Infinite";
import { type TypingMode } from "@/types";
import { lazy } from "react";

export const TypingModesViews: Record<TypingMode, React.ComponentType> = {
  infinite: Infinite,
  timer: lazy(
    () => import("@/components/pages/Main/Typing/TextStatus/Timer/Timer"),
  ),
};
