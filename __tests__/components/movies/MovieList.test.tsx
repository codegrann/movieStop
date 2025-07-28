import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from '../../../src/components/movies/MovieList';

const movies = [
  {
    id: 1,
    title: 'Inception',
    poster_path: '/poster.jpg',
    release_date: '2010-07-16',
    vote_average: 8.8,
  },
  {
    id: 2,
    title: 'Interstellar',
    poster_path: '/interstellar.jpg',
    release_date: '2014-11-07',
    vote_average: 8.6,
  },
];

describe('MovieList', () => {
  it('renders movies when list is not empty', () => {
    render(<MovieList movies={movies} onMovieSelect={() => {}} />);
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
  });

  it('shows fallback message when no movies', () => {
    render(<MovieList movies={[]} onMovieSelect={() => {}} />);
    expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
  });

  it('calls onMovieSelect when a card is clicked', () => {
    const handleSelect = vi.fn();
    render(<MovieList movies={movies} onMovieSelect={handleSelect} />);
    fireEvent.click(screen.getAllByTestId('movie-card')[0]);
    expect(handleSelect).toHaveBeenCalledWith(1);
  });
});