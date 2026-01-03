import { useState, useEffect, useRef } from "react";
import { usePauseContext } from "../../../../context/PauseContext";

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

  useEffect(() => {
    startTime.current = performance.now();
  }, []);

  const countChar = () => totalChars.current++;
  const countError = () => totalErrors.current++;
  const update = () => {
    const endTime = performance.now();
    const timeElapsedMinutes = (endTime - startTime.current) / 60 / 1000;

    const wpm =
      totalChars.current / 5 / timeElapsedMinutes -
      totalErrors.current / timeElapsedMinutes;

    const finalWpm = Math.round(wpm);

    console.log(finalWpm);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        if (event.key === textLeft[0]) {
          countChar();
          if (textLeft.length === 1) {
            const sequence = nextSequenceRef.current();
            setTypedText("");
            setCurrentSequence(sequence);
            update();
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
  }, [textLeft, currentSequence, nextSequenceRef, isPaused]);

  return { typedText, textLeft, correctButtonPressed };
};

export default useText;
