import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  heroDeleted,
  fetchHeroes,
  filteredHeroesSelector,
  // selectAll,
} from "./heroesSlice";
// import store from "../../store";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const heroesFiltered = useSelector(filteredHeroesSelector);
  // const heroes = selectAll(store.getState());
  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes());
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
        <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
      );
    });
  };

  const elements = renderHeroesList(heroesFiltered);

  return <ul>{elements}</ul>;
};

export default HeroesList;
