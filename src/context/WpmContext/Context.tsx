import { createContext, useContext } from "react";

interface ContextType {
  wpm: number;
  setWpm: React.Dispatch<React.SetStateAction<number>>;
}

export const WpmContext = createContext<ContextType | null>(null);

export const useWpmContext = () => {
  const ctx = useContext(WpmContext);

  if (!ctx) {
    throw new Error("ctx is null");
  }

  return ctx;
};

// export const useWpmDispatch = () => useContext(WpmDispatchContext);
