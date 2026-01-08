import "./App.css";
import Main from "./components/pages/Main/Main";
import Stats from "./components/pages/Stats/Stats";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}

export default App;
