import useText from "@/components/pages/Main/Typing/TypingArea/TypingText/hooks/useText";
import { generateText } from "@/utils";

const DOT_WITH_ZERO_SPACE = "\u00B7\u200B";

const TypingText = () => {
  const { enteredText, remainingText, correctButtonPressed } =
    useText(generateText);

  return (
    <>
      <span className="text-gray-500">
        {enteredText.replaceAll(" ", DOT_WITH_ZERO_SPACE)}
      </span>
      <span
        className={correctButtonPressed ? "text-green-600" : "text-red-600"}
      >
        {remainingText.charAt(0).replaceAll(" ", DOT_WITH_ZERO_SPACE)}
      </span>
      <span>{remainingText.slice(1).replaceAll(" ", DOT_WITH_ZERO_SPACE)}</span>
    </>
  );
};

export default TypingText;
