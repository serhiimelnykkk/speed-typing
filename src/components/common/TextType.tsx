import { useState } from "react";
import { useEffect } from "react";

const startText =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, iure inventore repudiandae officiis delectus illo magnam dolores. Eius architecto, similique enim quam aut dignissimos nihil ullam hic corporis incidunt aliquid";

const DOT_WITH_ZERO_SPACE = "\u00B7\u200B";

const TextType = () => {
  const [typedText, setTypedText] = useState<string>("");
  const [textLeft, setTextLeft] = useState(startText);

  console.log("rerender");
  console.log(typedText);

  useEffect(() => {
    const onKeyDown = () => {
      setTypedText((prev) =>
        prev.length < startText.length ? prev + startText[prev.length] : prev
      );
      setTextLeft((prev) => (prev.length > 0 ? prev.slice(1) : prev));
    };

    addEventListener("keydown", onKeyDown);

    return () => removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <p className="text-4xl/14 w-max font-mono">
      <span className="text-gray-500">
        {typedText.replaceAll(" ", DOT_WITH_ZERO_SPACE)}
      </span>
      <span className="text-green-600">
        {textLeft.charAt(0).replaceAll(" ", DOT_WITH_ZERO_SPACE)}
      </span>
      <span>{textLeft.slice(1).replaceAll(" ", DOT_WITH_ZERO_SPACE)}</span>
    </p>
  );
};

export default TextType;
