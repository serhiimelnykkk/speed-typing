import { TypingModes, type TypingMode } from "@/types";
import {
  Infinity as InfinityIcon,
  Timer as TimerIcon,
  type LucideIcon,
} from "lucide-react";

interface Props {
  setMode: React.Dispatch<React.SetStateAction<TypingMode>>;
}

const modeIcons: Record<TypingMode, LucideIcon> = {
  infinite: InfinityIcon,
  timer: TimerIcon,
};

const ModeSelector = ({ setMode }: Props) => {
  const handleModeChange = (mode: TypingMode) => {
    setMode(mode);
  };

  return (
    <div className="flex border border-neutral-500 rounded-sm">
      {TypingModes.map((mode) => {
        const Icon = modeIcons[mode];
        return (
          <>
            <button
              className="flex group items-center gap-1 px-2 py-1"
              key={mode}
              onClick={() => handleModeChange(mode)}
            >
              <Icon
                size={20}
                className="group-hover:text-neutral-500 transition-colors duration-200"
              />
              <span className="group-hover:text-green-600 transition-colors duration-200">
                {mode}
              </span>
            </button>
          </>
        );
      })}
    </div>
  );
};

export default ModeSelector;
