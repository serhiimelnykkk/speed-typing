import type { Stats } from "@/types";
import { createContext, useContext } from "react";

interface ContextType {
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
}

export const WpmContext = createContext<ContextType | null>(null);

export const useWpmStats = () => {
  const ctx = useContext(WpmContext);

  if (!ctx) {
    throw new Error("ctx is null");
  }

  return ctx;
};
