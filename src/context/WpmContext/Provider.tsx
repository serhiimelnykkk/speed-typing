import { WpmContext } from "@/context/WpmContext/Context";
import { useEffect, useMemo, useState } from "react";
import type { Stats } from "@/types";

interface Props {
  children?: React.ReactNode;
}

const initialStats: Stats = { wpm: 0, accuracy: 0 };
const storedStats = JSON.parse(
  localStorage.getItem("stats") || JSON.stringify(initialStats),
);

export const WpmContextProvider = ({ children }: Props) => {
  const [stats, setStats] = useState<Stats>(storedStats);

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  const contextValue = useMemo(() => {
    return { stats, setStats };
  }, [stats]);

  return <WpmContext value={contextValue}>{children}</WpmContext>;
};
