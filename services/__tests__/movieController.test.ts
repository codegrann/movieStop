import { searchMovies, getMovieDetails, getPopularMovies } from '../controllers/movieController';
// import { searchMovies, fetchMovieDetails, fetchPopularMovies } from '../utils/tmdpApi';
import * as tmdbApi from '../utils/tmdpApi';
import dotenv from 'dotenv';

dotenv.config();

// jest.mock('../utils/tmdpApi', () => ({
//   searchMovies: jest.fn(),
//   fetchMovieDetails: jest.fn(),
//   fetchPopularMovies: jest.fn(),
// }));

jest.mock('../utils/tmdpApi');

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('searchMovies', () => {
  it('should fetch and return movies', async () => {
    const req: any = {};
    const res = mockRes();

    (tmdbApi.searchMovies as jest.Mock).mockResolvedValue([{ id: 1, title: 'Movie' }]);

    await searchMovies(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1, title: 'Movie' }]);
  });
});

describe('getMovieDetails', () => {
  it('should fetch and return movie details', async () => {
    const req: any = { params: { id: '123' } };
    const res = mockRes();

    (tmdbApi.fetchMovieDetails as jest.Mock).mockResolvedValue({ id: '123', title: 'Title' });

    await getMovieDetails(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: '123', title: 'Title' });
  });
});

describe('getPopularMovies', () => {
  it('should fetch and return recommendations', async () => {
    const req: any = { params: { id: '123' } };
    const res = mockRes();

    (tmdbApi.fetchPopularMovies as jest.Mock).mockResolvedValue([{ id: 456, title: 'Rec' }]);

    await getPopularMovies(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 456, title: 'Rec' }]);
  });
});
