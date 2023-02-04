import "./ListCard.css";
import { Loader } from "../Loader/Loader";
import { Card } from "../Card/Card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { getSearchFromImput } from "../../redux/slices/filterSlice";

export const ListCard = () => {
  const token = useSelector(getTokenSelector);
  const search = useSelector(getSearchFromImput);

  const { data, isLoading } = useQuery({
    enabled: token !== "",
    queryKey: ["products", search],
    queryFn: () =>
      fetch("https://api.react-learning.ru/products/search?query=" + search, {
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          return response;
        }),
  });

  if (token === "")
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

  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="listcard">
      {search !== "" && data.length === 0 && (
        <div className="query-result">
          По запросу «{search}» товаров не найдено
        </div>
      )}

      {search !== "" && data.length > 0 && (
        <div className="query-result">
          Результаты поиска товара по запросу «{search}»
        </div>
      )}

      <div className="card-container">
        {data.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            title={item.name}
            price={item.price}
            image={item.pictures}
            favorite={false}
            discount={item.discount}
            wight={item.wight}
            tags={item.tags}
          />
        ))}
      </div>
    </div>
  );
};
