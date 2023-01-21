import classNames from "classnames/bind";
import "./Card.css";
import heart from "../../icons/heart.svg";
import heardRed from "../../icons/heart-red.svg";

export function Card({ id, title, price, image, favorite, discount, wight}) {
  // console.log(id, title, price, image);

  const newPrice = Math.round(price - (price * discount) / 100);

  
 
  return (
      <div className="card" id={id}>
        <img className="card__img" src={image} alt="card_image" />
        <div className="card-like">
          <img src={favorite ? `${heardRed}` : `${heart}`} alt="icon-heart" 
         
          /> 
        </div>
        {discount > 0 && <div className="card-sale">-{discount}%</div>}
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
            <button className="card-wpapper__button" >Купить</button>
          </div>
        </div>
      </div>
  );
}
