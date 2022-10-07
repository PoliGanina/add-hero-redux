import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { heroDeleted, fetchHeroes } from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { createSelector } from "@reduxjs/toolkit";

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.filters.filter,
    (state) => state.heroes.heroes,
    (filter, heroes) => {
      if (filter === "all") {
        return heroes;
      } else {
        return heroes.filter((item) => item.element === filter);
      }
    }
  );
  const { heroes, heroesLoadingStatus } = useSelector((state) => state.heroes);
  const { filter } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const heroesFiltered = useSelector(filteredHeroesSelector);

  useEffect(() => {
    dispatch(fetchHeroes(request));
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback(
    (id) => {
      const shouldRemove = window.confirm(
        "Are you sure you want to remove the item?"
      );

      if (shouldRemove) {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
          .then((res) => console.log(res, "Deleted"))
          .then(dispatch(heroDeleted(id)))
          .catch((err) => console.log(err));
      }
    },
    [dispatch, request]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem
          key={id}
          {...props}
          onDelete={() => onDelete(heroes, id)}
        />
      );
    });
  };

  const elements = filter
    ? renderHeroesList(heroesFiltered)
    : renderHeroesList(heroes);

  return <ul>{elements}</ul>;
};

export default HeroesList;
