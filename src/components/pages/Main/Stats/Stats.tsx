import { useWpm } from "@/store/wpmStore";
import { useShallow } from "zustand/shallow";

const Stats = () => {
  const { wpm, accuracy } = useWpm(
    useShallow((state) => ({
      wpm: state.values.wpm,
      accuracy: state.values.accuracy,
    })),
  );

  return (
    <section className="h-full flex items-center justify-center">
      <div>
        <span className="text-3xl inline-block">
          WPM: {wpm} | Accuracy: {(accuracy * 100).toFixed(1)}%
        </span>
      </div>
    </section>
  );
};

export default Stats;
