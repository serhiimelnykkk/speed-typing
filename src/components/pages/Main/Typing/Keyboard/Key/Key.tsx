import { type KeyboardKey } from "@/components/pages/Main/Typing/Keyboard/Keyboard";
import { useKeyboard } from "@/store/keyboardStore";
import { memo } from "react";

interface KeyProps {
  keyboardKey: Required<KeyboardKey>;
}

export const Key = memo(({ keyboardKey }: KeyProps) => {
  const isPressed = useKeyboard(
    (state) =>
      state.values.downKeys.includes(keyboardKey.mainSymbol) ||
      state.values.downKeys.includes(keyboardKey.shiftSymbol),
  );

  return (
    <div
      className={`relative h-12 bg-gray-300 border border-gray-900 text-xs sm:text-base
                ${isPressed ? "bg-green-700 text-gray-50" : ""} 
              rounded-sm font-bold w-12 ${keyboardKey.styles}`}
      key={keyboardKey.mainSymbol}
    >
      <div className="absolute top-1 left-1">
        {keyboardKey.viewName || keyboardKey.mainSymbol}
      </div>
      <div className="absolute bottom-1 right-1">{keyboardKey.shiftSymbol}</div>
    </div>
  );
});
