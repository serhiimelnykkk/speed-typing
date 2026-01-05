import { useState, useEffect, useRef } from "react";
import { usePauseContext } from "../../../../context/PauseContext";
import { useWpmDispatch } from "../../../../context/WpmContext";
import keycode from "keycode";

const useTime = () => {
  const totalTime = useRef(0);
  const pauseStartedAt = useRef(0);

  const resetTimer = () => {
    totalTime.current = performance.now();
  };
  const getTimeElapsed = () =>
    (performance.now() - totalTime.current) / 60 / 1000;

  const isPaused = usePauseContext();

  useEffect(() => {
    if (isPaused) {
      pauseStartedAt.current = performance.now();
    } else {
      if (pauseStartedAt.current) {
        totalTime.current += performance.now() - pauseStartedAt.current;
        pauseStartedAt.current = 0;
      }
    }
  }, [isPaused]);

  return { resetTimer, getTimeElapsed };
};

const calculateWpm = (chars: number, errors: number, timeElapsed: number) => {
  const wpm = chars / 5 / timeElapsed - errors / timeElapsed;

  const roundedWpm = Math.round(wpm);

  return roundedWpm;
};

const useChars = () => {
  const totalChars = useRef(0);
  const totalErrors = useRef(0);

  const recordChar = () => totalChars.current++;
  const recordError = () => totalErrors.current++;

  const dispatch = useWpmDispatch();

  const update = (timeElapsed: number) => {
    const wpm = calculateWpm(
      totalChars.current,
      totalErrors.current,
      timeElapsed
    );

    dispatch((prev) => (prev > 0 ? Math.round((prev + wpm) / 2) : wpm));

    totalChars.current = 0;
    totalErrors.current = 0;
  };

  return { recordChar, recordError, update };
};

const transformKey = (event: KeyboardEvent) => {
  let key = keycode(event);
  if (key === "space") {
    key = " ";
  }

  if (event.key !== key.toLowerCase()) {
    key = key.toUpperCase();
  }

  return key;
};

const useText = (nextSequence: () => string) => {
  const nextSequenceRef = useRef(nextSequence);

  const [currentSequence, setCurrentSequence] = useState(nextSequence());
  const [enteredText, setEnteredText] = useState("");
  const [correctButtonPressed, setCorrectButtonPressed] = useState(true);

  const remainingText = currentSequence.slice(enteredText.length);

  const isPaused = usePauseContext();

  const { resetTimer, getTimeElapsed } = useTime();
  const { recordChar, recordError, update } = useChars();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }

    const key = transformKey(event);

    if (key.length === 1) {
      if (enteredText.length === 0) {
        resetTimer();
      }

      if (key === remainingText[0]) {
        recordChar();
        if (remainingText.length === 1) {
          const sequence = nextSequenceRef.current();
          setEnteredText("");
          update(getTimeElapsed());
          setCurrentSequence(sequence);
        } else {
          setEnteredText((prev) =>
            prev.length < currentSequence.length
              ? prev + currentSequence[prev.length]
              : prev
          );
          setCorrectButtonPressed(true);
        }
      } else {
        recordError();
        setCorrectButtonPressed(false);
      }
    }
  };

  const handleKeyDownRef = useRef(handleKeyDown);

  useEffect(() => {
    handleKeyDownRef.current = handleKeyDown;
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => handleKeyDownRef.current(event);

    if (!isPaused) {
      addEventListener("keydown", listener);
    }

    return () => removeEventListener("keydown", listener);
  }, [isPaused]);

  return {
    enteredText,
    remainingText,
    correctButtonPressed,
  };
};

export default useText;
