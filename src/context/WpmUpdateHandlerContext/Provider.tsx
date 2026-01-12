import { WpmUpdateHandlerContext } from "@/context/WpmUpdateHandlerContext/Context";
import { useRef } from "react";
import type { UpdateHandlerRef } from "@/context/WpmUpdateHandlerContext/Context";

interface Props {
  children: React.ReactNode;
}

export const WpmUpdateHandlerContextProvider = ({ children }: Props) => {
  const updateHandler = useRef<UpdateHandlerRef>({ updateWpm: () => {} });

  return (
    <WpmUpdateHandlerContext value={{ ref: updateHandler }}>
      {children}
    </WpmUpdateHandlerContext>
  );
};
