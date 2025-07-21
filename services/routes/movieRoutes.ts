import express from 'express';
import { getPopularMovies, searchMovies, getMovieDetails } from '../controllers/movieController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/popular', getPopularMovies);
router.get('/search', searchMovies);
router.get('/:id', protect, getMovieDetails);

export default router;
