import type { Request, Response } from 'express';
import User from '../models/userModel.ts';

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // from auth middleware
    const movieId = Number(req.params.movieId);

    if (!movieId) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }

    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add favorite', error: error.message });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const movieId = Number(req.params.movieId);

    if (!movieId) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.favorites = user.favorites.filter((id) => id !== movieId);
    await user.save();

    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove favorite', error: error.message });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return favorite movie IDs
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch favorites', error: error.message });
  }
};
