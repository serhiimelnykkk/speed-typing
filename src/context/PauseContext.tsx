import { createContext, useContext } from "react";

export const PauseContext = createContext(false);
export const usePauseContext = () => useContext(PauseContext);
