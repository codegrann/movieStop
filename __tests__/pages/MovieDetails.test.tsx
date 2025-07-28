import { render, screen } from '@testing-library/react';
import MovieDetailsPage from '../../src/pages/MovieDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: () => ({ token: 'valid-token', user: { favorites: [1] } }),
}));

vi.mock('../../src/services/api', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { id: 1, title: 'Movie 1', overview: 'Overview', poster_path: null, release_date: '2020-01-01', vote_average: 8, genres: [], runtime: 100, credits: { cast: [], crew: [] } } })
  },
}));

test('renders loading and movie details', async () => {
  render(
    <MemoryRouter initialEntries={['/movies/1']}>
      <Routes>
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
  expect(await screen.findByText('Movie 1')).toBeInTheDocument();
});
