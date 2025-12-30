import TextType from "../../common/TextType/TextType";
import Keyboard from "../../common/Keyboard/Keyboard";

const Main = () => {
  return (
    <main className="h-full">
      <div className="flex h-[50%] items-end justify-center">
        <TextType />
      </div>
      <Keyboard />
    </main>
  );
};

export default Main;
