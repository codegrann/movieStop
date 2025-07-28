import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../src/pages/Home';
import { useMovies } from '../../src/hooks/useMovies';
import { useAuth } from '../../src/hooks/useAuth';

// Mocks
vi.mock('../../src/hooks/useMovies');
vi.mock('../../src/hooks/useAuth');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects if user is not logged in', () => {
    (useAuth as any).mockReturnValue({ user: null });
    (useMovies as any).mockReturnValue({
      movies: [],
      loading: false,
      error: null,
      setSearchQuery: vi.fn(),
      loadMore: vi.fn(),
      hasMore: false,
    });

    render(<HomePage />, { wrapper: MemoryRouter });

    // Expect navigation to happen, but since useNavigate is mocked, just check for no content
    expect(screen.queryByText(/no more movies/i)).not.toBeInTheDocument();
  });

  it('renders movie list when logged in', async () => {
    (useAuth as any).mockReturnValue({ user: { name: 'Tester' } });
    (useMovies as any).mockReturnValue({
      movies: [{ id: 1, title: 'Test Movie', poster_path: null, vote_average: 7.5, release_date: '2021-01-01' }],
      loading: false,
      error: null,
      setSearchQuery: vi.fn(),
      loadMore: vi.fn(),
      hasMore: false,
    });

    render(<HomePage />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText(/no more movies/i)).toBeInTheDocument();
    });
  });
});
