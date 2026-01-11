import { usePauseContext } from "@/context/PauseContext/Context";
import TypingText from "@/components/common/TypingArea/TypingText/TypingText";

const TypingArea = () => {
  const { isPaused } = usePauseContext();

  return (
    <section className="relative text-4xl/14 font-mono">
      <div
        className={`absolute inset-0 backdrop-blur-xs flex items-center justify-center transition-opacity ${
          isPaused ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={`text-xl font-sans px-4 py-2 bg-gray-300 rounded-sm`}>
          Press{" "}
          <span
            className={`bg-gray-600 px-2 py-1 text-sm text-gray-50 rounded-sm font-mono align-middle`}
          >
            Escape
          </span>{" "}
          to unpause.
        </div>
      </div>
      <div className="px-1">
        <TypingText />
      </div>
    </section>
  );
};

export default TypingArea;
