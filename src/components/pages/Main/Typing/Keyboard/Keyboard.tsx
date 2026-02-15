import { Key } from "@/components/pages/Main/Typing/Keyboard/Key/Key";
import { useKeyboard } from "@/store/keyboardStore";
import { usePause } from "@/store/pauseStore";

import keycode from "keycode";
import { useEffect } from "react";

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
  const setKeyboard = useKeyboard((state) => state.actions.setState);

  useEffect(() => {
    const isPaused = usePause.getState().values.isPaused;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      const key = keycode(event);

      setKeyboard((state) => ({
        ...state,
        downKeys: [...state.downKeys, key],
      }));
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const key = keycode(event);

      setKeyboard((state) => ({
        ...state,
        downKeys: state.downKeys.filter((keyboardKey) => keyboardKey !== key),
      }));
    };

    if (!isPaused) {
      addEventListener("keydown", onKeyDown);
      addEventListener("keyup", onKeyUp);
    }

    return () => {
      removeEventListener("keydown", onKeyDown);
      removeEventListener("keyup", onKeyUp);
    };
  }, [setKeyboard]);

  return (
    <section className="grid grid-cols-1 gap-2">
      {keyboardRows.map((row, index) => (
        <div className={`flex gap-2 ${row.styles}`} key={index}>
          {row.keyboardKeys.map((keyboardKey) => (
            <Key key={keyboardKey.mainSymbol} keyboardKey={keyboardKey} />
          ))}
        </div>
      ))}
    </section>
  );
};

export default Keyboard;
