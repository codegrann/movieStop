"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthCallback = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_1 = require("../utils/jwt");
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const registerUser = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
        return res.status(400).json({ message: 'Please enter all fields' });
    try {
        let user = await userModel_1.default.findOne({ email });
        if (user)
            return res.status(400).json({ message: 'User already exists' });
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashed = await bcryptjs_1.default.hash(password, salt);
        user = new userModel_1.default({ email, password: hashed, name });
        await user.save();
        const token = (0, jwt_1.signToken)({ id: user._id, email: user.email });
        res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error.toString() });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Please enter all fields' });
    try {
        const user = await userModel_1.default.findOne({ email });
        if (!user || !user.password)
            return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = (0, jwt_1.signToken)({ id: user._id, email: user.email });
        res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error.toString() });
    }
};
exports.loginUser = loginUser;
// passport middleware handles Google OAuth callback
const googleAuthCallback = async (req, res) => {
    // Passport attaches user to req.user
    if (!req.user) {
        // console.log('No user from Google OAuth');
        return res.redirect('/login?error=auth_failed');
    }
    try {
        const accessToken = req.user.accessToken;
        let userInfo;
        if (accessToken) {
            const response = await axios_1.default.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            userInfo = response.data;
        }
        const name = userInfo?.name || req.user.name || '';
        const token = (0, jwt_1.signToken)({ id: req.user._id, email: req.user.email, name });
        // console.log('Google Auth Generated Token:', token);
        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    }
    catch (error) {
        // console.error('Error fetching Google userinfo:', error);
        // fallback
        const token = (0, jwt_1.signToken)({ id: req.user._id, email: req.user.email, name: req.user.name || '' });
        res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    }
};
exports.googleAuthCallback = googleAuthCallback;
