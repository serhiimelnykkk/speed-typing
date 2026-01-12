import { useState, useEffect, useRef, useImperativeHandle } from "react";
import { usePauseContext } from "@/context/PauseContext/Context";
import { useWpmDispatch } from "@/context/WpmContext";
import keycode from "keycode";
import { useWpmUpdateHandlerContext } from "@/context/WpmUpdateHandlerContext/Context";

const useTime = () => {
  const totalTime = useRef(0);
  const pauseStartedAt = useRef(0);

  const resetTimer = () => {
    totalTime.current = performance.now();
  };
  const getTimeElapsed = () =>
    (performance.now() - totalTime.current) / 60 / 1000;

  const { isPaused } = usePauseContext();

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
  const WORD = 5;

  const correctChars = chars - errors;
  const accuracy = correctChars / chars;
  const grossWpm = chars / WORD / timeElapsed;
  const netWpm = grossWpm * accuracy;

  const roundedWpm = Math.round(netWpm);

  return roundedWpm;
};

const useChars = () => {
  const totalChars = useRef(0);
  const totalErrors = useRef(0);

  const recordChar = () => totalChars.current++;
  const recordError = () => totalErrors.current++;

  const dispatch = useWpmDispatch();

  const updateWpm = (timeElapsed: number) => {
    const wpm = calculateWpm(
      totalChars.current,
      totalErrors.current,
      timeElapsed
    );

    dispatch((prev) => (prev > 0 ? Math.round((prev + wpm) / 2) : wpm));

    totalChars.current = 0;
    totalErrors.current = 0;
  };

  return { recordChar, recordError, updateWpm };
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
  const [currentSequence, setCurrentSequence] = useState(nextSequence());
  const [enteredText, setEnteredText] = useState("");
  const [correctButtonPressed, setCorrectButtonPressed] = useState(true);

  const remainingText = currentSequence.slice(enteredText.length);

  const { isPaused } = usePauseContext();

  const lastError = useRef(false);

  const { resetTimer, getTimeElapsed } = useTime();
  const { recordChar, recordError, updateWpm } = useChars();

  const wpmUpdateHandlerContext = useWpmUpdateHandlerContext();

  useImperativeHandle(wpmUpdateHandlerContext.ref, () => ({
    updateWpm: () => {
      return updateWpm(getTimeElapsed());
    },
  }));

  const onCorrectKeyPress = () => {
    lastError.current = false;
    if (remainingText.length === 1) {
      const sequence = nextSequence();
      setEnteredText("");
      updateWpm(getTimeElapsed());
      setCurrentSequence(sequence);
    } else {
      setEnteredText((prev) =>
        prev.length < currentSequence.length
          ? prev + currentSequence[prev.length]
          : prev
      );
      setCorrectButtonPressed(true);
    }
  };

  const onIncorrectKeyPress = () => {
    if (!lastError.current) {
      recordError();
      lastError.current = true;
    }
    setCorrectButtonPressed(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }

    const key = transformKey(event);

    if (key.length === 1) {
      if (enteredText.length === 0) {
        resetTimer();
      }

      if (!lastError.current) {
        recordChar();
      }

      if (key === remainingText[0]) {
        onCorrectKeyPress();
      } else {
        onIncorrectKeyPress();
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
