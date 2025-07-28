import { renderHook, act, waitFor } from '@testing-library/react';
import { useMovies } from '../../src/hooks/useMovies';
import API from '../../src/services/api';

vi.mock('../../src/services/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockMovies = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  title: `Movie ${i}`,
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
        results: mockMovies,
        page: 1,
        total_pages: 2,
      },
    });

    const { result } = renderHook(() => useMovies());

    await waitFor(() => expect(result.current.movies).toHaveLength(5));

    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(2);
  });

  it('loads more movies', async () => {
    (API.get as vi.Mock)
      .mockResolvedValueOnce({
        data: { results: mockMovies, page: 1, total_pages: 2 },
      })
      .mockResolvedValueOnce({
        data: { results: mockMovies, page: 2, total_pages: 2 },
      });

    const { result } = renderHook(() => useMovies());

    await waitFor(() => expect(result.current.movies.length).toBe(5));

    await act(async () => {
      result.current.loadMore();
    });

    await waitFor(() => expect(result.current.movies.length).toBe(10));
  });
});
