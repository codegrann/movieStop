import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import MovieList from '../components/movies/MovieList'; // reuse existing MovieList component
import LoadingSpinner from '../components/common/LoadingSpinner';

const FavoritesPage = () => {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get favorite movie IDs
        const favRes = await axios.get('http://localhost:5000/api/user/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(favRes.data.favorites);

        // Fetch details for each favorite movie
        const movieDetailsPromises = favRes.data.favorites.map((id: number) =>
          axios.get(`http://localhost:5000/api/movies/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        const movieDetailsResponses = await Promise.all(movieDetailsPromises);
        setMovies(movieDetailsResponses.map((res) => res.data));
      } catch (err) {
        setError('Failed to load favorite movies');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchFavorites();
    }
  }, [token]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>
      {movies.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        <MovieList movies={movies} onMovieSelect={(id) => window.location.href = `/movies/${id}`} />
      )}
    </div>
  );
};

export default FavoritesPage;
