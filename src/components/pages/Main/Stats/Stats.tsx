import { useWpmContext } from "@/context/WpmContext/Context";

const Stats = () => {
  const { wpm } = useWpmContext();

  return <div>Stats: {wpm}</div>;
};

export default Stats;
