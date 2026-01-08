import { createContext, useContext } from "react";

export const PauseLockContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});
export const usePauseLockContext = () => useContext(PauseLockContext);
