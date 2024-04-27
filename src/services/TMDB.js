import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const tmdbToken = process.env.REACT_APP_TMDB_TOKEN;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    // Get Movies by [Type]
    getMovies: builder.query({
      query: () => ({
        url: 'movie/popular?page=1',
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbToken}`,
        },
      }),
    }),

    // Get Genres

    getGenres: builder.query({
      query: () => ({
        url: 'genre/movie/list',
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbToken}`,
        },
      }),
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
