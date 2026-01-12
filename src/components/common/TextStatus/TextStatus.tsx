import { usePauseContext } from "@/context/PauseContext/Context";
import { useWpm } from "@/context/WpmContext";
import Timer from "@/components/common/TextStatus/Timer/Timer";

const TextStatus = () => {
  const { isPaused } = usePauseContext();
  const wordsPerMinute = useWpm();

  return (
    <nav className="border-b border-gray-400 border-solid py-2 font-mono flex justify-between">
      <div>
        Pause{" "}
        <kbd className="bg-gray-600 px-2 py-1 text-sm text-gray-50 rounded-sm font-mono align-middle">
          Esc
        </kbd>{" "}
        <span
          className={`inline-block ${
            isPaused ? "bg-green-600" : "bg-red-600"
          } px-2 py-1 w-12 text-center font-bold text-gray-50 rounded-sm`}
        >
          {isPaused ? "ON" : "OFF"}
        </span>
      </div>
      <div className="flex gap-4">
        <Timer />
        <div>Words Per Minute: {wordsPerMinute}</div>
      </div>
    </nav>
  );
};

export default TextStatus;
