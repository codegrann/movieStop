import { renderHook, act, waitFor } from '@testing-library/react';
import { AppProvider } from '../../src/context/AppContext';
import { useMovies } from '../../src/hooks/useMovies';
import API from '../../src/services/api';

vi.mock('../../src/services/api', () => ({
  default: {
    get: vi.fn(),
  },
  getGenres: vi.fn().mockResolvedValue({ data: [] }),
}));

const mockMoviesPage1 = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  title: `Movie ${i}`,
  poster_path: null,
  release_date: '2024-01-01',
  vote_average: 7.5,
  overview: 'Great movie',
}));

const mockMoviesPage2 = Array.from({ length: 5 }, (_, i) => ({
  id: i + 5,
  title: `Movie ${i + 5}`,
  poster_path: null,
  release_date: '2024-01-01',
  vote_average: 7.5,
  overview: 'Great movie',
}));

describe('useMovies', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches popular movies on mount', async () => {
    (API.get as vi.Mock).mockResolvedValue({
      data: {
        results: mockMoviesPage1,
        page: 1,
        total_pages: 2,
      },
    });

    const { result } = renderHook(() => useMovies(), { wrapper: AppProvider });

    await waitFor(() => expect(result.current.movies).toHaveLength(5));

    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(2);
  });

  it('loads more movies', async () => {
    (API.get as vi.Mock)
      .mockResolvedValueOnce({
        data: { results: mockMoviesPage1, page: 1, total_pages: 2 },
      })
      .mockResolvedValueOnce({
        data: { results: mockMoviesPage2, page: 2, total_pages: 2 },
      });

    const { result } = renderHook(() => useMovies(), { wrapper: AppProvider });

    await waitFor(() => expect(result.current.movies.length).toBe(5));

    await act(async () => {
      result.current.loadMore();
    });

    await waitFor(() => expect(result.current.movies.length).toBe(10));
    expect(result.current.page).toBe(2);
  });
});