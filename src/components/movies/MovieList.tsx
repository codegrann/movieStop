import React from 'react';
import MovieCard from './MovieCard';
import Pagination from '../common/Pagination'; // Import Pagination
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
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  onMovieSelect: (id: number) => void;
}> = ({
  movies,
  loading,
  error,
  page,
  totalPages,
  handlePageChange,
  onMovieSelect,
}) => {
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
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieSelect} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

const MovieList: React.FC<MovieListProps> = ({
  movies: moviesProp,
  onMovieSelect,
}) => {
  const hookData = useMovies();

  if (moviesProp) {
    // If movies are passed as a prop, render them directly.
    return (
      <MovieListContent
        movies={moviesProp}
        loading={false}
        error={null}
        page={1}
        totalPages={1}
        handlePageChange={() => {}}
        onMovieSelect={onMovieSelect}
      />
    );
  }

  // Otherwise, use the data from the useMovies hook.
  return <MovieListContent {...hookData} onMovieSelect={onMovieSelect} />;
};

export default MovieList;
