import { useState, useEffect, useRef, useImperativeHandle } from "react";
import { usePauseContext } from "@/context/PauseContext/Context";
import { useWpmContext } from "@/context/WpmContext/Context";
import keycode from "keycode";
import { useWpmHandlersContext } from "@/context/WpmHandlersContext/Context";

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

  const reset = (
    callback?: (chars: number, errors: number, ...rest: unknown[]) => void
  ) => {
    if (callback) {
      callback(totalChars.current, totalErrors.current);
    }

    totalChars.current = 0;
    totalErrors.current = 0;
  };

  return { recordChar, recordError, reset };
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
  const { recordChar, recordError, reset } = useChars();
  const { setWpm } = useWpmContext();

  const wpmHandlersContext = useWpmHandlersContext();

  const updateSequence = () => {
    const sequence = nextSequence();
    setEnteredText("");
    setCurrentSequence(sequence);
  };

  const onCharsReset = (chars: number, errors: number) => {
    const timeElapsed = getTimeElapsed();
    const wpm = calculateWpm(chars, errors, timeElapsed);

    setWpm((prev) => (prev > 0 ? Math.round((prev + wpm) / 2) : wpm));
  };

  const onCorrectKeyPress = () => {
    lastError.current = false;
    if (remainingText.length === 1) {
      reset(onCharsReset);
      updateSequence();
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

  useImperativeHandle(wpmHandlersContext.handlerRefs, () => ({
    update: () => {
      return reset(onCharsReset);
    },
    reset: () => {
      setWpm(0);
      updateSequence();
    },
  }));

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
