import React, { useCallback } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieList from '../components/movies/MovieList';
import SearchBar from '../components/common/SearchBar';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { movies, loading, error, setSearchQuery, loadMore, hasMore } = useMovies();
  const { user } = useAuth();

  // Movie click handler to navigate to details page
  const handleMovieSelect = useCallback((id: number) => {
    window.location.href = `/movies/${id}`;
  }, []);

  // Infinite scroll handler
  React.useEffect(() => {
    if (!hasMore) return;

    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        loadMore();
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadMore, hasMore]);

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-white">
      <h1 className="text-3xl mb-6">Welcome, {user?.name}!</h1>
      <div className="mb-6 flex justify-center">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <MovieList movies={movies} onMovieSelect={handleMovieSelect} />

      {loading && <p className="text-center mt-4">Loading...</p>}
      {!hasMore && <p className="text-center mt-4 text-gray-500">No more movies</p>}
    </div>
  );
};

export default HomePage;
