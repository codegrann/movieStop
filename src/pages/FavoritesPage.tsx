import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MovieList from '../components/movies/MovieList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import API from '../services/api';

const FavoritesPage = () => {
  const { token } = useAuth();
  const [, setFavorites] = useState<number[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get favorite movie IDs
        const favRes = await API.get('/user/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(favRes.data.favorites);

        // Fetch details for each favorite movie
        const movieDetailsPromises = favRes.data.favorites.map((id: number) =>
          API.get(`/movies/${id}`, {
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

  if (loading) return <div className='pt-20'><LoadingSpinner /></div>;
  if (error) return <p className="text-center pt-20 text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen pt-20 bg-gray-900 text-white p-4 max-w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>
      {movies.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        <MovieList movies={movies} onMovieSelect={(id) => navigate(`/movies/${id}`)} />
      )}
    </div>
  );
};

export default FavoritesPage;
