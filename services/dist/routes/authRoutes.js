"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const passport_1 = __importDefault(require("passport"));
const authRoutes = express_1.default.Router();
authRoutes.post('/register', authController_1.registerUser);
authRoutes.post('/login', authController_1.loginUser);
authRoutes.get('/google', (req, res, next) => {
    // console.log('Google OAuth started');
    passport_1.default.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});
authRoutes.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
    // console.log('Google OAuth callback, user:', req.user);
    (0, authController_1.googleAuthCallback)(req, res);
});
exports.default = authRoutes;
