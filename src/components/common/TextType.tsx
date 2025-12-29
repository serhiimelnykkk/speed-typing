import { useState } from "react";
import { useEffect } from "react";

const startText =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, iure inventore repudiandae officiis delectus illo magnam dolores. Eius architecto, similique enim quam aut dignissimos nihil ullam hic corporis incidunt aliquid";

const DOT_WITH_ZERO_SPACE = "\u00B7\u200B";

const TextType = () => {
  const [typedText, setTypedText] = useState<string>("");
  const [textLeft, setTextLeft] = useState(startText);
  const [correctButtonPressed, setCorrectButtonPressed] = useState(false);

  console.log("rerender");
  console.log(typedText);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === textLeft[0].toLowerCase()) {
        setTypedText((prev) =>
          prev.length < startText.length ? prev + startText[prev.length] : prev
        );
        setTextLeft((prev) => (prev.length > 0 ? prev.slice(1) : prev));
        setCorrectButtonPressed(true);
      } else {
        setCorrectButtonPressed(false);
      }
    };

    addEventListener("keydown", onKeyDown);

    return () => removeEventListener("keydown", onKeyDown);
  }, [textLeft]);

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
