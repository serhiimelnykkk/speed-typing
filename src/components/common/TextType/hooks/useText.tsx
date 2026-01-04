import { useState, useEffect, useRef } from "react";
import { usePauseContext } from "../../../../context/PauseContext";
import { useWpmDispatch } from "../../../../context/WpmContext";
import keycode from "keycode";

const useText = (nextSequence: () => string) => {
  const nextSequenceRef = useRef(nextSequence);

  const [currentSequence, setCurrentSequence] = useState(nextSequence());
  const [typedText, setTypedText] = useState<string>("");
  const [correctButtonPressed, setCorrectButtonPressed] = useState(true);
  const [sequenceStarted, setSequenceStarted] = useState(false);

  const textLeft = currentSequence.slice(typedText.length);

  const isPaused = usePauseContext();

  const totalChars = useRef(0);
  const totalErrors = useRef(0);

  const startTime = useRef(0);

  const pauseTime = useRef(0);
  const pauseStartedAt = useRef(0);

  const dispatch = useWpmDispatch();

  useEffect(() => {
    if (sequenceStarted) {
      startTime.current = performance.now();
      pauseStartedAt.current = 0;
      pauseTime.current = 0;
    }
  }, [sequenceStarted]);

  useEffect(() => {
    if (isPaused) {
      pauseStartedAt.current = performance.now();
    } else {
      if (pauseStartedAt.current) {
        pauseTime.current += performance.now() - pauseStartedAt.current;
        pauseStartedAt.current = 0;
      }
    }
  }, [isPaused]);

  useEffect(() => {
    const countChar = () => totalChars.current++;
    const countError = () => totalErrors.current++;
    const update = () => {
      const endTime = performance.now();
      const timeElapsedMinutes =
        (endTime - startTime.current - pauseTime.current) / 60 / 1000;

      const wpm =
        totalChars.current / 5 / timeElapsedMinutes -
        totalErrors.current / timeElapsedMinutes;

      const roundedWpm = Math.round(wpm);

      totalChars.current = 0;
      totalErrors.current = 0;

      dispatch((prev) =>
        prev > 0 ? Math.round((prev + roundedWpm) / 2) : roundedWpm
      );

      setSequenceStarted(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      let key = keycode(event);

      if (key === "space") {
        key = " ";
      }

      if (event.key !== key.toLowerCase()) {
        key = key.toUpperCase();
      }

      if (key.length === 1) {
        if (typedText.length === 0) {
          setSequenceStarted(true);
        }
        if (key === textLeft[0]) {
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
  }, [
    textLeft,
    currentSequence,
    nextSequenceRef,
    isPaused,
    dispatch,
    typedText.length,
  ]);

  return { typedText, textLeft, correctButtonPressed };
};

export default useText;
