import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const tmdbToken = process.env.REACT_APP_TMDB_TOKEN;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    // Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
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

        // search movies
        if (searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&${page}`;
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

    // GET movie
    getMovie: builder.query({
      query: (id) => ({
        url: `movie/${id}?&append_to_response=videos`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbToken}`,
        },
      }),
    }),

    // GET movie cast
    getCast: builder.query({
      query: (id) => ({
        url: `movie/${id}/credits`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbToken}`,
        },
      }),
    }),

    // GET recommended movies
    getRecommendations: builder.query({
      query: (id) => ({
        url: `movie/${id}/recommendations`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbToken}`,
        },
      }),
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetCastQuery, useGetRecommendationsQuery } = tmdbApi;
