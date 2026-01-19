import { WpmContext } from "@/context/WpmContext/Context";
import { useEffect, useMemo, useState } from "react";
import { type Stats, initialStats } from "@/types";

interface Props {
  children?: React.ReactNode;
}

const storedStats = localStorage.getItem("stats");
const parsedStats = storedStats ? JSON.parse(storedStats) : initialStats;

export const WpmContextProvider = ({ children }: Props) => {
  const [stats, setStats] = useState<Stats>(parsedStats);

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  const contextValue = useMemo(() => {
    return { stats, setStats };
  }, [stats]);

  return <WpmContext value={contextValue}>{children}</WpmContext>;
};
