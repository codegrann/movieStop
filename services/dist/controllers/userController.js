"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateAccount = exports.getFavorites = exports.removeFavorite = exports.addFavorite = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const addFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const movieId = Number(req.params.movieId);
        if (!movieId) {
            return res.status(400).json({ message: 'Invalid movie ID' });
        }
        const user = await userModel_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        if (!user.favorites.includes(movieId)) {
            user.favorites.push(movieId);
            await user.save();
        }
        res.json({ favorites: user.favorites });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to add favorite', error: error.message });
    }
};
exports.addFavorite = addFavorite;
const removeFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const movieId = Number(req.params.movieId);
        if (!movieId) {
            return res.status(400).json({ message: 'Invalid movie ID' });
        }
        const user = await userModel_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        user.favorites = user.favorites.filter((id) => id !== movieId);
        await user.save();
        res.json({ favorites: user.favorites });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to remove favorite', error: error.message });
    }
};
exports.removeFavorite = removeFavorite;
const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        // Return favorite movie IDs
        res.json({ favorites: user.favorites });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch favorites', error: error.message });
    }
};
exports.getFavorites = getFavorites;
// Update user account
const updateAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, password } = req.body;
        const user = await userModel_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        if (name) {
            user.name = name;
        }
        if (password) {
            const salt = await bcryptjs_1.default.genSalt(10);
            user.password = await bcryptjs_1.default.hash(password, salt);
        }
        await user.save();
        res.json({ message: 'Account updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update account', error: error.message });
    }
};
exports.updateAccount = updateAccount;
// Delete user account
const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        await user.deleteOne();
        res.json({ message: 'Account deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete account', error: error.message });
    }
};
exports.deleteAccount = deleteAccount;
