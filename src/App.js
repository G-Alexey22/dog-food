import "./App.css";
import { HeaderMemo } from "./Components/Header/Header";
import { FooterMemo } from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
 
  return (
    <>
      <HeaderMemo />
      <Outlet  />
      <FooterMemo />
    </>
  );
}

export default App;
