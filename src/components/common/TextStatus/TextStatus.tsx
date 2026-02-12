import ModeSelector from "@/components/common/TextStatus/ModeSelector/ModeSelector";
import PauseStatus from "@/components/common/TextStatus/PauseStatus/PauseStatus";
import { TypingModesViews } from "@/components/common/TextStatus/TypingModes";
import { type TypingMode } from "@/types";
import { useState } from "react";

const TextStatus = () => {
  const [mode, setMode] = useState<TypingMode>("infinite");

  const ActiveMode = TypingModesViews[mode];

  return (
    <nav className="border-b border-gray-400 border-solid py-2 flex justify-between">
      <PauseStatus />
      <div className="flex gap-2 items-center">
        <ModeSelector setMode={setMode} />
        <ActiveMode />
      </div>
    </nav>
  );
};

export default TextStatus;
