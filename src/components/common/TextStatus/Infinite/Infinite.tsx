import { useWpm } from "@/store/wpmStore";
import { useShallow } from "zustand/shallow";

const Infinite = () => {
  const { wpm, accuracy } = useWpm(
    useShallow((state) => ({
      wpm: state.values.wpm,
      accuracy: state.values.accuracy,
    })),
  );

  return (
    <div>
      <span>
        WPM: {wpm} | Accuracy: {accuracy.toFixed(1)}%
      </span>
    </div>
  );
};

export default Infinite;
