import { render, screen, waitFor } from '@testing-library/react';
import FavoritesPage from '../../src/pages/FavoritesPage';
import { AppProvider } from '../../src/context/AppContext';
import API from '../../src/services/api';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../src/services/api', () => ({
  default: {
    get: vi.fn(),
  },
  getGenres: vi.fn().mockResolvedValue({ data: [] }),
}));

const favoriteIds = [1, 2];
const movieData = (id: number) => ({
  id,
  title: `Movie ${id}`,
  poster_path: null,
  release_date: '2024-01-01',
  vote_average: 8,
  overview: `Overview for movie ${id}`,
});

describe('FavoritesPage', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'User', email: 'user@example.com' }));
    (API.get as vi.Mock)
      .mockResolvedValueOnce({ data: { favorites: favoriteIds } }) // /user/favorites
      .mockResolvedValueOnce({ data: movieData(1) }) // /movies/1
      .mockResolvedValueOnce({ data: movieData(2) }); // /movies/2
  });

  it('renders favorite movies', async () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <FavoritesPage />
        </AppProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });
});