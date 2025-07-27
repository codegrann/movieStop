"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenres = exports.getMovieDetails = exports.searchMovies = exports.getPopularMovies = void 0;
const tmdpApi = __importStar(require("../utils/tmdpApi"));
const getPopularMovies = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const data = await tmdpApi.fetchPopularMovies(page);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch popular movies' });
    }
};
exports.getPopularMovies = getPopularMovies;
const searchMovies = async (req, res) => {
    try {
        const query = req.query.query;
        const page = Number(req.query.page) || 1;
        if (!query)
            return res.status(400).json({ message: 'Search query required' });
        const data = await tmdpApi.searchMovies(query, page);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to search movies' });
    }
};
exports.searchMovies = searchMovies;
const getMovieDetails = async (req, res) => {
    try {
        const movieId = req.params.id;
        const data = await tmdpApi.fetchMovieDetails(movieId);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch movie details' });
    }
};
exports.getMovieDetails = getMovieDetails;
const getGenres = async (req, res) => {
    try {
        const data = await tmdpApi.getGenres();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch genres' });
    }
};
exports.getGenres = getGenres;
