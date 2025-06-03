import express from 'express';
import { protect } from '../middleware/authMiddleware.ts';
import { addFavorite, removeFavorite, getFavorites, updateAccount, deleteAccount } from '../controllers/userController.ts';

const router = express.Router();

router.use(protect); // protect all user routes

router.post('/favorites/:movieId', addFavorite);
router.delete('/favorites/:movieId', removeFavorite);
router.get('/favorites', getFavorites);

router.put('/account', updateAccount);
router.delete('/account', deleteAccount);

export default router;
