import "./App.css";
import { useState } from "react";
import { HeaderMemo } from "./Components/Header/Header";
import { FooterMemo } from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); //Поисковый запрос
  const [token, setToken] = useState(() => {
    if (localStorage.getItem("Token")) {
      return JSON.parse(localStorage.getItem("Token"));
    } else {
      return "";
    }
  });

  const context = [setToken, token, setSearchQuery, searchQuery];

  return (
    <>
      <HeaderMemo />
      <Outlet context={context} />
      <FooterMemo />
    </>
  );
}

export default App;
