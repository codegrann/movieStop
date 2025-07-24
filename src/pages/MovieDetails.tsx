import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import API from '../services/api';
import { Movie } from '../types';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingMsg, setPlayingMsg] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(`/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovie(res.data);
      } catch {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, token]);

  useEffect(() => {
    if (user && user.favorites && id) {
      setFavorites(user.favorites);
    }
  }, [user, id]);

  useEffect(() => {
    if (!token) return;
    const fetchFavorites = async () => {
      try {
        const res = await API.get('/user/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data.favorites);
      } catch (err) {
        console.error('Failed to fetch favorites', err);
      }
    };
    fetchFavorites();
  }, [token]);

  const handlePlayClick = () => {
    setPlayingMsg(true);
    setTimeout(() => setPlayingMsg(false), 2000);
  };

  const isFavorite = favorites.includes(Number(id));

  const handleToggleFavorite = async () => {
    if (!token || !movie) return;
    try {
      if (isFavorite) {
        // Remove favorite
        await API.delete(`/user/favorites/${movie.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites((prev) => prev.filter((favId) => favId !== movie.id));
      } else {
        // Add favorite
        await API.post(
          `/user/favorites/${movie.id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites((prev) => [...prev, movie.id]);
        navigate('/favorites');
      }
    } catch (err) {
      console.error('Failed to update favorite', err);
    }
  };

  if (loading) return <div className="pt-24"><LoadingSpinner /></div>;
  if (error) return <p className="text-center text-red-500 pt-20 mt-10">{error}</p>;
  if (!movie) return <p className="text-center text-white pt-20 mt-10">Movie not found</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 pt-20 max-w-full mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
      >
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className="w-full w-48 md:w-64 rounded shadow-lg"
          />
        ) : (
          <div className="w-full md:w-1/3 bg-gray-700 flex items-center justify-center text-gray-400 rounded h-64">
            No Image
          </div>
        )}

        <div className="flex-1 max-w-4xl">
          <h1 className="text-xl md:text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm sm:text-base text-gray-300 mb-4">{movie.overview}</p>

          <p>
            <strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          <p className="mb-4">
            <strong>Genres:</strong>{' '}
            {movie.genres?.map((g) => g.name).join(', ')}
          </p>

          {/* Play Button */}
          <button
            onClick={handlePlayClick}
            className="mb-3 mr-2 px-6 py-2 bg-cyan-600 rounded hover:bg-cyan-700"
          >
            Play
          </button>
          {playingMsg && <p className="text-yellow-300 text-sm mb-4">Playing coming soon!</p>}

          {/* Add to Favorites Button */}
          <button
            onClick={handleToggleFavorite}
            className={`mb-8 px-6 py-2 rounded text-white ${isFavorite ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'}`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          <h2 className="text-lg md:text-xl font-semibold mb-2">Cast</h2>
          <ul className="mb-4 max-h-48 text-sm sm:text-md overflow-y-auto">
            {movie.credits?.cast.slice(0, 10).map((actor) => (
              <li key={actor.id} className="mb-1">
                {actor.name} as {actor.character}
              </li>
            ))}
          </ul>
          
          {/* <p className="mb-4 max-h-48 text-sm sm:text-base overflow-y-auto">
            {movie.credits.cast
              .slice(0, 10)
              .map((actor) => `${actor.name} as ${actor.character}`)
              .join(', ')}
          </p> */}


          <h2 className="text-lg md:text-xl font-semibold mb-2">Crew</h2>
          <ul className="max-h-48 text-sm sm:text-md overflow-y-auto">
            {movie.credits?.crew.slice(0, 10).map((member) => (
              <li key={member.id} className="mb-1">
                {member.name} - {member.job}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
