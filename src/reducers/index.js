const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  filtersLoadingStatus: "idle",
  filteredHeroes: [],
  activeFilter: "",
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
        filteredHeroes:
          state.activeFilter === ""
            ? action.payload
            : action.payload.filter((item) => item.element === state.activeFilter),
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "HERO_DELETED":
      const newHeroesListOnDelete = state.heroes.filter((hero) => hero.id !== action.payload);
      return {
        ...state,
        heroes: newHeroesListOnDelete,
        filteredHeroes:
          state.activeFilter === ""
            ? newHeroesListOnDelete
            : newHeroesListOnDelete.filter((hero) => hero.element === state.activeFilter),
      };
    case "HERO_CREATED":
      const newHeroesListOnCreate = state.heroes.concat(action.payload);
      return {
        ...state,
        heroes: newHeroesListOnCreate,
        filteredHeroes:
          state.activeFilter === ""
            ? newHeroesListOnCreate
            : newHeroesListOnCreate.filter((hero) => hero.element === state.activeFilter),
      };
    case "FILTERS_FETCHING":
      return {
        ...state,
        filtersLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: "idle",
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filtersLoadingStatus: "error",
      };
    case "ACTIVE_FILTER_CHANGED":
      return {
        ...state,
        filtersLoadingStatus: "idle",
        activeFilter: action.payload,
        filteredHeroes:
          action.payload === "" ? state.heroes : state.heroes.filter((hero) => hero.element === action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
