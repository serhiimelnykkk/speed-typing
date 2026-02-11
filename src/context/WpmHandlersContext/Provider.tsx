import type { HandlerRefs } from "@/context/WpmHandlersContext/Context";
import { WpmHandlersContext } from "@/context/WpmHandlersContext/Context";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
}

export const WpmUpdateHandlerContextProvider = ({ children }: Props) => {
  const updateHandler = useRef<HandlerRefs>(null);

  return (
    <WpmHandlersContext value={updateHandler}>{children}</WpmHandlersContext>
  );
};
