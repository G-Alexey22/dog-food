import { memo } from "react";
import "./Header.css";
import heart from "../../icons/heart.svg";
import basket from "../../icons/basket.svg";
import person from "../../icons/person.svg";
import cardlist from "../../icons/cardlist.svg";
import { Link } from "react-router-dom";


function Header() {
  // console.log('Header');

  return (
    <header>
      <div className="header-logo">
        <Link to="/" className="header-logo__title" title="Главная страница">
          Dog food
        </Link>
      </div>
      <div className="wpapper">
        <div>
          <Link to="/products" className="header-box">
            <img
              className="header-box__img"
              src={cardlist}
              alt="icon-cardlist"
            />
            Каталог
          </Link>
        </div>

        <div>
          <Link to="/favorites" className="header-box">
            <img className="header-box__img" src={heart} alt="icon-heart" />
            Избранное
          </Link>
        </div>

        <div>
          <Link to="/basket" className="header-box">
            <img className="header-box__img" src={basket} alt="icon-basket" />
            Корзина
          </Link>
        </div>

        <div>
          <Link to="/signup" className="header-box">
            <img className="header-box__img" src={person} alt="icon-person" />
            Регистрация
          </Link>
        </div>

        <div>
          <Link to="/signin" className="header-box">
            <img className="header-box__img" src={person} alt="icon-person" />
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}

export const HeaderMemo = memo(Header);
