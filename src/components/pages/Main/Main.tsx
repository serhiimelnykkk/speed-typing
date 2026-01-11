import { PauseContext } from "@/context/PauseContext";
import { PauseLockContext } from "@/context/PauseLockContext";
import { useEffect, useState, useRef } from "react";
import Stats from "@/components/pages/Main/Stats/Stats";
import Typing from "@/components/pages/Main/Typing/Typing";

import {
  WpmUpdateHandlerContext,
  type UpdateHandlerRef,
} from "@/context/WpmUpdateHandlerContext";

import { useMainViewContext } from "@/context/MainViewContext/Context";

const Main = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPauseLocked, setIsPauseLocked] = useState(false);

  const updateHandler = useRef<UpdateHandlerRef>({ updateWpm: () => {} });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPauseLocked) {
        setIsPaused((prev) => !prev);
      }
    };

    addEventListener("keydown", onKeyDown);

    return () => removeEventListener("keydown", onKeyDown);
  }, [isPauseLocked]);

  const { mainView } = useMainViewContext();

  return (
    <WpmUpdateHandlerContext value={{ ref: updateHandler }}>
      <PauseContext value={isPaused}>
        <PauseLockContext value={setIsPauseLocked}>
          <main className="px-10 h-full max-w-350 mx-auto">
            {mainView === "typing" ? (
              <Typing />
            ) : (
              mainView === "stats" && <Stats />
            )}
          </main>
        </PauseLockContext>
      </PauseContext>
    </WpmUpdateHandlerContext>
  );
};

export default Main;
