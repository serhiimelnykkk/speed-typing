import { createContext, useContext } from "react";
import type { MainViewType } from "@/types";

export const MainViewDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<MainViewType>>
>(() => {});

export const useMainViewDispatchContext = () =>
  useContext(MainViewDispatchContext);
