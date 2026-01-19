import { useWpmContext } from "@/context/WpmContext/Context";

const Stats = () => {
  const { stats } = useWpmContext();

  return (
    <section className="h-full flex items-center justify-center">
      <div>
        <span className="text-3xl inline-block">
          WPM: {stats.wpm} | Accuracy: {(stats.accuracy * 100).toFixed(1)}%
        </span>
      </div>
    </section>
  );
};

export default Stats;
