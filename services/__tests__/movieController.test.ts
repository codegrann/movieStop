import { getMovies, getMovieDetails, getMovieRecommendations } from '../controllers/movieController';
import { fetchMovies, fetchMovieDetails, fetchMovieRecommendations } from '../utils/tmdpApi';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('../utils/tmdbApi');

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('getMovies', () => {
  it('should fetch and return movies', async () => {
    const req: any = {};
    const res = mockRes();

    (fetchMovies as jest.Mock).mockResolvedValue([{ id: 1, title: 'Movie' }]);

    await getMovies(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1, title: 'Movie' }]);
  });
});

describe('getMovieDetails', () => {
  it('should fetch and return movie details', async () => {
    const req: any = { params: { id: '123' } };
    const res = mockRes();

    (fetchMovieDetails as jest.Mock).mockResolvedValue({ id: '123', title: 'Title' });

    await getMovieDetails(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: '123', title: 'Title' });
  });
});

describe('getMovieRecommendations', () => {
  it('should fetch and return recommendations', async () => {
    const req: any = { params: { id: '123' } };
    const res = mockRes();

    (fetchMovieRecommendations as jest.Mock).mockResolvedValue([{ id: 456, title: 'Rec' }]);

    await getMovieRecommendations(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 456, title: 'Rec' }]);
  });
});
