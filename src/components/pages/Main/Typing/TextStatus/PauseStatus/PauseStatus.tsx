import { usePause } from "@/store/pauseStore";

const PauseOverlay = () => {
  const isPaused = usePause((state) => state.values.isPaused);

  return (
    <>
      <span>Pause</span>
      <kbd
        className={`inline-block ${
          isPaused ? "bg-green-600" : "bg-neutral-600"
        } px-2 py-0.5 text-sm text-gray-50 rounded-xs
          transition-colors duration-200`}
      >
        <span>Esc</span>
      </kbd>
    </>
  );
};

export default PauseOverlay;
