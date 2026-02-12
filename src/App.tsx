import "@/App.css";
import Main from "@/components/pages/Main/Main";
import { MainViewContextProvider } from "@/context/MainViewContext/Provider";

function App() {
  return (
    <MainViewContextProvider>
      <Main />
    </MainViewContextProvider>
  );
}

export default App;
