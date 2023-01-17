import { useState, memo } from "react";
import classNames from "classnames/bind";
import "./Search.css";
import search from "../../icons/search.svg";
import searchLime from "../../icons/search-lime.svg";
import eraserLime from "../../icons/eraser-lime.svg";
import { useOutletContext } from "react-router-dom";

function Search() {
  // console.log('Search');

  const [setSearchQuery] = useOutletContext();

  const [valueFromInput, setValueFromInput] = useState(""); //Состояние строки ввода

  //Функция очиски Input
  function clearInput() {
    setValueFromInput("");
    setSearchQuery("");
  }

  //Функция записи введенного текста в переменную valueFromInput
  function textInput(event) {
    setValueFromInput(event.target.value);
  }

  //Функция отправки поискового запроса при потере фoкуса Input
  function lossOfFocus() {
    setSearchQuery(valueFromInput);
  }

  //Функция отправки поискового запроса при нажатии кнопки Найти
  function clickSearchButton() {
    setSearchQuery(valueFromInput);
  }

  //Функция отправки поискового запроса при нажатии клавиши Enter
  function pressEnter(event) {
    if (event.keyCode === 13) {
      setSearchQuery(valueFromInput);
    }
  }

  return (
    <div className="search-container">
      <button
        title="Очистить поиск"
        className={classNames("search-container__clear", {
          active: Boolean(valueFromInput),
        })} // Отображение кнопки Очитить поиск, если Input сожержит текст
        onClick={clearInput} // Очистить Input
      >
        <img
          className="search-container__img"
          src={eraserLime}
          alt="icon-broom"
        />
      </button>

      <input
        className="search-container__input"
        type="text"
        placeholder="Поиск по каталогу"
        value={valueFromInput}
        onInput={textInput} //Запись текста в переменную valueFromInput
        onBlur={lossOfFocus} //Потеря фoкуса Input
        onKeyDown={pressEnter} //Отправка поискового запроса при нажатии клавиши Enter
      />
      <button
        title="Найти"
        className="search-container__find"
        onClick={clickSearchButton} //Отправка поискового запроса при нажатии кнопки Найти
      >
        <img
          src={Boolean(!valueFromInput) ? `${search}` : `${searchLime}`} //Изменение цвета иконки
          alt="icon-search"
        />
      </button>
    </div>
  );
}

export const SearchMemo = memo(Search);
