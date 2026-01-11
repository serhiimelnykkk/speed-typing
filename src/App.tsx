import "@/App.css";
import Main from "@/components/pages/Main/Main";
import { MainViewDispatchContextProvider } from "@/context/MainViewContext/Provider";

function App() {
  return (
    <MainViewDispatchContextProvider>
      <Main />
    </MainViewDispatchContextProvider>
  );
}

export default App;
