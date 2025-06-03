import type { Request, Response } from 'express';
import User from '../models/userModel.ts';
import bcrypt from 'bcryptjs';

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
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

// Update user account
export const updateAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { name, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) {
      user.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({ message: 'Account updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update account', error: error.message });
  }
};

// Delete user account
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete account', error: error.message });
  }
};