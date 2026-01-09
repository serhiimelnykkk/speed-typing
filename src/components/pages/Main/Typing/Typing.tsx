import TypingArea from "../../../common/TypingArea/TypingArea";
import Keyboard from "../../../common/Keyboard/Keyboard";
import TextStatus from "../../../common/TextStatus/TextStatus";
import {
  WpmStateContext,
  WpmDispatchContext,
} from "../../../../context/WpmContext";

import { useState } from "react";

const Typing = () => {
  const [wordsPerMinute, setWordsPerMinute] = useState(0);

  return (
    <>
      <div className="flex flex-col h-[50%] justify-end">
        <WpmStateContext value={wordsPerMinute}>
          <TextStatus />
        </WpmStateContext>
        <WpmDispatchContext value={setWordsPerMinute}>
          <TypingArea />
        </WpmDispatchContext>
      </div>
      <Keyboard />
    </>
  );
};

export default Typing;
