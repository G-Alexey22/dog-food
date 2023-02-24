import "./BasketTable.css";
import { BasketCard } from "../BasketCard/BasketCard";
import { useDispatch, useSelector } from "react-redux";
import {
  basketIsCheckedAll,
  getBasketSelector,
  basketDeleteSelected,
} from "../../redux/slices/basketSlice";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../Loader/Loader";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";
import { Api } from "../../api/DogFoodApi";

export function BasketTable() {
  const token = useSelector(getTokenSelector);
  const dispatch = useDispatch();
  const basket = useSelector(getBasketSelector); //Массив продуктов в корзине
  const checkedAll = basket.every((item) => item.isChecked); //true если выбраны все продукты
  const checkedOne = basket.some((item) => item.isChecked); //true если выбран один продукт
  const arrayIdProducts = basket.map((item) => item.id); //Массив id продуктов

  //Выбор всех продуктов в корзине по Checkbox
  function changeSelectorAll(event) {
    dispatch(basketIsCheckedAll(event.target.checked));
  }

  //Выбор всех продуктов в корзине по кнопке Выбать все
  function chooseAll() {
    dispatch(basketIsCheckedAll(true));
  }

  //Удаление выбранных продуктов
  function deleteSelected() {
    dispatch(basketDeleteSelected());
  }

  function getProductsById(arrayIdProducts) {
    return Promise.all(
      arrayIdProducts.map((id) =>
        Api.getProductsById(token, id).then((response) => response.json())
      )
    );
  }

  const { data, isLoading } = useQuery({
    enabled: token !== "",
    queryKey: ["basket", basket],
    queryFn: () => getProductsById(arrayIdProducts),
  });

  if (token === "")
    return (
      <div className="basket-error">
        <div className="basket-error__title">
          Для просмотра товаров в корзине необходима авторизация!
        </div>
        <div>
          <Link to="/signin">
            <button className="basket-error__button">
              Перейти на страницу авторизации
            </button>
          </Link>
        </div>
      </div>
    );

  if (isLoading) {
    return <Loader />;
  }

  for (let i = 0; i < data.length; i++) {
    data[i].count = basket[i].count;
    data[i].isChecked = basket[i].isChecked;
  }
  // Кол-во товаров
  const goods = data
    .filter((e) => e.isChecked === true)
    .reduce((sum, e) => sum + e.count, 0);

  //Общая скидка всех товаров
  const discount = data
    .filter((e) => e.isChecked === true)
    .reduce((sum, e) => sum + Math.round((e.price * e.discount) / 100), 0);

  //Итоговая цена
  const total = data
    .filter((e) => e.isChecked === true)
    .reduce(
      (sum, e) =>
        sum + Math.round(e.price - (e.price * e.discount) / 100) * e.count,
      0
    );

  return (
    <>
      {basket.length === 0 && (
        <div className="table-empty">
          <div className="table-empty__img"> </div>
          <div className="table-empty__title">В корзине нет товаров</div>
          <div className="table-empty__info">
            Для добавления товаров<br></br> воспользуйтесь каталогом
          </div>
          <div>
            <Link to="/products">
              <button className="table-empty__button">Перейти в каталог</button>
            </Link>

            <div>
              <Link to="/signin">
                <button className="table-empty__button">
                  Перейти в профиль
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {basket.length > 0 && (
        <div className="table-container">
          <div className="table">
            <div className="selection">
              <input
                className="checkbox-input"
                id="s1"
                type="checkbox"
                onChange={changeSelectorAll}
                checked={checkedAll}
              />
              <label htmlFor="s1">Выбрать все</label>
              <div>
                <button className="selection__button" onClick={deleteSelected}>
                  Удалить выбранные
                </button>
              </div>
            </div>
            {data.map((item, index) => (
              <BasketCard
                index={index}
                key={item._id}
                id={item._id}
                title={item.name}
                price={item.price}
                image={item.pictures}
                discount={item.discount}
                stock={item.stock}
              />
            ))}
          </div>

          {!checkedOne && (
            <div className="basket-empty">
              <div>Выберите товары, чтобы перейти к оформлению</div>
              <div>
                <button className="basket-empty__button" onClick={chooseAll}>
                  Выбрать все
                </button>
              </div>
            </div>
          )}

          {checkedOne && (
            <div className="basket">
              <div className="basket-title">Ваша корзина</div>
              <div className="basket-goods">
                <span>Товары</span>
                <span className="blue">{goods}</span>
              </div>
              <div className="basket-sale">
                <span>Скидка</span>
                <span className="red">{discount.toLocaleString("ru")} ₽</span>
              </div>
              <div className="basket-price">
                <span>Общая стоимость</span>
                <span>{total.toLocaleString("ru")} ₽</span>
              </div>
              <div className="basket-container">
                <button className="basket-container__button">
                  Оформить заказ
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
