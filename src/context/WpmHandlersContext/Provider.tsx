import { WpmHandlersContext } from "@/context/WpmHandlersContext/Context";
import { useRef } from "react";
import type { HandlerRefs } from "@/context/WpmHandlersContext/Context";

interface Props {
  children: React.ReactNode;
}

export const WpmUpdateHandlerContextProvider = ({ children }: Props) => {
  const updateHandler = useRef<HandlerRefs>({ updateWpm: () => {} });

  return (
    <WpmHandlersContext value={{ handlerRefs: updateHandler }}>
      {children}
    </WpmHandlersContext>
  );
};
