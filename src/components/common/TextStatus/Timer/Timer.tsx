import { useState } from "react";
import { usePauseLockContext } from "../../../../context/PauseLockContext";
import { useNavigate } from "react-router";
import useTimer from "./hooks/useTimer";

const Timer = () => {
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();

  const setPauseLock = usePauseLockContext();

  const onStop = () => {
    setDuration(0);
    setPauseLock(false);
    navigate("/stats");
  };

  const onStart = () => {
    setPauseLock(true);
  };

  const { startTimer, stopTimer, timeRemaining } = useTimer({
    durationMilliseconds: duration,
    onStart,
    onStop,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value);
    const duration = isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue;
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
