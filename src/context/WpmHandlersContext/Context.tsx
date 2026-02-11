import { createContext, useContext } from "react";

export interface HandlerRefs {
  update: () => void;
  reset: () => void;
}

type ContextValue = React.RefObject<HandlerRefs | null>;

export const WpmHandlersContext = createContext<ContextValue | null>(null);

export const useWpmHandlersContext = () => {
  const ctx = useContext(WpmHandlersContext);

  if (!ctx) {
    throw new Error("ctx is null");
  }

  return ctx;
};
