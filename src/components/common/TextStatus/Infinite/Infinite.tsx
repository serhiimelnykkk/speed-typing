import { useWpmContext } from "@/context/WpmContext/Context";

const Infinite = () => {
  const { wpm } = useWpmContext();

  return <div>Words Per Minute: {wpm}</div>;
};

export default Infinite;
