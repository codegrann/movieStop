import { useState, useEffect, useCallback, useContext } from 'react';
import API from '../services/api';
import { AppContext } from '../context/AppContext';
import { Movie } from '../types';

interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selectedGenre } = useContext(AppContext);

  const fetchMovies = useCallback(
    async (pageNum: number, query = '') => {
      setLoading(true);
      setError(null);

      try {
        const url = query
          ? `${API_BASE}/movies/search?query=${encodeURIComponent(
            query
          )}&page=${pageNum}`
          : `${API_BASE}/movies/popular?page=${pageNum}`;

        const res = await API.get<MoviesResponse>(url);

        let newMovies = res.data.results;
        if (selectedGenre) {
          newMovies = newMovies.filter(
            movie =>
              movie.genre_ids && movie.genre_ids.includes(selectedGenre.id)
          );
        }

        setMovies(newMovies);
        setPage(res.data.page);
        setTotalPages(res.data.total_pages);
      } catch (e) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    },
    [selectedGenre]
  );

  useEffect(() => {
    setMovies([]); // Reset movies when search query or genre changes
    fetchMovies(1, searchQuery);
  }, [fetchMovies, searchQuery, selectedGenre]);

  const handlePageChange = (newPage: number) => {
    if (loading || newPage < 1 || newPage > totalPages) return;
    fetchMovies(newPage, searchQuery);
  };

  return {
    movies,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    page,
    totalPages,
    handlePageChange,
  };
};
