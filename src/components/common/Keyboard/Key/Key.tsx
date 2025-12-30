import { type KeyboardKey } from "../Keyboard";
import { memo } from "react";

interface KeyProps {
  isPressed: boolean;
  keyboardKey: Required<KeyboardKey>;
}

const Key = memo(({ isPressed, keyboardKey }: KeyProps) => {
  return (
    <div
      className={`relative h-12 bg-gray-300 border border-gray-900 text-xs sm:text-base
                ${isPressed ? "bg-green-700 text-gray-50" : ""} 
              rounded-sm font-bold w-12 ${keyboardKey.styles}`}
      key={keyboardKey.mainSymbol}
    >
      <div className="absolute top-1 left-1">
        {keyboardKey.visualName || keyboardKey.mainSymbol}
      </div>
      <div className="absolute bottom-1 right-1">{keyboardKey.shiftSymbol}</div>
    </div>
  );
});

export default Key;
