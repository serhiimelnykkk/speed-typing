import { createContext, useContext } from "react";

interface ContextType {
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  isPauseLocked: boolean;
  setIsPauseLocked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PauseContext = createContext<ContextType | null>(null);
export const usePause = () => {
  const ctx = useContext(PauseContext);

  if (!ctx) {
    throw new Error("ctx is null");
  }

  return ctx;
};
