import Typing from "@/components/pages/Main/Typing/Typing";
import type { MainViewType } from "@/types";
import { lazy } from "react";

export const MainViews: Record<MainViewType, React.ComponentType> = {
  typing: Typing,
  stats: lazy(() => import("@/components/pages/Main/Stats/Stats")),
};
