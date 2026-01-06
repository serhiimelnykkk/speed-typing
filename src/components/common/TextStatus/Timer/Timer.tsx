import { useState } from "react";

const duration = 30_000;

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  const startTimer = () => {
    if (timeRemaining > 0) return;

    const endTime = duration + performance.now();
    const interval = setInterval(() => {
      const remaining = Math.ceil((endTime - performance.now()) / 1000);
      if (remaining <= 0) {
        setTimeRemaining(0);
        clearInterval(interval);
      } else {
        setTimeRemaining(remaining);
      }
    }, 100);
  };

  return (
    <div className="flex gap-4">
      <span>Timer: {timeRemaining}</span>
      <button onClick={startTimer} className="cursor-pointer">
        Start
      </button>
    </div>
  );
};

export default Timer;
