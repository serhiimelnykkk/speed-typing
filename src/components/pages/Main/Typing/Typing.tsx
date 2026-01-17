import TypingArea from "@/components/common/TypingArea/TypingArea";
import Keyboard from "@/components/common/Keyboard/Keyboard";
import TextStatus from "@/components/common/TextStatus/TextStatus";

const Typing = () => {
  return (
    <>
      <div className="h-full flex flex-col">
        <TextStatus />
        <div className="flex flex-1 items-end">
          <TypingArea />
        </div>
        <div className="flex w-fit mx-auto flex-1 items-center">
          <Keyboard />
        </div>
      </div>
    </>
  );
};

export default Typing;
