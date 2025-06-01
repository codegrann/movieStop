import React from 'react';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Array<{
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
  }>;
  onMovieSelect: (id: number) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieSelect }) => {
  if (movies.length === 0) {
    return <p className="text-gray-400 text-center mt-10">No movies found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieSelect} />
      ))}
    </div>
  );
};

export default MovieList;
