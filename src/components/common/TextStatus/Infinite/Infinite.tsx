import { useWpmStats } from "@/context/WpmContext/Context";

const Infinite = () => {
  const { stats } = useWpmStats();

  return (
    <div>
      <span>
        WPM: {stats.wpm} | Accuracy: {(stats.accuracy * 100).toFixed(1)}%
      </span>
    </div>
  );
};

export default Infinite;
