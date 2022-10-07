import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
  //additional state items
});

console.log(initialState);

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: "idle",
// };

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/heroes");
});
// возвращает промис и три action creators, которые нужно вписать в extra reducer: pending, fullfilled, rejected.

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroDeleted: (state, action) => {
      state.heroes = action.heroes.filter((item) => item.id !== action.payload);
    },
    heroAdded: (state, action) => {
      state.heroes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const {
  heroesFetching,
  heroesFetchingError,
  heroesFetched,
  heroDeleted,
  heroAdded,
} = actions;
