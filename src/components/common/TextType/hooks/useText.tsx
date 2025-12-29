import { useState } from "react";
import { useEffect } from "react";

const useText = (initialText: string) => {
  const [typedText, setTypedText] = useState<string>("");
  const [textLeft, setTextLeft] = useState(initialText);
  const [correctButtonPressed, setCorrectButtonPressed] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === textLeft[0].toLowerCase()) {
        setTypedText((prev) =>
          prev.length < initialText.length
            ? prev + initialText[prev.length]
            : prev
        );
        setTextLeft((prev) => (prev.length > 0 ? prev.slice(1) : prev));
        setCorrectButtonPressed(true);
      } else {
        setCorrectButtonPressed(false);
      }
    };

    addEventListener("keydown", onKeyDown);

    return () => removeEventListener("keydown", onKeyDown);
  }, [textLeft, initialText]);

  return { typedText, textLeft, correctButtonPressed };
};

export default useText;
