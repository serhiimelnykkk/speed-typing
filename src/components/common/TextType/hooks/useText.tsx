import { useState, useEffect, useRef } from "react";
import { usePauseContext } from "../../../../context/PauseContext";

const useText = (nextSequence: () => string) => {
  const nextSequenceRef = useRef(nextSequence);

  const [currentSequence, setCurrentSequence] = useState(nextSequence());
  const [typedText, setTypedText] = useState<string>("");
  const [correctButtonPressed, setCorrectButtonPressed] = useState(true);

  const textLeft = currentSequence.slice(typedText.length);

  const isPaused = usePauseContext();

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

    if (!isPaused) {
      addEventListener("keydown", onKeyDown);
    }

    return () => removeEventListener("keydown", onKeyDown);
  }, [textLeft, currentSequence, nextSequenceRef, isPaused]);

  return { typedText, textLeft, correctButtonPressed };
};

export default useText;
