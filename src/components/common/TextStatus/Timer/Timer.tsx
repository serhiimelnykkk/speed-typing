import { useState } from "react";

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [duration, setDuration] = useState(0);

  console.log("\nrerender\n");

  const startTimer = () => {
    if (timeRemaining > 0 || duration <= 0) return;

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const duration = parseInt(event.target.value);
    setDuration(duration);
  };

  return (
    <div className="flex gap-4">
      <span>Timer: {timeRemaining}</span>
      <button onClick={startTimer} className="cursor-pointer">
        Start
      </button>
      <label>
        <span>Time in Milleseconds</span>
      </label>
      <input
        type="text"
        value={duration}
        onChange={handleChange}
        className="border border-gray-500"
      />
    </div>
  );
};

export default Timer;
