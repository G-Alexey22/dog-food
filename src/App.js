import "./App.css";
import { useState, useEffect } from "react";
import { HeaderMemo } from "./Components/Header/Header";
import { Outlet } from "react-router-dom";

import data from "../src/data/data.json";

function App() {
  const [cardsProduct, setCardsProduct] = useState(data); //Каталог товаров
  const [searchQuery, setSearchQuery] = useState(""); //Поисковый запрос

  //Функция изменения карточек при передаче запроса
  function SearchQuery(searchQuery) {
    const newQuqry = data.filter((item) =>
      item.title.toUpperCase().includes(searchQuery.toUpperCase())
    );
    setCardsProduct(newQuqry);
  }
  useEffect(() => {
    SearchQuery(searchQuery);
  }, [searchQuery]);

  //Функция изменение статуса Избранное в карточках
  function changeStatusFavorite(id) {
    const newCardsProduct = cardsProduct.map((item) => {
      if (item.id === Number(id)) {
        item.favorite = !item.favorite;
        return item;
      }
      return item;
    });
    setCardsProduct(newCardsProduct);
  }

  return (
   
    <>
      <HeaderMemo />
      <Outlet context={[setSearchQuery, cardsProduct, searchQuery,changeStatusFavorite]}
      />
    </>
  );
}

export default App;
