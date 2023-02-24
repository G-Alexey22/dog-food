import "./Filter.css";
import classNames from "classnames/bind";
import { useSearchParams } from "react-router-dom";

export function Filter({
  title,
  filter,
  currentFilter,
  setCurrentFilter,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  //Функция изменения фильтра и добавления параментов в URL
  function changeFilter() {
    setCurrentFilter((prev) => (prev === filter ? null : filter));
    if (filter !== currentFilter) {
      setSearchParams({
        search: searchParams.get("search") || "",
        [filter]: true,
      });
    }
    if (filter === currentFilter) {
      setSearchParams({
        search: searchParams.get("search") || "",
        [filter]: false,
      });
    }
  }

  return (
    <button
      type="button"
      className={classNames("filtersection__button", {
        "btn-green": filter === currentFilter,
      })}
      onClick={changeFilter}
    >
      {title}
    </button>
  );
}
