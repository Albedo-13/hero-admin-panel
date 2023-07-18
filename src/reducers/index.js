const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  filtersLoadingStatus: "idle",
  filteredHeroes: [],
  activeFilter: "DEFAULT",
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
          state.activeFilter === "DEFAULT"
            ? action.payload
            : action.payload.filter((item) => item.element === state.activeFilter),
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "HERO_DELETED":
      const newHeroList = state.heroes.filter((hero) => hero.id !== action.payload);
      return {
        ...state,
        heroes: newHeroList,
        filteredHeroes:
        state.activeFilter === "DEFAULT"
          ? action.payload
          : newHeroList.filter((item) => item.element === state.activeFilter),
      };
    case "HERO_CREATED":
      const newHeroesList = state.heroes.concat(action.payload);
      console.log(newHeroesList);
      return {
        ...state,
        heroes: newHeroesList,
        filteredHeroes:
        state.activeFilter === "DEFAULT"
          ? action.payload
          : action.payload.filter((item) => item.element === state.activeFilter),
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
        action.payload === "DEFAULT"
          ? state.heroes
          : state.heroes.filter((item) => item.element === action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
