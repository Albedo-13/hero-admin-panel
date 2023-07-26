import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import heroesReducer from "../reducers/heroes";
import filtersReducer from "../reducers/filters";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return {
      type: action,
    };
  } else {
    return next(action);
  }
};

const store = createStore(
  combineReducers({
    heroes: heroesReducer,
    filters: filtersReducer,
  }),
  compose(
    applyMiddleware(ReduxThunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
