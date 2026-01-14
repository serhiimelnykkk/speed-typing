import { WpmContext } from "@/context/WpmContext/Context";
import { useEffect, useMemo, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const storedWpm = JSON.parse(localStorage.getItem("wpm") || "{}")["wpm"];
const initialWpm = storedWpm ? storedWpm : 0;

export const WpmContextProvider = ({ children }: Props) => {
  const [wpm, setWpm] = useState(initialWpm);

  useEffect(() => {
    localStorage.setItem("wpm", JSON.stringify({ wpm }));
  }, [wpm]);

  const contextValue = useMemo(() => {
    return { wpm, setWpm };
  }, [wpm]);

  return <WpmContext value={contextValue}>{children}</WpmContext>;
};
