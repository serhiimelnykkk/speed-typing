import { useWpmContext } from "@/context/WpmContext/Context";

const Infinite = () => {
  const { stats } = useWpmContext();

  return <div>Words Per Minute: {stats.wpm}</div>;
};

export default Infinite;
