import { useState, useEffect } from "react";

const useText = (nextSequence: () => string) => {
  const [currentSequence, setCurrentSequence] = useState(nextSequence());
  const [typedText, setTypedText] = useState<string>("");
  const [textLeft, setTextLeft] = useState(currentSequence);
  const [correctButtonPressed, setCorrectButtonPressed] = useState(true);

  console.log(typedText.length, textLeft.length);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        if (event.key === textLeft[0]) {
          if (textLeft.length === 1) {
            const sequence = nextSequence();
            setTypedText("");
            setTextLeft(sequence);
            setCurrentSequence(sequence);
          } else {
            setTypedText((prev) =>
              prev.length < currentSequence.length
                ? prev + currentSequence[prev.length]
                : prev
            );
            setTextLeft((prev) => (prev.length > 0 ? prev.slice(1) : prev));
            setCorrectButtonPressed(true);
          }
        } else {
          setCorrectButtonPressed(false);
        }
      }
    };

    addEventListener("keydown", onKeyDown);

    return () => removeEventListener("keydown", onKeyDown);
  }, [textLeft, currentSequence, nextSequence]);

  return { typedText, textLeft, correctButtonPressed };
};

export default useText;
