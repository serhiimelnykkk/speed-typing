import { useState, useEffect, useRef } from "react";
import { usePauseContext } from "../../../../context/PauseContext";
import { useWpmDispatch } from "../../../../context/WpmContext";

const useText = (nextSequence: () => string) => {
  const nextSequenceRef = useRef(nextSequence);

  const [currentSequence, setCurrentSequence] = useState(nextSequence());
  const [typedText, setTypedText] = useState<string>("");
  const [correctButtonPressed, setCorrectButtonPressed] = useState(true);

  const textLeft = currentSequence.slice(typedText.length);

  const isPaused = usePauseContext();

  const totalChars = useRef(0);
  const totalErrors = useRef(0);

  const startTime = useRef(0);

  const dispatch = useWpmDispatch();

  useEffect(() => {
    startTime.current = performance.now();
  }, [currentSequence]);

  useEffect(() => {
    const countChar = () => totalChars.current++;
    const countError = () => totalErrors.current++;
    const update = () => {
      const endTime = performance.now();
      const timeElapsedMinutes = (endTime - startTime.current) / 60 / 1000;

      const wpm =
        totalChars.current / 5 / timeElapsedMinutes -
        totalErrors.current / timeElapsedMinutes;

      const roundedWpm = Math.round(wpm);

      totalChars.current = 0;
      totalErrors.current = 0;

      dispatch((prev) =>
        prev > 0 ? Math.round((prev + roundedWpm) / 2) : roundedWpm
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        if (event.key === textLeft[0]) {
          countChar();
          if (textLeft.length === 1) {
            const sequence = nextSequenceRef.current();
            setTypedText("");
            update();
            setCurrentSequence(sequence);
          } else {
            setTypedText((prev) =>
              prev.length < currentSequence.length
                ? prev + currentSequence[prev.length]
                : prev
            );
            setCorrectButtonPressed(true);
          }
        } else {
          countError();
          setCorrectButtonPressed(false);
        }
      }
    };

    if (!isPaused) {
      addEventListener("keydown", onKeyDown);
    }

    return () => removeEventListener("keydown", onKeyDown);
  }, [textLeft, currentSequence, nextSequenceRef, isPaused, dispatch]);

  return { typedText, textLeft, correctButtonPressed };
};

export default useText;
