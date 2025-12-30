import { useEffect, useState } from "react";
import Key from "./Key/Key";

export interface KeyboardKey {
  mainSymbol: string;
  widthMultiplier?: number;
  shiftSymbol?: string;
  isVisible?: boolean;
  visualName?: string;
}

const defaultKeyboardKey: Required<KeyboardKey> = {
  mainSymbol: "",
  widthMultiplier: 1,
  shiftSymbol: "",
  isVisible: true,
  visualName: "",
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
      createKeyboardKey({
        mainSymbol: "`",
        shiftSymbol: "~",
        isVisible: false,
      }),
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
      createKeyboardKey({
        mainSymbol: "-",
        shiftSymbol: "_",
        isVisible: false,
      }),
      createKeyboardKey({
        mainSymbol: "=",
        shiftSymbol: "+",
        isVisible: false,
      }),
      createKeyboardKey({
        mainSymbol: "Backspace",
        widthMultiplier: 2,
        isVisible: false,
      }),
    ],
  },
  {
    keyboardKeys: [
      createKeyboardKey({
        mainSymbol: "Tab",
        widthMultiplier: 1.6,
        isVisible: false,
      }),
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
      createKeyboardKey({ mainSymbol: "[", isVisible: false }),
      createKeyboardKey({ mainSymbol: "]", isVisible: false }),
      createKeyboardKey({ mainSymbol: "\\", isVisible: false }),
    ],
  },
  {
    keyboardKeys: [
      createKeyboardKey({
        mainSymbol: "Capslock",
        isVisible: false,
        widthMultiplier: 1.9,
      }),
      createKeyboardKey({ mainSymbol: "a", shiftSymbol: "A" }),
      createKeyboardKey({ mainSymbol: "s", shiftSymbol: "S" }),
      createKeyboardKey({ mainSymbol: "d", shiftSymbol: "D" }),
      createKeyboardKey({ mainSymbol: "f", shiftSymbol: "F" }),
      createKeyboardKey({ mainSymbol: "g", shiftSymbol: "G" }),
      createKeyboardKey({ mainSymbol: "h", shiftSymbol: "H" }),
      createKeyboardKey({ mainSymbol: "j", shiftSymbol: "J" }),
      createKeyboardKey({ mainSymbol: "k", shiftSymbol: "K" }),
      createKeyboardKey({ mainSymbol: "l", shiftSymbol: "L" }),
      createKeyboardKey({
        mainSymbol: ";",
        shiftSymbol: ":",
        isVisible: false,
      }),
      createKeyboardKey({
        mainSymbol: "'",
        shiftSymbol: '"',
        isVisible: false,
      }),
      createKeyboardKey({
        mainSymbol: "Enter",
        widthMultiplier: 3.2,
        isVisible: false,
      }),
    ],
  },
  {
    keyboardKeys: [
      createKeyboardKey({
        mainSymbol: "Shift",
        isVisible: false,
        widthMultiplier: 2.4,
      }),
      createKeyboardKey({ mainSymbol: "z", shiftSymbol: "Z" }),
      createKeyboardKey({ mainSymbol: "x", shiftSymbol: "X" }),
      createKeyboardKey({ mainSymbol: "c", shiftSymbol: "C" }),
      createKeyboardKey({ mainSymbol: "v", shiftSymbol: "V" }),
      createKeyboardKey({ mainSymbol: "b", shiftSymbol: "B" }),
      createKeyboardKey({ mainSymbol: "n", shiftSymbol: "N" }),
      createKeyboardKey({ mainSymbol: "m", shiftSymbol: "M" }),
      createKeyboardKey({
        mainSymbol: ",",
        shiftSymbol: "<",
        isVisible: false,
      }),
      createKeyboardKey({
        mainSymbol: ".",
        shiftSymbol: ">",
        isVisible: false,
      }),
      createKeyboardKey({
        mainSymbol: "/",
        shiftSymbol: "?",
        isVisible: false,
      }),
    ],
  },
  {
    keyboardKeys: [createKeyboardKey({ mainSymbol: " ", visualName: "Space" })],
  },
];

const Keyboard = () => {
  const [downKeys, setDownKeys] = useState<string[]>([]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      setDownKeys((prev) =>
        !prev.includes(event.key) ? [...prev, event.key] : prev
      );
    };

    const onKeyUp = (event: KeyboardEvent) => {
      setDownKeys((prev) =>
        prev.filter((keyboardKey) => keyboardKey !== event.key)
      );
    };

    addEventListener("keydown", onKeyDown);
    addEventListener("keyup", onKeyUp);

    return () => {
      removeEventListener("keydown", onKeyDown);
      removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <section className="grid grid-cols-1 gap-2 mt-12 w-fit mx-auto">
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
