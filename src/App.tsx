import "@/App.css";
import Main from "@/components/pages/Main/Main";
import { MainViewDispatchContextProvider } from "@/context/MainViewContext/Provider";
import { PauseContextProvider } from "@/context/PauseContext/Provider";
import { WpmUpdateHandlerContextProvider } from "@/context/WpmUpdateHandlerContext/Provider";

function App() {
  return (
    <PauseContextProvider>
      <MainViewDispatchContextProvider>
        <WpmUpdateHandlerContextProvider>
          <Main />
        </WpmUpdateHandlerContextProvider>
      </MainViewDispatchContextProvider>
    </PauseContextProvider>
  );
}

export default App;
