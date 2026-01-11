import Stats from "@/components/pages/Main/Stats/Stats";
import Typing from "@/components/pages/Main/Typing/Typing";

import { useMainViewContext } from "@/context/MainViewContext/Context";

const Main = () => {
  const { mainView } = useMainViewContext();

  return (
    <main className="px-10 h-full max-w-350 mx-auto">
      {mainView === "typing" ? <Typing /> : mainView === "stats" && <Stats />}
    </main>
  );
};

export default Main;
