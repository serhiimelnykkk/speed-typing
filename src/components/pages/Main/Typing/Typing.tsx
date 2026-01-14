import TypingArea from "@/components/common/TypingArea/TypingArea";
import Keyboard from "@/components/common/Keyboard/Keyboard";
import TextStatus from "@/components/common/TextStatus/TextStatus";

const Typing = () => {
  return (
    <>
      <div className="flex flex-col h-[50%] justify-end">
        <TextStatus />
        <TypingArea />
      </div>
      <Keyboard />
    </>
  );
};

export default Typing;
