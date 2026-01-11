import { useRef } from "react";
import Stats from "@/components/pages/Main/Stats/Stats";
import Typing from "@/components/pages/Main/Typing/Typing";

import {
  WpmUpdateHandlerContext,
  type UpdateHandlerRef,
} from "@/context/WpmUpdateHandlerContext";

import { useMainViewContext } from "@/context/MainViewContext/Context";

const Main = () => {
  const updateHandler = useRef<UpdateHandlerRef>({ updateWpm: () => {} });

  const { mainView } = useMainViewContext();

  return (
    <WpmUpdateHandlerContext value={{ ref: updateHandler }}>
      <main className="px-10 h-full max-w-350 mx-auto">
        {mainView === "typing" ? <Typing /> : mainView === "stats" && <Stats />}
      </main>
    </WpmUpdateHandlerContext>
  );
};

export default Main;
