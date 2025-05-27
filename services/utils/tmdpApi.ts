import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined in environment variables');
}

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const fetchPopularMovies = async (page = 1) => {
  const response = await tmdb.get('/movie/popular', {
    params: { page },
  });
  return response.data;
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await tmdb.get('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

export const fetchMovieDetails = async (movieId: string | number) => {
  const response = await tmdb.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,release_dates', // extra details
    },
  });
  return response.data;
};
