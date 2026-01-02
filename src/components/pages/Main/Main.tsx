import TextType from "../../common/TextType/TextType";
import Keyboard from "../../common/Keyboard/Keyboard";
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
    <main className="h-full px-10">
      <PauseContext value={isPaused}>
        <div className="flex h-[50%] items-end justify-center">
          <TextType />
        </div>
        <Keyboard />
      </PauseContext>
    </main>
  );
};

export default Main;
