import { createReducer } from "@reduxjs/toolkit";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted
} from "../actions";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroesReducer = createReducer(initialState, builder => {
  builder
    .addCase(heroesFetching, (state) => {
      state.heroesLoadingStatus = "loading";
    })
    .addCase(heroesFetched, (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes = action.payload;
    })
    .addCase(heroesFetchingError, (state) => {
      state.heroesLoadingStatus = "error";
    })
    .addCase(heroCreated, (state, action) => {
      state.heroes = state.heroes.concat(action.payload);
    })
    .addCase(heroDeleted, (state, action) => {
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
    })
    .addDefaultCase(() => {});
});

export default heroesReducer;
