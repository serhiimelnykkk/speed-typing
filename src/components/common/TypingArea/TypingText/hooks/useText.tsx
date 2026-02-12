import { usePause } from "@/context/PauseContext/Context";
import { useWpm } from "@/store/wpmStore";
import { initialStats } from "@/types";
import { calculateWpm, transformKey } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

const useTimeElapsed = () => {
  const totalTime = useRef(0);
  const pauseStartedAt = useRef(0);

  const resetTimer = useCallback(() => {
    totalTime.current = performance.now();
  }, []);
  const getTimeElapsed = useCallback(
    () => (performance.now() - totalTime.current) / 60 / 1000,
    [],
  );

  const { isPaused } = usePause();

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

const useChars = () => {
  const totalChars = useRef(0);
  const totalErrors = useRef(0);

  const recordChar = useCallback(() => totalChars.current++, []);
  const recordError = useCallback(() => totalErrors.current++, []);

  const resetChars = useCallback(
    (
      callback?: (chars: number, errors: number, ...rest: unknown[]) => void,
    ) => {
      if (callback) {
        callback(totalChars.current, totalErrors.current);
      }

      totalChars.current = 0;
      totalErrors.current = 0;
    },
    [],
  );

  return { recordChar, recordError, resetChars };
};

const useKeydownListener = (handler: (event: KeyboardEvent) => void) => {
  const handlerRef = useRef(handler);
  const { isPaused } = usePause();

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => handlerRef.current(event);

    if (!isPaused) {
      addEventListener("keydown", listener);
    }

    return () => removeEventListener("keydown", listener);
  }, [isPaused]);
};

const useText = (nextSequence: () => string) => {
  const [currentSequence, setCurrentSequence] = useState(nextSequence());
  const [enteredText, setEnteredText] = useState("");
  const [correctButtonPressed, setCorrectButtonPressed] = useState(true);

  const remainingText = currentSequence.slice(enteredText.length);

  const { resetTimer, getTimeElapsed } = useTimeElapsed();
  const { recordChar, recordError, resetChars } = useChars();

  const { setHandlers, setState } = useWpm(
    useShallow((state) => ({
      setHandlers: state.actions.setHandlers,
      setState: state.actions.setState,
    })),
  );

  const lastError = useRef(false);

  const updateSequence = useCallback(() => {
    const sequence = nextSequence();
    setEnteredText("");
    setCurrentSequence(sequence);
  }, [nextSequence]);

  const onCharsReset = useCallback(
    (chars: number, errors: number) => {
      const timeElapsed = getTimeElapsed();
      const newWpm = calculateWpm(chars, errors, timeElapsed);

      const avgWpm = (prev: number, curr: number) => {
        return prev > 0 ? Math.round((prev + curr) / 2) : curr;
      };
      const avgAccuracy = (prev: number, curr: number) => {
        curr = curr * 100;
        return prev > 0 ? Math.round((prev + curr) / 2) : curr;
      };

      setState((state) => ({
        wpm: avgWpm(state.wpm, newWpm.wpm),
        accuracy: avgAccuracy(state.accuracy, newWpm.accuracy),
      }));
    },
    [getTimeElapsed, setState],
  );

  const onCorrectKeyPress = () => {
    lastError.current = false;
    if (remainingText.length === 1) {
      resetChars(onCharsReset);
      updateSequence();
    } else {
      setEnteredText((prev) =>
        prev.length < currentSequence.length
          ? prev + currentSequence[prev.length]
          : prev,
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

  useKeydownListener(handleKeyDown);

  useEffect(() => {
    setHandlers({
      update: () => {
        return resetChars(onCharsReset);
      },
      reset: () => {
        setState(initialStats);
        updateSequence();
      },
    });
  }, [onCharsReset, resetChars, setHandlers, updateSequence, setState]);

  return {
    enteredText,
    remainingText,
    correctButtonPressed,
  };
};

export default useText;
