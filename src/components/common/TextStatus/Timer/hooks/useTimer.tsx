import { useState, useRef } from "react";

interface UseTimerProps {
  durationMilliseconds: number;
  onStart: (...rest: unknown[]) => unknown;
  onStop: (...rest: unknown[]) => unknown;
}

const useTimer = ({
  durationMilliseconds: duration,
  onStart,
  onStop,
}: UseTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  const intervalRef = useRef(0);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimeRemaining(0);
    onStop();
  };

  const startTimer = () => {
    if (timeRemaining > 0 || duration <= 0) return;
    onStart();

    const endTime = duration + performance.now();

    const interval = setInterval(() => {
      const remaining = Math.ceil((endTime - performance.now()) / 1000);
      if (remaining <= 0) {
        stopTimer();
      } else {
        setTimeRemaining(remaining);
      }
    }, 100);
    intervalRef.current = interval;
  };

  return { startTimer, stopTimer, timeRemaining };
};

export default useTimer;
