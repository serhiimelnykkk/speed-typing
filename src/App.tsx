import "@/App.css";
import Main from "@/components/pages/Main/Main";
import { MainViewDispatchContextProvider } from "@/context/MainViewContext/Provider";
import { PauseContextProvider } from "@/context/PauseContext/Provider";
import { WpmUpdateHandlerContextProvider } from "@/context/WpmHandlersContext/Provider";
import { WpmContextProvider } from "@/context/WpmContext/Provider";

function App() {
  return (
    <PauseContextProvider>
      <MainViewDispatchContextProvider>
        <WpmUpdateHandlerContextProvider>
          <WpmContextProvider>
            <Main />
          </WpmContextProvider>
        </WpmUpdateHandlerContextProvider>
      </MainViewDispatchContextProvider>
    </PauseContextProvider>
  );
}

export default App;
