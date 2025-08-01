import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import MovieList from '../components/movies/MovieList';
import SearchBar from '../components/common/SearchBar';
import { useAuth } from '../hooks/useAuth';
import HeroSlider from '../components/common/HeroSlider';
import LoadingSpinner from '../components/common/LoadingSpinner';

import { HeroMovie } from '../types';

const HomePage = () => {
  const { movies, loading, error, setSearchQuery, loadMore, hasMore } =
    useMovies();
  const { user } = useAuth();
  const navigate = useNavigate();

  const heroMovies = movies
    .filter((movie): movie is HeroMovie => !!movie.backdrop_path)
    .slice(0, 5);

  // Movie click handler to navigate to details page
  const handleMovieSelect = useCallback(
    (id: number) => {
      if (user) {
        navigate(`/movies/${id}`);
      } else {
        navigate('/login');
      }
    },
    [user, navigate]
  );

  // Infinite scroll handler
  useEffect(() => {
    if (!hasMore) return;

    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadMore, hasMore]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="pt-12">
        {/* Hero Section */}
        <div className="relative h-[50vh] text-center py-20 md:py-24 px-4 overflow-hidden">
          <HeroSlider movies={heroMovies} />
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
              Welcome to MovieStop
            </h1>
            <p className="text-md md:text-lg text-gray-200 mb-4 sm:mb-8 drop-shadow-md">
              Discover, search, and track your favorite films.
            </p>
            <div className="mb-6 flex justify-center">
              <SearchBar onSearch={setSearchQuery} />
            </div>
          </div>
        </div>
        {/* Movie List Section */}
        <div className="p-4">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
          {loading && (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          )}
          {!loading && !hasMore && movies.length > 0 && (
            <p className="text-center mt-4 text-gray-500">
              You've reached the end.
            </p>
          )}
        </div>
        {/* footer
        <footer className="bg-gray-800 py-4 text-center sticky bottom-0">
          <p className="text-sm text-gray-400">
            &copy; 2025 MovieStop. All rights reserved.
          </p>
        </footer> */}
      </div>
    </div>
  );
};

export default HomePage;
