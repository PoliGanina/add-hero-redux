const initialState = {
  filters: [],
  filter: "",
};

const filters = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default filters;
