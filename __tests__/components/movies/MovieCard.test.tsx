import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from '../../../src/components/movies/MovieCard';

const sampleMovie = {
  id: 1,
  title: 'Inception',
  poster_path: '/poster.jpg',
  release_date: '2010-07-16',
  vote_average: 8.8,
};

describe('MovieCard', () => {
  it('renders movie details correctly', () => {
    render(<MovieCard movie={sampleMovie} onClick={() => {}} />);
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('8.8')).toBeInTheDocument();
    expect(screen.getByAltText('Inception')).toBeInTheDocument();
  });

  it('handles click event', () => {
    const handleClick = vi.fn();
    render(<MovieCard movie={sampleMovie} onClick={handleClick} />);
    fireEvent.click(screen.getByText('Inception'));
    expect(handleClick).toHaveBeenCalledWith(1);
  });

  it('displays placeholder when poster_path is null', () => {
    render(
      <MovieCard
        movie={{ ...sampleMovie, poster_path: null }}
        onClick={() => {}}
      />
    );
    expect(screen.getByText(/no image/i)).toBeInTheDocument();
  });
});
