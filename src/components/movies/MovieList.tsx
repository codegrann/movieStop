import React from 'react';
import MovieCard from './MovieCard';
import { useMovies } from '../../hooks/useMovies';
import { Movie } from '../../types';

interface MovieListProps {
  movies?: Movie[]; // Make movies prop optional
  onMovieSelect: (id: number) => void;
}

const MovieListContent: React.FC<{
  movies: Movie[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  onMovieSelect: (id: number) => void;
}> = ({ movies, loading, error, hasMore, loadMore, onMovieSelect }) => {
  if (loading && movies.length === 0) {
    return <p className="text-gray-400 text-center mt-10">Loading movies...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (movies.length === 0) {
    return <p className="text-gray-400 text-center mt-10">No movies found.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieSelect} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMore}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

const MovieList: React.FC<MovieListProps> = ({ movies: moviesProp, onMovieSelect }) => {
  const hookData = useMovies();

  if (moviesProp) {
    // If movies are passed as a prop, render them directly.
    // We can create dummy values for the other props since they won't be used.
    return (
      <MovieListContent
        movies={moviesProp}
        loading={false}
        error={null}
        hasMore={false}
        loadMore={() => {}}
        onMovieSelect={onMovieSelect}
      />
    );
  }

  // Otherwise, use the data from the useMovies hook.
  return <MovieListContent {...hookData} onMovieSelect={onMovieSelect} />;
};

export default MovieList;
