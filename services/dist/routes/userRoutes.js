"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.use(authMiddleware_1.protect);
router.post('/favorites/:movieId', userController_1.addFavorite);
router.delete('/favorites/:movieId', userController_1.removeFavorite);
router.get('/favorites', userController_1.getFavorites);
router.put('/account', userController_1.updateAccount);
router.delete('/account', userController_1.deleteAccount);
exports.default = router;
