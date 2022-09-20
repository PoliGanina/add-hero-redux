const initialState = {
  heroes: [],
  heroesFiltered: [],
  heroesLoadingStatus: "idle",
  filters: [],
  filter: "",
  hero: {
    id: "",
    name: "",
    description: "",
    element: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };

    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };

    case "HERO_DELETED":
      return {
        ...state,
        heroes: action.payload,
      };

    case "HERO_ADDED":
      return {
        ...state,
        heroes: action.payload,
      };

    case "FETCH_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    case "HEROES_FILTERING":
      return {
        ...state,
        heroesFiltered: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
