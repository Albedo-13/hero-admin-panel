import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilter: "",
};

export const fetchFilters = createAsyncThunk("filters/fetchFilters", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/filters");
});

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.filtersLoadingStatus = "idle";
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.filtersLoadingStatus = "idle";
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { activeFilterChanged } = actions;
