import { PauseContext } from "@/context/PauseContext/Context";
import { useEffect, useMemo, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

export const PauseContextProvider = ({ children }: Props) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPauseLocked, setIsPauseLocked] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPauseLocked) {
        setIsPaused((prev) => !prev);
      }
    };

    addEventListener("keydown", onKeyDown);

    return () => removeEventListener("keydown", onKeyDown);
  }, [isPauseLocked]);

  const contextValue = useMemo(() => {
    return { isPaused, setIsPaused, isPauseLocked, setIsPauseLocked };
  }, [isPauseLocked, isPaused]);

  return <PauseContext value={contextValue}>{children}</PauseContext>;
};
