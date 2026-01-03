import { usePauseContext } from "../../../context/PauseContext";

const TextStatus = () => {
  const isPaused = usePauseContext();

  return (
    <nav className="border-b border-gray-400 border-solid py-2 font-mono">
      <div className="">
        Pause <kbd>Esc</kbd>{" "}
        <span
          className={`inline-block ${
            isPaused ? "bg-green-600" : "bg-red-600"
          } px-2 py-1 w-12 text-center font-bold text-gray-50 rounded-sm`}
        >
          {isPaused ? "ON" : "OFF"}
        </span>
      </div>
    </nav>
  );
};

export default TextStatus;
