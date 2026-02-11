import type { HandlerRefs } from "@/context/WpmHandlersContext/Context";
import { WpmHandlersContext } from "@/context/WpmHandlersContext/Context";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
}

export const WpmHandlersContextProvider = ({ children }: Props) => {
  const handlers = useRef<HandlerRefs>(null);

  return <WpmHandlersContext value={handlers}>{children}</WpmHandlersContext>;
};
