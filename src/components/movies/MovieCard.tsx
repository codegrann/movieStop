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
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE;

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => onClick(movie.id)}
      className="cursor-pointer bg-gray-800 rounded overflow-hidden shadow hover:shadow-lg transition-shadow"
    >
      {movie.poster_path ? (
        <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover" />
      ) : (
        <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400">No Image</div>
      )}
      <div className="p-3">
        <h3 className="text-white text-lg font-semibold truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{new Date(movie.release_date).getFullYear()}</p>
        <p className="text-yellow-400 font-bold">{movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
