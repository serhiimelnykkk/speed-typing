import Stats from "@/components/pages/Main/Stats/Stats";
import Typing from "@/components/pages/Main/Typing/Typing";
import type { MainViewType } from "@/types";

export const MainViews: Record<MainViewType, React.ComponentType> = {
  typing: Typing,
  stats: Stats,
};
