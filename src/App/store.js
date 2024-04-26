import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: () => getDefaultMiddleware().concat(tmdbApi.middleware),
});
