import "@/App.css";
import Main from "@/components/pages/Main/Main";
import { MainViewContextProvider } from "@/context/MainViewContext/Provider";
import { PauseContextProvider } from "@/context/PauseContext/Provider";
import { WpmContextProvider } from "@/context/WpmContext/Provider";
import { WpmHandlersContextProvider } from "@/context/WpmHandlersContext/Provider";

function App() {
  return (
    <PauseContextProvider>
      <MainViewContextProvider>
        <WpmHandlersContextProvider>
          <WpmContextProvider>
            <Main />
          </WpmContextProvider>
        </WpmHandlersContextProvider>
      </MainViewContextProvider>
    </PauseContextProvider>
  );
}

export default App;
