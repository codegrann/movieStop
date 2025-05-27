import express from 'express';
import { getPopularMovies, searchMovies, getMovieDetails } from '../controllers/movieController.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.get('/popular', protect, getPopularMovies);
router.get('/search', protect, searchMovies);
router.get('/:id', protect, getMovieDetails);

export default router;
