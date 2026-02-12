import "@/App.css";
import Main from "@/components/pages/Main/Main";
import { MainViewContextProvider } from "@/context/MainViewContext/Provider";
import { PauseContextProvider } from "@/context/PauseContext/Provider";

function App() {
  return (
    <PauseContextProvider>
      <MainViewContextProvider>
        <Main />
      </MainViewContextProvider>
    </PauseContextProvider>
  );
}

export default App;
