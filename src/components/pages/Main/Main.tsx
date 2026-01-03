import TextType from "../../common/TextType/TextType";
import Keyboard from "../../common/Keyboard/Keyboard";
import TextStatus from "../../common/TextStatus/TextStatus";
import { PauseContext } from "../../../context/PauseContext";
import { useEffect, useState } from "react";

const Main = () => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPaused((prev) => !prev);
      }
    };

    addEventListener("keydown", onKeyDown);

    return () => removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="size-full px-10 ">
      <PauseContext value={isPaused}>
        <div className="flex flex-col h-[50%] justify-end">
          <TextStatus />
          <TextType />
        </div>
        <Keyboard />
      </PauseContext>
    </main>
  );
};

export default Main;
