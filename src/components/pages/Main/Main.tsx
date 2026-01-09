import { PauseContext } from "../../../context/PauseContext";
import { PauseLockContext } from "../../../context/PauseLockContext";
import { useEffect, useState } from "react";

import Typing from "./Typing/Typing";
import type { MainViewType } from "../../../types";
import { MainViewDispatchContext } from "../../../context/MainViewContext";
import Stats from "./Stats/Stats";

const Main = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPauseLocked, setIsPauseLocked] = useState(false);

  const [mainView, setMainView] = useState<MainViewType>("typing");

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
  );
};

export default Main;
