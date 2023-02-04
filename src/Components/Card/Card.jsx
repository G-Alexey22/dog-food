import classNames from "classnames/bind";
import "./Card.css";
import heart from "../../icons/heart.svg";
import heardRed from "../../icons/heart-red.svg";
import { useDispatch, useSelector } from "react-redux";
import { basketAdd, getBasketSelector } from "../../redux/slices/basketSlice";

export function Card({
  id,
  title,
  price,
  image,
  favorite,
  discount,
  wight,
  tags,
}) {

  
  const newPrice = Math.round(price - (price * discount) / 100);

  const dispatch = useDispatch();
  const arrayProducts = useSelector(getBasketSelector);//Массив продуктов в корзине
  const disableButtonBuy = arrayProducts.some((item) => item.id === id);
  

  //Добавить товар в корзину
  function AddToBasket(event) {
    dispatch(basketAdd(event.target.closest(".card").id));
  }

  return (
    <div className="card" id={id}>
      <img className="card__img" src={image} alt="card_image" />
      <div className="card-like">
        <img src={favorite ? `${heardRed}` : `${heart}`} alt="icon-heart" />
      </div>
      {discount > 0 && <div className="card-sale">-{discount}%</div>}
      {tags.includes("new") && <div className="card-tags-new">NEW</div>}
      {tags.includes("sale") && <div className="card-tags-sale">SALE</div>}
      <div className="card__wight">{wight}</div>
      <div className="card__title">{title}</div>
      <div className="card-wpapper">
        <div
          className={classNames("card-wpapper__price", {
            new: Boolean(newPrice < price),
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
            onClick={AddToBasket}
            disabled={disableButtonBuy}
          >
            {disableButtonBuy ? "В корзине" : "Купить"}
          </button>
        </div>
      </div>
    </div>
  );
}
