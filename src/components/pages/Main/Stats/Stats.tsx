import { useWpm } from "@/context/WpmContext";

const Stats = () => {
  const wpm = useWpm();

  return <div>Stats: {wpm}</div>;
};

export default Stats;
