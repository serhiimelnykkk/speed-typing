import Keyboard from "@/components/pages/Main/Typing/Keyboard/Keyboard";
import TextStatus from "@/components/pages/Main/Typing/TextStatus/TextStatus";
import TypingArea from "@/components/pages/Main/Typing/TypingArea/TypingArea";
import { usePause } from "@/store/pauseStore";
import { useEffect } from "react";

const Typing = () => {
  const setPause = usePause((state) => state.actions.setState);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      const isPauseLocked = usePause.getState().values.isPauseLocked;

      if (event.key === "Escape" && !isPauseLocked) {
        setPause((state) => ({ isPaused: !state.isPaused }));
      }
    };

    addEventListener("keydown", onKeyDown);

    return () => removeEventListener("keydown", onKeyDown);
  }, [setPause]);

  return (
    <div className="h-full flex flex-col">
      <TextStatus />
      <div className="flex flex-1 items-end">
        <TypingArea />
      </div>
      <div className="flex w-fit mx-auto flex-1 items-center">
        <Keyboard />
      </div>
    </div>
  );
};

export default Typing;
