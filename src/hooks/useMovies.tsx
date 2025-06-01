import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (pageNum: number, query = '') => {
    setLoading(true);
    setError(null);

    try {
      const url = query
        ? `${API_BASE}/movies/search?query=${encodeURIComponent(query)}&page=${pageNum}`
        : `${API_BASE}/movies/popular?page=${pageNum}`;

      const res = await axios.get<MoviesResponse>(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const newMovies = res.data.results;

      setMovies((prev) => (pageNum === 1 ? newMovies : [...prev, ...newMovies]));
      setPage(res.data.page);
      setTotalPages(res.data.total_pages);
    } catch (e) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch initial or when search changes
  useEffect(() => {
    fetchMovies(1, searchQuery);
  }, [fetchMovies, searchQuery]);

  // Load more for infinite scroll
  const loadMore = () => {
    if (loading) return;
    if (page >= totalPages) return;
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
