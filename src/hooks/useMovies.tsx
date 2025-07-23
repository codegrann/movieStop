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
          ? `${API_BASE}/movies/search?query=${encodeURIComponent(query)}&page=${pageNum}`
          : `${API_BASE}/movies/popular?page=${pageNum}`;

        const res = await API.get<MoviesResponse>(url);

        let newMovies = res.data.results;
        if (selectedGenre) {
          newMovies = newMovies.filter((movie) => movie.genre_ids.includes(selectedGenre.id));
        }

        setMovies((prevMovies) => {
          if (pageNum === 1) return newMovies;
          const existingIds = new Set(prevMovies.map((m) => m.id));
          const uniqueNewMovies = newMovies.filter((m) => !existingIds.has(m.id));
          return [...prevMovies, ...uniqueNewMovies];
        });
        setPage(res.data.page);
        setTotalPages(res.data.total_pages);
      } catch (e) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    },
    [selectedGenre],
  );

  useEffect(() => {
    setMovies([]); // Reset movies when search query or genre changes
    fetchMovies(1, searchQuery);
  }, [fetchMovies, searchQuery, selectedGenre]);

  const loadMore = () => {
    if (loading || page >= totalPages) return;
    fetchMovies(page + 1, searchQuery);
  };

  return {
    movies,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    loadMore,
    hasMore: page < totalPages,
  };
};
