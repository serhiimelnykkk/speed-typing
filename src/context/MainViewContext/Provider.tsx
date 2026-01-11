import { useMemo, useState } from "react";
import type { MainViewType } from "@/types";

import { MainViewContext } from "@/context/MainViewContext/Context";

interface Props {
  children?: React.ReactNode;
}

export const MainViewDispatchContextProvider = ({ children }: Props) => {
  const [mainView, setMainView] = useState<MainViewType>("typing");

  const contextValue = useMemo(() => {
    return { mainView, setMainView };
  }, [mainView]);

  return <MainViewContext value={contextValue}>{children}</MainViewContext>;
};
