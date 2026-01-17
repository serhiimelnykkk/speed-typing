import { TypingModes, type TypingMode } from "@/types";

interface Props {
  setMode: React.Dispatch<React.SetStateAction<TypingMode>>;
}

const ModeSelector = ({ setMode }: Props) => {
  const handleModeChange = (mode: TypingMode) => {
    setMode(mode);
  };

  return (
    <>
      {" "}
      {TypingModes.map((mode) => (
        <button key={mode} onClick={() => handleModeChange(mode)}>
          {mode}
        </button>
      ))}
    </>
  );
};

export default ModeSelector;
