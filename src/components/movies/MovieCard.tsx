import React from 'react';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
  };
  onClick: (id: number) => void;
}

// import image_base from .env file
const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => onClick(movie.id)}
      className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        {/* Image */}
        {movie.poster_path ? (
          <img
            src={`${POSTER_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-96 bg-gray-700 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Gradient for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black to-transparent" />

        {/* Text content */}
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white text-lg font-bold truncate">{movie.title}</h3>
          <p className="text-gray-300 text-sm">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </div>
      <div className="p-4 bg-gray-800">
        <p className="text-yellow-400 font-bold text-lg">
          {movie.vote_average.toFixed(1)}
          <span className="text-white text-sm font-normal">/ 10</span>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
