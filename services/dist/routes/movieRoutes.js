"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/popular', movieController_1.getPopularMovies);
router.get('/search', movieController_1.searchMovies);
router.get('/genres', movieController_1.getGenres);
router.get('/:id', authMiddleware_1.protect, movieController_1.getMovieDetails);
exports.default = router;
