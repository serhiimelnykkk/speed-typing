import { generate } from "random-words";
import useText from "./hooks/useText";
import { usePauseContext } from "../../../context/PauseContext";

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
  const { typedText, textLeft, correctButtonPressed } = useText(generateText);

  const isPaused = usePauseContext();

  return (
    <section className="relative text-4xl/14 w-fit font-mono">
      <div
        className={`absolute inset-0 backdrop-blur-xs flex items-center justify-center transition-opacity ${
          isPaused ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={`text-xl font-sans px-4 py-2 bg-gray-300 rounded-sm`}>
          Press{" "}
          <span
            className={`bg-gray-600 px-2 py-1 text-sm text-gray-50 rounded-sm font-mono align-middle`}
          >
            Escape
          </span>{" "}
          to unpause.
        </div>
      </div>
      <div className="px-1">
        <span className="text-gray-500">
          {typedText.replaceAll(" ", DOT_WITH_ZERO_SPACE)}
        </span>
        <span
          className={correctButtonPressed ? "text-green-600" : "text-red-600"}
        >
          {textLeft.charAt(0).replaceAll(" ", DOT_WITH_ZERO_SPACE)}
        </span>
        <span>{textLeft.slice(1).replaceAll(" ", DOT_WITH_ZERO_SPACE)}</span>
      </div>
    </section>
  );
};

export default TextType;
