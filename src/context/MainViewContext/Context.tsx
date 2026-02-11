import type { MainViewType } from "@/types";
import { createContext, useContext } from "react";

interface MainViewContextType {
  mainView: MainViewType;
  setMainView: React.Dispatch<React.SetStateAction<MainViewType>>;
}

export const MainViewContext = createContext<MainViewContextType | null>(null);

export const useMainView = () => {
  const ctx = useContext(MainViewContext);

  if (!ctx) {
    throw new Error("ctx is null");
  }

  return ctx;
};
