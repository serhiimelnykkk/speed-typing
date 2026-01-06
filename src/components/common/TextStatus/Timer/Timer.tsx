import { useState, useEffect } from "react";

const time = 30_000;

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(time / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.ceil((time - performance.now()) / 1000);
      if (remaining <= 0) {
        setTimeRemaining(0);
        clearInterval(interval);
      } else {
        setTimeRemaining(remaining);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4">
      <span>Timer: {timeRemaining}</span>
      <button className="cursor-pointer">Start</button>
    </div>
  );
};

export default Timer;
