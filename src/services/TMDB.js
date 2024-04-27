import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const tmdbToken = process.env.REACT_APP_TMDB_TOKEN;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    // Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page }) => {
        // GET popular movies
        let url = `movie/popular?${page}`;

        // GET movies by categories
        if (
          // eslint-disable-next-line operator-linebreak
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          url = `movie/${genreIdOrCategoryName}?${page}`;
        }

        // GET movies by genres
        if (
          // eslint-disable-next-line operator-linebreak
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          url = `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=${genreIdOrCategoryName}`;
        }

        return {
          url,
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tmdbToken}`,
          },
        };
      },
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
