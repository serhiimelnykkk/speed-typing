import { WpmContext } from "@/context/WpmContext/Context";
import { useMemo, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

export const WpmContextProvider = ({ children }: Props) => {
  const [wpm, setWpm] = useState(0);

  const contextValue = useMemo(() => {
    return { wpm, setWpm };
  }, [wpm]);

  return <WpmContext value={contextValue}>{children}</WpmContext>;
};
