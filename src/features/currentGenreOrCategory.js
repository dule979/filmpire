import { createSlice } from '@reduxjs/toolkit';

const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState: {
    genreIdOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.genreIdOrCategoryName = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.searchQuery = '';
    },
    selectSearch: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, selectSearch } = genreOrCategory.actions;

export default genreOrCategory.reducer;
