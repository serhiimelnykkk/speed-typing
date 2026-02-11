import { usePause } from "@/context/PauseContext/Context";

const PauseOverlay = () => {
  const { isPaused } = usePause();

  return (
    <div>
      Pause{" "}
      <kbd
        className={`inline-block ${
          isPaused ? "bg-green-600" : "bg-red-600"
        } px-2 py-1 w-12 text-center font-bold text-gray-50 rounded-sm
          transition-colors duration-200`}
      >
        Esc
      </kbd>
    </div>
  );
};

export default PauseOverlay;
