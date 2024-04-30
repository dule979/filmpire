import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

const tmdbToken = process.env.REACT_APP_TMDB_TOKEN;

export const fetchToken = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbToken}`,
      },
    };

    const { data } = await moviesApi.get('/authentication/token/new', options);

    const token = data.request_token;

    if (data.success) {
      localStorage.setItem('request_token', token);

      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${tmdbToken}`,
    },
    body: JSON.stringify({ request_token: token }),
  };

  if (token) {
    try {
      const response = await moviesApi.post(
        'authentication/session/new',
        options,
      );

      // localStorage.setItem('session_id', sessionId);

      console.log(response);
      // return sessionId;
    } catch (error) {
      console.log(error);
    }
  }
};
