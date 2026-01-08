import TypingArea from "../../common/TypingArea/TypingArea";
import Keyboard from "../../common/Keyboard/Keyboard";
import TextStatus from "../../common/TextStatus/TextStatus";
import { PauseContext } from "../../../context/PauseContext";
import { useEffect, useState } from "react";
import {
  WpmStateContext,
  WpmDispatchContext,
} from "../../../context/WpmContext";
import { PauseLockContext } from "../../../context/PauseLockContext";

const Main = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
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
          <div className="flex flex-col h-[50%] justify-end">
            <WpmStateContext value={wordsPerMinute}>
              <TextStatus />
            </WpmStateContext>
            <WpmDispatchContext value={setWordsPerMinute}>
              <TypingArea />
            </WpmDispatchContext>
          </div>
          <Keyboard />
        </main>
      </PauseLockContext>
    </PauseContext>
  );
};

export default Main;
