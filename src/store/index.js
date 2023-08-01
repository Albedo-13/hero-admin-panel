import { configureStore } from "@reduxjs/toolkit";

import heroesReducer from "../reducers/heroes";
// import filtersReducer from "../reducers/filters";
import filters from "../slices/filtersSlice"

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return {
      type: action,
    };
  } else {
    return next(action);
  }
};

const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    filters,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
