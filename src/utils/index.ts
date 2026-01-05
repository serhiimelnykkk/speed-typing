import { generate } from "random-words";

export const generateText = () =>
  (
    generate({
      max: 25,
      min: 25,
      maxLength: 12,
    }) as string[]
  ).reduce((result, current) => (result += " " + current));
