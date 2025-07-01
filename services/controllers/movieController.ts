import type { Request, Response } from 'express';
import * as tmdpApi from '../utils/tmdpApi';

export const getPopularMovies = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const data = await tmdpApi.fetchPopularMovies(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch popular movies' });
  }
};

export const searchMovies = async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    const page = Number(req.query.page) || 1;
    if (!query) return res.status(400).json({ message: 'Search query required' });
    const data = await tmdpApi.searchMovies(query, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search movies' });
  }
};

export const getMovieDetails = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    const data = await tmdpApi.fetchMovieDetails(movieId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movie details' });
  }
};
