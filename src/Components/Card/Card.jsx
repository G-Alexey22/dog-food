import classNames from "classnames/bind";
import "./Card.css";
import heart from "../../icons/heart.svg";
import heardRed from "../../icons/heart-red.svg";
import { useDispatch, useSelector } from "react-redux";
import { basketAdd, getBasketSelector } from "../../redux/slices/basketSlice";
import {
  favoriteAdd,
  favoriteRemove,
  getfavoriteSelector,
} from "../../redux/slices/favoriteSlice";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";

export function Card({
  id,
  title,
  price,
  image,
  discount,
  wight,
  tags,
  search,
}) {
  const navigate = useNavigate();
  const newPrice = Math.round(price - (price * discount) / 100);
  const dispatch = useDispatch();
  const arrayProducts = useSelector(getBasketSelector); //Массив продуктов в корзине
  const disableButtonBuy = arrayProducts.some((item) => item.id === id);
  const arrayFavorite = useSelector(getfavoriteSelector); //Массив продуктов в избранном
  const statusIconFavorite = arrayFavorite.some((item) => item.id === id);

  //Добавить товар в корзину
  function addToBasket(event) {
    event.stopPropagation();
    dispatch(basketAdd(id));
  }
  //  Добавить товар в избранное
  function addToFavorite(event) {
    event.stopPropagation();
    dispatch(favoriteAdd(id));
  }
  //  Удалить товар из избранного
  function removeToFavorite(event) {
    event.stopPropagation();
    dispatch(favoriteRemove(id));
  }
  //Переход на детальную страницу
  function toDetailPage() {
    navigate(`./${id}`);
  }

  return (
    <div className="card" id={id} onClick={toDetailPage}>
      <img className="card__img" src={image} alt="card_image" />
      <div
        className="card-like"
        title="Добавить в избранное"
        onClick={statusIconFavorite ? removeToFavorite : addToFavorite}
      >
        <img
          src={statusIconFavorite ? `${heardRed}` : `${heart}`}
          alt="icon-heart"
        />
      </div>
      {discount > 0 && <div className="card-discount">-{discount}%</div>}
      {tags.includes("new") && <div className="card-tags__new">NEW</div>}
      {tags.includes("sale") && <div className="card-tags__sale">SALE</div>}
      <div className="card__wight">{wight}</div>
      <div className="card__title">
        <Highlighter
          highlightClassName="card__title-fuchsia"
          searchWords={[search]}
          autoEscape={true}
          textToHighlight={title}
        ></Highlighter>
      </div>
      <div className="card-wpapper">
        <div
          className={classNames("card-wpapper__price", {
            new: newPrice < price,
          })}
        >
          {newPrice.toLocaleString("ru")} ₽
          {newPrice < price && (
            <div className="card-wpapper__price-old">
              {price.toLocaleString("ru")} ₽
            </div>
          )}
        </div>
        <div className="card-wpapper-box">
          <button
            className="card-wpapper__button"
            onClick={addToBasket}
            disabled={disableButtonBuy}
          >
            {disableButtonBuy ? "В корзине" : "Купить"}
          </button>
        </div>
      </div>
    </div>
  );
}
