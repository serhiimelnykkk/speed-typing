import { generate } from "random-words";
import useText from "./hooks/useText";

const DOT_WITH_ZERO_SPACE = "\u00B7\u200B";

const generateText = () =>
  (
    generate({
      max: 20,
      min: 25,
      maxLength: 12,
    }) as string[]
  ).reduce((result, current) => (result += " " + current));

const TextType = () => {
  const { typedText, textLeft, correctButtonPressed } = useText(generateText());

  return (
    <p className="text-4xl/14 w-max font-mono">
      <span className="text-gray-500">
        {typedText.replaceAll(" ", DOT_WITH_ZERO_SPACE)}
      </span>
      <span
        className={correctButtonPressed ? "text-green-600" : "text-red-600"}
      >
        {textLeft.charAt(0).replaceAll(" ", DOT_WITH_ZERO_SPACE)}
      </span>
      <span>{textLeft.slice(1).replaceAll(" ", DOT_WITH_ZERO_SPACE)}</span>
    </p>
  );
};

export default TextType;
