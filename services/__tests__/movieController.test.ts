import { getPopularMovies, searchMovies, getMovieDetails } from '../controllers/movieController';
import * as tmdpApi from '../utils/tmdpApi.ts';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('../utils/tmdpApi.ts', () => ({
  fetchPopularMovies: jest.fn(),
  searchMovies: jest.fn(),
  fetchMovieDetails: jest.fn(),
}));

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('getPopularMovies', () => {
  it('should fetch and return popular movies', async () => {
    const req: any = { query: {} };
    const res = mockRes();

    (tmdpApi.fetchPopularMovies as jest.Mock).mockResolvedValue([{ id: 1, title: 'Popular Movie' }]);

    await getPopularMovies(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1, title: 'Popular Movie' }]);
  });
});

describe('searchMovies', () => {
  it('should fetch and return search results', async () => {
    const req: any = { query: { query: 'Batman' } };
    const res = mockRes();

    (tmdpApi.searchMovies as jest.Mock).mockResolvedValue([{ id: 2, title: 'Batman Begins' }]);

    await searchMovies(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 2, title: 'Batman Begins' }]);
  });

  it('should return error if search query is missing', async () => {
    const req: any = { query: {} };
    const res = mockRes();

    await searchMovies(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Search query required' });
  });
});

describe('getMovieDetails', () => {
  it('should fetch and return movie details', async () => {
    const req: any = { params: { id: '42' } };
    const res = mockRes();

    (tmdpApi.fetchMovieDetails as jest.Mock).mockResolvedValue({ id: '42', title: 'The Answer' });

    await getMovieDetails(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: '42', title: 'The Answer' });
  });
});

