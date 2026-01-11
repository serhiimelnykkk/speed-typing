import "@/App.css";
import Main from "@/components/pages/Main/Main";
import { MainViewDispatchContextProvider } from "@/context/MainViewContext/Provider";
import { PauseContextProvider } from "@/context/PauseContext/Provider";

function App() {
  return (
    <PauseContextProvider>
      <MainViewDispatchContextProvider>
        <Main />
      </MainViewDispatchContextProvider>
    </PauseContextProvider>
  );
}

export default App;
