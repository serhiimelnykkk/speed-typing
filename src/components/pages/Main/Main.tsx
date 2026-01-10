import { PauseContext } from "@/context/PauseContext";
import { PauseLockContext } from "@/context/PauseLockContext";
import { useEffect, useState, useRef } from "react";

import type { MainViewType } from "@/types";
import { MainViewDispatchContext } from "@/context/MainViewContext";

import Stats from "@/components/pages/Main/Stats/Stats";
import Typing from "@/components/pages/Main/Typing/Typing";

import {
  WpmUpdateHandlerContext,
  type UpdateHandlerRef,
} from "@/context/WpmUpdateHandlerContext";

const Main = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPauseLocked, setIsPauseLocked] = useState(false);

  const [mainView, setMainView] = useState<MainViewType>("typing");

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

  return (
    <WpmUpdateHandlerContext value={{ ref: updateHandler }}>
      <PauseContext value={isPaused}>
        <PauseLockContext value={setIsPauseLocked}>
          <MainViewDispatchContext value={setMainView}>
            <main className="px-10 h-full max-w-350 mx-auto">
              {mainView === "typing" ? (
                <Typing />
              ) : (
                mainView === "stats" && <Stats />
              )}
            </main>
          </MainViewDispatchContext>
        </PauseLockContext>
      </PauseContext>
    </WpmUpdateHandlerContext>
  );
};

export default Main;
