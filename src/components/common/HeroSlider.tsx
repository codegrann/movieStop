import { useState, useEffect } from 'react';

// Use a local, simpler type that matches the data from useMovies hook
interface HeroMovie {
  id: number;
  poster_path: string | null;
}

interface HeroSliderProps {
  movies: HeroMovie[];
}

const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE;

const HeroSlider = ({ movies }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [movies.length]);

  if (movies.length === 0) {
    return null; // Don't render anything if there are no movies
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${IMAGE_BASE}${movie.poster_path})`,
          }}
        />
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60" />
    </div>
  );
};

export default HeroSlider;
