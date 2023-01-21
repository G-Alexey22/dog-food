import { useOutletContext } from "react-router-dom";
import { Card } from "../Card/Card";
import { Loader } from "../Loader/Loader";
import "./ListCard.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function ListCard() {
  const [cardsProduct, setCardsProduct] = useState(); //Каталог товаров
  const token = useOutletContext()[1];
  const searchQuery = useOutletContext()[3];

  // Получение продуктов и поиск, если Токен есть
  let find = "";
  if (searchQuery !== "") {
    find = "/search?query=" + searchQuery;
  } else find = "";

  const result = useQuery({
    queryKey: ["products", searchQuery],
    queryFn: () => {
      fetch("https://api.react-learning.ru/products" + find, {
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          setCardsProduct(() => {
            if (searchQuery === "") {
              return response.products;
            }
            return response;
          });
        })
      return result;
    },
    enabled: token !== "",
  });

  //Отображается если нет авторизации
  if (!cardsProduct)
    return (
      <div className="listcard-error">
        <div className="listcard-error__title">
          Для просмотра списка товаров необходима авторизация!
        </div>
        <div>
          <Link to="/signin">
            <button className="listcard-error__button">
              Перейти на страницу авторизации
            </button>
          </Link>
        </div>
      </div>
    );

  if (result.isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
   
    <div className="listcard">
      {searchQuery !== "" && cardsProduct.length === 0 && (
        <div className="query-result">
          По запросу «{searchQuery}» товаров не найдено
        </div>
      )}
      {searchQuery !== "" && cardsProduct.length > 0 && (
        <div className="query-result">
          Результаты поиска товара по запросу «{searchQuery}»
        </div>
      )}

      <div className="card-container">
        {cardsProduct.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            title={item.name}
            price={item.price}
            image={item.pictures}
            favorite={false}
            discount={item.discount}
            wight={item.wight}
          />
        ))}
      </div>
    </div>
  
  );
}
