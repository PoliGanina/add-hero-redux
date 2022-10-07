// import { createReducer } from "@reduxjs/toolkit";

// import {
//   heroesFetching,
//   heroesFetchingError,
//   heroesFetched,
//   heroAdded,
//   heroDeleted,
// } from "../actions/index";

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: "idle",
// };

// //Option 3 - ugraded createReducer;

// const heroes = createReducer(
//   initialState,
//   {
//     [heroesFetching]: (state) => {
//       state.heroesLoadingStatus = "loading";
//     },
//     [heroesFetchingError]: (state) => {
//       state.heroesLoadingStatus = "error";
//     },
//     [heroesFetched]: (state, action) => {
//       state.heroesLoadingStatus = "idle";
//       state.heroes = action.payload;
//     },
//     [heroDeleted]: (state, action) => {
//       state.heroes = action.heroes.filter((item) => item.id !== action.payload);
//     },
//     [heroAdded]: (state, action) => {
//       state.heroes = action.payload;
//     },
//   },
//   [],
//   (state) => state
// );

//Option 2 - createReducer with React Toolkit;

// const heroes = createReducer(initialState, (builder) => {
//   builder
//     .addCase(heroesFetching, (state) => {
//       state.heroesLoadingStatus = "loading";
//     })
//     .addCase(heroesFetchingError, (state) => {
//       state.heroesLoadingStatus = "error";
//     })
//     .addCase(heroesFetched, (state, action) => {
//       state.heroesLoadingStatus = "idle";
//       state.heroes = action.payload;
//     })
//     .addCase(heroDeleted, (state, action) => {
//       state.heroes = action.payload;
//     })
//     .addCase(heroAdded, (state, action) => {
//       state.heroes = action.payload;
//     })
//     .addDefaultCase(() => {});
// });

//Option 1 - classic reducer;

// const heroes = (state = initialState, action) => {
//   switch (action.type) {
//     case "HEROES_FETCHING":
//       return {
//         ...state,
//         heroesLoadingStatus: "loading",
//       };
//     case "HEROES_FETCHED":
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: "idle",
//       };

//     case "HEROES_FETCHING_ERROR":
//       return {
//         ...state,
//         heroesLoadingStatus: "error",
//       };

//     case "HERO_DELETED":
//       return {
//         ...state,
//         heroes: action.payload,
//       };

//     case "HERO_ADDED":
//       return {
//         ...state,
//         heroes: action.payload,
//       };

//     // case "HEROES_FILTERING":
//     //   return {
//     //     ...state,
//     //     heroesFiltered: action.payload,
//     //   };

//     default:
//       return state;
//   }
// };

// export default heroes;
