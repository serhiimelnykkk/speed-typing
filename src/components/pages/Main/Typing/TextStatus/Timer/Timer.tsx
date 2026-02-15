import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import useTimer from "@/components/pages/Main/Typing/TextStatus/Timer/hooks/useTimer";
import { useMainView } from "@/context/MainViewContext/Context";
import { usePause } from "@/store/pauseStore";
import { useTimer as useTimerStore } from "@/store/timerStore";
import { useWpm } from "@/store/wpmStore";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

const Timer = () => {
  const [duration, setDuration] = useState(0);
  const { isTimerActive, setTimer } = useTimerStore(
    useShallow((state) => ({
      isTimerActive: state.values.isActive,
      setTimer: state.actions.setState,
    })),
  );

  const setPause = usePause((state) => state.actions.setState);

  const { setMainView } = useMainView();
  const { updateWpm, resetWpm } = useWpm(
    useShallow((state) => ({
      updateWpm: state.handlers.update,
      resetWpm: state.handlers.reset,
    })),
  );

  const onStop = () => {
    updateWpm();

    setDuration(0);
    setPause({ isPauseLocked: false });
    setTimer({ isActive: false });
    setMainView("stats");
  };

  const onStart = () => {
    resetWpm();

    setPause({ isPauseLocked: true });
    setTimer({ isActive: true });
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
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button onClick={startTimer}>Start</Button>
        <Button onClick={stopTimer} disabled={!isTimerActive}>
          Stop
        </Button>
        <Input
          aria-label="duration"
          name="time"
          type="text"
          placeholder="duration"
          value={duration === 0 ? "" : duration}
          onChange={handleChange}
        />
      </div>
      <div>
        <span className="text-xl">{timeRemaining}</span>
      </div>
    </div>
  );
};

export default Timer;
