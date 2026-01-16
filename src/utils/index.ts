import { generate } from "random-words";
import keycode from "keycode";

export const generateText = () =>
  (
    generate({
      max: 25,
      min: 25,
      maxLength: 12,
    }) as string[]
  ).reduce((result, current) => (result += " " + current));

export const calculateWpm = (
  chars: number,
  errors: number,
  timeElapsed: number
) => {
  const WORD = 5;

  const correctChars = chars - errors;
  const accuracy = correctChars / chars;
  const grossWpm = chars / WORD / timeElapsed;
  const netWpm = grossWpm * accuracy;

  const roundedWpm = Math.round(netWpm);

  return roundedWpm;
};

export const transformKey = (event: KeyboardEvent) => {
  let key = keycode(event);
  if (key === "space") {
    key = " ";
  }

  if (event.key !== key.toLowerCase()) {
    key = key.toUpperCase();
  }

  return key;
};
