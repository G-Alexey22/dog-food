import "./ListFavorites.css";
import { FavoriteCard } from "../FavoriteCard/FavoriteCard";
import { useDispatch, useSelector } from "react-redux";
import { getTokenSelector } from "../../redux/slices/userSlice";
import {
  favoriteDeleteSelected,
  favoriteIsCheckedAll,
  getfavoriteSelector,
} from "../../redux/slices/favoriteSlice";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { Api } from "../../api/DogFoodApi";

export function ListFavorites() {
  const token = useSelector(getTokenSelector);
  const dispatch = useDispatch();
  const favorite = useSelector(getfavoriteSelector); //Массив продуктов в избранном
  const arrayIdFavorite = favorite.map((item) => item.id); //Массив id продуктов
  const checkedAll = favorite.every((item) => item.isChecked); //true если выбраны все продукты

  //Выбор всех продуктов в избранном по Checkbox
  function changeSelectorAll(event) {
    dispatch(favoriteIsCheckedAll(event.target.checked));
  }
  //Удаление выбранных продуктов
  function deleteSelected() {
    dispatch(favoriteDeleteSelected());
  }

  function getProductsById(arrayIdFavorite) {
    return Promise.all(
      arrayIdFavorite.map((id) =>
        Api.getProductsById(token,id).then((response) => response.json())
      )
    );
  }
  const { data, isLoading } = useQuery({
    enabled: token !== "",
    queryKey: ["basket", favorite],
    queryFn: () => getProductsById(arrayIdFavorite),
  });

  if (token === "")
    return (
      <div className="favorite-error">
        <div className="favorite-error__title">
          Для просмотра товаров в избранном необходима авторизация!
        </div>
        <div>
          <Link to="/signin">
            <button className="favorite-error__button">
              Перейти на страницу авторизации
            </button>
          </Link>
        </div>
      </div>
    );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {favorite.length === 0 && (
        <div className="favorite-empty">
          <div className="favorite-empty__img"></div>
          <div className="favorite-empty__title">В избранном нет товаров</div>
          <div className="favorite-empty__info">
            Для добавления товаров<br></br> воспользуйтесь каталогом
          </div>
          <div>
            <Link to="/products">
              <button className="favorite-empty__button">
                Перейти в каталог
              </button>
            </Link>

            <div>
              <Link to="/signin">
                <button className="favorite-empty__button">
                  Перейти в профиль
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {favorite.length > 0 && (
        <div className="listfavorites">
          <div className="selection">
            <input
              className="checkbox-input"
              id="f1"
              type="checkbox"
              onChange={changeSelectorAll}
              checked={checkedAll}
            />
            <label htmlFor="f1">Выбрать все</label>
            <div>
              <button className="selection__button" onClick={deleteSelected}>
                Удалить выбранные
              </button>
            </div>
          </div>
          {data.map((item, index) => (
            <FavoriteCard
              index={index}
              key={item._id}
              id={item._id}
              title={item.name}
              price={item.price}
              image={item.pictures}
              discount={item.discount}
            />
          ))}
        </div>
      )}
    </>
  );
}
