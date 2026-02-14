import Infinite from "@/components/common/TextStatus/Infinite/Infinite";
import { type TypingMode } from "@/types";
import { lazy } from "react";

export const TypingModesViews: Record<TypingMode, React.ComponentType> = {
  infinite: Infinite,
  timer: lazy(() => import("@/components/common/TextStatus/Timer/Timer")),
};
