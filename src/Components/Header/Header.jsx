import { memo } from "react";
import "./Header.css";
import heart from "../../icons/heart.svg";
import basket from "../../icons/basket.svg";
import personadd from "../../icons/person-add.svg";
import person from "../../icons/person.svg";
import cardlist from "../../icons/cardlist.svg";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBasketSelector } from "../../redux/slices/basketSlice";

function Header() {
  // console.log('Header');

  const arrayProducts = useSelector(getBasketSelector); ///Массив продуктов в корзине

  return (
    <header>
      <div className="header-logo">
        <Link to="/" className="header-logo__title" title="Главная страница">
          Dog food
        </Link>
      </div>

      <div className="wpapper">
        <div>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "header-box header-blue cardlist-blue" : "header-box"
            }
          >
            <img
              className="header-box__img"
              src={cardlist}
              alt="icon-cardlist"
            />
            Каталог
          </NavLink>
        </div>

        <div>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "header-box header-blue heard-blue" : "header-box"
            }
          >
            <img className="header-box__img" src={heart} alt="icon-heart" />
            Избранное
          </NavLink>
        </div>

        <div style={{ position: "relative" }}>
          <NavLink
            to="/basket"
            className={({ isActive }) =>
              isActive ? "header-box header-blue basket-blue" : "header-box"
            }
          >
            <img className="header-box__img" src={basket} alt="icon-basket" />
            Корзина
          </NavLink>
          {arrayProducts.length> 0 && <div className="basket__counter">{arrayProducts.length}</div>}
        </div>

        <div>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "header-box header-blue person-add-blue" : "header-box"
            }
          >
            <img
              className="header-box__img"
              src={personadd}
              alt="icon-person-add"
            />
            Регистрация
          </NavLink>
        </div>

        <div>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? "header-box header-blue person-blue" : "header-box"
            }
          >
            <img className="header-box__img" src={person} alt="icon-person" />
            Авторизация
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export const HeaderMemo = memo(Header);
