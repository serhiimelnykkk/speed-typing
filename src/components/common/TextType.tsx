import { useState } from "react";
import { useEffect } from "react";

const startText =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, iure inventore repudiandae officiis delectus illo magnam dolores. Eius architecto, similique enim quam aut dignissimos nihil ullam hic corporis incidunt aliquid";

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
    <p className="text-4xl/14">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, iure
      inventore repudiandae officiis delectus illo magnam dolores. Eius
      architecto, similique enim quam aut dignissimos nihil ullam hic corporis
      incidunt aliquid.
    </p>
  );
};

export default TextType;
