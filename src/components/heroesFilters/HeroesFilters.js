// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import classNames from "classnames";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { fetchFilters, setFilter } from "./filtersSlice";
import { useHttp } from "../../hooks/http.hook";
import "./HeroesFilters.css";

const HeroesFilters = () => {
  const { filters, filter } = useSelector((state) => state.filters);

  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters(request));
    // eslint-disable-next-line
  }, []);

  const handleFilter = useCallback(
    (filter) => {
      dispatch(setFilter(filter));
    },
    [dispatch]
  );

  const renderFilters = (filters) => {
    return filters.map(({ label, className, name }) => {
      const btnClass = classNames("btn", className, {
        active: name === filter,
      });

      const id = uuidv4();

      return (
        <button
          key={id}
          className={btnClass}
          onClick={() => handleFilter(name)}
        >
          {label}
        </button>
      );
    });
  };

  const content = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{content}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
