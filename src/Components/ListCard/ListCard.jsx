import "./ListCard.css";
import { Loader } from "../Loader/Loader";
import { Card } from "../Card/Card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { getSearchFromImput } from "../../redux/slices/filterSlice";
import { useState } from "react";
import { FILTERS } from "./filters";
import { Filter } from "../Filter/Filter";
import { useSearchParams } from "react-router-dom";
import { sort } from "./sort";
import {Api} from "../../api/DogFoodApi"
import { CreateProduct } from "../CreateProduct/CreateProduct";

export const ListCard = () => {
  const [isCreateProductModal, setIsCreateProductModal] = useState(false); //Открытие модального окна создания продукта
  const token = useSelector(getTokenSelector);
  const search = useSelector(getSearchFromImput);
  const [searchParams] = useSearchParams();
  const [currentFilter, setCurrentFilter] = useState(() => {
    let initialValue = null;
    for (const [key, value] of searchParams.entries()) {
      if (value === "true") {
        initialValue = key;
      }
    }
    return initialValue;
  }); //Активный фильтр

   //функция создания продукта
   function openModalCreateProduct() {
    setIsCreateProductModal(true);
  }

  const { data, isLoading } = useQuery({
    enabled: Boolean(token),
    queryKey: ["products", search, currentFilter],
    queryFn: ()=> Api.getProducts(token,search)
        .then((response) => response.json())
        .then((response) => {
          return response;
        }),
  });

  if (!token)
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
    return <Loader />;
  }
 

  let sortedArray = sort(currentFilter, data);

  return (
    <div className="listcard">
      <div className="filtersection">
        {FILTERS.map((item, index) => (
          <Filter
            key={index}
            title={item.title}
            filter={item.filter}
            index={index}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
        ))}
        <button className="filtersection__button-add" type="button"
        onClick={openModalCreateProduct}
        >Добавить новый</button>
          <CreateProduct
              isOpen={isCreateProductModal}
              setIsCreateProductModal={setIsCreateProductModal}
            />
      </div>
      {search && !data.length && (
        <div className="query-result">
          По запросу «{search}» товаров не найдено
        </div>
      )}

      {search  && !!data.length && (
        <div className="query-result">
          Результаты поиска товара по запросу «{search}»
        </div>
      )}

      <div className="card-container">
        {sortedArray.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            title={item.name}
            price={item.price}
            image={item.pictures}
            discount={item.discount}
            wight={item.wight}
            tags={item.tags}
            search={search}
          />
        ))}
      </div>
    </div>
  );
};
