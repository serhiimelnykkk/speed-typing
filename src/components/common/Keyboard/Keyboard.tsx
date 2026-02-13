import { Key } from "@/components/common/Keyboard/Key/Key";
import { useKeyboard } from "@/store/keyboardStore";
import { usePause } from "@/store/pauseStore";

import keycode from "keycode";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export interface KeyboardKey {
  mainSymbol: string;
  shiftSymbol?: string;
  viewName?: string;
  styles?: string;
}

const initialKeyboardKey: Required<KeyboardKey> = {
  mainSymbol: "",
  shiftSymbol: "",
  viewName: "",
  styles: "",
};

const createKeyboardKey = (options: KeyboardKey): Required<KeyboardKey> => {
  return { ...initialKeyboardKey, ...options };
};

const createLetters = (letters: string): Required<KeyboardKey>[] => {
  return Array.from(letters).map<Required<KeyboardKey>>((letter) => ({
    ...initialKeyboardKey,
    mainSymbol: letter,
    shiftSymbol: letter.toUpperCase(),
  }));
};

const createNumbers = (): Required<KeyboardKey>[] => {
  const numbers = Array.from("1234567890");
  const specials = "!@#$%^&*()";

  return numbers.map<Required<KeyboardKey>>((number, index) => ({
    ...initialKeyboardKey,
    mainSymbol: number,
    shiftSymbol: specials[index],
  }));
};

interface Row {
  keyboardKeys: Required<KeyboardKey>[];
  styles?: string;
}

const keyboardRows: Row[] = [
  {
    keyboardKeys: createNumbers(),
  },
  {
    styles: "md:ml-6",
    keyboardKeys: createLetters("qwertyuiop"),
  },
  {
    styles: "md:ml-10",
    keyboardKeys: createLetters("asdfghjkl"),
  },
  {
    styles: "md:ml-16",
    keyboardKeys: createLetters("zxcvbnm"),
  },
  {
    styles: "md:ml-42",
    keyboardKeys: [
      createKeyboardKey({
        mainSymbol: " ",
        viewName: "Space",
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
