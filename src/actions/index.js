export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const heroDeleted = (heroes, id) => {
  const updatedHeroes = heroes.filter((item) => item.id !== id);

  return {
    type: "HERO_DELETED",
    payload: updatedHeroes,
  };
};

export const heroAdded = (hero, heroes) => {
  const prevHeroes = heroes;
  const updatedHeroes = [...prevHeroes, hero];

  console.log(updatedHeroes);

  return {
    type: "HERO_ADDED",
    payload: updatedHeroes,
  };
};

export const fetchFilters = (filters) => {
  return {
    type: "FETCH_FILTERS",
    payload: filters,
  };
};

export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export const heroesFiltering = (heroes, filter) => {
  const heroesFiltered =
    filter === "all"
      ? heroes
      : heroes.filter((item) => item.element === filter);

  return {
    type: "HEROES_FILTERING",
    payload: heroesFiltered,
  };
};
