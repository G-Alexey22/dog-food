import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import "./Search.css";
import search from "../../icons/search.svg";
import searchLime from "../../icons/search-lime.svg";
import eraserLime from "../../icons/eraser-lime.svg";
import { useDispatch } from "react-redux";
import { filterSearch } from "../../redux/slices/filterSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

export function Search() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [valueFromInput, setValueFromInput] = useState(() => {
    return searchParams.get("search") || "";
  }); //Состояние строки ввода
  const debouncedSearchValue = useDebounce(valueFromInput, 500);

  useEffect(() => {
    dispatch(filterSearch(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  //Функция очиски Input и очистки параметра в URL
  function clearInput() {
    setValueFromInput("");
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      search: "" });
  }

  //Функция записи  в valueFromInput и добавления параметра в URL
  function textInput(event) {
    setValueFromInput(event.target.value);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      search: event.target.value });
  }


  return (
    <div className="search-container">
      <button
        title="Очистить поиск"
        className={classNames("search-container__clear", {
          active: valueFromInput,
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
      />
      <img
        className="search-container__find"
        src={!valueFromInput ? `${search}` : `${searchLime}`}
        alt="icon-search"
      />
    </div>
  );
}
