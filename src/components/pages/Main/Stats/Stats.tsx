import { useWpmContext } from "@/context/WpmContext/Context";

const Stats = () => {
  const { stats } = useWpmContext();

  return <div>Stats: {stats.wpm}</div>;
};

export default Stats;
