// import { createAction } from "@reduxjs/toolkit";

// import {
//   heroesFetched,
//   heroesFetching,
//   heroesFetchingError,
// } from "../components/heroesList/heroesSlice";

// export const fetchHeroes = (request) => (dispatch) => {
//   dispatch(heroesFetching());
//   request("http://localhost:3001/heroes")
//     .then((data) => dispatch(heroesFetched(data)))
//     .catch(() => dispatch(heroesFetchingError()));
// };

// export const fetchFiltersThunk = (request) => (dispatch) => {
//   request("http://localhost:3001/filters")
//     .then((data) => dispatch(fetchFilters(data)))
//     .catch((err) => console.log(err));
// };

// export const heroesFetching = () => {
//   return {
//     type: "HEROES_FETCHING",
//   };
// };

// export const heroesFetching = createAction("HEROES_FETCHING");

// export const heroesFetched = (heroes) => {
//   return {
//     type: "HEROES_FETCHED",
//     payload: heroes,
//   };
// };

// export const heroesFetched = createAction("HEROES_FETCHED");

// export const heroesFetchingError = () => {
//   return {
//     type: "HEROES_FETCHING_ERROR",
//   };
// };

// export const heroesFetchingError = createAction("HEROES_FETCHING_ERROR");

// export const heroDeleted = (heroes, id) => {
//   const updatedHeroes = heroes.filter((item) => item.id !== id);

//   return {
//     type: "HERO_DELETED",
//     payload: updatedHeroes,
//   };
// };

// export const heroDeleted = createAction("HERO_DELETED");

// export const heroAdded = (hero, heroes) => {
//   const prevHeroes = heroes;
//   const updatedHeroes = [...prevHeroes, hero];

//   return {
//     type: "HERO_ADDED",
//     payload: updatedHeroes,
//   };
// };

// export const heroAdded = createAction("HERO_ADDED");

// export const fetchFilters = (filters) => {
//   return {
//     type: "FETCH_FILTERS",
//     payload: filters,
//   };
// };

// // export const fetchFilters = createAction("FETCH_FILTERS");

// export const setFilter = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };

// export const setFilter = createAction("SET_FILTER");

// export const setFilter = (filter) => (dispatch) => {
//   setTimeout(() => {
//     dispatch({
//       type: "SET_FILTER",
//       payload: filter,
//     });
//   }, 1000);
// };

// export const heroesFiltering = (heroes, filter) => {
//   const heroesFiltered =
//     filter === "all"
//       ? heroes
//       : heroes.filter((item) => item.element === filter);

//   return {
//     type: "HEROES_FILTERING",
//     payload: heroesFiltered,
//   };
// };
