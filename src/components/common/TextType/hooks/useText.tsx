import { useState, useEffect, useRef } from "react";

const useText = (nextSequence: () => string) => {
  const nextSequenceRef = useRef(nextSequence);

  const [currentSequence, setCurrentSequence] = useState(nextSequence());
  const [typedText, setTypedText] = useState<string>("");
  const [correctButtonPressed, setCorrectButtonPressed] = useState(true);

  const textLeft = currentSequence.slice(typedText.length);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        if (event.key === textLeft[0]) {
          if (textLeft.length === 1) {
            const sequence = nextSequenceRef.current();
            setTypedText("");
            setCurrentSequence(sequence);
          } else {
            setTypedText((prev) =>
              prev.length < currentSequence.length
                ? prev + currentSequence[prev.length]
                : prev
            );
            setCorrectButtonPressed(true);
          }
        } else {
          setCorrectButtonPressed(false);
        }
      }
    };

    addEventListener("keydown", onKeyDown);

    return () => removeEventListener("keydown", onKeyDown);
  }, [textLeft, currentSequence, nextSequenceRef]);

  return { typedText, textLeft, correctButtonPressed };
};

export default useText;
