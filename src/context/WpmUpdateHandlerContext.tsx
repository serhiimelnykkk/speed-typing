import { createContext, useContext } from "react";

export interface UpdateHandlerRef {
  updateWpm: () => void;
}

interface ContextValue {
  ref: React.RefObject<UpdateHandlerRef> | null;
}

export const WpmUpdateHandlerContext = createContext<ContextValue>({
  ref: null,
});

export const useWpmUpdateHandlerContext = () =>
  useContext(WpmUpdateHandlerContext);
