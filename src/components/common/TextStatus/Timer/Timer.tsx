import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import useTimer from "@/components/common/TextStatus/Timer/hooks/useTimer";
import { useMainViewContext } from "@/context/MainViewContext/Context";
import { usePauseContext } from "@/context/PauseContext/Context";
import { useWpmHandlersContext } from "@/context/WpmHandlersContext/Context";
import { useState } from "react";

const Timer = () => {
  const [duration, setDuration] = useState(0);
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const { setIsPauseLocked } = usePauseContext();
  const { setMainView } = useMainViewContext();
  const wpmHandlers = useWpmHandlersContext();

  const onStop = () => {
    setDuration(0);
    setIsPauseLocked(false);
    if (wpmHandlers.current) {
      wpmHandlers.current.update();
    }

    setIsTimerStarted(false);

    setMainView("stats");
  };

  const onStart = () => {
    if (wpmHandlers.current) {
      wpmHandlers.current.reset();
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
    <>
      <span>Timer: {timeRemaining}</span>
      <Button onClick={startTimer}>Start</Button>
      <Button onClick={stopTimer} disabled={!isTimerStarted}>
        Stop
      </Button>
      <label htmlFor="time">
        <span>Duration</span>
      </label>
      <Input name="time" type="text" value={duration} onChange={handleChange} />
    </>
  );
};

export default Timer;
