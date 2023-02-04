import "./BasketCard.css";
import minus from "../../icons/minus.svg";
import plus from "../../icons/plus.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {basketRemove, basketIncrement,basketDecrement, getBasketSelector,basketIsChecked} from "../../redux/slices/basketSlice";

export function BasketCard({index, id, title, price, image, discount, stock }) {
  const newPrice = Math.round(price - (price * discount) / 100);
  
  const dispatch = useDispatch();
  const arrayProducts = useSelector(getBasketSelector);//Массив продуктов в корзине
  let product = arrayProducts.find((item) => item.id === id); //Карточка одного продукта


  //Увеличить кол-во
  function incrementCounter(event) {
    if (product.count < stock) {
      dispatch(basketIncrement(event.target.closest(".line").id))
    }
  }
  //Уменьшить кол-во
  function decrementCounter(event) {
    if (product.count >1) {
      dispatch(basketDecrement(event.target.closest(".line").id))
    }
  }
  //Удалить продукт из корзины
  function removeProductFromBasket(event){
    dispatch(basketRemove(event.target.closest(".line").id))
  }

//Изменение селектора
  function changeSelector(event){
      dispatch(basketIsChecked(event.target.closest(".line").id))
  }

 

  return (
    <div className="line" id={id}>
      <div className="line-checkbox">
        <input
          className="checkbox-input"
          name="checkbox-input"
          id={index}
          type="checkbox"
          onChange={changeSelector}
          checked={product.isChecked}
        />
        <label htmlFor={index}></label>
      </div>
      <div className="line-foto">
        <img src={image} alt="foto-product" />
      </div>
      <div className="line-title">{title}</div>
      <div className="line-number">
        <button className="line-number__minus" disabled={product.count===1} onClick={decrementCounter}>
          <img src={minus} alt="icon-minis" />
        </button>
        {product.count} шт.
        <button className="line-number__plus" disabled={product.count===stock} onClick={incrementCounter}>
          <img src={plus} alt="icon-plus" />
        </button>
      </div>
      <div className="line-price">
        {newPrice.toLocaleString("ru")} ₽
        <button className="line-price__button"
        onClick={removeProductFromBasket}
        >Удалить</button>
      </div>
    </div>
  );
}
