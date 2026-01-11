import { createContext, useContext } from "react";
import type { MainViewType } from "@/types";

interface MainViewContextType {
  mainView: MainViewType;
  setMainView: React.Dispatch<React.SetStateAction<MainViewType>>;
}

export const MainViewContext = createContext<MainViewContextType | null>(null);

export const useMainViewContext = () => {
  const ctx = useContext(MainViewContext);

  if (!ctx) {
    throw new Error("ctx is null");
  }

  return ctx;
};
