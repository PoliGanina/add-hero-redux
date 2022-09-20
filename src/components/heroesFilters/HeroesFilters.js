// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { fetchFilters, heroesFiltering, setFilter } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import "./HeroesFilters.css";

const HeroesFilters = () => {
  const { heroes, filters } = useSelector((state) => state);
  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    request(`http://localhost:3001/filters`, "GET")
      .then((filters) => dispatch(fetchFilters(filters)))
      .catch((err) => console.log(err));
  }, [dispatch, request]);

  const handleFilter = useCallback(
    (filter) => {
      dispatch(setFilter(filter));
      dispatch(heroesFiltering(heroes, filter));
    },
    [dispatch, heroes]
  );

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map((item) => {
            const id = uuidv4();
            return (
              <button
                key={id}
                className="btn"
                onClick={() => handleFilter(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
