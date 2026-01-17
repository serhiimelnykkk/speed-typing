import { useState } from "react";
import useTimer from "@/components/common/TextStatus/Timer/hooks/useTimer";
import { useMainViewContext } from "@/context/MainViewContext/Context";
import { useWpmHandlersContext } from "@/context/WpmHandlersContext/Context";
import { usePauseContext } from "@/context/PauseContext/Context";
import Button from "@/components/common/Button/Button";

const Timer = () => {
  const [duration, setDuration] = useState(0);
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const { setIsPauseLocked } = usePauseContext();
  const { setMainView } = useMainViewContext();
  const wpmHandlers = useWpmHandlersContext();

  const onStop = () => {
    setDuration(0);
    setIsPauseLocked(false);
    if (wpmHandlers.handlerRefs) {
      wpmHandlers.handlerRefs.current.update();
    }

    setIsTimerStarted(false);

    setMainView("stats");
  };

  const onStart = () => {
    if (wpmHandlers.handlerRefs) {
      wpmHandlers.handlerRefs.current.reset();
    }
    setIsPauseLocked(true);
    setIsTimerStarted(true);
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
    <div className="flex gap-2">
      <span>Timer: {timeRemaining}</span>
      <Button onClick={startTimer}>Start</Button>
      <Button onClick={stopTimer} disabled={!isTimerStarted}>
        Stop
      </Button>
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
