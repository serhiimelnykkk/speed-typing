import { PauseContext } from "../../../context/PauseContext";
import { PauseLockContext } from "../../../context/PauseLockContext";
import { useEffect, useState } from "react";

import Typing from "./Typing/Typing";

const Main = () => {
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

  return (
    <PauseContext value={isPaused}>
      <PauseLockContext value={setIsPauseLocked}>
        <main className="px-10 h-full max-w-350 mx-auto">
          <Typing />
        </main>
      </PauseLockContext>
    </PauseContext>
  );
};

export default Main;
