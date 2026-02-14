import Key from "@/components/pages/Main/Typing/Keyboard/Key/Key";
import { usePause } from "@/store/pauseStore";

import keycode from "keycode";
import { useEffect, useState } from "react";

export interface KeyboardKey {
  mainSymbol: string;
  shiftSymbol?: string;
  visualName?: string;
  styles?: string;
}

const defaultKeyboardKey: Required<KeyboardKey> = {
  mainSymbol: "",
  shiftSymbol: "",
  visualName: "",
  styles: "",
};

const createKeyboardKey = (options: KeyboardKey): Required<KeyboardKey> => {
  return { ...defaultKeyboardKey, ...options };
};

interface Row {
  keyboardKeys: Required<KeyboardKey>[];
  styles?: string;
}

const keyboardRows: Row[] = [
  {
    keyboardKeys: [
      createKeyboardKey({ mainSymbol: "1", shiftSymbol: "!" }),
      createKeyboardKey({ mainSymbol: "2", shiftSymbol: "@" }),
      createKeyboardKey({ mainSymbol: "3", shiftSymbol: "#" }),
      createKeyboardKey({ mainSymbol: "4", shiftSymbol: "$" }),
      createKeyboardKey({ mainSymbol: "5", shiftSymbol: "%" }),
      createKeyboardKey({ mainSymbol: "6", shiftSymbol: "^" }),
      createKeyboardKey({ mainSymbol: "7", shiftSymbol: "&" }),
      createKeyboardKey({ mainSymbol: "8", shiftSymbol: "*" }),
      createKeyboardKey({ mainSymbol: "9", shiftSymbol: "(" }),
      createKeyboardKey({ mainSymbol: "0", shiftSymbol: ")" }),
    ],
  },
  {
    styles: "md:ml-6",
    keyboardKeys: [
      createKeyboardKey({ mainSymbol: "q", shiftSymbol: "Q" }),
      createKeyboardKey({ mainSymbol: "w", shiftSymbol: "W" }),
      createKeyboardKey({ mainSymbol: "e", shiftSymbol: "E" }),
      createKeyboardKey({ mainSymbol: "r", shiftSymbol: "R" }),
      createKeyboardKey({ mainSymbol: "t", shiftSymbol: "T" }),
      createKeyboardKey({ mainSymbol: "y", shiftSymbol: "Y" }),
      createKeyboardKey({ mainSymbol: "u", shiftSymbol: "U" }),
      createKeyboardKey({ mainSymbol: "i", shiftSymbol: "I" }),
      createKeyboardKey({ mainSymbol: "o", shiftSymbol: "O" }),
      createKeyboardKey({ mainSymbol: "p", shiftSymbol: "P" }),
    ],
  },
  {
    styles: "md:ml-10",
    keyboardKeys: [
      createKeyboardKey({ mainSymbol: "a", shiftSymbol: "A" }),
      createKeyboardKey({ mainSymbol: "s", shiftSymbol: "S" }),
      createKeyboardKey({ mainSymbol: "d", shiftSymbol: "D" }),
      createKeyboardKey({ mainSymbol: "f", shiftSymbol: "F" }),
      createKeyboardKey({ mainSymbol: "g", shiftSymbol: "G" }),
      createKeyboardKey({ mainSymbol: "h", shiftSymbol: "H" }),
      createKeyboardKey({ mainSymbol: "j", shiftSymbol: "J" }),
      createKeyboardKey({ mainSymbol: "k", shiftSymbol: "K" }),
      createKeyboardKey({ mainSymbol: "l", shiftSymbol: "L" }),
    ],
  },
  {
    styles: "md:ml-16",
    keyboardKeys: [
      createKeyboardKey({ mainSymbol: "z", shiftSymbol: "Z" }),
      createKeyboardKey({ mainSymbol: "x", shiftSymbol: "X" }),
      createKeyboardKey({ mainSymbol: "c", shiftSymbol: "C" }),
      createKeyboardKey({ mainSymbol: "v", shiftSymbol: "V" }),
      createKeyboardKey({ mainSymbol: "b", shiftSymbol: "B" }),
      createKeyboardKey({ mainSymbol: "n", shiftSymbol: "N" }),
      createKeyboardKey({ mainSymbol: "m", shiftSymbol: "M" }),
    ],
  },
  {
    styles: "md:ml-42",
    keyboardKeys: [
      createKeyboardKey({
        mainSymbol: " ",
        visualName: "Space",
        styles: "w-78",
      }),
    ],
  },
];

const Keyboard = () => {
  const [downKeys, setDownKeys] = useState<string[]>([]);
  const isPaused = usePause((state) => state.values.isPaused);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = keycode(event);

      setDownKeys((prev) => (!event.repeat ? [...prev, key] : prev));
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const key = keycode(event);

      setDownKeys((prev) => prev.filter((keyboardKey) => keyboardKey !== key));
    };

    if (!isPaused) {
      addEventListener("keydown", onKeyDown);
      addEventListener("keyup", onKeyUp);
    }

    return () => {
      removeEventListener("keydown", onKeyDown);
      removeEventListener("keyup", onKeyUp);
    };
  }, [isPaused]);

  return (
    <section className="grid grid-cols-1 gap-2">
      {keyboardRows.map((row, index) => (
        <div className={`flex gap-2 ${row.styles}`} key={index}>
          {row.keyboardKeys.map((keyboardKey) => (
            <Key
              key={keyboardKey.mainSymbol}
              keyboardKey={keyboardKey}
              isPressed={
                downKeys.includes(keyboardKey.mainSymbol) ||
                downKeys.includes(keyboardKey.shiftSymbol)
              }
            />
          ))}
        </div>
      ))}
    </section>
  );
};

export default Keyboard;
