import { createContext, useContext, type SetStateAction } from "react";

export const WpmStateContext = createContext(0);
export const WpmDispatchContext = createContext<
  React.Dispatch<SetStateAction<number>>
>(() => {});

export const useWpm = () => useContext(WpmStateContext);
export const useWpmDispatch = () => useContext(WpmDispatchContext);
