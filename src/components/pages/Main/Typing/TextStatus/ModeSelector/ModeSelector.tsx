import { TypingModes, type TypingMode } from "@/types";
import Button from "@/components/common/Button/Button";

interface Props {
  setMode: React.Dispatch<React.SetStateAction<TypingMode>>;
}

const ModeSelector = ({ setMode }: Props) => {
  const handleModeChange = (mode: TypingMode) => {
    setMode(mode);
  };

  return (
    <>
      {TypingModes.map((mode) => (
        <Button key={mode} onClick={() => handleModeChange(mode)}>
          {mode}
        </Button>
      ))}
    </>
  );
};

export default ModeSelector;
