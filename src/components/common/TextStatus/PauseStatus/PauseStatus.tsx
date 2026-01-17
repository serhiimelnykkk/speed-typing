import { usePauseContext } from "@/context/PauseContext/Context";

const PauseOverlay = () => {
  const { isPaused } = usePauseContext();

  return (
    <>
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
    </>
  );
};

export default PauseOverlay;
