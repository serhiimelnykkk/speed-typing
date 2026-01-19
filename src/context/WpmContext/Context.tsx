import { createContext, useContext } from "react";
import type { Stats } from "@/types";

interface ContextType {
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
}

export const WpmContext = createContext<ContextType | null>(null);

export const useWpmContext = () => {
  const ctx = useContext(WpmContext);

  if (!ctx) {
    throw new Error("ctx is null");
  }

  return ctx;
};
