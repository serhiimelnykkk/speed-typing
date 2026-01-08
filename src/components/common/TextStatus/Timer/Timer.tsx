import { useState, useRef } from "react";
import { usePauseLockContext } from "../../../../context/PauseLockContext";
import { useNavigate } from "react-router";

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [duration, setDuration] = useState(0);
  const setIsPauseLocked = usePauseLockContext();
  const navigate = useNavigate();

  const intervalRef = useRef(0);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimeRemaining(0);
    setDuration(0);
    setIsPauseLocked(false);
    navigate("/stats");
  };

  const startTimer = () => {
    if (timeRemaining > 0 || duration <= 0) return;
    setIsPauseLocked(true);

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
      <button onClick={stopTimer} className="cursor-pointer">
        Stop
      </button>
      <label htmlFor="time">
        <span>Time in Milliseconds</span>
      </label>
      <input
        name="time"
        type="text"
        value={duration}
        onChange={handleChange}
        className="border border-gray-500"
      />
    </div>
  );
};

export default Timer;
