import ModeSelector from "@/components/pages/Main/Typing/TextStatus/ModeSelector/ModeSelector";
import PauseStatus from "@/components/pages/Main/Typing/TextStatus/PauseStatus/PauseStatus";
import { TypingModesViews } from "@/components/pages/Main/Typing/TextStatus/TypingModes";
import { useTimer } from "@/store/timerStore";
import { type TypingMode } from "@/types";
import { LoaderCircle } from "lucide-react";
import { Suspense, useState } from "react";

const TextStatus = () => {
  const [mode, setMode] = useState<TypingMode>("infinite");

  const isTimerActive = useTimer((state) => state.values.isActive);

  const ActiveMode = TypingModesViews[mode];

  return (
    <nav className="border-b border-solid py-2 flex flex-col gap-4">
      <div className="grid grid-cols-[20%_1fr_20%]">
        <div className="flex gap-1 items-center">
          <PauseStatus />
        </div>
        <div className="flex items-center justify-center">
          {!isTimerActive && <ModeSelector setMode={setMode} />}
        </div>
      </div>
      <div className="min-h-8">
        <Suspense
          fallback={<LoaderCircle size={20} className="animate-spin" />}
        >
          <ActiveMode />
        </Suspense>
      </div>
    </nav>
  );
};

export default TextStatus;
