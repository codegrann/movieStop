"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMovieDetails = exports.searchMovies = exports.fetchPopularMovies = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not defined in environment variables');
}
const tmdb = axios_1.default.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});
const fetchPopularMovies = async (page = 1) => {
    const response = await tmdb.get('/movie/popular', {
        params: { page },
    });
    return response.data;
};
exports.fetchPopularMovies = fetchPopularMovies;
const searchMovies = async (query, page = 1) => {
    const response = await tmdb.get('/search/movie', {
        params: { query, page },
    });
    return response.data;
};
exports.searchMovies = searchMovies;
const fetchMovieDetails = async (movieId) => {
    const response = await tmdb.get(`/movie/${movieId}`, {
        params: {
            append_to_response: 'credits,release_dates',
        },
    });
    return response.data;
};
exports.fetchMovieDetails = fetchMovieDetails;
