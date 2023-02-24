import { useDispatch, useSelector } from "react-redux";
import { basketAdd, getBasketSelector } from "../../redux/slices/basketSlice";
import {
  favoriteIsChecked,
  favoriteRemove,
  getfavoriteSelector,
} from "../../redux/slices/favoriteSlice";
import "./FavoriteCard.css";

export function FavoriteCard({ index, id, title, price, image, discount }) {
  const newPrice = Math.round(price - (price * discount) / 100);
  const dispatch = useDispatch();
  const arrayFavorite = useSelector(getfavoriteSelector); //Массив продуктов в избранном
  const product = arrayFavorite.find((item) => item.id === id); //Карточка одного продукта
  const arrayProducts = useSelector(getBasketSelector); //Массив продуктов в корзине
  const disableButtonBuy = arrayProducts.some((item) => item.id === id);

  //Изменение селектора
  function changeSelector(id) {
    dispatch(favoriteIsChecked(id));
  }
  //Удалить продукт из избранного
  function removeProductFromFavorite(id) {
    dispatch(favoriteRemove(id));
  }
  //Добавить товар в корзину
  function addToBasket(id) {
    dispatch(basketAdd(id));
  }

  return (
    <div className="favline" id={id}>
      <div className="favline-checkbox">
        <input
          className="favline-checkbox__input"
          id={index}
          type="checkbox"
          onChange={()=>changeSelector(id)}
          checked={product.isChecked}
        />
        <label htmlFor={index}></label>
      </div>
      <div className="favline-foto">
        <img src={image} alt="foto-product" />
      </div>
      <div className="favline-title">{title}</div>
      <div className="favline-price">{newPrice.toLocaleString("ru")} ₽</div>
      <div className="favline-box">
        <button
          className="favline-box__button-lime"
          onClick={()=>addToBasket(id)}
          disabled={disableButtonBuy}
        >
          {disableButtonBuy ? "В корзине" : "Купить"}
        </button>
        <button
          className="favline-box__button-red"
          onClick={()=>removeProductFromFavorite(id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
